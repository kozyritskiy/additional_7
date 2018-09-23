module.exports = function solveSudoku(matrix) {
  let row = [];
  let column = [];
  let cordX = 0;
  let cordY = 0;
  let valid = false;
  let countOfValid = 0;

  while (valid === false) {
    // Поиск первого нуля
    loop1:
    for (let i = 0; i < matrix.length; i++) {
      loop2:
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === 0) {
          row = matrix[i];
          cordX = j;
          cordY = i;
          break loop1;
        }
        else {
          countOfValid++;
        }
      }
    }

    if (countOfValid === 81) {
      valid = true;
      break;
    }

    column = [];
    // Колонка в которой был найден ноль
    for (let i = 0; i < matrix.length; i++) {
      column.push(matrix[i][cordX]);
    }

    // поиск числа которого нету в строке
    function findInRow(j) {
      let tempArr = 0;
      for (let i = 0; i < row.length; i++) {
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
      let tempArr = 0;
      for (let i = 0; i < column.length; i++) {
        if (column[i] !== j) {
          tempArr++;
        }
      }
      if (tempArr === 9) {
        return true;
      }
    }
    function findInSector(j) {
      let sectorX = parseInt(cordX / 3) * 3;
      let sectorY = parseInt(cordY / 3) * 3;
      let sector = [];
      let cntX = sectorX + 3;
      let cntY = sectorY + 3;
      for (sectorX; sectorX < cntX; sectorX++) {
        sectorY = parseInt(cordY / 3) * 3;
        for (sectorY; sectorY < cntY; sectorY++) {
          sector.push(matrix[sectorY][sectorX]);
        }
      }
      let tempArr = 0;
      for (let i = 0; i < sector.length; i++) {
        if (sector[i] !== j) {
          tempArr++;
        }
      }
      if (tempArr === 9) {
        return true;
      }
    }

    // Поиск кандидата
    let chislo = 0;
    for (let i = 1; i <= 9; i++) {
      let c = findInColumn(i);
      let r = findInRow(i);
      let o = findInSector(i);
      if (c && r && o) {
        chislo = i;
        break;
      }
    }
    if (chislo === 0){
      break;
    }
    if (countOfValid !== 81 && chislo !==0) {
      matrix[cordY][cordX] = chislo;
    }
    countOfValid = 0;
  }
  return matrix;
}
