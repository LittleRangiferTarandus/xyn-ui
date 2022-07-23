<template>
  <div  class="xyn-range" :class="{reverse:reverse}">
    <div v-if="showInterval==='dual'||showInterval==='pre'">{{min}}</div>
    
      <div class="xyn-range-container" ref="container" @click="clickHandler">
        <div class="xyn-range-left xyn-range-terminal"></div>
        <div class="xyn-range-center"  >
          <section class="xyn-range-progress" ref="progress">
          </section>

        </div>
        <label class="xyn-range-dot" ref="rightDot" 
          @mousedown="mousedownHandler"
          @mouseover="mouseoverHandler"
          @mouseout="mouseoutHandler"
        >
            
          <input type="range" class="xyn-range-inner" ref="inner" 
            :max="max"
            :min="min"
            :step="step"
            v-model="inputValue"
          />
        </label> 
        <xyn-simple-tip :content="currentValue+''" 
          ref="tip" class="xyn-range-tip"
          :minWidth="40"
        >
        </xyn-simple-tip>
        <div class="xyn-range-right xyn-range-terminal"></div>
      </div>
    
    <div v-if="showInterval==='dual'||showInterval==='post'">{{max}}</div>


  </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref , onMounted, onBeforeUnmount, PropType, computed} from 'vue'
import XynSimpleTip from '../tip/XynSimpleTip.vue';
import XynTip from '../tip/XynTip.vue';

import { getLeftToWindow, getRealStytle } from '../utils/getRealStyle';

type ShowInterval='pre'|'post'|'dual'

export default defineComponent({
  components: { XynTip, XynSimpleTip },
  name: 'XynRange',
  props:{
    max:{
      type:Number,
      default:100
    },
    min:{
      type:Number,
      default:0
    },
    step:{
      type:Number,
      default:1
    },
    modelValue:{
      type:Number,
      default:100
    },
    showInterval:{
      type:String as PropType<ShowInterval>,
      default:'dual'
    },
    reverse:{
      type:Boolean,
      default:false
    }
  },
  setup(props,context) {
    
    let timer: NodeJS.Timeout|null=null;

    const rightDot :Ref<HTMLDivElement|undefined>= ref(),
      container:Ref<HTMLDivElement|undefined>=ref(),
      progress:Ref<HTMLDivElement|undefined>=ref(),
      inner:Ref<HTMLInputElement|undefined>=ref(),
      isMove = ref(false),
      inputValue = ref(props.modelValue),
      tip:Ref<any>=ref()
    const currentValue = computed(()=>inputValue.value+props.min)
    let tipOriginTrans = ''
    onMounted(()=>{
      tipOriginTrans=getRealStytle(tip.value.$el,'transform')
    })
    
    const initialize=()=>{
      if(!container.value||!rightDot.value||!progress.value||!tip.value){
        return
      }
      let max = container.value.offsetWidth-16,
        min=0
      
      let mouseX = (inputValue.value-props.min)/(props.max-props.min)*(max-min)+min
      if(props.reverse){
        mouseX-=max
      }
      rightDot.value.style.transform = `translate(${mouseX}px,0)`
      progress.value.style.transform = `translate(${mouseX}px,0)`
      tip.value.$el.style.transform =tipOriginTrans+ `translate(${mouseX}px,0)`
    }
    onMounted(initialize)

    const mousemoveHandler =  (e:MouseEvent) => {
      
      if(timer){
        return
      }
    
      timer = setTimeout(()=>{
        if(!container.value || !rightDot.value || !progress.value ||!inner.value||!tip.value){
          return
        }
        if (isMove.value) {
      
          let containerLeft = getLeftToWindow(container.value)
          let mouseClientX = e.clientX
          let mouseX = mouseClientX - containerLeft-8
          
          let max = container.value.offsetWidth-16,
            min=0
          
          if(mouseX<min){
            mouseX=min
            
          }else if(mouseX>max){
            mouseX=max
          }

          let move = mouseX
          if(props.reverse){
            move-=max
          }

          rightDot.value.style.transform = `translate(${move}px,0)`
          progress.value.style.transform = `translate(${move}px,0)`
          tip.value.$el.style.transform =tipOriginTrans+ `translate(${move}px,0)`
          
          
          
          inputValue.value=Math.round((mouseX-min)/(max-min)*(props.max-props.min)/props.step)*props.step
          context.emit('update:modelValue',currentValue.value)
          
          
        }
        timer=null
      },16)
      

    }


    const mouseupHandler =()=> {
      if(isMove.value&&inner.value){
        let blurEvent = new Event("blur", {"bubbles":true, "cancelable":false,"composed":true})
        inner.value.dispatchEvent(blurEvent)
      }
      isMove.value=false
      
      
    }

    onMounted(()=>{
      document.addEventListener('mousemove',mousemoveHandler)
      document.addEventListener('mouseup',mouseupHandler)
    })
    onBeforeUnmount(()=>{
      document.removeEventListener('mousemove',mousemoveHandler)
      document.removeEventListener('mouseup',mouseupHandler)
      timer=null
    })

    const mousedownHandler=()=>{
      isMove.value=true
    }

    const mouseoverHandler=()=>{
      if(!tip.value){
        return
      }
      (tip.value as any).showHandler()
    }

    const mouseoutHandler=()=>{
      if(!tip.value){
        return
      }
      (tip.value as any).hideHandler()
    }
    const clickHandler=(e:MouseEvent)=>{
      if(!container.value || !rightDot.value || !progress.value ||!inner.value||!tip.value){
        return
      }
  
      let containerLeft = getLeftToWindow(container.value)
      let mouseClientX = e.clientX
      let mouseX = mouseClientX - containerLeft-8
      
      let max = container.value.offsetWidth-16,
        min=0
      
      if(mouseX<min){
        mouseX=min
        
      }else if(mouseX>max){
        mouseX=max
      }

      let move = mouseX
      if(props.reverse){
        move-=max
      }

      rightDot.value.style.transform = `translate(${move}px,0)`
      progress.value.style.transform = `translate(${move}px,0)`
      tip.value.$el.style.transform =tipOriginTrans+ `translate(${move}px,0)`
      inputValue.value=Math.round((mouseX-min)/(max-min)*(props.max-props.min)/props.step)*props.step
      context.emit('update:modelValue',currentValue.value)
        
    }
    return {
      rightDot,
      container,
      progress,
      inner,
      mousedownHandler,
      inputValue,
      tip,
      mouseoverHandler,
      mouseoutHandler,
      currentValue,
      clickHandler
    }
  }
})


