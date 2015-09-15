var instructions = function()  {
  // 1. [{}], 720, 500
  // 2. f( {events: [{start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670}], height: 720, width: 600 } );
  //   // [?] list of quads: top, left, width, height

  // f ({ events: [], height: 0, width: 0 }) --> []
  // f ({ events: [{start: 0, end: 1 }], height: 1, width: 1  }) --> [{top: 0, left: 0, width: 1, height: 1}]
  // f ({ events: [{start: 1, end: 2 }], height: 2, width: 1  }) --> [{top: 1, left: 0, width: 1, height: 1}]
  // f ({ events: [{start: 1, end: 2 }, {start: 1, end: 2 }], height: 2, width: 2  }) --> [{top: 1, left: 0, width: 1, height: 1}, {top: 1, left: 1, width: 1, height: 1}]


  // const ES = (events, height, width) => {events, height, width}
  // const E = (start, end) => {start, end}
  // const EB = (top, left, width, height) => {top, left, width, height}

  // f(ES([ E(0,1) ], 1, 1)) -> [ EB(0,0,1,1) ]

  // [ {start: 610, end: 670}, {start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620},  ]
}

var layOutDay = function(events, width, height){
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
  return convertedEventList
}


var formatOverlappingEvents = function(listOfEvents, baseWidth){
  var newWidth = baseWidth/listOfEvents.length
  var left = 0
  return listOfEvents.reduce(function(list, currentEvent){
    var formattedEvent = eventBuilder(currentEvent, left, newWidth-1)
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





///////////TESTS//////////////////
var loggedItems = []
var log = function (name, itemToLog = '') {
  loggedItems.push([name, itemToLog])
  return itemToLog
}






console.log('')


console.log('')


;[
  {
    name: "no event",
    input: [],
    expected: [],
  },
  {
    name: "single event",
    input: [{start: 0, end: 1 }],
    expected: [{top: 0, left: 0, width: 600, height: 1}],
  },
   {
    name: "two overlapping events",
    input: [
            {start: 0, end: 2 },
            {start: 1, end: 3 }
            ],
    expected: [
              {top: 0, left: 0, width: 299, height: 2},
              {top: 1, left: 300, width: 299, height: 2}
              ],
  },
  {
    name: "mixed overlapping",
    input: [
            {start: 0, end: 3 },
            {start: 2, end: 4 },
            {start: 4, end: 5 }
           ],
    expected: [
               {top: 0, left: 0, width: 299, height: 3},
               {top: 2, left: 300, width: 299, height: 2},
               {top: 4, left: 0, width: 600, height: 1}
              ],
  },
    {
    name: "4 overlapping events",
    input: [
            {start: 0, end: 2 },
            {start: 0, end: 2 },
            {start: 0, end: 2 },
            {start: 0, end: 2 },
           ],
    expected: [
               {top: 0, left: 0,   width: 149, height: 2},
               {top: 0, left: 150, width: 149, height: 2},
               {top: 0, left: 300, width: 149, height: 2},
               {top: 0, left: 450, width: 149, height: 2},
              ],
  },
  {
    name: "multiple overlapping events",
    input: [
            {start: 0, end: 2 },
            {start: 1, end: 3 },
            {start: 2, end: 4 }
           ],
    expected: [
               {top: 0, left: 0, width: 299, height: 2},
               {top: 1, left: 300, width: 299, height: 2},
               {top: 2, left: 0, width: 299, height: 2}
              ],
  },
  {
    name: "multiple overlapping events in varied order with non overlapping",
    input: [
            {start: 0, end: 2 },
            {start: 1, end: 3 },
            {start: 2, end: 4 },
            {start: 5, end: 7 },
            {start: 7, end: 9},
            {start: 8, end: 10},
           ],
    expected: [
               {top: 0, left: 0, width: 299, height: 2},
               {top: 1, left: 300, width: 299, height: 2},
               {top: 2, left: 0, width: 299, height: 2},
               {top: 5, left: 0, width: 600, height: 2},
               {top: 7, left: 0, width: 299, height: 2},
               {top: 8, left: 300, width: 299, height: 2},
              ],
  },

  {
    name: "Facebook case, prior event overlap",
    input: [
            {start: 30, end: 150},
            {start: 540, end: 600},
            {start: 560, end: 620},
            {start: 610, end: 670},
            ],
    expected: [
               {top: 30, left: 0, width: 600, height: 120},
               {top: 540, left: 0, width: 299, height: 60},
               {top: 560, left: 300, width: 299, height: 60},
               {top: 610, left: 0, width: 299, height: 60},
              ],
  },

].forEach(function(td){
  loggedItems = []
  var actual = layOutDay(td.input)
  var pass = JSON.stringify(actual) === JSON.stringify(td.expected)
  if (pass){
    console.log("passed:", td.name)
  }else{
    console.log("failed:", td.name)
    console.log("expected:" )
    console.log(td.expected)
    console.log("actual:")
    console.log(actual)
    loggedItems.forEach(( [label, item]) => console.log(label, item))
    process.exit()
  }
})




// [
//   {start: 000, end: 200 },
//   {start: 100, end: 300 },
//   {start: 120, end: 350 },
//   {start: 190, end: 200 },
//   {start: 200, end: 400 },
//   {start: 500, end: 600 },
//   {start: 500, end: 600 },
// ]