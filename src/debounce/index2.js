/**
 * 在前一个例子的基础上实现第一次触发回调事件就执行 fn
 * @param {*} fn 
 * @param {*} delay 
 * @param {*} immediate 
 */
function debounce(fn, delay, immediate) {
  let timer

  return function(...args) {
    if (timer) {
      clearTimeout(timer)
    }

    if (immediate) {
      fn.apply(this, args)
    }

    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}