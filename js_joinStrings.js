// Write a function that joins a list of strings with some delimiter

// Input: set of strings, a deliminator
// Output: a single string joined on the deliminator
var joinStrings = function(setOfStrings, deliminator){
  joinedString = setOfStrings.reduce(function(outputString, subString){
    outputString = outputString + subString + deliminator
    return outputString
  }, "")
  return joinedString
}


var string1 = ['hello', 'mom', 'how', 'are', 'you']
var string2 = ['i', 'love', 'cake', 'pops']

console.log(joinStrings(string1, "-") === "hello-mom-how-are-you-")
console.log(joinStrings(string2, "-") === "i-love-cake-pops-")