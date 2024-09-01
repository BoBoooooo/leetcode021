/**
 * https://leetcode.cn/problems/longest-valid-parentheses/
 * 动态规划
 * dp 定义：记录以坐标 i 结尾的最长有效括号子串长度
 * 状态转移方程 dp[i] = 2 + dp[i-1] + dp[i - dp[i-1] -2]  【最小单元 ()(()) 】
 * 注意判断 i - dp[i-1] -1 以及 i - dp[i-1] -2 是否越界，越界则表示不存在，直接为 0
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
  let max = 0;
  let dp = new Array(s.length).fill(0);
  for (let i = 1; i < s.length; i++) {
    let curr = s.charAt(i);
    if (curr === ")") {
      if (i - dp[i - 1] > 0 && s.charAt(i - dp[i - 1] - 1) === "(") {
        dp[i] =
          2 + dp[i - 1] + (i - dp[i - 1] - 2 > -1 ? dp[i - dp[i - 1] - 2] : 0);
      }
      max = Math.max(dp[i], max);
    }
  }
  return max;
};
