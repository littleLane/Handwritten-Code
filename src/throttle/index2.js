/**
 * 节流函数
 * 基本思路：使用定时器，比如当 scroll 事件刚触发时，打印一个 hello world，然后设置个 1000ms 的定时器，
 * 此后每次触发 scroll 事件触发回调，如果已经存在定时器，则回调不执行方法，直到定时器触发，
 * handler 被清除，然后重新设置定时器。
 * @param {*} fn 
 * @param {*} time 
 */
function throttle(fn, time) {
  let timer;
  return function(...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args)
        clearTimeout(timer)
      }, time)
    }
  }
}