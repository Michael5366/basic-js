const { NotImplementedError } = require("../extensions/index.js");

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
  const arr = String(n).split("");

  let max = 0;

  for (let i = 0; i < arr.length; i++) {
    const copyArr = [...arr];
    copyArr.splice(i, 1).join("");

    if (max < +copyArr.join("")) {
      max = +copyArr.join("");
    }
  }

  return max;
}

module.exports = {
  deleteDigit,
};
