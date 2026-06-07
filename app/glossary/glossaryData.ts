// 程序员术语词典数据

export interface GlossaryTerm {
  id: string;
  term: string;
  pronunciation?: string; // 发音
  category: "基础概念" | "开发流程" | "技术栈" | "团队协作" | "职场黑话" | "网络用语" | "AI时代";
  definition: string;
  example?: string; // 使用场景
  relatedTerms?: string[]; // 相关术语
  importance: "必知" | "常用" | "进阶";
  funFact?: string; // 趣味知识
}

export const glossaryData: GlossaryTerm[] = [
  // 基础概念
  {
    id: "bug",
    term: "Bug",
    pronunciation: "[bʌɡ]",
    category: "基础概念",
    definition: "程序中的错误或缺陷",
    example: "「这个功能有个 Bug，点击按钮没反应」",
    relatedTerms: ["Debug", "测试", "修复"],
    importance: "必知",
    funFact: "Bug 这个词来自 1947 年，一只飞蛾卡在计算机继电器里导致故障。",
  },
  {
    id: "debug",
    term: "Debug",
    pronunciation: "[diːˈbʌɡ]",
    category: "基础概念",
    definition: "调试，查找并修复代码中的错误",
    example: "「我得 debug 一下这段代码，看看哪里出问题了」",
    relatedTerms: ["Bug", "断点", "日志"],
    importance: "必知",
    funFact: "程序员 80% 的时间都在 debug，不是在写代码。",
  },
  {
    id: "refactor",
    term: "重构 (Refactor)",
    category: "基础概念",
    definition: "在不改变外部行为的前提下，优化代码结构",
    example: "「这段代码太乱了，我需要重构一下」",
    relatedTerms: ["代码优化", "技术债"],
    importance: "常用",
    funFact: "重构就像整理房间，东西还是那些东西，只是摆得更整齐了。",
  },
  {
    id: "api",
    term: "API",
    pronunciation: "[ˌeɪ piː ˈaɪ]",
    category: "基础概念",
    definition: "应用程序接口，不同软件之间的通信桥梁",
    example: "「前端调用后端的 API 获取用户数据」",
    relatedTerms: ["RESTful", "接口", "SDK"],
    importance: "必知",
    funFact: "API 就像餐厅的菜单，你不需要知道厨师怎么做菜，只要点单就行。",
  },

  // 开发流程
  {
    id: "git",
    term: "Git",
    category: "开发流程",
    definition: "分布式版本控制系统，程序员必备工具",
    example: "「记得 git commit 一下，别丢代码了」",
    relatedTerms: ["GitHub", "提交", "分支"],
    importance: "必知",
    funFact: "Git 是 Linux 之父 Linus Torvalds 开发的，只花了两周时间。",
  },
  {
    id: "pr",
    term: "PR (Pull Request)",
    category: "开发流程",
    definition: "拉取请求，请求将代码合并到主分支",
    example: "「我提了个 PR，麻烦帮忙 review 一下」",
    relatedTerms: ["Code Review", "合并", "冲突"],
    importance: "必知",
    funFact: "提 PR 就像交作业，等着老师（同事）批改。",
  },
  {
    id: "ci-cd",
    term: "CI/CD",
    category: "开发流程",
    definition: "持续集成/持续部署，自动化构建和发布流程",
    example: "「我们配置了 CI/CD，代码合并后自动部署」",
    relatedTerms: ["自动化", "部署", "测试"],
    importance: "常用",
    funFact: "有了 CI/CD，程序员终于可以在周五下午放心提交代码了。",
  },
  {
    id: "deploy",
    term: "部署 (Deploy)",
    pronunciation: "[dɪˈplɔɪ]",
    category: "开发流程",
    definition: "将代码发布到生产环境，让用户可以使用",
    example: "「今晚 8 点部署新版本，大家待命」",
    relatedTerms: ["上线", "发布", "回滚"],
    importance: "必知",
    funFact: "部署前的心情：紧张、期待、担心、祈祷。",
  },

  // 技术栈
  {
    id: "full-stack",
    term: "全栈 (Full Stack)",
    category: "技术栈",
    definition: "前端和后端都能做的开发者",
    example: "「我是全栈工程师，前后端都能搞定」",
    relatedTerms: ["前端", "后端", "T型人才"],
    importance: "必知",
    funFact: "全栈 = 什么都会一点，什么都不精通（开玩笑的）。",
  },
  {
    id: "frontend",
    term: "前端 (Frontend)",
    category: "技术栈",
    definition: "用户看得见、摸得着的界面部分",
    example: "「前端负责把设计稿变成网页」",
    relatedTerms: ["HTML", "CSS", "JavaScript", "UI"],
    importance: "必知",
    funFact: "前端就是化妆师，让网站看起来漂漂亮亮的。",
  },
  {
    id: "backend",
    term: "后端 (Backend)",
    category: "技术栈",
    definition: "用户看不见的服务器、数据库等逻辑部分",
    example: "「后端处理业务逻辑和数据存储」",
    relatedTerms: ["数据库", "服务器", "API"],
    importance: "必知",
    funFact: "后端就像餐厅后厨，客人看不见，但没它不行。",
  },
  {
    id: "framework",
    term: "框架 (Framework)",
    category: "技术栈",
    definition: "提供基础功能的代码库，让开发更高效",
    example: "「我们用 React 框架开发前端」",
    relatedTerms: ["库", "工具", "生态"],
    importance: "必知",
    funFact: "框架就像宜家家具，有基础结构，你只需要组装。",
  },

  // 团队协作
  {
    id: "code-review",
    term: "Code Review",
    category: "团队协作",
    definition: "代码审查，同事互相检查代码质量",
    example: "「你的代码我 review 了，有几个小问题」",
    relatedTerms: ["PR", "质量", "反馈"],
    importance: "必知",
    funFact: "Code Review 是最容易引发程序员争吵的环节。",
  },
  {
    id: "standup",
    term: "站会 (Stand-up)",
    category: "团队协作",
    definition: "每日简短会议，同步进度和问题",
    example: "「站会说一下今天要做什么」",
    relatedTerms: ["敏捷", "Scrum", "同步"],
    importance: "常用",
    funFact: "之所以叫站会，是为了让会议快点结束（站着累）。",
  },
  {
    id: "sprint",
    term: "Sprint",
    pronunciation: "[sprɪnt]",
    category: "团队协作",
    definition: "敏捷开发中的一个迭代周期，通常 2-4 周",
    example: "「这个功能排到下个 sprint 做」",
    relatedTerms: ["敏捷", "迭代", "冲刺"],
    importance: "常用",
    funFact: "Sprint 原意是短跑冲刺，但实际更像马拉松。",
  },
  {
    id: "tech-debt",
    term: "技术债 (Tech Debt)",
    category: "团队协作",
    definition: "为了快速交付而留下的代码问题，未来需要还",
    example: "「这块技术债太多了，得抽时间还一下」",
    relatedTerms: ["重构", "优化", "维护"],
    importance: "常用",
    funFact: "技术债就像信用卡，欠多了总要还，还带利息（更难改）。",
  },

  // 职场黑话
  {
    id: "poc",
    term: "POC (Proof of Concept)",
    category: "职场黑话",
    definition: "概念验证，快速做个 demo 证明想法可行",
    example: "「先做个 POC，看看这个方案行不行」",
    relatedTerms: ["Demo", "原型", "验证"],
    importance: "常用",
    funFact: "POC 就是\"试试看\"的高级说法。",
  },
  {
    id: "mvp",
    term: "MVP (最小可行产品)",
    category: "职场黑话",
    definition: "只包含核心功能的产品版本，快速验证市场",
    example: "「先做个 MVP 上线，看用户反馈再迭代」",
    relatedTerms: ["原型", "迭代", "敏捷"],
    importance: "常用",
    funFact: "MVP = 能用就行，别的以后再说。",
  },
  {
    id: "tech-stack",
    term: "技术栈 (Tech Stack)",
    category: "职场黑话",
    definition: "项目使用的技术组合",
    example: "「我们的技术栈是 React + Node.js + MongoDB」",
    relatedTerms: ["工具链", "生态", "架构"],
    importance: "必知",
    funFact: "面试时最常被问的就是：你的技术栈是什么？",
  },
  {
    id: "works-on-my-machine",
    term: "在我电脑上可以跑",
    category: "职场黑话",
    definition: "程序员的经典借口，本地正常但部署出错",
    example: "「奇怪，在我电脑上明明可以跑的啊」",
    relatedTerms: ["环境问题", "Docker", "部署"],
    importance: "必知",
    funFact: "这句话的出现频率和 Bug 数量成正比。",
  },

  // 网络用语
  {
    id: "rtfm",
    term: "RTFM",
    category: "网络用语",
    definition: "Read The F**king Manual（去看该死的文档）",
    example: "内心 OS：「这问题文档里写得清清楚楚，RTFM！」",
    relatedTerms: ["文档", "自学", "提问"],
    importance: "进阶",
    funFact: "程序员最讨厌两件事：写文档 和 别人不看文档。",
  },
  {
    id: "yak-shaving",
    term: "剃牦牛 (Yak Shaving)",
    category: "网络用语",
    definition: "为了完成任务而不断做无关的准备工作",
    example: "「我只是想改个 Bug，结果花了 3 小时配置环境」",
    relatedTerms: ["拖延", "跑题", "效率"],
    importance: "进阶",
    funFact: "程序员最擅长的就是为了做 A 任务，先做 B、C、D...最后忘了 A。",
  },
  {
    id: "rubber-duck",
    term: "小黄鸭调试法",
    category: "网络用语",
    definition: "对着橡皮鸭讲解代码逻辑，往往就能发现问题",
    example: "「我给小黄鸭讲了一遍，突然就想通了」",
    relatedTerms: ["调试", "思考", "自省"],
    importance: "进阶",
    funFact: "和鸭子说话不是疯了，是在 debug。",
  },

  // AI 时代
  {
    id: "prompt",
    term: "Prompt",
    pronunciation: "[prɒmpt]",
    category: "AI时代",
    definition: "给 AI 的指令或问题，AI 编程的核心",
    example: "「我写了个 prompt 让 AI 生成代码」",
    relatedTerms: ["LLM", "提示词", "AI"],
    importance: "必知",
    funFact: "Prompt Engineering 可能是 2024 年最火的新职业。",
  },
  {
    id: "copilot",
    term: "Copilot (副驾驶)",
    category: "AI时代",
    definition: "AI 编程助手，自动补全代码",
    example: "「Copilot 帮我写了 80% 的代码」",
    relatedTerms: ["AI", "自动补全", "效率"],
    importance: "必知",
    funFact: "有了 Copilot，程序员从司机变成了副驾驶。",
  },
  {
    id: "hallucination",
    term: "幻觉 (Hallucination)",
    category: "AI时代",
    definition: "AI 一本正经地胡说八道",
    example: "「AI 又幻觉了，生成的代码根本跑不通」",
    relatedTerms: ["LLM", "错误", "验证"],
    importance: "常用",
    funFact: "AI 的幻觉比人类的幻觉更自信。",
  },
  {
    id: "rag",
    term: "RAG",
    category: "AI时代",
    definition: "检索增强生成，让 AI 基于知识库回答",
    example: "「我们用 RAG 做了个企业知识库问答系统」",
    relatedTerms: ["向量数据库", "LLM", "知识库"],
    importance: "进阶",
    funFact: "RAG = 给 AI 装上百度搜索。",
  },
  {
    id: "fine-tune",
    term: "微调 (Fine-tune)",
    category: "AI时代",
    definition: "用特定数据训练 AI 模型，让它更专业",
    example: "「我们微调了一个医疗领域的 AI 模型」",
    relatedTerms: ["训练", "模型", "定制"],
    importance: "进阶",
    funFact: "微调就像给 AI 上专业课，让它成为某个领域的专家。",
  },
];

// 分类配置
export const categories = [
  "全部",
  "基础概念",
  "开发流程",
  "技术栈",
  "团队协作",
  "职场黑话",
  "网络用语",
  "AI时代",
];

// 重要性配置
export const importanceConfig = {
  必知: {
    color: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300",
    icon: "🔥",
    description: "新手必须掌握",
  },
  常用: {
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
    icon: "⭐",
    description: "工作中经常用到",
  },
  进阶: {
    color: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300",
    icon: "💡",
    description: "了解即可",
  },
};

// 统计
export const getGlossaryStats = () => {
  const total = glossaryData.length;
  const byCategory: Record<string, number> = {};
  const byImportance: Record<string, number> = {};

  glossaryData.forEach((term) => {
    byCategory[term.category] = (byCategory[term.category] || 0) + 1;
    byImportance[term.importance] = (byImportance[term.importance] || 0) + 1;
  });

  return { total, byCategory, byImportance };
};
