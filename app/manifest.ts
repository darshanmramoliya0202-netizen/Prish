import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Prish Overseas",
    short_name: "Prish Overseas",
    description:
      "Indian-origin botanical powders, dehydrated ingredients, rice, and export-ready sourcing systems for global B2B buyers.",
    start_url: "/",
    display: "standalone",
    background_color: "#07101d",
    theme_color: "#07101d",
    icons: [
      {
        src: "/icon",
        sizes: "64x64",
        type: "image/png"
      }
    ]
  };
}
