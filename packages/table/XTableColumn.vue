<template>
<slot ></slot>
</template>

<script lang="ts">
import { ComponentInternalInstance, computed, defineComponent,  getCurrentInstance,  onMounted, watch} from 'vue'

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
    sortable:{
      type:Boolean,
      default:false
    },
    type:{
      type:String,
      default:""
    }
  },
  setup(props,context) {
    
    const parent: ComponentInternalInstance|null|undefined = getCurrentInstance()?.parent

    
    if(props.type==="expand"){
      
      onMounted(()=>{
        if(parent?.data) {
          
          (<any>parent.data.expand)=context.slots.default
          
        }
      })
    }else{
      const columnOption = computed(()=>{
        return {
          prop:props.prop,
          label:props.label,
          sortable:props.sortable,
          render:context.slots.default
        };
      })
      //把column的数据添加到table的option里面，此段代码是为了热重载过程中出现
      //column已经push了但是又重新push的诡异bug
      const rank = computed(()=>{
        if(parent?.slots.default){
          let slot = parent?.slots.default();
          
          let rank = -1;
          (<any>slot).every((e:any,i:number)=>{
            let props = e.props,columnValue = columnOption.value
            if((!props.label||props.label===columnValue.label)&&
            (!props.prop||props.prop===columnValue.prop)&&
            (!props.sortable||props.sortable===columnValue.sortable)){
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

      watch(()=>[props.prop,props.label,props.sortable],()=>{
        if(parent?.data?.option) {
          (<any>parent.data.option).splice(rank.value,1,columnOption.value)
        }
      })
    }


    

    return {
    }
  }

    
})
</script>
 
<style lang="less" scoped>

</style>