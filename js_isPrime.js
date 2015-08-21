// write isPrime(n) function
// whether n is a multiple of an integer m between 2 and \sqrt{n}.

// input: Number
// output: boolean

var rangeOfPrimes = function(number){
  range = []
  for(var i = 2; i <= Math.sqrt(number); ++i){
    range.push(i)
  }
  return range
}

var MEMO = {} // there's gotta be a way to memoize this for speed

var isPrime = function(number){
  return rangeOfPrimes(number).reduce(function(carry, currentValue){
    if (number % currentValue === 0){
      return false
    }else{
      return true
    }
  }, false)
}

console.log(isPrime(100) === false)
console.log(isPrime(7)   === true )
console.log(isPrime(11)  === true )
console.log(isPrime(1119287291983748) )