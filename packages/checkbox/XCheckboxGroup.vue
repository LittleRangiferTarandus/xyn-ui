<template>
    <div class="xyn-checkbox-group">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent, provide, reactive } from 'vue'

export default defineComponent({
    name:"XynCheckboxGroup",
    props:{
       modelValue:{
           type:Array,
           
           default:""
       }
    },
    setup(props,context) {
        let currentSelect=reactive(props.modelValue)
        const setSelect=(value:Array<string>)=>{
            context.emit("update:modelValue",value)
            context.emit("change",value)
        }
        const getSelect=()=>{
            return currentSelect
        }
        const addSelect=(value:string)=>{
            let index = currentSelect.indexOf(value)
            if(index===-1){
              currentSelect.push(value)
            }else{
              currentSelect.splice(index,1)
            }
            context.emit("update:modelValue",currentSelect)
            context.emit("change",currentSelect)
        }
        provide("CheckboxGroup",{
            setSelect,getSelect,addSelect
        })
    },
})
</script>

<style lang="less" scoped>

</style>