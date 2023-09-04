function iter(obj, callback) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      callback(key, obj[key]);
    }
  }
}

class SnapshotSandbox {
  constructor() {
    this.proxy = window;
    this.modifyPropsMap = {};
  }

  active() {
    this.windowSnapshot = {};

    iter(window, (key, val) => {
      this.windowSnapshot[key] = val;
    });

    Object.keys(this.modifyPropsMap, (key) => {
      window[key] = this.modifyPropsMap[key];
    });
  }

  inactive() {
    iter(window, (key, val) => {
      if (
        Object.getOwnPropertyDescriptor(window, key).set &&
        this.modifyPropsMap[key] !== val
      ) {
        this.modifyPropsMap[key] = val;
        window[key] = this.windowSnapshot[key];
      }
    });
  }
}

const sandbox = new SnapshotSandbox();
((window) => {
  // 激活沙箱
  sandbox.active();
  window.sex = "男";
  window.age = "22";
  console.log(window.sex, window.age);
  // 退出沙箱
  sandbox.inactive();
  console.log(window.sex, window.age);
  // 激活沙箱
  sandbox.active();
  console.log(window.sex, window.age);
})(sandbox.proxy);
