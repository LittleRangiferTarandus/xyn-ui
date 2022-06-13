<template>
  
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Axis, coordinate, DataDecriptionSet, GraphOption,labelSet} from '../../types/statisticGraph'
import { drawArrowLine, drawText } from './drawGraph'

export default defineComponent({
  name:"BetaXynBaseChart",
  props:{
    dataY:{
      default:[],
      type:Array as PropType<any[]>
    },
    dataX:{
      default:[],
      type:Array as PropType<any[]>
    },
    option:{
      default:()=>({classAxis:"x",drawAxis:true,verify:false}),
      type:Object as PropType<GraphOption>
    },
    symbol:{
      default:"",
      type:String
    }
  },
  data(){
    let context2d: any
    let contextSize: { height: number; width: number }={ height: 0, width: 0 }
    
    let pointOf00 :coordinate=[0,0]
    let padding: { left: number; top: number; right: number; bottom: number }={left:0,top:0,right:0,bottom:0}
    let innerSize: { height: number; width: number }={ height: 0, width: 0 }
    let dataDecription:DataDecriptionSet={x:{dimension:0},y:{dimension:0}}
    
    let range:Array<number>=[0,0]
    let axisXY:{xAxisY:number,yAxisX:number}={xAxisY:0,yAxisX:0}
    let positionDiff: { x: number; y: number }={x:0,y:0}

    let labelSet:labelSet = []
    return{
      context2d,
      contextSize,
      pointOf00,
      padding,
      innerSize,
      dataDecription,
      range,
      axisXY,
      positionDiff,
      labelSet
    }
  },
  watch:{
    'labelSet.length'(){
      let total = this.dataDecription.x.dimension===1?this.dataX.length:(this.dataX[0] as any[]).length*this.dataX.length
      if(this.labelSet.length===total){
        if((this.$parent as any)){
          (this.$parent as any).label[this.symbol]=this.labelSet
          
        }else{
          throw "inner on this error"
        }
          
      }
      
    },
    "$parent.graph":{
      handler(){
        
        //console.log("miao");
        
        this.update()
      },
      deep:true
    }
  },
  methods:{
    getDimension(arr:Array<any>,d=1){
      if(Array.isArray(arr[0])){
        return this.getDimension(arr[0],d+1)
      }else{
        return d
      }
    },
    dataVerify(){},
    dataInitialize(){},
    dimensionVerify(){},
    initialize(){
      const {dimensionVerify,dataVerify,option,dataInitialize}=this
      dimensionVerify()
        
      if(option.verify){
        try{
          dataVerify()
        }catch{
          throw "data verify unkown error"
        }
      }
      
      dataInitialize()
    },
    draw(){
      
      if(!this.context2d){
        throw "canvas context error"
      }
      
      
      
      this.getRange()
      this.getPositionDiff()
      this.getAxisXY()

      //console.log(this);
      

      if(this.option.drawAxis){
        this.drawAxis()
      }



      this.drawItems()

      if(this.option.drawAxis){
        this.drawAxisLable()
      }
    },
    getRange(){},
    getPositionDiff(){},
    getAxisXY (){
      if(this.range[0]>=0){
        this.axisXY.xAxisY=this.innerSize.height+this.padding.top
        this.axisXY.yAxisX=this.padding.left
      }else if(this.range[1]<=0){
        this.axisXY.xAxisY=this.innerSize.height+this.padding.top
        this.axisXY.yAxisX=this.innerSize.width+this.padding.left
      }else if(this.range[0]<0,this.range[1]>0){
        
        if(this.option.classAxis===Axis.y){
          this.axisXY.xAxisY=this.innerSize.height+this.padding.top
          this.axisXY.yAxisX=this.innerSize.width*Math.abs(this.range[0]/(this.range[1]-this.range[0]))+this.padding.left
        }else if(this.option.classAxis===Axis.x){
          this.axisXY.xAxisY=this.innerSize.height*Math.abs(this.range[1]/(this.range[1]-this.range[0]))+this.padding.top
          this.axisXY.yAxisX=this.padding.left
          
        }
      }else{
        throw "inner get axis error"
      }
    },
    drawAxis(){

      
      
      if(this.range[0]>=0){
        drawArrowLine(this.context2d,this.pointOf00,[this.axisXY.yAxisX,this.padding.top])
        drawArrowLine(this.context2d,this.pointOf00,[this.padding.left+this.innerSize.width,this.axisXY.xAxisY])
      }else if(this.range[1]<=0){
        
        drawArrowLine(this.context2d,[this.axisXY.yAxisX,this.innerSize.height+this.padding.top],[this.axisXY.yAxisX,this.padding.top])
        drawArrowLine(this.context2d,[this.innerSize.width+this.padding.left,this.axisXY.xAxisY],[this.padding.left,this.axisXY.xAxisY])
      }else{
        

        drawArrowLine(this.context2d,[this.padding.left,
          this.axisXY.xAxisY],
          [this.innerSize.width+this.padding.left,
          this.axisXY.xAxisY])

        drawArrowLine(this.context2d,[this.axisXY.yAxisX,
          this.innerSize.height+this.padding.top],
          [this.axisXY.yAxisX,
          this.padding.top])
      }
      
      
    } ,
    drawAxisLable(){
      const {innerSize,dataDecription,context2d,positionDiff,axisXY,pointOf00,range,padding,dataX,option,dataY}=this
      const {width:innerWidth,height:innerHeight} = innerSize
      
      
      if(option.classAxis===Axis.x){
        
        //draw class label
        if(dataDecription.x.dimension===1){
          let barWidth=positionDiff.x*2;
          (<string[]>dataX).forEach((v:string,i:number)=>{
            
            drawText(context2d,[
              pointOf00[0]
              +positionDiff.x*(i+1)
              +i*barWidth
              +0.5*barWidth
              ,axisXY.xAxisY],v,{},[0,20])
          })
        }else if(dataDecription.x.dimension===2){
          let classNumber = (dataY[0] as number[]).length
          let groupWidth = positionDiff.x*2
          let groupPositionDiff=groupWidth/(classNumber*3+1)
          let barWidth = groupPositionDiff*2;

          (<string[][]>dataX).forEach((v:string[],i:number)=>{
            v.forEach((element,index)=>{
              drawText(context2d,
                [
                  pointOf00[0]
                  +positionDiff.x*(i+1)
                  +i*groupWidth
                  +(index+1)*groupPositionDiff
                  +0.5*barWidth
                  +index*barWidth,
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
      }else if(option.classAxis===Axis.y){
        
        
        //draw class label
        //console.log(props.dataY,positionDiff,props.dataY.length,innerHeight);
        
        
        if(dataDecription.y.dimension===1){
          (<string[]>dataY).forEach((v:string,i:number)=>{
            let barWidth=2*positionDiff.y;
            drawText(context2d,[axisXY.yAxisX,pointOf00[1]-positionDiff.y*(i+1)-(i+0.5)*barWidth],v,{},[-20,0])
          })
        }else if(dataDecription.y.dimension===2){
          let classNumber = (dataY[0] as string[]).length
          let groupWidth = positionDiff.y*2
          let groupPositionDiff = groupWidth/(classNumber*3+1)
          let barWidth = groupPositionDiff*2;
          (<string[][]>dataY).forEach((v:string[],i:number)=>{
                      
            v.forEach((element,index)=>{
              drawText(context2d,[
                  axisXY.yAxisX,
                  pointOf00[1]
                  -positionDiff.y*(i+1)
                  -groupWidth*i
                  -groupPositionDiff*(index+1)
                  -barWidth*(index)
                  ],element,{},[-20,-5])
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
    },
    drawItems(){},
    update(){
      let {initialize,draw}=this
      initialize()
      let tempGraph=(this.$parent as any).graph
      this.context2d=tempGraph.context2d
      this.contextSize=tempGraph.contextSize
      this.pointOf00=tempGraph.pointOf00
      this.padding=tempGraph.padding
      this.innerSize=tempGraph.innerSize
      draw()
    }
  },

})
</script>
