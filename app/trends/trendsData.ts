// AI 时代技术趋势数据

export interface TechTrend {
  id: string;
  name: string;
  category: "AI核心" | "AI应用" | "传统进化" | "新兴技术";
  icon: string;
  description: string;
  aiImpact: "颠覆性" | "重大影响" | "显著影响" | "轻微影响";

  // 趋势指标
  growthRate: number; // 增长率 1-100
  jobDemand: number; // 职位需求 1-100
  learningCurve: "陡峭" | "中等" | "平缓";

  // AI 相关
  aiIntegration: string; // AI 如何改变这个技术
  futureOutlook: string; // 未来展望

  // 学习建议
  whyLearn: string[];
  relatedAITools: string[];

  gradient: string;
}

export const trendsData: TechTrend[] = [
  // AI 核心技术
  {
    id: "llm",
    name: "大语言模型（LLM）",
    category: "AI核心",
    icon: "🤖",
    description: "GPT、Claude 等大模型正在改变软件开发方式",
    aiImpact: "颠覆性",
    growthRate: 98,
    jobDemand: 95,
    learningCurve: "陡峭",
    aiIntegration: "LLM 本身就是 AI 时代的核心技术，正在重新定义人机交互、代码生成、内容创作等各个领域。",
    futureOutlook: "未来 3-5 年，LLM 将成为所有软件的标配。会使用 LLM API、Prompt Engineering、微调模型的开发者将极具竞争力。",
    whyLearn: [
      "未来每个应用都会集成 AI 能力",
      "Prompt Engineering 成为新的编程范式",
      "AI Agent 开发需求暴增",
      "薪资溢价高达 30-50%",
    ],
    relatedAITools: ["OpenAI API", "Claude API", "LangChain", "Vector DB"],
    gradient: "from-purple-600 to-pink-600",
  },
  {
    id: "ai-agent",
    name: "AI Agent 开发",
    category: "AI核心",
    icon: "🤵",
    description: "能自主完成任务的 AI 智能体",
    aiImpact: "颠覆性",
    growthRate: 95,
    jobDemand: 88,
    learningCurve: "陡峭",
    aiIntegration: "AI Agent 是 LLM 的高级应用，结合工具调用、记忆系统、规划能力，能够自主完成复杂任务。",
    futureOutlook: "2024-2026 是 AI Agent 的爆发期。从客服机器人到自动化工作流，Agent 将渗透到各行各业。",
    whyLearn: [
      "新兴热门领域，人才缺口巨大",
      "结合多种技术（LLM + 后端 + 前端）",
      "可以做出真正有价值的产品",
      "创业机会多",
    ],
    relatedAITools: ["LangChain", "AutoGPT", "CrewAI", "LangGraph"],
    gradient: "from-blue-600 to-purple-600",
  },
  {
    id: "prompt-engineering",
    name: "Prompt Engineering",
    category: "AI核心",
    icon: "✍️",
    description: "与 AI 对话的艺术和科学",
    aiImpact: "颠覆性",
    growthRate: 92,
    jobDemand: 85,
    learningCurve: "中等",
    aiIntegration: "Prompt Engineering 是 AI 时代的新型编程语言，掌握它能让你 10 倍效率地使用 AI。",
    futureOutlook: "会成为每个开发者的必备技能，就像今天的 Git 一样。专业的 Prompt Engineer 年薪可达 $200k+。",
    whyLearn: [
      "最容易入门的 AI 技能",
      "立即提升工作效率",
      "几乎所有 AI 应用都需要",
      "独立技能，也是其他 AI 技能的基础",
    ],
    relatedAITools: ["ChatGPT", "Claude", "Midjourney", "Cursor"],
    gradient: "from-green-600 to-teal-600",
  },

  // AI 应用
  {
    id: "ai-frontend",
    name: "AI 辅助前端开发",
    category: "AI应用",
    icon: "🎨",
    description: "从设计稿到代码，AI 正在改变前端开发",
    aiImpact: "重大影响",
    growthRate: 88,
    jobDemand: 90,
    learningCurve: "平缓",
    aiIntegration: "AI 可以生成 UI 代码、优化性能、自动化测试。v0.dev、Cursor 等工具让前端开发效率提升 5-10 倍。",
    futureOutlook: "未来前端开发将更注重产品思维和用户体验，而不是写样式代码。会用 AI 工具的前端工程师将更有竞争力。",
    whyLearn: [
      "提升开发效率 5-10 倍",
      "从重复劳动中解放出来",
      "更多时间关注用户体验",
      "掌握 AI 工具成为加分项",
    ],
    relatedAITools: ["v0.dev", "Cursor", "GitHub Copilot", "Figma AI"],
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    id: "ai-backend",
    name: "AI 增强后端",
    category: "AI应用",
    icon: "⚡",
    description: "API 设计、数据库优化、代码审查全面 AI 化",
    aiImpact: "重大影响",
    growthRate: 85,
    jobDemand: 87,
    learningCurve: "中等",
    aiIntegration: "AI 帮助生成 API 代码、优化 SQL 查询、发现安全漏洞、自动化测试。后端开发从编码转向架构设计。",
    futureOutlook: "后端工程师的价值将体现在系统设计、性能优化、安全架构上，而不是 CRUD 代码。",
    whyLearn: [
      "自动化重复性工作",
      "提升代码质量",
      "更多精力投入架构设计",
      "AI 辅助调试和优化",
    ],
    relatedAITools: ["GitHub Copilot", "Cursor", "Tabnine", "AWS CodeWhisperer"],
    gradient: "from-green-600 to-emerald-600",
  },
  {
    id: "rag",
    name: "RAG（检索增强生成）",
    category: "AI应用",
    icon: "📚",
    description: "让 AI 基于你的数据回答问题",
    aiImpact: "重大影响",
    growthRate: 90,
    jobDemand: 82,
    learningCurve: "陡峭",
    aiIntegration: "RAG 是构建企业级 AI 应用的核心技术，结合向量数据库和 LLM，让 AI 能够访问私有知识库。",
    futureOutlook: "企业 AI 应用的标准架构。从客服系统到知识管理，RAG 是必备技术。",
    whyLearn: [
      "企业 AI 应用的核心",
      "技术门槛高，人才稀缺",
      "可以做咨询和外包",
      "薪资高",
    ],
    relatedAITools: ["LangChain", "Pinecone", "Weaviate", "ChromaDB"],
    gradient: "from-orange-600 to-red-600",
  },

  // 传统技术的 AI 进化
  {
    id: "fullstack-ai",
    name: "全栈开发 + AI",
    category: "传统进化",
    icon: "🚀",
    description: "全栈开发者借助 AI 实现 10 倍生产力",
    aiImpact: "显著影响",
    growthRate: 86,
    jobDemand: 92,
    learningCurve: "中等",
    aiIntegration: "AI 让一个人能完成团队的工作。从需求分析到代码实现再到测试部署，AI 全程辅助。",
    futureOutlook: "未来的全栈开发者必须会用 AI 工具。独立开发者借助 AI 能够快速推出产品，获得更多机会。",
    whyLearn: [
      "AI 工具让全栈开发更容易",
      "一个人可以完成完整产品",
      "独立开发者的黄金时代",
      "就业面广",
    ],
    relatedAITools: ["Cursor", "GitHub Copilot", "v0.dev", "Supabase"],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "data-ai",
    name: "数据科学 + AI",
    category: "传统进化",
    icon: "📊",
    description: "AutoML 让数据分析更简单，但深度理解更重要",
    aiImpact: "显著影响",
    growthRate: 83,
    jobDemand: 88,
    learningCurve: "陡峭",
    aiIntegration: "AI 自动化了数据清洗、特征工程、模型选择。但对数据的理解和业务洞察仍然需要人。",
    futureOutlook: "数据科学家的角色从\"建模\"转向\"洞察\"。会讲故事、懂业务的数据科学家更有价值。",
    whyLearn: [
      "AI 降低了入门门槛",
      "市场需求持续旺盛",
      "薪资水平高",
      "可转向 AI 工程师",
    ],
    relatedAITools: ["AutoML", "ChatGPT Code Interpreter", "Julius AI", "Pandas AI"],
    gradient: "from-blue-600 to-indigo-600",
  },
  {
    id: "mobile-ai",
    name: "移动端 AI 应用",
    category: "传统进化",
    icon: "📱",
    description: "AI 功能成为移动应用的标配",
    aiImpact: "显著影响",
    growthRate: 80,
    jobDemand: 85,
    learningCurve: "中等",
    aiIntegration: "从语音识别到图像处理，从个性化推荐到智能助手，AI 功能正在成为移动应用的标配。",
    futureOutlook: "未来每个 App 都会有 AI 功能。会集成 AI SDK、优化端侧模型的移动开发者将更受欢迎。",
    whyLearn: [
      "移动端仍是主战场",
      "AI 功能成为差异化优势",
      "端侧 AI 兴起（隐私和速度）",
      "薪资稳定且高",
    ],
    relatedAITools: ["Core ML", "TensorFlow Lite", "OpenAI Mobile SDK", "MLKit"],
    gradient: "from-pink-500 to-rose-500",
  },

  // 新兴技术
  {
    id: "ai-infra",
    name: "AI 基础设施",
    category: "新兴技术",
    icon: "🏗️",
    description: "支撑 AI 应用的底层技术",
    aiImpact: "重大影响",
    growthRate: 87,
    jobDemand: 78,
    learningCurve: "陡峭",
    aiIntegration: "向量数据库、模型部署、GPU 调度、LLM 网关等基础设施是 AI 应用的基石。",
    futureOutlook: "AI 基础设施市场规模将达数千亿美元。掌握这些技术的工程师极其稀缺，薪资极高。",
    whyLearn: [
      "技术门槛高，竞争少",
      "薪资顶级（$200k+）",
      "核心技术，不会过时",
      "大厂重点招聘方向",
    ],
    relatedAITools: ["Kubernetes", "Ray", "vLLM", "Triton"],
    gradient: "from-gray-700 to-slate-900",
  },
  {
    id: "edge-ai",
    name: "边缘 AI",
    category: "新兴技术",
    icon: "⚡",
    description: "在设备端运行 AI 模型",
    aiImpact: "显著影响",
    growthRate: 82,
    jobDemand: 72,
    learningCurve: "陡峭",
    aiIntegration: "随着模型压缩技术进步，越来越多 AI 功能可以在端侧运行，实现更快响应和更好隐私保护。",
    futureOutlook: "苹果 Apple Intelligence、高通 AI Hub 等推动边缘 AI 普及。未来将有数十亿设备运行端侧 AI。",
    whyLearn: [
      "新兴赛道，机会多",
      "结合硬件和软件",
      "隐私保护是刚需",
      "物联网时代的必备技能",
    ],
    relatedAITools: ["ONNX", "TensorFlow Lite", "Core ML", "MediaPipe"],
    gradient: "from-yellow-600 to-orange-600",
  },
];

