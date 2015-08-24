// find all matches in a tree, depth first
// depth first search
// input: an element or list, a condition to match
// output: list
var find = function(leafOrBranch, matcher, matches){
  if (!leafOrBranch.reduce) { return matcher(leafOrBranch) ? matches.push(leafOrBranch) : matches}
  var stack = leafOrBranch
  while (stack.length > 0 ) {
    var head = stack.shift()
    find(head, matcher, matches)
  }
  return matches
}

var isx = function(e){return e === "x"}

;[
  {
    name: "single element, match",
    input: [["x"], isx, [], []],
    expected: ["x"]
  },
  {
    name: "single match nested list",
    input: [[[[[[['x']]]]]], isx, [], []],
    expected: ["x"]
  },
   {
    name: "two match list",
    input: [[[['x']], [['a']], 'x'], isx, [], []],
    expected: ["x", 'x']
  },
  {
    name: "three match nested list",
    input: [['a',[[[[['x']]]]], [[[[[[['x']]]]]]], [[[[["x"]]]]]], isx, [], []],
    expected: ["x", "x", "x"]
  },
].forEach(function(td){
  var actual = find(td.input[0], td.input[1], td.input[2], td.input[3])
  var pass = actual.join('') === td.expected.join('')
  if (pass){
    console.log(td.name, "passed")
  }else{
    console.log(td.name, "failed")
    console.log("actual:", actual)
    console.log("expected:", td.expected)
    process.exit()
  }
})