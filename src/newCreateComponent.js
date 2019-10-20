
// import here different types here that will serve as prototype for new class creating 
import functionalType from '.'

// what is common to all component ? check applicability of builder pattern in gof book
/**
 * Attributes:
 * 1- props : mandory 
 * 2- state : optional
 * 3- context: optional
 * Methodes:
 * 1- render : mandatory 
 * 
 * So we could have :
 * 
 * - Sectionning Content Factory -> That create a section a section content (article, section, aside ...)
 * - Heading Content Factory -> That create heading content at different live 
 *  Those factory might be singleton in the app 
 * - Interactive Content Factory 
 * - Embeded Content Factory 
 * 
 * Each Content category (know ) follow a specification process which determines:
 * - The node props the might supported ( aria-roles, animation,  interaction )
 * 
 * 
 * Then that state or note state should devote to builder utility
 */

 /**
  * 
  * @param {*} param0 
  */

function createComponentFactory(
  {
    component
  }
){



  return function createComponent(){
    // return different component class  here depending on on  
    return null;
  }
}






// expose an factory method or an instance of the factory 
export default createComponentFactory();

