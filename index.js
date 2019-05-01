import React from 'react';

import { render } from 'react-dom';

import Input from './components/input/input';

import style from './css/index.scss';

import ButtonApp from './views/ButtonApp.js';


import createComponent from './components/HOC/createComponent'

var blockDiv = () => { return {type:'div'} };
var MyCustomComponent = createComponent(blockDiv())
//console.log(<MyCustomComponent/>);

console.log(<div className='border'></div>)

MyCustomComponent.css({color:'red'})
// MyCustomComponent.test()
MyCustomComponent.prototype.addClass('border')
// MyCustomComponent.test()
MyCustomComponent.prototype.addEvent();
console.log(<MyCustomComponent/>);
console.log(<MyCustomComponent><a>hello</a></MyCustomComponent>)


// const App = (
//   <div className='mx-width pd auth-shadow'>
//     <Input 
//       id='email'
//       label={{text:'Email', className:'d-block font-bold'}}
//       type='text' value ='test'
//       className ='border border-radius h-test'/>

//     <Input 
//       id='password'
//       label={{text:'Password', className:'d-block font-bold'}}
//       type='text' value ='test'
//       className ='border border-radius h-test '/> 

//   </div>
// );


render(
  <MyCustomComponent><a>hello</a></MyCustomComponent>, 
  document.getElementById('app')
);