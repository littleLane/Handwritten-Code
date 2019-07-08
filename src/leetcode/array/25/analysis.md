## 题目分析

这个题意思很明确，就是给出一个数组，数组中只有一个元素出现了一次，其他元素都出现了两次，最后就是找出这个只出现一次的元素。最后，也有多种解法：

> 1、遍历数组，查看元素的 indexOf 和 lastIndexOf 是否相等，相等就直接返回对应角标的元素，否则继续遍历

注意：这里不能用当前角标 i 和 lastIndexOf 做比较，因为有可能碰到类似 `[2, 2, 1]` 的情况，当遍历到第二个 2 时，当前的角标和 lastIndexOf 相等了，就有问题了。

> 2、利用 `异或位运算`，异或位运算的特性是：只有当两位不同为 1 或 0 时，结果才为 1。

```javascript
1 ^ 0 = 1
1 ^ 1 = 0
0 ^ 0 = 0
0 ^ 1 = 1
```
也就是当两个相等的数异或时，结果是 0。0 和 任何数异或结果是那个任意数。
