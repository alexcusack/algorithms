
// Given a positive integer n, find the least number of perfect square numbers (for example, 1, 4, 9, 16, ...)
// which sum to n.
// For example, given n = 12, return 3 because 12 = 4 + 4 + 4; given n = 13, return 2 because 13 = 4 + 9.

function leastNumber(number){
  /* find largest perfect square relative to number */
  var orginalNumber = number
  var options = []
  /* not a perfect sqaure */
  while (!perfectSquare(number)){
    --number
  }
  /* found pefect square */
  if (/* remainer perfect */ perfectSquare(orginalNumber - number)){ return [number, (orginalNumber-number)]}
}



function perfectSquare(number){
  var result = Math.sqrt(number)
  return result % 1 === 0
}

;[
 {
    name: "test 0",
    input: 12,
    expected: [4,4,4,4]
  },

].forEach(function(td){
  var actual = leastNumber(td.input)
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