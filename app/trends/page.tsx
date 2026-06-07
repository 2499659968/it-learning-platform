"use client";

import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// AI 编程工具数据
const aiToolsData = [
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    icon: "🤖",
    company: "GitHub/Microsoft",
    category: "AI代码助手",
    description: "最流行的AI代码补全工具",
    users: "150万+",
    price: "$10/月",
    features: ["实时代码补全", "多语言支持", "上下文理解"],
    rating: 4.5,
    trend: "领先",
  },
  {
    id: "cursor",
    name: "Cursor",
    icon: "✨",
    company: "Cursor",
    category: "AI代码编辑器",
    description: "专为AI设计的代码编辑器",
    users: "50万+",
    price: "$20/月",
    features: ["AI聊天", "代码重构", "Bug修复"],
    rating: 4.8,
    trend: "飙升",
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    icon: "💬",
    company: "OpenAI",
    category: "通用AI助手",
    description: "最知名的AI对话工具",
    users: "2亿+",
    price: "$20/月",
    features: ["代码生成", "问题解答", "代码解释"],
    rating: 4.6,
    trend: "领先",
  },
  {
    id: "claude",
    name: "Claude",
    icon: "🎯",
    company: "Anthropic",
    category: "AI编程助手",
    description: "强大的AI编程助手",
    users: "30万+",
    price: "$20/月",
    features: ["多文件编辑", "终端集成", "长上下文"],
    rating: 4.9,
    trend: "飙升",
  },
  {
    id: "v0",
    name: "v0 by Vercel",
    icon: "🎨",
    company: "Vercel",
    category: "UI生成工具",
    description: "AI生成React组件",
    users: "20万+",
    price: "免费/付费",
    features: ["UI生成", "React/Next.js", "Tailwind CSS"],
    rating: 4.7,
    trend: "飙升",
  },
  {
    id: "codeium",
    name: "Codeium",
    icon: "🚀",
    company: "Codeium",
    category: "AI代码助手",
    description: "免费的AI代码补全",
    users: "80万+",
    price: "免费",
    features: ["完全免费", "多IDE支持", "实时补全"],
    rating: 4.4,
    trend: "上升",
  },
];

