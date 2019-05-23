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


  describe('Event attaching to created object', () => {
    var Component;
    var setting =  {
      config:{
        click:() => console.log('have being click')
     }
    };

    var onClickSpy = sinon.spy(setting.config, 'click' )

    beforeEach(() => {
     Component = createComponent(setting);
    })

    // it(' Should have attached the click event handler to the element', () => {
    //   let instance = shallow(<Component/>)
    //  instance.simulate('click');
    //  console.log(shallow(<div onClick={()=>null}></div>).props().click)
    //  console.log(instance.html())
    //   expect(instance.prop('click')).to.be.a('function');
    //   expect(onClickSpy.callCount).to.equal(1)
    // })
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