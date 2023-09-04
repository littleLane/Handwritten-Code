import { getMes } from "./b.js";
console.log("我是 a 文件");
export function say() {
  const message = getMes();
  console.log(message);
}
