module.exports = function solveSudoku(matrix) {
  let row = [];
  let column = [];
  let cordX = 0;
  let cordY = 0;
  let valid = false;
  let countOfValid = 0;

  while (valid === false) {
    // Поиск первого нуля
    for (var i = 0; i < matrix.length; i++) {
      for (var j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === 0) {
          row = matrix[i];
          cordX = j;
          cordY = i;
          break;
        }
        else {
          countOfValid++;
        }
      }
    }

    if (countOfValid === 81) {
      valid = true;
    }

    column = [];
    // Колонка в которой был найден ноль
    for (var i = 0; i < matrix.length; i++) {
      column.push(matrix[i][cordX]);
    }

    // поиск числа которого нету в строке
    function findInRow(j) {
      let tempArr = 0;
      for (var i = 0; i < row.length; i++) {
        if (row[i] !== j) {
          tempArr++;
        }
      }
      if (tempArr === 9) {
        return true;
      }
    }
    // поиск числа которого нету в столбце
    function findInColumn(j) {
      let tempArr1 = 0;
      for (var i = 0; i < column.length; i++) {
        if (column[i] !== j) {
          tempArr1++;
        }
      }
      if (tempArr1 === 9) {
        return true;
      }
    }
    // Поиск кандидата
    let chislo = 0;
    for (let i = 1; i <= 9; i++) {
      let c = findInColumn(i);
      let r = findInRow(i);
      if (c && r === true) {
        chislo = i;
        break;
      }
    }
    if (countOfValid !== 81) {
      matrix[cordY][cordX] = chislo;
    }
    countOfValid = 0;
  }
  return matrix;
}
