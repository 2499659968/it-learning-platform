// 工具函数：统一处理 URL

import { siteConfig } from "@/config/site";

/**
 * 获取完整的 URL（用于 SEO、分享链接等）
 * @param path - 路径（如 '/learn/javascript'）
 * @returns 完整 URL
 */
export function getAbsoluteUrl(path: string): string {
  return `${siteConfig.url}${path}`;
}

/**
 * 获取 API 请求 URL
 * @param endpoint - API 端点（如 '/courses'）
 * @returns 完整 API URL
 */
export function getApiUrl(endpoint: string): string {
  return `${siteConfig.api.baseUrl}${endpoint}`;
}

/**
 * 构建带查询参数的 URL
 * @param path - 基础路径
 * @param params - 查询参数对象
 */
export function buildUrl(path: string, params?: Record<string, string | number | boolean>): string {
  if (!params) return path;

  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    searchParams.append(key, String(value));
  });

  const queryString = searchParams.toString();
  return queryString ? `${path}?${queryString}` : path;
}

/**
 * 判断是否为外部链接
 */
export function isExternalUrl(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
}
