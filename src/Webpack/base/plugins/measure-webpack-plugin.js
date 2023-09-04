/**
 * 本插件自动在每个输出的 js 文件头尾加上 performance.mark ，在尾部加上 nperformance.measure 来测量 js 的执行时长
 * 然后可自己用 performance.getEntriesByType('measure'); 来收集数据
 */
class MeasureWebpackPlugin {
  constructor() {}

  apply(compiler) {
    const pluginName = MeasureWebpackPlugin.name;

    const { webpack } = compiler;
    const { Compilation } = webpack;

    // 【compiler钩子】thisCompilation: 初始化 compilation 时调用，在触发 compilation 事件之前调用。
    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      // 【compilation钩子】processAssets
      compilation.hooks.processAssets.tap(
        {
          name: pluginName,
          // @see node_modules/webpack/lib/Compilation.js
          // https://webpack.docschina.org/api/compilation-hooks/#list-of-asset-processing-stages 查看 15个 PROCESS_ASSETS_STAGE_*
          stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
        },
        (assets) => {
          // assets — 普通对象，其中 key 是 asset 的路径名，value 是 asset 的数据，具体的代表请参考 Source。
          for (let pathname in assets) {
            if (!pathname.endsWith(".js")) {
              continue;
            }

            let source = assets[pathname].source();

            let start = `${pathname}-start`;
            let end = `${pathname}-end`;

            source = `
                performance.mark("${start}");
                ${source}
                performance.mark("${end}");
                performance.measure("${pathname}", "${start}", "${end}");
            `;

            assets[pathname] = {
              source: function () {
                return source;
              },
              size: function () {
                return source.length;
              },
            };
          }
        }
      );
    });
  }
}

module.exports = MeasureWebpackPlugin;
