/**
 * 实现一个LazyMan，可以按照以下方式调用:
    LazyMan(“Hank”)输出:
    Hi! This is Hank!

    LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
    Hi! This is Hank!
    //等待10秒..
    Wake up after 10
    Eat dinner~

    LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出
    Hi This is Hank!
    Eat dinner~
    Eat supper~

    LazyMan(“Hank”).sleepFirst(5).eat(“supper”)输出
    //等待5秒
    Wake up after 5
    Hi This is Hank!
    Eat supper
 * @param {*} name 
 */
function LazyMan(name) {
  return new LazyClass(name);
}

class LazyClass {
  constructor(name) {
    this.tasks = [];

    this.tasks.push(() => {
      console.log(`Hello I'm ${name}`);
      this.next();
    });

    // 这里 this.tasks 的第一个任务是上面的任务，如果同步执行就只会执行上面的任务，后面的所有任务都不会执行到
    // 由于 setTimeout 的特性，会在下一轮 event loop 时执行，所以这里的 this.next 是在所有任务排入 this.task 后执行的
    // 此时任务队列是业务逻辑的任务队列
    // 等待所有任务入队后执行任务
    setTimeout(() => {
      this.next();
    }, 0);
  }

  sleep(time) {
    this.tasks.push(() => {
      console.log(`Sleeping ${time}`);
      setTimeout(() => {
        console.log(`Wake up after ${time}`);
        this.next();
      }, time);
    });
    return this;
  }

  sleepFirst(time) {
    this.tasks.unshift(() => {
      console.log(`Sleeping ${time}`);
      setTimeout(() => {
        console.log(`Wake up after ${time}`);
        this.next();
      }, time);
    });
    return this;
  }

  eat(something) {
    this.tasks.push(() => {
      console.log("Eat " + something);
      this.next();
    });
    return this;
  }

  next() {
    const task = this.tasks.shift();
    task && task();
  }
}

LazyMan("Joe").sleepFirst(3000).eat("breakfast").sleep(1000).eat("dinner");
