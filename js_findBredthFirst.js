// find a single element, breadth first
// input: a list and a matcher
// output: a list
var find = function(leafOrBranch, matcher, queue){
  // console.dir(leafOrBranch, {depth: null})
  for (var i = 0; i < leafOrBranch.length; ++i) {
    if (leafOrBranch[i].reduce)   { queue.push(leafOrBranch[i]) }
    if (matcher(leafOrBranch[i])) { return [leafOrBranch[i]] }
  }
  if (queue.length === 0 ){return []}
  return find(queue.shift(), matcher, queue)
}

var isx = function(e){return e === "x"}

var find = function(leafOrBranch, matcher, matches, queue){
  // console.dir(leafOrBranch, {depth: null})
  for (var i = 0; i < leafOrBranch.length; ++i) {
    if (leafOrBranch[i].reduce)   { queue.push(leafOrBranch[i]) }
    if (matcher(leafOrBranch[i])) { matches.push(leafOrBranch[i]) }
  }
  if (queue.length === 0 ){return matches}
  return find(queue.shift(), matcher, matches, queue)
}


;[
  {
    name: "single element, match",
    input: [["x"], isx, [], []],
    expected: ["x"]
  },
  {
    name: "single match nested list, fail",
    input: [[[[[[['m']]]]]], isx, [], []],
    expected: []
  },
   {
    name: "double nested list",
    input: [[[[[[[['x']]]]]], [['a']], [['x']]], isx, [], []],
    expected: ["x", "x"]
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