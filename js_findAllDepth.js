// find all matches in a tree, depth first

// depth first search
// var find = function(leafOrBranch, matcher, matches){
//   if (!leafOrBranch.reduce) { return matcher(leafOrBranch) ? matches.push(leafOrBranch) : matches}
//   var stack = leafOrBranch
//   while (stack.length > 0 ) {
//     var head = stack.shift()
//     find(head, matcher, matches)
//   }
//   return matches
// }

// if the element is a list then add it to the stack and come back to it later

// bredth first
var find = function(leafOrBranch, matcher, matches, stack){
  console.log(leafOrBranch)
  if (leafOrBranch.reduce) { stack.push(leafOrBranch.slice(1)) }
  if (!leafOrBranch.reduce){ return matcher(leafOrBranch) ? matches.push(leafOrBranch) : matches}
  var head = leafOrBranch[0]
  if (stack[0] === undefined){return matches}
  return find(head, matcher, matches, stack)
}

var isx = function(e){return e === "x"}


;[
  {
    name: "single element, match",
    input: [["x"], isx, [], []],
    expected: ["x"]
  },
  // {
  //   name: "single element, no match:",
  //   input: ["m", isx, [], []],
  //   expected: undefined
  // },
  // {
  //   name: "empty list",
  //   input: [[], isx, [], []],
  //   expected: undefined
  // },
  {
    name: "single match nested list",
    input: [[[[[[['x']]]]]], isx, [], []],
    expected: ["x"]
  },
   {
    name: "two match list",
    input: [['x', 'a', 'x'], isx, [], []],
    expected: ["x", 'x']
  },
  {
    name: "three match nested list",
    input: [['a',[[[[['x']]]]], [[[[[[['x']]]]]]], [[[[["x"]]]]]], isx, [], []],
    expected: ["x", "x", "x"]
  },
].forEach(function(td){
  var actual = find(td.input[0], td.input[1], td.input[2], td.input[3])
  var pass = actual === td.expected
  if (pass){
    console.log(td.name, "passed")
  }else{
    console.log(td.name, "failed")
    console.log("actual:", actual)
    console.log("expected:", td.expected)
    process.exit()
  }
})