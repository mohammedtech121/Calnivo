import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://calnivocalc.com/sitemap.xml",
    host: "https://calnivocalc.com",
  };
}
