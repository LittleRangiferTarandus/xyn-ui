
export function getLeftToWindow(element:any) {   
  var realLeft = element.offsetLeft;
  var parent = element.offsetParent;
  while (parent !== null) {
      realLeft += parent.offsetLeft;
      parent = parent.offsetParent;
  }
  return realLeft;
}

export function getRealStytle(element:any,proporty:string) {   
  let computedStyle:any
  if (window.getComputedStyle) {
    computedStyle = getComputedStyle(element, null)
  } else {
    computedStyle = element.currentStyle;//兼容IE的写法
  }
  return computedStyle[proporty];
}