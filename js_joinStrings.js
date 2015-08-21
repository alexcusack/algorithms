// Write a function that joins a list of strings with some delimiter

// Input: list of strings, a string
// Output: string
var joinStrings = function(listOfStrings, deliminator){
  return listOfStrings.reduce(function(joinedString, string){
    return joinedString === "" ? string : joinedString + deliminator + string
  }, "")
}

;[
  {
    name: "Empty List",
    input:  [[], "-"],
    expected: "",
  },
  {
    name: "List of one",
    input:  [['hello'], "-"],
    expected: "hello",
  },
  {
    name: "List of three",
    input:  [['hello', 'mom', "!"], "-"],
    expected: "hello-mom-!",
  },
].forEach(function(td){
  var actual = joinStrings(td.input[0], td.input[1])
  var pass = actual === td.expected
  if (pass){
    console.log(td.name, "passed")
  }else{
    console.log(td.name, "failed")
    console.log("actual:", actual)
    console.log("expected:", td.expected)
  }
})
