
function uniquePathsWithObstacles (grid) {
  var start = [[0, 0]]
  var fullPathLength = grid[1] ? grid.length + grid[0].length - 1 : grid[0].length
  var paths = [start]
  var possiblePaths = 0
  while (paths.length > 0) {
    var path = paths.shift()
    if (path.length === fullPathLength) { possiblePaths++ }
    var cellToRight = getRightCell(path[path.length - 1], grid)
    var cellBelow = getCellBelow(path[path.length - 1], grid)
    if (cellBelow) {
      paths.push(path.concat([cellBelow]))
    }
    if (cellToRight) {
      paths.push(path.concat([cellToRight]))
    }
  }
  return possiblePaths
}

function getRightCell (currentXY, grid) {
  var row = currentXY[0]
  var column = currentXY[1] + 1
  if (grid[row] && grid[row][column] === 0) {
    return [row, column]
  }
  return false
}

function getCellBelow (currentXY, grid) {
  var row = currentXY[0] + 1
  var column = currentXY[1]
  if (grid[row] && grid[row][column] === 0) {
    return [row, column]
  }
  return false
}


;[
  {
    name: 'countPaths test, 1 path:',
    input: [
            [0, 0, 0],
    ],
    expected: 1,
  },
  {
    name: 'countPaths test, no path:',
    input: [
            [0, 'x', 0],
    ],
    expected: 0,
  },

  {
    name: 'countPaths test, 1 path, one block:',
    input: [
            [0, 0, 0],
            [0, 'x', 0],
    ],
    expected: 1,
  },
  {
    name: 'countPaths test, 2 paths, one block:',
    input: [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ],
    expected: 2,
  },
  {
    name: 'countPaths test',
    input: [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    expected: 7,
  },
   {
    name: 'countPaths test',
    input: [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
      [0, 0, 0],
      [0, 0, 0],
    ],
    expected: 5,
  },
].forEach((td) => {
  const actual = uniquePathsWithObstacles(td.input)
  const pass = actual === td.expected
  if (pass) {
    console.log('passed:', td.name)
  } else {
    console.log('failed:', td.name)
    console.log('actual:', actual)
    console.log('expected:', td.expected)
    process.exit()
  }
})