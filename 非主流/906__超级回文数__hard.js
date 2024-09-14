/**906. 超级回文数
如果一个正整数自身是回文数，而且它也是一个回文数的平方，那么我们称这个数为超级回文数。

现在，给定两个正整数 L 和 R （以字符串形式表示），返回包含在范围 [L, R] 中的超级回文数的数目。


示例：

输入：L = "4", R = "1000"
输出：4
解释：
4，9，121，以及 484 是超级回文数。
注意 676 不是一个超级回文数： 26 * 26 = 676，但是 26 不是回文数。
 

提示：

1 <= len(L) <= 18
1 <= len(R) <= 18
L 和 R 是表示 [1, 10^18) 范围的整数的字符串。
int(L) <= int(R)
 
 * 
 * 题解： https://leetcode.cn/problems/super-palindromes/solutions/1711358/js-by-a-ba-li-9fcy
 * @param {*} left 
 * @param {*} right 
 * @returns 
 */
var superpalindromesInRange = function (left, right) {
    const bigLeft = BigInt(left);
    const bigRight = BigInt(right);
    return buildPalindrome(1, bigLeft, bigRight) + buildPalindrome(2, bigLeft, bigRight);
  };
  
  // type 1：数字总长度为奇数个
  // type 2：数字总长度为偶数个
  function buildPalindrome(type, bigLeft, bigRight) {
    let result = 0;
    for (let k = 1; k < 100000; ++k) {
      let num = String(k);
      // 将后续的回文拼上来，如num为1234，拼上后就是1234321了，这时num已经是回文数了
      for (let i = num.length - type; i >= 0; --i) {
        num += num[i];
      }
      // 这里的v是计算的平方值
      let v = BigInt(num);
      v *= v;
      // 如果v越界了,则直接break
      if (v > bigRight) break;
      // 如果v也是回文数,则加入结果集
      if (v >= bigLeft && isPalindrome(String(v))) result++;
    }
    return result;
  }
  
  // 判断s是否是回文字符串
  var isPalindrome = function (s) {
    const len = s.length;
    if (len === 1) return true;
    let start = 0;
    let end = len - 1;
    while (start < end) {
      if (s[start++] !== s[end--]) {
        return false;
      }
    }
    return true;
  }