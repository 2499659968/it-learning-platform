// 项目迭代记录数据

export interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  description: string;
  type: "feature" | "improvement" | "bugfix" | "design";
  changes: {
    category: string;
    items: string[];
  }[];
  impact: "major" | "minor" | "patch";
}

export const changelogData: ChangelogEntry[] = [
  {
    version: "v0.6.0",
    date: "2026-06-08",
    title: "首页完全重构",
    description: "采用一体化不规则设计，去除条条框框，打造现代化视觉体验",
    type: "design",
    impact: "major",
    changes: [
      {
        category: "设计革新",
        items: [
          "去除所有边框和分隔线，一体化设计",
          "左右分栏布局：左侧内容 + 右侧不规则悬浮卡片",
          "工具卡片完全不规则布局（大小、形状、位置、旋转角度各异）",
          "毛玻璃效果悬浮卡片",
          "巨大的标题区域（5xl字体）",
          "渐变背景替代纯色",
        ],
      },
      {
        category: "图标系统",
        items: [
          "从 emoji 改为字母缩写图标",
          "彩色方形徽章设计（FW, ST, PJ 等）",
          "统一视觉语言，更加专业",
          "每个工具独特的品牌色",
        ],
      },
      {
        category: "登录功能增强",
        items: [
          "首页集成登录状态检测",
          "已登录显示用户名和邮箱",
          "个性化登录按钮（渐变+悬浮光晕效果）",
          "圆形胶囊按钮设计",
          "退出登录功能",
        ],
      },
      {
        category: "交互优化",
        items: [
          "卡片 hover 时缩放和阴影效果",
          "按钮 hover 时放大动画",
          "图标 hover 时缩放动画",
          "流畅的过渡动画",
        ],
      },
      {
        category: "响应式设计",
        items: [
          "移动端和桌面端自适应布局",
          "大屏下左右分栏，小屏下堆叠布局",
          "不同设备下的最佳视觉效果",
        ],
      },
    ],
  },
  {
    version: "v0.5.0",
    date: "2026-06-08",
    title: "登录系统上线",
    description: "实现用户登录注册功能，支持技能树进度云端保存",
    type: "feature",
    impact: "major",
    changes: [
      {
        category: "新增功能",
        items: [
          "用户注册和登录系统",
          "技能树学习进度自动保存",
          "用户个人信息管理",
          "游客模式支持",
          "登出功能",
        ],
      },
      {
        category: "技术实现",
        items: [
          "基于 localStorage 的本地认证",
          "用户数据持久化存储",
          "自动同步技能进度",
          "会话管理",
        ],
      },
      {
        category: "UI/UX",
        items: [
          "精美的登录页面设计",
          "渐变背景视觉效果",
          "用户信息显示在导航栏",
          "登录状态提示",
        ],
      },
    ],
  },
  {
    version: "v0.4.0",
    date: "2026-06-08",
    title: "技能树可视化",
    description: "使用 React Flow 实现交互式技能树，支持学习路径规划",
    type: "feature",
    impact: "major",
    changes: [
      {
        category: "核心功能",
        items: [
          "交互式技能树可视化",
          "技能节点状态管理（未解锁/可学习/学习中/已完成）",
          "前置技能依赖关系展示",
          "学习路径预设（前端/全栈/Vue）",
          "技能详情面板",
        ],
      },
      {
        category: "数据结构",
        items: [
          "技能节点数据模型设计",
          "学习路径数据结构",
          "技能状态配置",
          "难度等级系统",
        ],
      },
      {
        category: "交互体验",
        items: [
          "点击节点查看详情",
          "拖拽和缩放画布",
          "动画连线效果",
          "实时进度统计",
          "官方文档链接",
        ],
      },
    ],
  },
  {
    version: "v0.3.0",
    date: "2026-06-08",
    title: "功能规划页面",
    description: "展示项目未来发展方向和扩展计划",
    type: "feature",
    impact: "minor",
    changes: [
      {
        category: "文档",
        items: [
          "三阶段开发计划展示",
          "Phase 1: 基础增强",
          "Phase 2: 智能推荐",
          "Phase 3: 可视化与社交",
          "创意功能展示（职位分析、学习路径生成器等）",
        ],
      },
      {
        category: "设计",
        items: [
          "卡片式布局",
          "阶段颜色标识",
          "功能示意图",
          "渐变背景效果",
        ],
      },
    ],
  },
  {
    version: "v0.2.0",
    date: "2026-06-08",
    title: "语言与框架页面",
    description: "重构为左右分栏布局，清晰展示语言生态",
    type: "improvement",
    impact: "major",
    changes: [
      {
        category: "页面重构",
        items: [
          "左右分栏布局设计",
          "左侧：12种编程语言列表",
          "右侧：选中语言的框架生态",
          "按分类组织（前端/后端/移动端/系统）",
        ],
      },
      {
        category: "数据扩展",
        items: [
          "60+ 种技术和框架",
          "JavaScript → React, Vue, Angular 等",
          "Python → Django, Flask, PyTorch 等",
          "框架类型标签",
          "详细描述信息",
        ],
      },
      {
        category: "交互优化",
        items: [
          "点击语言高亮显示",
          "固定定位侧边栏",
          "悬停框架卡片高亮",
          "未选择时显示引导",
        ],
      },
    ],
  },
  {
    version: "v0.1.0",
    date: "2026-06-08",
    title: "项目初始化",
    description: "创建 Next.js 15 项目，实现基础架构",
    type: "feature",
    impact: "major",
    changes: [
      {
        category: "项目架构",
        items: [
          "Next.js 15 + TypeScript",
          "Tailwind CSS 样式系统",
          "App Router 路由",
          "深色模式支持",
          "响应式设计",
        ],
      },
      {
        category: "基础页面",
        items: [
          "首页课程列表",
          "课程详情页",
          "统一配置系统（config/site.ts）",
          "SEO 优化",
          "Sitemap 生成",
        ],
      },
      {
        category: "开发环境",
        items: [
          "环境变量管理",
          ".env.local 配置",
          "开发/生产环境分离",
          "TypeScript 类型检查",
          "ESLint 代码规范",
        ],
      },
    ],
  },
];

