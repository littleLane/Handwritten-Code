// 定义 promise 的三种状态
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class Promise {
  constructor(excutor) {

    if (typeof excutor !== 'function') {
      throw TypeError(`Promise resolver ${excutor} is not a function`)
    }

    // promise 当前所处的状态
    // 只能由 pendding 到 fulfilled 或者 rejected，而且是一次性的
    this.status = PENDING

    // 终值，指 promise 被解决时传递给解决回调的值，
    // 由于 promise 一次性的特性，该值传递时标志着 promise 由等待状态变成成功状态
    this.value = undefined

    // 据因，指 promise 被拒绝的原因
    // 由于 promise 一次性的特性，该值传递时标志着 promise 由等待状态变成拒绝状态
    this.reason = undefined

    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    const resolver = value => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        this.onFulfilledCallbacks.forEach(fn => fn())
      }
    }

    const rejecter = reason => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }

    // 构造函数执行出错时，就调用 rejecter
    try {
      excutor(resolver, rejecter)
    } catch (err) {
      rejecter(err)
    }
  }

  // 用于访问 promise 的当前值、终值和据因
  // 会接受至多两个可选参数
  then(onFulfilled, onRejected) {
    // 修正 onFulfilled 的值
    if (typeof onFulfilled !== 'function') {
      onFulfilled = value => value
    }

    // 修正 onRejected 的值
    if (typeof onRejected !== 'function') {
      onRejected = reason => {
        throw reason
      }
    }

    // 当 then 函数执行完后，这个 promise 就结束了
    // 为了实现链式调用，then 必须可以返回一个新的 promise
    const promise2 = new Promise((reslove, reject) => {
      // 当前状态为 fulfilled 时异步调用 onFulfilled
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value)
            Promise.promiseResolver(promise2, x, reslove, reject)
          } catch (err) {
            reject(err)
          }
        })
      }

      // 当前状态为 rejected 时异步调用 onRejected
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            Promise.promiseResolver(promise2, x, reslove, reject)
          } catch (err) {
            reject(err)
          }
        })
      }

      // 当链式调用时，当前状态为 pending，就将 onFulfilled 和 onRejected 分别加入对应的回调函数数组
      if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value)
              Promise.promiseResolver(promise2, x, reslove, reject)
            } catch (err) {
              reject(err)
            }
          })
        })

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason)
              Promise.promiseResolver(promise2, x, reslove, reject)
            } catch (err) {
              reject(err)
            }
          })
        })
      }
    })

    return promise2
  }

  catch(fn) {
    return this.then(undefined, fn)
  }

  finally(fn) {
    const P = this.constructor
    
    return this.then(
      value => P.resolve(fn()).then(() => value),
      reason => P.resolve(fn()).then(() => {
        throw reason
      })
    )
  }

  done(onFulfilled, onRejected) {
    this
      .then(onFulfilled, onRejected)
      .catch(reason => {
        setTimeout(() => {
          throw reason
        })
      })
  }
}

Promise.resolve = value => {
  return new Promise((reslove, reject) => {
    reslove(value)
  })
}

Promise.reject = reason => {
  return new Promise((reslove, reject) => {
    reject(reason)
  })
}

Promise.race = promises => {
  return new Promise((reslove, reject) => {
    promises.forEach(fn => fn(reslove, reject))
  })
}

Promise.all = promises => {
  let index = 0
  const result = []
  return new Promise((reslove, reject) => {
    const processData = (data, index) => {
      result[index] = data

      if (index === promises.length - 1) {
        reslove(result)
      }
    }

    promises.forEach((p, index) => p.then(res => {
      processData(res, index)
    }, reject))
  })
}

// 一个链式调用和各库兼容性处理的函数
Promise.promiseResolver = (promise2, x, reslove, reject) => {
  // 防止循环引用
  if (promise2 === x) {
    console.log(new TypeError('Chaining cycle detected for promise #<Promise>'))
    reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }

  // 标识该方法是否已经被调用
  let called = false

  // 当 x 不为 null，且类型为对象或者函数
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      const then = x.then

      // thenable 函数，直接调用 then 函数
      if (typeof then === 'function') {
        then.call(x, value => {
          if (called) return
          called = true
          Promise.promiseResolver(promise2, value, reslove, reject)
        }, reason => {
          if (called) return
          called = true
          reject(reason)
        })
      } else {
        reslove(x)
      }
    } catch (err) {
      if (called) return
      called = true
      reject(err)
    }
  } else {
    reslove(x)
  }
}

// Promise A+ 规范测试代码
Promise.defer = Promise.deferred = function () {
  let dfd = {}
  dfd.promise = new Promise((resolve,reject)=>{
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
}

module.exports = Promise
