
import invariant from 'invariant';
import { isFunction } from 'util';

var TYPED_ELEMENT = 'TYPED_ELEMENT';

/**
 * Factory method defining react component with a custom api 
 * @param {string} prop 
 * @param {function} func A function that accept two paramater, the props and state of the component
 * it should retur and an objec to that matchs a state slice of the component
 * '@param {object} ancestor a ReactTypedElement
 */
var ReactTypedElement = function createTypedElement(prop, func, parent) {
  var element = {
    $type: TYPED_ELEMENT,
  }

  invariant(
    prop,
    'View builder a valid prop'
  )

  invariant(
    isFunction(func),
    'Second argument must be function'
  )

  if (parent) {
    for (let propName in parent) {
      element[propName] = parent[propName];
    }
  }

  element[prop] = func;

  return element;
}

export default ReactTypedElement 