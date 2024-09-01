/**
 * 给你一个字符串 s 。请返回 s 中最长的 超赞子字符串 的长度。

「超赞子字符串」需满足满足下述两个条件：

该字符串是 s 的一个非空子字符串
进行任意次数的字符交换后，该字符串可以变成一个回文字符串
 

示例 1：

输入：s = "3242415"
输出：5
解释："24241" 是最长的超赞子字符串，交换其中的字符后，可以得到回文 "24142"
示例 2：

输入：s = "12345678"
输出：1
示例 3：

输入：s = "213123"
输出：6
解释："213123" 是最长的超赞子字符串，交换其中的字符后，可以得到回文 "231132"
示例 4：

输入：s = "00"
输出：2
 

提示：

1 <= s.length <= 10^5
s 仅由数字组成


 * https://leetcode.cn/problems/find-longest-awesome-substring/solutions/466844/bu-bu-di-jin-xiang-xi-fen-xi-by-feikerwu/
 * @param {string} s
 * @return {number}
 */
var longestAwesome = function (s) {
  let prefixSum = 0;
  let map = new Map();
  let res = 1;
  map.set(0, -1);
  for (let i = 0; i < s.length; i++) {
    prefixSum = prefixSum ^ (1 << s[i]);

    // 考虑中间计算为偶数部分
    if (map.has(prefixSum)) {
      res = Math.max(res, i - map.get(prefixSum));
    } else {
      map.set(prefixSum, i);
    }

    // 考虑中间为奇数部分
    for (let j = 0; j < 10; j++) {
      let next = prefixSum ^ (1 << j);
      if (map.has(next)) {
        res = Math.max(res, i - map.get(next));
      }
    }
  }

  return res;
};
