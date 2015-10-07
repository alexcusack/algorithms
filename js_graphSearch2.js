

function findShortestPath(graph, start, destination){
  /* does branch of start include end */
  var queue = [[start]]
  var visited = {}
  visited[start] = true
  while (queue.length > 0 ){
    var path = queue.shift()
    var pathEnd = path[path.length-1]
    if (pathEnd === destination){ return path }
    graph[pathEnd].forEach(function(node){
      if (!visited[node]){
        visited[node] = true
        queue.push(path.concat(node))
      }
    })
  }
}

;[
  {
    name: "non adjacent",
    input: [{'a': ['b'], 'b': ['a', 'c'], 'c': ['b'] }, "a", "c"],
    expected: ['a', 'b', 'c']
  },
  {
    name: "self referential",
    input: [
    {'a': ['f','b'],
     'b': ['a','c'],
     'c': ['b','d'],
     'd': ['c','e'],
     'e': ['f', 'd'],
     'f': ['a', 'e']
   },
     "a", "d"],
    expected: ['a', 'f', 'e', 'd']
  },
].forEach(function(td){
  // loggedItems = []
  var actual = findShortestPath(td.input[0], td.input[1], td.input[2])
  var pass = JSON.stringify(actual) === JSON.stringify(td.expected) // no nesting so this is 'fine'
  var pass = JSON.stringify(actual) === JSON.stringify(td.expected)
  if (pass){
    console.log("passed:", td.name)
  }else{
    console.log(td.name, "failed")
    console.log("actual:", actual)
    console.log("expected:", td.expected)
    // loggedItems.forEach(function(log){console.log(log[0], log[1])})
    process.exit()
  }
})