// - write a function that takes a decimal number (42) and returns a string of binary digits (“101010”), using a stack

// "public"
// (num) -> str
var base10tobase2String = function(base10number){
  return base10tobase2list(base10number, []).join('')
}

// "internal"
// (num, list) -> list
var base10tobase2list = function(number, binaryArray){
  binaryArray = binaryArray || []
  binaryArray.unshift(number%2) /* for numbers evenly divisible by 2, add 0 to start of binaryArray, else add 1 to start  */
  if (number <= 1) { return binaryArray }
  return base10tobase2list(Math.floor(number/2), binaryArray)
}


;[
  {
    name: "0 to binary",
    input: 0,
    expected: "0",
  },
  {
    name: "1 to binary",
    input: 1,
    expected: "1",
  },
  {
    name: "2 to binary",
    input: 2,
    expected: "10",
  },
  {
    name: "3 to binary",
    input: 3,
    expected: "11",
  },
  {
    name: "4 to binary",
    input: 4,
    expected: "100",
  },
  {
    name: "10 to binary",
    input: 10,
    expected: "1010",
  },
  {
    name: "44 to binary",
    input: 44,
    expected: "101100",
  },
    {
    name: "876 to binary",
    input: 876,
    expected: "1101101100",
  },
  {
    name: "8300482 to binary",
    input: 8300482,
    expected: "11111101010011111000010",
  },
].forEach(function(td){
  var actual = base10tobase2String(td.input)
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