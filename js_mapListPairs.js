// mapToListOfPairs(map) -> listOfPairs` - e.g. `f({ a: 1, b: 2}) => [ ['a', 1], ['b', 2] ]`
var mapPairs = function(map){
  var listOfPairs = []
  for (key in map){ listOfPairs.push([key, map[key]]) }
  return listOfPairs
}


;[
  {
    name: 'empty map',
    input: {},
    expected: [],
  },
  {
    name: 'single pair',
    input: {a: 1},
    expected: [['a', 1]],
  },
  {
    name: 'two pair',
    input: {a: 1, b: 2,},
    expected: [["a", 1],["b", 2]],
  },
].forEach(function(td){
  var actual = mapPairs(td.input)
  var pass = actual === td.expected
  if (pass){
    console.log("passed:", td.name)
  }else{
    console.log("actual:  ", actual)
    console.log("expected:", td.expected)
    // process.exit()
  }
})