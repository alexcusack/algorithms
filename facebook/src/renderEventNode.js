function renderEventNode(eventData){
  var newNode = $('<div><div class="right-border"></div><div></div></div>')
  $(newNode).addClass('event-node')
  $(newNode).css('top', eventData['top'])
  $(newNode).css('left', eventData['left'])
  $(newNode).css('height', eventData['height'])
  $(newNode).css('width', eventData['width'])
  return newNode
}

module.exports.renderEventNode = renderEventNode
