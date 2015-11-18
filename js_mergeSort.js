


function mergeSort(array) {
  if (array.length < 2) { return array }
  var middleIndex = Math.floor(array.length / 2)// get middle
  var leftArr = array.slice(0, middleIndex) // divide left and right
  var rightArr = array.slice(middleIndex, array.length) // divide left and right
  return merge(mergeSort(leftArr), mergeSort(rightArr)) //
}

function merge(leftArr, rightArr) {
  var mergedArray = []
  while (leftArr.length > 0 && rightArr.length > 0) {
    leftArr[0] <= rightArr[0]
      ? mergedArray.push(leftArr.shift())
      : mergedArray.push(rightArr.shift())
  }

  /* account for unbalanced arrays */
  while(leftArr.length > 0) { mergedArray.push(leftArr.shift()) }
  while(rightArr.length > 0) { mergedArray.push(rightArr.shift()) }
  return mergedArray
}


;[
  {
    name: "empty element",
    input: [],
    expected: [],
  },
   {
    name: "one element",
    input: [1],
    expected: [1],
  },
  {
    name: "two element",
    input: [2, 1],
    expected: [1, 2],
  },
  {
    name: "n-element",
    input: [4,1,3,2],
    expected: [1,2,3,4],
  },
].forEach(function(td){
  var actual = mergeSort(td.input)
  var pass = JSON.stringify(actual) === JSON.stringify(td.expected)
  var pass = JSON.stringify(actual) === JSON.stringify(td.expected)
  if (pass){
    console.log("passed:", td.name)
  }else{
    console.log(td.name, "failed")
    console.log("actual:", actual)
    console.log("expected:", td.expected)
    process.exit()
  }
})