var renderDay = function(events, width, height){

  height = height || 720
  width  = width  || 600

  if (events.length === 0 ){return []}

  var sortedEvents = sortEventsByStart(events)
  var convertedEventList = []

  for (var i = 0; i < sortedEvents.length; ++i){

    var previousEvent = sortedEvents[i-1]
    var currentEvent = sortedEvents[i]
    var nextEvent = sortedEvents[i+1]

    var nextEventOverlaps  = nextEventOverlap(currentEvent, nextEvent)
    var priorEventOverlaps = priorEventOverlap(currentEvent, previousEvent)

    if ( !nextEventOverlaps && !priorEventOverlaps){ convertedEventList = convertedEventList.concat(eventBuilder(currentEvent, 0, width)) }

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
  return convertedEventList
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

module.exports.renderDay = renderDay
module.exports.eventBuilder = eventBuilder
module.exports.sortEventsByStart = sortEventsByStart
module.exports.nextEventOverlap = nextEventOverlap
module.exports.priorEventOverlap = priorEventOverlap

