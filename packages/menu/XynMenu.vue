


<template>
  <div  
    :class="[
      'xyn-menu',
      {row:rowDirection},
      {column:!rowDirection},
      {center:center}
    ]"
  >
    <slot></slot>
  </div>
</template>
<script lang="tsx">
import { defineComponent, provide, ref} from 'vue'

export default defineComponent({
  name:"XynMenu",
  props:{
    modelValue:{
      type:String,
      default:""
    },
    defaultActivated:{
      type:String,
      default:""
    },
    rowDirection:{
      type:Boolean,
      default:true
    },
    stretch:{
      type:Boolean,
      default:false
    },
    center:{
      type:Boolean,
      default:false
    }
  },
  setup(props,context) {

    const activated=ref(props.defaultActivated)
    const setActivated = (prop:string)=>{
      let pre = activated.value
      activated.value = prop
      context.emit("change",pre,prop)
      
      context.emit("update:modelValue",prop)
    } 
    const getActivated = ()=>{
      return activated.value 
    }
    const getStyle = ()=>{
      return {rowDirection:props.rowDirection,stretch:props.stretch}
    }
    provide("MenuRoot",{getActivated,setActivated,getStyle})

    provide("MenuItemGroup",undefined)


    
  },
})
</script>
<style lang="less" scoped>
.xyn-menu{
  display: flex;
  
  &.row{
    flex-direction: row;
    border-bottom: 1px solid rgba(128, 128, 128, 0.3);
  }
  &.column{
    flex-direction: column;
    border-right: 1px solid rgba(128, 128, 128, 0.3);
  }
  &.center{
    justify-content: space-around ;
  }
}
</style>