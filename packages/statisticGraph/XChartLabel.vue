<template>
  <div class="xyn-chart-label"
    :style="{
      right:0,
      top:0,
      gridTemplateRows:'repeat('+Object.keys(labelSet).length+',30px)'
    }"
    ref="label"
  >
    <div v-for="(item,index) in Object.keys(labelSet)" :key="item+index">
      <div class="xyn-chart-label-item" v-for="(entity,indexInner) in labelSet[item]" :key="entity+index+indexInner">
        <div 
          :style="{backgroundColor:entity.color}"
          class="xyn-chart-label-item-color"
        ></div>
        <span>{{entity.label}}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { watch,defineComponent, getCurrentInstance, reactive, ref, onMounted } from 'vue'

export default defineComponent({
  name:"BetaXynChartLabel",
  setup(props) {
    const label = ref({})
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
      labelOffsetTopLeft,label,labelSet
    }
  },
})
</script>

<style lang="less" scoped>

.xyn-chart-label{
  border: 1px black solid;
  display: grid;
  position: absolute;
  
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