var closeBraceMap = { /* closing brace to corresponding open brace */
  "}": "{",
  "]": "[",
  ")": "(",
}

var openBraceSet = { /* closing brace to corresponding open brace */
  "{": true,
  "[": true,
  "(": true,
}

var checkBraces = function(string, stack){
  stack = stack || []
  var characters = string.split("")
  var firstChar = characters.shift()
  if (/* string empty? */ firstChar === undefined) { return /* all braces match? */ stack.length === 0 }
  if (/* is close brace */ closeBraceMap[firstChar] ) {
    if (/* closer matches last opener */ closeBraceMap[firstChar] === stack.slice(-1)[0]){ stack.pop() }
    else{ return false}
  }
  else /* not a closer */ {
    if ( /* is an open brace */ openBraceSet[firstChar] ) { stack.push(firstChar) }
  }
  return checkBraces(characters.join(''), stack)
}

;[
  {
    name: "single set test",
    input: "()",
    expected: true,
  },
  {
    name: "triple set test",
    input: "()[{}]",
    expected: true,
  },
  {
    name: "triple set, with non braces test",
    input: "()[a{b}a]",
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
    console.log("passed: ", td.name)
  }else{
    console.log('failed ', td.name)
    console.log("actual: ", actual )
    console.log("expected: ", td.expected )
    process.exit()
  }
})