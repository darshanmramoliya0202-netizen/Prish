"""
generate-content.py — one-off content generator (run on the laptop).

Reads the two authoritative product sources and emits JSON under content/generated/:

  * PRISH_MAILCRM_SRC/products.py   (default: F:/Prish Overseas/mailcrm/src)
  * PRISH_CATALOGUE_DOCX            (default: F:/Prish Overseas/catalogues/prish-overseas/
                                     Final Product Catalogue – Premium Indian Natural Powders.docx)

Rules applied (see docs/content-rules.md and the plan, Part D):
  - products flagged `origin_credibility` are dropped (imported berries)
  - `garlic_powder` is displayed in the `dehydrates` family (id unchanged for CRM matching)
  - rice `grades` become variants without "Raw"
  - the docx profile is attached where a heading matches; everything else is reported
    as needing an authored profile (content/overrides/products.ts)

Usage:
    python scripts/generate-content.py
"""
from __future__ import annotations

import importlib.util
import json
import os
import re
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "content" / "generated"
OUT.mkdir(parents=True, exist_ok=True)

CRM_SRC = Path(os.environ.get("PRISH_MAILCRM_SRC", r"F:/Prish Overseas/mailcrm/src"))
DOCX = Path(
    os.environ.get(
        "PRISH_CATALOGUE_DOCX",
        r"F:/Prish Overseas/catalogues/prish-overseas/Final Product Catalogue – Premium Indian Natural Powders.docx",
    )
)

# --------------------------------------------------------------------------- products.py
spec = importlib.util.spec_from_file_location("prish_products", CRM_SRC / "products.py")
if spec is None or spec.loader is None:
    sys.exit(f"products.py not found at {CRM_SRC}")
prod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(prod)

DISPLAY_CLUSTER_OVERRIDE = {"garlic_powder": "dehydrates"}
EXCLUDE_FLAG = "origin_credibility"

# docx heading -> products.py key
DOCX_MAP = {
    "JAMUN POWDER": "jamun_powder",
    "BEETROOT POWDER": "beetroot_powder",
    "SEA BUCKTHORN POWDER": "sea_buckthorn_powder",
    "TURMERIC POWDER": "turmeric_powder",
    "APPLE POWDER": "apple_powder",
    "DEHYDRATED ONION POWDER": "dehydrated_onion_powder",
    "DEHYDRATED GARLIC POWDER": "garlic_powder",
    "DRY RED CHILLI": "dry_red_chilli",
    "TURMERIC (RAW FINGER / BULB)": "turmeric_finger",
    "CUMIN SEEDS": "cumin_seed",
    "CORIANDER SEEDS": "coriander_seed",
}

# --------------------------------------------------------------------------- docx
def parse_docx(path: Path) -> dict[str, dict]:
    import docx  # python-docx
    from docx.table import Table
    from docx.text.paragraph import Paragraph

    d = docx.Document(str(path))
    body = d.element.body
    sections: dict[str, dict] = {}
    current: dict | None = None
    pending_table_for: dict | None = None

    for child in body.iterchildren():
        tag = child.tag.split("}")[1]
        if tag == "p":
            para = Paragraph(child, d)
            text = para.text.strip()
            if not text:
                continue
            style = para.style.name if para.style is not None else ""
            if style.startswith("Heading 2"):
                key = text.upper()
                if key in DOCX_MAP:
                    current = {"heading": text, "blocks": {}, "gradeTable": None}
                    sections[DOCX_MAP[key]] = current
                else:
                    current = None
                continue
            if current is None:
                continue
            if text.endswith("Grades Table"):
                pending_table_for = current
                continue
            lines = [ln.strip() for ln in text.split("\n") if ln.strip()]
            label, rest = lines[0], lines[1:]
            current["blocks"][label] = rest
        elif tag == "tbl" and pending_table_for is not None:
            t = Table(child, d)
            rows = [[c.text.strip() for c in r.cells] for r in t.rows]
            header, *data = rows
            pending_table_for["gradeTable"] = [
                {"parameter": r[0], "range": r[1]} for r in data if len(r) >= 2 and r[0]
            ]
            pending_table_for = None
    return sections


