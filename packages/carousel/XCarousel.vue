<template>

  <div class="xyn-carousel" @mouseenter="enter" @mouseleave="leave">
    <ul class="xyn-carousel-body">
      <li
        class="xyn-carousel-item"
        :class="{ fade: curIdx === idx }"
        v-for="(item, idx) in sliders"
        :key="item.id"
      >
        <img :src='item.url'>
      </li>
    </ul>
    <i v-if="arrowVisible" class="xyn-carousel-btn ri-arrow-left-s-line prev"></i>
    <i v-if="arrowVisible" class="xyn-carousel-btn ri-arrow-right-s-line next"></i>
    <div v-if="indicatorVisible" class="xyn-carousel-indicator">
      <span
        v-for="(i, idx) in sliders.length"
        :key="i"
        @click="curIdx = idx"
        :class="{ active: idx === curIdx }"
      ></span>
    </div>
  </div>
 
</template>

<script lang="ts">
import { onUnmounted, PropType, ref, watch } from 'vue'
import {CarouselImg} from '../types/component'
export default {
  props: {
    sliders: {
      type: Array as PropType<CarouselImg[]>,
      default: () => []
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    playDelay: {
      type: Number,
      default: 2000
    },
    arrowVisible:{
      type:Boolean,
      default:true
    },
    indicatorVisible:{
      type:Boolean,
      default:true
    }
  },
  name: 'XynCarousel',
  setup (props) {
    const curIdx = ref(0)

    // 自动播放
    let timer:null|NodeJS.Timeout = null
    const autoplay = () => {
      timer = setInterval(() => {
        curIdx.value++
        if (curIdx.value >= props.sliders.length) curIdx.value = 0
      }, props.playDelay)
    }
    // sliders中有数据就自动播放
    watch(() => props.sliders, (newVal, oldVal) => {
      if (newVal.length > 0) {
        if (props.autoplay) {
          autoplay()
        }
      }
    }, { immediate: true })

    onUnmounted(() => {
      if(timer){
        clearInterval(timer)
      }
     
    })

    const leave = () => {
      if (props.autoplay) autoplay()
    }
    const enter = () => {
      if(timer){
        clearInterval(timer)
      }
    }
    // 切换上一张和下一张
    const toggle =( step:number) => {
      curIdx.value += step
      if (curIdx.value >= props.sliders.length) curIdx.value = 0
      if (curIdx.value < 0) curIdx.value = props.sliders.length - 1
    }
    return { curIdx, leave, enter, toggle }
  }
}
 
</script>

<style lang="less" scoped>
.xyn-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .xyn-carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      margin-top: -22px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
 
</style>