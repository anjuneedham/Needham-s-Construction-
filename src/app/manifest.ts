import type { MetadataRoute } from "next";

import { company } from "@/data/company";
import { site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: company.name,
    short_name: company.shortName,
    description: site.defaultDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#fbfbf9",
    theme_color: "#08090b",
    icons: [
      { src: "/media/company/logo.png", sizes: "600x600", type: "image/png" },
    ],
  };
}
