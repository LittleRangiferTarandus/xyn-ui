<template>
<label class="xyn-radio" :class="{'is-checked':groupValue!==undefined?groupValue:currentValue==='on'}" 
  @click="radioClickHandle"

>
    <span class="xyn-radio_input">
    <span class="xyn-radio_inner"></span>
        <input
        type="radio"
        class="xyn-radio_original"
        v-model="currentValue"
        >
    </span>
    <span class="xyn-radio_label">
        <slot></slot>
        <!-- 如果没有传值，就把label作为文本显示 -->
        <template v-if="!$slots.default">{{label}}</template>
    </span>
</label>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref, watch } from 'vue'
import {RadioGroup} from '../types/component'
export default defineComponent({
    name:"XynRadio",
    props: {
      label: {
        type: String,
        defualt: ''
      },
      modelValue: {
        type:String,
        default: "off"
      },
      name: {
        type: String,
        defualt: ''
      }
    },
    setup(props,context) {
      const currentValue = ref (props.modelValue)
      const radioGroup:RadioGroup|undefined = inject("RadioGroup")

      let groupValue 

      if(radioGroup){
        groupValue=computed(()=>{
          return radioGroup.getSelect()===props.label
        })
      }


      const radioClickHandle=()=>{
        console.log(currentValue.value);
        
        if(radioGroup){
          radioGroup.setSelect(props.label)
        }
        context.emit("update:modelValue",currentValue)
        context.emit("change",!currentValue,currentValue)
      }
      return{
        radioGroup,currentValue,groupValue,radioClickHandle
      }
    }
})
</script>

<style lang="less" scoped>
@primaryColor:var(--xyn-primary-color);
@primaryBorder:var(--xyn-primary-light-color);
@primaryBackGround:var(--xyn-primary-more-light-color);
  .xyn-radio{
    color: #606266;
    font-weight: 500;
    line-height: 1;
    position: relative;
    cursor: pointer;
    display: inline-block;
    white-space: nowrap;
    outline: none;
    font-size: 14px;
    margin-right: 30px;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    .xyn-radio_input{
      white-space: nowrap;
      cursor: pointer;
      outline: none;
      display: inline-block;
      line-height: 1;
      position: relative;
      vertical-align: middle;
      .xyn-radio_inner{
        border: 1px solid @primaryBorder;
        border-radius: 100%;
        width: 14px;
        height: 14px;
        background-color: #fff;
        position: relative;
        cursor: pointer;
        display: inline-block;
        box-sizing: border-box;
        &:after{
          width: 4px;
          height: 4px;
          border-radius: 100%;
          background-color: #fff;
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%) scale(0);
          transition: transform .15s ease-in;
        }
      }
      .xyn-radio_original{
        opacity: 0;
        outline: none;
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0px;
        right: 0;
        bottom: 0;
        margin: 0;
      }
    }
    .xyn-radio_label{
      font-size: 14px;
      padding-left: 10px;;
    }
  }
  // 选中的样式
  .xyn-radio.is-checked{
    .xyn-radio_input{
      .xyn-radio_inner{
        border-color: @primaryColor;
        background-color: @primaryColor;
        &:after{
          transform: translate(-50%,-50%) scale(1);
        }
      }
    }
    .xyn-radio_label{
      color:@primaryColor;
    }
  }
</style>