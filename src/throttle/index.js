/**
 * 加强版的节流函数
 * 主要解决的问题是如果用户的操作非常频繁，不等设置的延迟时间结束就进行下次操作，
 * 会频繁的清除计时器并重新生成，所以函数 fn 一直都没办法执行，导致用户操作迟迟得不到响应。
 * 
 * 新增逻辑在于当前触发时间和上次触发的时间差小于时间间隔时，设立一个新的定时器，
 * 相当于把 debounce 代码放在了小于时间间隔部分。
 * @param {*} fn 
 * @param {*} delay 
 */
function throttle(fn, delay) {
  let previous = 0
  let timer

  return function(...args) {
    const nowTime = Date.now()

    if (nowTime - previous < delay) {
      if (timer) {
        clearTimeout(timer)
      }

      timer = setTimeout(() => {
        previous = nowTime
        fn.apply(this, args)
      }, delay)
    } else {
      previous = nowTime
      fn.apply(this, args)
    }
  }
}