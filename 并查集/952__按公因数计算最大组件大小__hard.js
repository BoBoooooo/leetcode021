/**
 * 952. 按公因数计算最大组件大小
给定一个由不同正整数的组成的非空数组 nums ，考虑下面的图：

有 nums.length 个节点，按从 nums[0] 到 nums[nums.length - 1] 标记；
只有当 nums[i] 和 nums[j] 共用一个大于 1 的公因数时，nums[i] 和 nums[j]之间才有一条边。
返回 图中最大连通组件的大小 。




解法：并查集

方法一：并查集
为了得到数组 nums 中的每个数和哪些数属于同一个组件，需要得到数组 nums 中的最大值 m，对于每个不超过 m 的正整数 num 计算 num 和哪些数属于同一个组件。对于范围 [2, 
num
​
 ] 内的每个正整数 i，如果 i 是 num 的因数，则 num 和 i、 
i
num
​
  都属于同一个组件。

可以使用并查集实现组件的计算。初始时，每个数分别属于不同的组件。如果两个正整数满足其中一个正整数是另一个正整数的因数，则这两个正整数属于同一个组件，将这两个正整数的组件合并。

当所有不超过 m 的正整数都完成合并操作之后。遍历数组 nums，对于每个数得到其所在的组件并更新该组件的大小，遍历结束之后即可得到最大组件的大小。

作者：力扣官方题解
链接：https://leetcode.cn/problems/largest-component-size-by-common-factor/solutions/1706239/an-gong-yin-shu-ji-suan-zui-da-zu-jian-d-amdx/
来源：力扣（LeetCode）

 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var largestComponentSize = function(nums) {
    const m = _.max(nums);;
    const uf = new UnionFind(m + 1);
    for (const num of nums) {
        for (let i = 2; i * i <= num; i++) {
            if (num % i === 0) {
                uf.union(num, i);
                uf.union(num, Math.floor(num / i));
            }
        }
    }
    const counts = new Array(m + 1).fill(0);
    let ans = 0;
    for (let num of nums) {
        const root = uf.find(num);
        counts[root]++;
        ans = Math.max(ans, counts[root]);
    }
    return ans;
};

class UnionFind {
    constructor(n) {
        this.parent = new Array(n).fill(0).map((_, i) => i);
        this.rank = new Array(n).fill(0);
    }

    union(x, y) {
        let rootx = this.find(x);
        let rooty = this.find(y);
        if (rootx !== rooty) {
            if (this.rank[rootx] > this.rank[rooty]) {
                this.parent[rooty] = rootx;
            } else if (this.rank[rootx] < this.rank[rooty]) {
                this.parent[rootx] = rooty;
            } else {
                this.parent[rooty] = rootx;
                this.rank[rootx]++;
            }
        }
    }

    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }
}
