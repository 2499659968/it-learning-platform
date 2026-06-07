"use client";

import { useState, useMemo } from "react";
import PageLayout from "@/components/PageLayout";
import {
  glossaryData,
  categories,
  importanceConfig,
  getGlossaryStats,
} from "./glossaryData";

export default function GlossaryPage() {
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImportance, setSelectedImportance] = useState<string | null>(null);

  const stats = getGlossaryStats();

  // 筛选术语
  const filteredTerms = useMemo(() => {
    return glossaryData.filter((term) => {
      // 分类筛选
      if (selectedCategory !== "全部" && term.category !== selectedCategory) {
        return false;
      }

      // 重要性筛选
      if (selectedImportance && term.importance !== selectedImportance) {
        return false;
      }

      // 搜索筛选
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchTerm = term.term.toLowerCase().includes(query);
        const matchDef = term.definition.toLowerCase().includes(query);
        if (!matchTerm && !matchDef) return false;
      }

      return true;
    });
  }, [selectedCategory, selectedImportance, searchQuery]);

  return (
    <PageLayout
      title="黑话词典"
      description="快速掌握编程术语，融入程序员氛围"
    >
      {/* 统计卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {stats.total}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">总术语数</div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="text-3xl font-bold text-red-600 dark:text-red-400">
            {stats.byImportance.必知 || 0}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">必知术语</div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {stats.byImportance.常用 || 0}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">常用术语</div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">
            {stats.byCategory["AI时代"] || 0}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">AI 时代</div>
        </div>
      </div>

      {/* 搜索和筛选 */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 mb-8 border border-gray-200 dark:border-gray-800">
        {/* 搜索框 */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索术语或定义..."
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
        </div>

        {/* 分类筛选 */}
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

        {/* 重要性筛选 */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            按重要性筛选
          </h3>
          <div className="flex flex-wrap gap-2">
            {Object.keys(importanceConfig).map((importance) => {
              const config =
                importanceConfig[importance as keyof typeof importanceConfig];
              const isSelected = selectedImportance === importance;
              return (
                <button
                  key={importance}
                  onClick={() =>
                    setSelectedImportance(isSelected ? null : importance)
                  }
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isSelected
                      ? config.color
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {config.icon} {importance}
                </button>
              );
            })}
            {selectedImportance && (
              <button
                onClick={() => setSelectedImportance(null)}
                className="px-3 py-2 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                清除
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 术语列表 */}
      <div className="mb-6 text-sm text-gray-600 dark:text-gray-400">
        找到 <span className="font-bold text-gray-900 dark:text-white">{filteredTerms.length}</span> 个术语
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTerms.map((term) => {
          const config = importanceConfig[term.importance];
          return (
            <div
              key={term.id}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all p-6"
            >
              {/* 术语头部 */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {term.term}
                    {term.pronunciation && (
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
                        {term.pronunciation}
                      </span>
                    )}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded ${config.color}`}>
                      {config.icon} {term.importance}
                    </span>
                    <span className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                      {term.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* 定义 */}
              <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                {term.definition}
              </p>

              {/* 使用场景 */}
              {term.example && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-3 mb-3 rounded">
                  <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold mb-1">
                    💬 使用场景
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                    {term.example}
                  </p>
                </div>
              )}

              {/* 趣味知识 */}
              {term.funFact && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-3 mb-3 rounded">
                  <div className="text-xs text-yellow-600 dark:text-yellow-400 font-semibold mb-1">
                    😄 趣味知识
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {term.funFact}
                  </p>
                </div>
              )}

              {/* 相关术语 */}
              {term.relatedTerms && term.relatedTerms.length > 0 && (
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    🔗 相关术语
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {term.relatedTerms.map((related) => (
                      <span
                        key={related}
                        className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                      >
                        {related}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 无结果提示 */}
      {filteredTerms.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            没有找到匹配的术语
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            试试调整搜索关键词或筛选条件
          </p>
        </div>
      )}
    </PageLayout>
  );
}
