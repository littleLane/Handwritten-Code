// Some functions take a variable number of arguments, or a few expected
// arguments at the beginning and then a variable number of values to operate
// on. This helper accumulates all remaining arguments past the function’s
// argument length (or an explicit `startIndex`), into an array that becomes
// the last argument. Similar to ES6’s "rest parameter".
/**
 * 接受一个业务逻辑函数和开始标记，用于裁取函数接受的参数，并执行业务逻辑函数
 * @param {*} func 
 * @param {*} startIndex 
 */
var restArguments = function(func, startIndex) {
  startIndex = startIndex == null ? func.length - 1 : +startIndex;
  return function() {
    var length = Math.max(arguments.length - startIndex, 0),
        rest = Array(length),
        index = 0;
    for (; index < length; index++) {
      rest[index] = arguments[index + startIndex];
    }
    switch (startIndex) {
      case 0: return func.call(this, rest);
      case 1: return func.call(this, arguments[0], rest);
      case 2: return func.call(this, arguments[0], arguments[1], rest);
    }
    var args = Array(startIndex + 1);
    for (index = 0; index < startIndex; index++) {
      args[index] = arguments[index];
    }
    args[startIndex] = rest;
    return func.apply(this, args);
  };
};

/**
 * 函数防抖实现
 * 该函数接受三个参数，和我们上面的实现一样
 * @param {*} func 
 * @param {*} wait 
 * @param {*} immediate 
 */
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
var debounce = function(func, wait, immediate) {
  // timeout 表示定时器
  // result 表示 func 执行返回值
  var timeout, result;

  // 定时器计时结束后
  // 1、清空计时器，使之不影响下次连续事件的触发
  // 2、触发执行 func
  var later = function(context, args) {
    timeout = null;
    // 判断是为了过滤立即触发的
    // 关键在于 _.delay 和 restArguments
    if (args) result = func.apply(context, args);
  };

  // 用于返回实际的业务逻辑函数
  var debounced = restArguments(function(args) {
    // 如果定时器存在就是清除该定时器任务
    if (timeout) clearTimeout(timeout);
    
    // 如果 immediate 为 true 时，
		// 就表示事件触发的第一次就执行回调函数
    if (immediate) {
      // 第一次触发后会设置 timeout，
      // 根据 timeout 是否为空可以判断是否是首次触发
      var callNow = !timeout;
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(this, args);
    } else {
      debugger
    	// 设置定时器任务
      timeout = delay(later, wait, this, args);
    }

    // 返回实际的业务逻辑函数的执行结果
    return result;
  });

  // 手动取消
  // 实际的逻辑就是清除定时器任务
  // 将 timeout 变量置为 null
  debounced.cancel = function() {
    clearTimeout(timeout);
    timeout = null;
  };

  // 返回最终的业务逻辑函数
  return debounced;
};

// Delays a function for the given number of milliseconds, and then calls
// it with the arguments supplied.
// 根据给定的毫秒 wait 延迟执行函数 func
var delay = restArguments(function(func, wait, args) {
  return setTimeout(function() {
    return func.apply(null, args);
  }, wait);
});
