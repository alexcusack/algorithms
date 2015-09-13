function searchMatrix (matrix, targetNumber) {
  log('-')
  log('search', matrix)
  if (isLeaf(matrix)) { return matches(matrix, targetNumber) }
  if (isEmpty(matrix)) { return false }

  var middleRowIndex = findMiddleIndexes(matrix)['rowIndex']

  if (isOneDimensionList(matrix)) {
    var middleValue = matrix[middleRowIndex]
    if (matches(middleValue, targetNumber)) { return true }
    return targetNumber < middleValue
      ? searchMatrix(lowerValuesOfRow(matrix, middleRowIndex), targetNumber)
      : searchMatrix(upperValuesOfRow(matrix, middleRowIndex), targetNumber)
  }

  // 2d list
  if (is2dEmpty(matrix)){ return false }
  var middleColumnIndex = findMiddleIndexes(matrix)['columnIndex']
  var middleValue = matrix[middleRowIndex][middleColumnIndex]
  if (matches(middleValue, targetNumber)) { return true }
  return targetNumber < middleValue ?
       searchMatrix(lowerValueColumns(matrix, middleRowIndex, middleColumnIndex), targetNumber)
    || searchMatrix(lowerValueRows(matrix, middleRowIndex), targetNumber)
    :
       searchMatrix(upperValueColumns(matrix, middleRowIndex, middleColumnIndex), targetNumber)
    || searchMatrix(upperValueRows(matrix, middleRowIndex), targetNumber)
}

// support fns

function matches (element, target) {
  log('trymatch', element, element === target)
  return element === target
}

function isLeaf (node) { return !Array.isArray(node) }
function isEmpty (node) { return node.length === 0 }
function is2dEmpty(node){ return node[0].length === 0}

function isOneDimensionList (matrix) { return isLeaf(matrix[0]) }

function findMiddleIndexes (matrix) {
  return isOneDimensionList(matrix) ?
      { rowIndex: Math.floor(matrix.length / 2) }
    : { rowIndex: Math.floor(matrix.length / 2), columnIndex: Math.floor(matrix[0].length / 2) }
}
/* */
function lowerValuesOfRow (matrix, middleIndex) { return matrix.slice(0, middleIndex) }
function upperValuesOfRow (matrix, middleIndex) { return matrix.slice(middleIndex+1, matrix.length) }
/*
--+++
--+++
--X++
--+++
--+++

over every row, slice row, check values in row.

*/
function lowerValueColumns (matrix, middleRowIndex, middleColumnIndex) {
    return matrix.map(function(rows){
      return lowerValuesOfRow(rows, middleColumnIndex)
    })
    // return log("lowerValueColumns", matrix[middleRowIndex].slice(0, middleColumnIndex))
}
/*
+++--
+++--
++X--
+++--
+++--
*/
function upperValueColumns (matrix, middleRowIndex, middleColumnIndex) {
  return matrix.map(function(row){
    return upperValuesOfRow(row, middleColumnIndex)
  })
}

/*
-----
-----
++X++
+++++
+++++
*/
function lowerValueRows(matrix, middleRowIndex){ return matrix.slice(0, middleRowIndex) }

/*
+++++
+++++
++X++
-----
-----
*/
function upperValueRows(matrix, middleRowIndex){ return matrix.slice(middleRowIndex+1, matrix.length) }


// function upperRowUpperValueColumns (matrix, middleColumnIndex) {return matrix[0].slice(middleColumnIndex + 1, matrix[0].length) }

// debug support

var loggedItems = []
var log = function (name, itemToLog = '') {
  loggedItems.push([name, itemToLog])
  return itemToLog
}

// tests


