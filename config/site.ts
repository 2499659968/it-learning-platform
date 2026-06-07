// 环境配置 - 统一管理本地和生产环境的配置
// 使用方式：import { siteConfig } from '@/config/site'

export const siteConfig = {
  // 网站基本信息
  name: "IT 学习平台",
  description: "从基础到进阶，系统化学习编程技能",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:9527",

  // API 配置
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "/api",
  },

  // 功能开关
  features: {
    enableAuth: false,        // 用户认证功能
    enableComments: false,    // 评论功能
    enableAnalytics: false,   // 数据分析
    enableSearch: false,      // 搜索功能
  },

  // SEO 配置
  seo: {
    title: "IT 学习平台",
    description: "从基础到进阶，系统化学习编程技能",
    keywords: "IT学习,编程教程,JavaScript,TypeScript,React,Next.js",
    ogImage: "/og-image.png", // 社交分享图片
  },

  // 联系方式
  contact: {
    email: "contact@example.com",
    github: "https://github.com/yourusername",
  },

  // 分页配置
  pagination: {
    defaultPageSize: 10,
    maxPageSize: 100,
  },
};

// 判断是否为生产环境
export const isProd = process.env.NODE_ENV === "production";

// 判断是否为开发环境
export const isDev = process.env.NODE_ENV === "development";

// API 端点配置
export const apiEndpoints = {
  courses: `${siteConfig.api.baseUrl}/courses`,
  users: `${siteConfig.api.baseUrl}/users`,
  auth: {
    login: `${siteConfig.api.baseUrl}/auth/login`,
    logout: `${siteConfig.api.baseUrl}/auth/logout`,
    register: `${siteConfig.api.baseUrl}/auth/register`,
  },
};
