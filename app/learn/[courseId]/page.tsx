import Link from "next/link";
import { notFound } from "next/navigation";

// 课程数据（实际项目中应该从数据库或 API 获取）
const coursesData: Record<string, {
  title: string;
  description: string;
  level: string;
  chapters: Array<{
    id: number;
    title: string;
    content: string;
    codeExample?: string;
  }>;
}> = {
  javascript: {
    title: "JavaScript 基础",
    description: "学习 JavaScript 核心概念和语法",
    level: "初级",
    chapters: [
      {
        id: 1,
        title: "变量与数据类型",
        content: "JavaScript 有多种数据类型：String（字符串）、Number（数字）、Boolean（布尔值）、Null、Undefined、Symbol 和 Object。使用 let 和 const 声明变量。",
        codeExample: `// 声明变量
let name = "张三";
const age = 25;
let isStudent = true;

// 数据类型
console.log(typeof name);    // "string"
console.log(typeof age);     // "number"
console.log(typeof isStudent); // "boolean"`
      },
      {
        id: 2,
        title: "函数",
        content: "函数是可重复使用的代码块。JavaScript 支持函数声明、函数表达式和箭头函数。",
        codeExample: `// 函数声明
function greet(name) {
  return \`你好, \${name}!\`;
}

// 箭头函数
const add = (a, b) => a + b;

console.log(greet("李四")); // "你好, 李四!"
console.log(add(5, 3));      // 8`
      },
      {
        id: 3,
        title: "数组与对象",
        content: "数组用于存储有序的数据列表，对象用于存储键值对。",
        codeExample: `// 数组
const fruits = ["苹果", "香蕉", "橙子"];
console.log(fruits[0]); // "苹果"

// 对象
const person = {
  name: "王五",
  age: 30,
  greet() {
    return \`我是\${this.name}\`;
  }
};

console.log(person.greet()); // "我是王五"`
      }
    ]
  },
  typescript: {
    title: "TypeScript 进阶",
    description: "掌握 TypeScript 类型系统",
    level: "中级",
    chapters: [
      {
        id: 1,
        title: "类型注解",
        content: "TypeScript 为 JavaScript 添加了静态类型检查，可以在编译时发现错误。",
        codeExample: `// 基本类型注解
let username: string = "张三";
let age: number = 25;
let isActive: boolean = true;

// 函数类型注解
function add(a: number, b: number): number {
  return a + b;
}`
      },
      {
        id: 2,
        title: "接口与类型别名",
        content: "使用 interface 和 type 定义复杂的类型结构。",
        codeExample: `// 接口
interface User {
  id: number;
  name: string;
  email?: string; // 可选属性
}

// 类型别名
type Point = {
  x: number;
  y: number;
};

const user: User = {
  id: 1,
  name: "李四"
};`
      }
    ]
  },
  react: {
    title: "React 开发",
    description: "构建现代化 React 应用",
    level: "中级",
    chapters: [
      {
        id: 1,
        title: "组件基础",
        content: "React 使用组件构建用户界面。组件可以是函数或类。",
        codeExample: `// 函数组件
function Welcome({ name }) {
  return <h1>欢迎, {name}!</h1>;
}

// 使用组件
function App() {
  return (
    <div>
      <Welcome name="张三" />
    </div>
  );
}`
      },
      {
        id: 2,
        title: "State 与 Hooks",
        content: "使用 useState Hook 管理组件状态。",
        codeExample: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        增加
      </button>
    </div>
  );
}`
      }
    ]
  },
  nextjs: {
    title: "Next.js 全栈",
    description: "学习 Next.js 全栈开发",
    level: "高级",
    chapters: [
      {
        id: 1,
        title: "App Router",
        content: "Next.js 13+ 引入了新的 App Router，基于 React Server Components。",
        codeExample: `// app/page.tsx
export default function Home() {
  return (
    <main>
      <h1>欢迎使用 Next.js</h1>
    </main>
  );
}

// app/about/page.tsx
export default function About() {
  return <h1>关于我们</h1>;
}`
      },
      {
        id: 2,
        title: "数据获取",
        content: "在 Server Components 中直接获取数据。",
        codeExample: `// Server Component
async function getData() {
  const res = await fetch('https://api.example.com/data');
  return res.json();
}

export default async function Page() {
  const data = await getData();

  return (
    <div>
      <h1>{data.title}</h1>
    </div>
  );
}`
      }
    ]
  }
};

interface PageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export default async function LearnPage({ params }: PageProps) {
  const { courseId } = await params;
  const course = coursesData[courseId];

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <header className="border-b bg-white dark:bg-gray-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            返回首页
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {course.title}
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {course.description}
              </p>
            </div>
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {course.level}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {course.chapters.map((chapter) => (
            <section
              key={chapter.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-semibold text-sm mr-3">
                  {chapter.id}
                </span>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {chapter.title}
                </h2>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {chapter.content}
              </p>

              {chapter.codeExample && (
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-400 text-sm font-medium">示例代码</span>
                  </div>
                  <pre className="text-gray-100 text-sm leading-relaxed">
                    <code>{chapter.codeExample}</code>
                  </pre>
                </div>
              )}

              <div className="mt-6 flex gap-3">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                  标记为完成
                </button>
                <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm font-medium">
                  做练习
                </button>
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8 border border-blue-200 dark:border-blue-800">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            完成这个课程了？
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            恭喜你完成学习！继续探索其他课程，或者开始实战项目。
          </p>
          <div className="flex gap-4">
            <Link
              href="/"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              浏览更多课程
            </Link>
            <button className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium border border-gray-300 dark:border-gray-600">
              下载学习证书
            </button>
          </div>
        </div>
      </main>

      <footer className="mt-16 border-t bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500 dark:text-gray-400">
            © 2026 IT 学习平台 - 用心学习，精进技能
          </p>
        </div>
      </footer>
    </div>
  );
}

// 生成静态参数（用于静态生成）
export async function generateStaticParams() {
  return Object.keys(coursesData).map((courseId) => ({
    courseId,
  }));
}
