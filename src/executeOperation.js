import invariant from 'invariant';
/**
 * this is a central update factory on any event on component 
 */


 function executeOperation(context, method,args,callback){
  invariant(
    context, 
    'This requires valid context on which to execute operation must be provide'
  )
    context.setState({})
 }

 export default executeOperation;