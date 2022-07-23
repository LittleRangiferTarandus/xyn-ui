<template>
  <div class="temp"></div>
  <xyn-range :max="100" :min="5" :step="0.5"></xyn-range>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import XynRange from '../packages/range/XynRange.vue'

export default defineComponent({
  components: { XynRange },
  setup(){
    
  }
})
</script>
<style lang="less" scoped>
.temp{
  padding: 100px;
}
</style>