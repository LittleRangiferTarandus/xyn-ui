<template>
  <div class="xyn-md-group">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {  defineComponent, provide, ref } from 'vue'

export default defineComponent({
  name:"XynMdGroup",
  props:{
    modelValue:{
      type:String,
      default:''
    }
  },
  setup(props,context) {
    const mdValue = ref(props.modelValue)
    const setMdValue = (value:string) =>{
      
      mdValue.value=value
      context.emit("update:modelValue",value)
    }
    const getMdValue = ()=>{
      return mdValue.value
    } 
    const scrollItem = ref("")
    const scrollRate = ref(0)
    provide("MdGroup",{
      setMdValue,getMdValue,scrollItem,scrollRate
    })
  },
})
</script>
<style lang="less" scoped>
.xyn-md-group{
  display: flex;
  justify-content: stretch;
}
</style>
