<template>
  <div class="xyn-chart-title xyn-chart-title-x" v-html="titleX"
    :style="{fontFamily:font[0].family,fontSize:font[0].size}"
  ></div>
  <div class="xyn-chart-title xyn-chart-title-y" v-html="titleY"
    :style="{fontFamily:font[1].family,fontSize:font[1].size}"></div>
</template>

<script lang="ts">
import { watch,defineComponent, getCurrentInstance, reactive, PropType } from 'vue'
import { font } from './statisticGraph'

export default defineComponent({
  props:{
    titleX:{
      default:"",
      type:String
    },
    titleY:{
      default:"",
      type:String
    },
    font:{
      default:()=>[{},{}],
      type:Object as PropType<[font,font]>
    }
  },
  name:"BetaXynChartTitle",
  setup() {
    const thisInstance:any = getCurrentInstance()
    const position = reactive({
      contextSize:{width:0,height:0},
      pointOf00:[0,0],
      padding:{left:0,top:0,right:0,bottom:0},
      innerSize:{width:0,height:0},
    })
    watch(thisInstance.parent.data.graph,()=>{
      let tempGraph=thisInstance.parent.data.graph
      position.contextSize=tempGraph.contextSize
      position.pointOf00=tempGraph.pointOf00
      position.padding=tempGraph.padding
      position.innerSize=tempGraph.innerSize
    })
  },
})
</script>

<style lang="less" scoped>
.xyn-chart-title{
  font-weight: bold;
  white-space: pre-line;
  text-align: center;
  word-spacing: 0.1em;
  &-x{
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  &-y{
    position: absolute;
    top: 50%;
    left: 0;
    transform-origin: 0 0;
    transform: translate(0,-50%) rotate(-90deg) translate(-50%,0);
  }
}
</style>