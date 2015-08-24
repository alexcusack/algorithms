// // Write a function that returns the first matching element in a list
// // input: a element and an array
// // output: a single element
// var findElement = function(element, list){
//   for (var i = 0; i <= list.length; ++i){
//     if (list[i] === element){return list[i]}
//   }
// }

// // console.log("Basic Match")
// // console.log(findElement(3, [1,2,4,3]) === 3)
// // console.log(findElement(4, [1,2,4,3]) === 4)

// // Find with a function as an argument
// // input: function that returns boolean values, a list
// // output: a single item
// var findWithFunction = function(method, list){
//   for (var i = 0; i < list.length; ++i){
//     if (method(list[i])){ return list[i] }
//   }
// }

// // Write a function that returns the first matching element in a list, but uses recursion
// // input: a function that returns boolean, a list (don't need to pass count as the function sets it)
// // output: a single element
// // var findWithRecurrsion = function(matcher, list, index){
// //   index = index || 0
// //   var currentElement = list[index]
// //   if (currentElement === undefined) {return}
// //   if (matcher(currentElement)) {return currentElement}
// //   return findWithRecurrsion(matcher, list, ++index)
// // }

// // console.log(findWithRecurrsion(isOdd,[0,2,2,4,4]) === undefined )
// // console.log(findWithRecurrsion(isOdd,[0,1,3,4,5]) === 1)


// // Write a function that returns the first matching element in a list of lists -
// // i.e. a "nested list" also known as a tree
// // input: list of lists, a function that returns a boolean
// // output: a single element

// var nestedListSearch = function(method, listOfLists){
//   for(var i = 0; i < listOfLists.length; ++i){
//     var found = findWithRecurrsion(method, listOfLists[i])
//     if (found !== null ) {return found}
//   }
// }

// console.log(nestedListSearch(isOdd, [[0,2,2,4,4], [0,1,3,4,5]]) === 1)
// console.log(nestedListSearch(isOdd, [[0,2,2,4,4], [0,2,2,4,6]]) === undefined)


// input: a number
// output: boolean
var isOdd = function(currentValue){return currentValue % 2 !== 0}

// find element in unnested list
var findSingleElement = function(list, matcher){
  var head = list[0]
  if (head === undefined){return}
  return matcher(head) ? head : find(list.slice(1) ,matcher)
}

// find element bredth first over nested list of lists
var find = function(leafOrBranch, matcher){
  // console.dir(leafOrBranch, {depth: null})
  if(/*is a leaf?*/ !leafOrBranch.reduce){ return matcher(leafOrBranch) ? leafOrBranch : undefined }
  if(/*is an empty branch?*/leafOrBranch.length === 0){return}
  var head = leafOrBranch[0]
  var rest = leafOrBranch.slice(1)
  return find(head, matcher) || find(rest, matcher)
}

// bredth first
// var find = function(node, matcher){
//   console.dir(node, {depth: null})
//   if(/*is a leaf?*/ node && !node.reduce){ return matcher(node) ? node : undefined }
//   if(/*is an empty branch?*/node.length === 0){return}
//   var head = node[0]
//   var rest = node.slice(1)
//   return (head !== node[node.length-1] ? find(rest, matcher) : undefined )|| (find(head, matcher) || find(rest, matcher))
// }




// var isx = function(e){return e[0] === "x"}

;[
  // {
  //   name: "single element, match",
  //   input: ["x", isx],
  //   expected: "x"
  // },
  // {
  //   name: "single element, no match:",
  //   input: ["m", isx],
  //   expected: undefined
  // },
  // {
  //   name: "empty list",
  //   input: [[], isx],
  //   expected: undefined
  // },
  // {
  //   name: "single element list",
  //   input: [['x'], isx],
  //   expected: "x"
  // },
  //  {
  //   name: "two element list",
  //   input: [['a', 'x'], isx],
  //   expected: "x"
  // },
  // {
  //   name: "single nest element list",
  //   input: [['a', ['x']], isx],
  //   expected: "x"
  // },
  //  {
  //   name: "double nest element list",
  //   input: [['a', [['x']]], isx],
  //   expected: "x"
  // },
  //  {
  //   name: "also nest element list",
  //   input: [[[[[['a']]]], [['x']]], isx],
  //   expected: "x"
  // },
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


// console.log('Is Odd conditional test')
// console.log(isOdd(4) === false)
// console.log(isOdd(5) === true)

// console.log("Function match")
// console.log(findWithFunction(isOdd,[0,2,3,4,5]) === 3)
// console.log(findWithFunction(isOdd,[2,2,2,4,2]) === undefined)
// console.log("Recursion match")
// console.log(findWithRecurrsion(isOdd,[0,2,2,4,4]) === null )
// console.log(findWithRecurrsion(isOdd,[0,1,3,4,5]) === 1)
// console.log(nestedListSearch(isOdd, [[0,2,2,4,4], [0,1,3,4,5]]) === 1)
// console.log(nestedListSearch(isOdd, [[0,2,2,4,4], [0,2,2,4,6]]) === "value not found")
