
function reverseTree(node){
/* iterate through and unshift everything at each level */
  if (emptyNode(node)){ return []  }
  var reversedTree = []
  var head = node[0]
  var rest = node.slice(1)
  reversedTree = isLeaf(head) ? reversedTree.concat(head) : reversedTree.concat([head])
  return reverseTree(rest).concat(reversedTree)
}

function emptyNode(node){ return node.length === 0 }
function isLeaf(node){ return !node.reduce }
function isBranch(node){return !isLeaf(node) }


;[
 {
    name: "empty",
    input: [],
    expected:[]
  },
 {
    name: "single element",
    input: [1],
    expected:[1]
  },
   {
    name: "two level test 1",
    input: [1,[2]],
    expected:[[2],1]
  },
  {
    name: "two level test 2",
    input: [3, [9,20],[15,7]],
    expected:[[15,7],[9,20],3]
  },
  {
    name: "three level test 1",
    input: [3, [9,20],[15,7],[[5,9]]],
    expected:[[[5,9]],[15,7],[9,20],3]
  },
].forEach(function(td){
  var actual = reverseTree(td.input)
  var pass = JSON.stringify(actual) === JSON.stringify(td.expected) // no nesting so this is 'fine'
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