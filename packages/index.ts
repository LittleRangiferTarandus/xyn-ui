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
  XTableColumn
]

const install = function(vue){
  components.forEach(element => {
    
    vue.component(element.name,element)
  });
}
 

export default {
  install
}