<script lang="ts">
import { defineComponent, reactive  } from 'vue'
import XMdEditor from '../packages/markdown/XMdEditor.vue'
import XMdGroup from '../packages/markdown/XMdGroup.vue'
import XMdPreviewer from '../packages/markdown/XMdPreviewer.vue'
import XTable from '../packages/table/XTable.vue'
import XTableColumn from '../packages/table/XTableColumn.vue'
import XButton from '../packages/button/XButton.vue'

export default defineComponent({
  components: { XMdEditor, XMdPreviewer, XMdGroup, XTable, XTableColumn, XButton },
  setup() {
    const dataSource = reactive([{name:"orangeCat",weight:5},{name:"bigOrangeCat",weight:10},{name:"bigOrangeCat",weight:15}])
    const rowClick=(v:any,i:number)=>{
        console.log(v,i);
        
    }
    return{
      dataSource,rowClick
    }
  },
})
</script>

<template>
  <x-table :data-source="dataSource"  @rowClick="rowClick">
    <x-table-column prop="name" label="name"  ></x-table-column>
    <x-table-column prop="weight" label="weight" :sortable="true"></x-table-column>
  </x-table>
</template>

<style> 
</style>
