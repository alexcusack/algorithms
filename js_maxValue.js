// Write a function that returns the maximum value in a list
// reduce(function(index, value){ // }, "type of the desired output")

var findMax = function(list){
  return list.reduce(function(currentMax, currentNumber){
    return currentNumber > currentMax ? currentNumber : currentMax
  }, 0)
}

console.log(findMax([1,3,4,5,6,2]) === 6)
console.log(findMax([9,3,4,5,6,2]) === 9)
console.log(findMax([2]) === 2)
