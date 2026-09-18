import { OG_SIZE, renderOg } from "@/lib/og";
import { site } from "@/content/site";

export const runtime = "nodejs";
export const alt = `${site.company} — ${site.tagline}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    title: "Indian-origin ingredients, documented for your market.",
    sub: "Fruit, vegetable & herbal powders · dehydrated onion & garlic · whole spices · moringa · basmati. Farm-rooted in Gujarat, documented for your market.",
  });
}
