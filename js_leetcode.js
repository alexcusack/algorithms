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

var addDigits = function(num) {
  if (num < 10 ){return num}
  reducedNumber = num.toString().split('').reduce(function(memo, current){
    return Math.floor(current) + Math.floor(memo)
  }, 0)
  return reducedNumber < 10? reducedNumber : addDigits(reducedNumber)
};


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
//   {
//     name: 'empty node',
//     input: [],
//     expected: [],
//   },
//   {
//     name: 'single element node',
//     input: [1],
//     expected: ['1'],
//   },
//   {
//     name: 'one level tree',
//     input: [1, [2]],
//     expected: ["1->2"]
//   },
//   {
//     name: 'two level tree',
//     input: [1, [2, 3]],
//     expected: ["1->2->3"]
//   },
//   {
//     name: 'three level tree',
//     input: [1, [2, 3, 4]],
//     expected: ["1->2->3->4"]
//   },
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
//     // process.exit()
//   }
// })


//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////


// Given two strings s and t, write a function to determine if t is an anagram of s.
// For example,
// s = "anagram", t = "nagaram", return true.
// s = "rat", t = "car", return false.

var isAnagram = function(s, t) {
    return s.split('').sort().join('') === t.split('').sort().join('')
};


//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// leaf or branch
// either single element or multi.
  // if multi, reverse
  // pass the branch back recursively


var binaryTreePaths = function(treeNode) {
  if (treeNode === undefined ){ return [] }
  if (/* leaf */ !treeNode.reduce){ return treeNode }
  return treeNode.reduce(function(memo, currentNode){
    if (/* leaf */ !currentNode.reduce){ return memo.concat(currentNode) }
    if (currentNode.length > 0){ currentNode.reverse() }
    var head = [currentNode[0]]
    var rest = currentNode.slice(1)
    return memo.concat([binaryTreePaths(head).concat(binaryTreePaths(rest))])
  }, [])
}

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

// ;[
//     {
//       name: 'empty',
//       input: [],
//       expected: "",
//     },
//     {
//       name: 'single number ',
//       input: [1],
//       expected: "1",
//     },
//     {
//       name: 'two numbers',
//       input: [1,9],
//       expected: "91",
//     },
//    {
//     name: 'three numbers',
//     input: [1,4,7,2],
//     expected: "7421",
//   },
//     {
//     name: 'double digit numbers',
//     input: [10,2],
//     expected: "210",
//   },
//    {
//     name: 'large digit numbers',
//     input: [2048],
//     expected: "2048",
//   },
//    {
//     name: 'large digit numbers',
//     input: [128,12],
//     expected: "12812",
//   },

// ].forEach(function(td){
//   var actual = largestNumber(td.input)
//   var pass = actual === td.expected
//   if (pass){
//     console.log("passed:", td.name)
//   }else{
//     console.log("failed:", td.name)
//     console.log("actual:  ", actual)
//     console.log("expected:", td.expected)
//     process.exit()
//   }
// })



//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Given an array of numbers nums, in which exactly two elements appear only once and all the other elements appear exactly twice. Find the two elements that appear only once.
// For example:
// Given nums = [1, 2, 1, 3, 2, 5], return [3, 5].



var singleNumber = function(nums) {
  return Object.keys(nums.reduce(function(trackingHashes, currentNumber){
      if (/* number already added? */ trackingHashes[1][currentNumber.toString()] ){
        trackingHashes[1][currentNumber] = currentNumber.toString()
        delete trackingHashes[0][currentNumber.toString()]// remove value from final return hash
        return trackingHashes
      } else { /* add value to both trackingHashes */
        trackingHashes[0][currentNumber] = currentNumber.toString()
        trackingHashes[1][currentNumber] = currentNumber.toString()
      }
      return trackingHashes
    }, [{/* Final return */}, {/* tracking */}])[0]).reduce(
    /* convert keys to ints */function(output,currNum){return output.concat(Math.floor(currNum))},[])
}

// console.log(singleNumber([1, 2, 1, 3, 2, 5]))
// console.log(singleNumber([0,0,0,1,2]))

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Given an array containing n distinct numbers taken from 0, 1, 2, ..., n, find the one that is missing from the array.
// For example,
// Given nums = [0, 1, 3] return 2.
// current difference
// does it match the previous difference? then we're good
// no? does it match the difference two spots ago? -- then actual difference = currentdiffere. Missing num = p

