// find all matches in a tree, depth first
// depth first search
// input: an element or list, a condition to match
// output: list
////////////////////////////////////////////////////////////////////////
var find = function(node, matcher){
  if (/* leaf? */ !node.reduce) { return matcher(node) ? [node] : [] }
  if (/* empty branch? */node.length === 0) { return [] }
  var head = node[0]
  var rest = node.slice(1)
  return find(head, matcher).concat(find(rest, matcher))
}


var isx = function(e){return e[0] === "x"}

;[
  {
    name: "no element match",
    input: ["m" , isx],
    expected: []
  },
  {
    name: "single element, match",
    input: [["x"] , isx],
    expected: ["x"]
  },
  {
    name: "single match nested list",
    input: [[[[[[['x']]]]]], isx],
    expected: ["x"]
  },
   {
    name: "two match list",
    input: [[[['x1']], [['a']], 'x2'], isx],
    expected: ["x1", 'x2']
  },
  {
    name: "three match nested list",
    input: [['a',[[[[['x1']]]]], [[[[[[['x2']]]]]]], [[[[["x3"]]]]]], isx, []],
    expected: ["x1", "x2", "x3"]
  },
].forEach(function(td){
  var actual = find(td.input[0], td.input[1])
  var pass = actual.join(',') === td.expected.join(',') // no nesting so this is 'fine'
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

