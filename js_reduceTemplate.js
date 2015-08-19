[1,2,3,4].reduce(function(objectTocarray,currentvalue){
    console.log("a is " + objectTocarray)
    console.log("b is " + currentvalue)
    return objectTocarray = currentvalue
  }, [])