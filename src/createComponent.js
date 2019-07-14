import React from 'react';
import invariant from 'invariant';
import { isElement, isValidElementType} from 'react-is';
import { isFunction, isPrimitive,isString, inherits, _extends } from 'util';
import { controlledComponentTypes } from './utils'
import executeOperation from './executeOperation';
import { getEventHandlers, mapEventTypeToHandler } from './eventMapper';
import compose from './compose';
import exceptionMessage from './exception';

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
  focusin:createInterActiveElement.bind(null,'onFocusIn'),
  focusout:createInterActiveElement.bind(null,'onFocusOut'),
  mouseover: createInterActiveElement.bind(null, 'onMouseOver'),
  mouseleave: createInterActiveElement.bind(null, 'onMouseLeave'),
  mouseup: createInterActiveElement.bind(null, 'onMouseUp'),
  mousedown: createInterActiveElement.bind(null, 'onMouseDown'),

  // input specific events
  change:createInterActiveElement.bind(null,'onChange'),
  input:createInterActiveElement.bind(null,'onInput')
}


/*
* @private
* Mixins various prop in statefull component on wrapped component
* @return {undefined}
*/
function constructorMixins(className, finalProps){
 this.events = getEventHandlers(finalProps);
 // value and defaultValue are extracted to avoid setting twice those on interactive element 
 const { render, autoFocus, refCallback, value,defaultValue,...instanceProps } = this.props;
 
 // decorate may be to avoid error in case of input , textarea ...
 // and add function that retrun null to test 
 this.loaded = false;
 this.updateCount = 0;
 this.classNameController = className || function () { return '' }; //new AbortController();
 this.instanceProps = instanceProps;
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

function createComponent({
  createElement = React.createElement,
  type = 'div',
  config = {},
  element = {},
  component = null
} = {}) {

  invariant(
    Boolean(type),
    'createComponent expects one of  `type` or `component` input opitons'
  )

  // invariant(
  //   !(Boolean(type) && Boolean(component)),
  //   'CreateComponent called with forbiden input. You are trying to use both type and component together. Use only one.' +
  //   'type should correspond a valid HTMLS tagName and component must be a react element constructor function or class'
  // );

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

    const { children, state,context } = arg;

    // need to split this 
    if (state || context) {

      
        /**
         * React class component
         * @param {function} UserInterActiveInput
         * 
         */
      
      class UserInterActiveInput extends React.Component {

        constructor(props) {
          super(props);
          this.state = {
            ...state
          }
         //  this.events = getEventHandlers(finalProps);
          let { defaultValue , value } = this.props;
          constructorMixins.call(this,className,finalProps);
          this.valueController = function () { return defaultValue || value || ''}

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
          let callback = events[mapEventTypeToHandler(eventType)] 
          e.preventDefault();
          let command = callback(props, state, this.getSubProps());
          executeOperation(this, command)

          // This is the origin cocde, it has been replaced 
          // which line above that pass all test but mystery 
          // the remove is motived with jest highlight uncoverod line 
          // let callback = events[mapEventTypeToHandler(eventType)];
          // e.preventDefault();
          // if (callback) {
          //   // need some attention to not break dom manipulation 
          //   // as focusing on update
          //   let command = callback(props, state, this.getSubProps());
          //   executeOperation(this, command)
          // }

        }

        listenEvent = (eventsConfigs) => {
          var subjet = {};
          for (let key in this.events) {
            subjet[key] = this.eventManager;
          }

          return subjet

        }

        // runChildBuilder() {
        //   const { render, ...restProps } = this.props;
        //   const { state } = this;
        //   return render(restProps, state)
        // }

        setNodeProps = () => {
          let props = {};
          let settings = {
            className:this.classNameController,
            id:id,
            'aria-label': ariaLabel ,
            value:this.valueController
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

        render(){
          return React.createElement(
          type, {
            ref:this.refCallback,
            ...this.setNodeProps(),
            ...this.listenEvent(this.events),
            ...this.instanceProps

          }
          )
        }
      }


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
          let callback = events[mapEventTypeToHandler(eventType)] 
          e.preventDefault();
          let command = callback(props, state, this.getSubProps());
          executeOperation(this, command)
          // if (callback) {
          //   // need some attention to not break dom manipulation 
          //   // as focusing on update
          //   let command = callback(props, state, this.getSubProps());
          //   executeOperation(this, command)
          // }

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

      let contextComponentApi = {};

      if(context ){
       // console.log('#################################################')
        // state = state || {};
      
        // create context 
        // The Provider here 
        let defaultContextValues  = context.defaultContextValues || {}
        const DefaultContext = React.createContext(defaultContextValues);
        
        class Provider extends React.Component{
          constructor(props){
            super(props);
            const { contextValues, children } = this.props;
        
           // subscribe to statefull or event emitter object to update
           // the provider state, for now just static provider 
            this.state = {
              ...contextValues
            }
          }
        
          render(){
            const { children } = this.props;
            invariant(
              children, 
              exceptionMessage.noChildFound
            )
          
            const Context = this.props.context || DefaultContext;
            return (
              <Context.Provider value={Object.freeze(this.state)}>
              {this.props.children}
              </Context.Provider>  
            ) 
          }
        }


        function selectConsumerFuncs(keys, context){
          var funcs = {};
         // console.log(' in selectConsumerFunc ', keys, context)
          for(var key in keys ){
            invariant(
              context[key],
              `You have provided a context Consumer a ${key} prop but none could be find in context`
            )
            
           funcs[key] = context[key];// reference here 
          }
        
          return funcs;
        }
        
        // could be move outside easily
        function setModifierFunction(arg){
          invariant(
            isFunction(arg) || isString(arg),
            `Consumer wrapper component expect function or string. Instead ${ typeof arg} is passed in!`
          )
      
          if(isFunction(arg)){
            return function (str) { return arg().trim().concat(' ', str.trim()).trim()}
          }
      
          return function(str) { return arg.trim().concat(' ', str.trim()).trim()}
        
      }
        

      /**
       * Default that set only Provider for className 
       * 
       * @param {*} props 
       */
        function ConsumerWrapper(props){
          className = '';
          // passe the modifier into props 
        
        
          let { children, ...utilities } = props; 
         // console.log('calling consumer wrappers', utilities)
        
          let classNameModifiers = Object.values(utilities).map( func => { 
            return  setModifierFunction( func) 
          });
        
          const innerContentProps = { 
            className : compose(...classNameModifiers)(className)
          }

          // any props ass className could consume it props context settings 
          // but which props except className could be usefull for this ?
        
          // generic props to pass to 
          
          // return (
          //   <div {...innerContentProps}>
          //     {children}
          //   </div>
          // )

          return  createElement(type, { ...innerContentProps }, children);
        }
        
        
        function ProviderConsumer( props){
          const { context, children,wrapper, ...otherProps } = props;
          const { Consumer } = context || DefaultContext;
          // the props of the wrapper is limited to the provider value 
          const Wrapper = wrapper || ConsumerWrapper;
        
          // Double doors check on wrapper
          invariant(
            isValidElementType(Wrapper), 
            'Consumer expects valid React element as wrapper.'+
            `Instead got ${typeof Wrapper}`
          )

          invariant(
            isElement(<Wrapper/>), 
            'Consumer expects valid React element as wrapper.'+
            `Instead got ${typeof Wrapper}`
          )
        
          // Reomve JSX 
          return (
            <Consumer>
              {utility => { 
              const  funcs = selectConsumerFuncs(otherProps, utility)
              return <Wrapper {...funcs}> {children} </Wrapper>
            }}
            </Consumer>
          )
        }

        contextComponentApi.Provider = Provider;
        contextComponentApi.Consumer = ProviderConsumer;
      }

      //inherits(Component,)
      if(context){
       // console.log('here ')
        return contextComponentApi;
      }

      if(controlledComponentTypes.hasOwnProperty(type)){
        return UserInterActiveInput
      }else {
              // create statefull component and return the new function 
      invariant(
        !children,
        'You are trying to build a stateful component with creatComponent method' +
        'with children props. Provide render method props instead to buil the DOM rendered children '
      )
        return Component;
      }
    }























  //  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')

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



export default createComponent;