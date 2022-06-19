
<template>
  
</template>
<script lang="ts">
import { defineComponent, PropType} from 'vue'
import { drawArrowLine, drawLine, drawText } from '../drawGraph'
import { formatNumber } from '../statistic'
import { Axis, ContinueContinueGraphOption, ContinueContiunueDecriptionSet, coordinate, DecriptionSet, GraphOption,labelSet, rgbColor} from '../statisticGraph'



export default defineComponent({
  name:"XynContinueContinueBaseChart",
  props:{
    dataY:{
      default:[],
      type:Array as PropType<number[]|number[][]>
    },
    dataX:{
      default:[],
      type:Array as PropType<number[]|number[][]>
    },

    optionSet:{
      default:()=>({
      }),
      type:Object as PropType<ContinueContinueGraphOption>
    },
    symbol:{
      type:String,
      default:""
    }
  },
  data(){
    let context2d: any
    let contextSize: { height: number; width: number }={ height: 0, width: 0 }
    
    let pointOf00 :coordinate=[0,0]
    let padding: { left: number; top: number; right: number; bottom: number }={left:0,top:0,right:0,bottom:0}
    let innerSize: { height: number; width: number }={ height: 0, width: 0 }
    let dataDecription:ContinueContiunueDecriptionSet={
      dataError: {
        dimension: 0,
        max: 0,
        min: 0,
        sampleSize: 0,
        maxSem: 0,
        maxStd: 0,
        mean: 0,
        dataDecriptions: []
      },
      dataValueX: {
        dimension: 0,
        max: 0,
        min: 0,
        sampleSize: 0,
        maxSem: 0,
        maxStd: 0,
        mean: 0,
        dataDecriptions: []
      },
      dataValueY: {
        dimension: 0,
        max: 0,
        min: 0,
        sampleSize: 0,
        maxSem: 0,
        maxStd: 0,
        mean: 0,
        dataDecriptions: []
      },
    }
    let option:ContinueContinueGraphOption={
      drawAxis: false,
      outerAxis: false,
      showAxisLabel: [true, true],
      showLegend: true,
      unit: '',
      arrowAxis: true,
      labelFont: [{}, {}],
      color: [Math.round(Math.random()*255), Math.round(Math.random()*255), Math.round(Math.random()*255)],
      range: undefined,
      drawErrorRange: false,
      legend: []
    }
    let range:[[number,number],[number,number]]=[[0,0],[0,0]]
    let axisXY:{xAxisY:number,yAxisX:number}={xAxisY:0,yAxisX:0}
    let positionDiff: { x: number; y: number }={x:0,y:0}
    let outerAxisXY:{xAxisY:number,yAxisX:number}={xAxisY:0,yAxisX:0};
    let labelSet:labelSet = [];
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
      labelSet,
      outerAxisXY,
      option,
      
    }
  },

  watch:{
    'labelSet.length'(){
      if(!this.option.showLegend){
        
        return
      }
      let total
      if(this.dataDecription.dataValueX.dimension===1){
        total=1
      }else{
        total = this.dataY.length
      }
      
      
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
    },

    
    optionSet(){
      Object.keys(this.optionSet).forEach((v:string)=>{
        let attr:any = (this.optionSet as any)[v]
        if(attr===0||attr){
          (this.option as any)[v]=attr
        }
      })
    }
  },
  methods:{
    dataInitialize(){
    },
    dimensionVerify(){},
    initialize(){
      const {dimensionVerify,dataInitialize}=this
      dimensionVerify()
        
      
      dataInitialize()
    },
    draw(){
      
      if(!this.context2d){
        throw "canvas context error"
      }
      
      
      
      if(!this.option.range){
        this.getRange()
      }else{
        this.range = this.option.range
      }
      
      this.getAxisXY()
      
      
      //console.log(this);
      



      this.drawItems()
      this.context2d.beginPath()

      if(this.option.drawAxis){
        this.drawAxis()

      }
      if(this.option.drawAxis){
        this.drawAxisLable()
        this.drawUnit()
      }
    },
    drawAxisLable(){
      const {range,pointOf00,context2d,option,outerAxisXY,axisXY,padding,positionDiff} = this
      const {width:innerWidth,height:innerHeight} =this.innerSize
      let valueDiffX=formatNumber((range[0][1]-range[0][0])/10),valueDiffY=formatNumber((range[1][1]-range[1][0])/10)

      if(option.scale&&option.scale[0]!==undefined){
        valueDiffX=formatNumber(option.scale[0])
      }else{
        valueDiffX=formatNumber((range[0][1]-range[0][0])/10)
      }
      if(option.scale&&option.scale[1]!==undefined){
        valueDiffY=formatNumber(option.scale[1])
      }else{
        valueDiffY=formatNumber((range[1][1]-range[1][0])/10)
      }
      

      let positionGapX =  ((range[0][1]-range[0][0]===0)?0:(Math.abs(valueDiffX/(range[0][1]-range[0][0]))*innerWidth)),
        positionGapY =  ((range[1][1]-range[1][0]===0)?0:(Math.abs(valueDiffY/(range[1][1]-range[1][0]))*innerHeight))

      let zeroPosition = pointOf00[1]- ((range[1][1]-range[1][0]===0)?0:(Math.abs(range[1][0]/(range[1][1]-range[1][0]))*innerHeight))

      drawText(context2d,[option.outerAxis?outerAxisXY.yAxisX:axisXY.yAxisX,zeroPosition],"0",
      option.labelFont[1]
      ,[-20,0])

      let tempIndex=1 , tempHeight=zeroPosition
      while(tempHeight>padding.top+positionGapY){
        
        
        tempHeight-=positionGapY
        drawText(context2d,[option.outerAxis?outerAxisXY.yAxisX:axisXY.yAxisX,tempHeight],Math.round(valueDiffY*tempIndex*100)/100+"",
        option.labelFont[1]
        ,[-20,0])
        tempIndex++

      }
      
      
      
      tempIndex=1,tempHeight=zeroPosition
      while(tempHeight+positionGapY<pointOf00[1]){
        
        tempHeight+=positionGapY
        drawText(context2d,[option.outerAxis?outerAxisXY.yAxisX:axisXY.yAxisX,tempHeight],-Math.round(valueDiffY*tempIndex*100)/100+"",
        option.labelFont[1]
        ,[-20,0])
        tempIndex++

      }
      zeroPosition = pointOf00[0]+ ((range[0][1]-range[0][0]===0)?0:(Math.abs(range[0][0]/(range[0][1]-range[0][0]))*innerWidth))
      if(option.outerAxis){
        drawText(context2d,[zeroPosition,option.outerAxis?outerAxisXY.xAxisY:axisXY.xAxisY],"0",
        option.labelFont[1]
        ,[0,20])
      }

      
      
      tempIndex=1 
      let tempWidth=zeroPosition
      
      while(tempWidth>pointOf00[0]+positionGapX){
        
        tempWidth-=positionGapX
        drawText(context2d,[tempWidth,option.outerAxis?outerAxisXY.xAxisY:axisXY.xAxisY],-Math.round(valueDiffX*tempIndex*100)/100+"",
        option.labelFont[0]
        ,[0,20])
        tempIndex++
        
      }
      
      tempIndex=1,tempWidth=zeroPosition
      while(tempWidth+positionGapX<pointOf00[0]+innerWidth){
        tempWidth+=positionGapX
        drawText(context2d,[tempWidth,option.outerAxis?outerAxisXY.xAxisY:axisXY.xAxisY],Math.round(valueDiffX*tempIndex*100)/100+"",
        option.labelFont[0]
        ,[0,20])
        tempIndex++

      }
    },
    drawUnit(){
      const {context2d,option,outerAxisXY,axisXY,padding} = this
      drawText(context2d,
        [
          option.outerAxis?outerAxisXY.yAxisX:axisXY.yAxisX,
          padding.top
        ],
        option.unit,
        option.labelFont[1],
        [20,0])
      drawText(context2d,
        [
          option.outerAxis?outerAxisXY.xAxisY:axisXY.xAxisY,
          this.pointOf00[1]
        ],
        option.unit,
        option.labelFont[1],
        [0,20])
    },
    getAxisXY (){
      const {width:innerWidth,height:innerHeight} =this.innerSize
      if(this.range[0][0]>=0){
        if(this.range[1][0]>=0){
          this.axisXY.xAxisY=this.pointOf00[1]
          this.axisXY.yAxisX=this.pointOf00[0]
        }else if(this.range[1][1]<=0){
          this.axisXY.xAxisY=this.padding.top
          this.axisXY.yAxisX=this.pointOf00[0]
        }else{
          this.axisXY.xAxisY=-this.range[1][0]/(this.range[1][1]-this.range[1][0])*innerHeight+this.pointOf00[1]
          this.axisXY.yAxisX=this.pointOf00[0]
        }
      }else if(this.range[0][1]<=0){
        if(this.range[1][0]>=0){
          this.axisXY.xAxisY=this.pointOf00[1]
          this.axisXY.yAxisX=this.pointOf00[0]+innerWidth
        }else if(this.range[1][1]<=0){
          this.axisXY.xAxisY=this.padding.top
          this.axisXY.yAxisX=this.pointOf00[0]+innerWidth
        }else{
          this.axisXY.xAxisY=-this.range[1][0]/(this.range[1][1]-this.range[1][0])*innerHeight+this.pointOf00[1]
          this.axisXY.yAxisX=this.pointOf00[0]+innerWidth
        }
      }else{
        if(this.range[1][0]>=0){
          this.axisXY.xAxisY=this.pointOf00[1]
          this.axisXY.yAxisX=-this.range[0][0]/(this.range[0][1]-this.range[0][0])*innerWidth+this.pointOf00[0]
        }else if(this.range[1][1]<=0){
          this.axisXY.xAxisY=this.padding.top
          this.axisXY.yAxisX=-this.range[0][0]/(this.range[0][1]-this.range[0][0])*innerWidth+this.pointOf00[0]
        }else{
          this.axisXY.xAxisY=-this.range[1][0]/(this.range[1][1]-this.range[1][0])*innerHeight+this.pointOf00[1]
          this.axisXY.yAxisX=-this.range[0][0]/(this.range[0][1]-this.range[0][0])*innerWidth+this.pointOf00[0]
        }
      }
      //console.log(this.range,this.axisXY,this.range[0][0]/(this.range[0][1]-this.range[0][0]));
      
    },

    drawAxis(){
      const drawAxisFun = this.option.arrowAxis?drawArrowLine:drawLine
      if(this.option.outerAxis){
        
        this.outerAxisXY.xAxisY=this.pointOf00[1]
        this.outerAxisXY.yAxisX=this.pointOf00[0]
        drawAxisFun(this.context2d,this.pointOf00,[this.pointOf00[0],this.padding.top])
        drawAxisFun(this.context2d,this.pointOf00,[this.pointOf00[0]+this.innerSize.width,this.pointOf00[1]])
        return
      }
      
      
      drawAxisFun(this.context2d,[this.axisXY.yAxisX,this.pointOf00[1],],[this.axisXY.yAxisX,this.padding.top])
      drawAxisFun(this.context2d,[this.pointOf00[0],this.axisXY.xAxisY],[this.pointOf00[0]+this.innerSize.width,this.axisXY.xAxisY])
      
      
    } ,
    getRange(){

    },
    
    drawItems(){
    },
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
    },
  },
  created(){
    Object.keys(this.optionSet).forEach((v:string)=>{
      let attr:any = (this.optionSet as any)[v]
      if(attr===0||attr){
        (this.option as any)[v]=attr
      }
    })
  },
  
})
</script>
