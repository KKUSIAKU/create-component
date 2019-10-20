// retrun an class that is capable to return a header constuctor 
// that is capable of building either header, h1, h2 ...

const HeaderClassFactory = Builder('header');// facotre
const headerInstance = HeaderClassFactory({type:'h3'}) // return H3 header element
