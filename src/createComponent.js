'use strict'

import React from 'react';
import invariant from 'invariant';

function createFunctionalComponent({
 createElement = React.createElement,
 type = undefined,
 props,
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

  const _props = {};

   function  wrappeComponent(props){
    const { children } = props;
    return createElement(type, _props, children );
  }
  wrappeComponent.css = function css(value) { _props.style = value;};

  wrappeComponent.addClass = function addClass(str) { 
      if(_props.className) { _props.className = `${_props.className} ${str}`} 
      else {  _props.className = `${str}`}}

  wrappeComponent.addEventListener = function addEventListener(type, handler) { 

    invariant(
      typeof handler === 'function',
      'AddEventListner method expected the second argument to be a function'
    );

    _props[type] = function(e) {
      e.preventDefault();
    handler.call(null, _props);
    }
}


  return wrappeComponent; 
 
}

export default createFunctionalComponent;