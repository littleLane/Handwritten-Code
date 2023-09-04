import { say } from "./a.js";

const object = {
  name: "《React进阶实践指南》",
  author: "我不是外星人",
};
console.log("我是 b 文件");

export function getMes() {
  return object;
}
