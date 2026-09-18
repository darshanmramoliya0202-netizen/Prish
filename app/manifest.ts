import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.company,
    short_name: site.company,
    description: "Indian-origin ingredients for global formulations — Rajkot, Gujarat.",
    start_url: "/",
    display: "standalone",
    background_color: "#fbf8f1",
    theme_color: "#0b3d2e",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
