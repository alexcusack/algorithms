
var mergeSort = function(unsortedArray){
  // log("unsortedArray", unsortedArray)
  if (unsortedArray === undefined ){ return [] }
  if (unsortedArray.length <= 1){ return unsortedArray }

  if (!singleElementList(unsortedArray)){
    log('splitting', unsortedArray)
    var head = unsortedArray.slice(0, unsortedArray.length/2)
    var rest = unsortedArray.slice(unsortedArray.length/2, unsortedArray.length)
    log('head', head)
    log('rest', rest)
  }

  if (singleElementList(head) && singleElementList(rest)){
    return head[0] < rest[0] ? head.concat(rest) : rest.concat(head)
  }


  if (singleElementList(head)){
    return head[0] < rest[0] ? head.conat(rest) : rest.concat(head)
  }



  log('recursing', "")
  log('head', head)
  log('rest', rest)
  return mergeSort(head).concat(mergeSort(rest))

}

function singleElementList(node){
  return node === undefined ? false : node.length === 1
}



var loggedItems = []
function log(name, thing){ loggedItems.push([name, thing])}
;[
  {
    name: "test 1 ",
    input: [],
    expected: [],
  },
  {
    name: "test 2",
    input: [2,1],
    expected: [1,2],
  },
].forEach(function(td){
  loggedItems = []
  var actual = mergeSort(td.input)
  var pass = JSON.stringify(actual) === JSON.stringify(td.expected)
  if (pass){
    console.log('passed', td.name)
  }else{
    console.log("failed:", td.name)
    console.log("expected:", td.expected)
    console.log("actual:", actual)
    loggedItems.forEach(function(loggedItem){console.log(loggedItem[0], loggedItem[1])})
    process.exit()
  }
})