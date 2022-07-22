<template>
  <div 
    :class="[
      'xyn-menu-item',
      {activated:activated},
      {row:isInGroup?false:isRow},
      {column:isInGroup?true:!isRow},
      {stretch:isStretch}
    ]" 
    @click="itemClickHandle"
  >
    <slot>
      {{name}}
    </slot>
  </div>
</template>

<script lang="ts">
import { watch, defineComponent, inject,  ref, computed } from 'vue'
import { MenuGroup, MenuItemGroup } from './menu'

export default defineComponent({
  name:"XynMenuItem",
  props:{
    label:{
      type:String,
      default:""
    },
    name:{
      type:String,
      default:""
    },
  },
  setup(props,context) {
    
    const menuRoot:MenuGroup|undefined = inject("MenuRoot")
    const activated = computed(()=>{
      if(!menuRoot){
        throw "MenuItem should be a child of Menu"
      }
      return menuRoot.getActivated()===props.label
    })
    
    
    
    const itemClickHandle = ()=>{
      menuRoot?.setActivated(props.label)
    }

    const isRow = computed(()=>{
      return menuRoot?.getStyle().rowDirection
    })
    const isStretch = computed(()=>{
      return menuRoot?.getStyle().stretch
    })
    
    const group:MenuItemGroup|undefined = inject("MenuItemGroup")

    const isInGroup = group?true:false
    
    watch(activated,(newValue,oldValue)=>{
      if(newValue===true){
        group?.setGroupActivated(props.label,true)
      }else{
        group?.setGroupActivated(props.label,false)
      }
    })

    return{
      activated,itemClickHandle,isRow,isStretch,isInGroup
    }
  },
})
</script>

<style lang="less" scoped>
@primaryTextDeepColor:var(--xyn-primary-more-deep-color);
@primaryTextColor:var(--xyn-primary-deep-color);
@primaryBorder:var(--xyn-primary-light-color);
@primaryBack:var(--xyn-primary-more-light-color);
.xyn-menu-item{
  color : @primaryTextColor;
  
  border-style: solid;
  border-width: 2px;
  border-color: rgba(255, 255, 255, 0);
  
  transition: 0.5s;
  min-height: 30px;
  min-width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
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
  &.activated.column{
    background-color: @primaryBack;
  }
}
</style>