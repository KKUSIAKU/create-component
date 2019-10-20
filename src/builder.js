import * as Factories from './factories';

// assuming cat props is in 

 export default function create({cat, ...rest}){

  return Factories[cat]

 }

 