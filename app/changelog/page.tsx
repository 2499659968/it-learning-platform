import Link from "next/link";
import { changelogData, getChangelogStats, typeConfig, impactConfig } from "./changelogData";

export default function ChangelogPage() {
  const stats = getChangelogStats();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* 顶部导航 */}
      <header className="border-b bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-2 text-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            返回首页
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            📝 项目迭代记录
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            记录每一次更新和改进
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 统计卡片 */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {stats.totalVersions}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">总版本数</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {stats.features}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">新功能</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {stats.improvements}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">优化改进</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-3xl font-bold text-red-600 dark:text-red-400">
              {stats.bugfixes}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">问题修复</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
              {stats.totalChanges}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">总变更数</div>
          </div>
        </div>

        {/* 时间线 */}
        <div className="relative">
          {/* 中心线 */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-purple-200 via-blue-200 to-green-200 dark:from-purple-900 dark:via-blue-900 dark:to-green-900"></div>

          <div className="space-y-8">
            {changelogData.map((entry, index) => {
              const config = typeConfig[entry.type];
              const impactInfo = impactConfig[entry.impact];
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={entry.version}
                  className={`relative flex items-center ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* 时间线节点 */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-r ${config.color} items-center justify-center text-2xl shadow-lg z-10">
                    {config.icon}
                  </div>

                  {/* 内容卡片 */}
                  <div className={`w-full md:w-[calc(50%-3rem)] ${isLeft ? "md:pr-8" : "md:pl-8"}`}>
                    <div className={`bg-white dark:bg-gray-800 rounded-lg border-2 ${config.borderColor} shadow-md hover:shadow-xl transition-shadow`}>
                      {/* 卡片头部 */}
                      <div className={`${config.bgColor} border-b ${config.borderColor} p-4`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{config.icon}</span>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                              {entry.title}
                            </h3>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded ${impactInfo.color}`}>
                            {impactInfo.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <span className="font-mono font-semibold text-gray-900 dark:text-white">
                            {entry.version}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400">•</span>
                          <span className="text-gray-600 dark:text-gray-400">{entry.date}</span>
                          <span className="text-gray-500 dark:text-gray-400">•</span>
                          <span className={config.textColor}>{config.label}</span>
                        </div>
                      </div>

                      {/* 卡片内容 */}
                      <div className="p-4">
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          {entry.description}
                        </p>

                        <div className="space-y-4">
                          {entry.changes.map((change, idx) => (
                            <div key={idx}>
                              <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-2">
                                {change.category}
                              </h4>
                              <ul className="space-y-1">
                                {change.items.map((item, itemIdx) => (
                                  <li
                                    key={itemIdx}
                                    className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2"
                                  >
                                    <span className="text-green-500 mt-1">✓</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 底部提示 */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">🚀 持续更新中</h2>
          <p className="text-lg mb-4">
            每一次迭代都是为了更好的学习体验
          </p>
          <p className="text-sm opacity-90">
            当前版本: {changelogData[0].version} | 最后更新: {changelogData[0].date}
          </p>
        </div>
      </main>
    </div>
  );
}
