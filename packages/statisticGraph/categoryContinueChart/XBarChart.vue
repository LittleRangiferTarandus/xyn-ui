<template>
  
</template>
<script lang="ts">
import { defineComponent, PropType} from 'vue'
import { Axis, DecriptionSet, BarGraphOption} from '../statisticGraph'
import { drawBar, drawErrorBar, drawLine, drawText} from '../drawGraph'
import { descriptionStatisticOfMultiDimensionMatrix, getDimension, linearRegression } from '../statistic'
import XBaseChartVue from './XCategoryContinueBaseChart.vue'
import { coordinate } from '../statisticGraph'
import { rgbColor} from '../../types/component'

export default defineComponent({
  name:"BetaXynBarChart",
  extends:XBaseChartVue,
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
      type:Array as PropType<number[][]|number[]>
    },
    optionSet:{
      default:()=>({
      }),
      type:Object as PropType<BarGraphOption>
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
    let option:BarGraphOption={
      classAxis: Axis.x,
      drawAxis: true,
      outerAxis: false,
      showAxisLabel: [true, true],
      showLegend: true,
      errorBarWidth: 0,
      unit: '',
      group: false,
      arrowAixs: true,
      labelFont: [{}, {}],
      drawTrendLine: false,
      groupColor: [],
      groupLegend: [],
      groupBound: false,
      valueRange: undefined,
      drawErrorBar: false,
      defaultColor: [Math.round(Math.random()*255),Math.round(Math.random()*255),Math.round(Math.random()*255)]
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
      if(!this.option.showLegend){
        
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
      if(dataDecription.dataValue.dimension===2){
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
      //console.log(dataDecription.dataValue,dataValue);
      
      if(dataError.length){
        dataDecription.dataError=descriptionStatisticOfMultiDimensionMatrix(dataError)
      }
      
    },
    dimensionVerify(){
      const {dataDecription,option}=this
      let xDimension = getDimension(this.dataX),yDimension = getDimension(this.dataY)
      
      if((this as any).drawGroupLabel===undefined || !option.groupBound){
        if(xDimension!==yDimension||xDimension>2||xDimension<1
          ){

          throw 'data dimension error'
        }
      }else{
        
        if((option.classAxis===Axis.x?
          (xDimension+1!==yDimension||xDimension!==1):
          (xDimension-1!==yDimension||yDimension!==1)
          )
        ){
          throw 'data dimension error'
        }
      }
      
      if(this.dataError.length){
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

      let valueAxis:Axis = option.classAxis===Axis.x?Axis.y:Axis.x
      let classAxis:Axis = option.classAxis
      let dataValue = valueAxis===Axis.x?dataX:dataY
      let dataClass = valueAxis===Axis.x?dataY:dataX
      let innerLength = option.classAxis===Axis.x?innerHeight:innerWidth

        if(dataDecription.dataValue.dimension===1){
          let barWidth = positionDiff[classAxis]*2;
          
          (<number[]>dataValue).forEach((v:number,i:number)=>{
            
            
            let color:rgbColor=option.eachColor?option.eachColor[i]:option.defaultColor
            let barHeight =(range[1]-range[0])===0?
                0:
                (
                  v/(range[1]-range[0])*innerLength
                )


            let o:coordinate = option.classAxis===Axis.x?[
              pointOf00[0]
              +positionDiff.x*(i+1)
              +(i+0.5)*barWidth
              ,axisXY.xAxisY
            ]:[
              axisXY.yAxisX,
              pointOf00[1]
              -positionDiff.y*(i+1)
              -(i+0.5)*barWidth
              
            ]
            

            drawBar(context2d,o,barWidth,barHeight,valueAxis,false,color
            )
            
            
            labelSet.push({color:`rgb(${color[0]},${color[1]},${color[2]})`,label:(dataClass as string[])[i]})
            
          })

        }else if(dataDecription.dataValue.dimension===2){

          let classNumber = (dataValue[0] as number[]).length
          let groupWidth = positionDiff[option.classAxis]*2
          let groupPositionDiff=groupWidth/(classNumber*3+1)
          let barWidth = groupPositionDiff*2;
          
          (<number[][]>dataValue).forEach((v:number[],i:number)=>{
            v.forEach((e,index)=>{

            let color:rgbColor=
              option.groupBound&&option.groupColor.length?
              option.groupColor[index]:
              option.eachColor?
              option.eachColor[i*classNumber+index]:
              option.defaultColor

              let barHeight =(range[1]-range[0])===0?
                0:
                (
                  e/(range[1]-range[0])*innerLength
                )

              
              let o:coordinate = option.classAxis===Axis.x?[
                pointOf00[0]
                +positionDiff.x*(i+1)
                +i*groupWidth
                +(index+1)*groupPositionDiff
                +(index+0.5)*barWidth,
                axisXY.xAxisY
              ]:[
                axisXY.yAxisX,
                pointOf00[1]
                -positionDiff.y*(i+1)
                -i*groupWidth
                -(index+1)*groupPositionDiff
                -(index+0.5)*barWidth
                
              ]
              drawBar(context2d,
                o
                ,barWidth,barHeight,valueAxis,false,color
              )
              
            
            
            if(option.groupBound){
              labelSet[index]=({color:`rgb(${color[0]},${color[1]},${color[2]})`,label:(option.groupLegend as string[])[index]})
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

      if(dataDecription.dataValue.dimension===1){
          let barWidth = positionDiff[classAxis]*2;

          (<number[]>dataError).forEach((v:number,i:number)=>{
            
            let barHeight=((range[1]-range[0])===0)?
              0:
              ((dataValue[i]
              /(range[1]-range[0])*innerLength))

            let lengthErr=(range[1]-range[0])===0?0:(v/(range[1]-range[0])*innerLength)
            
            let centerPoint:coordinate= classAxis===Axis.x?
              [
                pointOf00[0]
                +positionDiff.x*(i+1)
                +(i+0.5)*barWidth
                ,axisXY.xAxisY-barHeight
              ]:[
                axisXY.yAxisX+barHeight,
                pointOf00[1]
                -positionDiff.y*(i+1)
                -(i+0.5)*barWidth
              ]
            drawErrorBar(context2d,
            centerPoint
            ,errorBarWidth,lengthErr,valueAxis)
          })

        }else if(dataDecription.dataValue.dimension===2){

          let classNumber = (dataValue[0] as number[][]).length
          
          let groupWidth = positionDiff[classAxis]*2
          let groupPositionDiff=groupWidth/(classNumber*3+1)
          let barWidth = groupPositionDiff*2;

          (<number[][]>dataError).forEach((v:number[],i:number)=>{
            
            v.forEach((element,index)=>{
              let barHeight: number
              
              
              if(dataDecription.dataValue.mean!==undefined){
                barHeight=(range[1]-range[0])===0?
                  0:
                  ((dataValue[i][index]
                  /(range[1]-range[0])*innerLength))
              }else{
                throw "inner draw error bin error"
              }
                  
              let lengthErr=(range[1]-range[0])===0?0:(element/(range[1]-range[0])*innerLength)
              
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

              drawErrorBar(context2d,centerPoint,errorBarWidth,lengthErr,valueAxis)

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

      let left = classAxis===Axis.x?pointOf00[0]:pointOf00[1]
      let d = option.classAxis===Axis.y?innerHeight:innerWidth
      let right=classAxis===Axis.x?left+d:(left-d)
      let top=classAxis===Axis.x?this.padding.top:innerWidth+pointOf00[0],
        bottom=classAxis===Axis.x?pointOf00[1]:pointOf00[0]
      if(dataDecription.dataValue.dimension===1){
        
        let barWidth = positionDiff[classAxis]*2;
        let x:number[] = [],y:number[]=[];
        
        (<number[]>dataValue).forEach((v:number,i:number)=>{
          let x_=classAxis===Axis.x?
            pointOf00[0]
            +positionDiff.x*(i+1)
            +(i+0.5)*barWidth:
            pointOf00[1]
            -positionDiff.y*(i+1)
            -(i+0.5)*barWidth

          let y_=classAxis===Axis.x?(
            axisXY.xAxisY-((range[1]-range[0])===0?0:
            (v/(range[1]-range[0])*innerLength))

            ):(
              axisXY.yAxisX+((range[1]-range[0])===0?0:
            (v/(range[1]-range[0])*innerLength)))
          
          x.push(x_)
          y.push(y_)
        
        })
        
        
        
          let linear=linearRegression(x,y)
          
          
          let valueLeft=linear(left),valueRight=linear(right)
          let fixPoint:[coordinate,coordinate] =classAxis===Axis.x?[
            [
              valueLeft<=bottom?valueLeft>top?left:linear.inv(top):linear.inv(bottom),
              valueLeft<=bottom?valueLeft>top?valueLeft:top:bottom
            ],[
              valueRight<=bottom?valueRight>top?right:linear.inv(top):linear.inv(bottom),
              valueRight<=bottom?valueRight>top?valueRight:top:bottom
            ]
          ]:[
            [
              valueLeft>=bottom?valueLeft<top?valueLeft:top:bottom,
              valueLeft>=bottom?valueLeft<top?left:linear.inv(top):linear.inv(bottom)
            ],[
              valueRight>=bottom?valueRight<top?valueRight:top:bottom,
              valueRight>=bottom?valueRight<top?right:linear.inv(top):linear.inv(bottom)
            ]
          ]
          
          drawLine(context2d,...fixPoint,false,option.defaultColor
          )

      }else if(dataDecription.dataValue.dimension===2){

        let classNumber = (dataValue[0] as number[]).length
        let groupWidth = positionDiff[classAxis]*2
        let groupPositionDiff=groupWidth/(classNumber*3+1)
        let barWidth = groupPositionDiff*2;
        let x:number[][] = [],y:number[][]=[];
        //console.log(dataDecription.dataValue.dataDecriptions);
        
        (<number[][]>dataValue).forEach((v:number[],i:number)=>{
          
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
                +(index+0.5)*barWidth:
              pointOf00[1]
                -positionDiff.y*(i+1)
                -i*groupWidth
                -(index+1)*groupPositionDiff
                -(index+0.5)*barWidth

            let y_=classAxis===Axis.x?
              axisXY.xAxisY-
              ((range[1]-range[0])===0?
              0:
              ((e-range[0])/(range[1]-range[0])*innerLength)):
              
              axisXY.yAxisX+
              ((range[1]-range[0])===0?
              0:
              ((e-range[0])/(range[1]-range[0])*innerLength))

            x[index].push(x_)
              
            
            y[index].push(y_)
            
            
          })
          
        })

        x.forEach((v,i)=>{
          
          let linear=linearRegression(v,y[i])
          console.log(v,y[i]);
          
          let valueLeft=linear(left),valueRight=linear(right)
          let fixPoint:[coordinate,coordinate] =classAxis===Axis.x?[
            [
              valueLeft<=bottom?valueLeft>top?left:linear.inv(top):linear.inv(bottom),
              valueLeft<=bottom?valueLeft>top?valueLeft:top:bottom
            ],[
              valueRight<=bottom?valueRight>top?right:linear.inv(top):linear.inv(bottom),
              valueRight<=bottom?valueRight>top?valueRight:top:bottom
            ]
          ]:[
            [
              valueLeft>=bottom?valueLeft<top?valueLeft:top:bottom,
              valueLeft>=bottom?valueLeft<top?left:linear.inv(top):linear.inv(bottom)
            ],[
              valueRight>=bottom?valueRight<top?valueRight:top:bottom,
              valueRight>=bottom?valueRight<top?right:linear.inv(top):linear.inv(bottom)
            ]
          ]
          
          drawLine(context2d,...fixPoint,false,option.groupColor[i]
          )
        })

      }
      
      
    },
    getPositionDiffOfClassAxisOfGroup(){
      
      const {option,dataX,dataY,innerSize} = this
      const {width:innerWidth,height:innerHeight}=innerSize
      let positionDiffOfClassAxisOfGroup=0;
      if(option.classAxis===Axis.x){
        positionDiffOfClassAxisOfGroup = innerWidth/(dataX.length*2+dataX.length+1)
      }else if(option.classAxis===Axis.y){
        
        positionDiffOfClassAxisOfGroup = innerHeight/(dataY.length*2+dataY.length+1);
      }else{
        throw "inner get position error"
      }
      return positionDiffOfClassAxisOfGroup
    },
    drawGroupLabel(){
      let positionDiffOfClassAxisOfGroup= this.getPositionDiffOfClassAxisOfGroup()
      
      const {option,dataY,dataX,pointOf00,context2d,outerAxisXY,axisXY} = this
      let classAxis = option.classAxis


      let groupWidth = positionDiffOfClassAxisOfGroup*2
      let barWidth = groupWidth;

      (classAxis===Axis.x?
        (<string[]>dataX):
        (<string[]>dataY)
      ).forEach((v:string,i:number)=>{
          let point:[number,number]=classAxis===Axis.x?[
            pointOf00[0]
            +positionDiffOfClassAxisOfGroup*(i+1)
            +i*barWidth
            +0.5*barWidth

            ,option.outerAxis?outerAxisXY.xAxisY:axisXY.xAxisY
          ]:[
            option.outerAxis?outerAxisXY.yAxisX:axisXY.yAxisX,
            
            pointOf00[1]
            -positionDiffOfClassAxisOfGroup*(i+1)
            -(i+0.5)*barWidth
          ]
          
          
          drawText(context2d,
            point,
            v,option.labelFont[0],classAxis===Axis.x?[0,20]:[-20,0])

        })
      
    }
  },
  
})
</script>
