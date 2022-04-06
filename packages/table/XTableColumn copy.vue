<template>
<slot></slot>
</template>

<script lang="ts">
import { defineComponent, h} from 'vue'

export default defineComponent({
  name:"XynTableColumn",
  props:{
    prop:{
      type:String,
      default:""
    },
    label:{
      type:String,
      default:""
    },
  },
  setup(props,context) {
      
    
  },
})
</script>
 
<style lang="less" scoped>

</style>