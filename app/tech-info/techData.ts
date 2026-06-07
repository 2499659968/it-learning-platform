// 详细的技术框架数据

export interface TechFramework {
  id: string;
  name: string;
  category: "语言" | "前端框架" | "后端框架" | "移动端" | "数据库" | "工具";
  icon: string;
  description: string;
  detailedDescription: string;

  // 元数据
  githubStars: string;
  difficulty: "简单" | "中等" | "困难";
  popularity: number; // 1-100
  officialWebsite: string;
  releaseYear: number;

  // 标签
  tags: string[];

  // 使用场景
  useCases: string[];

  // 代表公司
  companies: string[];

  // 学习资源
  resources: {
    docs: string;
    tutorial?: string;
    github?: string;
  };

  // 薪资范围
  salaryRange: string;

  gradient: string;
}

export const techData: TechFramework[] = [
  // 前端框架
  {
    id: "react",
    name: "React",
    category: "前端框架",
    icon: "⚛️",
    description: "用于构建用户界面的JavaScript库",
    detailedDescription: "React 是 Facebook 开发的声明式、组件化的JavaScript库，用于构建交互式用户界面。采用虚拟DOM技术，性能优异，生态系统极其丰富。",
    githubStars: "220k+",
    difficulty: "中等",
    popularity: 95,
    officialWebsite: "https://react.dev",
    releaseYear: 2013,
    tags: ["热门", "高薪", "大厂", "组件化", "SPA"],
    useCases: ["单页应用", "移动应用", "桌面应用", "企业后台"],
    companies: ["Facebook", "Netflix", "Airbnb", "Uber", "字节跳动"],
    resources: {
      docs: "https://react.dev",
      github: "https://github.com/facebook/react",
    },
    salaryRange: "$85k - $150k",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    id: "vue",
    name: "Vue",
    category: "前端框架",
    icon: "💚",
    description: "渐进式JavaScript框架",
    detailedDescription: "Vue.js 是一个易学易用、性能出色且功能丰富的渐进式框架。可以从简单的声明式渲染到完整的单页应用，灵活度极高。中文文档友好。",
    githubStars: "205k+",
    difficulty: "简单",
    popularity: 85,
    officialWebsite: "https://vuejs.org",
    releaseYear: 2014,
    tags: ["热门", "简单", "渐进式", "中文友好"],
    useCases: ["单页应用", "企业后台", "移动H5", "小程序"],
    companies: ["阿里巴巴", "百度", "小米", "B站", "饿了么"],
    resources: {
      docs: "https://cn.vuejs.org",
      github: "https://github.com/vuejs/vue",
    },
    salaryRange: "$75k - $130k",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: "angular",
    name: "Angular",
    category: "前端框架",
    icon: "🅰️",
    description: "Google开发的完整前端框架",
    detailedDescription: "Angular 是由Google维护的企业级前端框架，提供完整的解决方案。采用TypeScript开发，适合大型项目。学习曲线较陡但功能强大。",
    githubStars: "95k+",
    difficulty: "困难",
    popularity: 70,
    officialWebsite: "https://angular.io",
    releaseYear: 2016,
    tags: ["企业级", "TypeScript", "完整框架", "大厂"],
    useCases: ["企业应用", "复杂系统", "后台管理", "跨平台"],
    companies: ["Google", "Microsoft", "IBM", "华为"],
    resources: {
      docs: "https://angular.io/docs",
      github: "https://github.com/angular/angular",
    },
    salaryRange: "$80k - $140k",
    gradient: "from-red-600 to-pink-600",
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "前端框架",
    icon: "▲",
    description: "React全栈框架",
    detailedDescription: "Next.js 是基于React的全栈框架，提供服务端渲染(SSR)、静态生成(SSG)等功能。开发体验极佳，是现代Web开发的首选。",
    githubStars: "120k+",
    difficulty: "中等",
    popularity: 90,
    officialWebsite: "https://nextjs.org",
    releaseYear: 2016,
    tags: ["热门", "全栈", "SSR", "高性能", "Vercel"],
    useCases: ["SEO优化", "全栈应用", "静态网站", "企业官网"],
    companies: ["Vercel", "Netflix", "Nike", "Twitch"],
    resources: {
      docs: "https://nextjs.org/docs",
      github: "https://github.com/vercel/next.js",
    },
    salaryRange: "$90k - $160k",
    gradient: "from-gray-800 to-gray-600",
  },

  // 后端框架
  {
    id: "nodejs",
    name: "Node.js",
    category: "语言",
    icon: "🟢",
    description: "JavaScript运行时环境",
    detailedDescription: "Node.js 让JavaScript可以在服务器端运行，采用事件驱动、非阻塞I/O模型，轻量且高效。适合构建高并发的网络应用。",
    githubStars: "105k+",
    difficulty: "中等",
    popularity: 92,
    officialWebsite: "https://nodejs.org",
    releaseYear: 2009,
    tags: ["热门", "全栈", "JavaScript", "高并发"],
    useCases: ["API服务", "实时应用", "微服务", "工具开发"],
    companies: ["LinkedIn", "Netflix", "PayPal", "Uber"],
    resources: {
      docs: "https://nodejs.org/docs",
      github: "https://github.com/nodejs/node",
    },
    salaryRange: "$80k - $145k",
    gradient: "from-green-600 to-emerald-600",
  },
  {
    id: "django",
    name: "Django",
    category: "后端框架",
    icon: "🐍",
    description: "高级Python Web框架",
    detailedDescription: "Django 是一个高效、全栈的Python Web框架，内置管理后台、ORM、认证系统等功能。奉行\"约定优于配置\"的理念。",
    githubStars: "76k+",
    difficulty: "中等",
    popularity: 80,
    officialWebsite: "https://www.djangoproject.com",
    releaseYear: 2005,
    tags: ["成熟", "全栈", "Python", "快速开发"],
    useCases: ["Web应用", "API服务", "CMS", "数据平台"],
    companies: ["Instagram", "Pinterest", "NASA", "Mozilla"],
    resources: {
      docs: "https://docs.djangoproject.com",
      github: "https://github.com/django/django",
    },
    salaryRange: "$75k - $135k",
    gradient: "from-green-700 to-emerald-800",
  },
  {
    id: "spring",
    name: "Spring Boot",
    category: "后端框架",
    icon: "☘️",
    description: "Java企业级框架",
    detailedDescription: "Spring Boot 简化了Spring应用的开发，提供开箱即用的配置。是Java企业级开发的事实标准，生态系统完善。",
    githubStars: "72k+",
    difficulty: "困难",
    popularity: 85,
    officialWebsite: "https://spring.io",
    releaseYear: 2014,
    tags: ["企业级", "Java", "微服务", "稳定"],
    useCases: ["企业应用", "微服务", "云原生", "金融系统"],
    companies: ["阿里巴巴", "腾讯", "京东", "工商银行"],
    resources: {
      docs: "https://spring.io/projects/spring-boot",
      github: "https://github.com/spring-projects/spring-boot",
    },
    salaryRange: "$85k - $150k",
    gradient: "from-green-600 to-lime-600",
  },

  // 移动端
  {
    id: "flutter",
    name: "Flutter",
    category: "移动端",
    icon: "🐦",
    description: "Google跨平台UI框架",
    detailedDescription: "Flutter 使用Dart语言开发，一套代码可以运行在iOS、Android、Web和桌面。性能接近原生，开发效率极高。",
    githubStars: "162k+",
    difficulty: "中等",
    popularity: 88,
    officialWebsite: "https://flutter.dev",
    releaseYear: 2017,
    tags: ["跨平台", "热门", "Google", "高性能"],
    useCases: ["移动应用", "Web应用", "桌面应用", "嵌入式"],
    companies: ["Google", "阿里巴巴", "腾讯", "字节跳动"],
    resources: {
      docs: "https://flutter.dev/docs",
      github: "https://github.com/flutter/flutter",
    },
    salaryRange: "$80k - $140k",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "react-native",
    name: "React Native",
    category: "移动端",
    icon: "📱",
    description: "React跨平台移动框架",
    detailedDescription: "React Native 让你可以使用React和JavaScript开发原生移动应用。Learn once, write anywhere，生态系统丰富。",
    githubStars: "116k+",
    difficulty: "中等",
    popularity: 82,
    officialWebsite: "https://reactnative.dev",
    releaseYear: 2015,
    tags: ["跨平台", "React", "JavaScript", "热门"],
    useCases: ["移动应用", "跨平台开发", "混合应用"],
    companies: ["Facebook", "Microsoft", "Shopify", "Discord"],
    resources: {
      docs: "https://reactnative.dev/docs",
      github: "https://github.com/facebook/react-native",
    },
    salaryRange: "$85k - $145k",
    gradient: "from-blue-400 to-purple-500",
  },

  // 数据库
  {
    id: "mongodb",
    name: "MongoDB",
    category: "数据库",
    icon: "🍃",
    description: "流行的NoSQL数据库",
    detailedDescription: "MongoDB 是一个基于文档的NoSQL数据库，存储JSON格式数据。灵活的数据模型，易于扩展，适合快速开发。",
    githubStars: "26k+",
    difficulty: "简单",
    popularity: 85,
    officialWebsite: "https://www.mongodb.com",
    releaseYear: 2009,
    tags: ["NoSQL", "文档数据库", "热门", "云原生"],
    useCases: ["Web应用", "实时分析", "内容管理", "物联网"],
    companies: ["Google", "eBay", "Adobe", "Forbes"],
    resources: {
      docs: "https://www.mongodb.com/docs",
      github: "https://github.com/mongodb/mongo",
    },
    salaryRange: "$70k - $125k",
    gradient: "from-green-600 to-teal-600",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "数据库",
    icon: "🐘",
    description: "强大的开源关系型数据库",
    detailedDescription: "PostgreSQL 是功能最强大的开源关系型数据库。支持复杂查询、外键、触发器、视图等高级特性。",
    githubStars: "14k+",
    difficulty: "中等",
    popularity: 78,
    officialWebsite: "https://www.postgresql.org",
    releaseYear: 1996,
    tags: ["关系型", "开源", "稳定", "企业级"],
    useCases: ["企业应用", "数据仓库", "地理信息", "金融系统"],
    companies: ["Apple", "Instagram", "Reddit", "Spotify"],
    resources: {
      docs: "https://www.postgresql.org/docs",
      github: "https://github.com/postgres/postgres",
    },
    salaryRange: "$75k - $135k",
    gradient: "from-blue-700 to-indigo-700",
  },

  // 工具
  {
    id: "docker",
    name: "Docker",
    category: "工具",
    icon: "🐳",
    description: "容器化平台",
    detailedDescription: "Docker 是一个开源的容器化平台，让应用部署更简单。一次构建，到处运行，是现代DevOps的基石。",
    githubStars: "94k+",
    difficulty: "中等",
    popularity: 90,
    officialWebsite: "https://www.docker.com",
    releaseYear: 2013,
    tags: ["DevOps", "容器化", "必备", "云原生"],
    useCases: ["应用部署", "微服务", "CI/CD", "开发环境"],
    companies: ["Google", "Amazon", "Microsoft", "阿里云"],
    resources: {
      docs: "https://docs.docker.com",
      github: "https://github.com/docker",
    },
    salaryRange: "$80k - $145k",
    gradient: "from-blue-500 to-cyan-500",
  },
];

// 难度配置
export const difficultyConfig = {
  简单: {
    color: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300",
    icon: "😊",
  },
  中等: {
    color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300",
    icon: "🤔",
  },
  困难: {
    color: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300",
    icon: "😰",
  },
};

// 所有可用标签
export const allTags = [
  "热门", "高薪", "简单", "大厂", "全栈",
  "企业级", "跨平台", "开源", "云原生", "TypeScript",
  "JavaScript", "Python", "Java", "DevOps", "NoSQL"
];

// 分类列表
export const categories = ["全部", "语言", "前端框架", "后端框架", "移动端", "数据库", "工具"];
