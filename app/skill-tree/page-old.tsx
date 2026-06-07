"use client";

import { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  NodeTypes,
} from "reactflow";
import "reactflow/dist/style.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { skillsData, learningPaths, difficultyConfig, statusConfig } from "./skillsData";
import { getCurrentUser, logout, updateUserProgress, getUserProgress } from "@/lib/auth";

// 自定义技能节点组件
function SkillNode({ data }: any) {
  const { skill, status, onClick } = data;
  const statusInfo = statusConfig[status as keyof typeof statusConfig];

  return (
    <div
      onClick={() => onClick(skill.id)}
      className={`cursor-pointer transition-all hover:scale-105 ${
        status === "locked" ? "opacity-50" : ""
      }`}
    >
      <div
        className={`px-4 py-3 rounded-lg border-2 min-w-[160px] ${
          status === "completed" || status === "mastered"
            ? `bg-gradient-to-r ${skill.gradient} text-white border-transparent shadow-lg`
            : status === "learning"
            ? "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400 dark:border-yellow-600"
            : status === "available"
            ? "bg-blue-50 dark:bg-blue-900/20 border-blue-400 dark:border-blue-600"
            : "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">{statusInfo.icon}</span>
          <span className="text-xl">{skill.icon}</span>
        </div>
        <div
          className={`font-bold text-sm mb-1 ${
            status === "completed" || status === "mastered"
              ? "text-white"
              : "text-gray-900 dark:text-white"
          }`}
        >
          {skill.name}
        </div>
        <div
          className={`text-xs ${
            status === "completed" || status === "mastered"
              ? "text-white/80"
              : "text-gray-600 dark:text-gray-400"
          }`}
        >
          {skill.estimatedHours > 0 ? `${skill.estimatedHours}小时` : "起点"}
        </div>
      </div>
    </div>
  );
}

const nodeTypes: NodeTypes = {
  skillNode: SkillNode,
};

export default function SkillTreePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [completedSkills, setCompletedSkills] = useState<string[]>([]);
  const [learningSkills, setLearningSkills] = useState<string[]>([]);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("全部");

  // 技能分类
  const categories = [
    { id: "全部", name: "完整技能树", icon: "🌳" },
    { id: "前端", name: "前端开发", icon: "💻" },
    { id: "后端", name: "后端开发", icon: "⚙️" },
    { id: "数据库", name: "数据库", icon: "🗄️" },
    { id: "工具", name: "工具链", icon: "🛠️" },
    { id: "AI", name: "AI技术", icon: "🤖" },
  ];

  // 根据分类筛选技能
  const getFilteredSkills = () => {
    if (selectedCategory === "全部") {
      return skillsData;
    }

    const categorySkillIds: Record<string, string[]> = {
      前端: [
        "web-basics",
        "html",
        "css",
        "javascript",
        "typescript",
        "sass",
        "tailwind",
        "react",
        "vue",
        "redux",
        "react-router",
        "nextjs",
        "vue-router",
        "pinia",
        "nuxt",
        "webpack",
        "vite",
        "jest",
      ],
      后端: [
        "javascript",
        "typescript",
        "nodejs",
        "express",
        "nestjs",
        "python",
        "flask",
        "django",
        "fastapi",
      ],
      数据库: ["sql-basics", "mysql", "postgresql", "mongodb", "redis"],
      工具: ["git", "github", "docker", "cicd", "kubernetes"],
      AI: ["prompt-engineering", "llm-api", "langchain", "vector-db", "rag"],
    };

    const allowedIds = categorySkillIds[selectedCategory] || [];
    return skillsData.filter((skill) => allowedIds.includes(skill.id));
  };

  // 加载用户和进度
  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);

    if (currentUser) {
      const progress = getUserProgress();
      if (progress) {
        setCompletedSkills(progress.completedSkills);
        setLearningSkills(progress.learningSkills);
      }
    }
  }, []);

  // 保存进度
  useEffect(() => {
    if (user) {
      updateUserProgress(completedSkills, learningSkills);
    }
  }, [completedSkills, learningSkills, user]);

  // 登出
  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  // 计算节点状态
  const getSkillStatus = (skillId: string) => {
    if (completedSkills.includes(skillId)) return "completed";
    if (learningSkills.includes(skillId)) return "learning";

    const skill = skillsData.find((s) => s.id === skillId);
    if (!skill) return "locked";

    // 检查前置技能是否都完成
    const prereqsMet = skill.prerequisites.every((prereq) =>
      completedSkills.includes(prereq)
    );
    return prereqsMet ? "available" : "locked";
  };

  // 处理节点点击
  const handleNodeClick = useCallback((skillId: string) => {
    setSelectedSkill(skillId);
  }, []);

  // 生成节点和边
  const generateNodesAndEdges = () => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // 获取筛选后的技能
    const filteredSkills = getFilteredSkills();

    // 计算节点位置（简单的层级布局）
    const layers: Record<number, string[]> = {};

    filteredSkills.forEach((skill) => {
      const layer = skill.prerequisites.length;
      if (!layers[layer]) layers[layer] = [];
      layers[layer].push(skill.id);
    });

    let yOffset = 0;
    Object.keys(layers)
      .sort((a, b) => Number(a) - Number(b))
      .forEach((layer) => {
        const skillsInLayer = layers[Number(layer)];
        const xSpacing = 250;
        const startX = -(skillsInLayer.length - 1) * xSpacing / 2;

        skillsInLayer.forEach((skillId, index) => {
          const skill = skillsData.find((s) => s.id === skillId)!;
          const status = getSkillStatus(skillId);

          nodes.push({
            id: skillId,
            type: "skillNode",
            position: { x: startX + index * xSpacing, y: yOffset },
            data: { skill, status, onClick: handleNodeClick },
          });

          // 创建边（只连接筛选后的技能）
          skill.prerequisites.forEach((prereqId) => {
            // 只有当前置技能也在筛选结果中时才创建连线
            if (filteredSkills.some((s) => s.id === prereqId)) {
              edges.push({
                id: `${prereqId}-${skillId}`,
                source: prereqId,
                target: skillId,
                type: "smoothstep",
                animated: status === "learning",
                style: {
                  stroke:
                    status === "completed"
                      ? "#10b981"
                      : status === "learning"
                      ? "#f59e0b"
                      : "#94a3b8",
                  strokeWidth: 2,
                },
                markerEnd: {
                  type: MarkerType.ArrowClosed,
                  color:
                    status === "completed"
                      ? "#10b981"
                      : status === "learning"
                      ? "#f59e0b"
                      : "#94a3b8",
                },
              });
            }
          });
        });

        yOffset += 200;
      });

    return { nodes, edges };
  };

  const { nodes: initialNodes, edges: initialEdges } = generateNodesAndEdges();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // 更新节点状态
  useEffect(() => {
    const { nodes: newNodes, edges: newEdges } = generateNodesAndEdges();
    setNodes(newNodes);
    setEdges(newEdges);
  }, [completedSkills, learningSkills, selectedCategory]);

  // 应用学习路径
  const applyLearningPath = (pathId: string) => {
    const path = learningPaths.find((p) => p.id === pathId);
    if (path) {
      setSelectedPath(pathId);
      setCompletedSkills([]);
      setLearningSkills([]);
    }
  };

  // 切换技能状态
  const toggleSkillStatus = (skillId: string) => {
    const status = getSkillStatus(skillId);

    if (status === "locked") return;

    if (completedSkills.includes(skillId)) {
      setCompletedSkills(completedSkills.filter((id) => id !== skillId));
    } else if (learningSkills.includes(skillId)) {
      setLearningSkills(learningSkills.filter((id) => id !== skillId));
      setCompletedSkills([...completedSkills, skillId]);
    } else if (status === "available") {
      setLearningSkills([...learningSkills, skillId]);
    }
  };

  const selectedSkillData = skillsData.find((s) => s.id === selectedSkill);
  const totalHours = completedSkills.reduce((sum, id) => {
    const skill = skillsData.find((s) => s.id === id);
    return sum + (skill?.estimatedHours || 0);
  }, 0);

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* 顶部导航 */}
      <header className="border-b bg-white dark:bg-gray-800 shadow-sm z-10">
        <div className="max-w-full px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                返回首页
              </Link>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                🌳 技能树
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                已完成: <span className="font-bold text-green-600">{completedSkills.length}</span> |
                学习中: <span className="font-bold text-yellow-600">{learningSkills.length}</span> |
                总时长: <span className="font-bold">{totalHours}h</span>
              </div>

              {/* 用户信息 */}
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {user.username}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      已登录
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    登出
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-md"
                >
                  登录 / 注册
                </Link>
              )}
            </div>
          </div>

          {/* 分类标签 */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                <span className="mr-1">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* 左侧：技能树画布 */}
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            fitView
            minZoom={0.5}
            maxZoom={1.5}
          >
            <Background />
            <Controls />
          </ReactFlow>

          {/* 图例 */}
          <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">图例</div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <span>🔒</span>
                <span className="text-gray-600 dark:text-gray-400">未解锁</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📚</span>
                <span className="text-gray-600 dark:text-gray-400">可学习</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📖</span>
                <span className="text-gray-600 dark:text-gray-400">学习中</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✅</span>
                <span className="text-gray-600 dark:text-gray-400">已完成</span>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：控制面板 */}
        <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
          <div className="p-4">
            {/* 学习路径选择 */}
            <div className="mb-6">
              <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-3">
                🎯 选择学习路径
              </h3>
              <div className="space-y-2">
                {learningPaths.map((path) => (
                  <button
                    key={path.id}
                    onClick={() => applyLearningPath(path.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedPath === path.id
                        ? `bg-gradient-to-r ${path.color} text-white shadow-md`
                        : "bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{path.icon}</span>
                      <span className="font-semibold text-sm">{path.name}</span>
                    </div>
                    <p
                      className={`text-xs ${
                        selectedPath === path.id
                          ? "text-white/80"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {path.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* 技能详情 */}
            {selectedSkillData ? (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-3">
                  📖 技能详情
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{selectedSkillData.icon}</span>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">
                        {selectedSkillData.name}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {selectedSkillData.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">难度:</span>
                      <span
                        className={`px-2 py-0.5 rounded text-xs ${
                          difficultyConfig[selectedSkillData.difficulty].color
                        }`}
                      >
                        {difficultyConfig[selectedSkillData.difficulty].label}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">预计时长:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {selectedSkillData.estimatedHours}小时
                      </span>
                    </div>
                    {selectedSkillData.prerequisites.length > 0 && (
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">前置技能:</span>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {selectedSkillData.prerequisites.map((prereqId) => {
                            const prereq = skillsData.find((s) => s.id === prereqId);
                            return prereq ? (
                              <span
                                key={prereqId}
                                className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded"
                              >
                                {prereq.name}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => toggleSkillStatus(selectedSkillData.id)}
                    disabled={getSkillStatus(selectedSkillData.id) === "locked"}
                    className={`w-full py-2 rounded-lg font-medium text-sm transition-all ${
                      getSkillStatus(selectedSkillData.id) === "locked"
                        ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {getSkillStatus(selectedSkillData.id) === "locked"
                      ? "🔒 未解锁"
                      : completedSkills.includes(selectedSkillData.id)
                      ? "✅ 已完成（点击撤销）"
                      : learningSkills.includes(selectedSkillData.id)
                      ? "📖 标记为完成"
                      : "📚 开始学习"}
                  </button>

                  {selectedSkillData.resources.docs && (
                    <a
                      href={selectedSkillData.resources.docs}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 block text-center py-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      📚 查看官方文档
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                点击技能节点查看详情
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
