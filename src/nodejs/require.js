/**
 *
 * @param {*} id 路径标识符
 * @returns
 */
function require(id) {
  // 在缓存上查到对应的路径有没有已加载的对象
  const cacheModule = Module.cache[id];

  // 有缓存就直接返回 exports 对象
  if (cacheModule) {
    return cacheModule.exports;
  }

  // 为当前模块创建 module 对象
  const module = {
    exports: {},
    loaded: false,
  };

  // 将对象根据路径标识添加到缓存
  Module.cache[id] = module;

  // 加载文件
  runInThisContext(wrapper('module.exports = "123"'))(
    module.exports,
    require,
    module,
    __filename,
    __dirname
  );

  // 标识加载已完成
  module.loaded = true;

  // 返回值
  return module.exports;
}
