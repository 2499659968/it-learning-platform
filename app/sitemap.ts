import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// 课程 ID 列表
const courseIds = ["javascript", "typescript", "react", "nextjs"];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // 静态页面
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
  ];

  // 课程页面
  const coursePages = courseIds.map((id) => ({
    url: `${baseUrl}/learn/${id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...coursePages];
}
