


function maxDepthOntree(node, maxDepth){
  maxDepth = maxDepth || 0
  if (node.length === 0){ return maxDepth }
  var head = node[0]
  var tail = node.slice(1)
  if (/* bottom of branch */ isLeaf(head))

}

function isLeaf(node){return !node.reduce }
function isBranch(node){return !isLeaf(node)}


;[
    {
      name: "test 1",
      input: [0],
      expected: 1
    },
     {
      name: "test 2",
      input: [0,[1]],
      expected: 2
    },
     {
    name: "test 3",
    input: [0,[1,[4],3]],
    expected: 2
  },
].forEach(function(td){
  var actual = maxDepthOntree(td.input)
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