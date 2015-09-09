var countDigitOne = function(n) {
  if (n < 1)   { return 0 }
  if (n < 10)  { return 1 }
  if (n === 10){ return 2 }
  if (n > 10 && n < 20){ var total =  n-10+3 }
  if (n >= 20) {
    var total = 10 + Math.floor(n/10)
    if (total < (n/10)+10){++total }
  }
   return total
}


console.log(countDigitOne(1)  === 1)
console.log(countDigitOne(10) === 2)
console.log(countDigitOne(11) === 4)
console.log(countDigitOne(20) === 12)
console.log(countDigitOne(21) === 13)
console.log(countDigitOne(30) === 13)


var y = 20
while ( y > 0){
  console.log(y, '=', y/10)
  --y
}


//   1
//   2
//   3
//   4
//   5
//   6
//   7
//   8
//   9
// — 1

// 10-20 = 11

// 21
// 22
// 23
// 24
// 25
// 26
// 27
// 28
// 29
// 30
// -1

// 31

// n/10 == if 20