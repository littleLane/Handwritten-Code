## XSS（Cross-Site Scripting）

### 定义

为了避免和层叠样式表（Cascading Style Sheets）重名，所以改称为 XSS (X一般有未知的含义，还有扩展的含义)。

- 发生在客户端页面
- 黑客往页面注入恶意脚本
- 当用户访问时获取到包含恶意脚本的网页
- 通过恶意代码，黑客可以获取和控制用户信息（窃取用户隐私、钓鱼欺诈、窃取密码、转播恶意代码等）
- 主要用到的技术为 HTML 和 Javascript，也包括 VBScript 和 ActionScript 等
- 对 web 服务器无直接危害，但它会借助网站进行传播，使网站的使用用户受到攻击，导致网站用户帐号被窃取，从而对网站也产生了较严重的危害。

![XSS攻击](./static/xss.jpeg)

### 攻击方式

1、反射型（非持久性或非存储性）

当前端向后台发送请求时，XSS 恶意代码可能会 `出现在 URL 参数` ，作为输入提交到服务器。`服务器在解析后并响应请求` ，XSS 代码会随着响应内容一起传回到浏览器，最后 `在浏览器端解析并得到执行` 。这个请求、响应的过程像极了一次反射过程，所以被称为反射型 XSS。

- 是一次性的，必须要通过用户点击链接发起
- 一些浏览器内置了 XSS 过滤器，会防止大部分反射型 XSS 攻击
- 服务器没有对用户的恶意输入进行安全处理就响应到页面上，最终导致恶意代码在页面执行
- 一般是攻击者通过邮件，聊天软件等等方式发送攻击 URL，然后通过用户点击来达到攻击

![反射型XSS](./static/反射型XSS.jpeg)

2、存储型（持久性）

黑客将恶意代码存储到漏洞服务器中，当用户访问相关页面是发起攻击，这种方式和反射型（非持久性）XSS 攻击的区别仅限于此。

- 黑客将恶意代码上传并存储于漏洞服务器（web server）
- 服务器将恶意代码保存到服务器
- 当正常用户访问服务器时，服务器会直接读取恶意数据并直接使用
- 服务器会返回含有恶意脚本的页面或恶意数据
- 攻击者一般是通过网站的留言、评论、博客、日志等等功能（所有能够向 web server 输入内容的地方），将攻击代码存储到 web server 上
  
![存储性xss](./static/存储性xss.jpeg)

3、DOM 型

DOM 型 XSS 与反射型 XSS 漏洞大同小异，但是区别在于反射型 XSS 会将语句存储于后端再出现在前端页面，而 DOM 型 XSS 漏洞会直接将语句存储于前端。
  
##### 两种方式的比较
  
|  类型  | 持久性            |   触发时机  | 危害     | 数据存储    |    谁来输出    |        输出位置    |
|-------|:----------------:|:----------:|:--------:|:---------:|:-------------:|------------------|
| 反射型 |非持久             |用户交互     |  较小    |  URL       | 后端 WEB 应用程序|    HTTP 响应     |
| 存储型 |持久化（存储在服务器）|不需要用户交互| 更大    |  数据库    | 后端 WEB 应用程序|  HTTP 响应        |
| DOM 型 | 非持久          |用户交互   | 较小 |  较小  |  DOM      | 前端 JavaScript|  动态构造的 DOM 节点|

### 攻击防御

可以通过以下几个方面进行防御操作：

> - 编码：显示转义编码
> - 过滤：过滤或移除输入的 DOM 事件处理函数、特殊的节点（能引入额外的内容节点，如 style、script、iframe 等）
> - 校正：避免直接对 HTML Entity 解码，而是使用 DOM parse 转换、校正不配对的 DOM 标签

1、 给 cookie 设置 httpOnly 属性，使脚本无法读取 Cookie

在前端 Cookie 都是从 document 对象中获取的，现代浏览器在设置 Cookie 时一般可以接受 httpOnly 名称的参数，和 domain 等其他属性一样。一旦设置了 httpOnly，就无法在浏览器通过 document 对象来获取 Cookie 了。此时浏览器访问页面并不会受到影响，因为 Cookie 会被放在浏览器请求头中发送出去。应用程序一般也不会在 js 中操作这些敏感 Cookie，对于一些敏感的 Cookie 我们可以采用 HttpOnly，对于那些需要通过 js 操作的 cookie 我们就不予设置，这样不仅保障了 Cookie 信息的安全也保证了可应用性。

