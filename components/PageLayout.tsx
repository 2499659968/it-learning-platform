"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCurrentUser, logout, type User } from "@/lib/auth";
import { useRouter } from "next/navigation";

interface PageLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  showBackButton?: boolean;
}

export default function PageLayout({
  title,
  description,
  children,
  showBackButton = true,
}: PageLayoutProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      {/* 统一顶部导航 */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {showBackButton && (
                <Link
                  href="/"
                  className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm mb-3 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  返回首页
                </Link>
              )}
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {title}
              </h1>
              {description && (
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  {description}
                </p>
              )}
            </div>

            {/* 用户信息 */}
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
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm"
                >
                  退出
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-6 py-3 bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 text-white dark:text-gray-900 rounded-full font-medium hover:scale-105 transition-transform shadow-lg"
              >
                登录
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {children}
      </main>

      {/* 统一页脚 */}
      <footer className="border-t border-gray-200 dark:border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <p className="text-center text-xs text-gray-400 dark:text-gray-600">
            © 2026 IT 学习平台
          </p>
        </div>
      </footer>
    </div>
  );
}
