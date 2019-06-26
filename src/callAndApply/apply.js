Function.prototype.apply2 = function(ctx) {
  ctx.func = this

  let result

  if (arguments[1]) {
    result = ctx.func(...arguments[1])
  } else {
    result = ctx.func()
  }

  delete ctx.func

  return result
}
