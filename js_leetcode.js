// return the length of the last word
// if there isn't a last word return 0

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
var lengthOfLastWord = function(string){
  if (/* the string is empty or only space */ string.length === 0 || string === " "){ return 0 }
  return string.trim().split(' ').slice(-1)[0].length
}

// console.log(lengthOfLastWord("a "))

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// 2, 3, 5
// var isUgly = function(num) {
//   if (num === 1){ return true }
//   if (num <= 0 ){ return false}
//   return num / 30 === 0
// };


// console.log(isUgly(0)) //false
// console.log(isUgly(2)) //true

// 5: 5, 10, 15, 20...............30
// 2: 6, 8, 10, 12, 14... 20..... 30
// 3: 3, 6, 9, 12, 15, 18, 21, 24, 27, 30

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

// var addDigits = function(num) {
//   if (num < 10 ){return num}
//   reducedNumber = num.toString().split('').reduce(function(memo, current){
//     return Math.floor(current) + Math.floor(memo)
//   }, 0)
//   return reducedNumber < 10? reducedNumber : addDigits(reducedNumber)
// };


// console.log(addDigits(2) === 2)
// console.log(addDigits(38) === 2)

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// BinaryTree Return all Root paths:
// For example, given the following binary tree:

//    1
//  /   \
// 2     3
//  \
//   5
// All root-to-leaf paths are:

// ["1->2->5", "1->3"]
// input: node
// output: list

var binaryTreePaths = function(node){
  // root = root || node[0]
  if (/* leaf? */ !node.reduce) { return [node.toString()] }
  if (/* empty branch? */node.length === 0) { return [] }
  var head = node[0]
  var rest = node.slice(1)
  return [binaryTreePaths(head).concat(binaryTreePaths(rest)).join("->")]
}

// ;[
  // {
  //   name: 'empty node',
  //   input: [],
  //   expected: [],
  // },
  // {
  //   name: 'single element node',
  //   input: [1],
  //   expected: ['1'],
  // },
  // {
  //   name: 'one level tree',
  //   input: [1, [2]],
  //   expected: ["1->2"]
  // },
  // {
  //   name: 'two level tree',
  //   input: [1, [2, 3]],
  //   expected: ["1->2->3"]
  // },
  // {
  //   name: 'three level tree',
  //   input: [1, [2, 3, 4]],
  //   expected: ["1->2->3->4"]
  // },
//   {
//     name: 'three level tree',
//     input: [1, [2, 3, 4], [5,6,7]],
//     expected: ["1->2->3->4", "1->5->6"]
//   },
// ].forEach(function(td){
//   var actual = binaryTreePaths(td.input)
//   var pass = actual.join("") === td.expected.join("")
//   if (pass){
//     console.log("passed:", td.name)
//   }else{
//     console.log("actual:  ", actual)
//     console.log("expected:", td.expected)
//     process.exit()
//   }
// })


//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////


// Given two strings s and t, write a function to determine if t is an anagram of s.
// For example,
// s = "anagram", t = "nagaram", return true.
// s = "rat", t = "car", return false.

// var isAnagram = function(s, t) {
//     return s.split('').sort().join('') === t.split('').sort().join('')
// };


//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
var find = function(node, matcher){
  if (/* leaf? */ !node.reduce) { return matcher(node) ? [node] : [] }
  if (/* empty branch? */node.length === 0) { return [] }
  var head = node[0]
  var rest = node.slice(1)
  return find(head, matcher).concat(find(rest, matcher))
}

// leaf or branch
// either single element or multi.
  // if multi, reverse
  // pass the branch back recursively


// var binaryTreePaths = function(treeNode) {
//   if (treeNode === undefined ){ return [] }
//   if (/* leaf */ !treeNode.reduce){ return treeNode }
//   return treeNode.reduce(function(memo, currentNode){
//     if (/* leaf */ !currentNode.reduce){ return memo.concat(currentNode) }
//     if (currentNode.length > 0){ currentNode.reverse() }
//     var head = [currentNode[0]]
//     var rest = currentNode.slice(1)
//     return memo.concat([binaryTreePaths(head).concat(binaryTreePaths(rest))])
//   }, [])
// };

// ;[
//   {
//     name: 'empty tree',
//     input: [],
//     expected: [],
//   },
//   {
//     name: 'single element tree',
//     input: [1],
//     expected: [1],
//   },
//   {
//     name: 'two level tree',
//     input: [1,[2, 3, 4,5,6]],
//     expected: [1,[6,5,4, 3,2]],
//   },
//    {
//     name: 'three level tree',
//     input: [1,[2,3], [4,5,6]],
//     expected: [1,[3,2], [6,5,4]],
//   },
//     {
//     name: 'triple nesting level tree',
//     input: [1,[2,3,[2,4]], [4,5,6]],
//     expected: [1,[[4,2],3,2,], [6,5,4]],
//   },
// ].forEach(function(td){
//   var actual = binaryTreePaths(td.input)
//   var pass = JSON.stringify(actual) === JSON.stringify(td.expected)
//   if (pass){
//     console.log("passed:", td.name)
//   }else{
//     console.log("actual:  ", actual)
//     console.log("expected:", td.expected)
//     process.exit()
//   }
// })



//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

//seems that with strings it compares on a per char level. so 2 > 10 but 11 > 10
var largestNumber = function(arrayOfNums){
  if (arrayOfNums.length === 0) {return ""}
  return arrayOfNums.reduce(function(sortedNums, currentNumber){
    if (sortedNums.length === 0){ return sortedNums.concat(currentNumber) }//if empty, add directly
    var currentLargest = sortedNums[0]
    if (currentNumber.toString() >= currentLargest.toString()){
      return [currentNumber].concat(sortedNums) // add number to front
    }else if /* number is smallest */(currentNumber.toString() <= sortedNums[sortedNums.length-1].toString()){
      return sortedNums.concat(currentNumber)
    } else {//number is somewhere between high and low
      var i = sortedNums.length-1
      while ( currentNumber.toString() >= sortedNums[i].toString()){
        --i
      }
      var tail = sortedNums.splice(i+1, sortedNums.length)
      return sortedNums.concat(currentNumber, tail)
    }
  }, []).join('')
}

;[
    {
      name: 'empty',
      input: [],
      expected: "",
    },
    {
      name: 'single number ',
      input: [1],
      expected: "1",
    },
    {
      name: 'two numbers',
      input: [1,9],
      expected: "91",
    },
   {
    name: 'three numbers',
    input: [1,4,7,2],
    expected: "7421",
  },
    {
    name: 'double digit numbers',
    input: [10,2],
    expected: "210",
  },
   {
    name: 'large digit numbers',
    input: [2048],
    expected: "2048",
  },
   {
    name: 'large digit numbers',
    input: [128,12],
    expected: "12812",
  },

].forEach(function(td){
  var actual = largestNumber(td.input)
  var pass = actual === td.expected
  if (pass){
    console.log("passed:", td.name)
  }else{
    console.log("failed:", td.name)
    console.log("actual:  ", actual)
    console.log("expected:", td.expected)
    process.exit()
  }
})
