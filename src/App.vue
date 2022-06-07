<template>
  <x-statistic-graph>
    <x-bar-chart :dataX="[1,324,54]" :dataY="['a','b','c']"  ></x-bar-chart>
  </x-statistic-graph>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import XBarChart from '../packages/statisticGraph/XBarChart.vue'
import XStatisticGraph from '../packages/statisticGraph/XStatisticGraph.vue'

export default defineComponent({
  components: { XStatisticGraph, XBarChart },
  setup() {
    
  },
})
</script>
