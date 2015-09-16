var renderDay = require('./calendar.js').renderDay

function layOutDay(eventList){
  renderEvents(renderDay(eventList))
}


var renderEvents = function(eventList){
  $('.calendar-container').empty()
  eventList.forEach(function(eventNode){
    var newNode = renderEventNode(eventNode)
    $('.calendar-container').append(newNode)
  })
}

function renderEventNode(eventNode){
  var newNode = $('.template').clone()
  $(newNode).addClass('event-node')
  $(newNode).css('top', eventNode['top'])
  $(newNode).css('left', eventNode['left'])
  $(newNode).css('height', eventNode['height'])
  $(newNode).css('width', eventNode['width'])
  $(newNode).toggle()
}


global.layOutDay = layOutDay