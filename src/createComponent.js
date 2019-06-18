import React from 'react';
import invariant from 'invariant';
import { isFunction, isPrimitive, inherits, _extends } from 'util';
import executeOperation from './executeOperation';
import { getEventHandlers } from './eventMapper';
var REACT_TYPED_ELEMENT = 'REACT_TYPED_ELEMENT';

/**
 * Factory method defining react component with a custom api 
 * @param {string} prop 
 * @param {function} func A function that accept two paramater, the props and state of the component
 * it should retur and an objec to that matchs a state slice of the component
 * '@param {object} ancestor a ReactTypedElement
 */
var ReactTypedElement = function createTypedElement(prop, func, parent) {
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

  if (parent) {
    for (let propName in parent) {
      element[propName] = parent[propName];
    }
  }

  element[prop] = func;

  return element;
}


// used once 
export function createAttributesElement(prop, handler, element) {
  let resolver;
  if (isPrimitive(handler)) {
    resolver = () => handler
  }
  if (isFunction(handler)) {
    resolver = handler
  }

  return ReactTypedElement(prop, resolver, element);
}


export function createInterActiveElement(eventType, handler, element) {
  return ReactTypedElement(eventType, handler, element)
}


const matcher = {
  id: createAttributesElement.bind(null, 'id'),
  ariaLabel: createAttributesElement.bind(null, 'ariaLabel'),
  class: createAttributesElement.bind(null, 'className'),

  // mouse events 
  click: createInterActiveElement.bind(null, 'onClick'),
  blur: createInterActiveElement.bind(null, 'onBlur'),
  doubleclick: createInterActiveElement.bind(null, 'onDoubleClick'),
  focus: createInterActiveElement.bind(null, 'onFocus'),
  mouseover: createInterActiveElement.bind(null, 'onMouseOver'),
  mouseleave: createInterActiveElement.bind(null, 'onMouseLeave'),
  mouseup: createInterActiveElement.bind(null, 'onMouseUp'),
  mousedown: createInterActiveElement.bind(null, 'onMouseDown')
}


/*
* @private
* Mixins various prop in statefull component on wrapped component
* @return {undefined}
*/
function constructorMixins(className, finalProps){
 this.events = getEventHandlers(finalProps);
 const { render, autoFocus, refCallback, ...instanceProps } = this.props;
 
 // decorate may be to avoid error in case of input , textarea ...
 // and add function that retrun null to test 
 invariant(
   render,
   'Expected render function to build content'
 )
 this.loaded = false;
 this.updateCount = 0;
 this.classNameController = className || function () { return '' }; //new AbortController();
 this.instanceProps = instanceProps;
 // this.refCallback = refCallback ;
 // this.refTapable = function (element) {
 //   if(this.refCallback){
 //     void element.current.apply()
 //   }
 // }

 this.domNodeReference;
 this.autoFocus = autoFocus || false;
 this.nullFunction = function nullFunction() {};
};


// provide an api for setting css and forward props, reference ...
// style or css for adding class 
// data for setting data attribute 
// aria for setting aria attribute 

// while the component is mount those functions will fired this setState when called 
// to update the component

/**
 * 
 * @param {object} [opitons={}]
 * @param {function} opitons.createElement Factory function to set type and props to pass to React.createElement
 * @param {string} options.type The DOM node type to create 
 * @param {object} [options.config ={}] A config object used by options.createElement 
 * @return {function|class} React Component
 */

