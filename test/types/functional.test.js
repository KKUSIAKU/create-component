import React from 'react';
import { expect } from 'chai';

import FunctionalUIComponent from '../../src/types/functional';

let modules = {
  accessibilityModule:() => {},
  attributeModule:() => {},
  styleModule:() =>{}
}

let config = {}

describe('functional co', () =>{

  it('Should render div as default tag', () => {
    expect(() => <FunctionalUIComponent modules={modules} 
    config={config}/>).to.not.throws()
  })

  it('Should render nothing if tag is not a valid ', () =>{

  })

})