



function countBlobs(matrix){
  if (matrix.length === 0){ return 0 }
  if (matrix[0].length === 0){ return 0}
  return matrix.reduce(function(count, currentRow, rowIndex){
    return count + checkRow(rowIndex, matrix)
  },0)
}


function checkRow(rowIndex, matrix){
  var count = 0
  for (var i = 0; i < matrix[rowIndex].length; ++i){
    if (matrix[rowIndex][i] === 1){
      ++count
      updateRightSideValues(matrix, rowIndex, i)
    }
  }
  return count
}


function updateRightSideValues(matrix, rowIndex, columnIndex){
  if (matrix[rowIndex] === undefined){return }
  matrix[rowIndex][columnIndex] = 0
  /* check column below */
  updateColumnsValues(matrix, rowIndex, columnIndex)
  if (matrix[rowIndex][++columnIndex] === 1){
    matrix[rowIndex][columnIndex] = 0
    /* check column below */
    updateColumnsValues(matrix, rowIndex, columnIndex)
  }
}

function updateLeftSideValues(matrix, rowIndex, columnIndex){
  if (matrix[rowIndex] === undefined){return }
  matrix[rowIndex][columnIndex] = 0
  if (matrix[rowIndex][--columnIndex] === 1){
    matrix[rowIndex][columnIndex] = 0
    updateColumnsValues(matrix, rowIndex, columnIndex)
    updateRightSideValues(matrix, rowIndex, columnIndex)
  }
}


function updateColumnsValues(matrix, rowIndex, columnIndex){
  var upperRow = rowIndex-1
  var lowerRow = rowIndex+1
  // update connected upper columns
  while(matrix[upperRow] && matrix[upperRow][columnIndex] === 1){
    /* check for row connections */
    updateRightSideValues(matrix, upperRow, columnIndex)
    updateLeftSideValues(matrix, upperRow, columnIndex)
    matrix[upperRow][columnIndex] = 0
    upperRow = upperRow - 1
  }
  // update connected lower columns
  while(matrix[lowerRow] && matrix[lowerRow][columnIndex] === 1){
    /* check for row connections */
    updateLeftSideValues(matrix, lowerRow, columnIndex)
    updateRightSideValues(matrix, lowerRow, columnIndex)
    matrix[lowerRow][columnIndex] = 0
    lowerRow = lowerRow + 1
  }
}





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
  var actual = countBlobs(td.input)
  var pass = actual === td.expected // no nesting so this is 'fine'
  var pass = JSON.stringify(actual) === JSON.stringify(td.expected)
  if (pass){
    console.log("passed:", td.name)
  }else{
    console.log(td.name, "failed")
    console.log("actual:", actual)
    console.log("expected:", td.expected)
    process.exit()
  }
})
