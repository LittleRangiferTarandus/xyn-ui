<script lang="ts">
import { defineComponent, reactive  } from 'vue'
import XVirtualList from '../packages/virtualList/XVirtualList.vue'

export default defineComponent({
  components: {XVirtualList },
  setup() {
    const dataSource = reactive([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26])

    return{
      dataSource
    }
  },
})
</script>

<template>
  <x-virtual-list :estimateItemHeight="50" :resource="dataSource" :showHeight="500">
    <template v-slot="data" >
      <div :style='{height:data*10+"px"}'>
      {{data}}
      </div>
    </template>
  </x-virtual-list>
</template>

<style> 
</style>
