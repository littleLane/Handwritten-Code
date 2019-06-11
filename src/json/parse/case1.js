// 直接通过 eval 进行调用
function jsonParse(jsonString) {
  return eval(`(${jsonString})`)
}

module.exports = jsonParse

// 由于 eval() 是一个危险的函数，它执行的代码拥有着执行者的权利。
// 如果用 eval() 运行的字符串代码被恶意方（不怀好意的人）操控修改。
// 甚至您的应用或者网页程序会遭受 XSS 攻击
