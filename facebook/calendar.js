//sample
// [{start: 000, end: 200 },{start: 100, end: 300 },{start: 120, end: 350 },{start: 190, end: 200 },{start: 200, end: 400 },{start: 500, end: 600 },{start: 500, end: 600 },]

var layOutDay = function(events, width, height){

  height = height || 720
  width  = width  || 600

  if (events.length === 0 ){return renderEvents([])}

  var sortedEvents = sortEventsByStart(events)
  var convertedEventList = []

  for (var i = 0; i < sortedEvents.length; ++i){

    var previousEvent = sortedEvents[i-1]
    var currentEvent = sortedEvents[i]
    var nextEvent = sortedEvents[i+1]

    var nextEventOverlaps  = nextEventOverlap(currentEvent, nextEvent)
    var priorEventOverlaps = priorEventOverlap(currentEvent, previousEvent)

    if ( !nextEventOverlaps && !priorEventOverlaps){ convertedEventList = convertedEventList.concat(eventBuilder(currentEvent)) }

    if (nextEventOverlaps){
      ++i /* increment i to skip 'nextEvent' on next loop through */
      var overlappingEvents = [currentEvent, nextEvent]
      var eventAfterNext = sortedEvents[i+1]

      while (nextEventOverlap(currentEvent, eventAfterNext)){
        overlappingEvents = overlappingEvents.concat(eventAfterNext)
        eventAfterNext = sortedEvents[++i+1] /* increment i to skip found event, add + 1 it get next from sequence */
      }
      convertedEventList = convertedEventList.concat(formatOverlappingEvents(overlappingEvents, width))
    }

    if (priorEventOverlaps) {
      var formattedEvents = formatOverlappingEvents([currentEvent, previousEvent], width)
      /* update prior event with new width */
      convertedEventList[convertedEventList.length-1] = formattedEvents[1]
      convertedEventList = convertedEventList.concat(formattedEvents[0])
    }
  }
  return renderEvents(convertedEventList)
}


var formatOverlappingEvents = function(listOfEvents, baseWidth){
  var newWidth = baseWidth/listOfEvents.length
  var left = 0
  return listOfEvents.reduce(function(list, currentEvent){
    var formattedEvent = eventBuilder(currentEvent, left, newWidth)
    left = left + newWidth /* update left starting point*/
    return list.concat(formattedEvent)
  },[])
}

var renderEvents = function(eventList){
  $('.calendar-container').empty()
  eventList.forEach(function(eventNode){
    var newNode = $('.template').clone()
    $(newNode).addClass('event-node')
    $(newNode).css('top', eventNode['top'])
    $(newNode).css('left', eventNode['left'])
    $(newNode).css('height', eventNode['height'])
    $(newNode).css('width', eventNode['width'])
    $(newNode).toggle()
    $('.calendar-container').append(newNode)
  })
}





var nextEventOverlap = function(currentEvent, nextEvent){
  if (nextEvent === undefined){return false}
  return nextEvent['start'] < currentEvent['end']
}

var priorEventOverlap = function(currentEvent, previousEvent){
    if (previousEvent === undefined){ return false }
    return currentEvent['start'] < previousEvent['end']
}

var eventBuilder = function(event, left, width){
  width  = width  || 600
  var top = event['start']
  var height = event['end'] - top
  var left  = left || 0
  return {top: top, left: left, width: width, height: height}
}

var sortEventsByStart = function(eventList){
  return eventList.sort(compareEventStarts)
}

var compareEventStarts = function(eventA, eventB){
  if (eventA['start'] === eventB['start']){ return 0 }
  return eventA['start'] > eventB['start'] ? 1 : -1
}

