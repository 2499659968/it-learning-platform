"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCurrentUser, logout, type User } from "@/lib/auth";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  const tools = [
    {
      href: "/frameworks",
      icon: "FW",
      title: "框架选择器",
      description: "语言与框架映射关系",
      accent: "bg-purple-500",
      size: "large" // 大卡片
    },
    {
      href: "/skill-tree",
      icon: "ST",
      title: "技能树",
      description: "可视化技能路径",
      accent: "bg-green-500",
      size: "large"
    },
    {
      href: "/projects",
      icon: "PJ",
      title: "项目实战",
      description: "精选项目案例",
      accent: "bg-pink-500",
      size: "small"
    },
    {
      href: "/tech-info",
      icon: "TI",
      title: "技术查询",
      description: "搜索技术信息",
      accent: "bg-cyan-500",
      size: "small"
    },
    {
      href: "/trends",
      icon: "TR",
      title: "AI 趋势",
      description: "追踪技术动态",
      accent: "bg-violet-500",
      size: "medium"
    },
    {
      href: "/glossary",
      icon: "GL",
      title: "黑话词典",
      description: "程序员术语集",
      accent: "bg-amber-500",
      size: "small"
    },
    {
      href: "/roadmap",
      icon: "RM",
      title: "功能规划",
      description: "平台发展计划",
      accent: "bg-orange-500",
      size: "medium"
    },
    {
      href: "/changelog",
      icon: "CL",
      title: "迭代记录",
      description: "版本更新历史",
      accent: "bg-indigo-500",
      size: "small"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      {/* 大气的顶部区域 */}
      <header className="relative">
        <div className="max-w-7xl mx-auto px-8 pt-20 pb-16">
          <div className="flex items-start justify-between mb-8">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                IT 学习平台
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                整理技能树、记录学习进度、查询技术信息
              </p>
            </div>

            {/* 登录状态显示 */}
            {user ? (
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user.username}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="group relative px-6 py-3 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-900 dark:text-white rounded-full font-medium hover:scale-105 transition-transform shadow-lg"
                >
                  <span className="relative z-10">退出</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="group relative mt-2 px-6 py-3 bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 text-white dark:text-gray-900 rounded-full font-medium hover:scale-105 transition-transform shadow-lg"
              >
                <span className="relative z-10">登录</span>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 pb-20">
        {/* 左侧内容区 + 右侧悬浮工具卡片 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 左侧主要内容 */}
          <div className="lg:col-span-5 space-y-8">
            {/* 开始学习卡片 */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-shadow">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                从这里开始
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                查看技能树了解学习路径，或浏览项目案例开始实践
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  href="/skill-tree"
                  className="flex items-center justify-between px-6 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl hover:scale-[1.02] transition-transform font-medium"
                >
                  <span>技能树</span>
                  <span>→</span>
                </Link>
                <Link
                  href="/projects"
                  className="flex items-center justify-between px-6 py-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl hover:scale-[1.02] transition-transform font-medium"
                >
                  <span>项目实战</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* 页脚信息 */}
            <div className="pt-8">
              <p className="text-sm text-gray-400 dark:text-gray-600">
                © 2026 IT 学习平台
              </p>
            </div>
          </div>

          {/* 右侧悬浮工具网格 - 完全不规则布局 */}
          <div className="lg:col-span-7 lg:pl-12">
            <div className="relative">
              {/* 手动定位每个卡片，创造完全不规则的布局 */}

              {/* 第一行 */}
              <div className="mb-6 flex gap-4">
                <Link
                  href="/frameworks"
                  className="group block flex-1"
                  style={{ transform: 'rotate(-1.5deg)' }}
                >
                  <div className="h-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-[32px] p-8 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all">
                    <div className="w-14 h-14 bg-purple-500 rounded-[20px] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <span className="text-white text-base font-bold">FW</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      框架选择器
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      语言与框架映射关系
                    </p>
                  </div>
                </Link>

                <Link
                  href="/tech-info"
                  className="group block w-48"
                  style={{ transform: 'rotate(2deg) translateY(20px)' }}
                >
                  <div className="h-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-[28px] p-6 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all">
                    <div className="w-12 h-12 bg-cyan-500 rounded-[16px] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <span className="text-white text-sm font-bold">TI</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      技术查询
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      搜索技术信息
                    </p>
                  </div>
                </Link>
              </div>

              {/* 第二行 */}
              <div className="mb-6 flex gap-4">
                <Link
                  href="/projects"
                  className="group block w-52"
                  style={{ transform: 'rotate(1deg)' }}
                >
                  <div className="h-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-[24px] p-6 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all">
                    <div className="w-11 h-11 bg-pink-500 rounded-[14px] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <span className="text-white text-sm font-bold">PJ</span>
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                      项目实战
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      精选项目案例
                    </p>
                  </div>
                </Link>

                <Link
                  href="/skill-tree"
                  className="group block flex-1"
                  style={{ transform: 'rotate(-2deg) translateY(-15px)' }}
                >
                  <div className="h-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-[36px] p-8 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all">
                    <div className="w-16 h-16 bg-green-500 rounded-[22px] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <span className="text-white text-lg font-bold">ST</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      技能树
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      可视化技能路径
                    </p>
                  </div>
                </Link>
              </div>

              {/* 第三行 */}
              <div className="mb-6 flex gap-4">
                <Link
                  href="/trends"
                  className="group block flex-1"
                  style={{ transform: 'rotate(1.5deg) translateY(10px)' }}
                >
                  <div className="h-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-[30px] p-7 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all">
                    <div className="w-13 h-13 bg-violet-500 rounded-[18px] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <span className="text-white text-base font-bold">TR</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      AI 趋势
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      追踪技术动态
                    </p>
                  </div>
                </Link>

                <Link
                  href="/glossary"
                  className="group block w-44"
                  style={{ transform: 'rotate(-1deg)' }}
                >
                  <div className="h-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-[26px] p-5 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all">
                    <div className="w-10 h-10 bg-amber-500 rounded-[14px] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <span className="text-white text-xs font-bold">GL</span>
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                      黑话词典
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      程序员术语集
                    </p>
                  </div>
                </Link>

                <Link
                  href="/roadmap"
                  className="group block w-48"
                  style={{ transform: 'rotate(2.5deg) translateY(-10px)' }}
                >
                  <div className="h-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-[28px] p-6 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all">
                    <div className="w-12 h-12 bg-orange-500 rounded-[16px] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <span className="text-white text-sm font-bold">RM</span>
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                      功能规划
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      平台发展计划
                    </p>
                  </div>
                </Link>
              </div>

              {/* 第四行 */}
              <div className="flex gap-4">
                <Link
                  href="/changelog"
                  className="group block w-56"
                  style={{ transform: 'rotate(-1.5deg)' }}
                >
                  <div className="h-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-[26px] p-6 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all">
                    <div className="w-11 h-11 bg-indigo-500 rounded-[15px] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <span className="text-white text-sm font-bold">CL</span>
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                      迭代记录
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      版本更新历史
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
