// 实战项目数据

export interface Project {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;

  // 难度和时长
  difficulty: "入门" | "初级" | "中级" | "高级" | "专家";
  estimatedHours: number;

  // 技术栈
  techStack: string[];
  primaryTech: string; // 主要技术

  // 分类
  category: "前端" | "后端" | "全栈" | "移动端" | "数据" | "工具";

  // 项目特点
  features: string[];
  learningPoints: string[]; // 学习要点

  // 项目需求
  requirements: {
    functional: string[]; // 功能需求
    technical: string[]; // 技术要求
  };

  // 资源
  resources: {
    demoUrl?: string;
    githubUrl?: string;
    tutorialUrl?: string;
    designUrl?: string;
  };

  // 标签
  tags: string[];

  // 元数据
  popularity: number; // 1-100
  completionCount: number; // 完成人数（模拟）

  gradient: string;
  icon: string;
}

export const projectsData: Project[] = [
  // 前端项目
  {
    id: "todo-app",
    title: "待办事项应用",
    description: "经典的待办清单，React 入门必做项目",
    detailedDescription: "一个功能完善的待办事项管理应用，包含添加、删除、编辑、筛选等功能。通过这个项目可以掌握 React 组件化开发、状态管理、事件处理等核心概念。",
    difficulty: "入门",
    estimatedHours: 8,
    techStack: ["React", "JavaScript", "CSS"],
    primaryTech: "react",
    category: "前端",
    features: [
      "添加/删除/编辑待办事项",
      "标记完成状态",
      "筛选显示（全部/未完成/已完成）",
      "数据持久化（localStorage）",
      "响应式设计",
    ],
    learningPoints: [
      "React 组件和 Props",
      "State 状态管理",
      "事件处理",
      "列表渲染",
      "条件渲染",
      "localStorage 使用",
    ],
    requirements: {
      functional: [
        "用户可以添加新的待办事项",
        "可以标记待办事项为完成/未完成",
        "可以删除待办事项",
        "可以编辑待办事项内容",
        "支持筛选显示不同状态的事项",
        "刷新页面后数据不丢失",
      ],
      technical: [
        "使用 React Hooks（useState, useEffect）",
        "组件化设计",
        "使用 localStorage 持久化数据",
        "CSS 样式美化",
      ],
    },
    resources: {
      tutorialUrl: "https://react.dev/learn/tutorial-tic-tac-toe",
    },
    tags: ["React", "入门", "热门", "实用"],
    popularity: 95,
    completionCount: 15420,
    gradient: "from-blue-500 to-cyan-500",
    icon: "✅",
  },
  {
    id: "weather-app",
    title: "天气预报应用",
    description: "调用 API 获取天气数据的实用项目",
    detailedDescription: "通过调用天气 API 获取实时天气数据，展示当前天气、未来几天预报。学习如何与外部 API 交互、处理异步数据、错误处理等。",
    difficulty: "初级",
    estimatedHours: 12,
    techStack: ["React", "JavaScript", "API", "CSS"],
    primaryTech: "react",
    category: "前端",
    features: [
      "搜索城市查看天气",
      "显示当前天气信息",
      "未来 7 天天气预报",
      "温度单位切换（摄氏/华氏）",
      "天气图标和动画",
      "定位获取当前城市",
    ],
    learningPoints: [
      "API 调用（fetch/axios）",
      "异步数据处理",
      "Loading 状态处理",
      "错误处理",
      "环境变量管理",
      "地理位置 API",
    ],
    requirements: {
      functional: [
        "用户可以搜索城市名称",
        "显示实时天气信息（温度、湿度、风速等）",
        "显示未来几天天气预报",
        "支持摄氏度和华氏度切换",
        "显示 Loading 状态",
        "错误提示（城市不存在等）",
      ],
      technical: [
        "集成天气 API（OpenWeatherMap）",
        "异步数据获取",
        "状态管理",
        "响应式设计",
      ],
    },
    resources: {
      tutorialUrl: "https://openweathermap.org/api",
    },
    tags: ["React", "API", "初级", "实用"],
    popularity: 88,
    completionCount: 8930,
    gradient: "from-cyan-500 to-blue-500",
    icon: "🌤️",
  },
  {
    id: "portfolio-website",
    title: "个人作品集网站",
    description: "展示个人项目和技能的精美网站",
    detailedDescription: "使用 Next.js 构建一个专业的个人作品集网站，包含首页、项目展示、技能介绍、联系方式等模块。支持 SEO 优化和响应式设计。",
    difficulty: "中级",
    estimatedHours: 20,
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    primaryTech: "nextjs",
    category: "全栈",
    features: [
      "响应式首页设计",
      "项目展示页面",
      "技能标签云",
      "联系表单",
      "博客系统（可选）",
      "暗色模式切换",
      "SEO 优化",
    ],
    learningPoints: [
      "Next.js SSG/SSR",
      "TypeScript 类型系统",
      "Tailwind CSS 使用",
      "响应式设计",
      "SEO 最佳实践",
      "部署到 Vercel",
    ],
    requirements: {
      functional: [
        "首页展示个人介绍和技能",
        "项目展示页面（卡片式布局）",
        "联系表单（发送邮件）",
        "支持暗色模式",
        "移动端友好",
        "页面加载速度优化",
      ],
      technical: [
        "使用 Next.js App Router",
        "TypeScript 类型安全",
        "Tailwind CSS 样式",
        "SEO meta 标签",
        "图片优化",
      ],
    },
    resources: {
      tutorialUrl: "https://nextjs.org/learn",
    },
    tags: ["Next.js", "全栈", "中级", "作品集"],
    popularity: 92,
    completionCount: 6780,
    gradient: "from-purple-500 to-pink-500",
    icon: "💼",
  },

  // 后端项目
  {
    id: "rest-api",
    title: "RESTful API 服务",
    description: "构建标准的 REST API，学习后端开发",
    detailedDescription: "使用 Node.js 和 Express 构建一个完整的 RESTful API，包含用户认证、CRUD 操作、数据库集成等。学习后端开发的核心概念。",
    difficulty: "中级",
    estimatedHours: 25,
    techStack: ["Node.js", "Express", "MongoDB", "JWT"],
    primaryTech: "nodejs",
    category: "后端",
    features: [
      "用户注册和登录",
      "JWT 身份验证",
      "CRUD 操作",
      "数据验证",
      "错误处理中间件",
      "API 文档",
    ],
    learningPoints: [
      "Express 框架",
      "RESTful API 设计",
      "MongoDB 数据库",
      "JWT 认证",
      "中间件概念",
      "错误处理",
    ],
    requirements: {
      functional: [
        "用户注册接口（POST /api/users/register）",
        "用户登录接口（POST /api/users/login）",
        "获取用户信息（GET /api/users/:id）",
        "更新用户信息（PUT /api/users/:id）",
        "删除用户（DELETE /api/users/:id）",
        "需要身份验证的受保护路由",
      ],
      technical: [
        "使用 Express 框架",
        "MongoDB 数据持久化",
        "JWT token 认证",
        "输入数据验证",
        "统一错误处理",
      ],
    },
    resources: {
      tutorialUrl: "https://expressjs.com/",
    },
    tags: ["Node.js", "后端", "API", "中级"],
    popularity: 85,
    completionCount: 5240,
    gradient: "from-green-600 to-emerald-600",
    icon: "🔌",
  },
  {
    id: "blog-backend",
    title: "博客系统后端",
    description: "完整的博客后端系统，包含文章、评论、标签",
    detailedDescription: "构建一个功能完善的博客后端 API，支持文章发布、评论、标签分类、用户管理等功能。学习复杂的后端架构设计。",
    difficulty: "高级",
    estimatedHours: 40,
    techStack: ["Node.js", "Express", "PostgreSQL", "Redis"],
    primaryTech: "nodejs",
    category: "后端",
    features: [
      "用户系统（注册、登录、权限）",
      "文章 CRUD",
      "评论系统",
      "标签和分类",
      "点赞和收藏",
      "搜索功能",
      "Redis 缓存",
    ],
    learningPoints: [
      "复杂数据模型设计",
      "关系型数据库（PostgreSQL）",
      "缓存策略（Redis）",
      "权限管理",
      "全文搜索",
      "性能优化",
    ],
    requirements: {
      functional: [
        "用户可以发布、编辑、删除文章",
        "支持 Markdown 格式",
        "文章可以添加标签和分类",
        "用户可以评论文章",
        "支持点赞和收藏",
        "搜索文章功能",
        "热门文章排序",
      ],
      technical: [
        "PostgreSQL 数据库设计",
        "Redis 缓存热门数据",
        "用户权限控制",
        "API 性能优化",
        "分页查询",
      ],
    },
    resources: {},
    tags: ["Node.js", "后端", "数据库", "高级"],
    popularity: 78,
    completionCount: 2890,
    gradient: "from-indigo-600 to-purple-600",
    icon: "📝",
  },

  // 全栈项目
  {
    id: "ecommerce-platform",
    title: "电商平台",
    description: "完整的电商系统，前后端全栈项目",
    detailedDescription: "构建一个功能完整的电商平台，包含商品展示、购物车、订单管理、支付集成等。全栈项目，涵盖前后端和数据库设计。",
    difficulty: "专家",
    estimatedHours: 80,
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Redis"],
    primaryTech: "nextjs",
    category: "全栈",
    features: [
      "商品浏览和搜索",
      "购物车管理",
      "用户认证",
      "订单管理",
      "支付集成（Stripe）",
      "管理后台",
      "库存管理",
    ],
    learningPoints: [
      "全栈架构设计",
      "支付系统集成",
      "订单流程设计",
      "库存管理",
      "用户权限系统",
      "生产环境部署",
    ],
    requirements: {
      functional: [
        "用户可以浏览商品",
        "添加商品到购物车",
        "创建订单并支付",
        "查看订单历史",
        "管理员可以管理商品",
        "库存实时更新",
      ],
      technical: [
        "Next.js 前端",
        "Node.js API 后端",
        "PostgreSQL 数据库",
        "Stripe 支付集成",
        "Redis 会话管理",
      ],
    },
    resources: {},
    tags: ["全栈", "电商", "专家", "复杂"],
    popularity: 90,
    completionCount: 1250,
    gradient: "from-orange-500 to-red-500",
    icon: "🛒",
  },

  // 移动端项目
  {
    id: "habit-tracker",
    title: "习惯打卡 App",
    description: "帮助养成好习惯的移动应用",
    detailedDescription: "使用 React Native 开发一个习惯追踪 App，支持创建习惯、每日打卡、数据统计等功能。学习移动端开发和本地数据存储。",
    difficulty: "中级",
    estimatedHours: 30,
    techStack: ["React Native", "JavaScript", "AsyncStorage"],
    primaryTech: "react-native",
    category: "移动端",
    features: [
      "创建和管理习惯",
      "每日打卡",
      "连续打卡统计",
      "习惯完成率",
      "提醒通知",
      "数据可视化",
    ],
    learningPoints: [
      "React Native 基础",
      "导航系统",
      "本地存储",
      "通知推送",
      "图表库使用",
      "移动端 UI 设计",
    ],
    requirements: {
      functional: [
        "用户可以创建习惯",
        "每日打卡记录",
        "显示连续打卡天数",
        "习惯统计和趋势",
        "定时提醒功能",
        "数据导出",
      ],
      technical: [
        "React Native 开发",
        "AsyncStorage 数据持久化",
        "本地通知",
        "图表展示",
      ],
    },
    resources: {},
    tags: ["React Native", "移动端", "中级", "实用"],
    popularity: 82,
    completionCount: 3450,
    gradient: "from-green-500 to-teal-500",
    icon: "✨",
  },

  // 数据项目
  {
    id: "data-dashboard",
    title: "数据可视化仪表盘",
    description: "数据分析和可视化展示平台",
    detailedDescription: "使用 Python 和前端框架构建数据可视化仪表盘，展示各类图表和统计数据。学习数据处理和可视化技术。",
    difficulty: "高级",
    estimatedHours: 35,
    techStack: ["Python", "Flask", "React", "Pandas", "Chart.js"],
    primaryTech: "python",
    category: "数据",
    features: [
      "数据导入和处理",
      "多种图表类型",
      "交互式筛选",
      "实时数据更新",
      "数据导出",
      "自定义仪表盘",
    ],
    learningPoints: [
      "Python 数据处理",
      "Pandas 数据分析",
      "Flask API 开发",
      "图表库使用",
      "前后端数据交互",
      "实时数据更新",
    ],
    requirements: {
      functional: [
        "上传 CSV/Excel 数据",
        "自动生成统计图表",
        "支持折线图、柱状图、饼图等",
        "数据筛选和排序",
        "导出图表为图片",
      ],
      technical: [
        "Flask 后端 API",
        "Pandas 数据处理",
        "React 前端",
        "Chart.js 图表库",
        "WebSocket 实时通信（可选）",
      ],
    },
    resources: {},
    tags: ["Python", "数据", "可视化", "高级"],
    popularity: 75,
    completionCount: 1890,
    gradient: "from-blue-600 to-indigo-600",
    icon: "📊",
  },
];

