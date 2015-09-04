// find a single element, breadth first
// input: a list and a matcher
// output: a list
var find = function(leafOrBranch, matcher, queue){
  // console.dir(leafOrBranch, {depth: null})
  for (var i = 0; i < leafOrBranch.length; ++i) {
    if (leafOrBranch[i].reduce)   { queue.push(leafOrBranch[i]) }
    if (matcher(leafOrBranch[i])) { return [leafOrBranch[i]] }
  }
  if (queue.length === 0 ){ return []} //return empty list if nothing found
  return find(queue.shift(), matcher, queue)
}

var find = function(leafOrBranch, matcher, matches, queue){
  // console.dir(leafOrBranch, {depth: null})
  for (var i = 0; i < leafOrBranch.length; ++i) {
    if (leafOrBranch[i].reduce)   { queue.push(leafOrBranch[i]) }
    if (matcher(leafOrBranch[i])) { matches.push(leafOrBranch[i]) }
  }
  if (queue.length === 0 ){return matches}
  return find(queue.shift(), matcher, matches, queue)
}

// input: item to match, matcher
// output: list

var find = function(node, matcher){
  var queue = isLeaf(node) ? [node] : node
  var matches = []
  var head
  while (queue.length > 0) {
    head = queue.pop()[0]
    if (isBranch(head)){ queue.push(head) }
    else {/* a leaf and match? */ matcher(head) ? matches.push(head) : matches }
  }
  return matches
}

var isBranch = function(node){ return node.reduce }
var isLeaf = function(node){ return !isBranch(node) }

// breadth first, no mutation
// var find = function(node, matcher){
//   var foundElements =  (isLeaf(node) ? [node] : node).reduce(function(memo, currentNode) {
//     var matches = memo[0]
//     var queue = memo[1]
//     if (isLeaf(currentNode)) {
//       return matcher(currentNode) ?
//         [matches.concat(currentNode), queue] :
//         [matches, queue] }
//     return [matches, queue.concat(currentNode)]
//   }, [[],[]])
//   if (foundElements[1].length == 0) { return foundElements[0]}
//   return foundElements[0].concat(find(foundElements[1], matcher))
// }

// input: node (list or element), matching function
// output: list
// var find = function(node, matcher){
//   var set = [/* matches */[], /* queue */ [node]]
//   do {
//     set = set[1].reduce(reducingFunction, [[],[]])
//   } while (set[1].length > 0)
//   return set[0]
// }

// var reducingFunction = function(pairOfMatchAndQueue, currentElement){
//   var matches = pairOfMatchAndQueue[0]
//   var queue = pairOfMatchAndQueue[1]
//   if ( /* a leaf ? */ !currentElement.reduce){
//     if ( match? add to set  matcher(currentElement) ){ return [ matches.concat([currentElement]), queue] }
//     else{/* return set */  return [matches, queue] }
//   }
//   else {/*branch? add to queue */ return [matches , queue.concat(currentElement) ]}
// }

var isx = function(e){return e[0] === "x"}
;[
  {
    name: "single element, match",
    input: ["x", isx, [], []],
    expected: ["x"]
  },
  {
    name: "single element list, match",
    input: [["x"], isx, [], []],
    expected: ["x"]
  },
  {
    name: "double element, match",
    input: [["x","x"], isx, [], []],
    expected: ["x", "x"]
  },
  {
    name: "double element, match",
    input: [["x",["x"]], isx, [], []],
    expected: ["x", "x"]
  },
  {
    name: "single match nested list, fail",
    input: [[[[[[['m']]]]]], isx, [], []],
    expected: []
  },
   {
    name: "double nested list",
    input: [[[[[[[['x1']]]]]], [['a']], [['x2']]], isx, [], []],
    expected: ["x2", "x1"]
  },
].forEach(function(td){
  var actual = find(td.input[0], td.input[1])
  var pass = JSON.stringify(actual) === JSON.stringify(td.expected)
  if (pass){
    console.log("Passed:", td.name)
  }else{
    console.log(td.name, "failed")
    console.log("actual:", actual)
    console.log("expected:", td.expected)
    process.exit()
  }
})