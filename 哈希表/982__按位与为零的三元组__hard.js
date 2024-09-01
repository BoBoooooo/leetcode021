/**
 * 
 * 
 * 给你一个整数数组 nums ，返回其中 按位与三元组 的数目。

按位与三元组 是由下标 (i, j, k) 组成的三元组，并满足下述全部条件：

0 <= i < nums.length
0 <= j < nums.length
0 <= k < nums.length
nums[i] & nums[j] & nums[k] == 0 ，其中 & 表示按位与运算符。
 
示例 1：

输入：nums = [2,1,3]
输出：12
解释：可以选出如下 i, j, k 三元组：
(i=0, j=0, k=1) : 2 & 2 & 1
(i=0, j=1, k=0) : 2 & 1 & 2
(i=0, j=1, k=1) : 2 & 1 & 1
(i=0, j=1, k=2) : 2 & 1 & 3
(i=0, j=2, k=1) : 2 & 3 & 1
(i=1, j=0, k=0) : 1 & 2 & 2
(i=1, j=0, k=1) : 1 & 2 & 1
(i=1, j=0, k=2) : 1 & 2 & 3
(i=1, j=1, k=0) : 1 & 1 & 2
(i=1, j=2, k=0) : 1 & 3 & 2
(i=2, j=0, k=1) : 3 & 2 & 1
(i=2, j=1, k=0) : 3 & 1 & 2
示例 2：

输入：nums = [0,0,0]
输出：27
 
 * 哈希表
 * 先用哈希表 map 存储所有二元组按位与的结果与出现次数，再枚举数组 nums 与 map 所有的键，如果二者位与结果为 0 就累计其次数
 * @param {number[]} nums
 * @return {number}
 */
var countTriplets = function (nums) {
  let ans = 0;
  let map = new Map();
  for (const x of nums) {
    for (const y of nums) {
      let z = x & y;
      map.set(z, (map.get(z) || 0) + 1);
    }
  }

  for (const x of nums) {
    for (const [y, c] of map) {
      if (!(x & y)) {
        ans += c;
      }
    }
  }
  return ans;
};
