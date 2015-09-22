
function maxDepthOntree(node, maxDepth, currentDepth){
  maxDepth = maxDepth || 0
  currentDepth = currentDepth || 0

  if (node.length === 0){ return maxDepth }

  if (isLeaf(node)) {
    maxDepth = currentDepth > maxDepth ? currentDepth : maxDepth
    return maxDepth
  }

  /* branch */

  maxDepth = currentDepth > maxDepth ? currentDepth : maxDepth
  var head = node[0]
  var rest = node.slice(1)
  var headMax = maxDepthOntree(head, maxDepth, ++currentDepth)
  var tailMax = maxDepthOntree(rest, maxDepth, ++currentDepth)
  console.log('headm', headMax)
  console.log('restm', tailMax)
  return headMax > tailMax

}

function isLeaf(node){return !node.reduce }
function isBranch(node){return !isLeaf(node)}


;[
  // {
  //   name: "test 1",
  //   input: [0],
  //   expected: 1
  // },
   {
    name: "test 2",
    input: [0,[1]],
    expected: 9
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