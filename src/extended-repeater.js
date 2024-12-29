const { NotImplementedError } = require("../extensions/index.js");

/**
 * Create a repeating string based on the given parameters
 *
 * @param {String} str string to repeat
 * @param {Object} options options object
 * @return {String} repeating string
 *
 *
 * @example
 *
 * repeater('STRING', { repeatTimes: 3, separator: '**',
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
function repeater(str, options) {
  let addition = "";
  let result = "";

  const addiSeparator = options.additionSeparator || "|";
  const separator = options.separator || "+";

  let addiStr = "addition" in options ? String(options.addition) : "";

  if (options.additionRepeatTimes > 0) {
    for (let i = 0; i < options.additionRepeatTimes - 1; i++) {
      addition += addiStr + addiSeparator;
    }
    addition += addiStr;
  } else {
    addition += addiStr;
  }

  for (let i = 0; i < options.repeatTimes - 1; i++) {
    result += str + addition + separator;
  }

  result += str + addition;

  return result;
}

module.exports = {
  repeater,
};
