export interface MenuGroup{
  setActivated : (prop:string)=>void
  getActivated : ()=>string
  getStyle: ()=>{rowDirection:boolean,stretch:boolean}
}

export interface MenuItemGroup{
  setGroupActivated:(item:string,state:boolean)=>void
}