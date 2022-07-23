<template>
  <div class="xyn-simple-tip"
    :class="{
      top:direction==='top',
      bottom:direction==='bottom',
      left:direction==='left',
      right:direction==='right',
      leftTop:direction==='leftTop',
      leftBottom:direction==='leftBottom',
      rightTop:direction==='rightTop',
      rightBottom:direction==='rightBottom',
      fill:fill,
      visible:visible
    }"

  >
    <div class="xyn-simple-tip-head" :style="{minWidth:minWidth+'px'}">
      {{content}}
    </div>
    <div class="xyn-simple-tip-tail"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent,  PropType,  ref} from 'vue'

type Direction ='top'|'bottom'|'left'|'right'|'leftTop'|'leftBottom'|'rightTop'|'rightBottom'
export default defineComponent({
  name:'XynTip',
  props:{
    content:{
      type:String,
      default:''
    },
    direction:{
      type:String as PropType<Direction>,
      default:'top'
    },
    fill:{
      type:Boolean,
      default:false
    },
    minWidth:{
      type:Number,
      default:0
    }
  },
  setup(props,context) {
    const visible = ref(false)
    const showHandler = ()=>{
      visible.value=true
    }
    const hideHandler = ()=>{
      visible.value=false
    }
    return{
      visible,
      showHandler,
      hideHandler
    }
  },
})
</script>

<style lang="less" scoped>
@primary:var(--xyn-primary-color);

.xyn-simple-tip{
  opacity: 0;
  position: absolute;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  transition: 1s opacity;
  &.visible{
    opacity: 1;
  }
  &-tail{
    height: 0;
    width: 0;
  }
  &-head{
    color: white;
    background-color: rgba(49, 49, 49, 0.445) ;
    padding: 5px;
    border-radius: 5px;
    text-align: center;

  }
}



.xyn-simple-tip.fill{
  &>.xyn-simple-tip-head{
    color: white;
    background-color: @primary;
  }
  &.top>.xyn-simple-tip-tail{
    border-top: 18px @primary  solid;
  }
  &.bottom>.xyn-simple-tip-tail{
    border-bottom: 18px @primary solid;
  }
  &.left>.xyn-simple-tip-tail{
    border-left: 18px   @primary solid;
  }
  &.right>.xyn-simple-tip-tail{
    border-right: 18px  @primary solid;
  }
  &.leftTop>.xyn-simple-tip-tail{
    border-top: 18px  @primary solid ;
  }
  &.leftBottom>.xyn-simple-tip-tail{
    border-bottom: 18px @primary solid ;
  }
  &.rightTop>.xyn-simple-tip-tail{
    border-top: 18px  @primary  solid ;
  }
  &.rightBottom>.xyn-simple-tip-tail{
    border-bottom: 18px @primary solid ;
  }
}

.xyn-simple-tip.top{
  flex-direction: column;
  .xyn-simple-tip-tail{
    border-left: 6px rgba(255, 255, 255, 0) solid;
    border-right: 6px rgba(255, 255, 255, 0) solid ;
    border-top: 18px rgba(49, 49, 49, 0.445)  solid;
  }
  
}

.xyn-simple-tip.bottom{
  flex-direction: column-reverse;
  .xyn-simple-tip-tail{
    border-left: 6px rgba(255, 255, 255, 0) solid;
    border-right: 6px rgba(255, 255, 255, 0) solid ;
    border-bottom: 18px rgba(49, 49, 49, 0.445)  solid;
    margin: auto;
  }
}

.xyn-simple-tip.left{
  flex-direction: row;
  .xyn-simple-tip-tail{
    border-left: 18px   rgba(49, 49, 49, 0.445) solid;
    border-top: 6px rgba(255, 255, 255, 0) solid ;
    border-bottom: 6px rgba(255, 255, 255, 0)  solid;
    margin: auto 0;
  }
}

.xyn-simple-tip.right{
  flex-direction: row-reverse;
  .xyn-simple-tip-tail{
    border-top: 6px rgba(255, 255, 255, 0) solid ;
    border-bottom: 6px rgba(255, 255, 255, 0)  solid;
    border-right: 18px   rgba(49, 49, 49, 0.445) solid;
    margin: auto 0;
  }
}

.xyn-simple-tip.leftTop{
  flex-direction: column;
  align-items: flex-end ;
  .xyn-simple-tip-tail{
    border-top: 18px  rgba(49, 49, 49, 0.445) solid ;
    
    border-left: 12px rgba(255, 255, 255, 0)  solid;
    
    bottom: 0;
    right: 0;
    transform: skewX(60deg) translateX(12px) ;
  }
}
.xyn-simple-tip.leftBottom{
  flex-direction: column-reverse;
  align-items: flex-end ;
  .xyn-simple-tip-tail{
    border-bottom: 18px  rgba(49, 49, 49, 0.445) solid ;
    
    border-left: 12px rgba(255, 255, 255, 0)  solid;
    
    top: 0;
    right: 0;
    transform: skewX(-60deg) translateX(12px) ;
  }
}
.xyn-simple-tip.rightTop{
  flex-direction: column;
  align-items: flex-start ;
  .xyn-simple-tip-tail{
    border-top: 18px  rgba(49, 49, 49, 0.445) solid ;
    
    border-right: 12px rgba(255, 255, 255, 0)  solid;
    
    bottom: 0;
    left: 0;
    transform: skewX(-60deg) translateX(-12px) ;
  }
}
.xyn-simple-tip.rightBottom{
  flex-direction: column-reverse;
  align-items: flex-start ;
  .xyn-simple-tip-tail{
    border-bottom: 18px  rgba(49, 49, 49, 0.445) solid ;
    
    border-right: 12px rgba(255, 255, 255, 0)  solid;
    
    top: 0;
    left: 0;
    transform: skewX(60deg) translateX(-12px) ;
  }
}

</style>