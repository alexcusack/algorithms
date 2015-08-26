// find single element, depth first
// input: list, matcher
// output: single element

var find = function(leafOrBranch, matcher){
  // console.dir(leafOrBranch, {depth: null})
  if(/*is a leaf?*/ !leafOrBranch.reduce){ return matcher(leafOrBranch) ? leafOrBranch : undefined }
  if(/*is an empty branch?*/leafOrBranch.length === 0){return}
  var head = leafOrBranch[0]
  var rest = leafOrBranch.slice(1)
  return find(head, matcher) || find(rest, matcher)
}


var isx = function(e){return e[0] === "x"}

;[
  {
    name: "single element, match",
    input: ["x", isx],
    expected: "x"
  },
  {
    name: "single element, no match:",
    input: ["m", isx],
    expected: undefined
  },
  {
    name: "empty list",
    input: [[], isx],
    expected: undefined
  },
  {
    name: "single element list",
    input: [['x'], isx],
    expected: "x"
  },
   {
    name: "two element list",
    input: [['a', 'x'], isx],
    expected: "x"
  },
  {
    name: "single nest element list",
    input: [['a', ['x']], isx],
    expected: "x"
  },
   {
    name: "double nest element list",
    input: [['a', [['x']]], isx],
    expected: "x"
  },
   {
    name: "also nest element list",
    input: [[[[[['a']]]], [['x']]], isx],
    expected: "x"
  },
    {
    name: "test bredth first",
    input: [[[[[['x1']]]], "x2", [['a']]], isx],
    expected: "x2"
  },
].forEach(function(td){
  var actual = find(td.input[0], td.input[1])
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