def norm_label(label: str) -> str:
    l = label.lower()
    if l.startswith("scientific"):
        return "science"
    if l.startswith("why choose"):
        return "whyIndian"
    if l.startswith("key benefits"):
        return "benefits"
    if l.startswith("technical spec"):
        return "specs"
    if l.startswith("major origin"):
        return "origin"
    return l


def profile_from_docx(sec: dict) -> dict:
    out: dict = {"source": "docx", "science": "", "whyIndian": "", "benefits": ""}
    specs: list[dict] = []
    applications: list[str] = []
    origin: list[str] = []
    for label, lines in sec["blocks"].items():
        k = norm_label(label)
        joined = " ".join(lines).strip()
        if k in ("science", "whyIndian", "benefits"):
            out[k] = joined
        elif k == "specs":
            for ln in lines:
                if ":" not in ln:
                    continue
                name, value = [s.strip() for s in ln.split(":", 1)]
                if name.lower() == "applications":
                    applications = [a.strip() for a in value.split(",") if a.strip()]
                elif name.lower() == "origin":
                    continue  # "Origin: India" — implicit
                else:
                    specs.append({"label": name, "value": value})
        elif k == "origin":
            origin = [o.strip() for o in re.split(r",(?![^()]*\))", joined) if o.strip()]
    return {
        "profile": out,
        "specs": specs,
        "applications": applications,
        "originRegions": origin,
        "gradeTable": sec.get("gradeTable"),
    }


docx_sections = parse_docx(DOCX) if DOCX.exists() else {}
if not docx_sections:
    print(f"WARNING: catalogue docx not found or empty at {DOCX}", file=sys.stderr)

# --------------------------------------------------------------------------- merge
products_out = []
authored_needed = []
for p in prod.PRODUCTS:
    if EXCLUDE_FLAG in p.get("flags", []):
        continue
    key = p["key"]
    cluster = DISPLAY_CLUSTER_OVERRIDE.get(key, p["cluster"])
    rec = {
        "id": key,
        "name": p["name"],
        "cluster": cluster,
        "crmCluster": p["cluster"],
        "hs": {
            "hs6": p["hs6"],
            "itcHs": p.get("itc_hs") or None,
            "verified": bool(p.get("verified")),
            "altHs6": p.get("alt_hs6", []),
        },
        "flags": [f for f in p.get("flags", []) if f != EXCLUDE_FLAG],
        "buyerTypes": p.get("buyer_types", []),
        "synonyms": p.get("synonyms", []),
        "variants": [g for g in p.get("grades", []) if g != "Raw"] or None,
        "crmNote": p.get("note"),
        "profile": None,
        "specs": [],
        "applications": [],
        "originRegions": [],
        "gradeTable": None,
    }
    if key in docx_sections:
        rec.update(profile_from_docx(docx_sections[key]))
    else:
        authored_needed.append(key)
    products_out.append(rec)

clusters_out = [{"id": k, "name": v} for k, v in prod.CLUSTERS.items()]
buyer_types_out = [{"id": k, "label": v} for k, v in prod.BUYER_TYPES.items()]
flags_out = [{"id": k, "text": v} for k, v in prod.FLAGS.items() if k != EXCLUDE_FLAG]


def dump(name: str, data):
    path = OUT / name
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"wrote {path.relative_to(ROOT)} ({len(data)} records)")


dump("products.json", products_out)
dump("clusters.json", clusters_out)
dump("buyer-types.json", buyer_types_out)
dump("flags.json", flags_out)

matched = sorted(set(docx_sections) & {p["id"] for p in products_out})
unmatched_docx = sorted(set(docx_sections) - {p["id"] for p in products_out})
print("\n— coverage —")
print(f"products emitted: {len(products_out)}")
print(f"docx profiles attached ({len(matched)}): {', '.join(matched)}")
print(f"authored profiles needed ({len(authored_needed)}): {', '.join(authored_needed)}")
if unmatched_docx:
    print(f"docx sections with no product: {unmatched_docx}")
