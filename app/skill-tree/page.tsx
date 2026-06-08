"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { skillsData, learningPaths } from "./skillsData";
import { getCurrentUser, logout, updateUserProgress, getUserProgress } from "@/lib/auth";
import SkillStatsPanel from "@/components/SkillStatsPanel";
import {
  ArrowLeft,
  TreeDeciduous,
  CheckCircle2,
  BookOpen,
  Clock,
  User,
  LogOut,
  LogIn,
  RefreshCcw,
  BarChart3,
  X
} from "lucide-react";

export default function SkillTreePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [completedSkills, setCompletedSkills] = useState<string[]>([]);
  const [learningSkills, setLearningSkills] = useState<string[]>([]);
  const [selectedPath, setSelectedPath] = useState<string>("frontend");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [showStats, setShowStats] = useState<boolean>(false);
  const [expandedSkills, setExpandedSkills] = useState<Set<string>>(new Set()); // 展开的技能

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

  // 重置学习进度
  const handleReset = () => {
    if (confirm("确定要清除所有学习进度吗？此操作不可恢复！")) {
      setCompletedSkills([]);
      setLearningSkills([]);
      if (user) {
        updateUserProgress([], []);
      }
    }
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

  // 切换技能展开状态
  const toggleSkillExpand = (skillId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // 阻止触发技能状态切换
    setExpandedSkills(prev => {
      const newSet = new Set(prev);
      if (newSet.has(skillId)) {
        newSet.delete(skillId);
      } else {
        newSet.add(skillId);
      }
      return newSet;
    });
  };

  // 获取技能的直接子技能
  const getDirectChildren = (skillId: string) => {
    return skillsData.filter((s) => s.parentId === skillId);
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

    // 过滤掉子技能（parentId存在的技能不在主树显示）
    filteredSkills = filteredSkills.filter((skill) => !skill.parentId);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      {/* 顶部导航 - 现代风格 */}
      <header className="sticky top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/10 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-8 py-5">
          {/* 第一行：标题、返回和用户信息 */}
          <div className="flex items-center justify-between mb-6">
            {/* 左侧：返回 + 标题 */}
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="group flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-all text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>返回首页</span>
              </Link>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-[16px] flex items-center justify-center shadow-lg">
                  <TreeDeciduous className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">技能树</h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400">探索你的成长路径</p>
                </div>
              </div>
            </div>

            {/* 右侧：统计数据 + 用户 */}
            <div className="flex items-center gap-4">
              {/* 统计卡片 */}
              <div className="flex gap-2">
                <div className="px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-500/20">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">已完成</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{completedSkills.length}</span>
                  </div>
                </div>

                <div className="px-4 py-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-500/20">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-3 h-3 text-yellow-500" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">学习中</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{learningSkills.length}</span>
                  </div>
                </div>

                <div className="px-4 py-2 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-500/20">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-purple-500" />
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{totalHours}h</span>
                  </div>
                </div>
              </div>

              {/* 用户信息 */}
              {user ? (
                <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{user.username}</span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium transition-all"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>退出</span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-br from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-medium text-sm transition-all shadow-lg shadow-blue-500/30"
                >
                  <LogIn className="w-4 h-4" />
                  <span>登录</span>
                </Link>
              )}
            </div>
          </div>

          {/* 第二行：路径选择器 + 操作按钮 */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* 路径选择器 */}
            <div className="flex gap-2 flex-wrap flex-1">
              {learningPaths.map((path) => (
                <button
                  key={path.id}
                  onClick={() => setSelectedPath(path.id)}
                  className={`group px-3 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                    selectedPath === path.id
                      ? "bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30 scale-105"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105"
                  }`}
                >
                  <span className="text-sm mr-1.5">{path.icon}</span>
                  <span>{path.name}</span>
                  {selectedPath === path.id && (
                    <span className="ml-1.5 inline-block w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                  )}
                </button>
              ))}
            </div>

            {/* 操作按钮组 */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* 重置按钮 */}
              <button
                onClick={handleReset}
                className="group px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 border border-transparent hover:border-red-200 dark:hover:border-red-500/30 whitespace-nowrap"
                title="清除所有学习进度"
              >
                <RefreshCcw className="w-3.5 h-3.5" />
                <span>重新学习</span>
              </button>

              {/* 统计面板切换按钮 */}
              <button
                onClick={() => setShowStats(!showStats)}
                className={`group px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 shadow-lg whitespace-nowrap ${
                  showStats
                    ? "bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-purple-500/30"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {showStats ? <X className="w-3.5 h-3.5" /> : <BarChart3 className="w-3.5 h-3.5" />}
                <span>{showStats ? "隐藏统计" : "查看统计"}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 技能树主体 */}
      <main className="max-w-[1600px] mx-auto px-8 py-12">
        {/* 统计面板 - 可折叠 */}
        {showStats && (
          <div className="mb-8 animate-in slide-in-from-top-4 duration-300">
            <SkillStatsPanel
              completedSkills={completedSkills}
              learningSkills={learningSkills}
              selectedPath={selectedPath}
            />
          </div>
        )}

        <div className="relative">
          {/* 装饰性背景网格 */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

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
                        const directChildren = getDirectChildren(skill.id);
                        const isExpanded = expandedSkills.has(skill.id);

                        return (
                          <div key={skill.id} className="relative group flex flex-col items-center">
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
                                  ? "bg-gradient-to-br from-green-500 to-emerald-500 border-green-300 shadow-lg shadow-green-500/50"
                                  : status === "learning"
                                  ? "bg-gradient-to-br from-yellow-500 to-orange-500 border-yellow-300 shadow-lg shadow-yellow-500/50 animate-pulse"
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

                                {/* 展开按钮 */}
                                {skill.isExpandable && directChildren.length > 0 && (
                                  <button
                                    onClick={(e) => toggleSkillExpand(skill.id, e)}
                                    className="absolute -bottom-2 -right-2 w-7 h-7 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform z-20"
                                    title={isExpanded ? "收起子技能" : "展开子技能"}
                                  >
                                    <span className={`text-sm transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
                                  </button>
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

                            {/* 子技能展示区域 */}
                            {isExpanded && directChildren.length > 0 && (
                              <div className="mt-6 flex flex-col gap-3 animate-in slide-in-from-top-2 duration-300">
                                {directChildren.map((child) => {
                                  const childStatus = getSkillStatus(child.id);
                                  const isChildHovered = hoveredSkill === child.id;
                                  return (
                                    <div
                                      key={child.id}
                                      className="relative"
                                      onMouseEnter={() => setHoveredSkill(child.id)}
                                      onMouseLeave={() => setHoveredSkill(null)}
                                    >
                                      <div
                                        onClick={() => toggleSkillStatus(child.id)}
                                        className={`w-56 px-4 py-3 rounded-2xl cursor-pointer transition-all hover:scale-105 hover:shadow-xl border-3 shadow-md ${
                                          childStatus === "completed"
                                            ? "bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 border-green-400 dark:border-green-500"
                                            : childStatus === "learning"
                                            ? "bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/40 dark:to-orange-900/40 border-yellow-400 dark:border-yellow-500"
                                            : childStatus === "available"
                                            ? "bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40 border-blue-400 dark:border-blue-500"
                                            : "bg-gray-200/60 dark:bg-gray-700/50 border-gray-400 dark:border-gray-600 opacity-60 cursor-not-allowed"
                                        }`}
                                      >
                                        <div className="flex items-start gap-2 mb-2">
                                          <span className="text-2xl">{child.icon}</span>
                                          <div className="flex-1">
                                            <div className={`text-sm font-bold mb-1 ${
                                              childStatus === "completed"
                                                ? "text-green-700 dark:text-green-300"
                                                : childStatus === "learning"
                                                ? "text-yellow-700 dark:text-yellow-300"
                                                : childStatus === "available"
                                                ? "text-blue-700 dark:text-blue-300"
                                                : "text-gray-600 dark:text-gray-400"
                                            }`}>
                                              {child.name}
                                            </div>
                                            <div className={`text-xs leading-relaxed ${
                                              childStatus === "completed"
                                                ? "text-green-600 dark:text-green-400"
                                                : childStatus === "learning"
                                                ? "text-yellow-600 dark:text-yellow-400"
                                                : childStatus === "available"
                                                ? "text-blue-600 dark:text-blue-400"
                                                : "text-gray-500 dark:text-gray-500"
                                            }`}>
                                              {child.description}
                                            </div>
                                          </div>
                                        </div>
                                        <div className={`text-xs font-medium ${
                                          childStatus === "completed"
                                            ? "text-green-600 dark:text-green-400"
                                            : childStatus === "learning"
                                            ? "text-yellow-600 dark:text-yellow-400"
                                            : childStatus === "available"
                                            ? "text-blue-600 dark:text-blue-400"
                                            : "text-gray-500 dark:text-gray-500"
                                        }`}>
                                          {child.estimatedHours}h
                                        </div>
                                      </div>

                                      {/* 子技能悬浮详情卡片 */}
                                      {isChildHovered && (
                                        <div className="absolute left-full ml-4 top-0 w-80 bg-white/95 dark:bg-black/95 backdrop-blur-sm border border-gray-200 dark:border-white/20 rounded-2xl p-5 shadow-2xl z-50">
                                          <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                                            <span className="text-3xl">{child.icon}</span>
                                            <div>
                                              <h3 className="text-gray-900 dark:text-white font-bold text-lg">{child.name}</h3>
                                              <p className="text-gray-600 dark:text-gray-400 text-xs">{skill.name} 子技能</p>
                                            </div>
                                          </div>

                                          <div className="space-y-3 text-sm">
                                            <div>
                                              <div className="text-gray-500 dark:text-gray-400 text-xs font-semibold mb-1">📝 技能描述</div>
                                              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{child.description}</p>
                                            </div>

                                            <div>
                                              <div className="text-gray-500 dark:text-gray-400 text-xs font-semibold mb-1">⏱️ 学习时长</div>
                                              <p className="text-gray-700 dark:text-gray-300">预计 <span className="font-bold text-purple-600 dark:text-purple-400">{child.estimatedHours}</span> 小时</p>
                                            </div>

                                            <div>
                                              <div className="text-gray-500 dark:text-gray-400 text-xs font-semibold mb-1">📚 难度等级</div>
                                              <span className={`inline-block px-2 py-1 rounded-lg text-xs font-medium ${
                                                child.difficulty === "beginner" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" :
                                                child.difficulty === "intermediate" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300" :
                                                "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                                              }`}>
                                                {child.difficulty === "beginner" ? "入门" : child.difficulty === "intermediate" ? "中级" : "高级"}
                                              </span>
                                            </div>

                                            {child.resources?.docs && (
                                              <div>
                                                <div className="text-gray-500 dark:text-gray-400 text-xs font-semibold mb-1">🔗 学习资源</div>
                                                <a
                                                  href={child.resources.docs}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="text-blue-600 dark:text-blue-400 hover:underline text-xs"
                                                  onClick={(e) => e.stopPropagation()}
                                                >
                                                  查看官方文档 →
                                                </a>
                                              </div>
                                            )}

                                            <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                                              {childStatus === "locked" && (
                                                <div className="text-red-600 dark:text-red-400 text-xs flex items-center gap-1">
                                                  🔒 需要先完成 {skill.name}
                                                </div>
                                              )}
                                              {childStatus === "available" && (
                                                <div className="text-blue-600 dark:text-blue-400 text-xs flex items-center gap-1">
                                                  📚 点击卡片开始学习
                                                </div>
                                              )}
                                              {childStatus === "learning" && (
                                                <div className="text-yellow-600 dark:text-yellow-400 text-xs flex items-center gap-1">
                                                  📖 学习中，点击标记为完成
                                                </div>
                                              )}
                                              {childStatus === "completed" && (
                                                <div className="text-green-600 dark:text-green-400 text-xs flex items-center gap-1">
                                                  ✅ 已完成！点击可撤销
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
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
