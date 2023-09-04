function limitQueue(promises, limit) {
  let runningIndex = 0;
  let finishedIndex = 0;

  const result = [];

  const l = Math.min(limit, promises.length);

  return new Promise((resolve, reject) => {
    for (let i = 0; i < l; i++) {
      doTask();
    }

    function doTask() {
      let currentIndex = runningIndex;

      if (runningIndex < promises.length) {
        const p = promises[runningIndex]();
        runningIndex++;
        p.then(
          (val) => {
            result[currentIndex] = {
              status: "fulfilled",
              value: val,
            };
          },
          (err) => {
            result[currentIndex] = {
              status: "rejected",
              value: err,
            };
          }
        ).finally(() => {
          finishedIndex++;
          if (finishedIndex < promises.length) {
            doTask();
          } else {
            // 全部执行完毕
            resolve(result);
          }
        });
      }
    }
  });
}

const fn = (t) => () => {
  // 用setTimeout模拟异步请求
  return new Promise((resolve, react) => {
    setTimeout(() => {
      console.log("任务完成", t, new Date());
      resolve({ t, date: new Date() });
    }, Math.random() * 1000);
  });
};

let arr = [1, 1, 1, 2, 2, 2, 3, 3, 3];

limitQueue(arr.map(fn), 2).then(console.log);
