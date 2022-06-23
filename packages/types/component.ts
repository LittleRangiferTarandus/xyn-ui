
import { Ref } from "vue"

export interface RadioGroup{
  setSelect:Function,
  getSelect:Function
}

export interface CheckboxGroup{
  setSelect:Function,
  getSelect:Function,
  addSelect:Function
}

export interface Rule{
  verify:Function|RegExp,
  error:string
}

export interface MdGroup{
  getMdValue:Function,
  setMdValue:Function,
  scrollRate:Ref<number>,
  scrollItem:Ref<string>
}

export interface CarouselImg{
  url:string,
  id:number|string
}



export  type rgbColor = [number,number,number]