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


// RETURNS THE FIRST SHORTEST ROUTE BETWEEN TWO POINTS ON A GRAPH
function findShortestPath(graph, start, destination, visited){
  log('start', start)
  var route = [start]
  visited = visited || []
  visited.push(start)

  if (graph[destination] === undefined || graph[start] === undefined){ return 'not on graph' }

  var originBranches = graph[start]
  var destinationBranches = graph[destination]
  var overLappingPoint = findOverLappingPoint(originBranches, destinationBranches)

  if (neighbors(originBranches, destination)){ return route.concat(destination) }

  if (overLappingPoint){
    log('in overLappingPoint', overLappingPoint)
    log('destination', destination)
    log('destinationbranches', destinationBranches)
    return route.concat(overLappingPoint, destination)
  }

  /* pass each of the connections for start and end as start and end points on recurision */
  log('visited', visited)
  var notYetVisitedPoints = removedAlreadyVistedPoints(originBranches, visited)
  log('not yet visited', notYetVisitedPoints)
  return route.concat(
    notYetVisitedPoints.reduce(function(path,currentCity){
      return findShortestPath(graph,currentCity,destination, visited)
    },[])
  )
}

function neighbors(originBranches, end){
  return originBranches.reduce(function(overlapBoolean, currentBranch){
    if (currentBranch === end){return true}
    return overlapBoolean
  }, false)
}


function removedAlreadyVistedPoints(originBranches, visitedPoints) {
  return originBranches.reduce(function(uniqueValues, currentPoint){
    if ( /* if not visited */ visitedPoints.indexOf(currentPoint) === -1) {return uniqueValues = uniqueValues.concat(currentPoint)}
    return uniqueValues
  },[])
}

/* return first matching overlap */
function findOverLappingPoint(originBranches, endCities){
  for (var i = 0; i < originBranches.length; ++i){
    var currentCity = originBranches[i]
    for (var j = 0; j < endCities.length; ++j){
      if (currentCity === endCities[j]){ return [endCities[j]]}
    }
  }
}

var loggedItems = []
function log(name, item){return loggedItems.push([name, item])}

;[
  {
    name: "not on graph",
    input: [graph, "LAX", "QQQ"],
    expected: 'not on graph'
  },
    {
    name: "single connection",
    input: [graph, "LAX", "LAS"],
    expected: ['LAX', 'LAS']
  },
  {
    name: "short",
    input: [graph, "LAX", "DEN"],
    expected: ['LAX', 'LAS', 'DEN']
  },
  {
    name: "1 loop",
    input: [graph, "LAX", "JFK"],
    expected: ['LAX', 'PHX', 'ORD', 'JFK']
  },
  {
    name: "long trip 1",
    input: [graph, "LAX", "HOU"],
    expected: ['LAX', 'PHX', 'ORD', 'HOU']
  },
  // {
  //   name: "long trip 2",
  //   input: [graph, "LAX", "MCO"],
  //   expected: ['LAS', 'PHX', 'ORD', 'ATL', 'MCO']
  // },
].forEach(function(td){
  loggedItems = []
  var actual = findShortestPath(td.input[0], td.input[1], td.input[2])
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