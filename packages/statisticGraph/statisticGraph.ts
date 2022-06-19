import { DescriptionStatisticOfMultiDimensionMatrix } from "./statistic"


export type coordinate = [number,number]
export type rgbColor = [number,number,number]
export type font = {
  size?:number,
  family?:string,
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


export interface DecriptionSet {
  dataValue:DescriptionStatisticOfMultiDimensionMatrix,
  dataError:DescriptionStatisticOfMultiDimensionMatrix
}

export enum Axis{
  x="x",y="y"
}

export interface GraphData{
  context2d:any,
  contextSize:{width:number,height:number}|undefined,
  innerSize:{width:number,height:number}|undefined,
  pointOf00:coordinate|undefined,
  padding?:Padding
  
}
export type Padding={left:number,right:number,top:number,bottom:number}

export interface GraphOption {
  classAxis:Axis,
  drawAxis:boolean,
  outerAxis:boolean,
  showAxisLabel:[boolean,boolean],
  showLegend:boolean
  unit:string,
  group:boolean,
  arrowAixs:boolean,
  labelFont:[font,font],
  valueRange:[number,number]|undefined,
  defaultColor:rgbColor,
  groupBound:boolean//因为刻度是由基类统一绘制的
}
export interface ScatterBinGraphOption extends BarGraphOption{
  offsetRate:number,
  dotRadium:number
}
export interface BarGraphOption extends GraphOption{
  drawTrendLine:boolean,
  groupColor:rgbColor[],
  groupLegend:string[],
  errorBarWidth:number,
  groupBound:boolean,
  drawErrorBar:boolean,
  eachColor?:rgbColor[]
}
export interface ContinueContinueGraphOption {
  drawAxis:boolean,
  outerAxis:boolean,
  showAxisLabel:[boolean,boolean],
  showLegend:boolean
  unit:string,
  arrowAxis:boolean,
  labelFont:[font,font],
  range:[[number,number],[number,number]]|undefined,
  color:rgbColor|rgbColor[],
  drawErrorRange:boolean,
  scale?:[number,number],
  legend:string[]|string
}
export interface ScatterGraphOption extends ContinueContinueGraphOption{
  dotRadium:number,
  drawTrendLine:boolean
}
export type labelElement = {color:string,label:string}
export type labelSet = labelElement[]

export interface ContinueContiunueDecriptionSet {
  dataValueX:DescriptionStatisticOfMultiDimensionMatrix,
  dataValueY:DescriptionStatisticOfMultiDimensionMatrix,
  dataError:DescriptionStatisticOfMultiDimensionMatrix
}