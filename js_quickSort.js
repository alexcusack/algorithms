/* pick pivot */
/* sort pivot */
/* sort left */
/* sort right */
/* sort left of right */

function palindrome(string){
  var stack  = []
  string.split('').sort().map(function(character){
    if (character === ' ') {return }
    stack[stack.length -1] === character ? stack.pop() : stack.push(character)
  })
  return stack.length <= 1
}

function editsAway(origin, target){
  var length = origin.length
  var i = 0
  origin.split('').map(function(character){
    if (target.charAt(i++) === character) { --length }
  })
  console.log(length)
  return length <= 1
}




function quickSort(array){
  if (array.length < 2) {return array}
  var pivot = array[0]
  var leftArr = []
  var rightArr = []
  for (var i = 1; i < array.length; ++i){
    array[i] < pivot ? leftArr.push(array[i]) : rightArr.push(array[i])
  }
  return quickSort(leftArr).concat(pivot, quickSort(rightArr))
}


;[
  {
    name: "empty element",
    input: [],
    expected: [],
  },
   {
    name: "one element",
    input: [1],
    expected: [1],
  },
  {
    name: "two element",
    input: [2, 1],
    expected: [1, 2],
  },
  {
    name: "n-element",
    input: [4,1,3,2],
    expected: [1,2,3,4],
  },
].forEach(function(td){
  var actual = quickSort(td.input)
  var pass = JSON.stringify(actual) === JSON.stringify(td.expected) // no nesting so this is 'fine'
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