// input: courses to take, courses with prerequisites
// output: boolean


function canFinish(courseCount, arrCourses, takenCourses, graph, previousCourse){
  if (arrCourses.length === 0){ return true }
  takenCourses = takenCourses || {}
  graph = graph || generateGraph(arrCourses)
  var course = arrCourses[0][0]
  var preReq = graph[course]
  if (preReq === course){ return false }
  if (preReq === previousCourse){ return false }
  if (!takenCourses[course]){ takenCourses[course] = true }
  if (Object.keys(takenCourses).length >= courseCount){ return false }
  return canFinish(courseCount, arrCourses.slice(1), takenCourses, graph, course)
}


// course as course -> preReq
function generateGraph(arrCourses){
  return arrCourses.reduce(function(graph, currentPair){
    var course = currentPair[0]
    var preReqs = currentPair[1]
    if (preReqs.length === 0){ return graph}
    return updateGraphValues(graph, course, preReqs)
  },{})
}


function updateGraphValues(graph, key, course){
    if (graph[key]){
      graph[key] = [course].concat(graph[key])
    }else{
      graph[key] = course
  }
  return graph
}


;[
 {
    name: "empty course list",
    input: [1, []],
    expected: true,
  },
  {
    name: "single Course",
    input: [2, [[1,0]]],
    expected: true,
  },
  {
    name: "self dependent Course",
    input: [2, [[0,0]]],
    expected: false,
  },
  {
    name: "single Course - fail",
    input: [1, [[1,0]]],
    expected: false,
  },
  {
    name: "extra space case",
    input: [3, [[1,0]]],
    expected: true,
  },
  {
  name: "self referential",
  input: [2, [[0,1],[1,0]]],
  expected: false,
  },
  {
  name: "self referential 2",
  input: [5, [[0,1],[2,0],[1,2]]],
  expected: false,
  },
  {
  name: "leet code",
  input: [2, [[1,0]]],
  expected: true,
  },
].forEach(function(td){
  loggedItems = []
  var actual = canFinish(td.input[0], td.input[1])
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

console.log('')
console.log('generategraph')

;[
  {
    name: "single pair",
    input: [[1,0]],
    expected: {'1': 0},
  },
  {
    name: "double pair",
    input: [[2,0], [1,0]],
    expected: {'1': 0, '2': 0},
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