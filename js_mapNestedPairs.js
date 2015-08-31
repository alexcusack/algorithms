// flattenNestedListOfPairs(nestedPairs) -> flatListOfPairsWithNestedKeys` -
//   ([ /* list of pairs */
//     [/* string key */ 'a', [ ['b', 1],['c', 2] ] ],['d', 3] ])
            /* either an array or a value */
        /* output */
        // k, v pairs
// -> [
//       [ ['a','b'], 1 ],
//       [ ['a','c'], 2 ],
//       [ ['d'],     3 ]
//     ]

// input: array
// output: array

var mapNestedPairs = function(listOfPairs, pathDepth){
  // console.log(listOfPairs)
  pathDepth = pathDepth || []
  if ( listOfPairs.length === 0 ){ return [] }
  return listOfPairs.reduce(function(flattenPairs,currentPair){
    var left = currentPair[0]
    var right = currentPair[1]
    var leftPath = pathDepth.concat([left])
    if (!right.reduce) { return flattenPairs.concat([[leftPath, right]])}
    return flattenPairs.concat(mapNestedPairs(right, leftPath))
  }, [])
}

;[
  {
    name: 'empty map',
    input: [],
    expected: [],
  },
  {
    name: 'single map',
    input: [['a', 1]],
    expected: [[['a'], 1]],
  },
  {
    name: 'nest map',
    input: [['a',[['b', 1]]], ['d', 3]],
    expected: [
                [['a', 'b'], 1],
                [["d"], 3],
              ]
  },
].forEach(function(td){
  var actual = mapNestedPairs(td.input)
  var pass = JSON.stringify(actual) === JSON.stringify(td.expected)
  if (pass){
    console.log("passed:", td.name)
  }else{
    console.log("actual:  ", actual)
    console.log("expected:", td.expected)
    // process.exit()
  }
})