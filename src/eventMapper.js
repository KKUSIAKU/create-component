
const supportedEventRegistry = {
 onClick:'onClick',
 onFocus:'onFocus',
 onMouseOver:'onMouseOver',

}

export function getEventHandlers(registry){
  var eventListeners = {},
  registryKeys = Object.keys(registry);
 

  if(! registryKeys.length) return eventListeners;
  

 for(let key of registryKeys) {
   if(supportedEventRegistry[key]) eventListeners[key] = registry[key]
 }

 return eventListeners;


}