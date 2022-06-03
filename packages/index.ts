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
  XUpload
]

const install = function(vue){
  components.forEach(element => {
    
    vue.component(element.name,element)
  });
}

const setColor = (rgb:number[])=>{
  let light:number[] = []
  let moreLight:number[] = []
  let deep:number[] = []
  let moreDeep:number[] = []
  rgb.forEach((v:number,i:number)=>{
    let lightFactor = 255-v, deepFactor = v
    light[i]=v+lightFactor/3
    moreLight[i]=v+lightFactor/3*2
    deep[i]=v-deepFactor/3
    moreDeep[i]=v-deepFactor/3*2
  })
  
  
  document.documentElement.style.setProperty("--xyn-primary-color",`rgb(${rgb[0]},${rgb[1]},${rgb[2]})`)
  document.documentElement.style.setProperty("--xyn-primary-light-color",`rgb(${light[0]},${light[1]},${light[2]})`)
  document.documentElement.style.setProperty("--xyn-primary-more-light-color",`rgb(${moreLight[0]},${moreLight[1]},${moreLight[2]})`)
  document.documentElement.style.setProperty("--xyn-primary-deep-color",`rgb(${deep[0]},${deep[1]},${deep[2]})`)
  document.documentElement.style.setProperty("--xyn-primary-more-deep-color",`rgb(${moreDeep[0]},${moreDeep[1]},${moreDeep[2]})`)
}

const transColor = (theme:string)=>{
  if(theme==="warm"){
    let rgb = [221,140,154]
    setColor(rgb)
  }else if(theme==="cold"){
    let rgb = [64,158,255]
    setColor(rgb)
  }
}

export default {
  install,transColor
}