// 难度配置
export const difficultyConfig = {
  入门: {
    color: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300",
    description: "适合完全零基础学习者",
    hours: "5-10 小时",
  },
  初级: {
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
    description: "需要基础语法知识",
    hours: "10-20 小时",
  },
  中级: {
    color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300",
    description: "需要一定项目经验",
    hours: "20-40 小时",
  },
  高级: {
    color: "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300",
    description: "需要扎实的技术功底",
    hours: "40-60 小时",
  },
  专家: {
    color: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300",
    description: "复杂项目，综合能力要求高",
    hours: "60+ 小时",
  },
};

// 分类列表
export const categories = ["全部", "前端", "后端", "全栈", "移动端", "数据", "工具"];

// 获取项目统计
export const getProjectStats = () => {
  const total = projectsData.length;
  const byDifficulty = {
    入门: projectsData.filter((p) => p.difficulty === "入门").length,
    初级: projectsData.filter((p) => p.difficulty === "初级").length,
    中级: projectsData.filter((p) => p.difficulty === "中级").length,
    高级: projectsData.filter((p) => p.difficulty === "高级").length,
    专家: projectsData.filter((p) => p.difficulty === "专家").length,
  };
  const totalCompletions = projectsData.reduce((sum, p) => sum + p.completionCount, 0);

  return { total, byDifficulty, totalCompletions };
};
