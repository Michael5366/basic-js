const { NotImplementedError } = require("../extensions/index.js");

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */
function encodeLine(str) {
  let cnt = 1;
  let result = "";

  for (let i = 0; i < str.length; i++) {
    const a = str[i];
    const b = str[i + 1];

    if (a === b) {
      cnt++;
    } else {
      if (cnt > 1) {
        result += `${cnt}${a}`;
      } else {
        result += a;
      }
      cnt = 1;
    }
  }

  return result;
}

module.exports = {
  encodeLine,
};
