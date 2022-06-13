<template>
  <beta-xyn-statistic-graph class="graph">
    <beta-xyn-chart-label></beta-xyn-chart-label>
    <beta-xyn-bar-chart :dataY="[-10,34,-54]" :dataX="['a','b','c']"  :dataError="[10,23,50]"></beta-xyn-bar-chart>
  </beta-xyn-statistic-graph>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
})
</script>
<style lang="less" scoped>
.graph{
  width: 700px;
  height: 700px;
}
</style>