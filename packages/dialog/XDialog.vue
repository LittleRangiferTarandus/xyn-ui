<template>
  <transition name="dialog-fade">
    <!-- @click.self避免冒泡，只有点击自己时才能触发   -->
    <div class="xyn-dialog_wrapper" v-show="visible" @click.self="handleClose">
      <div class="xyn-dialog" :style="{width:width,marginTop:top}">
        <div class="xyn-dialog_header">
          <slot name="title">
            <span class="xyn-dialog_title">
                {{title}}
            </span>
          </slot><!-- 不传入slot就会显示span，否则显示slot -->
          <button class="xyn-dialog_headerbtn" @click="handleClose">
            <i class="ri-close-line"></i>
          </button>
        </div>
        <div class="xyn-dialog_body">
          <slot></slot>
        </div>
        <div class="xyn-dialog_footer">
          <slot name="footer" v-if="$slots.footer">
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'XynDialog',
  props: {
    title: {
      type: String,
      default: '提示'
    },
    width: {
      type: String,
      default: '50%'
    },
    top: {
      type: String,
      default: '15vh'
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(props,context){
      const handleClose = () =>{
        context.emit('update:visible', false)
        context.emit('close')
    }
    return{
        handleClose
    }
  }
})
</script>

<style lang="less" scoped>
.xyn-dialog_wrapper{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  z-index: 2001;
  background-color: rgba(0,0,0,0.5);
  .xyn-dialog{
    position: relative;
    margin: 15vh auto 50px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
    box-sizing: border-box;
    width: 30%;
    &_header{
      padding: 20px 20px 10px;
      .xyn-dialog_title{
        line-height: 24px;
        font-size: 18px;
        color: #303133;
      }
      .xyn-dialog_headerbtn{
        position: absolute;
        top: 20px;
        right: 20px;
        padding: 0;
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 16px;
      }
    }
    &_body{
      padding: 30px 20px;
      color: #606266;
      font-size: 14px;
      word-break: break-all;
    }
    &_footer{
      padding: 10px 20px 20px;
      text-align: right;
      box-sizing: border-box;
      /deep/ .xyn-button:first-child{
        margin-right: 20px;
      }
    }
  }
}
.dialog-fade-enter-active{
  animation: fade .3s;
}
.dialog-fade-leave-active{
  animation: fade .3s reverse;
}
@keyframes fade{
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100%{
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
