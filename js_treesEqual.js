// isEqual(nestedListA, nestedListB) -> boolean` - pick your traversal strategy


// input: two trees
// output: boolean
var isEqual = function(treeA, treeB){
  if (treeA.length === 0 || treeB.length === 0 ) { return true}
  if (treeA === undefined || treeB === undefined ){ return false}
  if (treeA.length !== treeB.length ){ return false}
  if (/* a leaf */ !treeA.reduce){ return treeA === treeB ?  true : false }
  var headOfTreeA = treeA[0]
  var headOfTreeB = treeB[0]
  var tailOfTreeA = treeA.slice(1)
  var tailOfTreeB = treeB.slice(1)
  return isEqual( headOfTreeA, headOfTreeB ) === true  && isEqual(tailOfTreeA, tailOfTreeB) === true
}




;[
  {
    name: 'Empty Trees',
    input: [[],[]],
    expected: true,
  },
  {
    name: 'single element Trees',
    input: [[2],[2]],
    expected: true,
  },
  {
    name: 'single element content, fail',
    input: [[2],[2]],
    expected: true,
  },
  {
    name: 'single element nested Tree, fail',
    input: [[[2]],[9]],
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