const testData = [
  {
    name: "lower value columns",
    fn: lowerValueColumns,
    input: [
      [ /* matrix */
        [1,2,3,4,5],
        [6,7,8,9,10],
        [3,4,5,6,7]
      ],
      /* row, column */
      1, 2
    ],
    expected: [[1,2],[6,7],[3,4]]
  },
   {
    name: "upper value columns",
    fn: upperValueColumns,
    input: [
      [ /* matrix */
        [1,2,3,4,5],
        [6,7,8,9,10],
        [3,4,5,6,7]
      ],
      /* row, column */
      1, 2
    ],
    expected: [[4,5],[9,10],[6,7]]
  },
  {
    name: "lower value rows",
    fn: lowerValueRows,
    input: [
      [ /* matrix */
        [1,2,3,4,5],
        [6,7,8,9,10],
        [3,4,5,6,7]
      ],
      /* row, column */
      1, 2
    ],
    expected: [[1,2,3,4,5]]
  },
   {
    name: "Upper value rows",
    fn: upperValueRows,
    input: [
      [ /* matrix */
        [1,2,3,4,5],
        [6,7,8,9,10],
        [3,4,5,6,7]
      ],
      /* row, column */
      1, 2
    ],
    expected: [[3,4,5,6,7]]
  },
   {
    name: "Upper values of row",
    fn: upperValuesOfRow,
    input: [
       /* matrix */
        [1,2,3,4,5],
      /* column */
      2
    ],
    expected: [4,5]
  },
  {
    name: 'leaf',
    inputMatrix: 1,
    inputTarget: 1,
    expected: true,
  },
  {
    name: 'leaf, fail case',
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
    inputMatrix: [
      [1, 4],
      [2, 5]
    ],
    inputTarget: 2,
    expected: true,
  },
  {
    name: 'single list',
    inputMatrix: [1, 2, 3, 4, 6],
    inputTarget: 4,
    expected: true,
  },
  {
    name: 'single list, fail case',
    inputMatrix: [1, 2, 3, 4, 6],
    inputTarget: 7,
    // expectedMatrixs: [
    //   [1,2,3,4,6],
    //             3,
    //         [4,6],
    //             6,
    //             []
    // ],

    expected: false,
  },
  {

    name: 'two array list',
    inputMatrix: [
      [1],
      [2]
    ],
    inputTarget: 2,
    // expectedMatrixs: [
    //   [[1],[2]],
    //         2,
    //   ],

    expected: true,
  },
  {
    // focused: true,
    name: '2d array list larger',
    inputMatrix: [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
    ],
    inputTarget: 14,
    // expectedMatrixs:[
    //   [ [ 1, 2, 3, 4, 5 ], [ 6, 7, 8, 9, 10 ], [ 11, 12, 13, 14, 15 ] ],
    //                                                              8,
    //                                         [ [ 11, 12, 13, 14, 15 ] ],
    //                                                             13,
    //                                                             [],
    //                                                       [ 14, 15 ],
    //                                                             15,
    //                                                           [ 14 ],
    //                                                             14
    //   ],
    expected: true,
  },
  {
    name: 'two array list, false case',
    inputMatrix: [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
    ],
    inputTarget: 20,
    expected: false,
  },
  {
    name: '2d array list',
    inputMatrix: [
      [5, 6, 10, 14],
      [6, 10, 13, 18],
      [10, 13, 18, 19]
    ],
    inputTarget: 14,
    expected: true,
  },
  {
    name: 'large 2d from leet',
    inputMatrix: [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25]
    ],
    inputTarget: 25,
    expected: true,
  },
  {
    name: 'Extra Large 2d from leet',
    inputMatrix: [
      [3, 3, 8, 13, 13, 18],
      [4, 5, 11, 13, 18, 20],
      [9, 9, 14, 15, 23, 23],
      [13, 18, 22, 22, 25, 27],
      [18, 22, 23, 28, 30, 33],
      [21, 25, 28, 30, 35, 35],
      [24, 25, 33, 36, 37, 40]
    ],
    inputTarget: 21,
    expected: true,
  },

]

const runTests = () => {
  const focusedTestData = testData.filter(t => t.focused)
  const someTestsFocused = focusedTestData.length > 0

  console.log('running', (someTestsFocused ? 'focused tests' : 'all tests'))
  ;(someTestsFocused ? focusedTestData : testData).forEach(runTest)
}

function runTest (td) {
  loggedItems = []
  var actual = td.fn ? td.fn.apply(null, td.input) : searchMatrix(td.inputMatrix, td.inputTarget)
  var actualMatrixs = loggedItems.filter(( [a, b]) => a === 'matrix').map(( [a, b]) => b)
  var pass = !td.expectedMatrixs ? deepEqual(actual, td.expected) : deepEqual(actual, td.expected) && deepEqual(actualMatrixs, td.expectedMatrixs)
  if (pass) {
    console.log('passed:', td.name)
    // if (td.focused && loggedItems.length)
    // loggedItems.forEach(( [label, item]) => console.log(label, item))
  } else {
    console.log('test:  ', td.name)
    console.log('actual:  ', actual)
    console.log('expected:', td.expected)
    loggedItems.forEach(( [label, item]) => console.log(label, item))
    process.exit()
  }
}

const deepEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b)

// execution entry point - run tests

runTests()
