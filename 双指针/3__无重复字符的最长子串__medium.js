/**
 * 双指针，滑动窗口
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    if (s.length <= 1) return s.length;
    let left = 0,
      right = 1,
      max = 0;
    while (right < s.length) {
      let temp = s.slice(left, right);
      if (temp.includes(s.charAt(right))) {
        left++;
        continue;
      } else {
        right++;
      }
      if (right - left > max) {
        max = right - left;
      }
    }
    return max;
  };
  
