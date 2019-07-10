/**
 * 通过时间戳的方式实现节流函数
 * 基本思路：利用闭包函数特性，用时间戳来判断是否已到执行时间，记录上次执行的时间戳，然后每次触发事件执行回调，
 * 回调中判断当前时间戳距离上次执行时间戳的间隔是否已经达到时间差（Xms） ，
 * 如果是则执行，并更新上次执行的时间戳，如此循环。
 * @param {*} fn 
 * @param {*} time 
 */
function throttle(fn, time) {
  let prevTime = 0

  return function(...args) {
    const currentTime = Date.now()

    if (currentTime - prevTime >= time) {
      prevTime = currentTime
      fn.apply(this, args)
    }
  }
}
