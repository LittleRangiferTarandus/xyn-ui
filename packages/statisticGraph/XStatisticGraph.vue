<template>
  <div class="xyn-statistic-graph" ref="graph">
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
    (this.$refs.canvas  as any).height=(this.$refs.graph  as any).offsetHeight;
    (this.$refs.canvas  as any).width=(this.$refs.graph  as any).offsetWidth;
    this.graph.context2d = (this.$refs.canvas  as any).getContext('2d')
    this.graph.contextSize={height:(this.$refs.canvas  as any).height,width:(this.$refs.canvas  as any).width}

    this.graph.innerSize = {height:this.graph.contextSize.height-this.graph.padding.left-this.graph.padding.right,
      width : this.graph.contextSize.width-this.graph.padding.top-this.graph.padding.bottom}
    this.graph.pointOf00 = [this.graph.padding.left,this.graph.innerSize.height+this.graph.padding.top]
    
  }
})
</script>

<style lang="less" scoped>
.xyn-statistic-graph{
  min-width: 500px;
  min-height: 400px;
}
</style>
