var renderEventNode = require("./renderEventNode").renderEventNode
var renderDay = require('./calendar.js').renderDay

var runTest = function(){
  buildTest([{start: 100, end: 200}, {start: 250, end: 275}])
  buildTest([{start: 100, end: 200}, {start: 190, end: 275}])
  buildTest([{start: 100, end: 200}, {start: 190, end: 275},{start: 190, end: 275}, {start: 270, end: 300}])
}

function buildTest(eventData){
  var width = 300
  var height= 300
  var eventData = renderDay(eventData, width, height)
  var nodes = eventData.map(renderEventNode)
  var containerEL = $("<div class='calendar-container'>")
  containerEL.css('height', height)
  containerEL.css('width', width)
  containerEL.css('float', "left")
  $('body').append(containerEL)
  nodes.forEach(function(node){
    $(containerEL).append(node)
  })
}


global.runTest = runTest