<template>
 <xyn-menu 
  class="menu" 
  :defaultActivated="'1'" 
  :rowDirection="false" 
  :stretch="false"
  v-model="menuAct"
 >
  <xyn-menu-item label="1">HOME</xyn-menu-item>
  <xyn-menu-item label="2">INFO</xyn-menu-item>
  <xyn-menu-item-group label="3" :name="'SETTING'">
    <xyn-menu-item label="4">View</xyn-menu-item>
    <xyn-menu-item label="5">Data</xyn-menu-item>
  </xyn-menu-item-group>
  <xyn-menu-item label="6">OTHER</xyn-menu-item>
 </xyn-menu>
 
</template>
<script lang="ts">
import { defineComponent, ref} from 'vue'

export default defineComponent({
  setup(){
    const menuAct = ref("")
    return{
      menuAct
    }
  }
})
</script>

<style lang="less" scoped>
.menu{
  width: 200px;
}
</style>