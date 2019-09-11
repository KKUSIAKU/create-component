
// import React from "react";
// import invariant from "invariant";

// var REACT_TYPED_ELEMENT = "REACT_TYPED_ELEMENT";


// /**
//  * Factory method defining react component with a custom api 
//  * @param {*} content 
//  */
// var ReactTypedElement = function createTypeElement(content ){
//   var element = {
//     type: REACT_TYPED_ELEMENT,
//     // single react node component
//     content:null,
    
//     // api for setting dynamically style, data and aria html5 attributes
//     css:null,
//     data:null,
//     aria:null,
//   };


//   return element;
// };



// // provide an api for setting css and forward props, reference ...
// // style or css for adding class 
// // data for setting data attribute 
// // aria for setting aria attribute 

// // while the component is mount those functions will fired this setState when called 
// // to update the component

// function createFunctionalComponent({
//   createElement = React.createElement,
//   type = undefined,
//   props,
//   component =null 
// }={}){

//   invariant(
//     !(!Boolean(type) && !Boolean(component)),
//     "createComponent expects one of  `type` or `component` input opitons"
//   );

//   invariant(
//     !(Boolean(type) && Boolean(component)),
//     "CreateComponent called with forbiden input. You are trying to use both type and component together. Use only one."+
//     "type should correspond a valid HTMLS tagName and component must be a react element constructor function or class"
//   );

//   const _props = {};

//   function  wrappeComponent(props){
//     const { children } = props;
//     return createElement(type, _props, children );
//   }
  
//   wrappeComponent.css = function css(value) { _props.style = value;};

//   wrappeComponent.addClass = function addClass(str) { 
//     if(_props.className) { _props.className = `${_props.className} ${str}`;} 
//     else {  _props.className = `${str}`;}};

//   wrappeComponent.addEventListener = function addEventListener(type, handler) { 

//     invariant(
//       typeof handler === "function",
//       "AddEventListner method expected the second argument to be a function"
//     );

//     _props[type] = function(e) {
//       e.preventDefault();
//       handler.call(null, _props);
//     };
//   };


//   return wrappeComponent; 
 
// }

// export default createFunctionalComponent;