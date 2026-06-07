"use client";

import { useState } from "react";
import Link from "next/link";

// 编程语言数据
const languages = [
  {
    id: "javascript",
    name: "JavaScript",
    icon: "🟨",
    description: "最流行的Web编程语言",
    gradient: "from-yellow-500 to-amber-500",
    category: "前端",
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: "🔷",
    description: "类型安全的JavaScript超集",
    gradient: "from-blue-400 to-blue-600",
    category: "前端",
  },
  {
    id: "python",
    name: "Python",
    icon: "🐍",
    description: "简洁优雅的通用语言",
    gradient: "from-yellow-600 to-blue-600",
    category: "后端",
  },
  {
    id: "java",
    name: "Java",
    icon: "☕",
    description: "企业级应用开发",
    gradient: "from-red-600 to-orange-600",
    category: "后端",
  },
  {
    id: "go",
    name: "Go",
    icon: "🐹",
    description: "高性能并发编程",
    gradient: "from-cyan-600 to-blue-600",
    category: "后端",
  },
  {
    id: "php",
    name: "PHP",
    icon: "🐘",
    description: "经典Web后端语言",
    gradient: "from-indigo-600 to-purple-600",
    category: "后端",
  },
  {
    id: "csharp",
    name: "C#",
    icon: "💜",
    description: "微软.NET平台",
    gradient: "from-purple-600 to-violet-600",
    category: "后端",
  },
  {
    id: "swift",
    name: "Swift",
    icon: "🍎",
    description: "苹果生态开发",
    gradient: "from-orange-500 to-red-500",
    category: "移动端",
  },
  {
    id: "kotlin",
    name: "Kotlin",
    icon: "🤖",
    description: "现代Android开发",
    gradient: "from-purple-500 to-indigo-500",
    category: "移动端",
  },
  {
    id: "dart",
    name: "Dart",
    icon: "🎯",
    description: "Flutter开发语言",
    gradient: "from-cyan-500 to-blue-500",
    category: "移动端",
  },
  {
    id: "rust",
    name: "Rust",
    icon: "🦀",
    description: "内存安全系统语言",
    gradient: "from-orange-700 to-red-800",
    category: "系统",
  },
  {
    id: "cpp",
    name: "C++",
    icon: "⚡",
    description: "高性能系统编程",
    gradient: "from-blue-700 to-indigo-800",
    category: "系统",
  },
];

// 语言对应的框架/库
const frameworksByLanguage: Record<string, Array<{id: string, name: string, description: string, type: string}>> = {
  javascript: [
    { id: "react", name: "React", description: "Facebook出品的UI库", type: "前端框架" },
    { id: "vue", name: "Vue", description: "渐进式前端框架", type: "前端框架" },
    { id: "angular", name: "Angular", description: "Google完整框架", type: "前端框架" },
    { id: "svelte", name: "Svelte", description: "编译时框架", type: "前端框架" },
    { id: "nextjs", name: "Next.js", description: "React全栈框架", type: "全栈框架" },
    { id: "jquery", name: "jQuery", description: "经典DOM操作库", type: "工具库" },
    { id: "d3", name: "D3.js", description: "数据可视化", type: "可视化" },
    { id: "threejs", name: "Three.js", description: "3D图形库", type: "图形库" },
  ],
  typescript: [
    { id: "react-ts", name: "React", description: "类型安全的React", type: "前端框架" },
    { id: "angular-ts", name: "Angular", description: "原生TS框架", type: "前端框架" },
    { id: "nestjs", name: "NestJS", description: "企业级Node框架", type: "后端框架" },
    { id: "nextjs-ts", name: "Next.js", description: "类型安全全栈", type: "全栈框架" },
  ],
  python: [
    { id: "django", name: "Django", description: "全功能Web框架", type: "Web框架" },
    { id: "flask", name: "Flask", description: "轻量级Web框架", type: "Web框架" },
    { id: "fastapi", name: "FastAPI", description: "现代API框架", type: "API框架" },
    { id: "pytorch", name: "PyTorch", description: "深度学习框架", type: "AI框架" },
    { id: "tensorflow", name: "TensorFlow", description: "机器学习平台", type: "AI框架" },
    { id: "pandas", name: "Pandas", description: "数据分析库", type: "数据工具" },
    { id: "numpy", name: "NumPy", description: "科学计算库", type: "数据工具" },
    { id: "scrapy", name: "Scrapy", description: "网络爬虫框架", type: "爬虫" },
  ],
  java: [
    { id: "spring", name: "Spring Boot", description: "企业级Web框架", type: "Web框架" },
    { id: "spring-cloud", name: "Spring Cloud", description: "微服务框架", type: "微服务" },
    { id: "hibernate", name: "Hibernate", description: "ORM框架", type: "数据层" },
    { id: "mybatis", name: "MyBatis", description: "持久层框架", type: "数据层" },
    { id: "struts", name: "Struts", description: "MVC框架", type: "Web框架" },
  ],
  go: [
    { id: "gin", name: "Gin", description: "高性能Web框架", type: "Web框架" },
    { id: "echo", name: "Echo", description: "极简Web框架", type: "Web框架" },
    { id: "beego", name: "Beego", description: "全栈Web框架", type: "Web框架" },
    { id: "fiber", name: "Fiber", description: "Express风格框架", type: "Web框架" },
  ],
  php: [
    { id: "laravel", name: "Laravel", description: "优雅的PHP框架", type: "Web框架" },
    { id: "symfony", name: "Symfony", description: "企业级框架", type: "Web框架" },
    { id: "codeigniter", name: "CodeIgniter", description: "轻量级框架", type: "Web框架" },
    { id: "wordpress", name: "WordPress", description: "CMS内容管理", type: "CMS" },
  ],
  csharp: [
    { id: "aspnet", name: "ASP.NET Core", description: "跨平台Web框架", type: "Web框架" },
    { id: "blazor", name: "Blazor", description: "C# Web UI框架", type: "前端框架" },
    { id: "xamarin", name: "Xamarin", description: "跨平台移动开发", type: "移动框架" },
    { id: "unity", name: "Unity", description: "游戏开发引擎", type: "游戏引擎" },
  ],
  swift: [
    { id: "swiftui", name: "SwiftUI", description: "声明式UI框架", type: "UI框架" },
    { id: "uikit", name: "UIKit", description: "传统iOS UI", type: "UI框架" },
    { id: "vapor", name: "Vapor", description: "服务端Swift框架", type: "后端框架" },
  ],
  kotlin: [
    { id: "jetpack", name: "Jetpack Compose", description: "现代UI工具包", type: "UI框架" },
    { id: "ktor", name: "Ktor", description: "异步Web框架", type: "后端框架" },
    { id: "android-sdk", name: "Android SDK", description: "Android开发套件", type: "开发套件" },
  ],
  dart: [
    { id: "flutter", name: "Flutter", description: "跨平台UI框架", type: "UI框架" },
    { id: "dart-shelf", name: "Shelf", description: "Web服务器中间件", type: "后端框架" },
  ],
  rust: [
    { id: "actix", name: "Actix", description: "高性能Web框架", type: "Web框架" },
    { id: "rocket", name: "Rocket", description: "类型安全Web框架", type: "Web框架" },
    { id: "tokio", name: "Tokio", description: "异步运行时", type: "运行时" },
  ],
  cpp: [
    { id: "qt", name: "Qt", description: "跨平台应用框架", type: "应用框架" },
    { id: "boost", name: "Boost", description: "C++扩展库", type: "工具库" },
    { id: "unreal", name: "Unreal Engine", description: "游戏引擎", type: "游戏引擎" },
  ],
};

