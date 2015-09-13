// Find the sum of all the multiples of 3 or 5 below 1000.


// var findSum = function(number, sum){
//   console.log(sum)
//   if (sum === undefined){ sum = 0 }
//   if (number === 0){ return sum }
//   if (number % 15 === 0){ sum = sum + number }
//   else if (number % 5 === 0){sum = sum + number }
//   else if (number % 3 === 0){sum = sum + number }
//   --number
//   return (findSum(number, sum))
// }

// console.log(findSum(999))


// var sumSequence = function(maxNumber){
//   var twoprevious = 0
//   var previous = 1
//   var sumOfEvens = 0
//   var number = 0
//   while (number < maxNumber){
//     console.log(number)
//     number = twoprevious + previous
//     twoprevious = previous
//     previous = number
//     if (isEven(number)) {sumOfEvens = sumOfEvens + number}
//   }
// return sumOfEvens
// }

// function isEven(number){return number % 2 === 0 }

// console.log(sumSequence(4000000))



var largestPrime = function(number){
  var possibleNumber = Math.floor(number/2)
  while (possibleNumber > 5){
    console.log('looping  ')
    if (isPrime(possibleNumber)){ return possibleNumber}
    --possibleNumber
  }
  return possibleNumber
}

function isPrime(n){
  if (isNaN(n) || !isFinite(n) || n%1 || n<2) return false;
  if (n%2==0) return (n==2);
  if (n%3==0) return (n==3);
  var m=Math.sqrt(n);
  for (var i=5;i<=m;i+=6) {
    if (n%i==0)     return false;
    if (n%(i+2)==0) return false;
  }
  return true;
}

console.log(largestPrime(600851475143))

console.log(isPrime(300425737531))