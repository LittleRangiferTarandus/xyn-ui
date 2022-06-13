

export type coordinate = [number,number]
export type rgbColor = [number,number,number]
export type font = {
  size?:number,
  family?:string,
  align?:string
}
export interface DataDecription  {
  dimension:number,
  max?:number,
  min?:number,
  mean?:number,
  std?:number,
  sampleSize?:number
}

export interface DataDecriptionSet {
  x:DataDecription,
  y:DataDecription
  error?:DataDecription
}

export enum Axis{
  x="x",y="y"
}

export interface GraphData{
  context2d:any,
  contextSize:{width:number,height:number}|undefined,
  innerSize:{width:number,height:number}|undefined,
  pointOf00:coordinate|undefined,
  padding:{left:number,right:number,top:number,bottom:number}
}

export interface GraphOption {
  classAxis:"x"|"y",
  drawAxis:boolean,
  verify:boolean,
}

export type labelElement = {color:string,label:string}
export type labelSet = labelElement[]