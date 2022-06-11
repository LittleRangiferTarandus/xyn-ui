<template>
  
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance,  watch, PropType, onMounted } from 'vue'
import { Axis, coordinate, DataDecriptionSet, GraphOption} from '../../types/statisticGraph'
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
      default:()=>({classAxis:"x",drawAxis:true,verify:false,updateFunction:undefined}),
      type:Object as PropType<GraphOption>
    },
  },
  setup(props) {
    let context2d: any
    let contextSize: { height: number; width: number }
    
    let pointOf00 :coordinate
    let padding: { left: number; top: number; right: number; bottom: number }
    let innerSize: { height: number; width: number }
    let dataDecription:DataDecriptionSet={x:{dimension:0},y:{dimension:0}}
    let tempThis:any = getCurrentInstance()
    let range:Array<number>
    let axisXY:{xAxisY:number,yAxisX:number}={xAxisY:0,yAxisX:0}
    let positionDiff: { x: number; y: number }
    const getDimension:(arr:Array<any>,d?:number)=>number = (arr:Array<any>,d=1)=>{
      if(Array.isArray(arr[0])){
        return getDimension(arr[0],d+1)
      }else{
        return d
      }
    }

    const dataVerify=()=>{
      if(props.option.classAxis===Axis.x){
        if(dataDecription.x.dimension===1){
          props.dataX.forEach((v: any)=>{
            
            if(!(typeof v ==="string")){
              throw "data verify error: x axis data is not string[]"
            }
          }),
          props.dataY.forEach((v: any)=>{
            if(!(typeof v ==="number")){
              throw "data verify error: y axis data is not number[]"
            }
          })
        }else if(dataDecription.x.dimension===2){
          props.dataX.forEach((v:any)=>{
            if(!Array.isArray(v)){
              throw "data verify error: x axis data is not string[][]"
            }
            v.forEach((e: any)=>{
              if(!(typeof e ==="string")){
                throw "data verify error: x axis data is not string[][]"
              }
            })
          }),
          props.dataY.forEach((v: any)=>{
            
            if(!Array.isArray(v)){
              throw "data verify error: y axis data is not number[][]"
            }
            v.forEach((e: any)=>{
              if(!(typeof e ==="number")){
                throw "data verify error: y axis data is not number[][]"
              }
            })
          })
        }
      }else if(props.option.classAxis===Axis.y){
        if(dataDecription.y.dimension===1){
          
          props.dataY.forEach((v: any)=>{
            if(!(typeof v ==="string")){
              throw "data verify error: y axis data is not string[]"
            }
          }),
          props.dataX.forEach((v: any)=>{
            if(!(typeof v ==="number")){
              throw "data verify error: x axis data is not number[]"
            }
          })
        }else if(dataDecription.y.dimension===2){
          props.dataY.forEach((v:any)=>{
            if(!Array.isArray(v)){
              throw "data verify error: y axis data is not string[][]"
            }
            v.forEach((e: any)=>{
              if(!(typeof e ==="string")){
                throw "data verify error: y axis data is not string[][]"
              }
            })
          }),
          props.dataX.forEach((v: any)=>{
            if(!Array.isArray(v)){
              throw "data verify error: x axis data is not number[][]"
            }
            v.forEach((e: any)=>{
              if(!(typeof e ==="number")){
                throw "data verify error x axis data is not number[][]"
              }
            })
          })
        }
        
      }else{
        throw "data verify error: class axis is unkown"
      }
    }
    const initialize = ()=>{
      dataDecription.x.dimension=getDimension(props.dataX)
      dataDecription.y.dimension=getDimension(props.dataY)
      
      if(dataDecription.x.dimension!==dataDecription.y.dimension||dataDecription.x.dimension>2||dataDecription.y.dimension>2){
            throw 'data dimension error'
      }
        
      if(props.option.verify){
        try{
          dataVerify()
        }catch{
          throw "data verify unkown error"
        }
      }
      

      let otherAxis:Axis = props.option.classAxis===Axis.x?Axis.y:Axis.x
      
      if(dataDecription[otherAxis].dimension===1){
        let max = -Infinity,min=Infinity,mean=0,std=0,sampleSize=props.dataY.length;
        (props.option.classAxis===Axis.x?(<number[]>props.dataY):(<number[]>props.dataX)).forEach((v:number)=>{
          if(v>max){
            max=v
          }
          if(v<min){
            min=v
          }
          mean+=v
        })
        mean/=sampleSize;
        (props.option.classAxis===Axis.x?(<number[]>props.dataY):(<number[]>props.dataX)).forEach((v:number)=>{
          std+=(v-mean)**2
        })
        std=sampleSize===1?0:(std/(sampleSize-1))**(0.5)
        dataDecription[otherAxis].max=max
        dataDecription[otherAxis].min=min
        dataDecription[otherAxis].mean=mean
        dataDecription[otherAxis].std=std
        dataDecription[otherAxis].sampleSize=sampleSize
      
      }else if(dataDecription[otherAxis].dimension===2){
        let max = -Infinity,min=Infinity,mean=0,std=0,sampleSize=props.dataY.length*(props.dataY[0] as Array<number|string>).length;
        (props.option.classAxis===Axis.x?(<number[][]>props.dataY):(<number[][]>props.dataX)).forEach((v:number[])=>{
          v.forEach(e=>{

            if(e>max){
              max=e
            }
            if(e<min){
              min=e
            }
            mean+=e
          })
        })
        mean/=sampleSize;
        (props.option.classAxis===Axis.x?(<number[]>props.dataY):(<number[]>props.dataX)).forEach((v:number)=>{
          std+=(v-mean)**2
        })
        std=sampleSize===1?0:(std/(sampleSize-1))**(0.5)
        dataDecription[otherAxis].max=max
        dataDecription[otherAxis].min=min
        dataDecription[otherAxis].mean=mean
        dataDecription[otherAxis].std=std
        dataDecription[otherAxis].sampleSize=sampleSize
      }else{
        throw 'data dimension unkown error'
      }
    }
    const draw = ()=>{
      
      if(!context2d){
        throw "canvas context error"
      }
      
      
      
      getRange()
      getPositionDiff()
      getAxisXY()


      if(props.option.drawAxis){
        drawAxis()
      }



      drawBars()

      if(props.option.drawAxis){
        drawAxisLable()
      }
      
    }
    const getRange = ()=>{
      if(props.option.classAxis===Axis.x){
        
        if(dataDecription.y.max===undefined||dataDecription.y.min===undefined){
          throw "inner draw axis error"
        }
        range=(dataDecription.y.min>=0)?
          [0,dataDecription.y.max]:
          (dataDecription.y.max<=0)?
          [dataDecription.y.min,0]:
          [dataDecription.y.min,dataDecription.y.max]
      }else if(props.option.classAxis===Axis.y){
        if(dataDecription.x.max===undefined||dataDecription.x.min===undefined){
          throw "inner draw axis error"
        }
        range=(dataDecription.x.min>=0)?
          [0,dataDecription.x.max]:
          (dataDecription.x.max<=0)?
          [dataDecription.x.min,0]:
          [dataDecription.x.min,dataDecription.x.max]
      }else{
        throw "inner draw axis error "
      }
    }
    const getPositionDiff = ()=>{
      const {width:innerWidth,height:innerHeight} = innerSize
      if(props.option.classAxis===Axis.x){
        positionDiff = {y:innerHeight/10,x:innerWidth/(props.dataX.length+1)};
      }else if(props.option.classAxis===Axis.y){
        
        positionDiff = {x:innerWidth/10,y:innerHeight/(props.dataY.length+1)};
      }else{
        throw "inner get position error"
      }
    }
    const getAxisXY = ()=>{
      if(range[0]>=0){
        axisXY.xAxisY=innerSize.height+padding.top
        axisXY.yAxisX=padding.left
      }else if(range[1]<=0){
        axisXY.xAxisY=innerSize.height+padding.top
        axisXY.yAxisX=innerSize.width+padding.left
      }else if(range[0]<0,range[1]>0){
        
        if(props.option.classAxis===Axis.y){
          axisXY.xAxisY=innerSize.height+padding.top
          axisXY.yAxisX=innerSize.width*Math.abs(range[0]/(range[1]-range[0]))+padding.left
        }else if(props.option.classAxis===Axis.x){
          axisXY.xAxisY=innerSize.height*Math.abs(range[1]/(range[1]-range[0]))+padding.top
          axisXY.yAxisX=padding.left
          
        }
      }else{
        throw "inner get axis error"
      }
    }
    const drawAxis=()=>{

      
      
      if(range[0]>=0){
        drawArrowLine(context2d,pointOf00,[axisXY.yAxisX,padding.top])
        drawArrowLine(context2d,pointOf00,[padding.left+innerSize.width,axisXY.xAxisY])
      }else if(range[1]<=0){
        
        drawArrowLine(context2d,[axisXY.yAxisX,innerSize.height+padding.top],[axisXY.yAxisX,padding.top])
        drawArrowLine(context2d,[innerSize.width+padding.left,axisXY.xAxisY],[padding.left,axisXY.xAxisY])
      }else{
        

        drawArrowLine(context2d,[padding.left,
          axisXY.xAxisY],
          [innerSize.width+padding.left,
          axisXY.xAxisY])

        drawArrowLine(context2d,[axisXY.yAxisX,
          innerSize.height+padding.top],
          [axisXY.yAxisX,
          padding.top])
      }
      
      
    } 
    const drawAxisLable = ()=>{
      const {width:innerWidth,height:innerHeight} = innerSize
      
      
      if(props.option.classAxis===Axis.x){
        positionDiff = {y:innerHeight/10,x:innerWidth/(props.dataX.length+1)};
        
        //draw class label
        if(dataDecription.x.dimension===1){
          
          (<string[]>props.dataX).forEach((v:string,i:number)=>{
            
            drawText(context2d,[pointOf00[0]+positionDiff.x*(i+1),axisXY.xAxisY],v,{},[0,20])
          })
        }else if(dataDecription.x.dimension===2){
          let classNumber = (props.dataY[0] as number[]).length
          let groupWidth = positionDiff.x
          let barWidth = Math.min(positionDiff.x/(classNumber+(classNumber-1)*0.5)/1.5,100);

          (<string[][]>props.dataX).forEach((v:string[],i:number)=>{
            v.forEach((element,index)=>{
              drawText(context2d,
                [
                  pointOf00[0]
                  +positionDiff.x*(i+1)
                  -0.5*groupWidth
                  +(index)*barWidth*1.5
                  +0.5*barWidth,
                  axisXY.xAxisY
                ],
                element,{},[0,20])

            })
          })
        }else{
          throw "inner draw axis label error"
        }



        let valueDiff=(range[1]-range[0])/10
        let zeroPosition = (range[1]-range[0]===0)?0:(Math.abs(range[0]/(range[1]-range[0]))*innerHeight)
        drawText(context2d,[axisXY.yAxisX,pointOf00[1]-zeroPosition],"0",{},[-20,0])

        let tempHeight = pointOf00[1]-zeroPosition,tempIndex=1
        while(tempHeight>padding.top+positionDiff.y){
          tempHeight-=positionDiff.y
          drawText(context2d,[axisXY.yAxisX,tempHeight],Math.round(valueDiff*tempIndex)+"",{},[-20,0])
          tempIndex++

        }
        tempHeight = pointOf00[1]-zeroPosition,tempIndex=1
        while(tempHeight<innerHeight+padding.top-positionDiff.y){
          tempHeight+=positionDiff.y
          drawText(context2d,[axisXY.yAxisX,tempHeight],-Math.round(valueDiff*tempIndex)+"",{},[-20,0])
          tempIndex++

        }
      }else if(props.option.classAxis===Axis.y){
        
        
        //draw class label
        //console.log(props.dataY,positionDiff,props.dataY.length,innerHeight);
        
        
        if(dataDecription.y.dimension===1){
          (<string[]>props.dataY).forEach((v:string,i:number)=>{
            
            drawText(context2d,[axisXY.yAxisX,pointOf00[1]-positionDiff.y*(i+1)],v,{},[-20,0])
          })
        }else if(dataDecription.y.dimension===2){
          let classNumber = (props.dataY[0] as string[]).length
          let groupWidth = positionDiff.y
          let barWidth = Math.min(positionDiff.y/(classNumber+(classNumber-1)*0.5)/1.5,100);
          (<string[][]>props.dataY).forEach((v:string[],i:number)=>{
                      
            v.forEach((element,index)=>{
              drawText(context2d,[
                  axisXY.yAxisX,
                  pointOf00[1]
                  -positionDiff.y*(i+1)
                  
                  +0.5*groupWidth
                  -(index+1)*barWidth*1.5],element,{},[-20,0])
            })
          })
        }else{
        throw "inner draw axis label error"
      }

        let valueDiff=(range[1]-range[0])/10
        let zeroPosition = (range[1]-range[0])===0?0:(Math.abs(range[0]/(range[1]-range[0]))*innerWidth)
        drawText(context2d,[pointOf00[0]+zeroPosition,axisXY.xAxisY],"0",{},[0,20])

        let tempWidth = pointOf00[0]+zeroPosition,tempIndex=1
        while(tempWidth<padding.left+innerWidth-positionDiff.x){
          
          tempWidth+=positionDiff.x
          drawText(context2d,[tempWidth,axisXY.xAxisY],Math.round(valueDiff*tempIndex)+"",{},[0,20])
          tempIndex++

        }
        tempWidth = pointOf00[0]+zeroPosition,tempIndex=1
        while(tempWidth>padding.left+positionDiff.x){
          tempWidth-=positionDiff.x
          drawText(context2d,[tempWidth,axisXY.xAxisY],-Math.round(valueDiff*tempIndex)+"",{},[0,20])
          tempIndex++

        }
      }else{
        throw "inner draw axis label error"
      }
    }
    const drawBars =() =>{
      const {width:innerWidth,height:innerHeight} = innerSize

    
      if(props.option.classAxis===Axis.x){
        if(dataDecription.x.dimension===1){
          let barWidth = Math.min(positionDiff.x/1.5,100);
          
          (<number[]>props.dataY).forEach((v:number,i:number)=>{
            let barHeight=(range[1]-range[0])===0?0:((<number[]>props.dataY)[i]/(range[1]-range[0])*innerHeight)
            
            drawBar(context2d,[pointOf00[0]+positionDiff.x*(i+1)-0.5*barWidth,axisXY.xAxisY-barHeight],barWidth,barHeight,true)
          })
        }else if(dataDecription.x.dimension===2){
          let classNumber = (props.dataY[0] as number[]).length
          let groupWidth = positionDiff.x
          let barWidth = Math.min(positionDiff.x/(classNumber+(classNumber-1)*0.5)/1.5,100);

          (<number[][]>props.dataY).forEach((v:number[],i:number)=>{
            v.forEach((element,index)=>{
              let barHeigh=(range[1]-range[0])===0?0:(element/(range[1]-range[0])*innerHeight)


              drawBar(context2d,
                [
                  pointOf00[0]
                  +positionDiff.x*(i+1)
                  -0.5*groupWidth
                  +(index)*barWidth*1.5,
                  axisXY.xAxisY-barHeigh
                ],
                barWidth,barHeigh,true)

            })
            
          })
        }else{
          throw "inner draw bar error"
        }
      }else if(props.option.classAxis===Axis.y){
               
        if(dataDecription.y.dimension===1){
          let barWidth = Math.min(positionDiff.y/1.5,100);
        
          (<string[]>props.dataY).forEach((v:string,i:number)=>{
            let barHeigh=(range[1]-range[0])===0?0:((<number[]>props.dataX)[i]/(range[1]-range[0])*innerWidth)
            
            drawBar(context2d,[axisXY.yAxisX,pointOf00[1]-positionDiff.y*(i+1)-0.5*barWidth],barHeigh,barWidth,true)
          })
        }else if(dataDecription.y.dimension===2){
          
          let classNumber = (props.dataY[0] as string[]).length
          let groupWidth = positionDiff.y
          let barWidth = Math.min(positionDiff.y/(classNumber+(classNumber-1)*0.5)/1.5,100);
          
          
          (<number[][]>props.dataX).forEach((v:number[],i:number)=>{
            v.forEach((element,index)=>{
              let barHeigh=(range[1]-range[0])===0?0:(element/(range[1]-range[0])*innerWidth)


              drawBar(context2d,
                [
                  axisXY.yAxisX,
                  pointOf00[1]
                  -positionDiff.y*(i+1)
                  -barWidth
                  
                  +0.5*groupWidth
                  -(index+1)*barWidth*1.5
                ],
                barHeigh,barWidth,true)

            })
          })
        }else{
          throw "inner draw bar error"
        }
      }else{
        throw "inner draw bar error"
      }
      
        
      
      
    }
    const update = ()=>{
      
      initialize()
      let tempGraph=tempThis.parent.data.graph
      context2d=tempGraph.context2d
      contextSize=tempGraph.contextSize
      pointOf00=tempGraph.pointOf00
      padding=tempGraph.padding
      innerSize=tempGraph.innerSize
      draw()
    }
    watch(tempThis.parent.data.graph,()=>{
      update()
    })
    onMounted(()=>{
      if(props.option.updateFunction instanceof Function){
        props.option.updateFunction(update)
      }
    })
  },
})
</script>
