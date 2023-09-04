const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class Promise {
  constructor(excutor) {
    if (typeof excutor !== "function") {
      throw new Error("");
    }

    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;

    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolver = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onFulfilledCallbacks.forEach((fn) => fn());
      }
    };

    const rejecter = (reason) => {
      this.status = REJECTED;
      this.reason = reason;
      this.onRejectedCallbacks.forEach((fn) => fn());
    };

    try {
      excutor(resolver, rejecter);
    } catch (error) {
      rejecter(error);
    }
  }

  then(onFulfilled, onRejected) {
    if (typeof onFulfilled !== "function") {
      onFulfilled = (value) => value;
    }

    if (typeof onRejected !== "function") {
      onRejected = (reason) => {
        throw reason;
      };
    }

    const promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            Promise.promiseResolver(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }

      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            Promise.promiseResolver(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }

      if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              Promise.promiseResolver(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              Promise.promiseResolver(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    });

    return promise2;
  }

  catch(fn) {
    return this.then(undefined, fn);
  }

  finally(fn) {
    const P = this.constructor;

    return this.then(
      (value) => P.resolve(fn()).then(() => value),
      (reason) =>
        P.resolve(fn()).then(() => {
          throw reason;
        })
    );
  }

  done(onFulfilled, onRejected) {
    this.then(onFulfilled, onRejected).catch((reason) => {
      setTimeout(() => {
        throw reason;
      });
    });
  }
}

Promise.resolve = (value) => {
  return new Promise((reslove, reject) => {
    reslove(value);
  });
};

Promise.reject = (reason) => {
  return new Promise((resolve, reject) => {
    reject(reason);
  });
};

Promise.race = (promises) => {
  return new Promise((resolve, reject) => {
    for (let p of promises) {
      if (typeof p === "object" && typeof p.then === "function") {
        p.then(resolve, reject);
      } else {
        resolve(p);
      }
    }
  });
};

Promise.all = (promises) => {
  const result = [];
  const index = 0;

  return new Promise((resolve, reject) => {
    for (let p of promises) {
      Promise.resolve(p).then(
        (res) => {
          result[index] = res;
          index++;

          if (index === promises.length) {
            return resolve(result);
          }
        },
        function (err) {
          return reject(err);
        }
      );
    }
  });
};

Promise.promiseResolver = (promise2, x, resolve, reject) => {
  if (promise2 === x) {
    reject(new Error());
  }

  let called = false;

  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    try {
      const then = x.then;

      if (typeof then === "function") {
        then.call(
          x,
          (value) => {
            if (called) return;
            called = true;
            Promise.promiseResolver(promise2, value, resolve, reject);
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
    resolve(x);
  }
};

Promise.allSettled = (promises) => {
  const result = [];
  let index = 0;

  return new Promise((resolve, reject) => {
    for (let i = 0, l = promises.length; i < l; i++) {
      const p = promises[i];
      if (p && typeof p.then === "function") {
        p.then(
          (data) => {
            result[index] = { status: "fulfilled", value: data };
            index++;

            if (index === promises.length) {
              resolve(result);
            }
          },
          (reason) => {
            result[index] = { status: "rejected", value: reason };
            index++;

            if (index === promises.length) {
              resolve(result);
            }
          }
        );
      } else {
        result[index] = { status: "fulfilled", value: p };
        index++;
        if (index === promises.length) {
          resolve(result);
        }
      }
    }
  });
};

Promise.any = (promises) => {
  const result = [];
  let index = 0;

  return new Promise((resolve, reject) => {
    if (promises == null || promises.length == 0) {
      reject("无效的 any");
    }

    for (let i = 0, l = promises.length; i < l; i++) {
      const p = promises[i];

      if (p && typeof p.then === "function") {
        p.then(
          (value) => {
            resolve(value);
          },
          (reason) => {
            result[index] = reason;
            index++;

            if (index === promises.length) {
              reject(result);
            }
          }
        );
      } else {
        resolve(p);
      }
    }
  });
};
