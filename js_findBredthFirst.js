// find a single element, breadth first
var find = function(leafOrBranch, matcher, queue){
  console.dir(leafOrBranch, {depth: null})
  for (var i = 0; i < leafOrBranch.length; ++i){
    if (leafOrBranch[i].reduce)   { queue.push(leafOrBranch[i]) }
    if (matcher(leafOrBranch[i])) { console.log('found!') ; return [leafOrBranch[i]] }
  }
  if (queue.length === 0 ){return }
  return find(queue.shift(), matcher, queue)
}

var isx = function(e){return e === "x"}

;[
  // {
  //   name: "single element, match",
  //   input: [["x"], isx, []],
  //   expected: ["x"]
  // },
  // {
  //   name: "single match nested list",
  //   input: [[[[[[['x']]]]]], isx, []],
  //   expected: ["x"]
  // },
   {
    name: "two match list",
    input: [[[['b']], [['a']], [[[['x']]]]], isx, []],
    expected: ["x"]
  },
  // {
  //   name: "three match nested list",
  //   input: [['a',[[[[['x']]]]], [[[[[[['x']]]]]]], [[[[["x"]]]]]], isx, []],
  //   expected: ["x"]
  // },
].forEach(function(td){
  var actual = find(td.input[0], td.input[1], td.input[2], td.input[3])
  var pass = actual === td.expected
  if (pass){
    console.log(td.name, "passed")
  }else{
    console.log(td.name, "failed")
    console.log("actual:", actual)
    console.log("expected:", td.expected)
    // process.exit()
  }
})