</script>

<style lang="less" scoped>
@primary : var(--xyn-primary-color);
@progress : var(--xyn-primary-more-light-color);
@background: rgb(236, 236, 236);
@border:rgba(131, 131, 131, 0.274);
@height:8px;
.xyn-range-container{
  position: relative;
  display: inline-block;
  height: 2*@height;
  width: 90%;
  padding: 0 0.5*@height+1px 0 0.5*@height+1px ;

  .xyn-range-center {
    position: absolute;
    margin-top: -0.5*@height - 1px;
    top: 50%;
    width: calc(100% - @height);
    height: @height;
    border-top: 1px @border solid;
    border-bottom: 1px @border solid;
    background-color: @background;
    overflow: hidden;
    .xyn-range-progress{
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      background-color: @progress;
      right: 100%;
    }

  }
  .xyn-range-dot {
    display: inline-block;
    margin-top: -@height;
    height: 2*@height;
    width: 2*@height;
    border-radius: 50%;
    
    position: absolute;
    top: 50%;
    background-color: @primary;
    left: 0;
    cursor: pointer;
    &>.xyn-range-inner{
      display: none;
    }
  }

  .xyn-range-terminal{
    height: @height;
    border-radius: 50%;
    width: @height;
    background-color: @background;
    border: 1px @border solid;
    position: absolute;
    display: inline-block;
    top: 0.5*@height - 1px;
    z-index: -1;

  }
  .xyn-range-right{
    right: 0;
    bottom: 0;
  }
  .xyn-range-left{
    left: 0;
    bottom: 0;
    background: @progress;
  }

}
.xyn-range{
  display: flex;
  width: 500px;
  align-items: center;
  justify-content: space-around;
  position: relative;
  &.reverse {
    &.reverse .xyn-range-progress{
      right: -100%;
    }
    &.reverse .xyn-range-dot{
      left: 100%;
      margin-left: -2*@height;
    }
    &.reverse .xyn-range-right{
      background-color: @progress;
    }
    &.reverse .xyn-range-left{
      background: @background;
    }
  }
}
.xyn-range-tip{
  top: 0;
  transform: translate(-50%,-100%) translateX(@height);
  left: 0;
}
</style>