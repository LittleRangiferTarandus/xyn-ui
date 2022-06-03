<template>
  <div class="xyn-form-item" > 
    <label :style="formProps.labelStyle" class="xyn-form-item_label">{{label}}</label>
    <div class="xyn-form-item_content"  @blur.capture="verifyFunction">
      <slot ></slot>
      <p class="xyn-form-item-error">{{error}}</p>
    </div>
    
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, ref } from 'vue'
import { Rule } from '../../types/component'

export default defineComponent({
  name:"XynFormItem",
  props: {
    label: {
      type: String,
      default: ''
    },
    ruleKey:{
      type: String,
      default: ''
    }
  },
  setup(props) {
    const error = ref("")
    const formProps:any = inject("Form")
    
    const verifyFunction = ()=>{
      
      const formData= formProps.formData[props.ruleKey]
      const rule = formProps.rules[props.ruleKey]
      
      rule?.every((value:Rule)=>{
        if(value.verify instanceof RegExp){
          if(!(<RegExp>value.verify).test(formData)){
            error.value = value.error
            return false
          }
        }else if (value.verify instanceof Function){
          console.log(value.verify(formData),formData);
          
          if(!value.verify(formData)){
            error.value = value.error
            return false
          }
        }else{
          error.value = "unkown rule !"
          return false
        }
        
        error.value = ""
        return true
      })

    }
    onMounted(()=>{
        verifyFunction()
    })
    return{
      formProps,error,verifyFunction
    }
  },
})
</script>

<style lang="less" scoped>
  .xyn-form-item{
    margin-bottom: 10px;
    .xyn-form-item_label{
      text-align: right;
      vertical-align: middle;
      float: left;
      font-size: 14px;
      color: #606266;
      padding: 0 12px 0 0;
      box-sizing: border-box;
    }
    .xyn-form-item_content{
      display: inline-block;
      position: relative;
      font-size: 14px;
      overflow: hidden;
    }
  }
  .xyn-form-item-error{
    color: red;
    line-height: 1em;
    font: 0.7em sans-serif;
    height: 2em;
    margin: 0;
    
  }
</style>