

<script lang="tsx">

import { defineComponent, } from 'vue'
import {   GraphData} from '../../types/statisticGraph'
import drawGraph from './drawGraph'
const statisticGraph = defineComponent({
  name:"BetaXynStatisticGraph",
  data:()=>{
    const graph:GraphData={context2d:undefined,
      contextSize:undefined,
      innerSize:undefined,
      pointOf00:undefined,
      padding:{left:100,right:50,top:50,bottom:100}}
    return{
      graph,
      label:{}
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
         
        }else{
          
          v.props = {symbol:Date.now()+"-"+i}
        }
      })
      
    }
    
    return(
      <div class="xyn-statistic-graph" ref="graph">
          <canvas ref="canvas" class="xyn-statistic-graph-canvas" height="500" width="800"></canvas>
          {
            slotList?slotList:[]
          }
      </div>
    )
  },
  
  mounted(){
    (this.$refs.canvas  as any).height=(this.$refs.graph  as any).offsetHeight;
    (this.$refs.canvas  as any).width=(this.$refs.graph  as any).offsetWidth;
    this.graph.context2d = (this.$refs.canvas  as any).getContext('2d')
    this.graph.contextSize={height:(this.$refs.canvas  as any).height,width:(this.$refs.canvas  as any).width}

    this.graph.innerSize = {height:this.graph.contextSize.height-this.graph.padding.left-this.graph.padding.right,
      width : this.graph.contextSize.width-this.graph.padding.top-this.graph.padding.bottom}
    this.graph.pointOf00 = [this.graph.padding.left,this.graph.innerSize.height+this.graph.padding.top]
    
    
  },
  methods:{
    clear(){
      (this.$refs.canvas  as any).width=(this.$refs.canvas  as any).width
    }
  }
})
statisticGraph.drawTool = drawGraph
export default statisticGraph
</script>

<style lang="less" scoped>
.xyn-statistic-graph{
  min-width: 500px;
  min-height: 400px;
  position: relative;
}
</style>
