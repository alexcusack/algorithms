

var searchMatrix = function(matrix, targetNumber){
  log("-------", "")
  log("matrix", matrix)
  if (/* is leaf */ !Array.isArray(matrix)){log("match", targetNumber === matrix); return matrix === targetNumber }
  if (matrix.length === 0){ return false }
  var middleIndex = Math.floor(matrix.length/2)
  if (/* single list */ !Array.isArray(matrix[0])){
    log('single list search', "")
    var middleValue = matrix[middleIndex]
    if (searchMatrix(middleValue, targetNumber)) {return true}
    if (middleValue > targetNumber){/* search left */ return searchMatrix(matrix.slice(0, middleIndex), targetNumber) }
    /* search right */ return searchMatrix(matrix.slice(middleIndex+1, matrix.length), targetNumber)
  }
  /* 2d list */
  log("2d list search", "")
  var middleRowIndex = middleIndex
  var middleColumnIndex = Math.floor(matrix[0].length/2)
  var middleValue = matrix[middleRowIndex][middleColumnIndex]
  if (searchMatrix(middleValue, targetNumber)) {return true}
  log("matrix is", matrix)
  log("middleRowIndex:", middleRowIndex)
  log("middleColumnIndex:", middleColumnIndex)
  log("middle Value:", middleValue)
  if ( targetNumber < middleValue ){ /* search up and left */
  log("look smaller", "")
     /* search above rows */
    if ( searchMatrix(matrix.slice(0, middleRowIndex),targetNumber)
        /* search column */
        || searchMatrix(matrix[middleRowIndex].slice(0, middleColumnIndex), targetNumber)
        ) { return true}
  }
  /* target > middleValue */
  log("look larger", matrix)
  /* search below row */
  return searchMatrix(matrix.slice(middleRowIndex+1, matrix.length), targetNumber)
  /* search column */|| searchMatrix(matrix[middleRowIndex].slice(middleColumnIndex+1, matrix[0].length), targetNumber)
  || searchMatrix(matrix[0].slice(middleColumnIndex+1, matrix[0].length), targetNumber)
}



var loggedItems = []
var log = function(name, itemToLog){
  loggedItems.push([name, itemToLog])
}
const deepEqual = (a,b) => JSON.stringify(a) === JSON.stringify(b)
//parse test
;[
  {
    name: 'leaf',
    inputMatrix: 1,
    inputTarget: 1,
    expected: true,
  },
  {
    name: 'leaf',
    inputMatrix: 2,
    inputTarget: 1,
    expected: false,
  },
  {
    name: 'node',
    inputMatrix: [2],
    inputTarget: 2,
    expected: true,
  },
  {
    name: 'node',
    inputMatrix: [[1,4],[2,5]],
    inputTarget: 2,
    expected: true,
  },
  {
    name: 'single list',
    inputMatrix: [1,2,3,4,6],
    inputTarget: 4,
    expected: true,
  },
  {
    name: 'single list, fail case',
    inputMatrix: [1,2,3,4,6],
    inputTarget: 7,
    expectedMatrixs: [
      [1,2,3,4,6],
                3,
            [4,6],
                6,
                []
    ],

    expected: false,
  },
   {
    name: 'two array list',
    inputMatrix: [
      [1],
      [2]
    ],
    inputTarget: 2,
    expectedMatrixs: [
      [[1],[2]],
            2,
      ],

    expected: true,
  },
   {
    name: '2d array list larger',
    inputMatrix: [
      [1,2,3,4,5],
      [6,7,8,9,10],
      [11,12,13,14,15],
    ],
    inputTarget: 14,
    expectedMatrixs:[
      [ [ 1, 2, 3, 4, 5 ], [ 6, 7, 8, 9, 10 ], [ 11, 12, 13, 14, 15 ] ],
                                                                 8,
                                            [ [ 11, 12, 13, 14, 15 ] ],
                                                                13,
                                                                [],
                                                          [ 14, 15 ],
                                                                15,
                                                              [ 14 ],
                                                                14
      ]
          ,
    expected: true,
  },
  {
    name: 'two array list, false case',
    inputMatrix: [
      [1,2,3,4,5],
      [6,7,8,9,10],
      [11,12,13,14,15],
    ],
    inputTarget: 20,
    expected: false,
  },
   {
    name: '2d array list',
    inputMatrix: [
      [5,6,10,14],
      [6,10,13,18],
      [10,13,18,19]
    ],
    inputTarget: 14,
    expected: true,
  },
    {
    name: 'large 2d from leet',
    inputMatrix: [
      [1,2,3,4,5],
      [6,7,8,9,10],
      [11,12,13,14,15],
      [16,17,18,19,20],
      [21,22,23,24,25]
    ],
    inputTarget: 25,
    expected: true,
  },
  {
    name: 'Extra Large 2d from leet',
    inputMatrix: [
    [3,3,8,13,13,18],
    [4,5,11,13,18,20],
    [9,9,14,15,23,23],
    [13,18,22,22,25,27],
    [18,22,23,28,30,33],
    [21,25,28,30,35,35],
    [24,25,33,36,37,40]
    ],
    inputTarget: 21,
    expected: true,
  },

].forEach(function(td){
  loggedItems = []
  var actual = searchMatrix(td.inputMatrix, td.inputTarget)
  var actualMatrixs = loggedItems.filter( ([a,b]) => a === "matrix").map(([a,b]) => b )
  var pass = !td.expectedMatrixs ?  deepEqual(actual, td.expected) : deepEqual(actual, td.expected) && deepEqual(actualMatrixs, td.expectedMatrixs)
  if (pass){
    console.log("passed:", td.name)
  }else{
    console.log("test:  ", td.name)
    console.log("actual:  ", actual)
    console.log("expected:", td.expected)
    // console.log(td.expectedMatrixs)
    // console.log(actualMatrixs)
    loggedItems.forEach(([label, item]) => console.log(label, item) )
    process.exit()
  }
})


