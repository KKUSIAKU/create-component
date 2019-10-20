
/**
 * 
 */

 function AttributeModule(options){

  let opt = Object.create(options);

  let inputConfigs = Object.create(options.config)

  opt.props = {
    ...opt.props,
    ...decorate(inputConfigs)
  }

  return opt;

 }

 
 function decorate(config){
   return {}
 }

 export default AttributeModule;