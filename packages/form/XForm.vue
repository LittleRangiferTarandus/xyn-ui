<template>
  <div class="one-form">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, reactive, toRef } from 'vue'

export default defineComponent({
  name:"XynForm",
  props:{
    formData:{
      required: true,
      type:Object,
    },
    labelStyle:{
      default:{},
      type:Object
    },
    rules:{
      default:{},
      type:Object
    }
  },
  setup(props,context) {
    provide("Form",{
      formData:props.formData,
      labelStyle:props.labelStyle,
      rules:props.rules
    })
  },
})
</script>

<style lang="less" scoped>

</style>