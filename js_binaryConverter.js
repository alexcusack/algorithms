// - write a function that takes a decimal number (42) and returns a string of binary digits (“101010”), using a stack

var binaryConverter = function(number, binaryArray){
  binaryArray.unshift(number%2)
  var remainder = Math.floor(number/2)
  return number > 0 ? binaryConverter(remainder, binaryArray) : binaryArray.join('')
}

;[
  {
    name: "0 to binary",
    input: 0,
    expected: "0",
  },
  {
    name: "42 to binary",
    input: 42,
    expected: "0101010",
  },
  {
    name: "10 to binary",
    input: 10,
    expected: "01010",
  },
  {
    name: "4 to binary",
    input: 4,
    expected: "0100",
  },
  {
    name: "44 to binary",
    input: 44,
    expected: "0101100",
  },
    {
    name: "876 to binary",
    input: 876,
    expected: "01101101100",
  },
  {
    name: "8300482 to binary",
    input: 8300482,
    expected: "011111101010011111000010",
  },
].forEach(function(td){
  var actual = binaryConverter(td.input, [])
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