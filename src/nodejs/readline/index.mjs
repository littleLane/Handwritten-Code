import readline from "readline";

// export interface ReadLineOptions {
//   // 监听的可读流
//   input: NodeJS.ReadableStream;
//   // 写入 readline 的可写流
//   output?: NodeJS.WritableStream | undefined;
//   // 用于 Tab 自动补全的可选函数
//   completer?: Completer | AsyncCompleter | undefined;
//   // 如果希望 input 和 output 流像 TTY 一样对待，那么传递参数 true
//   terminal?: boolean | undefined;
//   history?: string[] | undefined;
//   // 保留行历史纪录最大值
//   historySize?: number | undefined;
//   prompt?: string | undefined;
//   crlfDelay?: number | undefined;
//   removeHistoryDuplicates?: boolean | undefined;
//   escapeCodeTimeout?: number | undefined;
//   tabSize?: number | undefined;
// }

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  // 等价下面的 setPrompt
  //   prompt: "> 请输入",
});

process.stdout.write("qianzhi");

// 设置输入提示
rl.setPrompt("> 请输入 \n");
// 以输入提示的方式进行调用
rl.prompt();

rl.on("line", console.log);
