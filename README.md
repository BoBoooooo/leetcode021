![image.png](https://kmpvt.pfp.ps.netease.com/file/66e5345f7a4c09b4528a9d5aVK0OJNbM01?sign=dNjNbSubY9wWMgZGsV5u0-H_v44=&expire=1726301251&type=image/png)

先接个雨水吧

#【数学题】超级回文数

1. 转 BigInt，从 1 - 100000 构造偶数回文 + 构造奇数回文，再判断平方数是否是回文数，结果转成字符串
2. 最后结果升序排列

#【DFS】计算岛屿最大面积

1. 定义 dfs 函数
   - 越界判断/递归终止条件：`i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] == 0`，返回 0
   - 走过的标记为 0
   - 遍历上下左右四个方向，累加结果
2. 遍历 grid，更新最大面积

#【DFS】二叉树的最大路径和

1. `maxSum = 0` 初始化
2. DFS，后序遍历
   - 遍历到 null 节点，返回 0
   - 计算当前节点的内部最大路径和（经过左右子树的最大和）
   - 更新全局的最大路径和 maxSum
   - 返回当前节点对其父节点能够贡献的最大路径和（只能选择左子树或右子树中的一个），如果小于 0 则返回 0
3. 最终返回 maxSum，即二叉树中的最大路径和

#【双指针】最多能完成排序的块

双指针 sum1, sum2，对排序后的数组和原数组同时按顺序分别累加，两者只要相等一次，就视为找到一个块，最后返回 count

#【双指针】无重复字符的最长子串

1. 滑动窗口，`left = 0, right = 1` 指针，right 指针遍历字符串，left 指针收缩窗口
2. 当前窗口子串包含下一位字符，left 右移，不包含则 right 右移
3. 返回窗口最大长度 `max = Math.max(max, right - left)`

#【哈希表】按位与为零的三元组

用哈希表 map 存储所有二元组按位与的结果与出现次数，再枚举数组 nums 与 map 所有的键，如果二者位与结果为 0 就累计其次数

#【DP】最长有效括号

- dp 定义：记录以坐标 i 结尾的最长有效括号子串长度
- 状态转移方程 `dp[i] = 2 + dp[i-1] + dp[i - dp[i-1] -2]` 【最小单元 ()(()) 】
- 注意判断 `i - dp[i-1] -1` 以及 `i - dp[i-1] -2` 是否越界，越界则表示不存在，直接为 0


#【DP】最长递增子序列

1. 动态规划，`dp[i]` 表示以 nums[i] 结尾的最长递增子序列的长度
2. 初始化 dp 数组，`dp[i] = 1`，`result = 1`；默认最长为 1
3. 遍历 nums，对于每个 nums[i]，遍历 nums[0] - nums[i-1]，如果 `nums[j] < nums[i]`，则 `dp[i] = max(dp[i], dp[j] + 1)`
4. `result = max(result, dp[i])`
5. 返回 result

#【DP 二维】不相交的线 （最长公共子序列）

1. 动态规划，`dp[i][j]` 表示 nums1 前 i 个元素和 nums2 前 j 个元素的最长公共子序列长度
2. 初始化 dp 数组，`dp[i][j] = 0`，长度为 num1 + 1, num2 + 1
3. 两层遍历
   - 遍历条件 `i = 1, i < num1.length, ++i`，`j = 1, j < num2.length, ++j`
   - 如果 `nums1[i - 1] == nums2[j - 1]`，则 `dp[i][j] = dp[i-1][j-1] + 1`
   - 否则 `dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1])` （可能从左边或者上边转移过来）
4. 返回 `dp[num1.length][num2.length]`

#【并查集】按公因数计算最大组件大小

迷之并查集

1.	初始化并查集：unionfind 对象用于存储每个数或因子的根节点。
2.	遍历数组 A：对每个数 num，计算它的所有因子，并将 num 与这些因子“合并”到同一个集合中。
3.	合并操作：union 函数负责将 num 及其因子连在一起。并查集的 find 函数用来查找元素所属的根节点，并带有路径压缩优化。
4.	统计最大连通分量：遍历数组 A，通过 find 找到每个数所属的连通分量的根节点，记录该连通分量的大小，并找出最大的连通分量。

```js
/**
 * @param {number[]} A
 * @return {number}
 */
var largestComponentSize = function(A) {
  // unionfind 用来记录每个数和因子的连通关系
  const unionfind = {};

  // 对数组 A 中的每个数进行因子分解，并将它与其因子加入同一个集合
  for (const num of A) {
    // 对当前数 num 进行因子分解，i 代表因子
    for (let i = 2; i <= Math.sqrt(num); i++) {
      // 如果 i 是 num 的因子，说明 num 可以被 i 整除
      if (num % i === 0) {
        // 将 num 的两个因子 i 和 num / i 以及 num 本身加入同一个集合
        union(i, num / i, num);
      }
    }
  }

  // count 用于统计每个连通分量中的元素个数
  const count = {};
  let res = 0;

  // 遍历数组 A，找到每个数所在的连通分量的根节点，并统计每个分量的大小
  for (const num of A) {
    const p = find(num); // 找到 num 所在连通分量的根节点
    if (!count[p]) {
      count[p] = 0;
    }
    count[p] += 1;  // 统计该连通分量的大小
    res = Math.max(res, count[p]);  // 更新最大连通分量的大小
  }
  return res;  // 返回最大连通分量的大小

  // find 函数用于查找元素 i 所在集合的根节点（带路径压缩）
  function find(i) {
    // 如果 i 不在 unionfind 中，初始化它的根为自己
    if (unionfind[i] === undefined) {
      return (unionfind[i] = i);
    }
    // 如果 i 不是根节点，递归查找它的根，并路径压缩
    return unionfind[i] === i ? i : (unionfind[i] = find(unionfind[i]));
  }

  // union 函数将 x, y, z 三个元素合并到同一个集合
  function union(x, y, z) {
    x = find(x);  // 找到 x 的根节点
    y = find(y);  // 找到 y 的根节点
    z = find(z);  // 找到 z 的根节点
    // 将 x 和 y 的根节点指向 z，将它们合并
    unionfind[x] = unionfind[y] = z;
  }
};

```

#【单调栈】拼接最大数

迷之单调栈，先接个雨水吧

#【链表】按格式合并两个链表

迷之合并

#【位运算】解码异或后的排列

迷之位运算

```js
/**
 * @param {number[]} encoded
 * @return {number[]}
 */
var decode = function(encoded) {
    const x = Array.from({length: encoded.length + 1}, (v, k) => k + 1).reduce((acc, cur) => acc ^ cur);
    const perm = [x, ...new Array(encoded.length)];
    encoded.forEach((v, i) => i % 2 !== 0 && (perm[0] ^= v));
    for (let i = 1; i < perm.length; i++) {
      perm[i] = perm[i - 1] ^ encoded[i - 1];
    }
    return perm;
  };
```

#【状态压缩】最长超赞子字符串
迷之超赞
```js
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
```