export default function LanguageToFramework() {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const selectedLangInfo = languages.find((lang) => lang.id === selectedLanguage);
  const frameworks = selectedLanguage ? frameworksByLanguage[selectedLanguage] || [] : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* 顶部导航 */}
      <header className="border-b bg-white dark:bg-gray-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-2 text-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            返回首页
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            语言与框架
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            选择一门编程语言，查看其生态系统中的框架和库
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧：语言列表 */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700 sticky top-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                选择编程语言
              </h2>

              <div className="space-y-2">
                {["前端", "后端", "移动端", "系统"].map((category) => {
                  const categoryLangs = languages.filter((lang) => lang.category === category);
                  return (
                    <div key={category}>
                      <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                        {category}
                      </h3>
                      {categoryLangs.map((lang) => (
                        <button
                          key={lang.id}
                          onClick={() => setSelectedLanguage(lang.id)}
                          className={`w-full text-left p-3 rounded-lg transition-all mb-2 ${
                            selectedLanguage === lang.id
                              ? `bg-gradient-to-r ${lang.gradient} text-white shadow-lg`
                              : "bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{lang.icon}</span>
                            <div className="flex-1">
                              <div className={`font-semibold text-sm ${
                                selectedLanguage === lang.id ? "text-white" : "text-gray-900 dark:text-white"
                              }`}>
                                {lang.name}
                              </div>
                              <div className={`text-xs ${
                                selectedLanguage === lang.id ? "text-white/80" : "text-gray-500 dark:text-gray-400"
                              }`}>
                                {lang.description}
                              </div>
                            </div>
                            {selectedLanguage === lang.id && (
                              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 右侧：框架展示 */}
          <div className="lg:col-span-2">
            {selectedLanguage && selectedLangInfo ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-4xl">{selectedLangInfo.icon}</span>
                  <div>
                    <h2 className={`text-2xl font-bold bg-gradient-to-r ${selectedLangInfo.gradient} bg-clip-text text-transparent`}>
                      {selectedLangInfo.name} 生态系统
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {frameworks.length} 个框架和库
                    </p>
                  </div>
                </div>

                {frameworks.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {frameworks.map((framework) => (
                      <div
                        key={framework.id}
                        className="p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all cursor-pointer bg-white dark:bg-gray-800"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-bold text-base text-gray-900 dark:text-white">
                            {framework.name}
                          </h3>
                          <span className="text-[10px] px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                            {framework.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {framework.description}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    暂无框架信息
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 border border-gray-200 dark:border-gray-700 text-center">
                <div className="text-6xl mb-4">👈</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  请选择一门编程语言
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  从左侧列表中选择一门语言，查看其相关的框架和库
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
