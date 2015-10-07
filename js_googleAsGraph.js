
const deltas = [[-1, 0],  [0, -1],   [1,0],   [0,1]]

const countWhiteSpaces=(matrix)=>{
  let whiteSpaces = 0
  for (let row = 0; row < matrix.length; ++row){
    for (let column = 0; column < matrix[0].length; ++column){
      if (matrix[row][column] === 1){
        ++whiteSpaces
        matrix[row][column] = 0
        updateNeighbors(row, column, matrix)
      }
    }
  }
  return whiteSpaces
}

const updateNeighbors=(row, column, matrix)=>{
  deltas.forEach((rowColumn)=>{
    const newColumn = column + rowColumn[0]
    const newRow    = row + rowColumn[1]
    if (validPosition(newRow, newColumn, matrix) && matrix[newRow][newColumn] === 1){
      matrix[newRow][newColumn] = 0
      updateNeighbors(newRow, newColumn, matrix)
    }
  })
}

const validPosition=(row, column, matrix)=>{
  if (row < 0 || column < 0 ){ return false }
  if (row >= matrix.length || column >= matrix[0].length){ return false }
  return true
}

if (process.env['RUN_TESTS']) {
  console.log('running tests')
  ;[
    {
      name: "empty matrix",
      input: [[]],
      expected: 0
    },
    {
      name: "single element matrix",
      input: [[1]],
      expected: 1
    },
    {
      name: "single row, one match",
      input: [[0,1]],
      expected: 1
    },
      {
      name: "single row, not blob",
      input: [[0,1,0,1]],
      expected: 2
    },
      {
      name: "single row, two matches",
      input: [[0,1,1]],
      expected: 1
    },
    {
      name: "two single columns",
      input: [[0],
              [1]],
      expected: 1
    },
     {
      name: "single column blob",
      input: [[1],
              [1]],
      expected: 1
    },
     {
      name: "two column not blob",
      input: [[1,0],
              [0,1]],
      expected: 2
    },
      {
      name: "multi column and row blob, right",
      input: [[0,1,0],
              [0,1,1],
              ],
      expected: 1
    },
     {
      name: "multi column and row blob, left",
      input: [[0,1,0],
              [1,1,0],
              ],
      expected: 1
    },
     {
      name: "multi column and row disconnected",
      input: [[1,0,0],
              [0,1,0],
              [0,0,1],
              ],
      expected: 3
    },
     {
      name: "all connected",
      input: [[1,1,1],
              [1,1,1],
              [1,1,1],
              ],
      expected: 1
    },
     {
      name: "Interview case",
      input: [
        [0,0,0,1,1,0],
        [0,0,0,0,0,0],
        [0,1,1,0,0,0],
        [0,0,1,1,0,0],
      ],
      expected: 2
    },
  ].forEach(function(td){
    var actual = countWhiteSpaces(td.input)
    var pass = actual === td.expected
    if (pass){
      console.log("passed:", td.name)
    }else{
      console.log("failed:", td.name)
      console.log("actual:", actual)
      console.log("expected:", td.expected)
      process.exit()
    }
  })
}