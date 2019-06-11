## eval

eval 会接受字符串参数，解析其中的 js 代码。如果编译失败，会抛出异常，否则执行其中的代码，计算返回值。

```javascript
eval('2+2') // 4
eval('console.log("ok")') // ok

var jsonStr = '{ "age": 20, "name": "jack" }';
eval('(' + jsonStr + ')');
// {age: 20, name: "jack"}
```

> 在转换对象是为什么加括号？因为在 js 中 `{}` 通常表示一个语句块，eval 表达式只会计算语句块内的值并进行返回。加上括号后就变成一个整体的表达式了。

```javascript
eval('{}')  // undefined
eval('({})')  // {}
```

eval 会改变作用域，当我们执行一些定义变量、方法或者对变量重新赋值的语句时。

```javascript
var s = 1;
function a() {
  // 这里的 eval 表达式会在函数内定义 s 变量，改变函数原有的访问 s 变量的形式
  eval('var s=2');
  console.log(s);
}

a();                // 2
console.log(s);     // 1
```

在局部环境执行 eval 会创建局部变量，但是可以通过指定 eval 的调用者来改变上下文环境

```javascript
var s = 'global';
function a() {
  eval('var s = "local"');
  console.log(s);                 // local
  console.log(eval('s'));         // local
  console.log(window.eval('s'));  // global
}

a();
```

## Function

1、函数定义

基本格式：`var func = new Function(arg1, arg2, ..., functionBody);`

```javascript
var add = new Function('a', 'b', 'return a + b;');
console.log(add(2, 3));    // 5
```

2、JSON 转换

```javascript
function jsonParse(JsonString) {
  return (new Function(`return ${JsonString}`))()
}
```

## 总结

eval 和 Function 都有动态编译 js 代码的作用，但是不推荐使用。在一些特殊的场景还是可以实现功能的，比如编译模板、模板解析等等
