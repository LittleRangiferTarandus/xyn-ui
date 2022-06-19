<template>
  <div class="xyn-chart-legend"
    :style="{
      right:0,
      top:0,
      transform: `scale(${scale}%,${scale}%)`
    }"
    ref="legend"
  >
    <div v-for="(item,index) in Object.keys(labelSet)" :key="item+index" class="xyn-chart-legend-group" :class="{column:column}">
      <div class="xyn-chart-legend-item" 
        v-for="(entity,indexInner) in labelSet[item]" :key="entity+index+indexInner"
        :class="{column:column}"
      >
        <div 
          :style="{backgroundColor:entity.color}"
          class="xyn-chart-legend-item-color"
        ></div>
        <span>{{entity.label}}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { watch,defineComponent, getCurrentInstance, reactive, ref, onMounted } from 'vue'

export default defineComponent({
  name:"BetaXynChartLegend",
  props:{
    scale:{
      default:100,
      type:Number
    },
    column:{
      type:Boolean,
      default:false
    },
    symbol:{
      type:String,
      default:""
    }
  },
  setup(props) {
    const legend = ref({})
    let thisInstance :any= getCurrentInstance()
    const labelOffsetTopLeft:[number,number] = reactive([0,0])
    const labelSet = ref({})
    
    
    watch(thisInstance.parent.data.label,()=>{
      labelSet.value=thisInstance.parent.data.label
      
    })

    onMounted(()=>{
      labelSet.value=thisInstance.parent.data.label
    })

    return{
      labelOffsetTopLeft,legend,labelSet
    }
  },
})
</script>

<style lang="less" scoped>

.xyn-chart-legend{
  transform-origin: 100% 0;
  border: 1px black solid;
  display: grid;
  position: absolute;
  &-group{
    display: flex;
    justify-content: flex-end;
    &.column{
      flex-direction: column;
    }
  }
  
  &-item{
    display: inline-flex;
    align-items: center;
    
    padding: 5px;
    &-color{
      width: 40px;
      height: 20px;
      margin-right: 10px;
    }
  }
}

</style>