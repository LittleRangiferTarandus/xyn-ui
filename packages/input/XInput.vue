<template>
 <div class="xyn-input" :class="{'xyn-input_suffix':showSuffix}">
   <input
   class="xyn-input_inner"
   :class="{'is-disabled': disabled}"
   :placeholder="placeholder"
   :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
   :name="name"
   :value="modelValue"
   @input="handleInput"
   @blur="handleBlur"
   @focus="handleFocus"
   :disabled="disabled">
  <span class="xyn-input_suffix">
   <i class="ri-close-circle-line" v-show="clearable && modelValue" @click="clear"></i>
   <i class="ri-eye-line" v-show="passwordVisible&&showPassword && type==='password'" @click="handlePassword"></i>
   <i class="ri-eye-off-line" v-show="!passwordVisible&&showPassword && type==='password'" @click="handlePassword"></i>
 </span>
 </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'XynInput',
    props: {
        placeholder: {
        type: String,
        default: ''
        },
        type: {
        type: String,
        default: 'text'
        },
        name: {
        type: String,
        default: ''
        },
        disabled: {
        type: Boolean,
        default: false
        },
        modelValue: {
        type: String,
        default: ''
        },
        clearable: {
        type: Boolean,
        default: false
        },
        showPassword: {
        type: Boolean,
        default: false
        }
    },
    computed: {
        showSuffix () {
            return this.clearable || this.showPassword
        }
    },
    emits:["update:modelValue",'focus','blur','change'],
    setup(props,context) {
        const passwordVisible = ref(false)
        const handleInput = (e:Event) =>{
            context.emit('update:modelValue', (<HTMLInputElement>e.target).value)
            context.emit('change', (<HTMLInputElement>e.target).value)
        }
        const clear= () =>{
            context.emit('update:modelValue', '')
            context.emit('change', "")
        }
        const handlePassword= ()=> {
            
            passwordVisible.value = !passwordVisible.value
        }
        const handleBlur=()=>{
            context.emit('blur')
        }
        const handleFocus=()=>{
            context.emit('focus')
        }
        return{
            passwordVisible,handleInput,clear,handlePassword,handleBlur,handleFocus
        }
    },
})
</script>

<style lang="less" scoped>
  .xyn-input{
    width: 100%;
    position: relative;
    font-size: 14px;
    display: inline-block;
    .xyn-input_inner{
      -webkit-appearance: none;
      background-color: #fff;
      background-image: none;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 40px;
      line-height: 40px;
      outline: none;
      padding: 0 15px;
      transition: border-color .2s cubic-bezier(.645,045,.355,1);
      width: 90%;

      &:focus{
        outline: none;
        border-color: #409eff;
      }
      // input禁用样式
      &.is-disabled{
        background-color: #f5f7fa;
        border-color: #e4e7ed;
        color: #c0c4cc;
        cursor:not-allowed;
      }
    }
  } 
  .xyn-input_suffix{
    .xyn-input_inner{
      padding-right: 30px;
    }
    .xyn-input_suffix{
      position: absolute;
      right: 10px;
      height: 100%;
      top: 0;
      line-height: 40px;
      text-align: center;
      color: #c0c4cc;
      transition: all .3s;
      z-index: 900;
      i{
        color: #c0c4cc;
        font-size: 14px;
        cursor: pointer;
        transition: color .2s cubic-bezier(.645,.045,.355,1);
      }
    }
  }
</style>