var missingNumber = function(nums) {
  if (nums.length === 1){return 1-nums[0]}
  var onePreviousDifference
  var twoPreviousDifference
  var missingNumber
  if (nums.length === 2){ missingNumber = (nums[1] - nums[0])+(nums[1])
    return missingNumber < 0 ? missingNumber*(-1) : missingNumber
  }
  for (var i = 0; i < nums.length; ++i){
    if (/* initialize */ onePreviousDifference === undefined){ onePreviousDifference = nums[i+1] - nums[i]; twoPreviousDifference = onePreviousDifference }
    var currentDifference = nums[i+1] - nums[i]
    if (currentDifference === onePreviousDifference){
      onePreviousDifference = currentDifference
      twoPreviousDifference = onePreviousDifference
    }else{//miss found
      if(currentDifference === twoPreviousDifference ){
        missingNumber = twoPreviousDifference + currentDifference
        return missingNumber < 0 ? missingNumber*(-1) : missingNumber
      } else {
        console.log('lap')
        missingNumber = onePreviousDifference + twoPreviousDifference
        return missingNumber < 0 ? missingNumber*(-1) : missingNumber
      }
    }
  }
};


var missingNumber = function(nums){
  if (nums.length === 1){return 1-nums[0]}
  var count = nums.length
  var sum = 0
  for (var i = 0; i < count; ++i){
    sum = sum + i
    sum = sum - nums[i]
  }
  return sum+count
}



///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

// nums to words

KEY =
[
  [90, "Ninety"],
  [80, "Eighty"],
  [70, "Seventy"],
  [60, "Sixty"],
  [50, "Fifty"],
  [40, "Forty"],
  [30, "Thirty"],
  [20, "Twenty"],
  [19, "Nineteen"],
  [18, "Eighteen"],
  [17, "Seventeen"],
  [16, "Sixteen"],
  [15, "Fifteen"],
  [14, "Fourteen"],
  [13, "Thirteen"],
  [12, "Twelve"],
  [11, "Eleven"],
  [10, "Ten"],
  [9, "Nine"],
  [8, "Eight"],
  [7, "Seven"],
  [6, "Six"],
  [5, "Five"],
  [4, "Four"],
  [3, "Three"],
  [2, "Two"],
  [1, "One"],
]

var numberToWords = function(number){
  var outputString = ""
  if (number === 0 ){return outputString.concat("Zero")}
  if (number >= 1000000000){
      outputString = outputString.concat(numberToWords(number/1000000000), " ", 'Billion ')
      number = number%1000000000
  }

  if (number >= 1000000){
      outputString = outputString.concat(numberToWords(number/1000000), " ", 'Million ')
      number = number%1000000
  }
  if (number >= 1000){
      outputString = outputString.concat(numberToWords(number/1000), " ", 'Thousand ')
      number = number%1000
  }
  if (number >= 100) {
      outputString = outputString.concat(numberToWords(number/100), " ", "Hundred ")
      number = number%100
  }
  KEY.forEach(function(keyPair){
    if (number  / keyPair[0] >= 1){
      outputString = outputString.concat(keyPair[1], " ")
      number = number % keyPair[0]
    }
    if (number === 0) {return outputString.trim()}
  })
  return outputString.trim()
}


// ;[
//   {
//     name: "single digit",
//     input:  0,
//     expected: "zero"
//   },
//   {
//     name: "two digit",
//     input:  10,
//     expected: "ten"
//   },
//   {
//     name: "two word digit",
//     input:  24,
//     expected: "twenty four"
//   },
//   {
//     name: "three word digit",
//     input:  124,
//     expected: "one-hundred twenty four"
//   },
//   {
//     name: "four word digit",
//     input:  1109,
//     expected: "one-thousand one-hundred nine"
//   },
// ].forEach(function(td){
//   var actual = numsToWords(td.input)
//   var pass = actual === td.expected
//   if(pass){
//     console.log("passed", td.name)
//   }else{
//     console.log("failed", td.name)
//     console.log("actual", actual)
//     console.log("expected", td.expected)
//     process.exit()
//   }
// })


///////////////////////////////////////////////////////
///////////////////////////////////////////////////////


// Write an efficient algorithm that searches for a value in an m x n matrix. This matrix has the following properties:

// Integers in each row are sorted in ascending from left to right.
// Integers in each column are sorted in ascending from top to bottom.
// For example,

