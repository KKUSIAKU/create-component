import { expect 
} from 'chai'
import { shallow, mount, render } from 'enzyme'; 
import { 
   isElement,
   isContextConsumer,
   isContextProvider
 }
    from 'react-is';
import sinon from 'sinon';
import createComponent from '../src/createComponent';
import * as ReactIs from 'react-is';
import React from 'react';

// should be able to create stateless component 
// should be able to create statefull component
// should be able to add any type of event to a component , for now no check on valid event 
// statefull component creation must be composable, with seperating the initial state and 
// runtime instruction (lifecyle method operation is then ) is then removed from the component definiton 
// 

var syntheticEvent = {
  type:'click',
  preventDefault:() => null
}
var focusEvent = {
  type:'focus',
  preventDefault:() => null
}

var changeEvent = {
  type:'change',
  preventDefault:() => null
}

function getError(func){
  try{
    func();
    return
  }catch(err){
    return err;
  }
}


function createSyntheticEvent(type) {
  return {
    type, 
    preventDefault:() => null
  }
}

describe('createComponent function test', () => {

  describe('Component creation steps testing with createComponent ', () => {
    var Component; 
    beforeEach(() => {
     Component = createComponent();

    })
    
  it('Component should be a function', () => {
    let actual = typeof Component;
    let expected = 'function';
    expect(actual).to.equal(expected);

  })

  it('Component should be a valid react element', () => {
    let actual = ReactIs.isValidElementType(Component);
    let expected = true;
    expect(actual).to.equal(expected); 
  })
 
   it('Component should be stateless', () =>{
     expect(() => shallow(<Component/>).state()).to.throws('ShallowWrapper::state() can only be called on class components')
   })
 
   describe('Component curring to create statefull element',() => {
    it('Component should return a new function', () => {
      var ComponentWithState = Component({state:{value:'state value'}});
      var actual = typeof ComponentWithState;
      var expected = 'function';
      expect(actual).to.equal(expected);
    })
    

    it('Component returned function should throws when called without render props value', () => {
      var ComponentWithState = Component({state:{value:'state value'}});
      expect(() => shallow(<ComponentWithState/>).state()).to.throws()
    })

    it('Component should return statefull component when called state keyworded argument', () => {
      var ComponentWithState = Component({state:{}});
      const render = () => null;
      expect(() => shallow(<ComponentWithState render ={render}/>).state()).to.not.throws();
    })

    it('Should called the render method with the state as second argument', () => {
      const stateConfig = {value:'state value'};
      var ComponentWithState = Component({state:stateConfig});
      const render = (p,s) => s.value;
      const renderedElement = shallow(<ComponentWithState render ={render}/>);
      const expectedStateValue = stateConfig.value;
      const actualStateValue = renderedElement.text();
      expect( actualStateValue ).to.equal(expectedStateValue)
   })

   it('Should called the render method with props as first argument', () => {
    const stateConfig = {value:'state value'};
    var ComponentWithState = Component({state:stateConfig});
    const render = (p,s) => p.value
    const renderedElement = mount(<ComponentWithState  value = {stateConfig.value} render ={render}/>);
    const expectedStateValue = stateConfig.value;
    const actualStateValue = renderedElement.text();
    expect( actualStateValue ).to.equal(expectedStateValue)
 })
  })


  })


  describe('Could receive config to set and pass props to rendered element ', () => {
    describe('Case of stateless component ', () => {
      it('should set className attribute ', () => {
        let Component = createComponent({ config:{class:'my-class'}})
        let renderedComponent =  shallow(<Component/>)
        let expected = true , actual =renderedComponent.hasClass('my-class')
        expect(actual).to.equal(expected);
      })

      it('shoud set aria-label attribute ', () => {
        let setting = { config:{ariaLabel:'my-label'}};
        let Component = createComponent(setting)
        let renderedComponent =  shallow(<Component/>)
        let expected = setting.config.ariaLabel  ,
        actual = renderedComponent.render().attr('aria-label')
        expect(actual).to.equal(expected);
      })

      it('should set id attribute ', () => {
        let setting = { config:{id:'my-id'}};
        let Component = createComponent(setting)
        let renderedComponent =  shallow(<Component/>)
        let expected = setting.config.id  ,
        actual = renderedComponent.render().attr('id')
        expect(actual).to.equal(expected);
  
      })

      describe('Config attributes or properties could be either function or primities', () => {
        it('Should render element with identical class attribute with config using string or function that returns same string', () => {
          let configOne = {config:{class:'my-class'}};
          let configTwo = {config:{class:() =>'my-class'}};
          let ComponentOne = createComponent(configOne);
          let ComponentTwo = createComponent(configTwo);
          // let renderedComponent =  shallow(<Component/>)
          let expected = true ,
          actual =shallow(<ComponentOne/>).hasClass('my-class') && shallow(<ComponentTwo/>).hasClass('my-class')
          expect(actual).to.equal(expected);
        })
      })
    })

    describe('Case of statefull component ', () => {
      it('should set className attribute ', () => {
        let Component = createComponent({ config:{class:'my-class'}})({state:{}})
        let renderedComponent =  shallow(<Component render = {() =>null}/>)
        let expected = true , actual =renderedComponent.hasClass('my-class')
        expect(actual).to.equal(expected);
      })

      it('shoud set aria-label attribute ', () => {
        let setting = { config:{ariaLabel:'my-label'}};
        let Component = createComponent(setting)({state:{}})
        let renderedComponent =  shallow(<Component render = {() =>null}/>)
        let expected = setting.config.ariaLabel  ,
        actual = renderedComponent.render().attr('aria-label')
        expect(actual).to.equal(expected);
      })

      it('should set id attribute ', () => {
        let setting = { config:{id:'my-id'}};
        let Component = createComponent(setting)({state:{}})
        let renderedComponent =  shallow(<Component render = {() =>null}/>)
        let expected = setting.config.id  ,
        actual = renderedComponent.render().attr('id')
        expect(actual).to.equal(expected);
      })

      describe('Config attributes or properties could be either function or primities', () => {
        it('Should render element with identical class attribute with config using string or function that returns same string', () => {
          let configOne = {config:{class:'my-class'}};
          let configTwo = {config:{class:() =>'my-class'}};
          let ComponentOne = createComponent(configOne)({state:{}});
          let ComponentTwo = createComponent(configTwo)({state:{}});
          // let renderedComponent =  shallow(<Component/>)
          let expected = true ,
          actual =shallow(<ComponentOne render = {() =>null}/>).hasClass('my-class') && shallow(<ComponentTwo render = {() =>null}/>).hasClass('my-class')
          expect(actual).to.equal(expected);
        })
      })
    })
  })

  describe('Event handling by the returned component by createComponent', () => {
  

    it('Should enforce event reserved words to be function ', () => {
      const configs = [{click: null}, {click:'string'},{click:{}}]
      configs.forEach( config => {
        expect(() => shallow(<ComponentWithState/>).state()).to.throws()
      })
    } )

  describe('Case of stateless component ', () => {
    var Component;
  it('Should execute onclick event handler', () => {
    let setting = { config:{click:() =>{ return {action:'update', className:'clicked'}} }};
    let clickSpy = sinon.spy(setting.config,'click');

    let Component = createComponent(setting)
    let renderedComponent =  shallow(<Component/>)
    let expected = false ,
    actual = clickSpy.called
    expect(actual).to.equal(expected);

     renderedComponent.simulate('click', syntheticEvent);
     expected = !expected;
     actual = clickSpy.called;
     let expectedCallCount = 1, actualCallCount = clickSpy.callCount;
     expect(actual).to.equal(expected);
     expect(actualCallCount).to.equal(expectedCallCount)
  })


  it('should executed any update when there is no config setting ', () => {
    let setting = { config:{ }};
    let Component = createComponent(setting)({state:{}})
    let renderSpy = sinon.spy(Component.prototype, 'render')
    let renderedComponent =  shallow(<Component render={()=>null}/>)
    renderedComponent.simulate('click', syntheticEvent);
    let expected = true ,
    actual = renderSpy.called,
    actualCallCount = renderSpy.callCount,
    expectedCallCount = 1;
    expect(actual).to.equal(expected);
    expect(actualCallCount).to.equal(expectedCallCount)
  })
  })


  describe('Case of statefull component ', () => {
    var Component;
  it('Should execute onclick event handler', () => {
    let setting = { config:{click:() => 'clicked'}};
    let clickSpy = sinon.spy(setting.config,'click');

    let Component = createComponent(setting)({state:{}})
    let renderedComponent =  shallow(<Component  render = {() =>null}/>)
    let expected = false ,
    actual = clickSpy.called
    expect(actual).to.equal(expected);

     renderedComponent.simulate('click', syntheticEvent);
     expected = !expected;
     actual = clickSpy.called;
     let expectedCallCount = 1, actualCallCount = clickSpy.callCount;
     expect(actual).to.equal(expected);
     expect(actualCallCount).to.equal(expectedCallCount)
  })
  })
})

  describe('Component creation with multiple field setting ', () => {
    it('should not throws with config with multiple field', () => {
      const click = ()  => { console.log(2)};
      const test = 'mx-3';
      let Component = createComponent({ config:{ click, class:'mx-3'}}) ;
      let renderedComponent = shallow(<Component/>)
      expect(() => shallow(<Component/>)).to.not.throws()
    })

  })


  describe('createComponent statefull return component re-rendering ', () => {
    var Component;
    it(' Should re-render on click event ', () =>{
      let render =sinon.spy();
      let setting = { config:{click:() =>({type:'UPDATE', target:'className'})}};
      let clickSpy = sinon.spy(setting.config,'click');
      let componentRenderSpy; 
      let Element = createComponent(setting)({state:{}})

      componentRenderSpy = sinon.spy(Element.prototype,'render');
      Component = <Element  render = {render}/>;
      
      let  renderedComponent = shallow(Component)
      expect(componentRenderSpy.called).to.equal(true);
      expect(componentRenderSpy.callCount).to.equal(1)
      expect(render.called).to.equal(true);
      expect(render.callCount).to.equal(1)
 
      renderedComponent.simulate('click', syntheticEvent);
      expect(clickSpy.called).to.equal(true);
      expect(clickSpy.callCount).to.equal(1)
      expect(componentRenderSpy.callCount).to.equal(2)
      expect(render.callCount).to.equal(2)
    })




    it('should re-render on click event and update the className props of the component', () => {
      let render =sinon.spy();
      let setting = { config:{class:'class initial value', click:() => ({type:'UPDATE',target:'className',value:'class new value'})}};
      let clickSpy = sinon.spy(setting.config,'click');
      let componentRenderSpy; 
      let Element = createComponent(setting)({state:{}})

      componentRenderSpy = sinon.spy(Element.prototype,'render');
      Component = <Element  render = {render}/>;
      
      let  renderedComponent = shallow(Component)
      expect(componentRenderSpy.called).to.equal(true);
      expect(componentRenderSpy.callCount).to.equal(1)
      expect(render.called).to.equal(true);
      expect(render.callCount).to.equal(1);
      let expectedClassCheck = true , actualClassCheck =renderedComponent.hasClass('class initial value')
      // let expected = true , actual =renderedComponent.hasClass('class initial value')
       expect(expectedClassCheck).to.equal(actualClassCheck);


 
      renderedComponent.simulate('click', syntheticEvent);
      expect(clickSpy.called).to.equal(true);
      expect(clickSpy.callCount).to.equal(1)
      expect(componentRenderSpy.callCount).to.equal(2)
      expect(render.callCount).to.equal(2)

      actualClassCheck =renderedComponent.hasClass('class initial value');
      expect(!expectedClassCheck).to.equal(actualClassCheck);


      actualClassCheck =renderedComponent.hasClass('class new value')
      expect(expectedClassCheck).to.equal(actualClassCheck)
    })
    it('should allow autofocus just after component mount ', () => {
      // strangely this test make appaears uncovered line that does not exists before 
      // kind of behavoir to understand
      var Component;
      let setting = { type:'button', config:{class:'class initial value', focus:() => null,click:() => ({type:'UPDATE',target:'className',value:'class new value'})}};
      let Element = createComponent(setting)({state:{}});
      Component = <Element autoFocus  render={() =><div>header</div>} />;
      let  renderedComponent = mount(Component)
      const componentNode = renderedComponent.getDOMNode();
      //console.log(componentNode)
      const ownerDocument = componentNode.ownerDocument;
      const activeElement = ownerDocument.activeElement;
     // console.log(activeElement)
 
       expect(componentNode.isSameNode(activeElement)).to.equal(true)
       renderedComponent.unmount();
    })

  })


  describe('createComponent testing user interactive input component', () => {

    // should render controlled component and not just simply statefull component 
    // - checkt that the component is statefull and do not reauire render function 
    // - check the rendering 
    // check that controlled component in rendered on specific tag such as input, select, texteara ...
    //  check for the case of input that the value is  change and reference is difference 
    // build other element 

    it('Should not throws if render props is not set unlike general statefull component', () => {
      let setting = { type:'input', config:{class:'class initial value', focus:() => ({type:'UPDATE',target:'className',value:'class new value'})}};
      let Element = createComponent(setting)({state:{}});
      expect(() => shallow(<Element/>)).to. not.throws()
    })

    it('Should set default value ', () => {
      var Component;
      let setting = { type:'input', config:{class:'class initial value', change:() => null}};
      let Element = createComponent(setting)({state:{}});
      let defaultValue = 'inputValue';
      let componentRenderSpy = sinon.spy(Element.prototype,'render');
      Component = <Element  defaultValue={defaultValue}/>;
      let  renderedComponent = shallow(Component)
      expect(componentRenderSpy.called).to.equal(true);
      expect(componentRenderSpy.callCount).to.equal(1)
      expect(renderedComponent.render().val()).to.equal(defaultValue)
    })

    it('Should re-render on change event ', () => {
      var Component;
      let setting = { type:'input', config:{class:'class initial value', change:() => ({type:'UPDATE',target:'value',value:'new input value'})}};
      let changeEventSpy = sinon.spy(setting.config,'change');
      
      let Element = createComponent(setting)({state:{}});
      let defaultValue = 'inputValue';
      let componentRenderSpy = sinon.spy(Element.prototype,'render');
      
      Component = <Element  defaultValue={defaultValue}/>;
      let  renderedComponent = shallow(Component)
      expect(componentRenderSpy.called).to.equal(true);
      expect(componentRenderSpy.callCount).to.equal(1)
      expect(renderedComponent.render().val()).to.equal(defaultValue)
      renderedComponent.simulate('change', changeEvent)
      expect(changeEventSpy.called).to.equal(true)
      expect(renderedComponent.render().val()).to.equal('new input value');
      expect(componentRenderSpy.callCount).to.equal(2)
    })

    it('Should accept and re-render on focus event ', () => {
      var Component;
      let setting = { type:'input', config:{class:'class initial value', change:() => null, focus:() => ({type:'UPDATE',target:'value',value:'new input value'})}};
      let Element = createComponent(setting)({state:{}});
      Component = <Element  />;
      let  renderedComponent = shallow(Component)
      renderedComponent.simulate('focus', focusEvent)
      expect(renderedComponent.render().val()).to.equal('new input value')
    })

    describe('When disabled Interactive should not handle click event', () => {

      it('Could be disabled to receive input event ', () => {
        var Component;
        let setting = { type:'input', config:{class:'class initial value', change:() => null, click:() => null}};
        let inputEventSpy = sinon.spy(setting.config,'click')
        let Element = createComponent(setting)({state:{}});
        Component = <Element disabled  />;
      
        let  renderedComponent = shallow(Component)
      
        renderedComponent.simulate('click', createSyntheticEvent('click'))
        expect(inputEventSpy.called).to.equal(true);
        expect(inputEventSpy.callCount).to.equal(1)
      })
    })

    describe('Test on dom note element method as focus, disable, blur , see of standard method and provide them ,  ', () => {


      it('Should autofocus when autoFocus props is provided ', () => {
        var Component;
        let setting = { type:'input', config:{class:'class initial value', change:() => null}};
        let Element = createComponent(setting)({state:{}});
        Component = <Element autoFocus  />;
        let  renderedComponent = mount(Component)
        const componentNode = renderedComponent.getDOMNode()
        const ownerDocument = componentNode.ownerDocument;
        const activeElement = ownerDocument.activeElement;
   
        expect(componentNode.isSameNode(activeElement)).to.equal(true)
       // renderedComponent.simulate('click',createSyntheticEvent('click'))
       // renderedComponent.simulate('focus',createSyntheticEvent('focus'))
        renderedComponent.unmount();
      })
    })
  })

  describe(' Create component return a provider api component ', () =>{

    it('Should return an object with Provider, Consummer Api',() =>{
      const ContextElement = createComponent()({context:{}})
      //console.log(ContextElement)
      expect(ContextElement.hasOwnProperty('Provider')).to.equal(true);
      expect(ContextElement.hasOwnProperty('Consumer')).to.equal(true);
      // expect(isContextProvider(ContextElement.Provider)).to.equal(true);
      // expect(isContextConsumer(ContextElement.Consumer)).to.equal(true);
      
    })


    it('The Provider Component should accept children ', () =>{
      let ContextElement = createComponent()({context:{}})
      let { Provider } = ContextElement;

      expect(shallow(<Provider>
        <div/>
      </Provider>).children().length).to.equal(1);
     
     expect(shallow(<Provider>
           <div/>
           <div/>
         </Provider>).children().length).to.equal(2);
   })



   it('The Provider should renders it children with no modification ', () => {
    let ContextElement = createComponent()({context:{}})
    let { Provider } = ContextElement;
    
    const children =[
      <p key='one' className='border mg pd'> Content One </p>,
      <p key='two' className='border mg pd'> Content two </p>,
   ]
    
   const layout = shallow(<Provider>{children}</Provider>)
    expect(layout.children().length).to.equal(children.length);
    expect(layout.containsAllMatchingElements(children)).to.be.true;
  })


  it('The Provide should have context value prop when instantied', () => {

    let ContextElement = createComponent()({context:{}})
    let { Provider } = ContextElement;
    const context = {
      flex : () => 'd-flex',
      wrap : () => 'flex-wrap',
      direction : () => 'flex-row',
      border : () => 'border',
      row : () => 'row',
     };


    let provider = shallow(<Provider contextValues={{...context}}><div></div></Provider>);
    let providerContext = provider.prop('value');
    let keys = Object.keys(context);
    keys.forEach( key => {
      expect(providerContext[key]).to.equal(context[key])
    })
  })


  describe('The context object api default testing ', () => {
    let ContextElement = createComponent()({context:{
      defaultContextValues:{values:true, obj:{}, arr:[], flex:'flex', wrap:() =>'wrap'}}
    })
    let { Provider, Consumer } = ContextElement;

    it('should not throws when no props is passed in ', () =>{
      expect(() => render( <Consumer />)).to.not.throws()
    })

    it('Should throws when passing  parameter not present in the context object', () =>{
      expect(() => render( <Consumer do/>)).to.throws('You have provided a context Consumer a do prop but none could be find in context')
    })

    it('Shoud throws when props present in consumer (consumerwrapper) but not expected by consumer', ( ) => {
      // basically the default consumer only buid up the className props from context
      // And it expected only string or function. The function must return string 
      // Test below does not means boolean, object ... could not be set as context object neither passed to consumer
      // simply the current consumer does not expect those type of values to process 
      expect(() => render( <Consumer values/>)).to.throws('Consumer wrapper component expect function or string. Instead boolean is passed in!')
      expect(() => render( <Consumer obj/>)).to.throws('Consumer wrapper component expect function or string. Instead object is passed in!')
      expect(() => render( <Consumer arr/>)).to.throws('Consumer wrapper component expect function or string. Instead object is passed in!')
    })

    it('should not throws when valid consumer props type is passed in ', () => {
      expect(() => render( <Consumer flex />)).to.not.throws()
      expect(() => render( <Consumer wrap/>)).to.not.throws()
      expect(() => render( <Consumer flex  wrap/>)).to.not.throws()
    })

    it(' should set class attribute', () =>{
      let renderedComponent = render( <Consumer flex  wrap/>)
      expect(renderedComponent.hasClass('flex')).to.equal(true);
      expect(renderedComponent.hasClass('wrap')).to.equal(true)
    })

  })


    describe('The context consumer wrapper logic customisation ', () =>{
      let context = {
        defaultContextValues:{
          values:true, 
          obj:{},
          arr:[],
          flex:'flex',
          wrap:() =>'wrap'}
        }
      let ContextElement = createComponent()({context})
      let { Provider, Consumer } = ContextElement;
    
      it('Should allow to set custom Wrapper logic previous',() =>{
        let wrapper = function () { return <div></div>};
        let setting = { wrapper}
        let spy = sinon.spy(setting, 'wrapper');
        let renderedComponent = render( <Consumer flex  wrap {...setting}/>)
        expect(spy.called).to.equal(true);
        expect(spy.callCount).to.equal(1);

        // unlike test default behavoir flex and wrap will have no effet 
        // as wrapper do not use those props 
        expect(renderedComponent.hasClass('flex')).to.equal(false);
        expect(renderedComponent.hasClass('wrap')).to.equal(false)

        // wrapper is called with flex and wrap props as those are from the context 
        let {flex,wrap }= context.defaultContextValues;
        expect(spy.calledWithMatch({flex,wrap})).to.equal(true)

      })
    })
    

  })

})