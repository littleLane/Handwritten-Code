// src/a.js
import("./utils").then((data) => {
  console.log(data);
});
import("./b").then((data) => {
  console.log(data);
});
const a = "a模块";
export default a;
