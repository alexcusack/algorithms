var graph = {
  LAX: ['LAS', 'PHX'],
  LAS: ['LAX', 'PHX', 'DEN'],
  PHX: ['LAX', 'LAS','DEN', 'ORD', 'DFW'],
  DFW: ['PHX', 'ORD', 'HOU'],
  HOU: ['DFW', 'ORD', 'ATL', 'MCO'],
  MCO: ['HOU', 'ATL', 'JFK'],
  JFK: ['MCO', 'ATL', 'ORD'],
  ORD: ['JFK', 'ATL', 'HOU', 'DFW', 'PHX', 'DEN'],
  DEN: ['LAS', 'PHX', 'ORD'],
  ATL: ['ORD', 'JFK', 'MCO', 'HOU']
}


var a = {'value': 'a', 'links': []}
var b = {'value': 'b', 'links': []}
var c = {'value': 'c', 'links': []}
a.links.push(b)
b.links.push(c)
c.links.push(a)


function generateAdjacentcyList(node, list, visited){
  visited = visited || {}
  list = list || {}
  if (!visited[node.value]){
    list[node.value] = node.links.map(function(link){return link.value })
    visited[node.value] = true
  } else {
    return list
  }
  return node.links.reduce(function(memo, currentLink){
    return generateAdjacentcyList(currentLink, list, visited)
  }, list)
}




// console.log(JSON.stringify(a))


// function generateGraph(node, newGraph, mappedNodes){
//   newGraph = newGraph || {}
//   mappedNodes = mappedNodes || []
//   if (/* no branches */ !graph[node]){
//     return newGraph
//   }else{
//     newGraph[node] = graph[node]
//   }
//   mappedNodes.push(node)
//   notYetMappedNodes = removemappedNodes(mappedNodes, graph[node])
//   return notYetMappedNodes.reduce(function(builtGraph,currentNode){
//     return generateGraph(currentNode, newGraph, mappedNodes)
//   },newGraph)
// }

// function removemappedNodes(built, options) {
//   return options.reduce(function(uniqueValues, currentPoint){
//     if ( /* if not visited */ built.indexOf(currentPoint) === -1) {return uniqueValues = uniqueValues.concat(currentPoint)}
//     return uniqueValues
//   },[])
// }



// '{0,1,2#1,2#2,2}'

function ojToAdjacentList(string){
  var sub = string.slice(1, -1)
  var connections = sub.split('#')
  return connections.reduce(function(memo, currentConnection){
    var nodes = currentConnection.split(',')
    var head = nodes[0]
    var rest = nodes.slice(1)

    nodes.forEach(function(singleNode){
      memo[singleNode] = memo[singleNode] || []
    })

    memo[head] = memo[head].concat(rest)

    rest.forEach(function(singleNode){
      if (memo[singleNode].indexOf(head) === -1){memo[singleNode] = memo[singleNode].concat(head)}
    })
    return memo
  },{})
}


;[
  {
    name: "full test",
    input: a,
    expected: {
      'a': ['b'],
      'b': ['c'],
      'c': ['a']
    }
  },

].forEach(function(td){
  loggedItems = []
  var actual = generateAdjacentcyList(td.input)
  var pass = JSON.stringify(actual) === JSON.stringify(td.expected) // no nesting so this is 'fine'
  var pass = JSON.stringify(actual) === JSON.stringify(td.expected)
  if (pass){
    console.log("passed:", td.name)
  }else{
    console.log(td.name, "failed")
    console.log("actual:", actual)
    console.log("expected:", td.expected)
    loggedItems.forEach(function(log){console.log(log[0], log[1])})
    process.exit()
  }
})


;[

  {
    name: "oj to adjacentcy list",
    input: '{0,1,2#1,2#2,2}',
    expected: {
      '0': ['1', '2'],
      '1': ['0', '2'],
      '2': ['0', '1','2']
    }
  },

].forEach(function(td){
  loggedItems = []
  var actual = ojToAdjacentList(td.input)
  var pass = JSON.stringify(actual) === JSON.stringify(td.expected) // no nesting so this is 'fine'
  var pass = JSON.stringify(actual) === JSON.stringify(td.expected)
  if (pass){
    console.log("passed:", td.name)
  }else{
    console.log(td.name, "failed")
    console.log("actual:", actual)
    console.log("expected:", td.expected)
    loggedItems.forEach(function(log){console.log(log[0], log[1])})
    process.exit()
  }
})