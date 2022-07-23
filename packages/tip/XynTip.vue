<template>
  <div class="xyn-tip">
    <div class="xyn-tip-body"
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

      ref="tip"
    >
      <div class="xyn-tip-head" >
        {{content}}
      </div>
      <div class="xyn-tip-tail"></div>
    </div>
    <div class="xyn-tip-inner" ref="inner" @mouseover="mouseoverHandler" @mouseout="mouseoutHandler">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, Ref, ref,watch } from 'vue'
import { getRealStytle } from '../utils/getRealStyle'

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
    }
  },
  setup(props,context) {
    const tip:Ref<HTMLDivElement|undefined>=ref(),
      inner:Ref<HTMLDivElement|undefined>=ref()
    
    let originTrans:string=''
    const getLeft=()=>{
      let children = inner.value?.childNodes
      let offsetLeft = Infinity
      children?.forEach((v:any)=>{
        
        if(v?.offsetLeft<offsetLeft){
          
          offsetLeft = v?.offsetLeft
        }
      })

      if(offsetLeft===Infinity){
        offsetLeft = 0
      }
      return offsetLeft
    }

    const getBottom=()=>{
      let innerHeight:any = inner.value?.clientHeight
      let children = inner.value?.childNodes
      let offsetBottom = Infinity
      children?.forEach((v:any)=>{
        let tempOffsetBottom = innerHeight-v?.offsetTop-v?.clientHeight
        
        if(tempOffsetBottom<offsetBottom){
          
          offsetBottom = tempOffsetBottom
        }
      })

      if(offsetBottom===Infinity){
        offsetBottom = 0
      }
      return offsetBottom
    }

    const getTop=()=>{
      let children = inner.value?.childNodes
      let offsetTop = Infinity
      children?.forEach((v:any)=>{
        if(v?.offsetTop<offsetTop){
          
          offsetTop = v.offsetTop
        }
      })

      if(offsetTop===Infinity){
        offsetTop = 0
      }
      return offsetTop
    }

    const getRight=()=>{
      let children = inner.value?.childNodes
      let innerWidth:any = inner.value?.clientWidth
      let offsetRight = Infinity
      children?.forEach((v:any)=>{
        let tempOffsetRight = -v?.offsetLeft-v?.clientWidth+innerWidth
        if(tempOffsetRight<offsetRight){
          
          offsetRight =tempOffsetRight
        }
      })

      if(offsetRight===Infinity){
        offsetRight = 0
      }
      return offsetRight
    }

    const initialize = (isFirst:boolean)=>{
      if(!tip.value||!inner.value){
        return
      }
      let transString=''
      switch (props.direction){
        case 'top':{
          transString=`translateY(${getTop()-tip.value.clientHeight}px)`
          break
        }
        case 'bottom':{
          transString=`translateY(${-getBottom()+tip.value.clientHeight}px)`
          break
        }
        case 'left':{
          transString=`translateX(${getLeft()-tip.value.clientWidth}px)`
          break
        }
        case 'right':{
          transString=`translateX(${-getRight()+tip.value.clientWidth}px)`
          break
        }
        case 'leftTop':{
          transString=`translateY(${getTop()-tip.value.clientHeight}px)translateX(${getLeft()-tip.value.clientWidth}px)`
          break
        }
        case 'leftBottom':{
          transString=`translateY(${-getBottom()+tip.value.clientHeight}px)translateX(${getLeft()-tip.value.clientWidth}px)`
          break
        }
        case 'rightTop':{
          transString=`translateY(${getTop()-tip.value.clientHeight}px)translateX(${-getRight()+tip.value.clientWidth}px)`
          break
        }
        case 'rightBottom':{
          transString=`translateY(${-getBottom()+tip.value.clientHeight}px)translateX(${-getRight()+tip.value.clientWidth}px)`
          break
        }
      }

      if(isFirst){
        originTrans=getRealStytle(tip.value,'transform')
      }
      if(originTrans&&originTrans!=='none'){
        tip.value.style.transform=originTrans+transString
      }else{
        tip.value.style.transform=transString
      }
      
    }
    onMounted(()=>initialize(true))

    watch(()=>props.direction,()=>{
      initialize(false)
    })

    const visible = ref(false)
    const mouseoverHandler = ()=>{
      visible.value=true
    }
    const mouseoutHandler = ()=>{
      visible.value=false
    }
    return{
      tip,
      inner,
      mouseoverHandler,
      mouseoutHandler,
      visible
    }
  },
})
</script>

