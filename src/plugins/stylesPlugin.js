
// set style or wrapp the chidlren content into new 
function styleUIObject(source, options){
  let result = Object.assign({},source);
  let styles = options.styleParser();
  if(styles) return {style:{...styles}}

  //return 
}