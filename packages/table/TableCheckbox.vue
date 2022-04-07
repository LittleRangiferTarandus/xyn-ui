<template>
  <span class="xyn-checkbox" :class="{' is-checked':isCheck} " 
  >
    <span class="xyn-checkbox_input">
      <span class="xyn-checkbox_inner"></span>
    </span>
  </span>
</template>

<script lang="ts">
import { defineComponent, h} from 'vue'

export default defineComponent({
  name:"TableCheckbox",
  props:{
    isCheck:{
      type:Boolean,
      default:false
    },
  },
})
</script>
 
<style lang="less" scoped>
.xyn-checkbox{
    color: #606266;
    font-weight: 500;
    font-size: 14px;
    position: relative;
    cursor: pointer;
    display: inline-block;
    white-space: nowrap;
    user-select: none;
    .xyn-checkbox_input{
      white-space: nowrap;
      cursor: pointer;
      outline: none;
      display: inline-block;
      line-height: 1;
      position: relative;
      vertical-align: middle;
      .xyn-checkbox_inner{
        display: inline-block;
        position: relative;
        border: 1px solid #dcdfe6;
        border-radius: 2px;
        box-sizing: border-box;
        width: 14px;
        height: 14px;
        background-color: #fff;
        z-index: 1;
        transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s,cubic-bezier(.71,-.46,.29,1.46);
        &:after{
          box-sizing: content-box;
          content: '';
          border: 1px solid #ffffff;
          border-left: 0;
          border-top: 0;
          height: 7px;
          left: 4px;
          position: absolute;
          top: 1px;
          transform: rotate(45deg) scaleY(0);
          width: 3px;
          transition: transform .15s ease-in .05s;
          transform-origin: center;
        }
      }
    }
  }
  // 选中的样式
  .xyn-checkbox.is-checked{
    .xyn-checkbox_input{
      .xyn-checkbox_inner{
        background-color: #4a9f95;
        border-color: #4a9f95;
      }
      &:after{
        transform: rotate(45deg) scaleY(1);
      }
    }

  }
</style>