<style lang="less" scoped>
@primary:var(--xyn-primary-color);
.xyn-tip{
  display: inline-block;
  position: relative;

  &-body{
    opacity: 0;
    position: absolute;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    transition: 1s;
  }
  &-body.visible{
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


  }
  &-body.fill{
    &>.xyn-tip-body{
      color: white;
      background-color: @primary;
    }
    &.top>.xyn-tip-tail{
      border-top: 18px @primary  solid;
    }
    &.bottom>.xyn-tip-tail{
      border-bottom: 18px @primary solid;
    }
    &.left>.xyn-tip-tail{
      border-left: 18px   @primary solid;
    }
    &.right>.xyn-tip-tail{
      border-right: 18px  @primary solid;
    }
    &.leftTop>.xyn-tip-tail{
      border-top: 18px  @primary solid ;
    }
    &.leftBottom>.xyn-tip-tail{
      border-bottom: 18px @primary solid ;
    }
    &.rightTop>.xyn-tip-tail{
      border-top: 18px  @primary  solid ;
    }
    &.rightBottom>.xyn-tip-tail{
      border-bottom: 18px @primary solid ;
    }
  }

  &-body.top{
    flex-direction: column;
    top: 0;
    left: 0;
    right: 0;
    .xyn-tip-tail{
      border-left: 6px rgba(255, 255, 255, 0) solid;
      border-right: 6px rgba(255, 255, 255, 0) solid ;
      border-top: 18px rgba(49, 49, 49, 0.445)  solid;
    }
    
  }
  
  &-body.bottom{
    flex-direction: column-reverse;
    bottom: 0;
    left: 0;
    right: 0;
    .xyn-tip-tail{
      border-left: 6px rgba(255, 255, 255, 0) solid;
      border-right: 6px rgba(255, 255, 255, 0) solid ;
      border-bottom: 18px rgba(49, 49, 49, 0.445)  solid;
      margin: auto;
    }
  }

  &-body.left{
    flex-direction: row;
    transform: translateY(-50%);
    left: 0;
    top:50%;
    .xyn-tip-tail{
      border-left: 18px   rgba(49, 49, 49, 0.445) solid;
      border-top: 6px rgba(255, 255, 255, 0) solid ;
      border-bottom: 6px rgba(255, 255, 255, 0)  solid;
      margin: auto 0;
    }
  }

  &-body.right{
    flex-direction: row-reverse;
    transform: translateY(-50%);
    right: 0;
    top:50%;
    .xyn-tip-tail{
      border-top: 6px rgba(255, 255, 255, 0) solid ;
      border-bottom: 6px rgba(255, 255, 255, 0)  solid;
      border-right: 18px   rgba(49, 49, 49, 0.445) solid;
      margin: auto 0;
    }
  }

  &-body.leftTop{
    flex-direction: column;
    align-items: flex-end ;
    left:0;
    top: 0;
    .xyn-tip-tail{
      border-top: 18px  rgba(49, 49, 49, 0.445) solid ;
      
      border-left: 12px rgba(255, 255, 255, 0)  solid;
      
      bottom: 0;
      right: 0;
      transform: skewX(60deg) translateX(12px) ;
    }
  }
  &-body.leftBottom{
    flex-direction: column-reverse;
    align-items: flex-end ;
    left:0;
    bottom: 0;
    .xyn-tip-tail{
      border-bottom: 18px  rgba(49, 49, 49, 0.445) solid ;
      
      border-left: 12px rgba(255, 255, 255, 0)  solid;
      
      top: 0;
      right: 0;
      transform: skewX(-60deg) translateX(12px) ;
    }
  }
  &-body.rightTop{
    flex-direction: column;
    align-items: flex-start ;
    right:0;
    top: 0;
    .xyn-tip-tail{
      border-top: 18px  rgba(49, 49, 49, 0.445) solid ;
      
      border-right: 12px rgba(255, 255, 255, 0)  solid;
      
      bottom: 0;
      left: 0;
      transform: skewX(-60deg) translateX(-12px) ;
    }
  }
  &-body.rightBottom{
    flex-direction: column-reverse;
    align-items: flex-start ;
    right:0;
    bottom: 0;
    .xyn-tip-tail{
      border-bottom: 18px  rgba(49, 49, 49, 0.445) solid ;
      
      border-right: 12px rgba(255, 255, 255, 0)  solid;
      
      top: 0;
      left: 0;
      transform: skewX(60deg) translateX(-12px) ;
    }
  }
}
.xyn-tip-inner{
  display: inline-block;
  padding: 0;
  margin: 0;
}
</style>