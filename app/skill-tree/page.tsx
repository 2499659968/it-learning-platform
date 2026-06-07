"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { skillsData, learningPaths } from "./skillsData";
import { getCurrentUser, logout, updateUserProgress, getUserProgress } from "@/lib/auth";

export default function SkillTreePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [completedSkills, setCompletedSkills] = useState<string[]>([]);
  const [learningSkills, setLearningSkills] = useState<string[]>([]);
  const [selectedPath, setSelectedPath] = useState<string>("frontend");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

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

    const prereqsMet = skill.prerequisites.every((prereq) =>
      completedSkills.includes(prereq)
    );
    return prereqsMet ? "available" : "locked";
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

  // 按层级分组技能 - 根据选择的路径过滤
  const groupSkillsByLevel = (pathId: string) => {
    const levels: Record<number, typeof skillsData> = {};

    // 如果选择了路径，只显示路径中的技能及其前置技能
    let filteredSkills = skillsData;
    const path = learningPaths.find((p) => p.id === pathId);

    if (path) {
      const pathSkillIds = new Set(path.skills);

      // 递归获取所有前置技能
      const getAllPrerequisites = (skillId: string): string[] => {
        const skill = skillsData.find((s) => s.id === skillId);
        if (!skill) return [];

        const prereqs = [...skill.prerequisites];
        skill.prerequisites.forEach((prereqId) => {
          prereqs.push(...getAllPrerequisites(prereqId));
        });

        return [...new Set(prereqs)];
      };

      // 收集路径技能及其所有前置技能
      const allRequiredSkills = new Set<string>();
      path.skills.forEach((skillId) => {
        allRequiredSkills.add(skillId);
        getAllPrerequisites(skillId).forEach((prereqId) => {
          allRequiredSkills.add(prereqId);
        });
      });

      filteredSkills = skillsData.filter((skill) => allRequiredSkills.has(skill.id));
    }

    filteredSkills.forEach((skill) => {
      const level = skill.prerequisites.length;
      if (!levels[level]) levels[level] = [];
      levels[level].push(skill);
    });

    return levels;
  };

  const leveledSkills = groupSkillsByLevel(selectedPath);

  const currentPath = learningPaths.find((p) => p.id === selectedPath);

  const totalHours = completedSkills.reduce((sum, id) => {
    const skill = skillsData.find((s) => s.id === id);
    return sum + (skill?.estimatedHours || 0);
  }, 0);

  // 检查技能是否在当前路径中
  const isInPath = (skillId: string) => {
    return currentPath?.skills.includes(skillId);
  };

  // 获取技能的子技能（依赖此技能的技能）
  const getChildSkills = (skillId: string) => {
    return skillsData.filter((s) => s.prerequisites.includes(skillId)).map((s) => s.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* 顶部导航 */}
      <header className="bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                ← 返回
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">技能树</h1>
                <p className="text-sm text-gray-400">选择你的成长路径</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              {/* 统计信息 */}
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-300">已完成: <span className="text-white font-bold">{completedSkills.length}</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-300">学习中: <span className="text-white font-bold">{learningSkills.length}</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-300">⏱️ {totalHours}h</span>
                </div>
              </div>

              {/* 用户信息 */}
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-300">{user.username}</span>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded text-sm transition-colors"
                  >
                    退出
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium text-sm transition-colors"
                >
                  登录
                </Link>
              )}
            </div>
          </div>

          {/* 路径选择 */}
          <div className="flex gap-3 mt-4">
            {learningPaths.map((path) => (
              <button
                key={path.id}
                onClick={() => setSelectedPath(path.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedPath === path.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              >
                {path.icon} {path.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* 技能树主体 */}
      <main className="max-w-[1600px] mx-auto px-6 py-12">
        <div className="relative">
          {/* 游戏风格背景网格 */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

          {/* 技能树层级展示 */}
          <div className="relative space-y-16">
            {Object.keys(leveledSkills)
              .sort((a, b) => Number(a) - Number(b))
              .map((level) => {
                const levelNum = Number(level);
                const skills = leveledSkills[levelNum];
                const levelNames = ["起点", "基础", "进阶", "高级", "专家", "大师"];

                return (
                  <div key={level} className="relative">
                    {/* 层级标签 */}
                    <div className="absolute -left-32 top-1/2 -translate-y-1/2">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg">
                        {levelNames[levelNum] || `Lv.${levelNum}`}
                      </div>
                    </div>

                    {/* 技能节点 */}
                    <div className="flex justify-center gap-8 flex-wrap">
                      {skills.map((skill) => {
                        const status = getSkillStatus(skill.id);
                        const inPath = isInPath(skill.id);
                        const childSkills = getChildSkills(skill.id);
                        const isHovered = hoveredSkill === skill.id;

                        return (
                          <div key={skill.id} className="relative group">
                            {/* 连接线到子节点 */}
                            {childSkills.length > 0 && (
                              <svg
                                className="absolute top-full left-1/2 -translate-x-1/2 pointer-events-none z-0"
                                width="200"
                                height="80"
                                style={{ overflow: 'visible' }}
                              >
                                {childSkills.map((childId) => {
                                  const childSkill = skillsData.find((s) => s.id === childId);
                                  if (!childSkill) return null;

                                  const childStatus = getSkillStatus(childId);
                                  const lineColor =
                                    childStatus === "completed" ? "#10b981" :
                                    childStatus === "learning" ? "#f59e0b" :
                                    childStatus === "available" ? "#3b82f6" : "#4b5563";

                                  return (
                                    <line
                                      key={childId}
                                      x1="100"
                                      y1="0"
                                      x2="100"
                                      y2="80"
                                      stroke={lineColor}
                                      strokeWidth="3"
                                      strokeDasharray={status === "locked" ? "5,5" : "none"}
                                      opacity={isHovered || hoveredSkill === childId ? "1" : "0.3"}
                                      className="transition-opacity duration-300"
                                    />
                                  );
                                })}
                              </svg>
                            )}

                            {/* 技能节点 */}
                            <div
                              onClick={() => toggleSkillStatus(skill.id)}
                              onMouseEnter={() => setHoveredSkill(skill.id)}
                              onMouseLeave={() => setHoveredSkill(null)}
                              className={`relative w-32 h-32 cursor-pointer transition-all duration-300 ${
                                isHovered ? "scale-110 z-10" : "z-0"
                              }`}
                            >
                              {/* 外圈光晕 */}
                              {status !== "locked" && (
                                <div className={`absolute inset-0 rounded-full blur-xl ${
                                  status === "completed" ? "bg-green-500" :
                                  status === "learning" ? "bg-yellow-500" :
                                  "bg-blue-500"
                                } opacity-50`}></div>
                              )}

                              {/* 主节点 */}
                              <div className={`relative w-full h-full rounded-full border-4 flex flex-col items-center justify-center transition-all ${
                                status === "completed"
                                  ? `bg-gradient-to-br ${skill.gradient} border-green-400 shadow-lg shadow-green-500/50`
                                  : status === "learning"
                                  ? "bg-gradient-to-br from-yellow-600 to-orange-600 border-yellow-400 shadow-lg shadow-yellow-500/50 animate-pulse"
                                  : status === "available"
                                  ? "bg-gradient-to-br from-blue-600 to-cyan-600 border-blue-400 shadow-lg shadow-blue-500/50"
                                  : "bg-gray-800 border-gray-600 opacity-50"
                              }`}>
                                {/* 路径标记 */}
                                {inPath && status !== "completed" && (
                                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg animate-bounce">
                                    ⭐
                                  </div>
                                )}

                                {/* 状态图标 */}
                                <div className="absolute -top-3 -left-3 w-8 h-8 bg-black/80 rounded-full flex items-center justify-center text-lg border-2 border-white/20">
                                  {status === "completed" && "✅"}
                                  {status === "learning" && "📖"}
                                  {status === "available" && "📚"}
                                  {status === "locked" && "🔒"}
                                </div>

                                <div className="text-3xl mb-1">{skill.icon}</div>
                                <div className={`text-xs font-bold text-center px-2 ${
                                  status === "locked" ? "text-gray-400" : "text-white"
                                }`}>
                                  {skill.name}
                                </div>
                              </div>

                              {/* 悬浮信息卡片 */}
                              {isHovered && (
                                <div className="absolute left-full ml-4 top-0 w-64 bg-black/95 backdrop-blur-sm border border-white/20 rounded-lg p-4 shadow-2xl z-50">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="text-2xl">{skill.icon}</span>
                                    <h3 className="text-white font-bold">{skill.name}</h3>
                                  </div>
                                  <p className="text-gray-300 text-sm mb-3">{skill.description}</p>

                                  <div className="space-y-2 text-xs">
                                    <div className="flex justify-between">
                                      <span className="text-gray-400">预计时长:</span>
                                      <span className="text-white font-bold">{skill.estimatedHours}h</span>
                                    </div>

                                    {skill.prerequisites.length > 0 && (
                                      <div>
                                        <div className="text-gray-400 mb-1">前置技能:</div>
                                        <div className="flex flex-wrap gap-1">
                                          {skill.prerequisites.map((prereqId) => {
                                            const prereq = skillsData.find((s) => s.id === prereqId);
                                            const prereqCompleted = completedSkills.includes(prereqId);
                                            return prereq ? (
                                              <span
                                                key={prereqId}
                                                className={`px-2 py-1 rounded ${
                                                  prereqCompleted
                                                    ? "bg-green-500/20 text-green-400"
                                                    : "bg-red-500/20 text-red-400"
                                                }`}
                                              >
                                                {prereq.name}
                                              </span>
                                            ) : null;
                                          })}
                                        </div>
                                      </div>
                                    )}

                                    {status === "locked" && (
                                      <div className="text-red-400 mt-2">
                                        🔒 需要先完成前置技能
                                      </div>
                                    )}
                                    {status === "available" && (
                                      <div className="text-blue-400 mt-2">
                                        📚 点击开始学习
                                      </div>
                                    )}
                                    {status === "learning" && (
                                      <div className="text-yellow-400 mt-2">
                                        📖 点击标记为完成
                                      </div>
                                    )}
                                    {status === "completed" && (
                                      <div className="text-green-400 mt-2">
                                        ✅ 已完成（点击撤销）
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* 图例说明 */}
        <div className="fixed bottom-6 right-6 bg-black/90 backdrop-blur-sm border border-white/20 rounded-lg p-4 shadow-2xl">
          <h3 className="text-white font-bold text-sm mb-3">图例</h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full"></div>
              <span className="text-gray-300">已完成</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-full animate-pulse"></div>
              <span className="text-gray-300">学习中</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full"></div>
              <span className="text-gray-300">可学习</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-800 rounded-full opacity-50"></div>
              <span className="text-gray-300">已锁定</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-500">⭐</span>
              <span className="text-gray-300">推荐路径</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
