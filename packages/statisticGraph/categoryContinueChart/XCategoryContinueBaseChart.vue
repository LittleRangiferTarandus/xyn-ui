<template>
  
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Axis, coordinate, DecriptionSet, GraphOption,labelSet, rgbColor} from '../statisticGraph'
import { drawArrowLine, drawLine, drawText } from '../drawGraph'
import { formatNumber } from '../statistic'

export default defineComponent({
  name:"BetaXynCategoryContinueBaseChart",
  props:{
    dataY:{
      default:[],
      type:Array as PropType<any[]>
    },
    dataX:{
      default:[],
      type:Array as PropType<any[]>
    },
    optionSet:{
      default:()=>({}),
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
    let option:GraphOption={
      classAxis: Axis.x,
      drawAxis: true,
      outerAxis: false,
      showAxisLabel: [true, true],
      showLegend: true,
      unit: '',
      group: true,
      arrowAixs: true,
      labelFont: [{}, {}],
      valueRange: undefined,
      defaultColor: [Math.round(Math.random()*255), Math.round(Math.random()*255), Math.round(Math.random()*255)],
      groupBound: false
    }
    let range:Array<number>=[0,0]
    let axisXY:{xAxisY:number,yAxisX:number}={xAxisY:0,yAxisX:0}
    let positionDiff: { x: number; y: number }={x:0,y:0}
    let outerAxisXY:{xAxisY:number,yAxisX:number}={xAxisY:0,yAxisX:0}
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
      labelSet,
      outerAxisXY,
      option,
      
    }
  },
  created(){
    Object.keys(this.optionSet).forEach((v:string)=>{
      let attr:any = (this.optionSet as any)[v]
      if(attr===0||attr){
        (this.option as any)[v]=attr
      }
    })
  },
  watch:{
    'labelSet.length'(){
      
      if(!this.option.showLegend){
        
        return
      }
      
      let total = this.dataDecription.dataValue.dimension===1?this.dataX.length:(this.dataX[0] as any[]).length*this.dataX.length

      
      if(this.labelSet.length===total&&this.option.showLegend){
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
    getIsGroup(){},
    dataInitialize(){},
    dimensionVerify(){},
    initialize(){
      const {dimensionVerify,option,dataInitialize}=this
      dimensionVerify()
        
      
      dataInitialize()
    },
    draw(){
      
      if(!this.context2d){
        throw "canvas context error"
      }
      
      
      
      if(!this.option.valueRange){
        this.getRange()
      }else{
        this.range = this.option.valueRange
      }
      this.getPositionDiff()
      this.getAxisXY()
      
      this.getIsGroup()
      //console.log(this);
      



      this.drawItems()
      if(this.option.drawAxis){
        this.drawAxis()

      }
      if(this.option.drawAxis){
        this.drawAxisLable()
        this.drawUnit()
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
    },
    getRange(){},
    getPositionDiff(){},
    getAxisXY (){
      if(this.range[0]>=0){
        if(this.option.classAxis===Axis.y){
          this.axisXY.xAxisY=this.innerSize.height+this.padding.top
          this.axisXY.yAxisX=this.padding.left
        }else if(this.option.classAxis===Axis.x){
          this.axisXY.xAxisY=this.innerSize.height+this.padding.top
          this.axisXY.yAxisX=this.padding.left
          
        }

      }else if(this.range[1]<=0){
        if(this.option.classAxis===Axis.y){
          this.axisXY.xAxisY=this.innerSize.height+this.padding.top
          this.axisXY.yAxisX=this.innerSize.width+this.padding.left
        }else if(this.option.classAxis===Axis.x){
          this.axisXY.xAxisY=this.padding.top
          this.axisXY.yAxisX=this.padding.left
          
        }
        
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
      const drawAxisFun = this.option.arrowAixs?drawArrowLine:drawLine
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
    drawAxisLable(){
      const {innerSize,dataDecription,context2d,positionDiff,axisXY,pointOf00,range,padding,dataX,option,dataY,outerAxisXY}=this
      const {width:innerWidth,height:innerHeight} = innerSize
      
      let positionGapLength = option.classAxis===Axis.x?innerHeight:innerWidth

      let valueDiff=formatNumber((range[1]-range[0])/10),
        positionGap =  ((range[1]-range[0]===0)?0:(Math.abs(valueDiff/(range[1]-range[0]))*positionGapLength))
      if(option.classAxis===Axis.x){
        if(option.showAxisLabel[0]){
          
          //draw class label
          if(!option.group){
            let barWidth=positionDiff.x*2;
            (<string[]>dataX).forEach((v:string,i:number)=>{
              
              drawText(context2d,[
                pointOf00[0]
                +positionDiff.x*(i+1)
                +i*barWidth
                +0.5*barWidth
                ,option.outerAxis?outerAxisXY.xAxisY:axisXY.xAxisY],v,option.labelFont[0],[0,20])
            })
          }else {
            if((this as any).drawGroupLabel instanceof Function&&this.option.groupBound){
              (this as any).drawGroupLabel()
            }else{
                
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
                      option.outerAxis?outerAxisXY.xAxisY:axisXY.xAxisY
                    ],
                    element,option.labelFont[0],[0,20])

                })
              })
            }
          }
        }

        if(option.showAxisLabel[1]){
          
          
          let zeroPosition = pointOf00[1]- ((range[1]-range[0]===0)?0:(Math.abs(range[0]/(range[1]-range[0]))*innerHeight))
          drawText(context2d,[option.outerAxis?outerAxisXY.yAxisX:axisXY.yAxisX,zeroPosition],"0",
          option.labelFont[1]
          ,[-20,0])

          let tempIndex=1 , tempHeight=zeroPosition
          while(tempHeight>padding.top+positionGap){
            tempHeight-=positionGap
            drawText(context2d,[option.outerAxis?outerAxisXY.yAxisX:axisXY.yAxisX,tempHeight],Math.round(valueDiff*tempIndex*100)/100+"",
            option.labelFont[1]
            ,[-20,0])
            tempIndex++

          }
          
          tempIndex=1,tempHeight=zeroPosition
          while(tempHeight+positionGap<pointOf00[1]){
            tempHeight+=positionGap
            drawText(context2d,[option.outerAxis?outerAxisXY.yAxisX:axisXY.yAxisX,tempHeight],-Math.round(valueDiff*tempIndex*100)/100+"",
            option.labelFont[1]
            ,[-20,0])
            tempIndex++

          }
        }
      }else if(option.classAxis===Axis.y){
        
        if(option.showAxisLabel[1]){
          
          
          if(!option.group){
            (<string[]>dataY).forEach((v:string,i:number)=>{
              let barWidth=2*positionDiff.y;
              drawText(context2d,[option.outerAxis?outerAxisXY.yAxisX:axisXY.yAxisX,pointOf00[1]-positionDiff.y*(i+1)-(i+0.5)*barWidth],v,option.labelFont[0],[-20,0])
            })
          }else{
            if((this as any).drawGroupLabel instanceof Function){
              (this as any).drawGroupLabel()
            }else{
              let classNumber = (dataY[0] as string[]).length
              let groupWidth = positionDiff.y*2
              let groupPositionDiff = groupWidth/(classNumber*3+1)
              let barWidth = groupPositionDiff*2;
              (<string[][]>dataY).forEach((v:string[],i:number)=>{
                          
                v.forEach((element,index)=>{
                  drawText(context2d,[
                      option.outerAxis?outerAxisXY.yAxisX:axisXY.yAxisX,
                      pointOf00[1]
                      -positionDiff.y*(i+1)
                      -groupWidth*i
                      -groupPositionDiff*(index+1)
                      -barWidth*(index)
                      ],element,option.labelFont[0],[-20,-5])
                })
              })
            }
          }
        }
        
        if(option.showAxisLabel[0]){
          let zeroPosition = pointOf00[0]+(range[1]-range[0])===0?0:(Math.abs(range[0]/(range[1]-range[0]))*innerWidth)
          drawText(context2d,[zeroPosition,option.outerAxis?outerAxisXY.xAxisY:axisXY.xAxisY],"0",option.labelFont[1],[0,20])

          let tempIndex=1,tempWidth=zeroPosition
          while(tempWidth<padding.left+innerWidth-positionGap){
            
            tempWidth+=positionGap
            drawText(context2d,[tempWidth,option.outerAxis?outerAxisXY.xAxisY:axisXY.xAxisY],Math.round(valueDiff*tempIndex*100)/100+"",option.labelFont[1],[0,20])
            tempIndex++

          }
          tempIndex=1,tempWidth=zeroPosition
          while(tempWidth>=padding.left+positionGap){
            tempWidth-=positionGap
            drawText(context2d,[tempWidth,option.outerAxis?outerAxisXY.xAxisY:axisXY.xAxisY],-Math.round(valueDiff*tempIndex*100)/100+"",option.labelFont[1],[0,20])
            tempIndex++

          }
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
    },
    
  },

})
</script>
