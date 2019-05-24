import React from 'react';
import invariant from 'invariant';
import { isFunction } from 'util';

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
    // single react node component
    // content:null,
    // prop:null, 
    
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
    for( propName in parent){
      element[propName] = ancestor[parent];
    }
  }

  element[prop] = func;

  return element;
}


export function createDataTagedElement(data,element){
  var $element = element;
 for(var keyName in data){
  $element = ReactTypedElement(`data-${keyName}`, () => data[keyName])
 }
 return $element;
}

// used once 
export function createStyledElement(handler, element, prop){
  if( prop == 'class') return ReactTypedElement('className', () => handler,element)
  if(prop =='id') return ReactTypedElement('id', () => handler, element)
  if(prop == 'ariaLabel') return ReactTypedElement('ariaLabel',() => handler,element)

  return ReactTypedElement(prop, handler, element );
}

export function createClickableElement(handler, element){
  return ReactTypedElement('onClick', handler, element)
}

export function createHoverableElement(handler, element){
  return ReactTypedElement('onHover', handler, element)
}

export function createFocusableElement(handler, element){
  return ReactTypedElement('onFocus', handler, element)
}




const matcher = {
  id:createStyledElement,
  ariaLabel: createStyledElement,
  class:createStyledElement,
  click:createClickableElement,
  hover:createHoverableElement,
  focus:createFocusableElement
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
 
   function  wrappeComponent(arg){

    const { children,state } = arg;

    if(state) { 
      // create statefull component and return the new function 
      class Component extends React.Component{
        constructor(props){
          super(props);
          this.state = {
            ...state
          }
          const { render } = this.props;
          invariant(
            render, 
            'Expected render function to build content'
          )
        }

        eventManager(e){
          e.preventDefault();
        }

        runChildBuilder() {
          const { render, ...restProps } = this.props;
          const { state } = this;
          return render(restProps, state)
        }

        render(){
          return createElement(type, { className, ...finalProps }, this.runChildBuilder());
        }
      }

      return Component;
    }
    
    console.log(className)
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

export default createFunctionalComponent;