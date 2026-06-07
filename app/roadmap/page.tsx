export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* 顶部导航 */}
      <header className="border-b bg-white dark:bg-gray-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <a
            href="/"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-2 text-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            返回首页
          </a>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            功能扩充计划
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            技术栈选择器的未来发展方向
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 概述 */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 mb-8 border border-blue-200 dark:border-blue-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">🎯 项目愿景</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            打造一个全面、智能、互动的技术学习平台，帮助开发者：
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
            <li>快速了解编程语言及其生态系统</li>
            <li>获得个性化的学习路径推荐</li>
            <li>发现最适合自己的技术栈组合</li>
            <li>持续跟踪技术趋势和市场需求</li>
          </ul>
        </div>

        {/* Phase 1 */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">Phase 1</span>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">立即可做（基础增强）</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl">📊</span>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">框架详细信息</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    为每个框架添加更丰富的元数据
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded p-3 text-xs">
                <div className="font-mono text-gray-700 dark:text-gray-300">
                  <div>• GitHub 星标数</div>
                  <div>• 学习难度标签</div>
                  <div>• 流行度评分</div>
                  <div>• 官网链接</div>
                  <div>• 发布年份</div>
                  <div>• 使用场景</div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl">🔍</span>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">搜索功能</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    快速查找语言和框架
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded p-3 text-xs">
                <div className="font-mono text-gray-700 dark:text-gray-300">
                  <div>• 实时搜索过滤</div>
                  <div>• 支持拼音搜索</div>
                  <div>• 搜索历史记录</div>
                  <div>• 热门搜索推荐</div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl">🏷️</span>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">标签系统</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    可视化展示技术特点
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded p-3 text-xs">
                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded">简单</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded">流行</span>
                  <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded">全栈</span>
                  <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 rounded">高薪</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Phase 2 */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">Phase 2</span>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">中期计划（智能推荐）</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl">🎯</span>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">筛选和排序</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    多维度筛选框架
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span>按类型筛选（Web框架、UI框架、工具库）</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span>按难度筛选（简单、中等、困难）</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span>按流行度排序</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl">🤝</span>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">组合推荐</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    "经常一起使用"智能推荐
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded p-3">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  <div className="font-semibold mb-2">选择了 React？</div>
                  <div className="space-y-1 text-xs">
                    <div>✓ 其他人还选择了：</div>
                    <div className="ml-3">• Node.js (后端)</div>
                    <div className="ml-3">• MongoDB (数据库)</div>
                    <div className="ml-3">• Tailwind CSS (样式)</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl">📚</span>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">学习资源</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    精选学习资源集合
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <a href="#" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
                  <span>📖</span> 官方文档
                </a>
                <a href="#" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
                  <span>🎥</span> 视频教程
                </a>
                <a href="#" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
                  <span>💻</span> 实战项目
                </a>
                <a href="#" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
                  <span>💬</span> 社区论坛
                </a>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl">⚖️</span>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">框架对比</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    并排对比技术特性
                  </p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-gray-50 dark:bg-gray-700/50">
                    <tr>
                      <th className="px-2 py-1 text-left">特性</th>
                      <th className="px-2 py-1 text-left">React</th>
                      <th className="px-2 py-1 text-left">Vue</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700 dark:text-gray-300">
                    <tr>
                      <td className="px-2 py-1">难度</td>
                      <td className="px-2 py-1">中等</td>
                      <td className="px-2 py-1">简单</td>
                    </tr>
                    <tr>
                      <td className="px-2 py-1">流行度</td>
                      <td className="px-2 py-1">95%</td>
                      <td className="px-2 py-1">85%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Phase 3 */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">Phase 3</span>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">长期规划（可视化与社交）</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col items-center text-center mb-3">
                <span className="text-4xl mb-2">🌳</span>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">技能树可视化</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  直观展示技术学习路径
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded p-3 font-mono text-xs text-center">
                <div className="text-gray-700 dark:text-gray-300">
                  <div>Web开发</div>
                  <div>↙ ↘</div>
                  <div>前端 后端</div>
                  <div>↓ ↓</div>
                  <div>React Node</div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col items-center text-center mb-3">
                <span className="text-4xl mb-2">❤️</span>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">收藏功能</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  保存个人技术栈
                </p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-2">
                  <div className="font-semibold text-gray-900 dark:text-white">我的技术栈</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    React, Node.js, MongoDB
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col items-center text-center mb-3">
                <span className="text-4xl mb-2">⭐</span>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">评分与评论</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  用户分享使用体验
                </p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500">★★★★★</span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">4.5/5</span>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 italic">
                  "React太好用了！"
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 额外功能 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">💡 其他创意功能</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-5 border border-orange-200 dark:border-orange-800">
              <div className="flex items-start gap-3">
                <span className="text-3xl">💼</span>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">职位需求分析</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    实时展示市场需求和薪资水平
                  </p>
                  <div className="bg-white/50 dark:bg-gray-800/50 rounded p-2 text-xs">
                    <div className="font-semibold">React 相关职位</div>
                    <div className="text-gray-600 dark:text-gray-400">15,230 个职位</div>
                    <div className="text-gray-600 dark:text-gray-400">平均薪资: $85k-$120k</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg p-5 border border-green-200 dark:border-green-800">
              <div className="flex items-start gap-3">
                <span className="text-3xl">🗺️</span>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">学习路径生成器</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    根据目标生成个性化学习计划
                  </p>
                  <div className="bg-white/50 dark:bg-gray-800/50 rounded p-2 text-xs space-y-1">
                    <div>1️⃣ 入门 JavaScript (4周)</div>
                    <div>2️⃣ 学习 React (6周)</div>
                    <div>3️⃣ 掌握 Next.js (4周)</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-5 border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <span className="text-3xl">📈</span>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">技术趋势图表</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    可视化展示技术流行度变化
                  </p>
                  <div className="bg-white/50 dark:bg-gray-800/50 rounded p-2 text-xs">
                    <div className="flex items-end gap-1 h-16">
                      <div className="w-8 bg-blue-500 h-12"></div>
                      <div className="w-8 bg-green-500 h-14"></div>
                      <div className="w-8 bg-purple-500 h-16"></div>
                    </div>
                    <div className="text-center text-gray-600 dark:text-gray-400 mt-1">
                      2022 → 2024
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-5 border border-purple-200 dark:border-purple-800">
              <div className="flex items-start gap-3">
                <span className="text-3xl">🎮</span>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">互动代码示例</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    在线运行框架示例代码
                  </p>
                  <div className="bg-gray-900 rounded p-2 text-xs font-mono text-green-400">
                    <div>{'<div>Hello React!</div>'}</div>
                    <div className="text-gray-500 mt-1">▶ 运行</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 底部总结 */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">🚀 持续进化中</h2>
          <p className="text-lg mb-4">
            这些功能将逐步实现，让技术学习变得更简单、更高效！
          </p>
          <p className="text-sm opacity-90">
            有任何建议或想法？欢迎随时反馈！
          </p>
        </div>
      </main>
    </div>
  );
}
