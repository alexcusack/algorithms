//input: flatArray
//output: tree

export const flatArraytoTree=(flatArray)=>{
  return flatArray.reduce(buildTree, [[],[]])[1]
}

const buildTree=(stackAndTree, currentValue)=>{
  let stack = stackAndTree[0]
  let tree = stackAndTree[1]
  if (!isNaN(currentValue)){
    tree.push(currentValue)
    return [stack, tree]
  }
  if (currentValue === "["){
    stack = stack.concat([tree])
    tree = []
    return [stack, tree]
  }
  if (currentValue === "]"){
    tree = stack.pop().concat([tree])
    return [stack, tree]
  }
}


;[
  {
    name: "no nesting",
    input: [1,2],
    expected: [1,2]
  },
   {
    name: "single nesting",
    input: [1,'[',3,']',4],
    expected: [1,[3], 4]
  },
  {
    name: "double nesting",
    input: [1,'[',3,'[',5 , 6,']',']',4],
    expected: [1,[3, [5,6]], 4]
  },
  {
    name: "squential nesting",
    input: [1,'[','[','[', 6, ']',']',']',4],
    expected: [1,[[[6]]], 4]
  },
  {
    name: "squential nesting with branching",
    input: [1,'[','[','[', 6, '[',3,']',']',']',']',4],
    expected: [1,[[[6,[3]]]], 4]
  },
].forEach(function(td){
  var actual = flatArraytoTree(td.input)
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

