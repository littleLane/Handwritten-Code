// 直接通过 eval 进行调用
// 这里会对 JSON string 进行校验
function jsonParse(jsonString) {
  var rx_one = /^[\],:{}\s]*$/;
  var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
  var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
  var rx_four = /(?:^|:|,)(?:\s*\[)+/g;

  if (
    rx_one.test(
      jsonString
        .replace(rx_two, "@")
        .replace(rx_three, "]")
        .replace(rx_four, "")
    )
  ) {
    return eval("(" + jsonString + ")");
  }
}

module.exports = jsonParse

// 由于 eval() 是一个危险的函数，它执行的代码拥有着执行者的权利。
// 如果用 eval() 运行的字符串代码被恶意方（不怀好意的人）操控修改。
// 甚至您的应用或者网页程序会遭受 XSS 攻击
