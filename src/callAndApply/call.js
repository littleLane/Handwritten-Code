Function.prototype.call2 = function (ctx) {
  ctx = ctx || window;
  ctx.func = this;

  const args = [...arguments].slice(1);
  const result = ctx.func(...args);
  delete ctx.func;

  return result;
};

Function.prototype.myCall = function (ctx) {
  ctx = Object(ctx) || window;
  ctx.func = this;

  const args = [];

  for (let i = 1, l = arguments.length; i < l; i++) {
    args.push("arguments[" + i + "]");
  }
  console.log("code", "ctx.func(" + args + ")");
  const result = eval("ctx.func(" + args + ")");
  delete ctx.func;

  return result;
};

const obj = { name: 1 };
function aa() {
  console.log(this, this.name);
}
console.log(aa.myCall(1, 1, 2));
