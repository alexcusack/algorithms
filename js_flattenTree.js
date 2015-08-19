// Write a function that flattens a tree (of any depth) into a list

// input: an array of arrays
// output: a single dimension array
var flattenArrays = function(tree, outputArray){
  if(outputArray === undefined) {var outputArray = []}
    tree.reduce(function(carry,currentvalue){
      if(typeof(currentvalue) === 'object'){
        flattenArrays(currentvalue, outputArray)
      }else{
        outputArray.push(currentvalue)
      }
    }, [])
  return outputArray
}

console.log(flattenArrays([[1],2,3,4]))
console.log(flattenArrays([1,2,3,4]))
console.log(flattenArrays([[1],[2],[3],[[4], [[[[[[5]]]]]]],]))
console.log(flattenArrays([]))