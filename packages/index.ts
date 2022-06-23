import XynButton from './button/XButton.vue'
import XynCheckbox from './checkbox/XCheckbox.vue'
import XynCheckboxGroup from './checkbox/XCheckboxGroup.vue'
import XynDialog from './dialog/XDialog.vue'
import XynForm from './form/XForm.vue'
import XynFormItem from './form/XFormItem.vue'
import XynInput from './input/XInput.vue'
import XynRadio from './radio/XRadio.vue'
import XynRadioGroup from './radio/XRadioGroup.vue'
import XynSwitch from './switch/XSwitch.vue'
import XynMdGroup from './markdown/XMdGroup.vue'
import XynMdEditor from './markdown/XMdEditor.vue'
import XynMdPreviewer from './markdown/XMdPreviewer.vue'
import XynTable from './table/XTable.vue'
import XynTableColumn from './table/XTableColumn.vue'
import XynVirtualList from './virtualList/XVirtualList.vue'
import XynUpload from './upload/XUpload.vue'
import {transColor} from './transColor'
import XynStatisticGraph from './statisticGraph/XStatisticGraph.vue'
import XynBarChart from './statisticGraph/categoryContinueChart/XBarChart.vue'
import XynCategoryContinueBaseChart from './statisticGraph/categoryContinueChart/XCategoryContinueBaseChart.vue'
import XynChartLegend from './statisticGraph/XChartLegend.vue'
import XynScatterBinChart from './statisticGraph/categoryContinueChart/XScatterBinChart.vue'
import XynChartTitle from './statisticGraph/XChartTitle.vue'
import XynContinueContinueBaseChart from './statisticGraph/continueContinueChart/XContinueContinueBaseChart.vue'
import XynScatterChart from './statisticGraph/continueContinueChart/XScatterChart.vue'
import XynLineChart from './statisticGraph/continueContinueChart/XLineChart.vue'
import { App,Plugin } from 'vue'
const components=[
  XynButton,
  XynCheckbox,
  XynCheckboxGroup,
  XynDialog,
  XynForm,
  XynFormItem,
  XynInput,
  XynRadio,
  XynRadioGroup,
  XynSwitch,
  XynMdEditor,
  XynMdGroup,
  XynMdPreviewer,
  XynTable,
  XynTableColumn,
  XynVirtualList,
  XynUpload,
  XynStatisticGraph,
  XynBarChart,
  XynCategoryContinueBaseChart,
  XynChartLegend,
  XynScatterBinChart,
  XynChartTitle,
  XynContinueContinueBaseChart,
  XynScatterChart,
  XynLineChart,
  
]

export {
  XynButton,
  XynCheckbox,
  XynCheckboxGroup,
  XynDialog,
  XynForm,
  XynFormItem,
  XynInput,
  XynRadio,
  XynRadioGroup,
  XynSwitch,
  XynMdEditor,
  XynMdGroup,
  XynMdPreviewer,
  XynTable,
  XynTableColumn,
  XynVirtualList,
  XynUpload,
  XynStatisticGraph,
  XynBarChart,
  XynCategoryContinueBaseChart,
  XynChartLegend,
  XynScatterBinChart,
  XynChartTitle,
  XynContinueContinueBaseChart,
  XynScatterChart,
  XynLineChart,
  transColor
}

const XynUI :Plugin = {
  install : function(vue:App){
    components.forEach(element => {
      
      vue.component(element.name,element)
    });
  }
  
}


export default  XynUI
