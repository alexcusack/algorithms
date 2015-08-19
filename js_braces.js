var key = {
  "}": "{",
  "]": "[",
  ")": "(",
}

var checkBraces = function(string){
  var array = string.split("")
  var stack = []
  array.forEach(function(brace){
    key[brace] === stack.slice(-1)[0] && key[brace] ? stack.pop() : stack.push(brace)
  })
  return stack.length >= 1 ? false : true
}

console.log(checkBraces("{[()]}") === true )
console.log(checkBraces("{([)]}") === false)
console.log(checkBraces("")       === true )
console.log(checkBraces("{]")     === false)
