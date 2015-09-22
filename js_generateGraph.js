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


function generateGraph(node, newGraph, mappedNodes){
  newGraph = newGraph || {}
  mappedNodes = mappedNodes || []
  if (!graph[node]){
    return newGraph
  }else{
    newGraph[node] = graph[node]
  }
  mappedNodes.push(node)
  notYetMappedNodes = removemappedNodes(mappedNodes, graph[node])
  return notYetMappedNodes.reduce(function(builtGraph,currentNode){
    return generateGraph(currentNode, newGraph, mappedNodes)
  },newGraph)
}

function removemappedNodes(built, options) {
  return options.reduce(function(uniqueValues, currentPoint){
    if ( /* if not visited */ built.indexOf(currentPoint) === -1) {return uniqueValues = uniqueValues.concat(currentPoint)}
    return uniqueValues
  },[])
}



;[
  {
    name: "full test",
    input: "LAX",
    expected: {
      LAX: ['LAS', 'PHX'],
      LAS: ['LAX', 'PHX', 'DEN'],
      PHX: ['LAX', 'LAS','DEN', 'ORD', 'DFW'],
      DEN: ['LAS', 'PHX', 'ORD'],
      ORD: ['JFK', 'ATL', 'HOU', 'DFW', 'PHX', 'DEN'],
      JFK: ['MCO', 'ATL', 'ORD'],
      MCO: ['HOU', 'ATL', 'JFK'],
      HOU: ['DFW', 'ORD', 'ATL', 'MCO'],
      DFW: ['PHX', 'ORD', 'HOU'],
      ATL: ['ORD', 'JFK', 'MCO', 'HOU']
    }
  },

].forEach(function(td){
  loggedItems = []
  var actual = generateGraph(td.input)
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