function Promise(excutor) {
  // Promise 构造函数接受的不是一个函数就会报错
  if (typeof excutor !== "function") {
    throw TypeError(`Promise resolver ${excutor} is not a function`);
  }

  // 一个 Promise 会存在三个状态：pending、fulfilled、rejected
  const PENDING = "pending";
  const FULFILLED = "fulfilled";
  const REJECTED = "rejected";

  this.status = PENDING;
  this.value = undefined;
  this.reason = undefined;
  this.onFulfilledCallbacks = [];
  this.onRejectedCallbacks = [];

  // 成功后的操作，只能是在状态为 pending 时可以执行
  // 执行后，状态由 pending 变成 fulfilled
  const resolve = (val) => {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = val;
      this.onFulfilledCallbacks.forEach((fn) => fn());
    }
  };

  // 失败后的操作，只能是在状态为 pending 时可以执行
  // 执行后，状态由 pending 变成 rejected
  const reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;
      this.onRejectedCallbacks.forEach((fn) => fn());
    }
  };

  try {
    // Promise 构造函数接受的函数参数可以接受 resolve 和 reject 两个函数参数
    excutor(resolve, reject);
  } catch (error) {
    reject(error);
  }

  // then 方法可接受 onFulfilled 和 onRejected 两个可选函数参数
  this.then = (onFulfilled, onRejected) => {
    // 当 onFulfilled 不是函数时，将其修正为函数，并返回值
    if (typeof onFulfilled !== "function") {
      onFulfilled = (val) => val;
    }

    // 当 onRejected 不是函数时，将其修正为函数，并抛出异常
    if (typeof onRejected !== "function") {
      onRejected = (reason) => {
        throw reason;
      };
    }

    return new Promise((reslove, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            if (x?.then) {
              x.then(reslove, reject);
            } else {
              reslove(x);
            }
          } catch (error) {
            reject(error);
          }
        });
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            if (x?.then) {
              x.then(reslove, reject);
            } else {
              reslove(x);
            }
          } catch (error) {
            reject(error);
          }
        });
      } else {
        this.onFulfilledCallbacks(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              if (x?.then) {
                x.then(reslove, reject);
              } else {
                reslove(x);
              }
            } catch (error) {
              reject(error);
            }
          });
        });

        this.onRejectedCallbacks(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              if (x?.then) {
                x.then(reslove, reject);
              } else {
                reslove(x);
              }
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    });

    const promise2 = new Promise((resolve, reject) => {
      // 当前状态呢为 FULFILLED 执行 onFulfilled，并传入值
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            Promise.promiseResolve(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }

      // 当前状态呢为 REJECTED 执行 onRejected，并传入值
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            Promise.promiseResolve(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }

      // 构造函数逻辑本身有异步
      if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              Promise.promiseResolve(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              Promise.promiseResolve(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    });

    return promise2;
  };

  this.catch = (fn) => {
    return this.then(null, fn);
  };

  this.finally = (fn) => {
    return this.then(
      (val) => this.resolve(fn()).then(() => val),
      (reason) =>
        this.resolve(fn()).then(() => {
          throw reason;
        })
    );
  };
}

Promise.promiseResolve = function (promise2, x, resolve, reject) {
  // 防止链式调用
  if (promise2 === x) {
    reject(new TypeError("Chaining cycle detected for promise #<Promise>"));
  }

  let called = false;

  if (x instanceof Promise) {
    // 返回的是 promise
    x.then(
      (value) => {
        if (called) return;
        called = true;
        Promise.promiseResolve(promise2, value, resolve, reject);
      },
      (reason) => {
        if (called) return;
        called = true;
        reject(reason);
      }
    );
  } else if (x !== null && (typeof x === "object" || typeof x === "function")) {
    // 返回的是对象或者函数
    try {
      const then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (value) => {
            if (called) return;
            called = true;
            Promise.promiseResolve(promise2, value, resolve, reject);
          },
          (reason) => {
            if (called) return;
            called = true;
            reject(reason);
          }
        );
      } else {
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    // 返回的是基本类型的值
    resolve(x);
  }
};

Promise.resolve = function (val) {
  return new Promise((resolve, reject) => {
    resolve(val);
  });
};

Promise.reject = function (val) {
  return new Promise((resolve, reject) => {
    reject(val);
  });
};

Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((p) => p.then(resolve, reject));
  });
};

Promise.all = function (promises) {
  const result = [];

  return new Promise((resolve, reject) => {
    const processData = function (data, index) {
      result[index] = data;

      if (index === promises.length - 1) {
        resolve(result);
      }
    };

    promises.forEach((p, index) =>
      p.then((res) => {
        processData(res, index);
      }, reject)
    );
  });
};

// Promise A+ 规范测试代码
Promise.defer = Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};

module.exports = Promise;
