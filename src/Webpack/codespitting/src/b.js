// src/b.js
import("./utils").then((data) => {
  console.log(data);
});
const b = "b模块";
export default b;