// AI 影响配置
export const aiImpactConfig = {
  颠覆性: {
    color: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300",
    description: "彻底改变行业规则",
    icon: "🔥",
  },
  重大影响: {
    color: "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300",
    description: "显著改变工作方式",
    icon: "⚡",
  },
  显著影响: {
    color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300",
    description: "明显提升效率",
    icon: "✨",
  },
  轻微影响: {
    color: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300",
    description: "辅助工具角色",
    icon: "💡",
  },
};

// 学习曲线配置
export const learningCurveConfig = {
  陡峭: {
    color: "text-red-600 dark:text-red-400",
    description: "需要大量时间和精力",
  },
  中等: {
    color: "text-yellow-600 dark:text-yellow-400",
    description: "有一定基础即可学习",
  },
  平缓: {
    color: "text-green-600 dark:text-green-400",
    description: "容易上手",
  },
};

// 分类配置
export const categories = ["全部", "AI核心", "AI应用", "传统进化", "新兴技术"];

// 统计数据
export const getTrendsStats = () => {
  const avgGrowth = Math.round(
    trendsData.reduce((sum, t) => sum + t.growthRate, 0) / trendsData.length
  );
  const avgDemand = Math.round(
    trendsData.reduce((sum, t) => sum + t.jobDemand, 0) / trendsData.length
  );
  const aiCoreCount = trendsData.filter((t) => t.category === "AI核心").length;
  const disruptiveCount = trendsData.filter((t) => t.aiImpact === "颠覆性").length;

  return { avgGrowth, avgDemand, aiCoreCount, disruptiveCount, total: trendsData.length };
};