function createFunctionalComponent({
  createElement = React.createElement,
  type = 'div',
  config = {},
  element = {},
  component = null
} = {}) {

  invariant(
    !(!Boolean(type) && !Boolean(component)),
    'createComponent expects one of  `type` or `component` input opitons'
  )

  invariant(
    !(Boolean(type) && Boolean(component)),
    'CreateComponent called with forbiden input. You are trying to use both type and component together. Use only one.' +
    'type should correspond a valid HTMLS tagName and component must be a react element constructor function or class'
  );

  let $element, _props;

  if (Object.keys(config).length) {
    for (var keyName in config) {
      $element = matcher[keyName](config[keyName], $element, keyName)
    }
    let { $type, ...$props } = $element
    _props = $props;
  }

  let { $type, className, data, ariaLabel, id, ...finalProps } = _props || {};

  function wrappeComponent(arg) {

    const { children, state } = arg;

    if (state) {
      // create statefull component and return the new function 
      invariant(
        !children,
        'You are trying to build a stateful component with creatComponent method' +
        'with children props. Provide render method props instead to buil the DOM rendered children '
      )
        /**
         * React class component
         * @param {function} render 
         * 
         */
      class Component extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            ...state
          }
         //  this.events = getEventHandlers(finalProps);
          
          constructorMixins.call(this,className,finalProps)
          
          // const { render, autoFocus, refCallback, ...instanceProps } = this.props;
          // invariant(
          //   render,
          //   'Expected render function to build content'
          // )

          // this.loaded = false;
          // this.updateCount = 0;
          // this.classNameController = className || function () { return '' }; //new AbortController();
          // this.instanceProps = instanceProps;
          // // this.refCallback = refCallback ;
          // // this.refTapable = function (element) {
          // //   if(this.refCallback){
          // //     void element.current.apply()
          // //   }
          // // }

          // this.domNodeReference;
          // this.autoFocus = autoFocus || false;
          // this.nullFunction = function nullFunction() {};

          this.eventManager = this.eventManager.bind(this);
          this.refCallback = this.refCallback.bind(this);
        }

        componentDidMount() {
          Object.defineProperty(this, 'loaded', {
            value: true
          });
          
          if(this.autoFocus){
            this.domNodeReference.focus()
          }
        }

        getSubProps() {
          let {
            loaded,
            updateCount,
            classNameController,
            domNodeReference
          } = this;

          return {
            loaded,
            updateCount,
            className: classNameController(),
            domNodeReference
          }
        }

        eventManager(e) {
          let eventType = e.type;
          const { events, props, state } = this;
          let callback = events[mapEventTypeToHandler(eventType)];
          e.preventDefault();
          if (callback) {
            // need some attention to not break dom manipulation 
            // as focusing on update
            let command = callback(props, state, this.getSubProps());
            executeOperation(this, command)
          }

        }

        listenEvent = (eventsConfigs) => {
          var subjet = {};
          for (let key in this.events) {
            subjet[key] = this.eventManager;
          }

          return subjet

        }

        runChildBuilder() {
          const { render, ...restProps } = this.props;
          const { state } = this;
          return render(restProps, state)
        }

        setNodeProps = () => {
          let props = {};
          let settings = {
            className:this.classNameController,
            id:id,
            'aria-label': ariaLabel ,
          }
          Object.keys(settings)
          .filter(key => settings[key])
          .forEach(key => {
            props[key]= settings[key]()
          })
          return props;
        }

        // the ref will receive here DOM node 
        // the ref passed as  props will be passed direct to DOM 
        // will ref pass during config could be set to passed ref on react compoent
        refCallback = (e) => {
          this.domNodeReference = e;
        }



        render() {
          return createElement(type, {
            ref:this.refCallback,
            ...this.setNodeProps(),
            ...this.listenEvent(this.events),
            ...this.instanceProps
          },
            this.runChildBuilder());
        }
      }

      //inherits(Component,)

      return Component;
    }


    // some function need to be exectuted and return primive value such number or string 
    // concern class, id, aria 
    return createElement(type, {
      className: className ? className() : '',
      id: id ? id() : '',
      'aria-label': ariaLabel ? ariaLabel() : '',
      ...finalProps
    },
      children);
  }

  return wrappeComponent;

}


function mapEventTypeToHandler(type) {
  switch (type) {
    case 'click':
      return 'onClick'
    case 'mouseover':
      return 'onMouseOver';
    case 'mouseleave':
      return 'onMouseLeave';
    case 'mousedown':
      return 'onMouseDown';
    case 'mouseup':
      return 'onMouseUp';
    case 'blur':
      return 'onBlur';
    case 'doubleclick':
      return 'onDoubleClick';
    case 'change':
      return 'onChange';
    case 'input':
      return 'onInput';
    case 'focusin':
      return 'onFocusIn';
    case 'focusout':
      return 'onFocusOut';
    default:
      return void 0;
  }

}
export default createFunctionalComponent;