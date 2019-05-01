import { expect 
} from 'chai'
import { shallow, mount, render } from 'enzyme'; 
import sinon from 'sinon';
import createComponent from './createComponent';
import React from 'react';

describe(' Test createComponent high order function', () => {

  describe('Invalid component type input scenario checking', () => {
    it('Should throw if neither type or  component input is provided', ()=>{
      expect(createComponent()).to.throw() 
    })
   
   it('Should throw when both type and component options are provided', ()=>{
     expect(createComponent({
       type:'div',
       component:()=>null
     })).to.throw()
   })
  })

  describe('Basic usage testing ', () =>{

    it('Should return a function ', () =>{
      expect(createComponent({type:'div'})).to.be.a('function')
    })

    it('the return function must return valid react element when called',()=>{
      const component = createComponent({type:'div'});
      expect(React.isValidElement(<component/>)).to.be.true
    })

    it('Checking simply reactcreateElement is called',()=>{
      const spy = sinon.spy(React,'createElement');
      const component = createComponent({type:'div'});
      render(<component/>)
      expect(spy.called).to.be.true
    })


  })




})