// 主流编程语言数据（基于 TIOBE, Stack Overflow, GitHub 等权威数据）
const languagesData = [
  {
    id: "python",
    name: "Python",
    icon: "🐍",
    rank: 1,
    tiobeIndex: "15.39%",
    githubStars: "2.1M",
    stackOverflowJobs: "25.7%",
    avgSalary: "$120k",
    trend: "上升",
    yearOverYear: "+2.3%",
    gradient: "from-blue-500 to-yellow-500",
    strengths: ["AI/ML", "数据科学", "自动化", "Web开发"],
    popularFrameworks: ["Django", "Flask", "FastAPI", "PyTorch", "TensorFlow"],
    companies: ["Google", "Netflix", "Instagram", "Spotify"],
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: "⚡",
    rank: 2,
    tiobeIndex: "8.62%",
    githubStars: "3.5M",
    stackOverflowJobs: "32.4%",
    avgSalary: "$115k",
    trend: "稳定",
    yearOverYear: "+0.5%",
    gradient: "from-yellow-500 to-amber-600",
    strengths: ["前端开发", "全栈开发", "移动应用", "服务端"],
    popularFrameworks: ["React", "Vue", "Next.js", "Node.js", "Express"],
    companies: ["Facebook", "Airbnb", "Uber", "LinkedIn"],
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: "🔷",
    rank: 3,
    tiobeIndex: "3.01%",
    githubStars: "980K",
    stackOverflowJobs: "18.2%",
    avgSalary: "$125k",
    trend: "飙升",
    yearOverYear: "+5.7%",
    gradient: "from-blue-600 to-cyan-600",
    strengths: ["类型安全", "大型项目", "团队协作", "企业应用"],
    popularFrameworks: ["Angular", "Nest.js", "React", "Next.js"],
    companies: ["Microsoft", "Google", "Slack", "Shopify"],
  },
  {
    id: "java",
    name: "Java",
    icon: "☕",
    rank: 4,
    tiobeIndex: "7.45%",
    githubStars: "1.2M",
    stackOverflowJobs: "15.8%",
    avgSalary: "$118k",
    trend: "稳定",
    yearOverYear: "-0.3%",
    gradient: "from-red-600 to-orange-600",
    strengths: ["企业应用", "Android开发", "后端服务", "大数据"],
    popularFrameworks: ["Spring", "Spring Boot", "Hibernate", "Apache Kafka"],
    companies: ["Amazon", "Oracle", "IBM", "Twitter"],
  },
  {
    id: "csharp",
    name: "C#",
    icon: "💜",
    rank: 5,
    tiobeIndex: "6.73%",
    githubStars: "850K",
    stackOverflowJobs: "12.3%",
    avgSalary: "$112k",
    trend: "稳定",
    yearOverYear: "+0.8%",
    gradient: "from-purple-600 to-indigo-600",
    strengths: ["游戏开发", ".NET应用", "企业软件", "桌面应用"],
    popularFrameworks: [".NET", "ASP.NET Core", "Unity", "Xamarin"],
    companies: ["Microsoft", "Stack Overflow", "Bing", "Zillow"],
  },
  {
    id: "go",
    name: "Go",
    icon: "🐹",
    rank: 6,
    tiobeIndex: "1.89%",
    githubStars: "620K",
    stackOverflowJobs: "8.9%",
    avgSalary: "$135k",
    trend: "上升",
    yearOverYear: "+3.2%",
    gradient: "from-cyan-600 to-blue-600",
    strengths: ["云原生", "微服务", "高并发", "DevOps"],
    popularFrameworks: ["Gin", "Echo", "Kubernetes", "Docker"],
    companies: ["Google", "Uber", "Dropbox", "Netflix"],
  },
  {
    id: "rust",
    name: "Rust",
    icon: "🦀",
    rank: 7,
    tiobeIndex: "1.45%",
    githubStars: "420K",
    stackOverflowJobs: "4.2%",
    avgSalary: "$145k",
    trend: "飙升",
    yearOverYear: "+7.8%",
    gradient: "from-orange-700 to-red-700",
    strengths: ["系统编程", "性能优化", "内存安全", "区块链"],
    popularFrameworks: ["Tokio", "Actix", "Rocket", "Tauri"],
    companies: ["Mozilla", "Cloudflare", "Discord", "Amazon"],
  },
  {
    id: "swift",
    name: "Swift",
    icon: "🍎",
    rank: 8,
    tiobeIndex: "1.23%",
    githubStars: "380K",
    stackOverflowJobs: "5.1%",
    avgSalary: "$128k",
    trend: "稳定",
    yearOverYear: "+1.2%",
    gradient: "from-orange-500 to-red-500",
    strengths: ["iOS开发", "macOS应用", "苹果生态", "移动应用"],
    popularFrameworks: ["SwiftUI", "UIKit", "Combine", "Vapor"],
    companies: ["Apple", "Uber", "Airbnb", "LinkedIn"],
  },
];

