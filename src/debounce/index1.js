/**
 * 函数防抖
 * 实现原理就是利用定时器，
 * 函数第一次执行时设定一个定时器，之后调用时发现已经设定过定时器就清空之前的定时器，
 * 并重新设定一个新的定时器，如果存在没有被清空的定时器，当定时器计时结束后触发函数执行。
 * @param {*} fn 
 * @param {*} delay 
 */
function debounce(fn, delay) {
  let timer

  return function(...args) {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
