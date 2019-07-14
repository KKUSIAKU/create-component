
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
// see above link for event list information 
const supportedEventRegistry = {
  // focus events 
  onBlur: 'onBlur',
  onFocus: 'onFocus',
  onFocusIn:'onFocusIn',
  onFocusOut:'onFocusOut',

  // mouse events 
  onClick: 'onClick',
  onDoubleClick: 'onDoubleClick',
  onMouseOver: 'onMouseOver',
  onMouseLeave: 'onMouseLeave',
  onMouseDown: 'onMouseDown',
  onMouseUp: 'onMouseUp',

  // forms related events 
  onChange: 'onChange',
  onInput:'onInput',



}

export function getEventHandlers(registry) {
  var eventListeners = {},
    registryKeys = Object.keys(registry).filter( key => supportedEventRegistry.hasOwnProperty(key));
  for (let key of registryKeys) {
     eventListeners[key] = registry[key]
  }
  return eventListeners;
}

const supportedEventPropsRegistry ={
  
    blur: 'onBlur',
    focus: 'onFocus',
    focusin:'onFocusIn',
    focusout:'onFocusOut',
  
    // mouse events 
    click: 'onClick',
    doubleclick: 'onDoubleClick',
    mouseover: 'onMouseOver',
    mouseleave: 'onMouseLeave',
    mousedown: 'onMouseDown',
    mouseup: 'onMouseUp',
  
    // forms related events 
    change: 'onChange',
    input:'onInput',

    // dimension event 
    resize:'onResize'
}


export function mapEventTypeToHandler(type) {
  return supportedEventPropsRegistry[type] ;
}