var key = {
  "}": "{",
  "]": "[",
  ")": "(",
}

var checkBraces = function(string, stack){
  if (stack === undefined) { stack = [] }
  var array = string.split("")
  var brace = array.shift()
  if (brace === undefined){ return stack.length === 0 }
  key[brace] === stack.slice(-1)[0] && key[brace] ? stack.pop() : stack.push(brace)
  return checkBraces(array.join(''), stack)
}

;[
  {
    name: "single set test",
    input: "()",
    expected: true,
  },
  {
    name: "double set test",
    input: "()[]",
    expected: true,
  },
  {
    name: "fail test",
    input: "([}])",
    expected: false,
  },
].forEach(function(td){
  var actual = checkBraces(td.input)
  var pass = actual === td.expected
  if (pass){
    console.log(td.name, "passed")
  }else{
    console.log('error')
    console.log("actual: ", actual )
    console.log("expected: ", td.expected )
    process.exit()
  }
})