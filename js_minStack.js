// reverse polish notation


// ["2", "1", "+", "3", "*"]

var key ={
  '+': function(x,y){return x + y},
  '-': function(x, y){return x - y },
  '*': function(x,y){return x * y},
  '/': function(x, y){return x/y }
}


/* are there every only two ints and then a operator? else think of a new stack format */
var evalRPN = function(tokens) {
  if (tokens.length === 1){return parseInt(tokens[0])}
  const stack = []
  let total = 0
  for (let i = 0; i < tokens.length; ++i){
    let token = parseInt(tokens[i])
    if (isNaN(token)){
      token = tokens[i]
      total += key[token](stack.pop(), stack.pop())
    }else{
      stack.push(token)
    }
  }
  return Math.floor(total)
}



;[
   {
    name: "single",
    input: ['2','2','+'],
    expected: 4
  },
    {
    name: "double",
    input: ['2','2','+','1','-'],
    expected: 3
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
