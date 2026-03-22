"use client";

import { motion } from "framer-motion";
import { ShieldCheck, FlaskConical, FileCheck2, Microscope, Leaf, Award } from "lucide-react";

const certifications = [
  {
    name: "FSSAI",
    fullName: "Food Safety & Standards Authority of India",
    description: "Mandatory food safety compliance for all Indian food businesses",
    icon: ShieldCheck,
    status: "Compliant"
  },
  {
    name: "ISO 22000",
    fullName: "Food Safety Management Systems",
    description: "International standard for food safety management across the supply chain",
    icon: Award,
    status: "Aligned"
  },
  {
    name: "HACCP",
    fullName: "Hazard Analysis Critical Control Points",
    description: "Systematic approach to food safety from biological, chemical, and physical hazards",
    icon: FlaskConical,
    status: "Aligned"
  },
  {
    name: "GMP",
    fullName: "Good Manufacturing Practices",
    description: "Production and testing practices ensuring consistent quality standards",
    icon: FileCheck2,
    status: "Practiced"
  },
  {
    name: "Lab Tested",
    fullName: "Third-Party Laboratory Testing",
    description: "Independent verification of specifications on request per buyer requirements",
    icon: Microscope,
    status: "On Request"
  },
  {
    name: "Clean Label",
    fullName: "No Artificial Additives",
    description: "No artificial colors, flavors, or adulteration — natural ingredient integrity",
    icon: Leaf,
    status: "Guaranteed"
  }
] as const;

export default function TrustBadges() {
  return (
    <section className="relative bg-[#0f172a] py-16 sm:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.08),transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-saffron">Quality Command Center</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-serif text-3xl text-white sm:text-4xl lg:text-5xl">
            Certifications & compliance signals global buyers evaluate first.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-400">
            Every shipment is backed by documentation discipline, processing control, and destination-aware compliance readiness.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:border-saffron/30 hover:bg-white/[0.08]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-saffron/10 text-saffron transition group-hover:bg-saffron/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-saffron/30 bg-saffron/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-saffron">
                    {cert.status}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{cert.name}</h3>
                <p className="mt-1 text-xs text-slate-400">{cert.fullName}</p>
                <p className="mt-3 text-sm leading-6 text-slate-400">{cert.description}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-slate-500">
          <span>Destination-country specification flexibility</span>
          <span className="hidden h-1 w-1 rounded-full bg-saffron/50 sm:block" />
          <span>Customizable certifications based on buyer needs</span>
          <span className="hidden h-1 w-1 rounded-full bg-saffron/50 sm:block" />
          <span>Batch-wise consistency documentation</span>
        </div>
      </div>
    </section>
  );
}
