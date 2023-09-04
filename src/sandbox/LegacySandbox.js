class LegacySandbox {
  constructor() {
    // 沙箱期间新增的属性
    this.addedPropsMapInSandbox = {};
    // 沙箱期间更新的全局变量
    this.modifiedPropsOriginalValueMapInSandbox = {};
    // 持续记录更新的(新增和修改的)全局变量的 map，用于在任意时刻做 snapshot
    this.currentUpdatedPropsValueMap = {};

    const rawWindow = window;
    const fakeWindow = Object.create(null);

    this.sandboxRunning = true;

    this.proxy = new Proxy(fakeWindow, {
      set(target, key, value) {
        // 沙箱为非激活状态
        if (!this.sandboxRunning) {
          return true;
        }

        // 激活状态

        // 记录新增属性
        if (!rawWindow.haOwnProperty(key)) {
          this.addedPropsMapInSandbox[key] = value;
        } else if (!this.modifiedPropsOriginalValueMapInSandbox[key]) {
          // 记录变更属性
          this.modifiedPropsOriginalValueMapInSandbox[key] = rawWindow[key];
        }

        // 记录此次修改的属性
        this.currentUpdatedPropsValueMap[key] = value;

        // 将设置的属性和值赋给了当前window，还是污染了全局window变量
        rawWindow[key] = value;

        return true;
      },
      get(target, key) {
        return rawWindow[key];
      },
    });
  }

  active() {
    if (!this.sandboxRunning) {
      // 还原上次的修改值
      for (let key in this.currentUpdatedPropsValueMap) {
        if (this.currentUpdatedPropsValueMap.haOwnProperty(key)) {
          window[key] = this.currentUpdatedPropsValueMap[key];
        }
      }
    }

    this.sandboxRunning = true;
  }

  inactive() {
    if (this.sandboxRunning) {
      // 还原修改值
      for (let key in this.modifiedPropsOriginalValueMapInSandbox) {
        if (this.modifiedPropsOriginalValueMapInSandbox.haOwnProperty(key)) {
          window[key] = this.modifiedPropsOriginalValueMapInSandbox[key];
        }
      }

      // 删除新增属性
      for (let key in this.addedPropsMapInSandbox) {
        if (this.addedPropsMapInSandbox.haOwnProperty(key)) {
          delete window[key];
        }
      }
    }

    this.sandboxRunning = false;
  }
}
