"use client";

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { skillsData, learningPaths, type SkillNode } from "@/app/skill-tree/skillsData";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Lightbulb,
  TrendingUp,
  Database,
  Code,
  Wrench,
  Brain
} from "lucide-react";

interface SkillStatsPanelProps {
  completedSkills: string[];
  learningSkills: string[];
  selectedPath: string;
}

export default function SkillStatsPanel({ completedSkills, learningSkills, selectedPath }: SkillStatsPanelProps) {
  // 计算分类统计
  const getCategoryStats = () => {
    const categories = { language: 0, framework: 0, tool: 0, concept: 0 };
    const completedCategories = { language: 0, framework: 0, tool: 0, concept: 0 };

    skillsData.forEach((skill) => {
      categories[skill.category]++;
      if (completedSkills.includes(skill.id)) {
        completedCategories[skill.category]++;
      }
    });

    return [
      { name: "语言", value: completedCategories.language, total: categories.language, color: "#3b82f6" },
      { name: "框架", value: completedCategories.framework, total: categories.framework, color: "#8b5cf6" },
      { name: "工具", value: completedCategories.tool, total: categories.tool, color: "#10b981" },
      { name: "概念", value: completedCategories.concept, total: categories.concept, color: "#f59e0b" },
    ];
  };

  // 计算难度统计
  const getDifficultyStats = () => {
    const difficulties = { beginner: 0, intermediate: 0, advanced: 0 };
    const completedDifficulties = { beginner: 0, intermediate: 0, advanced: 0 };

    skillsData.forEach((skill) => {
      difficulties[skill.difficulty]++;
      if (completedSkills.includes(skill.id)) {
        completedDifficulties[skill.difficulty]++;
      }
    });

    return [
      {
        name: "入门",
        completed: completedDifficulties.beginner,
        total: difficulties.beginner,
        color: "#10b981"
      },
      {
        name: "中级",
        completed: completedDifficulties.intermediate,
        total: difficulties.intermediate,
        color: "#f59e0b"
      },
      {
        name: "高级",
        completed: completedDifficulties.advanced,
        total: difficulties.advanced,
        color: "#ef4444"
      },
    ];
  };

  // 计算路径完成度
  const getPathProgress = () => {
    return learningPaths.map((path) => {
      const pathSkills = path.skills;
      const completed = pathSkills.filter((id) => completedSkills.includes(id)).length;
      const percentage = Math.round((completed / pathSkills.length) * 100);

      return {
        name: path.name,
        completed,
        total: pathSkills.length,
        percentage,
        icon: path.icon,
        isSelected: path.id === selectedPath,
      };
    });
  };

  // 计算关键指标
  const getKeyMetrics = () => {
    const totalSkills = skillsData.length;
    const completed = completedSkills.length;
    const learning = learningSkills.length;
    const completionRate = Math.round((completed / totalSkills) * 100);

    const totalHours = skillsData.reduce((sum, skill) => sum + skill.estimatedHours, 0);
    const completedHours = completedSkills.reduce((sum, id) => {
      const skill = skillsData.find((s) => s.id === id);
      return sum + (skill?.estimatedHours || 0);
    }, 0);

    return {
      totalSkills,
      completed,
      learning,
      completionRate,
      totalHours,
      completedHours,
    };
  };

  const categoryStats = getCategoryStats();
  const difficultyStats = getDifficultyStats();
  const pathProgress = getPathProgress();
  const metrics = getKeyMetrics();

  const COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"];

  return (
    <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-[32px] p-8 shadow-xl hover:shadow-2xl transition-all space-y-6">
      {/* 标题 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">学习统计</h2>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">数据概览</div>
      </div>

      {/* 关键指标卡片 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-[24px] p-5 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
          style={{ transform: 'rotate(-0.5deg)' }}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-[16px] flex items-center justify-center mb-3">
            <Database className="w-5 h-5 text-white" />
          </div>
          <div className="text-gray-600 dark:text-gray-400 text-xs mb-1">总技能数</div>
          <div className="text-gray-900 dark:text-white text-3xl font-bold">{metrics.totalSkills}</div>
        </div>

        <div
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-[24px] p-5 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
          style={{ transform: 'rotate(0.5deg)' }}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-[16px] flex items-center justify-center mb-3">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
          <div className="text-gray-600 dark:text-gray-400 text-xs mb-1">已完成</div>
          <div className="text-gray-900 dark:text-white text-3xl font-bold">{metrics.completed}</div>
          <div className="text-green-600 dark:text-green-400 text-xs mt-1 font-semibold">{metrics.completionRate}%</div>
        </div>

        <div
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-[24px] p-5 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
          style={{ transform: 'rotate(-0.3deg)' }}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-[16px] flex items-center justify-center mb-3">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div className="text-gray-600 dark:text-gray-400 text-xs mb-1">学习中</div>
          <div className="text-gray-900 dark:text-white text-3xl font-bold">{metrics.learning}</div>
        </div>

        <div
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-[24px] p-5 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
          style={{ transform: 'rotate(0.3deg)' }}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-[16px] flex items-center justify-center mb-3">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div className="text-gray-600 dark:text-gray-400 text-xs mb-1">学习时长</div>
          <div className="text-gray-900 dark:text-white text-3xl font-bold">{metrics.completedHours}h</div>
          <div className="text-purple-600 dark:text-purple-400 text-xs mt-1 font-semibold">/ {metrics.totalHours}h</div>
        </div>
      </div>

      {/* 图表区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 技能分类分布 - 饼图 */}
        <div
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-[28px] p-6 shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all"
          style={{ transform: 'rotate(-0.5deg)' }}
        >
          <h3 className="text-gray-900 dark:text-white font-semibold mb-4 text-base">技能分类完成情况</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={categoryStats}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) => `${entry.name} ${entry.value}/${entry.total}`}
                outerRadius={70}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '12px',
                  color: '#1f2937',
                  backdropFilter: 'blur(10px)'
                }}
                formatter={(value: any, name: any, props: any) => [`${value}/${props.payload.total}`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 难度级别分布 - 柱状图 */}
        <div
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-[28px] p-6 shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all"
          style={{ transform: 'rotate(0.5deg)' }}
        >
          <h3 className="text-gray-900 dark:text-white font-semibold mb-4 text-base">难度级别完成情况</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={difficultyStats}>
              <XAxis dataKey="name" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '12px',
                  color: '#1f2937',
                  backdropFilter: 'blur(10px)'
                }}
                formatter={(value: any, name: any, props: any) => {
                  if (name === "completed") return [`已完成: ${value}/${props.payload.total}`, ""];
                  return [value, name];
                }}
              />
              <Bar dataKey="completed" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 学习路径完成度 */}
      <div
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-[28px] p-6 shadow-lg hover:shadow-xl transition-all"
        style={{ transform: 'rotate(-0.3deg)' }}
      >
        <h3 className="text-gray-900 dark:text-white font-semibold mb-5 text-base">学习路径完成度</h3>
        <div className="space-y-4">
          {pathProgress.map((path) => (
            <div key={path.name} className={`transition-all rounded-2xl ${path.isSelected ? '-mx-2 px-2 py-1 bg-blue-500/5 dark:bg-blue-500/10' : ''}`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm ${path.isSelected ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-600 dark:text-gray-400'}`}>
                  {path.icon} {path.name}
                  {path.isSelected && <span className="ml-2 text-xs px-2 py-0.5 bg-blue-500 text-white rounded-full">当前路径</span>}
                </span>
                <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  {path.completed}/{path.total} ({path.percentage}%)
                </span>
              </div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    path.isSelected
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/50'
                      : 'bg-gradient-to-r from-gray-400 to-gray-500'
                  }`}
                  style={{ width: `${path.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 学习建议 */}
      <div
        className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 backdrop-blur-sm rounded-[28px] p-6 shadow-lg hover:shadow-xl transition-all border border-purple-200/50 dark:border-purple-500/20"
        style={{ transform: 'rotate(0.3deg)' }}
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-[16px] flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">💡</span>
          </div>
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold text-base mb-2">学习建议</h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              {metrics.completionRate < 10 && "刚开始学习旅程！建议先从基础技能开始，打好根基。"}
              {metrics.completionRate >= 10 && metrics.completionRate < 30 && "进展不错！继续保持学习节奏，逐步解锁更多技能。"}
              {metrics.completionRate >= 30 && metrics.completionRate < 60 && "已经掌握了不少技能！可以尝试一些高级主题了。"}
              {metrics.completionRate >= 60 && metrics.completionRate < 90 && "非常棒！你已经是高级开发者了，继续精进吧！"}
              {metrics.completionRate >= 90 && "恭喜！你已经掌握了绝大部分技能，成为技术大师指日可待！"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
