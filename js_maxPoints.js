// given 2d plane, find maximum number of x,y points on a single plan

function isEmpty(node){return node.length === 0}

var maxPoints = function(node) {
  var maxPoints = 0
  if (isEmpty(node)){ maxPoints = 0 }
  /* not empty */

  return maxPoints
}

;[
  {
    name: "empty",
    inputMatrix: [],
    expected: 0
  },
  {
    name: "single x, y point",
    inputMatrix:  [[0,0]],
    expected: 1
  },


].forEach(function(td){
  var actual = maxPoints(td.inputMatrix)
  var pass =  actual === td.expected
  if (pass){
    console.log("passed:", td.name)
  }else{
    console.log("test:  ", td.name)
    console.log("actual:  ", actual)
    console.log("expected:", td.expected)
    process.exit()
  }
})