export default function TrendsPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const selectedLang = languagesData.find((l) => l.id === selectedLanguage);

  // 准备图表数据
  const chartData = languagesData.map(lang => ({
    name: lang.name,
    tiobe: parseFloat(lang.tiobeIndex),
    salary: parseInt(lang.avgSalary.replace('$', '').replace('k', '')),
    jobs: parseFloat(lang.stackOverflowJobs),
    growth: parseFloat(lang.yearOverYear),
  }));

  return (
    <PageLayout
      title="编程语言趋势"
      description="基于 TIOBE、GitHub、Stack Overflow 等权威数据"
    >
      {/* 数据来源说明 */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-8">
        <div className="flex items-start gap-3">
          <span className="text-2xl">📊</span>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-1">数据来源</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              TIOBE Index (2024) • GitHub Stats (2024) • Stack Overflow Developer Survey (2024) • 美国市场薪资参考
            </p>
          </div>
        </div>
      </div>

      {/* 数据可视化图表 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* TIOBE 指数排名 */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
            📊 TIOBE 指数排名
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis
                dataKey="name"
                tick={{ fill: '#6B7280', fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="tiobe" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 60%)`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 平均薪资对比 */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
            💰 平均薪资对比 (k/年)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis
                dataKey="name"
                tick={{ fill: '#6B7280', fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="salary" fill="#10B981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI 编程工具 */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          🤖 AI 编程工具
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          2024年最重要的趋势：每个程序员都应该掌握的AI工具
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {aiToolsData.map((tool) => (
            <div
              key={tool.id}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-all hover:shadow-lg p-5"
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="text-4xl">{tool.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                    {tool.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                      {tool.category}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                      tool.trend === "飙升" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" :
                      tool.trend === "上升" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" :
                      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                    }`}>
                      {tool.trend}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {tool.description}
              </p>

              <div className="space-y-2 mb-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">用户数</span>
                  <span className="font-bold text-gray-900 dark:text-white">{tool.users}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">价格</span>
                  <span className="font-bold text-green-600 dark:text-green-400">{tool.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">评分</span>
                  <span className="font-bold text-yellow-600 dark:text-yellow-400">⭐ {tool.rating}</span>
                </div>
              </div>

              <div className="mb-3">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">核心功能</div>
                <div className="flex flex-wrap gap-1">
                  {tool.features.map((feature) => (
                    <span
                      key={feature}
                      className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-400">
                by {tool.company}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 语言卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {languagesData.map((lang) => (
          <div
            key={lang.id}
            onClick={() => setSelectedLanguage(lang.id)}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-all cursor-pointer hover:shadow-lg group p-5"
          >
            {/* 排名徽章 */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-5xl">{lang.icon}</span>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{lang.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded font-bold">
                      #{lang.rank}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                      lang.trend === "飙升" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" :
                      lang.trend === "上升" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" :
                      "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    }`}>
                      {lang.trend === "飙升" ? "🔥" : lang.trend === "上升" ? "📈" : "—"} {lang.trend}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 核心指标 */}
            <div className="space-y-2 mb-4 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">TIOBE指数</span>
                <span className="font-bold text-gray-900 dark:text-white">{lang.tiobeIndex}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">GitHub项目</span>
                <span className="font-bold text-gray-900 dark:text-white">{lang.githubStars}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">职位占比</span>
                <span className="font-bold text-gray-900 dark:text-white">{lang.stackOverflowJobs}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">平均薪资</span>
                <span className="font-bold text-green-600 dark:text-green-400">{lang.avgSalary}</span>
              </div>
            </div>

            {/* 优势领域 */}
            <div className="mb-3">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">优势领域</div>
              <div className="flex flex-wrap gap-1">
                {lang.strengths.slice(0, 2).map((strength) => (
                  <span
                    key={strength}
                    className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded"
                  >
                    {strength}
                  </span>
                ))}
                {lang.strengths.length > 2 && (
                  <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                    +{lang.strengths.length - 2}
                  </span>
                )}
              </div>
            </div>

            {/* 查看详情按钮 */}
            <button className="w-full py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              查看详情
            </button>
          </div>
        ))}
      </div>

      {/* 趋势说明 */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <div className="text-3xl mb-3">🔥</div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">飙升趋势</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            年增长率 {'>'}5%，市场需求快速增长，是当前最热门的选择
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <div className="text-3xl mb-3">📈</div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">上升趋势</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            年增长率 1-5%，稳步增长，是可靠的职业发展方向
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <div className="text-3xl mb-3">—</div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">稳定趋势</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            市场成熟，需求稳定，是经典的主流选择
          </p>
        </div>
      </div>

      {/* 详情弹窗 */}
      {selectedLang && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedLanguage(null)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 详情头部 */}
            <div className={`bg-gradient-to-r ${selectedLang.gradient} p-6 relative`}>
              <button
                onClick={() => setSelectedLanguage(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-white transition-colors"
              >
                ✕
              </button>
              <div className="flex items-start gap-4">
                <span className="text-6xl">{selectedLang.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-3xl font-bold text-white">{selectedLang.name}</h2>
                    <span className="text-sm px-3 py-1 bg-white/20 rounded-full text-white font-bold">
                      #{selectedLang.rank}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/90">
                    <span>📊 TIOBE {selectedLang.tiobeIndex}</span>
                    <span>•</span>
                    <span>{selectedLang.trend} {selectedLang.yearOverYear}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 详情内容 */}
            <div className="p-6 space-y-6">
              {/* 核心数据 */}
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3">
                  📊 核心数据
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400">GitHub 项目数</div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">{selectedLang.githubStars}</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400">职位占比</div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">{selectedLang.stackOverflowJobs}</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400">平均薪资</div>
                    <div className="text-xl font-bold text-green-600 dark:text-green-400">{selectedLang.avgSalary}</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400">年增长率</div>
                    <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{selectedLang.yearOverYear}</div>
                  </div>
                </div>
              </div>

              {/* 优势领域 */}
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3">
                  🎯 优势领域
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedLang.strengths.map((strength) => (
                    <span
                      key={strength}
                      className="px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg text-sm"
                    >
                      {strength}
                    </span>
                  ))}
                </div>
              </div>

              {/* 热门框架 */}
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3">
                  🔧 热门框架/工具
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedLang.popularFrameworks.map((framework) => (
                    <span
                      key={framework}
                      className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium"
                    >
                      {framework}
                    </span>
                  ))}
                </div>
              </div>

              {/* 代表公司 */}
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3">
                  🏢 代表公司
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedLang.companies.map((company) => (
                    <span
                      key={company}
                      className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium"
                    >
                      {company}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
