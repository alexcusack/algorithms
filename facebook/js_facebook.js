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


var layOutDay = function(events, width, height){
  height = height || 720
  width  = width  || 600
  if (/* single event or empty list */ events.length <= 1){ return convertEventListToEventBlocks(events, width) }

  var sortedEvents = sortEvents(events)
  var convertedEventBlocks = []

  for (var i = 0; i < sortedEvents.length; ++i){
    currentEvent = sortedEvents[i]
    nextEvent = sortedEvents[i+1]
    if (nextEvent === undefined){ return convertedEventBlocks = convertedEventBlocks.concat(eventBuilder(currentEvent)) }

    if (eventOverlap(currentEvent, nextEvent)){
      var overlappingEvents = [currentEvent, nextEvent]
      var additionalOverlaps = false
      while (eventOverlap(nextEvent, sortedEvents[i+2])){
        overlappingEvents = overlappingEvents.concat(sortedEvents[i+2])
        nextEvent = sortedEvents[++i] /*also increments i */
        overlapped = true
      }
      if (!additionalOverlaps){ ++i }

      convertedEventBlocks = convertedEventBlocks.concat(formatOverlappingEvents(overlappingEvents, width))
    } else {
      convertedEventBlocks = convertedEventBlocks.concat(eventBuilder(currentEvent))
    }
  }
  return convertedEventBlocks
}

/* create a method that takes to events and tells you if they overlap or not */

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


var sortEvents = function(eventList){
  return eventList.sort(compareEventStarts)
}

var compareEventStarts = function(eventA, eventB){
  if (eventA['start'] === eventB['start']){ return 0 }
  return eventA['start'] > eventB['start'] ? 1 : -1
}


var convertEventListToEventBlocks = function(events, width) {
  return events.reduce(function(formattedEvents, currentEvent){
    return formattedEvents.concat(eventBuilder(currentEvent, 0, width))
  },[])
}


var eventBuilder = function(event, left, width){
  width  = width  || 600
  var top = event['start']
  var height = event['end'] - top
  var left  = left || 0
  return {top: top, left: left, width: width, height: height}
}







;[
  {
    name: "create event block Test 1",
    input: {start: 0, end: 1 },
    expected: {top: 0, left: 0, width: 600, height: 1},
  },
  {
    name: "create event block Test 2",
    input: {start: 1, end: 2 },
    expected: {top: 1, left: 0, width: 600, height: 1},
  },
].forEach(function(td){
  var actual = eventBuilder(td.input)
  var pass = JSON.stringify(actual) === JSON.stringify(td.expected)
  if (pass){
    console.log('passed', td.name)
  }else{
    console.log("failed:", td.name)
    console.log("expected:", td.expected)
    console.log("actual:", actual)
    process.exit()
  }
})


;[
  {
    name: "Sort Events 1",
    input: [{start: 610, end: 670}, {start: 30, end: 150}],
    expected: [{ start: 30, end: 150 }, { start: 610, end: 670 }]
  },
  {
    name: "Sort Events 2",
    input: [{start: 30, end: 670}, {start: 30, end: 150}],
    expected: [{ start: 30, end: 670 }, { start: 30, end: 150 }]
  },
].forEach(function(td){
  var actual = sortEvents(td.input)
  var pass = JSON.stringify(actual) === JSON.stringify(td.expected)
  if (pass){
    console.log("passed:", td.name)
  }else{
    console.log("failed:", td.name)
    console.log("expected:", td.expected)
    console.log("actual:", actual)
    process.exit()
  }
})

;[
  {
    name: "event overlap true",
    input: [{start: 30, end: 150}, {start: 145, end: 670}, ],
    expected: true
  },
  {
    name: "event overlap false",
    input: [{start: 30, end: 200}, {start: 200, end: 300}],
    expected: false
  },
].forEach(function(td){
  var actual = eventOverlap(td.input[0], td.input[1])
  var pass = JSON.stringify(actual) === JSON.stringify(td.expected)
  if (pass){
    console.log("passed:", td.name)
  }else{
    console.log("failed:", td.name)
    console.log("expected:", td.expected)
    console.log("actual:", actual)
    process.exit()
  }
})





;[
  {
    name: "convert Event List Test 1",
    input: [{start: 0, end: 1 }],
    expected: [{top: 0, left: 0, width: 600, height: 1}],
  },
  {
    name: "convert Event List Test 2",
    input: [{start: 0, end: 1 }, {start: 1, end: 2 }],
    expected: [{top: 0, left: 0, width: 600, height: 1}, {top: 1, left: 0, width: 600, height: 1}],
  },
].forEach(function(td){
  var actual = convertEventListToEventBlocks(td.input)
  var pass = JSON.stringify(actual) === JSON.stringify(td.expected)
  if (pass){
    console.log("passed:", td.name)
  }else{
    console.log("failed:", td.name)
    console.log("expected:", td.expected)
    console.log("actual:", actual)
    process.exit()
  }
})



console.log('')


;[
  {
    name: "single event",
    input: [{start: 0, end: 1 }],
    expected: [{top: 0, left: 0, width: 600, height: 1}],
  },
   {
    name: "two overlapping events",
    input: [{start: 0, end: 5 }, {start: 3, end: 7 }],
    expected: [{top: 0, left: 0, width: 299, height: 5}, {top: 3, left: 300, width: 299, height: 4}],
  },
  {
    name: "two overlapping events, one not",
    input: [{start: 0, end: 5 }, {start: 3, end: 7 }, {start: 9, end: 12 }],
    expected: [{top: 0, left: 0, width: 299, height: 5}, {top: 3, left: 300, width: 299, height: 4}, {top: 9, left: 0, width: 600, height: 3}],
  },
  {
    name: "multiple overlapping events",
    input: [{start: 0, end: 5 }, {start: 3, end: 7 }, {start: 6, end: 12 }],
    expected: [{top: 0, left: 0, width: 199, height: 5}, {top: 3, left: 200, width: 199, height: 4}, {top: 6, left: 400, width: 199, height: 6}],
  },
  {
    name: "multiple overlapping events in varied order with non overlapping",
    input: [{start: 0, end: 5 }, {start: 3, end: 7 }, {start: 6, end: 12 }, {start: 15, end: 20}, {start: 22, end: 25}, {start: 24, end: 27}],
    expected: [{top: 0, left: 0, width: 199, height: 5}, {top: 3, left: 200, width: 199, height: 4}, {top: 6, left: 400, width: 199, height: 6}, {top: 15, left: 0, width: 600, height: 5}, {top: 22, left: 0, width: 299, height: 3}, {top: 24, left: 300, width: 299, height: 3}],
  },

].forEach(function(td){
  var actual = layOutDay(td.input)
  var pass = JSON.stringify(actual) === JSON.stringify(td.expected)
  if (pass){
    console.log("passed:", td.name)
  }else{
    console.log("failed:", td.name)
    console.log("expected:", td.expected)
    console.log("actual:", actual)
    process.exit()
  }
})




