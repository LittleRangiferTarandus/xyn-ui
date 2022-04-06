<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import XMdEditor from '../packages/markdown/XMdEditor.vue'
import XMdGroup from '../packages/markdown/XMdGroup.vue'
import XMdPreviewer from '../packages/markdown/XMdPreviewer.vue'
import XTable from '../packages/table/XTable.vue'
import XTableColumn from '../packages/table/XTableColumn.vue'
import XButton from '../packages/button/XButton.vue'

export default defineComponent({
  components: { XMdEditor, XMdPreviewer, XMdGroup, XTable, XTableColumn, XButton },
  setup() {
    const dataSource = reactive([{name:"orangeCat",weight:"100kg",miao:"miao~~~"},{name:"bigOrangeCat",weight:"200kg",miao:"miao~~~wu"},{name:"bigOrangeCat",weight:"200kg",miao:"miao~~~wu"}])
    return{
      dataSource
    }
  },
})
</script>

<template>
  <x-table :data-source="dataSource">
    <x-table-column prop="name" label="name" ></x-table-column>
    <x-table-column prop="weight" label="weight"></x-table-column>
    <x-table-column prop="miao" label="sound">
      <template v-slot='sui_bian'>
        {{"叫声："+sui_bian.miao}}
      </template>
    </x-table-column>
  </x-table>
</template>

<style> 
</style>
