<template>
  <div class="xyn-md-previewer  markdown-body" ref="previewer" v-html="htmlValue" 
  @scroll="handleScroll"  @mouseover="handleMouseover">
  </div>
  
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, inject, onMounted, Ref, ref, toRef,watch ,nextTick} from 'vue'
import { MdGroup } from '../types/component'
import { md2html } from './md2html'
import hljs from 'highlight.js'
export default defineComponent({
  props:{
    mdValue:{
      type:String,
      defualt:""
    }
  },
  setup(props,context) {
    const previewer= ref()
    const mdGroup:MdGroup |undefined= inject("MdGroup")
    const isGroup = computed(()=>{
      return mdGroup!==undefined
    })
    let mdValue:Ref|ComputedRef
    if(isGroup){
      mdValue = computed(()=>{
        return mdGroup?.getMdValue()
      })
    }else{
      mdValue = toRef(props,'mdValue')
    }
    
    const htmlValue = ref("")
    const getHtmlValue = ()=>{
      
      if(!mdValue.value){
        htmlValue.value=""
      }else{
        md2html(mdValue.value).then(res=>{
          htmlValue.value=res
          nextTick(()=>{
            let blocks = previewer.value.querySelectorAll('pre code')
            blocks.forEach((block:any) => {
              hljs.highlightElement (block)
            })
            
          })
        })

      }
    }
    //markdown同步滚动
    const handleScroll = () => {
      if(isGroup.value){
        if((<any>mdGroup).scrollItem.value!=="previewer"){
          return
        }
        let scrollHeight = previewer.value.scrollHeight
        let scrollTop = previewer.value.scrollTop;

        (<any>mdGroup).scrollRate.value  =scrollTop/scrollHeight
      }
    }
    const handleMouseover = () =>{
      if((<any>mdGroup).scrollItem.value!=="previewer"){
        (<any>mdGroup).scrollItem.value="previewer"
      }
    }
    if(isGroup.value){
      watch((<any>mdGroup).scrollRate,()=>{
        if((<any>mdGroup).scrollItem.value!=="previewer"){
          previewer.value.scrollTop = (<any>mdGroup).scrollRate.value * previewer.value.scrollHeight
        }
      })
    }

    onMounted(()=>{
      getHtmlValue()
    })
    watch(<any>mdValue,()=>{
      getHtmlValue()
    })
    return{
      htmlValue,previewer ,handleScroll,handleMouseover
    }
  },
})
</script>


<style lang="less" scoped>

.xyn-md-previewer{
  width: 100%;
  height: 440px;
  padding: 10px;
  box-shadow: 0 0 55px rgba(128, 128, 128, 0.233);
  box-sizing: border-box;
  overflow: auto;
  pre{
    
  }
}
</style>