Function.prototype.call2 = function(ctx) {
  ctx.func = this

  const args = [...arguments].slice(1)
  const result = ctx.func(...args)
  delete ctx.func

  return result
}
