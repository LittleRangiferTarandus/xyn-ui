<template>
  <div  class="xyn-range" :class="{reverse:reverse}">
    <div v-if="showInterval==='dual'||showInterval==='pre'">{{min}}</div>
    <div class="xyn-range-container" ref="container">
      <div class="xyn-range-left xyn-range-terminal"></div>
      <div class="xyn-range-center"  >
        <section class="xyn-range-progress" ref="progress">
        </section>

      </div>
      <label class="xyn-range-dot" ref="rightDot" 
          @mousedown="mousedownHandler"
          
        >
        
        <input type="range" class="xyn-range-inner" ref="inner" 
          :max="max"
          :min="min"
          :step="step"
          v-model="inputValue"
        />
      </label>
      <div class="xyn-range-right xyn-range-terminal"></div>
    </div>
    <div v-if="showInterval==='dual'||showInterval==='post'">{{max}}</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref , onMounted, onBeforeUnmount, PropType} from 'vue'
import { getLeft } from '../utils/getAbsolutePosition';

enum ShowInterval {
  pre='pre',
  post='post',
  dual='dual'
}

export default defineComponent({
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
      default:ShowInterval.dual
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
      inputValue = ref(props.modelValue)

    const initialize=()=>{
      if(!container.value||!rightDot.value||!progress.value){
        return
      }
      let max = container.value.offsetWidth-16,
        min=0
      let mouseX = inputValue.value/(props.max-props.min)*(max-min)+min
      if(props.reverse){
        mouseX-=max
      }
      rightDot.value.style.transform = `translate(${mouseX}px,0)`
      progress.value.style.transform = `translate(${mouseX}px,0)`
    }
    onMounted(initialize)

    const mousemoveHandler =  (e:MouseEvent) => {
      
      if(timer){
        return
      }
    
      timer = setTimeout(()=>{
        if(!container.value || !rightDot.value || !progress.value ||!inner.value){
          return
        }
        if (isMove.value) {
      
          let containerLeft = getLeft(container.value)
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
          
          
          inputValue.value=Math.round((mouseX-min)/(max-min)*(props.max-props.min)/props.step)*props.step
          context.emit('update:modelValue',inputValue.value)
          
          
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

    
    return {
      rightDot,
      container,
      progress,
      inner,
      mousedownHandler,
      inputValue
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
  padding: 0 0.5*@height 0 0.5*@height ;

  .xyn-range-center {
    position: relative;
    margin-top: -0.5*@height - 1px;
    top: 50%;
    width: 100%;
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
    left: 0;
    background-color: @primary;
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
  &.reverse {
    .xyn-range-progress{
      right: -100%;
    }
    .xyn-range-dot{
      left: 100%;
      margin-left: -2*@height;
    }
    .xyn-range-right{
      background-color: @progress;
    }
    .xyn-range-left{
      background: @background;
    }
  }
}

</style>