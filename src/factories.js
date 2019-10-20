import React from 'react';

import {
  PresentionalComponent, 
  InteractiveComponent 
} from './components'

// Components as techenology dependent so good place to start putting in place 
// plugins architecture so the factory use a plugin to 
// to foward instantiate appropriate class
const FactoryConstructors = {};

FactoryConstructors.presentional = PresentionalComponent;
FactoryConstructors.interactive = InteractiveComponent;

// TODO between header and footer elements appeares common operations, so 
// leverage in abstraction in procedure as useMemo or built alternative oop 

// Factories may be based or different node types organised in groug 
// button nodes categories 
// header nodes categories 

export function HeaderFactory(props){
    HeaderFactory.checkType()
  let { cat, ...restProps } = props;
  cat = cat || 'presentioal';
  // HeaderFactoryConstructors   
  const Components = FactoryConstructors[cat];

  return <Components {...restProps}/>
}

HeaderFactory.checkType = function checkType({type}){
  if(!type || typeof type != 'string'){
    throw new TypeError(' Header method expect a type prop of string to instiante')
  }
  if(!['header', 'h1', 'h2', 'h3'].includes(type)){
    throw new RangeError('Invalide header Type ')
  }
}

export function FooterFactory(props){
  FooterFactory.checkType()
  let { cat, ...restProps } = props;
  cat = cat || 'presentioal';
  const Components = FactoryConstructors[cat];
  return <Components {...restProps}/>
}

FooterFactory.checkType = function checkType({type}){
  if(!type || typeof type != 'string'){
    throw new TypeError(' Header method expect a type prop of string to instiante')
  }
  if(!['header, h1,h2,h3'].includes(type)){
    throw new RangeError('Invalide header Type ')
  }
}


export function ButtonFactory(props){
  ButtonFactory.checkType()
  let { cat, ...restProps } = props;
  cat = cat || 'presentioal';
  const Components = FactoryConstructors[cat];
  return <Components {...restProps}/>
}

ButtonFactory.checkType = function checkType({type}){
  if(!type || typeof type != 'string'){
    throw new TypeError(' Header method expect a type prop of string to instiante')
  }
  if(!['header, h1,h2,h3'].includes(type)){
    throw new RangeError('Invalide header Type ')
  }
}