2、不仅要验证数据的类型，还要验证其格式、长度、范围和内容

3、对输入和 URL 参数进行过滤，对输出进行编码

首先，不要信任用户的输入。将输入、输出中的引号、尖括号、斜杠等特殊字符进行转义。转义功能函数代码如下：

```javascript
function escape(str) {
  str = str.replace(/&/g, '&amp;')
  str = str.replace(/</g, '&lt;')
  str = str.replace(/>/g, '&gt;')
  str = str.replace(/"/g, '&quto;')
  str = str.replace(/'/g, '&#39;')
  str = str.replace(/`/g, '&#96;')
  str = str.replace(/\//g, '&#x2F;')
  return str
}
```

通过上面方法的转义，我们之前 XSS 攻击代码就会变成：

```
escape('<script>alert(1)</script>')
// ==> &lt;script&gt;alert(1)&lt;&#x2F;script&gt;
```

上面的转义方法对转义普通的非富文本内容是比较好的，但是对富文本来说就不行了。因为富文本是包含格式的，如果调用这个转义方法就会把原本的格式也过滤掉。但是，对于这种情况，我们可以换用黑、白名单的形式对特殊标签进行过滤处理，但是由于富文本包含的标签很多，所以采用白名单形式进行过滤会更好。

```javascript
const xss = require('xss')
let html = xss('<h1 id="title">XSS Demo</h1><script>alert("xss");</script>')
console.log(html)
// ==> <h1>XSS Demo</h1>&lt;script&gt;alert("xss");&lt;/script&gt;
```

上面示例中，使用了 js-xss 来实现，可以看到在输出中保留了 h1 标签且过滤了 script 标签。

4、在发布应用程序之前测试所有已知的威胁

## 拓展

### 1、X-XSS-Protection

#### 报错解析

在 src/xss/reflect_xss/index.js 文件中，我们通过 express 构建了一个反射型 XSS 工具的案例，其中默认是没有设置 X-XSS-Protection 头信息的，但是在启动服务后，在浏览器访问我们给出的含有 XSS 脚本的链接，浏览器会阻止含 XSS 脚本加载并提示如下错误信息：

```
The XSS Auditor refused to execute a script in 'http://localhost:3000/list?category=%3Cscript%3Ealert(1)%3C/script%3E' because its source code was found within the request. The auditor was enabled as the server did not send an 'X-XSS-Protection' header.
```

提示信息大致意思是说：通过访问这个链接获取的页面执行的脚本包含 XSS 攻击脚本，因为服务端没有设置 `X-XSS-Protection` 头，浏览器过滤器会默认开启，过滤掉 XSS 恶意脚本执行。

#### 作用

`HTTP X-XSS-Protection` 响应头是 `Internet Explorer`、`Chrome` 和 `Safari` 的一个功能，当检测到跨站脚本攻击（XSS）时，浏览器将停止加载页面。虽然这些保护在现代浏览器中基本上是不必要的，但是当网站实施一个强大的 `Content-Security-Policy` 来禁用内联的 `JavaScript（'unsafe-inline'）` 时，他们仍然可以为尚不支持 CSP 的旧版浏览器的用户提供保护。

#### 语法

```javascript
// 禁止 XSS 过滤
X-XSS-Protection: 0

// 浏览器默认设置，启用 XSS 过滤。如果检测到跨站脚本攻击，浏览器将清除页面，即删除不安全的部分。
X-XSS-Protection: 1

// 启用 XSS 过滤。如果检测到攻击，浏览器将不会清除页面，而是阻止页面加载。
X-XSS-Protection: 1; mode=block

// 启用 XSS 过滤。 如果检测到跨站脚本攻击，浏览器将清除页面并使用 CSP report-uri 指令的功能发送违规报告。
X-XSS-Protection: 1; report=<reporting-uri>
```
