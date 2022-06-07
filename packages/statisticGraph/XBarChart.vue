<template>
  
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance,  watch, PropType } from 'vue'
import { Axis, coordinate, DataDecriptionSet} from '../../types/statisticGraph'
import { drawArrowLine, drawBar, drawText } from './drawGraph'

export default defineComponent({
  name:"BetaXynBarChart",
  props:{
    dataY:{
      default:[],
      type:Array as PropType<number[]|number[][]|string[]|string[][]>
    },
    dataX:{
      default:[],
      type:Array as PropType<number[]|number[][]|string[]|string[][]>
    },
    option:{
      default:()=>({classAxis:"y",drawAxis:false}),
      type:Object
    },
  },
  setup(props) {
    let context2d: any
    let contextSize: { height: number; width: number }
    let graphSize: { height: number; width: number }
    let pointOf00 :coordinate
    let padding: { left: number; top: number; right: number; bottom: number }
    let innerSize: { height: number; width: number }
    let dataDecription:DataDecriptionSet={x:{dimension:0},y:{dimension:0}}
    let tempThis = getCurrentInstance()
    const getDimension:(arr:Array<any>,d?:number)=>number = (arr:Array<any>,d=1)=>{
      if(Array.isArray(arr[0])){
        return getDimension(arr[0],d+1)
      }else{
        return d
      }
    }
    const formatVarify = ()=>{
      dataDecription.x.dimension=getDimension(props.dataX)
      dataDecription.y.dimension=getDimension(props.dataY)
      
      if(dataDecription.x.dimension!==dataDecription.y.dimension||dataDecription.x.dimension>2||dataDecription.y.dimension>2){
            throw 'data error'
      }
      const formatVarifyFun=(axis:Axis)=>{
        let otherAxis:Axis = axis==="x"?"y":"x"
        if(dataDecription[otherAxis].dimension===1){
          let max = -Infinity,min=Infinity,mean=0,std=0,sampleSize=props.dataY.length;
          (axis==="x"?(<number[]>props.dataY):(<number[]>props.dataX)).forEach((v:number)=>{
            if(v>max){
              max=v
            }
            if(v<min){
              min=v
            }
            mean+=v
          })
          mean/=sampleSize;
          (axis==="x"?(<number[]>props.dataY):(<number[]>props.dataX)).forEach((v:number)=>{
            std+=(v-mean)**2
          })
          std=sampleSize===1?0:(std/(sampleSize-1))**(0.5)
          dataDecription[otherAxis].max=max
          dataDecription[otherAxis].min=min
          dataDecription[otherAxis].mean=mean
          dataDecription[otherAxis].std=std
          dataDecription[otherAxis].sampleSize=sampleSize
        }
      }
      formatVarifyFun(props.option.classAxis)
    }
    const draw = ()=>{
      
      if(!context2d){
        throw "canvas context error"
      }
      
      
      drawArrowLine(context2d,pointOf00,[padding.left,padding.top])
      drawArrowLine(context2d,pointOf00,[padding.left+graphSize.width,graphSize.height+padding.top])
      
      if(props.option.drawAxis){
        drawAxis()
      }
      
      drawBars()
    }
    const drawAxis = ()=>{
      const {width:innerWidth,height:innerHight} = innerSize
      if(dataDecription.x.dimension===1&&dataDecription.y.dimension===1){
        let position = {x:innerWidth/(props.dataX.length+1),y:innerHight/9};
        (<string[]>props.dataX).forEach((v:string,i:number)=>{
          drawText(context2d,[pointOf00[0]+position.x*(i+1)+graphSize.width*.05,pointOf00[1]],v,{})
        })
        let leftAxisPoint
        if(dataDecription.y.max!==undefined&&dataDecription.y.min!==undefined){
          leftAxisPoint = (dataDecription.y.max-dataDecription.y.min)/10
          for(let i=0;i<11;i++){
            drawText(context2d,[pointOf00[0]-20,pointOf00[1]-position.y*(i)],Math.round(leftAxisPoint*i)+"",{})
          }
        }else{
          throw "inner error"
        }
          
      }
    }
    const drawBars =() =>{
      const {width:innerWidth,height:innerHeight} = innerSize

      const drawBarsFun=(axis:Axis)=>{
        
        let position = axis==="x"?innerWidth/(props.dataX.length+1):innerHeight/(props.dataY.length+1)
        let barWidth: number 
        
        if(dataDecription[axis].dimension===1){
          barWidth = Math.min(axis==="x"?innerWidth/10:innerHeight/10,position/3);
          
          let range: number
          if(axis==="x"&&dataDecription.y.max!==undefined&&dataDecription.y.min!==undefined){
            range=dataDecription.y.max-0;
            (<string[]>props.dataX).forEach((v:string,i:number)=>{
              let barHeigh=range===0?0:((<number[]>props.dataY)[i]/range*innerHeight)
              
              
              
              drawBar(context2d,[pointOf00[0]+position*(i+1)+graphSize.width*.05-0.5*barWidth,pointOf00[1]-barHeigh],barWidth,barHeigh,true)
            })
          }else if(axis==="y"&&dataDecription.x.max!==undefined&&dataDecription.x.min!==undefined){
            range=dataDecription.x.max-0;
            (<string[]>props.dataY).forEach((v:string,i:number)=>{
              let barHeigh=range===0?0:((<number[]>props.dataX)[i]/range*innerWidth)
              
              drawBar(context2d,[pointOf00[1]+barHeigh,pointOf00[0]+position*(i+1)+graphSize.height*.05-0.5*barWidth],barHeigh,barWidth,true)
            })
          }else{
            throw "inner draw bar error"
          }
          
        }
      }
      
      drawBarsFun(props.option.classAxis)
    }
    watch(tempThis.parent.data.graph,()=>{
      formatVarify()
      let tempGraph=tempThis.parent.data.graph
      context2d=tempGraph.context2d
      contextSize=tempGraph.contextSize
      graphSize=tempGraph.graphSize
      pointOf00=tempGraph.pointOf00
      padding=tempGraph.padding
      innerSize=tempGraph.innerSize
      draw()
    })
  },
})
</script>
