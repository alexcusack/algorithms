// isEqual(nestedListA, nestedListB) -> boolean` - pick your traversal strategy


// input: two trees
// output: boolean
// [["x", "y"], "xy"]
var isEqual = function(treeA, treeB){
  if (/* TreeA is a leaf? */ !treeA.reduce || !treeB.reduce ){ return /* B must be mathcing leaf */ treeA === treeB }
  if (treeA.length === 0 && treeB.length === 0 ) { return true }
  if (treeA.length !== treeB.length){ return false }
  var headOfTreeA = treeA[0]
  var headOfTreeB = treeB[0]
  var tailOfTreeA = treeA.slice(1)
  var tailOfTreeB = treeB.slice(1)
  return isEqual( headOfTreeA, headOfTreeB ) && isEqual(tailOfTreeA, tailOfTreeB)
}

;[
  {
    name: 'Empty Trees',
    input: [[],[]],
    expected: true,
  },
  {
    name: 'Empty tree and non, fail',
    input: [[],[1]],
    expected: false,
  },
  {
    name: 'Empty tree and non, fail',
    input: [[1], 1],
    expected: false,
  },
  {
    name: 'list with strings',
    input: [["x", "y"], "xy"],
    expected: false,
  },
  {
    name: 'single element Trees',
    input: [[2],[2]],
    expected: true,
  },
   {
    name: 'single element Trees with string',
    input: [[2],["hi"]],
    expected: false,
  },
  {
    name: 'single element content, fail',
    input: [[2],[1]],
    expected: false,
  },
  {
    name: 'single element nested Tree, fail',
    input: [[2],[9]],
    expected: false,
  },
  {
    name: 'unmatched nesting, fail',
    input: [[[2]],[[[[2]]]]],
    expected: false,
  },
  {
    name: 'multiple element nested Tree',
    input: [[2,[3,[4]]],[2,[3,[4]]]],
    expected: true,
  },
].forEach(function(td){
  var actual = isEqual(td.input[0], td.input[1])
  var pass = actual === td.expected
  if (pass){
    console.log("passed:", td.name)
  }else{
    console.log("Failed", td.name)
    console.log("actual:", actual)
    console.log("expected:", td.expected)
    process.exit()
  }
})