<template>
  
</template>
<script lang="ts">
import { defineComponent, PropType} from 'vue'
import { Axis} from '../../types/statisticGraph'
import { drawBar ,drawErrorBar} from './drawGraph'
import XBaseChartVue from './XBaseChart.vue'

export default defineComponent({
  name:"BetaXynBarChart",
  extends:XBaseChartVue,
  props:{
    dataY:{
      default:[],
      type:Array as PropType<number[]|number[][]|string[]|string[][]>
    },
    dataX:{
      default:[],
      type:Array as PropType<number[]|number[][]|string[]|string[][]>
    },
    dataError:{
      default:[],
      type:Array as PropType<number[]|number[][]>
    },
  },
  methods:{
    
    dataInitialize(){
      const {option,dataDecription,dataX,dataY,dataError}=this
      let otherAxis:Axis = option.classAxis===Axis.x?Axis.y:Axis.x
      
      if(dataDecription[otherAxis].dimension===1){
        let max = -Infinity,min=Infinity,mean=0,std=0,sampleSize=dataY.length;
        (option.classAxis===Axis.x?(<number[]>dataY):(<number[]>dataX)).forEach((v:number)=>{
          if(v>max){
            max=v
          }
          if(v<min){
            min=v
          }
          mean+=v
        })
        mean/=sampleSize;
        (option.classAxis===Axis.x?(<number[]>dataY):(<number[]>dataX)).forEach((v:number)=>{
          std+=(v-mean)**2
        })
        std=sampleSize===1?0:(std/(sampleSize-1))**(0.5)
        dataDecription[otherAxis].max=max
        dataDecription[otherAxis].min=min
        dataDecription[otherAxis].mean=mean
        dataDecription[otherAxis].std=std
        dataDecription[otherAxis].sampleSize=sampleSize

        if(dataDecription.error){
          let maxError = Math.max(...(dataError as number []))
          dataDecription.error.max = maxError

        }
      
      }else if(dataDecription[otherAxis].dimension===2){
        let max = -Infinity,min=Infinity,mean=0,std=0,sampleSize=dataY.length*(dataY[0] as Array<number|string>).length;
        (option.classAxis===Axis.x?(<number[][]>dataY):(<number[][]>dataX)).forEach((v:number[])=>{
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
        (option.classAxis===Axis.x?(<number[]>dataY):(<number[]>dataX)).forEach((v:number)=>{
          std+=(v-mean)**2
        })
        std=sampleSize===1?0:(std/(sampleSize-1))**(0.5)
        dataDecription[otherAxis].max=max
        dataDecription[otherAxis].min=min
        dataDecription[otherAxis].mean=mean
        dataDecription[otherAxis].std=std
        dataDecription[otherAxis].sampleSize=sampleSize

        if(dataDecription.error){
          (dataError as number[][]).forEach((v:number[])=>{
            let maxError = Math.max(...(v as number []))
            if(dataDecription.error){
              if(dataDecription.error.max){
                dataDecription.error.max = maxError>dataDecription.error.max?maxError:dataDecription.error.max
              }else{
                dataDecription.error.max = maxError
              }
            }

          })

        }
      }else{
        throw 'data dimension unkown error'
      }
    },
    dimensionVerify(){
      const {dataDecription,getDimension}=this
      dataDecription.x.dimension = getDimension(this.dataX)
      dataDecription.y.dimension = getDimension(this.dataY)
      if(dataDecription.x.dimension!==dataDecription.y.dimension||dataDecription.x.dimension>2||dataDecription.y.dimension>2){
        throw 'data dimension error'
      }
      if(this.dataError){
        dataDecription.error={dimension:0}
        dataDecription.error.dimension = getDimension(this.dataError)
        if(dataDecription.x.dimension!==dataDecription.error.dimension||dataDecription.error.dimension>2){
          throw 'data dimension error'
        }
      }
    },
    getRange(){
      const {option,dataDecription}=this
      let errorMax =dataDecription?.error?.max?dataDecription.error.max/2:0
      
      if(option.classAxis===Axis.x){
        
        if(dataDecription.y.max===undefined||dataDecription.y.min===undefined){
          throw "inner draw axis error"
        }
        this.range=(dataDecription.y.min-errorMax>=0)?
          [0,(dataDecription.y.max+errorMax)*1.1]:
          (dataDecription.y.max+errorMax<=0)?
          [(dataDecription.y.min-errorMax)*1.1,0]:
          [(dataDecription.y.min-errorMax)*1.1,(dataDecription.y.max+errorMax)*1.1]
      }else if(option.classAxis===Axis.y){
        if(dataDecription.x.max===undefined||dataDecription.x.min===undefined){
          throw "inner draw axis error"
        }
        this.range=(dataDecription.x.min-errorMax>=0)?
          [0,(dataDecription.x.max+errorMax)*1.1]:
          (dataDecription.x.max+errorMax<=0)?
          [(dataDecription.x.min-errorMax)*1.1,0]:
          [(dataDecription.x.min-errorMax)*1.1,(dataDecription.x.max+errorMax)*1.1]

          
      }else{
        throw "inner draw axis error "
      }
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
      this.drawErrorBars()
    },
    drawBars(){
      const {innerSize,option,dataDecription,positionDiff,range,dataY,context2d,pointOf00,axisXY,dataX,labelSet,dataError}=this
      const {width:innerWidth,height:innerHeight} = innerSize

    
      if(option.classAxis===Axis.x){
        if(dataDecription.x.dimension===1){
          let barWidth = positionDiff.x*2;
          
          (<number[]>dataY).forEach((v:number,i:number)=>{
            let barHeight=(range[1]-range[0])===0?0:((<number[]>dataY)[i]/(range[1]-range[0])*innerHeight)
            
            let color = drawBar(context2d,[
              pointOf00[0]
              +positionDiff.x*(i+1)
              +i*barWidth
              ,axisXY.xAxisY-barHeight],barWidth,barHeight,true
            )
            labelSet.push({color,label:(dataX as string[])[i]})
          })

        }else if(dataDecription.x.dimension===2){

          let classNumber = (dataY[0] as number[]).length
          let groupWidth = positionDiff.x*2
          let groupPositionDiff=groupWidth/(classNumber*3+1)
          let barWidth = groupPositionDiff*2;

          (<number[][]>dataY).forEach((v:number[],i:number)=>{
            v.forEach((element,index)=>{
              let barHeigh=(range[1]-range[0])===0?0:(element/(range[1]-range[0])*innerHeight)


              let color = drawBar(context2d,
                [
                  pointOf00[0]
                  +positionDiff.x*(i+1)
                  +i*groupWidth
                  +(index+1)*groupPositionDiff
                  +index*barWidth,
                  axisXY.xAxisY-barHeigh
                ],
                barWidth,barHeigh,true
              )
              labelSet.push({color,label:(dataX as string[][])[i][index]})

            })
            
          })
        }else{
          throw "inner draw bar error"
        }
      }else if(option.classAxis===Axis.y){
               
        if(dataDecription.y.dimension===1){
          let barWidth = positionDiff.y*2;
        
          (<string[]>dataX).forEach((v:string,i:number)=>{
            let barHeigh=(range[1]-range[0])===0?0:((<number[]>dataX)[i]/(range[1]-range[0])*innerWidth)
            
            let color = drawBar(context2d,[axisXY.yAxisX,pointOf00[1]-positionDiff.y*(i+1)-(i+1)*barWidth],barHeigh,barWidth,true)

            labelSet.push({color,label:(dataY as string[])[i]})

          })
        }else if(dataDecription.y.dimension===2){
          
          let classNumber = (dataY[0] as string[]).length
          let groupWidth = positionDiff.y*2
          let groupPositionDiff = groupWidth/(classNumber*3+1)
          let barWidth = groupPositionDiff*2;
          
          
          (<number[][]>dataX).forEach((v:number[],i:number)=>{
            v.forEach((element,index)=>{
              let barHeigh=(range[1]-range[0])===0?0:(element/(range[1]-range[0])*innerWidth)


              let color=drawBar(context2d,
                [
                  axisXY.yAxisX,
                  pointOf00[1]
                  -positionDiff.y*(i+1)
                  -groupWidth*i
                  -groupPositionDiff*(index+1)
                  -barWidth*(index+1)
                  
                ],
                barHeigh,barWidth,true
              )
              labelSet.push({color,label:(dataY as string[][])[i][index]})

            })
          })
        }else{
          throw "inner draw bar error"
        }
      }else{
        throw "inner draw bar error"
      }
      
        
      
      
    },
    drawErrorBars(){
      const {innerSize,option,dataDecription,positionDiff,range,dataY,context2d,pointOf00,axisXY,dataX,dataError}=this
      const {width:innerWidth,height:innerHeight} = innerSize

    
      if(option.classAxis===Axis.x){
        if(dataDecription.x.dimension===1){
          let barWidth = positionDiff.x*2;
          
          (<number[]>dataError).forEach((v:number,i:number)=>{
            let barHeight=(range[1]-range[0])===0?0:((<number[]>dataY)[i]/(range[1]-range[0])*innerHeight)
            let length=(range[1]-range[0])===0?0:(v/(range[1]-range[0])*innerHeight)

            drawErrorBar(context2d,[
              pointOf00[0]
              +positionDiff.x*(i+1)
              +(i+0.5)*barWidth
              ,axisXY.xAxisY-barHeight],15,length,Axis.y)
          })

        }else if(dataDecription.x.dimension===2){

          let classNumber = (dataY[0] as number[]).length
          let groupWidth = positionDiff.x*2
          let groupPositionDiff=groupWidth/(classNumber*3+1)
          let barWidth = groupPositionDiff*2;

          (<number[][]>dataError).forEach((v:number[],i:number)=>{
            v.forEach((element,index)=>{
              let barHeigh=(range[1]-range[0])===0?0:((<number[][]>dataY)[i][index]/(range[1]-range[0])*innerHeight)
              let length=(range[1]-range[0])===0?0:(element/(range[1]-range[0])*innerHeight)
              
              drawErrorBar(context2d,[pointOf00[0]
                  +positionDiff.x*(i+1)
                  +i*groupWidth
                  +(index+1)*groupPositionDiff
                  +(index+0.5)*barWidth,
                  axisXY.xAxisY-barHeigh],15,length,Axis.y)

            })
            
          })
        }else{
          throw "inner draw bar error"
        }
      }else if(option.classAxis===Axis.y){
               
        if(dataDecription.y.dimension===1){
          let barWidth = positionDiff.y*2;
        
          (<number[]>dataError).forEach((v:number,i:number)=>{
            let barHeigh=(range[1]-range[0])===0?0:((<number[]>dataX)[i]/(range[1]-range[0])*innerWidth)
            
            let length = ((range[1]-range[0])===0)?0:Math.abs((v)/(range[1]-range[0])*innerWidth)
            
            drawErrorBar(context2d,[axisXY.yAxisX+barHeigh,pointOf00[1]-positionDiff.y*(i+1)-(i+0.5)*barWidth],15,length,Axis.x)
          })
        }else if(dataDecription.y.dimension===2){
          
          let classNumber = (dataY[0] as string[]).length
          let groupWidth = positionDiff.y*2
          let groupPositionDiff = groupWidth/(classNumber*3+1)
          let barWidth = groupPositionDiff*2;
          
          
          (<number[][]>dataError).forEach((v:number[],i:number)=>{
            v.forEach((element,index)=>{
              let barHeigh=(range[1]-range[0])===0?0:((<number[][]>dataX)[i][index]/(range[1]-range[0])*innerWidth)
              let length=(range[1]-range[0])===0?0:(element/(range[1]-range[0])*innerWidth)
              drawErrorBar(context2d,[axisXY.yAxisX+barHeigh,pointOf00[1]
                  -positionDiff.y*(i+1)
                  -groupWidth*i
                  -groupPositionDiff*(index+1)
                  -barWidth*(index+0.5)],15,length,Axis.x)
                  
                  
            })
          })
        }else{
          throw "inner draw bar error"
        }
      }else{
        throw "inner draw bar error"
      }
    }
  },
  
})
</script>
