<template>
  <div class="xyn-statistic-graph">
    <canvas ref="canvas" class="xyn-statistic-graph-canvas" height="500" width="800"></canvas>
    <slot></slot>
  </div>
</template>

<script lang="ts">

import { defineComponent, } from 'vue'
import {   GraphData} from '../../types/statisticGraph'

export default defineComponent({
  name:"BetaXynStatisticGraph",
  data:()=>{
    const graph:GraphData={context2d:undefined,
      contextSize:undefined,
      graphSize:undefined,
      innerSize:undefined,
      pointOf00:undefined,
      padding:{left:100,right:50,top:50,bottom:100}}
    return{
      graph
    }
  },
    
  
  mounted(){
    this.graph.context2d = this.$refs.canvas.getContext('2d')
    this.graph.contextSize={height:this.$refs.canvas.offsetHeight,width:this.$refs.canvas.offsetWidth}
    this.graph.graphSize={
      height:this.graph.contextSize.height-this.graph.padding.top-this.graph.padding.bottom,
      width:this.graph.contextSize.width-this.graph.padding.left-this.graph.padding.right
    }
    this.graph.innerSize = {height:this.graph.graphSize.height*0.9,width : this.graph.graphSize.width*0.9}
    this.graph.pointOf00 = [this.graph.padding.left,this.graph.graphSize.height+this.graph.padding.top]
    console.log("??");
    
    
  }
})
</script>

<style lang="less" scoped>
.xyn-statistic-graph{
  min-width: 500px;
  min-height: 400px;
}
</style>