// Consider the following matrix:
// [
//   [1,   4,  7, 11, 15],
//   [2,   5,  8, 12, 19],
//   [3,   6,  9, 16, 22],
//   [10, 13, 14, 17, 24],
//   [18, 21, 23, 26, 30]
// ]
// Given target = 5, return true.
// Given target = 20, return false.
// need to do a binary search dynamically resizing the grid I'm looking in.
var Targetmatrix = [
  [1,   4,  7, 11, 15],
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
]
var findInMatrix = function(target, matrix, rowMiddle, columnMiddle){
  console.log("matrix", matrix)
  if (matrix.length === 0 || matrix[0].length === 0){ return false}
  if (matrix.length === 1) {console.log("returning")
    if (/* single num */ !matrix[0].length){ return matrix[0] === target}
    return findInMatrix(target, matrix[0])
  }
  var midRow = Math.floor(matrix.length/2)
  var midColumn = Math.floor(matrix[0].length/2)
  var middleValue = matrix[midRow][midColumn]
  if (middleValue === target){ return true }
  if (middleValue < target){ // look right and down
  return findInMatrix(/* check down */ target, matrix.slice(midRow+1, matrix.length)) ||
        matrix.forEach(function(row){/* check right in rows */ findInMatrix(target, row.slice(midColumn+1, row.length))
        })
  }
  /* check left and up */
  return findInMatrix(/* check up *///target, matrix.slice(0, midRow))

        // matrix.map(function(row){ console.log(row); findInMatrix(target, row.slice(0, midColumn+1))})
}


console.log(findInMatrix(5, Targetmatrix))

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

// compute overlapping area of two rectangles
// x1: a
// x2: c
// y1: b
// y2: d

// x1: e
// x2: g
// y1: f
// y2: h

// var computeArea = function(A, B, C, D, E, F, G, H) {
//   var r1MaxX = A >= C ? A : C
//   var r1MinX = r1MaxX === A ? C : A

//   var r1MaxY = B >= D ? B : D
//   var r1MinY = B === r1MaxY? D : B

//   var r2MaxX = E >= G ? E : G
//   var r2MinX = r2MaxX === E ? G :E

//   var maxYR2 = F >= H ? F : H
//   var minYR2 = maxYR2 === F? H : H
//   if (r1MaxX < r2MinX || r1MinX > r2MaxX) {return false}
//   if (r1MaxY < minYR2 || r1MinY > maxYR2) {return false}

//   var xStart = A >= E ? A : E
//   var xEnd   = C <= G ? C : G
//   var yStart = B >= F ? B : F
//   var yEnd   = D <= H ? D : H

//   return (xEnd - xStart)*(yEnd - yStart) // get absolute value.

// };

// console.log(computeArea(-3, 0, 3, 4, 0, -2, 9, -1) === false)
// console.log(computeArea(-3, 0, 3, 4, 0, -2, 9, 2)  === 6)


///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
// find the kth largest element in an array

// var findLargestElements = function(nums, k) {
//  return nums.reduce(function(largestElements, currentElement){

//     if (/* empty list */ largestElements.length === 0) {return largestElements.concat(currentElement) }

//     if (/* current larger than currentLargest */ currentElement >= largestElements[0]){
//       largestElements.unshift(currentElement)/* append to list of largest */
//       if (/* lenghth greater than allowed? */ largestElements.length > k) { largestElements.pop() /* remove current smallest */ }
//       return largestElements
//     }

//     if (/* current larger than least large of K */ currentElement >= largestElements[largestElements.length-1]){
//       var i = largestElements.length - 1
//       while (largestElements[i] < currentElement){
//         /* iterate to find where current < number from list of largest */
//         --i
//       }
//       var temp = largestElements.splice(i+1) /* split list of largest */
//       largestElements = largestElements.concat(currentElement, temp) /* insert new number and concat two lists */
//       if (/* lenghth greater than allowed? */ largestElements.length > k){largestElements.pop() /* remove current smallest */}
//       return largestElements
//     }

//     if (largestElements.length < k ){ return largestElements.concat(currentElement) }
//     return largestElements
//   },[]).pop() /* return the kth largest element from list */
// }


// console.log(findLargestElements([3,2,1,5,6,4], 2)   === 5)
// console.log(findLargestElements([3,2,1,5,6,4,7], 4) === 4)
// console.log(findLargestElements([1,2], 1) === 2)
// console.log(findLargestElements([1,2], 2) === 1)
// console.log(findLargestElements([0], 0)   === 0)



///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

// var isHappy = function(n, appeared) {
//     appeared = appeared || {}
//     newTotal = n.toString().split('').reduce(function(newSum, currentNum){
//         return newSum + Math.pow(parseInt(currentNum), 2) // reduce number to digits, raise each to pow 2, combine
//     },0)
//     if (newTotal === 1){ return true } /// number has been reduced to 1
//     if (appeared[newTotal]) { return false}// false if numbers start repeating
//     appeared[newTotal] = true // add to log of appeared numbers
//     return isHappy(newTotal, appeared)
// };

//this one is working but not passing on leetcode for some reason. not sure why...
// console.log(isHappy(28))
// console.log(isHappy(1))
// console.log(isHappy(13))
// console.log(isHappy(82))


// var simplifyPath = function(path) {
//     var output = []
//     var split = path.split('')
//     for (var i = split.length-1; i >= 0; --i ){
//       if (split[i] === "/"){ output.unshift(split[i]); return output.join('') }
//       output.concat(split[i])
//     }
//   return output.join('')
// };

// console.log(simplifyPath("/"))