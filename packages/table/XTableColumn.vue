<template>
<slot ></slot>
</template>

<script lang="ts">
import { ComponentInternalInstance, computed, defineComponent,  getCurrentInstance,  onMounted, ref, watch} from 'vue'

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
    
    const parent: ComponentInternalInstance|null|undefined = getCurrentInstance()?.parent
    
    const columnOption = computed(()=>{
      return {
        prop:props.prop,
        label:props.label,
        render:context.slots.default
      };
    })
    //begin 把column的数据添加到table的option里面，此段代码是为了热重载过程中出现
    //column已经push了但是又重新push的诡异bug
    const rank = computed(()=>{
      if(parent?.slots.default){
        let slot = parent?.slots.default();
        let rank = -1;
        (<any>slot).every((e:any,i:number)=>{
          
          if(JSON.stringify(e.props)===JSON.stringify(columnOption.value)){
            rank = i
            return false  
          }
          return true
        })  
        
        return rank
      }
      throw("column只能位于table组件插槽中，没有在parent组件中找到column对象")
    })
    

    onMounted(()=>{
      if(parent?.data?.option) {
        (<any>parent.data.option).splice(rank.value,1,columnOption.value)
      }
    })

    watch(()=>[props.prop,props.label],()=>{
      if(parent?.data?.option) {
        (<any>parent.data.option).splice(rank.value,1,columnOption.value)
      }
    })
    return {
    }
  }
})
</script>
 
<style lang="less" scoped>

</style>