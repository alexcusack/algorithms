var through2 = require('through2')
//
var upperCaser = through2(
  /* per input */
  function(data, encoding, callback){
    callback(null, data.toString().toUpperCase())
  }
  /* flush */
  ,function(endCallback){
    endCallback()
  }
)

var reportMap = {}

process.stdin // raw buffers
  .pipe(lines()) // line buffers
  .pipe(lineParser())
  .pipe(reduceParsedLinesToMap(reportMap))
  .on('end', function(){
    console.log(reportMap)
    // sort
    // print
  })
  // process.stdout.write(data.toString())
  // process.stdout.write(",")
  console.log(data.toString())
})

process.stdin.on("end", function(end){console.log('stream ended')} )

function reduceParsedLinesToMap( report ){
  return through2( function(currentReport, endcoding, callback){
    if (currentReport.operation === "Add"){
      console.log('updating with add')
    }
    if (currentReport.operation === "Charge"){
      console.log('updating with Charge')
    }
    if (currentReport.operation === "Credit"){
      console.log('updating with Charge')
    }
    callback()
  }
  ,function(){}
  )
}

function lineParser({
  return through2.obj(function(linebuf, _, cb) { this.push(parseLine(linebuf.toString())); cb() }
})

function parseLine(lineStr) {
  var a = lineStr.split(" ");
  return { operation: a[0], values: a.slice(1) }
}

function lines(){
  var line = new Buffer(0)
  return through2(
    function(buffer, endcoding, callback){
      var that = this
      for (var i = 0; i < buffer.length; ++i){
        if (buffer[i] === 0x0a ){
          that.push(line)
          line = new Buffer(0)
        } else {
          line = Buffer.concat([line, new Buffer([buffer[i]]) ])
        }
      }
      callback()
    },
    function(endCallback){
      this.push(line)
      endCallback()
    }
  )
}