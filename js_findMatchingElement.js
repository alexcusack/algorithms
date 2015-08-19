// Write a function that returns the first matching element in a list
// input: a element and an array
// output: a single element and it's index --> What's the best way to exit a forEach?
var findElement = function(element, list){
  for (var i = 0; i <= list.length; ++i){
    if (list[i] === element){return list[i]}
  }
}

// Find with a function as an argument
// input: function that returns boolean values, a list
// output: a single item
var findWithFunction = function(method, list){
  for (var i = 0; i <= list.length; ++i){
    if (method(list[i])){ return list[i] }
  }
  console.log('why dont i run')
}

// Write a function that returns the first matching element in a list, but uses recursion
// input: a function that returns boolean, a list (don't need to pass count as the function sets it)
// output: a single element
var findWithRecurrsion = function(method, list, count){
  if (count === undefined) { count = 0}
  var currentElement = list[count]
  if (currentElement === undefined) {return null}
  if (method(currentElement)) {return currentElement}
  return findWithRecurrsion(method, list, ++count)
}


// Write a function that returns the first matching element in a list of lists -
// i.e. a "nested list" also known as a tree
// input: list of lists, a function that returns a boolean
// output: a single element

var nestedListSearch = function(method, listOfLists){
  for(var i = 0; i < listOfLists.length; ++i){
    var found = findWithRecurrsion(method, listOfLists[i])
    if (found !== null ) {return found}
  }
  return "value not found"
}

// input: a number
// output: boolean
var isOdd = function(currentValue){return currentValue % 2 !== 0}


console.log('Is Odd conditional test')
console.log(isOdd(4) === false)
console.log(isOdd(5) === true)
console.log("Basic Match")
console.log(findElement(3, [1,2,4,3]) === 3)
console.log(findElement(4, [1,2,4,3]) === 4)
console.log("Function match")
console.log(findWithFunction(isOdd,[0,2,3,4,5]) === 3)
console.log(findWithFunction(isOdd,[0,2,2,4,0]) === undefined)
console.log("Recursion match")
console.log(findWithRecurrsion(isOdd,[0,2,2,4,4]) === null )
console.log(findWithRecurrsion(isOdd,[0,1,3,4,5]) === 1)
console.log(nestedListSearch(isOdd, [[0,2,2,4,4], [0,1,3,4,5]]) === 1)
console.log(nestedListSearch(isOdd, [[0,2,2,4,4], [0,2,2,4,6]]) === "value not found")
