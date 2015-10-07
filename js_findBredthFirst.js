// find a single element, breadth first
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