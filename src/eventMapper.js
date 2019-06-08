
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
    registryKeys = Object.keys(registry).filter( key => supportedEventRegistry.hasOwnProperty(key));
  for (let key of registryKeys) {
     eventListeners[key] = registry[key]
  }
  return eventListeners;
}