Function.prototype.apply2 = function (ctx) {
  ctx.func = this;

  let result;

  if (arguments[1]) {
    result = ctx.func(...arguments[1]);
  } else {
    result = ctx.func();
  }

  delete ctx.func;

  return result;
};

Function.prototype.apply3 = function (ctx) {
  ctx = ctx || window;
  ctx.fn = this;

  let result;

  if (arguments[1]) {
    const args = [];
    for (let i = 0, l = arguments[1].length; i < l; i++) {
      args.push(arguments[1] + "[" + i + "]");
    }
    result = eval("ctx.fn(" + args + ")");
  } else {
    result = ctx.fn();
  }

  delete ctx.fn;

  return result;
};
