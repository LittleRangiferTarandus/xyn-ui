<template>
    <div class="xyn-radio-group">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref } from 'vue'

export default defineComponent({
    name:"XynRadioGroup",
    props:{
       modelValue:{
           type:String,
           default:""
       }
    },
    setup(props,context) {
        const currentSelect=ref(props.modelValue)
        const setSelect=(value:string)=>{
            currentSelect.value=value
            context.emit("update:modelValue",value)
            context.emit("change",currentSelect)
        }
        const getSelect=()=>{
            return currentSelect.value
        }
        provide("RadioGroup",{
            setSelect,getSelect
        })
    },
})
</script>

<style lang="less" scoped>

</style>