## 题目分析

拿一个案例来分析吧：

```
输入: [7,1,5,3,6,4]
输出: 7
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
    随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。
```

关于这道题，要想解答出来我们首先需要搞清楚规则：

买股票想要获取最大利润，那么我们首先需要先检查数组中第一个数字，也就是说第一天的价格是 7，第二天价格是 1，很明显我们不会在最贵的时候买入股票。

所以我们最开始在第二天买，也就是价格等于 1 的时候（也就是 prices[i + 1] > prices[i]）买，第三天价格变成了 5，说明有钱赚了，那么就马上卖掉。这时候利润就是 5 - 1 = 4

然后我们在第四天价格等于 3 的时候（满足 prices[i + 1] > prices[i]）买股票，第五天价格等于6，有钱赚，那么就马上卖掉即可。这时候利润就是 6 - 3 = 3

所以最后总利润就是 4 + 3 = 7