"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { projectsData, difficultyConfig, categories, getProjectStats } from "./projectsData";

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const stats = getProjectStats();

  // 筛选项目
  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      // 分类筛选
      if (selectedCategory !== "全部" && project.category !== selectedCategory) {
        return false;
      }

      // 难度筛选
      if (selectedDifficulty && project.difficulty !== selectedDifficulty) {
        return false;
      }

      // 搜索筛选
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchTitle = project.title.toLowerCase().includes(query);
        const matchDesc = project.description.toLowerCase().includes(query);
        const matchTech = project.techStack.some((tech) =>
          tech.toLowerCase().includes(query)
        );
        if (!matchTitle && !matchDesc && !matchTech) return false;
      }

      return true;
    });
  }, [selectedCategory, selectedDifficulty, searchQuery]);

  const selectedProjectData = projectsData.find((p) => p.id === selectedProject);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* 顶部导航 */}
      <header className="border-b bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-20">
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
            💼 项目实战库
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            从入门到专家，精选实战项目助你提升技能
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 统计卡片 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {stats.total}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">总项目数</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {stats.byDifficulty.入门 + stats.byDifficulty.初级}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">新手友好</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {stats.byDifficulty.中级 + stats.byDifficulty.高级}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">进阶挑战</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
              {(stats.totalCompletions / 1000).toFixed(1)}k
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">已完成</div>
          </div>
        </div>

        {/* 搜索和筛选 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700">
          {/* 搜索框 */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索项目名称、技术栈..."
                className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* 分类筛选 */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              📂 项目分类
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* 难度筛选 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              🎯 难度等级
            </h3>
            <div className="flex flex-wrap gap-2">
              {Object.keys(difficultyConfig).map((difficulty) => {
                const config = difficultyConfig[difficulty as keyof typeof difficultyConfig];
                const isSelected = selectedDifficulty === difficulty;
                return (
                  <button
                    key={difficulty}
                    onClick={() =>
                      setSelectedDifficulty(isSelected ? null : difficulty)
                    }
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isSelected
                        ? config.color + " shadow-md border-2 border-current"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {difficulty} ({stats.byDifficulty[difficulty as keyof typeof stats.byDifficulty]})
                  </button>
                );
              })}
              {selectedDifficulty && (
                <button
                  onClick={() => setSelectedDifficulty(null)}
                  className="px-3 py-2 text-xs text-red-600 dark:text-red-400 hover:underline"
                >
                  清除筛选
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 项目列表 */}
        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          找到 <span className="font-bold text-blue-600">{filteredProjects.length}</span> 个项目
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const config = difficultyConfig[project.difficulty];
            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project.id)}
                className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all cursor-pointer hover:shadow-xl group overflow-hidden"
              >
                {/* 项目头部 */}
                <div className={`bg-gradient-to-r ${project.gradient} p-5 relative`}>
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-5xl">{project.icon}</span>
                    <span className={`text-xs px-2 py-1 rounded ${config.color}`}>
                      {project.difficulty}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-sm text-white/80">{project.description}</p>
                </div>

                {/* 项目内容 */}
                <div className="p-5">
                  {/* 时长和完成数 */}
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <span>⏱️</span>
                      <span>{project.estimatedHours}h</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <span>👥</span>
                      <span>{(project.completionCount / 1000).toFixed(1)}k</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <span>📈</span>
                      <span>{project.popularity}%</span>
                    </div>
                  </div>

                  {/* 技术栈 */}
                  <div className="mb-4">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      技术栈
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 核心特性 */}
                  <div className="mb-4">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      核心特性
                    </div>
                    <ul className="space-y-1">
                      {project.features.slice(0, 3).map((feature, idx) => (
                        <li
                          key={idx}
                          className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-1"
                        >
                          <span className="text-green-500">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 查看详情按钮 */}
                  <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    查看详情 →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 无结果提示 */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              没有找到匹配的项目
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              试试调整搜索关键词或筛选条件
            </p>
          </div>
        )}
      </main>

      {/* 项目详情弹窗 */}
      {selectedProjectData && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full my-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 详情头部 */}
            <div className={`bg-gradient-to-r ${selectedProjectData.gradient} p-8 relative rounded-t-xl`}>
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-white transition-colors"
              >
                ✕
              </button>
              <div className="flex items-start gap-4">
                <span className="text-6xl">{selectedProjectData.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl font-bold text-white">
                      {selectedProjectData.title}
                    </h2>
                    <span
                      className={`text-xs px-3 py-1 rounded ${
                        difficultyConfig[selectedProjectData.difficulty].color
                      }`}
                    >
                      {selectedProjectData.difficulty}
                    </span>
                  </div>
                  <p className="text-white/90 text-lg mb-3">
                    {selectedProjectData.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-white/80">
                    <span>⏱️ {selectedProjectData.estimatedHours} 小时</span>
                    <span>•</span>
                    <span>👥 {selectedProjectData.completionCount.toLocaleString()} 人完成</span>
                    <span>•</span>
                    <span>📈 {selectedProjectData.popularity}% 推荐</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 详情内容 */}
            <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto">
              {/* 项目介绍 */}
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <span>📖</span>
                  项目介绍
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {selectedProjectData.detailedDescription}
                </p>
              </div>

              {/* 技术栈 */}
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span>🛠️</span>
                  技术栈
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProjectData.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* 核心特性 */}
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span>✨</span>
                  核心特性
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedProjectData.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2"
                    >
                      <span className="text-green-500">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 学习要点 */}
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span>🎯</span>
                  学习要点
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedProjectData.learningPoints.map((point, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2"
                    >
                      <span className="text-purple-500">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 功能需求 */}
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span>📋</span>
                  功能需求
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <ul className="space-y-1.5">
                    {selectedProjectData.requirements.functional.map((req, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2"
                      >
                        <span className="text-blue-500 mt-0.5">▸</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 技术要求 */}
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span>⚙️</span>
                  技术要求
                </h3>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <ul className="space-y-1.5">
                    {selectedProjectData.requirements.technical.map((req, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2"
                      >
                        <span className="text-purple-500 mt-0.5">▸</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 学习资源 */}
              {(selectedProjectData.resources.demoUrl ||
                selectedProjectData.resources.githubUrl ||
                selectedProjectData.resources.tutorialUrl) && (
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <span>📚</span>
                    学习资源
                  </h3>
                  <div className="space-y-2">
                    {selectedProjectData.resources.tutorialUrl && (
                      <a
                        href={selectedProjectData.resources.tutorialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-blue-700 dark:text-blue-300 font-medium">
                            📖 教程文档
                          </span>
                          <span className="text-blue-600 dark:text-blue-400">→</span>
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* 开始挑战按钮 */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-lg font-bold hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl">
                  🚀 开始挑战
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
