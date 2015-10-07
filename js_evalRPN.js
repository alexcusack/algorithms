
// ["2", "1", "+", "3", "*"] => 6
var mapOfFunctions ={
  '+': function(x,y){return x + y},
  '-': function(rhs, lhs){return lhs - rhs },
  '*': function(x,y){return x * y},
  '/': function(rhs, lhs){return lhs/rhs }
}


const evalRPN = (array) => {
  return array.reduce(reducer, [])[0]
}

// [2,1], "+" => [3]
const reducer = (stack, token)=>{
  const parsedToken = parseInt(token)
  if (isNaN(parsedToken)){ /* an operator */
    stack.push(mapOfFunctions[token](stack.pop(), stack.pop()))
  }else{ /* a number */
    stack.push(parsedToken)
  }
  return stack
}



;[ {
    name: "double",
    input: ['2','2','+','1','-'],
    expected: 3
  },
  {
    name: "double",
    input: ['2','3','*','1','-'],
    expected: 5
  },
].forEach(function(td){
  var actual = evalRPN(td.input)
  var pass = actual === td.expected // no nesting so this is 'fine'
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