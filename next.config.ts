import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 生产环境优化
  reactStrictMode: true, // 启用严格模式，帮助发现潜在问题

  // 图片优化配置
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // 允许所有 HTTPS 图片（生产环境建议限制具体域名）
      },
    ],
    formats: ['image/avif', 'image/webp'], // 现代图片格式
  },

  // 环境变量（客户端可访问的变量必须以 NEXT_PUBLIC_ 开头）
  env: {
    SITE_NAME: "IT 学习平台",
  },

  // 生产环境压缩
  compress: true,

  // 输出配置（如果需要导出静态站点）
  // output: 'export', // 取消注释以启用静态导出

  // 重定向配置示例
  async redirects() {
    return [
      // {
      //   source: '/old-path',
      //   destination: '/new-path',
      //   permanent: true,
      // },
    ];
  },

  // 自定义 Headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

