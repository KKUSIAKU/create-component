import React from 'react';

import { compose } from '../utils/compose'
const { createElement } = React;


/**
 * A presentational content node. It is a static node, that is 
 * it does not support any change (attribute, or statefufll value could not be change)
 * Think of functional content as a container or ui placeholder for it potential children  
 * @function
 * @private
 * @param {object}  - An options 
 * @param {object} props.config - A properties object
 * @param {string} [props.type='div'] - A valid HTML5 tag
 * @param {array} props.modules - An array of interfaces to transform `props.config` into React properties parmaters
 * @param { children | function }  props.children - An array of valid react element or a react element constructor.
 * If function, it is called with any parameters.
 * @return {object} A React element.
 */

 // Valid types are any that fall into flow, phrasing, and sectioning categories 
 // without belonging to any othe categories 
 // https://www.w3.org/TR/2018/WD-html53-20181018/dom.html#sectioning-content

 // for speed caluclated tags validations group just once as body-parser 
 // to initiate parsers 
 // check if react-node empty rendered if children is null 
 // could be it function

 // will be different from paplable content that will notify 
 // the page controller it render nothing as it is an error for 


function FunctionalUIContent({ type, modules, children, config }) {
   // modules is not the right word
  children = children || null;
  if (typeof children === 'function') children = children();

  // modules are limited now 
  const {
    accessibilityModule,
    attributeModule,
    styleModule
  } = modules;

 // type = type || 'div';
  let props =  compose( ...modules )({ config }).props


  // use plugins to augment children before rendering 
  // as in webpack, plugins works on the normal output of the framework
  // children = compose(...plugins)(children)
  // hence you can wrapp an children in a new component to style
  // animate the all content box 
  // stop the event propagation, cancel what ever you want 
  

  return createElement(type, {
    ...props
  },
    children);
}

export default FunctionalUIContent;