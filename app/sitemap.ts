import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.cadexhq.com";

  const routes = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" },
    { url: "/services", priority: 0.9, changeFrequency: "weekly" },
    { url: "/pre-audit", priority: 0.8, changeFrequency: "monthly" },
    { url: "/about", priority: 0.8, changeFrequency: "monthly" },
    { url: "/contact", priority: 0.8, changeFrequency: "monthly" },
    { url: "/blog", priority: 0.7, changeFrequency: "weekly" },
    { url: "/roi", priority: 0.7, changeFrequency: "monthly" },
    { url: "/ai-audit", priority: 0.6, changeFrequency: "monthly" },
    { url: "/ai-opportunities", priority: 0.6, changeFrequency: "monthly" },
    { url: "/process-audit", priority: 0.6, changeFrequency: "monthly" },
    { url: "/tech-stack", priority: 0.6, changeFrequency: "monthly" },
  ] as const;

  return routes.map(({ url, priority, changeFrequency }) => ({
    url: `${base}${url}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
