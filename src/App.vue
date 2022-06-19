<template>
    <beta-xyn-statistic-graph class="graph" ref="graph" 
      :canvasHeight="300" :canvasWidth="600"
      :font="{
        family:'helvetica',
        size:15
      }"
      :padding="{
        left:60,top:60,right:20,bottom:50
      }"
    >
    <beta-xyn-chart-title 
      titleX="Trails"
      titleY="u,s(μ2)"
      :font="[
        {
          family:'helvetica',
          size:15
        },
        {
          family:'helvetica',
          size:15
        }
      ]"
    ></beta-xyn-chart-title>
    <beta-xyn-scatter-bin-chart 
    :dataX="[
      [[35,22,-47,55],
      [-51,-53.4011397,-5,20],
      [38,55,37,10],
    ],
    
    [
      [-10.50243747,17,60.30036601,59],
      [41.51499867,7,30.75770385,34.01836427],
      [-41.26532478,-6,-38,98.56478512],
    ],
    
    [
      [127,-1,54.89233982,48.1717766],
      [-10.46341803,-43,8,50.03504831],
      [34.94366247,-24.5078009,16.83234926,117.2118747]
    ]]"

    :dataY="['A','B','C']"  

    :dataError="[
      [[7,8,10],[10,20,10]],
      [[7,8,10],[10,20,10]],
      [[7,8,10],[10,20,10]]
    ]"

    :optionSet="{
      outerAxis:true,
      drawAxis:true,
      showAxisLabel:[true,true],
      showLabel:true,
      offsetRate:0.3,
      errorBarWidth:15,
      unit:'单位',
      drawTrendLine:true,
      groupColor:[[224, 165, 130],[155, 201, 186],[129,37, 205]],
      groupLabel:['A','B','C'],
      groupBound:true,
      drawErrorBar:true,
      classAxis:'y'
    }"
    ></beta-xyn-scatter-bin-chart>
    <beta-xyn-chart-legend
      :column="true"
      :scale="70"
    ></beta-xyn-chart-legend>
  </beta-xyn-statistic-graph>
  <xyn-button @click.stop="download">下载</xyn-button>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup(){
    const graph = ref()
    const graphlow = ref()
    const download = ()=>{
      graph.value.downloadGraph()
      
    }
    const download2 = ()=>{
      graphlow.value.downloadGraph()
      
    }
    return{
      graph,graphlow,download,download2
    }
  }
})
</script>
