
import React, {Component } from 'react';
import createComponent from './createComponent';

const Parent = Component
  // old createComponent in play here 

export class PresentionalComponent extends Parent{
  constructor(props){
    super(props)
  }


  render(){
    let { type } = this.props ;
    return createComponent({type, config:{}})
    // return 'presentional'
  }
}


export class InteractiveComponent extends Parent{
  constructor(props){
    super(props)
  }
  render(){

    return createComponent({type, config:{}})({state:{}})
   // return 'interactive'
  }
}

export class ContextProvider extends Parent{

  render(){
    return createComponent({type, config:{}})({context})
    //return 'ContexProvider'
  }
}