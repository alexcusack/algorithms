const operatorsToTry = {
  '+': function(x,y){return x + y},
  '-': function(lhs, rhs){return lhs - rhs },
  '*': function(x,y){return x * y},
  '/': function(rhs, lhs){return lhs/rhs }
}

// There will need to be lots of permutations. Build a tree with the operators as a possible branch after each int.
// at each level of the tree if the new node is still less than the target while not at end of string continue. else branch is false and null.
// tree paths will need to be sholved into the stack as I go, recurse at after each pass.

const generateTree = (stringOfValues, targetNum) => {
  let tree = [stringOfValues[0]]
  for (let i = 1; i < stringOfValues.length; ++i){
    let currentValue = stringOfValues[i]
    for (let operator in operatorsToTry){
      if (valueOfBranch(tree.pop().concat(operator, currentValue)) <= targetNum){
        tree.push(tree.pop().concat(operator,currentValue))
      }
    }
  }
  return tree
}

const valueOfBranch = (branch) => {
  return branch.reduce((stackAndtotal, currentValue)=>{
    let stack = stackAndtotal[0]
    let total = stackAndtotal[1]
    let number = parseInt(currentValue)
    if (isNaN(number)){
      // is operator
      stack.push(currentValue)
      return [stack, total]
    }
    // not an operator
    total =  stack.length === 1 ? operatorsToTry[stack.pop()](total, number)
      : total = number
    return [stack, total]
  },[[],[]])[1]
}



;[
  {
    name: 'two digit input',
    input: ['1','+','2'],
    expected: 3,
  },
   {
    name: 'multi digit input',
    input: ['1','+','2', '-', '4', '+', '3'],
    expected: 2,
  },
].forEach(function(td){
  var actual = valueOfBranch(td.input)
  var pass = JSON.stringify(actual) === JSON.stringify(td.expected)
  if (pass){
    console.log("passed:", td.name)
  }else{
    console.log("Failed", td.name)
    console.log("actual:", actual)
    console.log("expected:", td.expected)
    // process.exit()
  }
})




;[
 // {
 //    name: 'empty input',
 //    input: [],
 //    expected: null,
 //  },
  {
    name: 'two digit input',
    input: ["11",2],
    expected: 1+1,
  },
].forEach(function(td){
  var actual = generateTree(td.input[0], td.input[1])
  var pass = JSON.stringify(actual) === JSON.stringify(td.expected)
  if (pass){
    console.log("passed:", td.name)
  }else{
    console.log("Failed", td.name)
    console.log("actual:", actual)
    console.log("expected:", td.expected)
    // process.exit()
  }
})