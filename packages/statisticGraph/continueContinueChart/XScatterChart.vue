
<template>
  
</template>
<script lang="ts">
import { defineComponent, PropType} from 'vue'
import { drawArrowLine, drawCircle, drawLine, drawText } from '../drawGraph'
import { descriptionStatisticOfMultiDimensionMatrix, formatNumber, getDimension, linearRegression } from '../statistic'
import { Axis, ContinueContinueGraphOption, ContinueContiunueDecriptionSet, coordinate, DecriptionSet, GraphOption,labelSet, rgbColor, ScatterGraphOption} from '../statisticGraph'
import XContinueContinueBaseChartVue from './XContinueContinueBaseChart.vue'



export default defineComponent({
  name:"BetaXynScatterChart",
  extends:XContinueContinueBaseChartVue,
  data(){

    let option:ScatterGraphOption={
      drawAxis: true,
      outerAxis: false,
      showAxisLabel: [true, true],
      showLegend: true,
      unit: '',
      labelFont: [{}, {}],
      color: [Math.round(Math.random()*255), Math.round(Math.random()*255), Math.round(Math.random()*255)],
      range: undefined,
      drawErrorRange: false,
      dotRadium: 1,
      arrowAxis: false,
      drawTrendLine: false,
      legend: ''
    }

    return{

      option,
      
    }
  },


  methods:{
    dataInitialize(){
      this.dataDecription.dataValueX=descriptionStatisticOfMultiDimensionMatrix(this.dataX)
      this.dataDecription.dataValueY=descriptionStatisticOfMultiDimensionMatrix(this.dataY)
    },
    dimensionVerify(){
      let dimensionX=getDimension(this.dataX),dimensionY=getDimension(this.dataX)
      if(dimensionX!==dimensionY||dimensionX>2||dimensionX<1){
        throw "inner dimension error"
      }
      
    },
    getRange(){
    
      const {dataDecription}=this
      let errorMax =0
      if(this.option.drawErrorRange){
        errorMax=dataDecription?.dataError?.max?
        dataDecription.dataError.max/2:
        dataDecription.dataValueY.maxStd/2
      }
      
      this.range=[(dataDecription.dataValueX.min>=0)?
          [0,(dataDecription.dataValueX.max)*1.1]:
          (dataDecription.dataValueX.max<=0)?
          [(dataDecription.dataValueX.min)*1.1,0]:
          [(dataDecription.dataValueX.min)*1.1,(dataDecription.dataValueX.max)*1.1],

          (dataDecription.dataValueY.min-errorMax>=0)?
            [0,(dataDecription.dataValueY.max+errorMax)*1.1]:
            (dataDecription.dataValueY.max+errorMax<=0)?
            [(dataDecription.dataValueY.min-errorMax)*1.1,0]:
            [(dataDecription.dataValueY.min-errorMax)*1.1,(dataDecription.dataValueY.max+errorMax)*1.1]
          ]
      
      
    },
    
    drawItems(){
      this.drawScatter()
      if(this.option.drawTrendLine){
        this.drawTrendLine()
      }
    },
    drawScatter(){
      const {dataX,dataY,pointOf00,context2d,range,innerSize,option,dataDecription} = this
      

      const drawScatterFun=(x:number[],y:number[],color:rgbColor,legend:string)=>{
        x.forEach((v,i)=>{
          let o :coordinate= [
            pointOf00[0]+(range[0][0]===range[0][1]?
            0:
            (v-range[0][0])/(range[0][1]-range[0][0])*innerSize.width),
            pointOf00[1]-(range[1][0]===range[1][1]?
            0:
            (y[i]-range[1][0])/(range[1][1]-range[1][0])*innerSize.height),
          ]
          //console.log(o);
          
          drawCircle(context2d,o,option.dotRadium,[0,2*Math.PI],false,color)
          
        })

        this.labelSet.push({label:legend,color:`rgb(${color[0]},${color[1]},${color[2]})`})
        
      }


      if(dataDecription.dataValueX.dimension===1){
        drawScatterFun((dataX as number[]),(dataY as number[]),(option.color as rgbColor),(option.legend as string) )
      }else if(dataDecription.dataValueX.dimension===2){
        (dataX as number[][]).forEach((v,i)=>{
          drawScatterFun(v,(dataY[i] as number[]),(option.color[i] as rgbColor),(option.legend[i] as string) )
        })
      }
    },
    drawTrendLine(){
      const {dataX,dataY,pointOf00,context2d,range,innerSize,option,dataDecription,padding} = this
      

      const drawTrendLineFun=(x:number[],y:number[],color:rgbColor)=>{
        let xArr:number[]=[],yArr:number[]=[]
        x.forEach((v,i)=>{
          xArr.push(pointOf00[0]+(range[0][0]===range[0][1]?
            0:
            (v-range[0][0])/(range[0][1]-range[0][0])*innerSize.width))

          yArr.push(pointOf00[1]-(range[1][0]===range[1][1]?
            0:
            (y[i]-range[1][0])/(range[1][1]-range[1][0])*innerSize.height))
          
          
        })
        let linear = linearRegression(xArr,yArr)
        
        drawLine(context2d,
          [
            linear(pointOf00[0])>=pointOf00[1]?linear(pointOf00[0])<padding.top?linear.inv(padding.top):linear.inv(pointOf00[1]):pointOf00[0],
            linear(pointOf00[0])>=pointOf00[1]?linear(pointOf00[0])<padding.top?padding.top:pointOf00[1]:linear(pointOf00[0])
          ],[
            linear(pointOf00[0]+innerSize.width)>=pointOf00[1]?
            linear(pointOf00[0]+innerSize.width)<padding.top?
            linear.inv(padding.top):
            linear.inv(pointOf00[1]):
            pointOf00[0]+innerSize.width,
            linear(pointOf00[0]+innerSize.width)>=pointOf00[1]?
            linear(pointOf00[0]+innerSize.width)<padding.top?
            padding.top:pointOf00[1]:linear(pointOf00[0]+innerSize.width)
          ],false,color
        )
        
      }


      if(dataDecription.dataValueX.dimension===1){
        drawTrendLineFun((dataX as number[]),(dataY as number[]),(option.color as rgbColor) )
      }else if(dataDecription.dataValueX.dimension===2){
        (dataX as number[][]).forEach((v,i)=>{
          drawTrendLineFun(v,(dataY[i] as number[]),(option.color[i] as rgbColor) )
        })
      }
    }
  },
  
})
</script>
