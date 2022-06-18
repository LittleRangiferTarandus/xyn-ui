<template>
  
</template>
<script lang="ts">
import { defineComponent, PropType} from 'vue'
import { Axis, DecriptionSet, ScatterBinGraphOption,  rgbColor} from './statisticGraph'
import { drawCircle, drawErrorBin, drawLine, drawText} from './drawGraph'
import { DescriptionStatistic, descriptionStatisticOfMultiDimensionMatrix, getDimension, linearRegression } from './statistic'

import { coordinate } from './statisticGraph'
import XBarChartVue from './XBarChart.vue'


export default defineComponent({
  name:"BetaXynScatterBinChart",
  extends:XBarChartVue,
  props:{
    dataY:{
      default:[],
      type:Array as PropType<number[][]|number[][][]|string[]|string[][]>
    },
    dataX:{
      default:[],
      type:Array as PropType<number[][]|number[][][]|string[]|string[][]>
    },
    dataError:{
      default:[],
      type:Array as PropType<[number[],number[]][]|[number[],number[]]>
    },
    optionSet:{
      default:()=>({
        classAxis:"y",
        drawAxis:true,
        outerAxis:false,
        title:["",""],
        offsetRate:0.2,
        errorBarWidth:30,
        drawTrendLine:true,
        groupColor:[],
        groupLabel:[],
        group:true
      }),
      type:Object as PropType<ScatterBinGraphOption>
    },
  },
  data(){
    let dataDecription:DecriptionSet={
      dataValue: {
        dimension: 0,
        max: 0,
        min: 0,
        sampleSize: 0,
        maxSem: 0,
        maxStd: 0,
        mean: 0,
        dataDecriptions: []
      },
      dataError: {
        dimension: 0,
        max: 0,
        min: 0,
        sampleSize: 0,
        maxSem: 0,
        maxStd: 0,
        mean: 0,
        dataDecriptions: []
      }
    }
    let option:ScatterBinGraphOption={
      drawTrendLine: false,
      offsetRate: 0,
      groupColor: [],
      groupLabel: [],
      classAxis: Axis.x,
      drawAxis: false,
      outerAxis: false,
      showAxisLabel: [true, true],
      showLabel: false,
      errorBarWidth: 0,
      unit: '',
      group: true,
      groupBound: false,
      arrowAixs: false,
      labelFont: [{}, {}],
      dotRadium: 0,
      valueRange: undefined,
      drawErrorBar: false,
      defaultColor: [0,0,0]
    }
    let outerAxisXY={yAxisX:0,xAxisY:0}
    return{
      dataDecription,
      outerAxisXY,
      option
    }
  },

  watch:{
    'labelSet.length'(){
      if(!this.option.showLabel){
        
        return
      }
      let total: any
      let valueAxis = this.option.classAxis===Axis.x?Axis.y:Axis.x 
      
      if((this as any).drawGroupLabel instanceof Function&&this.option.groupBound){
        total=this.option.classAxis===Axis.x?this.dataX.length:this.dataY.length
        
      }else{
        total=this.dataDecription.dataValue.dataDecriptions.length
      }
      
      
      if(this.labelSet.length===total){
        if((this.$parent as any)){
          (this.$parent as any).label[this.symbol]=this.labelSet
          
        }else{
          throw "inner on this error"
        }
          
      }
      
    },
  },
  methods:{
    getIsGroup(){
      const {dataDecription,option}=this
      if(dataDecription.dataValue.dimension===3){
        option.group=true
      }else{
        option.group=false
      }
    },
    dataInitialize(){
      const {option,dataDecription,dataX,dataY,dataError}=this
      let valueAxis:Axis = option.classAxis===Axis.x?Axis.y:Axis.x
      let dataValue = valueAxis===Axis.x?dataX:dataY

      dataDecription.dataValue=descriptionStatisticOfMultiDimensionMatrix(dataValue)
      if(dataError.length){
        dataDecription.dataError=descriptionStatisticOfMultiDimensionMatrix(dataError)
      }
      
    },
    dimensionVerify(){
      const {dataDecription,option}=this
      let xDimension = getDimension(this.dataX),yDimension = getDimension(this.dataY)
      
      if((this as any).drawGroupLabel===undefined || !option.groupBound){
        if((option.classAxis===Axis.x?
          (xDimension+1!==yDimension||xDimension>2||xDimension<1):
          (xDimension-1!==yDimension||yDimension>2||yDimension<1))
          ){


            
          throw 'data dimension error'
        }
      }else{
        
        if((option.classAxis===Axis.x?
          (xDimension+2!==yDimension||xDimension!==1):
          (xDimension-2!==yDimension||yDimension!==1)
          )
        ){


            
          throw 'data dimension error'
        }
      }
      
      if(this.dataError){
        let dimension = getDimension(this.dataError)
        
        if((option.classAxis===Axis.x?
        (yDimension!==dimension):
        (dimension!==xDimension))){
          throw 'data dimension error'
        }
      }
    },



    getRange(){
      const {dataDecription}=this
      let errorMax =0
      if(this.option.drawErrorBar){
        errorMax=dataDecription?.dataError?.max?
        dataDecription.dataError.max/2:
        dataDecription.dataValue.maxStd/2
      }
        
      this.range=(dataDecription.dataValue.min-errorMax>=0)?
          [0,(dataDecription.dataValue.max+errorMax)*1.1]:
          (dataDecription.dataValue.max+errorMax<=0)?
          [(dataDecription.dataValue.min-errorMax)*1.1,0]:
          [(dataDecription.dataValue.min-errorMax)*1.1,(dataDecription.dataValue.max+errorMax)*1.1]
      
      
    },
    getPositionDiff(){
      const {innerSize,option,dataX,dataY}=this
      const {width:innerWidth,height:innerHeight} = innerSize
      if(option.classAxis===Axis.x){
        this.positionDiff = {y:innerHeight/10,x:innerWidth/(dataX.length*2+dataX.length+1)};
      }else if(option.classAxis===Axis.y){
        
        this.positionDiff = {x:innerWidth/10,y:innerHeight/(dataY.length*2+dataY.length+1)};
      }else{
        throw "inner get position error"
      }
    },
    drawItems(){
      this.drawBars()
      if(this.option.drawErrorBar){
        
        this.drawErrorBars()
      }
      if(this.option.drawTrendLine){
        this.drawTrendLine()
      }
    },
    drawBars(){
      const {innerSize,option,dataDecription,positionDiff,range,dataY,context2d,pointOf00,axisXY,dataX,labelSet}=this
      const {width:innerWidth,height:innerHeight} = innerSize
      const offsetRate = option.offsetRate
      
      let valueAxis:Axis = option.classAxis===Axis.x?Axis.y:Axis.x
      let dataValue = valueAxis===Axis.x?dataX:dataY
      let dataClass = valueAxis===Axis.x?dataY:dataX
      let innerLength = option.classAxis===Axis.x?innerHeight:innerWidth

        if(dataDecription.dataValue.dimension===2){
          let barWidth = positionDiff[option.classAxis]*2;
          
          (<number[][]>dataValue).forEach((v:number[],i:number)=>{
            
            
            let color:rgbColor=option.eachColor?option.eachColor[i]:option.defaultColor
            v.forEach(e=>{
              let random = (Math.random()*offsetRate-0.5*offsetRate)*barWidth;
              let barHeight =(range[1]-range[0])===0?
                0:
                (
                  e/(range[1]-range[0])*innerLength
                )


              let offset = option.classAxis===Axis.x?[random,barHeight]:[barHeight,random]
              let o:coordinate = option.classAxis===Axis.x?[
                pointOf00[0]
                +positionDiff.x*(i+1)
                +(i+0.5)*barWidth+offset[0]
                ,axisXY.xAxisY-offset[1]
              ]:[
                axisXY.yAxisX+offset[0],
                pointOf00[1]
                -positionDiff.y*(i+1)
                -(i+0.5)*barWidth+offset[1]
                
              ]

              drawCircle(context2d,o,option.dotRadium,[0,Math.PI*2],false,color
              )
              
            
            })
            labelSet.push({color:`rgb(${color[0]},${color[1]},${color[2]})`,label:(option.groupLabel as string[])[i]})
            
          })

        }else if(dataDecription.dataValue.dimension===3){

          let classNumber = (dataValue[0] as number[]).length
          let groupWidth = positionDiff[option.classAxis]*2
          let groupPositionDiff=groupWidth/(classNumber*3+1)
          let barWidth = groupPositionDiff*2;
          
          (<number[][][]>dataValue).forEach((v:number[][],i:number)=>{
            v.forEach((e,index)=>{
            let groupBound=  option.groupBound
            let color:rgbColor=groupBound?
            option.groupColor[index]:
            option.eachColor?
            option.eachColor[i*classNumber+index]:
            option.defaultColor

            e.forEach(element=>{

              let random = (Math.random()*offsetRate-0.5*offsetRate)*barWidth;
              let barHeight =(range[1]-range[0])===0?
                0:
                (
                  element/(range[1]-range[0])*innerLength
                )


              let offset = option.classAxis===Axis.x?[random,barHeight]:[barHeight,random]
              
              let o:coordinate = option.classAxis===Axis.x?[
                pointOf00[0]
                +positionDiff.x*(i+1)
                +i*groupWidth
                +(index+1)*groupPositionDiff
                +index*barWidth+offset[0],
                axisXY.xAxisY-offset[1]
              ]:[
                axisXY.yAxisX+offset[0],
                pointOf00[1]
                -positionDiff.y*(i+1)
                -i*groupWidth
                -(index+1)*groupPositionDiff
                -(index+0.5)*barWidth-offset[1]
                
              ]
              drawCircle(context2d,
                o
                ,option.dotRadium,[0,Math.PI*2],false,color
              )
              
            
            })
            
            if(groupBound){
              labelSet[index]=({color:`rgb(${color[0]},${color[1]},${color[2]})`,label:(option.groupLabel as string[])[index]})
            }else{
              labelSet.push({color:`rgb(${color[0]},${color[1]},${color[2]})`,label:(dataClass as string[][])[i][index]})
            }
                
          })
        })
      }
    },
    drawErrorBars(){
      const {innerSize,option,dataDecription,positionDiff,range,dataY,dataX,context2d,pointOf00,axisXY,dataError}=this
      const {width:innerWidth,height:innerHeight} = innerSize
      const errorBarWidth = option.errorBarWidth
      
      let valueAxis:Axis = option.classAxis===Axis.x?Axis.y:Axis.x
      let classAxis = option.classAxis
      let dataValue = valueAxis===Axis.x?dataX:dataY
      let dataClass = valueAxis===Axis.x?dataY:dataX
      let innerLength = option.classAxis===Axis.x?innerHeight:innerWidth

      if(dataDecription.dataValue.dimension===2){
          let barWidth = positionDiff[classAxis]*2;

          let tempErrorData=(dataError as [number[],number[]])[0];
          (<number[]>tempErrorData).forEach((v:number,i:number)=>{
            let barHeight=((range[1]-range[0])===0)?
              0:
              (((<DescriptionStatistic[]> dataDecription.dataValue.dataDecriptions)
              [i].mean
              /(range[1]-range[0])*innerLength))

            let lengthInner=(range[1]-range[0])===0?0:(v/(range[1]-range[0])*innerLength)
            let lengthOuter=(range[1]-range[0])===0?0:((dataError as [number[],number[]])[1][i]/(range[1]-range[0])*innerLength)
            
            let centerPoint:coordinate= classAxis===Axis.x?
              [
                pointOf00[0]
                +positionDiff.x*(i+1)
                +(i+0.5)*barWidth
                ,axisXY.xAxisY-barHeight
              ]:[
                axisXY.yAxisX+barHeight,
                pointOf00[1]
                -positionDiff.x*(i+1)
                -(i+0.5)*barWidth
              ]
            drawErrorBin(context2d,
            centerPoint
            ,errorBarWidth,[lengthInner,lengthOuter],valueAxis)
          })

        }else if(dataDecription.dataValue.dimension===3){

          let classNumber = (dataValue[0] as number[][]).length
          
          let groupWidth = positionDiff[classAxis]*2
          let groupPositionDiff=groupWidth/(classNumber*3+1)
          let barWidth = groupPositionDiff*2;

          (<[number[],number[]][]>dataError).forEach((v:[number[],number[]],i:number)=>{
            
            let tempErrorData=(v as [number[],number[]])[0];
            tempErrorData.forEach((element,index)=>{
              let barHeight: number
              
              
              if(dataDecription.dataValue.mean!==undefined){
                barHeight=(range[1]-range[0])===0?
                  0:
                  ((<DescriptionStatistic[]> dataDecription.dataValue.dataDecriptions)
                  [i*classNumber+index].mean
                  /(range[1]-range[0])*innerLength)
              }else{
                throw "inner draw error bin error"
              }
                  
              let lengthInner=(range[1]-range[0])===0?0:(element/(range[1]-range[0])*innerLength)
              let lengthOuter=(range[1]-range[0])===0?0:((v as [number[],number[]])[1][index]/(range[1]-range[0])*innerLength)
              
              let centerPoint:coordinate=classAxis===Axis.x?[
                  pointOf00[0]
                  +positionDiff.x*(i+1)
                  +i*groupWidth
                  +(index+1)*groupPositionDiff
                  +(index)*barWidth,
                  axisXY.xAxisY-barHeight
              ]:[
                axisXY.yAxisX+barHeight,
                  pointOf00[1]
                  -positionDiff.y*(i+1)
                  -i*groupWidth
                  -(index+1)*groupPositionDiff
                  -(index+0.5)*barWidth
              ]

              drawErrorBin(context2d,centerPoint,errorBarWidth,[lengthInner,lengthOuter],valueAxis)

            })
            
          })
          
      }

    },
    drawTrendLine(){
      const {innerSize,option,dataDecription,positionDiff,range,dataY,context2d,pointOf00,axisXY,dataX,labelSet}=this
      const {width:innerWidth,height:innerHeight} = innerSize
      let valueAxis:Axis = option.classAxis===Axis.x?Axis.y:Axis.x
      let classAxis = option.classAxis
      let dataValue = valueAxis===Axis.x?dataX:dataY
      let dataClass = valueAxis===Axis.x?dataY:dataX
      let innerLength = option.classAxis===Axis.x?innerHeight:innerWidth

      if(dataDecription.dataValue.dimension===2){
        let barWidth = positionDiff[classAxis]*2;
        let x:number[] = [],y:number[]=[];
        
        (<number[][]>dataValue).forEach((v:number[],i:number)=>{
          let x_=classAxis===Axis.x?
            pointOf00[0]
            +positionDiff.x*(i+1)
            +(i+0.5)*barWidth:
            pointOf00[1]
            -positionDiff.y*(i+1)
            -(i+0.5)*barWidth

          let y_=classAxis===Axis.x?
          
            (range[1]-range[0])===0?
            0:
            ((<DescriptionStatistic[]> dataDecription.dataValue.dataDecriptions)[i].mean
            /(range[1]-range[0])*innerLength):
            
            (range[1]-range[0])===0?
            0:
            ((<DescriptionStatistic[]> dataDecription.dataValue.dataDecriptions)[i].mean
            /(range[1]-range[0])*innerLength)

          x.push(x_)
          y.push(y_)
        
        })

        let linear=linearRegression(x,y)
        let left = classAxis===Axis.x?pointOf00[0]:pointOf00[1]
        let d = option.classAxis===Axis.y?innerHeight:innerWidth
        let fixPoint:[coordinate,coordinate] =[
          [
            left,linear(left)
          ],[
            left+d,linear(left+d)
          ]
        ]
        drawLine(context2d,...fixPoint,false,option.defaultColor)

      }else if(dataDecription.dataValue.dimension===3){

        let classNumber = (dataValue[0] as number[]).length
        let groupWidth = positionDiff[classAxis]*2
        let groupPositionDiff=groupWidth/(classNumber*3+1)
        let barWidth = groupPositionDiff*2;
        let x:number[][] = [],y:number[][]=[];
        (<number[][][]>dataValue).forEach((v:number[][],i:number)=>{
          
          v.forEach((e,index)=>{
            if(!x[index]){
              x[index]=[]
            }
            if(!y[index]){
              y[index]=[]
            }
            
            let x_=classAxis===Axis.x?
              pointOf00[0]
                +positionDiff.x*(i+1)
                +i*groupWidth
                +(index+1)*groupPositionDiff
                +index*barWidth:
              pointOf00[1]
                -positionDiff.y*(i+1)
                -i*groupWidth
                -(index+1)*groupPositionDiff
                -index*barWidth

            let y_=classAxis===Axis.x?
              axisXY.xAxisY-
              ((range[1]-range[0])===0?
              0:
              ((<DescriptionStatistic[]> dataDecription.dataValue.dataDecriptions)
              [i*classNumber+index].mean/(range[1]-range[0])*innerLength)):
              
              axisXY.yAxisX+
              ((range[1]-range[0])===0?
              0:
              ((<DescriptionStatistic[]> dataDecription.dataValue.dataDecriptions)
              [i*classNumber+index].mean/(range[1]-range[0])*innerLength))

            x[index].push(x_)
              
            
            y[index].push(y_)
            
            
          })
          
        })

        x.forEach((v,i)=>{
          
          let linear=linearRegression(v,y[i])
          //console.log(v,y[i]);
          
          let left = classAxis===Axis.x?pointOf00[0]:pointOf00[1]
          let d = option.classAxis===Axis.y?innerHeight:innerWidth
          let fixPoint:[coordinate,coordinate] =classAxis===Axis.x?[
            [
              left,linear(left)
            ],[
              left+d,linear(left+d)
            ]
          ]:[
            [
              linear(left),left
            ],[
              linear(left-d),left-d
            ]
          ]
          //console.log(fixPoint);
          
          drawLine(context2d,...fixPoint,false,option.groupColor[i]
          )
        })

      }
      
      
    },

  },
  
})
</script>
