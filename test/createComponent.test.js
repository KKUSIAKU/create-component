import { expect 
} from 'chai'
import { shallow, mount, render } from 'enzyme'; 
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



function getError(func){
  try{
    func();
    return
  }catch(err){
    return err;
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


  })

  describe('Event handling by the returned component by createComponent', () => {
    var Component;
  it('Should execute onclick event handler', () => {
    let setting = { config:{click:() => 'clicked'}};
    let clickSpy = sinon.spy(setting.config,'click');

    let Component = createComponent(setting)
    let renderedComponent =  shallow(<Component/>)
    let expected = false ,
    actual = clickSpy.called
    expect(actual).to.equal(expected);

     renderedComponent.simulate('click');
     expected = !expected;
     actual = clickSpy.called;
     let expectedCallCount = 1, actualCallCount = clickSpy.callCount;
     expect(actual).to.equal(expected);
     expect(actualCallCount).to.equal(expectedCallCount)
  })


  it('Should enforce event reserved words to be function ', () => {
    const configs = [{click: null}, {click:'string'},{click:{}}]
    configs.forEach( config => {
      expect(() => shallow(<ComponentWithState/>).state()).to.throws()
    })
  } )
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


  // describe('createComponent statefull result testing ', () => {
  //   it(' Should re-render on click event ', () =>{
  //     expect(true).to.be.false
  //   })

  //   it('should re-render while provide value change ',() => {
  //     expect(true).to.be.false
  //   })

  //   it('Should execute lifecycle methods ', () => {
  //     expect(true).to.be.false
  //   })
  // })

})