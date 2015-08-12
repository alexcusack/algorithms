var test = function(args){

  var twoArguments = function(args){
    console.log(args)
    console.log("I have two args")
  };

  var oneArgument = function(args){
    console.log(args.length)
    console.log("I just have one arg")
  };


  if(args.length == 2){
    twoArguments(args)
  } else if (args.length == 1){
    oneArgument(args)
  };



};