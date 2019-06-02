
const supportedEventRegistry = {
  onBlur: 'onBlur',
  onClick: 'onClick',
  onDoubleClick: 'onDoubleClick',
  onFocus: 'onFocus',
  onMouseOver: 'onMouseOver',
  onMouseLeave: 'onMouseLeave',
  onMouseDown: 'onMouseDown',
  onMouseUp: 'onMouseUp',

}

export function getEventHandlers(registry) {
  var eventListeners = {},
    registryKeys = Object.keys(registry);


  if (!registryKeys.length) return eventListeners;


  for (let key of registryKeys) {
    if (supportedEventRegistry[key]) eventListeners[key] = registry[key]
  }

  return eventListeners;


}