

<script lang="tsx">

import { defineComponent, PropType, } from 'vue'
import {   font, GraphData, Padding} from './statisticGraph'
import drawGraph from './drawGraph'
import html2canvas from 'html2canvas'
const statisticGraph = defineComponent({
  props:{
    title:{
      type:String,
      default:""
    },
    canvasHeight:{
      type:Number,
      default:550
    },
    canvasWidth:{
      type:Number,
      default:700
    },
    font:{
      default:()=>{},
      type:Object as PropType<font>
    },
    padding:{
      default:{left:70,right:0,top:50,bottom:40},

      type:Object as PropType<Padding>
    }
  },
  name:"BetaXynStatisticGraph",
  data:()=>{
    const graph:GraphData={context2d:undefined,
      contextSize:undefined,
      innerSize:undefined,
      pointOf00:undefined,}
    return{
      graph,
      label:new Object()
    }
  },
    
  render(h:any){
    let slotList = this.$slots.default?this.$slots.default():[]
    if(slotList){
      slotList.forEach((v:any,i)=>{
        if(v.props){
          if(!v.props.symbol){
            v.props.symbol = Date.now()+"-"+i
          }
         
        }
      })
      
    }
    
    return(
      <div class="xyn-statistic-graph"
        style={{width:this.canvasWidth+"px"}}
        ref="graphOuter"    
      > 
        <div class="xyn-statistic-graph-title"
          style={{fontFamily:this.font.family, fontSize:this.font.size}}
          v-html={this.title}
        ></div>
        <div class="xyn-statistic-graph-inner" ref="graph"
          style={{width:this.canvasWidth+"px",height:this.canvasHeight+"px"}}
        >
          <canvas ref="canvas" class="xyn-statistic-graph-canvas" height="500" width="800"></canvas>
          {
            slotList?slotList:[]
          }
        </div>
      </div>
    )
  },
  
  mounted(){
    
    (this.$refs.canvas  as any).height=(this.$refs.graph  as any).offsetHeight;
    (this.$refs.canvas  as any).width=(this.$refs.graph  as any).offsetWidth;
    this.graph.context2d = (this.$refs.canvas  as any).getContext('2d')
    this.graph.contextSize={height:(this.$refs.canvas  as any).height,width:(this.$refs.canvas  as any).width}
    this.graph.padding = this.padding;
    this.graph.innerSize = {width:this.graph.contextSize.width-this.padding.left-this.padding.right,
      height : this.graph.contextSize.height-this.padding.top-this.padding.bottom}
    this.graph.pointOf00 = [this.padding.left,this.graph.innerSize.height+this.padding.top]
    
    
  },
  methods:{
    clear(){
      (this.$refs.canvas  as any).width=(this.$refs.canvas  as any).width
    },
    downloadGraph(){
      html2canvas((this.$refs.graphOuter as HTMLElement)).then((canvas:HTMLCanvasElement)=>{
        canvas.style.display="none"
        let image = (canvas as HTMLCanvasElement).toDataURL('image/png');
        let link = document.createElement("a")
        link.download="Graph"
        link.style.display="none"
        link.href = image
        document.body.appendChild(link)
        link.click()
        URL.revokeObjectURL(link.href)
        document.body.removeChild(link)
      })
      // let image = (this.$refs.canvas  as any).toDataURL('image/png');
      // let link = document.createElement("a")
      // link.download="Graph"
      // link.style.display="none"
      // link.href = image
      // document.body.appendChild(link)
      // link.click()
      // URL.revokeObjectURL(link.href)
      // document.body.removeChild(link)

    }
  }
})
statisticGraph.drawTool = drawGraph
export default statisticGraph
</script>

<style lang="less" scoped>
.xyn-statistic-graph{
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &-inner{
    position: relative;
  }
  &-title{
    font: 1.2em sans-serif;
    text-align: center;
    white-space: pre-line;
    margin: 5px;
  word-spacing: 0.2em;
  }

}
</style>
