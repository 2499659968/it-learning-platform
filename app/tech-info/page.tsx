"use client";

import { useState, useMemo } from "react";
import PageLayout from "@/components/PageLayout";
import { techData, difficultyConfig, allTags, categories } from "./techData";

export default function TechInfoPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  // 筛选和搜索
  const filteredTechs = useMemo(() => {
    return techData.filter((tech) => {
      // 搜索过滤
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchName = tech.name.toLowerCase().includes(query);
        const matchDesc = tech.description.toLowerCase().includes(query);
        const matchTags = tech.tags.some((tag) => tag.toLowerCase().includes(query));
        if (!matchName && !matchDesc && !matchTags) return false;
      }

      // 分类过滤
      if (selectedCategory !== "全部" && tech.category !== selectedCategory) {
        return false;
      }

      // 标签过滤
      if (selectedTags.length > 0) {
        const hasTags = selectedTags.every((tag) => tech.tags.includes(tag));
        if (!hasTags) return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const selectedTechData = techData.find((t) => t.id === selectedTech);

  return (
    <PageLayout
      title="技术查询"
      description="查找技术详情、学习难度、薪资范围等信息"
    >
      {/* 搜索栏 */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 mb-8 border border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索技术名称、标签或描述..."
              className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          <div className="text-sm text-gray-600 dark:text-gray-400">
            找到 <span className="font-bold text-gray-900 dark:text-white">{filteredTechs.length}</span> 项技术
          </div>
        </div>
      </div>

      {/* 分类和标签过滤 */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 mb-8 border border-gray-200 dark:border-gray-800">
        {/* 分类 */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            按分类筛选
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 标签 */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            按标签筛选 {selectedTags.length > 0 && `(已选${selectedTags.length}个)`}
          </h3>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isSelected
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {tag} {isSelected && "✓"}
                </button>
              );
            })}
          </div>
          {selectedTags.length > 0 && (
            <button
              onClick={() => setSelectedTags([])}
              className="mt-3 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              清除标签
            </button>
          )}
        </div>
      </div>

      {/* 技术卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredTechs.map((tech) => {
          const difficulty = difficultyConfig[tech.difficulty];
          return (
            <div
              key={tech.id}
              onClick={() => setSelectedTech(tech.id)}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-all cursor-pointer hover:shadow-lg group p-5"
            >
              {/* 图标和标题 */}
              <div className="flex items-start gap-3 mb-3">
                <span className="text-4xl">{tech.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 truncate">{tech.name}</h3>
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="text-xs text-gray-500 dark:text-gray-400">{tech.category}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${difficulty.color}`}>
                      {difficulty.icon}
                    </span>
                  </div>
                </div>
              </div>

              {/* 描述 */}
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                {tech.description}
              </p>

              {/* 关键信息 */}
              <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                <div className="bg-gray-50 dark:bg-gray-800 rounded p-1.5">
                  <div className="text-gray-500 dark:text-gray-400 text-[10px]">⭐</div>
                  <div className="font-semibold text-gray-900 dark:text-white text-[10px]">
                    {tech.githubStars}
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded p-1.5">
                  <div className="text-gray-500 dark:text-gray-400 text-[10px]">📈</div>
                  <div className="font-semibold text-gray-900 dark:text-white text-[10px]">
                    {tech.popularity}%
                  </div>
                </div>
              </div>

              {/* 查看详情按钮 */}
              <button className="w-full py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                查看详情
              </button>
            </div>
          );
        })}
      </div>

      {/* 无结果提示 */}
      {filteredTechs.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            没有找到匹配的技术
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            试试调整搜索关键词或筛选条件
          </p>
        </div>
      )}

      {/* 详情弹窗 */}
      {selectedTechData && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedTech(null)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 详情头部 */}
            <div className={`bg-gradient-to-r ${selectedTechData.gradient} p-6 relative`}>
              <button
                onClick={() => setSelectedTech(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-white transition-colors"
              >
                ✕
              </button>
              <div className="flex items-start gap-4">
                <span className="text-6xl">{selectedTechData.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-3xl font-bold text-white">{selectedTechData.name}</h2>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        difficultyConfig[selectedTechData.difficulty].color
                      }`}
                    >
                      {difficultyConfig[selectedTechData.difficulty].icon}{" "}
                      {selectedTechData.difficulty}
                    </span>
                  </div>
                  <p className="text-white/90 text-lg mb-2">{selectedTechData.description}</p>
                  <div className="flex items-center gap-3 text-sm text-white/80">
                    <span>⭐ {selectedTechData.githubStars}</span>
                    <span>•</span>
                    <span>📈 {selectedTechData.popularity}% 流行</span>
                    <span>•</span>
                    <span>📅 {selectedTechData.releaseYear}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 详情内容 */}
            <div className="p-6 space-y-6">
              {/* 详细介绍 */}
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                  📖 详细介绍
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selectedTechData.detailedDescription}
                </p>
              </div>

              {/* 薪资范围 */}
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                  💰 薪资范围
                </h3>
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                    {selectedTechData.salaryRange}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    年薪（美国市场参考）
                  </p>
                </div>
              </div>

              {/* 使用场景 */}
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                  🎯 使用场景
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedTechData.useCases.map((useCase) => (
                    <span
                      key={useCase}
                      className="px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg text-sm"
                    >
                      {useCase}
                    </span>
                  ))}
                </div>
              </div>

              {/* 代表公司 */}
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                  🏢 代表公司
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedTechData.companies.map((company) => (
                    <span
                      key={company}
                      className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium"
                    >
                      {company}
                    </span>
                  ))}
                </div>
              </div>

              {/* 标签 */}
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                  🏷️ 技术标签
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedTechData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 学习资源 */}
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                  📚 学习资源
                </h3>
                <div className="space-y-2">
                  <a
                    href={selectedTechData.officialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-blue-700 dark:text-blue-300 font-medium">
                        🌐 官方网站
                      </span>
                      <span className="text-blue-600 dark:text-blue-400">→</span>
                    </div>
                  </a>
                  {selectedTechData.resources.github && (
                    <a
                      href={selectedTechData.resources.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                          💻 GitHub 仓库
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">→</span>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