// 统计数据
export const getChangelogStats = () => {
  const totalVersions = changelogData.length;
  const features = changelogData.filter((entry) => entry.type === "feature").length;
  const improvements = changelogData.filter((entry) => entry.type === "improvement").length;
  const bugfixes = changelogData.filter((entry) => entry.type === "bugfix").length;

  const totalChanges = changelogData.reduce(
    (sum, entry) => sum + entry.changes.reduce((s, c) => s + c.items.length, 0),
    0
  );

  return {
    totalVersions,
    features,
    improvements,
    bugfixes,
    totalChanges,
  };
};

// 类型配置
export const typeConfig = {
  feature: {
    label: "新功能",
    icon: "🎉",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    borderColor: "border-green-200 dark:border-green-800",
    textColor: "text-green-700 dark:text-green-300",
  },
  improvement: {
    label: "优化改进",
    icon: "✨",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    borderColor: "border-blue-200 dark:border-blue-800",
    textColor: "text-blue-700 dark:text-blue-300",
  },
  bugfix: {
    label: "问题修复",
    icon: "🐛",
    color: "from-red-500 to-orange-500",
    bgColor: "bg-red-50 dark:bg-red-900/20",
    borderColor: "border-red-200 dark:border-red-800",
    textColor: "text-red-700 dark:text-red-300",
  },
  design: {
    label: "设计更新",
    icon: "🎨",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    borderColor: "border-purple-200 dark:border-purple-800",
    textColor: "text-purple-700 dark:text-purple-300",
  },
};

// 影响级别配置
export const impactConfig = {
  major: {
    label: "重大更新",
    color: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300",
  },
  minor: {
    label: "功能更新",
    color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300",
  },
  patch: {
    label: "小幅更新",
    color: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300",
  },
};
