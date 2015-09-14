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
  var sortedEvents = sortEvents(events)
  var convertedEventList = []

  for (var i = 0; i < sortedEvents.length; ++i){
    var currentEvent = sortedEvents[i]
    var previousEvent = sortedEvents[i-1]
    var nextEvent = sortedEvents[i+1]
    log('previousEvent', previousEvent)
    log('currentEvent', currentEvent)
    log("compare", priorEventOverlap(currentEvent, previousEvent))

    if (eventOverlap(currentEvent, nextEvent)){
      var overlappingEvents = [currentEvent, nextEvent]
      ++i /* increment i to skip 'nextEvent' on next loop through */

     while (eventOverlap(currentEvent, sortedEvents[i+1])){
        overlappingEvents = overlappingEvents.concat(sortedEvents[i+1])
        nextEvent = sortedEvents[++i] /* increment i again to skip until non overlapping event is found */
      }
      convertedEventList = convertedEventList.concat(formatOverlappingEvents(overlappingEvents, width))
    }

    if (priorEventOverlap(currentEvent, previousEvent)) {
        log("prior match loop", "")
        var formattedEvents = formatOverlappingEvents([currentEvent, previousEvent], width)
        /* update prior event */
        convertedEventList[convertedEventList.length-1] = formattedEvents[1]
        convertedEventList = convertedEventList.concat(formattedEvents[0])
    }

    if ( !eventOverlap(currentEvent, nextEvent) && !priorEventOverlap(currentEvent, previousEvent)){
      // log('no overlaps found', "")
      convertedEventList = convertedEventList.concat(eventBuilder(currentEvent))
    }
    log('exiting loop. I is', i)
  }
  return convertedEventList
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


var priorEventOverlap = function(currentEvent, previousEvent){
    if (previousEvent === undefined){return false}
    log("match?", currentEvent['start'] < previousEvent['end'] )
    return currentEvent['start'] < previousEvent['end']
}

var eventOverlap = function(currentEvent, nextEvent){
  if (nextEvent === undefined){return false}
  return nextEvent['start'] < currentEvent['end']
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


var loggedItems = []
var log = function (name, itemToLog = '') {
  loggedItems.push([name, itemToLog])
  return itemToLog
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

console.log('')
console.log('prior overlap')
;[
  {
    name: "prior overlap true",
    input: [{start: 30, end: 150}, {start: 145, end: 200}, ],
    expected: true
  },
   {
    name: "prior overlap test 2",
    input: [{start: 560, end: 620},
            {start: 610, end: 670},
            ],
    expected: true
  },

].forEach(function(td){
  var actual = priorEventOverlap(td.input[1], td.input[0])
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
            {start: 0, end: 5 },
            {start: 3, end: 7 }
            ],
    expected: [
              {top: 0, left: 0, width: 299, height: 5},
              {top: 3, left: 300, width: 299, height: 4}
              ],
  },
  {
    name: "two overlapping events, one not",
    input: [
            {start: 0, end: 5 },
            {start: 3, end: 7 },
            {start: 9, end: 12 }
           ],
    expected: [
               {top: 0, left: 0, width: 299, height: 5},
               {top: 3, left: 300, width: 299, height: 4},
               {top: 9, left: 0, width: 600, height: 3}
              ],
  },
  // {
  //   name: "multiple overlapping events",
  //   input: [
  //           {start: 0, end: 5 },
  //           {start: 3, end: 7 },
  //           {start: 6, end: 12 }
  //          ],
  //   expected: [
  //              {top: 0, left: 0, width: 199, height: 5},
  //              {top: 3, left: 200, width: 199, height: 4},
  //              {top: 6, left: 0, width: 199, height: 6}
  //             ],
  // },
  // {
  //   name: "multiple overlapping events in varied order with non overlapping",
  //   input: [
  //           {start: 0, end: 5 },
  //           {start: 3, end: 7 },
  //           {start: 6, end: 12 },
  //           {start: 15, end: 20},
  //           {start: 21, end: 22},
  //           {start: 22, end: 25},
  //           {start: 24, end: 27}
  //          ],
  //   expected: [
  //              {top: 0, left: 0, width: 199, height: 5},
  //              {top: 3, left: 200, width: 199, height: 4},
  //              {top: 6, left: 400, width: 199, height: 6},
  //              {top: 15, left: 0, width: 600, height: 5},
  //              {top: 21, left: 0, width: 600, height: 1},
  //              {top: 22, left: 0, width: 299, height: 3},
  //              {top: 24, left: 300, width: 299, height: 3}
  //             ],
  // },

  {
    name: "prior event overlap case",
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
    console.log("FAILED:", td.name)
    console.log("expected:" )
    console.log(td.expected)
    console.log("actual:")
    console.log(actual)
    loggedItems.forEach(( [label, item]) => console.log(label, item))
    process.exit()
  }
})




