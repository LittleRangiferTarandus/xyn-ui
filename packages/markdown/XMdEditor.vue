<template>
  <div class="xyn-md-editor">
    <div class="xyn-md-editor-tool">
      <div @click="handleItalic"><i class="ri-italic"></i></div>
      <div @click="handleBold"><i class="ri-bold"></i> </div>
      <div @click="handleStrikethrough"><i class="ri-strikethrough-2"></i> </div>
      <div @click="handleTable"><i class="ri-table-2"></i> </div>
    </div> 
    <textarea  type="text" class="xyn-md-editor-text" @scroll="handleScroll" ref="text" 
    @mouseover="handleMouseover" @input="handleInput" v-model="mdValue">
    
    </textarea>
  </div>
</template>
<script lang='ts'>
import { computed, defineComponent, inject, ref,watch } from 'vue';
import { MdGroup } from '../types/component';
  export default defineComponent({
    name:"XynMdEditor",
    props:{
      modelValue:{
        type:String,
        default:""
      }
    },
    setup(props,context) {
      const mdGroup:MdGroup |undefined= inject("MdGroup")
      const isGroup = computed(()=>{
        return mdGroup!==undefined
      })
      let mdValue = ref<string>( isGroup.value?mdGroup?.getMdValue():props.modelValue);
      
      watch(mdValue,()=>{
        context.emit("update:modelValue",mdValue.value)
        mdGroup?.setMdValue(mdValue.value)
      })

      const handleInput = (e:any)=>{
        mdValue.value = e.target.innerText
      }
      //滚动事件↓
      const handleScroll = () => {
        if(isGroup.value){
          if((<any>mdGroup).scrollItem.value!=="editor"){
            return
          }
          let scrollHeight = text.value.scrollHeight
          let scrollTop = text.value.scrollTop;

          (<any>mdGroup).scrollRate.value  =scrollTop/scrollHeight
        }
      }
      if(isGroup.value){
        watch((<any>mdGroup).scrollRate,()=>{
          if((<any>mdGroup).scrollItem.value!=="editor"){
            text.value.scrollTop = (<any>mdGroup).scrollRate.value * text.value.scrollHeight
          }
        })
      }
      const text = ref()
      const handleMouseover = () =>{
        if((<any>mdGroup).scrollItem.value!=="editor"){
          (<any>mdGroup).scrollItem.value="editor"
        }
      }
      //工具栏
      const getSelectText = ()=>{
        return [text.value.selectionStart,text.value.selectionEnd]
        
      }
      const handleItalic = () => {
        const range=getSelectText()
        const tempText = mdValue.value
        mdValue.value=tempText.slice(0,range[0])+"*"+tempText.slice(range[0],range[1])+"*"+tempText.slice(range[1])
      }
      const handleBold = () => {
        const range=getSelectText()
        const tempText = mdValue.value
        mdValue.value=tempText.slice(0,range[0])+"**"+tempText.slice(range[0],range[1])+"**"+tempText.slice(range[1])
      }
      const handleStrikethrough = ()=>{
        const range=getSelectText()
        const tempText = mdValue.value
        mdValue.value=tempText.slice(0,range[0])+"~~"+tempText.slice(range[0],range[1])+"~~"+tempText.slice(range[1])
      }
      const handleTable = ()=>{
        const range=getSelectText()
        const tempText = mdValue.value
        mdValue.value=tempText.slice(0,range[1])+"\n|title|title|\n|-|-|\n|content|content|\n"+tempText.slice(range[1])
      }
      return {
        mdValue,handleInput,handleScroll,text,handleMouseover,
        handleItalic, 
        handleBold ,
        handleStrikethrough,
        handleTable
      }
    }
  })
</script>
<style lang="less" scoped>
@primaryColor:var(--xyn-primary-color);
@primaryBorder:var(--xyn-primary-light-color);
@primaryBackGround:var(--xyn-primary-more-light-color);
.xyn-md-editor{
  width: 100%;
}
.xyn-md-editor-text{
  display: inline-block;
  resize: none;
  overflow: auto;
  height: 400px;
  width: 100%;
  padding: 0;
  box-sizing: border-box;
  border: 1px solid rgba(179, 177, 177, 0.288);
  &:hover{
    outline: none;
    border-color: @primaryColor;
  }
}
.xyn-md-editor-tool{
  background-color: rgb(250, 248, 248); 
  height: 40px;
  width: 100%;
}

.xyn-md-editor-tool{
  display: flex;
  align-items: center;
  div{
    width: 30px;
    height: 30px;
    margin: 5px 0 ;
    :hover{
      border: 1px rgba(0, 0, 255, 0.151) solid;
    }
  }
}
</style>