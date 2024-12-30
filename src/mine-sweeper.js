const { NotImplementedError } = require("../extensions/index.js");

/**
 * In the popular Minesweeper game you have a board with some mines and those cells
 * that don't contain a mine have a number in it that indicates the total number of mines
 * in the neighboring cells. Starting off with some arrangement of mines
 * we want to create a Minesweeper game setup.
 *
 * @param {Array<Array>} matrix
 * @return {Array<Array>}
 *
 * @example
 * matrix = [
 *  [true, false, false],
 *  [false, true, false],
 *  [false, false, false]
 * ]
 *
 * The result should be following:
 * [
 *  [1, 2, 1],
 *  [2, 1, 1],
 *  [1, 1, 1]
 * ]
 */
function minesweeper(matrix) {
  const result = [];

  let cnt = 0;

  for (let i = 0; i < matrix.length; i++) {
    result.push([]);

    for (let j = 0; j < matrix[i].length; j++) {
      const el = matrix[i][j];
      const directions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
      ];

      cnt = 0;

      for (let k = 0; k < directions.length; k++) {
        const [di, dj] = directions[k];
        const newRow = i + di;
        const newCol = j + dj;

        if (
          newRow >= 0 &&
          newRow < matrix.length &&
          newCol >= 0 &&
          newCol < matrix[i].length
        ) {
          if (matrix[newRow][newCol] === true) {
            cnt++;
          }
        }
      }
      result[i][j] = cnt;
    }
  }

  return result;
}

module.exports = {
  minesweeper,
};
