<template>
  <div>
  <div 
    :class="[
      'xyn-menu-item-group',
      {activated:activated},
      {row:isRow},
      {column:!isRow},
      {stretch:isStretch}
    ]" 
    @click="itemClickHandle"
  >

    <span class="xyn-menu-item-group-text">
      {{name}}
    </span>
    <i class="ri-arrow-right-s-line xyn-menu-item-group-arrow" :class="[{active:itemsVisible}]"></i> 
    <div :class="['xyn-menu-item-group-items-row']"
      @mouseleave="itemMouseLeaveHandle"
      v-if="isRow"
      :style="{
        display:itemsVisible?'flex':'none'
      }"

      >
      <slot></slot>
    </div>
    
  </div>

    
  <div :class="['xyn-menu-item-group-items-column']"
    v-if="!isRow"
    :style="{
      maxHeight:itemsVisible?'10vh':'0px'
    }"

    >
    <slot></slot>
  </div>
  </div>
</template>

<script lang="ts">
import { watch, defineComponent, inject,  ref, computed, provide, reactive } from 'vue'
import { MenuGroup } from './menu'


export default defineComponent({
  name:"XynMenuItemGroup",
  props:{
    name:{
      type:String,
      default:""
    },
  },
  setup(props,context) {
    
    const menuRoot:MenuGroup|undefined = inject("MenuRoot")
    const itemActivatedMap :any=reactive({})
    
    const activated = ref(false)
    watch(itemActivatedMap,()=>{
      
      for(let key of Object.keys(itemActivatedMap)){
        
        if(itemActivatedMap[key]){
          activated.value= true
          return
        }
      }
      
      activated.value=false
    })
    const itemsVisible = ref(false)
    
    
    const itemClickHandle = ()=>{
      itemsVisible.value = !itemsVisible.value
      
    }
    const itemMouseLeaveHandle = ()=>{
      itemsVisible.value = false
    }

    const isRow = computed(()=>{
      return menuRoot?.getStyle().rowDirection
    })
    const isStretch = computed(()=>{
      return menuRoot?.getStyle().stretch
    })
    
    const setGroupActivated=(itemLabel:string,itemActivated:boolean)=>{
      
      itemActivatedMap[itemLabel]=itemActivated
      
    }

    provide("MenuItemGroup",{setGroupActivated})

    return{
      activated,itemClickHandle,isRow,isStretch,itemsVisible,itemMouseLeaveHandle
    }
  },
})
</script>

<style lang="less" scoped>
@primaryTextColor:var(--xyn-primary-deep-color);
@primaryBorder:var(--xyn-primary-light-color);
@primaryBack:var(--xyn-primary-more-light-color);
.xyn-menu-item-group{
  color : @primaryTextColor;
  position: relative;
  
  border-style: solid;
  border-width: 2px;
  border-color: rgba(255, 255, 255, 0);
  transition: 0.5s;
  min-height: 30px;
  min-width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover.row{
    border-bottom-color:@primaryBorder ;
  }
  &:hover.column{
    border-right-color:@primaryBorder ;
  }
  &.stretch{
    flex: auto;
  }
  &.activated.row{
    background-color: @primaryBack;
    color: white;
  }
  &-arrow{
    transition: 0.2s;
    position: absolute;
    right: 0;
    display: inline-block;
  }
  &-arrow.active{
    transform: rotate(90deg);
  }
  &>.xyn-menu-item-group-items-row{
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 120%;
    box-shadow: 0 0 1px gray;
  }
  &.activated.column{
    border-bottom-color: @primaryBack;
  }
  
}
.xyn-menu-item-group-items-column{
  padding-left: 5%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: 0.5s;
}
</style>