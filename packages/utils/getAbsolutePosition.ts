
export function getLeft(element:any) {   //获取元素距离页面顶部的距离
  var realLeft = element.offsetLeft;
  var parent = element.offsetParent;
  while (parent !== null) {
      realLeft += parent.offsetLeft;
      parent = parent.offsetParent;
  }
  return realLeft;
}
