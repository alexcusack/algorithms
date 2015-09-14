var layOutDay = function(events, width, height){
  height = height || 720
  width  = width  || 600

  if (events.length === 0 ){return renderEvents([])}
  var sortedEvents = sortEvents(events)
  var convertedEventList = []

  for (var i = 0; i < sortedEvents.length; ++i){
    currentEvent = sortedEvents[i]
    nextEvent = sortedEvents[i+1]

    if (/* end of list */ nextEvent === undefined){
      convertedEventList = convertedEventList.concat(eventBuilder(currentEvent))
      return renderEvents(convertedEventList)
    }

    if (eventOverlap(currentEvent, nextEvent)){
      var overlappingEvents = [currentEvent, nextEvent]
      ++i /* increment i to skip 'nextEvent' on next loop through */

      while (eventOverlap(nextEvent, sortedEvents[i+1])){
        overlappingEvents = overlappingEvents.concat(sortedEvents[i+1])
        nextEvent = sortedEvents[++i] /* increment i again to skip until non overlapping event is found */
      }

      convertedEventList = convertedEventList.concat(formatOverlappingEvents(overlappingEvents, width))
    } else {
      convertedEventList = convertedEventList.concat(eventBuilder(currentEvent))
    }
  }
  return renderEvents(convertedEventList)
}


var renderEvents = function(eventList){
  eventList.forEach(function(eventNode){
    var newNode = $('.event-node').clone()
    $(newNode).css('margin-top', eventNode['top'])
    $(newNode).css('margin-left', eventNode['left'])
    $(newNode).css('height', eventNode['height'])
    $(newNode).css('width', eventNode['width'])
    $(newNode).toggle()
    $('.calendar-container').append(newNode)
  })
}


var formatOverlappingEvents = function(listOfEvents, baseWidth){
  var subsetWidth = baseWidth/listOfEvents.length
  var left = 0
  return listOfEvents.reduce(function(list, currentEvent){
    var formattedEvent = eventBuilder(currentEvent, left, subsetWidth-1)
    left = left + subsetWidth /* reset left */
    return list.concat(formattedEvent)
  },[])
}


var eventOverlap = function(eventOne, eventTwo){
  if (eventTwo === undefined){return false}
  return eventTwo['start'] < eventOne['end']
}

var eventBuilder = function(event, left, width){
  width  = width  || 600
  var top = event['start']
  var height = event['end'] - top
  var left  = left || 0
  return {top: top, left: left, width: width, height: height}
}


var sortEvents = function(eventList){
  return eventList.sort(compareEventStarts)
}

var compareEventStarts = function(eventA, eventB){
  if (eventA['start'] === eventB['start']){ return 0 }
  return eventA['start'] > eventB['start'] ? 1 : -1
}
