// What are all the handshakes that would occur if n people all shook hands?
// (Design and model this problem first)

// Input: number
// Output: Array
var range = function(number){
  range = []
  for(var i = number; i >= 1; --i){
    range.push(i)
  }
  return range
}


// Input: Number
// Output: Number
var handShakes = function(numberOfPeople){
  return range(numberOfPeople-1).reduce(function(carry, currentValue){
    return carry = carry + currentValue
  })
}

// for some reason it's throwing an error if I run multiple tests in succession.
// console.log(handShakes(3) === 3)
// console.log(handShakes(4) === 6)
console.log(handShakes(5) === 10 )
