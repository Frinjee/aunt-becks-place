import type { MetadataRoute } from "next";

const baseUrl = "https://www.auntbecksplace.live";

const routes = ["/", "/about", "/events", "/donate", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: path === "/" ? `${baseUrl}/` : `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
