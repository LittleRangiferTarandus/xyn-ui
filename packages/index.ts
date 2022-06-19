import XButton from './button/XButton.vue'
import XCheckbox from './checkbox/XCheckbox.vue'
import XCheckboxGroup from './checkbox/XCheckboxGroup.vue'
import XDialog from './dialog/XDialog.vue'
import XForm from './form/XForm.vue'
import XFormItem from './form/XFormItem.vue'
import XInput from './input/XInput.vue'
import XRadio from './radio/XRadio.vue'
import XRadioGroup from './radio/XRadioGroup.vue'
import XSwitch from './switch/XSwitch.vue'
import XMdGroup from './markdown/XMdGroup.vue'
import XMdEditor from './markdown/XMdEditor.vue'
import XMdPreviewer from './markdown/XMdPreviewer.vue'
import XTable from './table/XTable.vue'
import XTableColumn from './table/XTableColumn.vue'
import XVirtualList from './virtualList/XVirtualList.vue'
import XUpload from './upload/XUpload.vue'
import {transColor} from './transColor'
import XStatisticGraph from './statisticGraph/XStatisticGraph.vue'
import XBarChart from './statisticGraph/categoryContinueChart/XBarChart.vue'
import XCategoryContinueBaseChart from './statisticGraph/categoryContinueChart/XCategoryContinueBaseChart.vue'
import XChartLegend from './statisticGraph/XChartLegend.vue'
import XScatterBinChart from './statisticGraph/categoryContinueChart/XScatterBinChart.vue'
import XChartTitle from './statisticGraph/XChartTitle.vue'
import XCCBC from './statisticGraph/continueContinueChart/XContinueContinueBaseChart.vue'
import XScatterChart from './statisticGraph/continueContinueChart/XScatterChart.vue'
import XSLineChart from './statisticGraph/continueContinueChart/XLineChart.vue'
const components=[
  XButton,
  XCheckbox,
  XCheckboxGroup,
  XDialog,
  XForm,
  XFormItem,
  XInput,
  XRadio,
  XRadioGroup,
  XSwitch,
  XMdEditor,
  XMdGroup,
  XMdPreviewer,
  XTable,
  XTableColumn,
  XVirtualList,
  XUpload,
  XStatisticGraph,
  XBarChart,
  XCategoryContinueBaseChart,
  XChartLegend,
  XScatterBinChart,
  XChartTitle,
  XCCBC,
  XScatterChart,
  XSLineChart
]

const install = function(vue:any){
  components.forEach(element => {
    
    vue.component(element.name,element)
  });
}



export default {
  install,transColor
}