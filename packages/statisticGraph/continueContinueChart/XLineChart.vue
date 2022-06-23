
<template>
  
</template>
<script lang="ts">
import { defineComponent, PropType} from 'vue'
import { drawFunction, } from '../drawGraph'
import { descriptionStatisticOfMultiDimensionMatrix, formatNumber, getDimension, linearRegression } from '../statistic'
import {  LineGraphOption,  ScatterGraphOption} from '../statisticGraph'

import XScatterChartVue from './XScatterChart.vue'
import { rgbColor} from '../../types/component'



export default defineComponent({
  name:"BetaXynLineChart",
  props:{
    dataError:{
      type:Array as PropType<number[]|number[][]>,
      default:[]
    }
  },
  extends:XScatterChartVue,
  data(){

    let option:LineGraphOption={
      drawAxis: false,
      outerAxis: false,
      showAxisLabel: [true, true],
      showLegend: true,
      unit: '',
      labelFont: [{}, {}],
      color: [Math.round(Math.random()*255), Math.round(Math.random()*255), Math.round(Math.random()*255)],
      range: undefined,
      drawErrorRange: false,
      arrowAxis: false,
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
      if(this.dataError?.length){
        let dimensionError = getDimension(this.dataError)
        if(dimensionError!==dimensionX){
          throw "inner dimension error"
        }
        this.dataDecription.dataError=descriptionStatisticOfMultiDimensionMatrix(this.dataError)
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
      this.drawLine()
    },
    drawLine(){
      const {dataX,dataY,pointOf00,context2d,range,innerSize,option,dataDecription,padding} = this
      

      const drawLineFun=(x:number[],y:number[],color:rgbColor,legend:string)=>{
        let xArr:number[]=[],yArr:number[]=[]
        
        x.forEach((v,i)=>{
          
          xArr.push(pointOf00[0]+(range[0][0]===range[0][1]?
            0:
            (v-range[0][0])/(range[0][1]-range[0][0])*innerSize.width))

          yArr.push(pointOf00[1]-(range[1][0]===range[1][1]?
            0:
            (y[i]-range[1][0])/(range[1][1]-range[1][0])*innerSize.height))
          
          
        })
        
        drawFunction(context2d,xArr,yArr,false,color  )
        this.labelSet.push({label:legend,color:`rgb(${color[0]},${color[1]},${color[2]})`})
        
      }

      if(dataDecription.dataValueX.dimension===1){
        drawLineFun((dataX as number[]),(dataY as number[]),(option.color as rgbColor) ,(option.legend as string))
      }else if(dataDecription.dataValueX.dimension===2){
        (dataX as number[][]).forEach((v,i)=>{
          drawLineFun(v,(dataY[i] as number[]),(option.color[i] as rgbColor) ,(option.legend as string[])[i])
          
        })
      }
    }
  },
  
})
</script>
