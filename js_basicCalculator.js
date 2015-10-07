


export const mapOfFunctions ={
  '+': function(x,y){return x + y},
  '-': function(lhs, rhs){return lhs - rhs },
  '*': function(x,y){return x * y},
  '/': function(rhs, lhs){return lhs/rhs }
}


export const calculate = (string) => {
  return parseInt(tokenize(string).reduce(reducer, [])[0])
}


// [2,+], '2' => [4]
export const reducer = (stack, token)=>{
  if (isDigit(token) && isOperator(peek(stack)) ){
    stack.push(mapOfFunctions[stack.pop()](parseInt(stack.pop()), parseInt(token)))
    return stack
  }

  if (token === ')'){
    const lastNumber = parseInt(stack.pop())
    stack.pop() // remove  '('
    return reducer(stack, lastNumber)
  }
  // operator, or open paren, or digit and top of stack not an operator
  stack.push(token)
  return stack
}

export const isDigit = (token) => /\d/.test(token)
export const isOperator = (token) => !!mapOfFunctions[token]
export const peek = (stack) => stack[stack.length-1]

export const tokenize = (string) => {
  return string.split('').reduce((tokens, singleToken)=>{
    debugger
    if (singleToken === ' '){ return tokens}
    if (isDigit(singleToken) && isDigit(tokens[tokens.length-1])){
      /* current token and last are numbers */
      const lastToken = tokens.pop()
      tokens.push(lastToken.concat(singleToken))
      return tokens
    }
    tokens.push(singleToken)
    return tokens
  },[])
}



if (process.env['RUN_TESTS']){

  ;[
    {
      name: "calculate 1",
      input: "1 + 1",
      expected: 2
    },
     {
      name: "calculate 2",
      input: " 2-1 + 2" ,
      expected: 3
    },
      {
      name: "calculate 3",
      input: "(1+(4+5+2)-3)+(6+8)" ,
      expected: 23
    },
  ].forEach(function(td){
    var actual = calculate(td.input)
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






  ;[
    {
      name: "reducer 1",
      input: [['2', '+'], '2'],
      expected: [4]
    },
    {
      name: "reducer 2",
      input: [[], '2'],
      expected: ['2']
    },
    {
      name: "reducer 3",
      input: [['1','+',"(", '2'], ')'],
      expected: [3]
    },
     {
      name: "reducer 4",
      input: [["(", '1'], ')'],
      expected: [1]
    },
  ].forEach(function(td){
    var actual = reducer(...td.input)
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







  ;[
    {
      name: "string 1",
      input: "2 + 2",
      expected: ['2','+','2']
    },
    {
      name: "string 2",
      input: "2+2",
      expected: ['2','+','2']
    },
    {
      name: "string 3",
      input: "22 + 2",
      expected: ['22','+','2']
    },
      {
      name: "string 4",
      input: "22 + 2 + (1 + 1)",
      expected: ['22','+','2','+', '(','1','+', '1',')']
    },
  ].forEach(function(td){
    var actual = tokenize(td.input)
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

}