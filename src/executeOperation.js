import invariant from 'invariant';
import * as action from './constants';

/**
 * this is a central update factory on any event on component 
 */

 /**
  * 
  * @param {object} context  The context on which the method func property must be look for 
  * @param {string} method  A string corresponding to the context method to execute 
  * @param {function} callback 
  */

/**
 * TODO : Transform to Context based operation. Each operation object has direct to context, args and the callback 
 * argument of executeOperation 
 * @param {*} context 
 * @param {*} args 
 * @param {*} callback 
 */
 function executeOperation(context,args,callback){
  invariant(
    context, 
    'This requires valid context on which to execute operation must be provide'
  )
  // invariant(
  //   args.type, 
  //   'executeOperation helper function expect a type property on the second argument'
  // )
  if(args && args.type === action.UPDATE){
   void  classOperation(context,args);
    
  }
  context.updateCount = context.updateCount +1;
  context.setState({})

 }


const classOperation  = (context, args) => {
  if(args.target =='className'){
    context.classNameController = function () {
      return args.value;
    }
  }
}




 export default executeOperation;