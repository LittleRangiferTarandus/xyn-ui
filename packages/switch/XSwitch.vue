<template>
  <div class="xyn-switch" :class="{'is-checked':modelValue}" @click="handleClick">
    <span class="xyn-switch_core" ref="core">
      <span class="xyn-switch_button"></span>
    </span>
    <input type="checkbox" class="xyn-switch_input" :name="name" ref="input" :value="modelValue" >
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref,   watch } from 'vue'

export default defineComponent({
    name:"XynSwitch",
    props: {
    modelValue: {
      type: Boolean,
      defualt: false
    },
    activeColor: {
      type: String,
      defualt: ''
    },
    inactiveColor: {
      type: String,
      defualt: ''
    },
    name: {
      type: String,
      defualt: ''
    }
  },
    setup(props,context) {
        let activeColor=props.activeColor
        let inactiveColor=props.inactiveColor
        const core = ref()
        
        
        const input = ref()
        onMounted(()=>{
            if (activeColor || inactiveColor) {
            var color = !props.modelValue ? activeColor : inactiveColor
                core.value.style.borderColor = color
                core.value.style.backgroundColor = color
            }
            input.value.checked = props.modelValue
        })
        watch((props as any).value, (e)=> {
            // 修改开关颜色
            if (activeColor || inactiveColor) {
                var color = !e ? activeColor : inactiveColor
                core.value.style.borderColor = color
                core.value.style.backgroundColor = color
            }
        })
        const handleClick = ()=> {
            context.emit('update:modelValue', !props.modelValue)
            context.emit("change",props.modelValue,!props.modelValue)
        }
        return{
            handleClick,input,core
        }
    },
})
</script>

<style lang="less" scoped>
  .xyn-switch{
    display: inline-block;
    align-items: center;
    position: relative;
    font-size: 14px;
    line-height: 20px;
    vertical-align: middle;
    .xyn-switch_core{
    margin: 0;
    display: inline-block;
    position: relative;
    width: 40px;
    height: 20px;
    border: 1px solid #dcdfe6;
    outline: none;
    border-radius: 10px;
    box-sizing: border-box;
    background: #dcdfe6;
    cursor: pointer;
    transition: border-color .3s,background-color .3s;
    vertical-align: middle;
    .xyn-switch_button{
      position:absolute;
      top: 1px;
      left: 1px;
      border-radius: 100%;
      transition: all .3s;
      width: 16px;
      height: 16px;
      background-color: #fff;
      }
    }
  }
  // 选中样式
  .is-checked {
    .xyn-switch_core{
      border-color: #409eff;
      background-color: #409eff;
      .xyn-switch_button {
        transform: translateX(20px);
      }
    }
  }
  // 隐藏input标签
  .xyn-switch_input{
    position:absolute;
    width: 0;
    height: 0;
    opacity: 0;
    margin: 0;
  }
</style>