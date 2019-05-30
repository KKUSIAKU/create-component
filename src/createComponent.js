import React from 'react';
import invariant from 'invariant';
import { isFunction, isPrimitive } from 'util';
import executeOperation from './executeOperation';
var REACT_TYPED_ELEMENT = 'REACT_TYPED_ELEMENT';

/**
 * Factory method defining react component with a custom api 
 * @param {string} prop 
 * @param {function} func A function that accept two paramater, the props and state of the component
 * it should retur and an objec to that matchs a state slice of the component
 * '@param {object} ancestor a ReactTypedElement
 */
var ReactTypedElement = function createTypedElement(prop, func,  parent){
  var element = {
    $type: REACT_TYPED_ELEMENT,
  }

  invariant(
    prop,
    'View builder a valid prop' 
  )

  invariant(
    isFunction(func), 
    'Second argument must be func'
  )

  if(parent){
    for(let  propName in parent){
      element[propName] = parent[propName];
    }
  }

  element[prop] = func;

  return element;
}


// used once 
export function createAttributesElement(prop,handler, element){
  let resolver; 
  if(isPrimitive(handler)) {
     resolver = () => handler
  }
  if(isFunction(handler)) {
    resolver = handler
  }

  return ReactTypedElement(prop, resolver, element );
}


export function createInterActiveElement(eventType, handler, element){
  return ReactTypedElement(eventType, handler, element)
}


const matcher = {
  id:createAttributesElement.bind(null, 'id'),
  ariaLabel: createAttributesElement.bind(null,'ariaLabel'),
  class:createAttributesElement.bind(null, 'className'),
  click:createInterActiveElement.bind(null,'onClick'),
  mouseover:createInterActiveElement.bind(null,'onMouseOver'),
  focus:createInterActiveElement.bind(null,'onFucos'),
}

// provide an api for setting css and forward props, reference ...
// style or css for adding class 
// data for setting data attribute 
// aria for setting aria attribute 

// while the component is mount those functions will fired this setState when called 
// to update the component

function createFunctionalComponent({
 createElement = React.createElement,
 type = 'div',
 config = {},
 element = {},
 component =null 
}={}){

  invariant(
    !(!Boolean(type) && !Boolean(component)),
    'createComponent expects one of  `type` or `component` input opitons'
  )

  invariant(
    !(Boolean(type) && Boolean(component)),
    'CreateComponent called with forbiden input. You are trying to use both type and component together. Use only one.'+
    'type should correspond a valid HTMLS tagName and component must be a react element constructor function or class'
  );

  let $element, _props;

  if( Object.keys(config).length){
    for( var keyName in config){
      $element = matcher[keyName](config[keyName], $element, keyName)
    }
    let { $type, ...$props} = $element
    _props = $props;
  }
  
 let {$type, className, data, ariaLabel, id, ...finalProps } = _props || {};
   function getEventHandlers(setting) {
     let { 
          onClick,
          onMouseOver, 
          onFocus,
        } = setting;
    return   {
      onClick,
      onMouseOver,
      onFocus
    }
   }
   function  wrappeComponent(arg){

    const { children,state } = arg;

    if(state) { 
      // create statefull component and return the new function 
        invariant(
          !children,
          'You are trying to build a stateful component with creatComponent method' +
          'with children props. Provide render method props instead to buil the DOM rendered children '
        )

      class Component extends React.Component{
        constructor(props){
          super(props);
          this.state = {
            ...state
          }
          this.events = getEventHandlers(finalProps);
          const { render } = this.props;
          invariant(
            render, 
            'Expected render function to build content'
          )
          this.eventManager = this.eventManager.bind(this)
     
          this.classNameController  = className || void '' ; //new AbortController();
        }

        eventManager(e){
        let  eventType = e.type;
          const { events, props, state } = this;
          let callback = events[mapEventTypeToHandler(eventType)];
          e.preventDefault();
          if(callback){
            let command = callback(props, state);
            executeOperation(this,command)
          }

        }

      listenEvent = (eventsConfigs) => {
        var subjet = {};
        for(let key in this.events) {
          subjet[key] = this.eventManager;
        }

        return subjet

      }

        runChildBuilder() {
          const { render, ...restProps } = this.props;
          const { state } = this;
          return render(restProps, state)
        }

        render(){
          return createElement(type, {
            className: this.classNameController ? this.classNameController() :'',
            id: id ? id():'',
            'aria-label': ariaLabel? ariaLabel():'', ...this.listenEvent(this.events) }, 
            this.runChildBuilder());
        }
      }

      return Component;
    }

    // some function need to be exectuted and return primive value such number or string 
    // concern class, id, aria 
    return createElement(type, { 
      className: className ? className():'',
      id: id ? id():'',
      'aria-label': ariaLabel? ariaLabel():'',
       ...finalProps },
        children );
  }
  
  return wrappeComponent; 
 
}


function mapEventTypeToHandler(type){
  switch(type){
    case 'click':
      return 'onClick'
    case 'mouveover':
      return 'onMouseOver';
    default:
      return void 0;
  }

}
export default createFunctionalComponent;