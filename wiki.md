# 开始

欢迎来到Xyn-UI组件库


本组件库字体图标依赖于remix icon开源图标库，请见：http://www.remixicon.cn/。
安装引入图标库：

```
npm install remixicon --save
```

```js
import 'remixicon/fonts/remixicon.css'
```



# 提示
## 对话框dialog

参数：

|name|value|dataType|detail|default|
|-|-|-|-|-|
|width|CSS属性|string|宽度|15%|
|top|CSS属性|string|距顶部距离|default|
|title|-/-|string|标题|提示|
|visible|-/-|boolean|是否显示|false|
事件：
|name|parameter|detail|
|-|-|-|
|close|-/-|关闭事件|

for example
```vue
<template>
  <x-dialog v-model:visible="visible" ></x-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import XDialog from './components/dialog/XDialog.vue'

export default defineComponent({
  components: {  XDialog },
  setup() {
    let visible = ref(true)
    return{
      visible
    }
  },
})
</script>

```


# 表单
## 按钮

参数：

|name|value|dataType|detail|default|
|-|-|-|-|-|
|shape|default/round/circle|string|按钮形状|default|
|type|primary/danger/info/success/warning|string|类型|default|
|plain|-/-|boolean|是否为朴素按钮（空心按钮）|false|
|disabled|-/-|boolean|是否禁用|false|
|icon|-/-|string|图标类名|""|
|size|mini/small/default|尺寸|middle|
事件：
|name|parameter|detail|
|-|-|-|
|click|点击事件event|点击事件|




## 输入框input


|name|value|dataType|detail|default|
|-|-|-|-|-|
|placeholder|-/-|string|占位符|""|
|type|text/password|string|文本框类型|""|
|disabled|-/-|boolean|禁用|false|
|clearable|-/-|boolean|是否显示清空按钮|false|
|show-password|-/-|boolean|是否显示密码切换按钮|false|
|name|-/-|string|neme属性|""|
|modelValue|-/-|string|值|""|

|name|parameter|detail|
|-|-|-|
|blur|-/-|失去焦点事件|
|change|现值cur|内容改变事件|
|focus|-/-|获取的焦点事件|

for example
```vue
<template>
  <x-input :showPassword="true" type="password" :clearable="true" v-model="input" ></x-input>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue' 
import XInput from './components/input/XInput.vue'

export default defineComponent({
  components: { XInput },
  setup() {
    const input = ref("")
    return{
      input
    }
  },
})
</script>
```

## 切换按钮switch

|name|value|dataType|detail|default|
|-|-|-|-|-|
|modelValue|-/-|boolean|值|false|
|activeColor|颜色|string|选中颜色|"",默认样式#409eff|
|inactiveColor|颜色|string|非选中颜色|"",默认样式#dcdfe6|
|name|-/-|string|neme属性|""|

|name|parameter|detail|
|-|-|-|
|change|前值pre,现值cur|切换事件|
for example
```vue
<template>
  <x-switch v-model="input"  ></x-switch>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue' 
import XSwitch from './components/switch/XSwitch.vue'

export default defineComponent({
  components: {XSwitch  },
  setup() {
    const input = ref(true)
    return{
      input
    }
  },
})
</script>

```

## 单选按钮radio

|name|value|dataType|detail|default|
|-|-|-|-|-|
|modelValue|-/-|boolean|值|false|
|label|-/-|string|选项标签,若插槽为空，则会显示label|""|
|name|-/-|string|neme属性|""|

|name|parameter|detail|
|-|-|-|
|change|前值pre,现值cur|切换事件|

插槽
|name|detail|
|-|-|
|-/-|选项内容|

```vue
<template>
  <x-radio v-model="input"></x-radio>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue' 
import XRadio from './components/radio/XRadio.vue'

export default defineComponent({
  components: { XRadio  },
  setup() {
    const input = ref(true) 
    return{
      input
    }
  },
})
</script>
```

## 单选按钮组radioGroup
|name|value|dataType|detail|default|
|-|-|-|-|-|
|modelValue|子radio的label|string|值|""|


|name|parameter|detail|
|-|-|-|
|change|现值cur|切换事件|

插槽
|name|detail|
|-|-|
|-/-|子单选框|

for example
```vue

<template>
  <x-radio-group v-model="input">
    <x-radio label="1">喵呜</x-radio>
    <x-radio label="2">嗷呜</x-radio>
  </x-radio-group>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue' 
import XRadio from './components/radio/XRadio.vue'
import XRadioGroup from './components/radio/XRadioGroup.vue'

export default defineComponent({
  components: { XRadio, XRadioGroup  },
  setup() {
    const input = ref("1") 
    return{
      input
    }
  },
})
</script>

```


## 多选按钮checkbox

|name|value|dataType|detail|default|
|-|-|-|-|-|
|modelValue|-/-|boolean|值|false|
|label|-/-|string|选项标签,若插槽为空，则会显示label|""|
|name|-/-|string|neme属性|""|

|name|parameter|detail|
|-|-|-|
|change|前值pre,现值cur|切换事件|

插槽
|name|detail|
|-|-|
|-/-|选项内容|


## 多选按钮组checkboxGroup
|name|value|dataType|detail|default|
|-|-|-|-|-|
|modelValue|子checkbox的label数组|string[] |值|[]|


|name|parameter|detail|
|-|-|-|
|change|现值cur|切换事件|

插槽
|name|detail|
|-|-|
|-/-|子单选框|

for example
```vue
<template>
<x-checkbox-group v-model="hobby">
  <x-checkbox label="1">吃饭</x-checkbox>
  <x-checkbox label="2">睡觉</x-checkbox>
  <x-checkbox label="3"> 撸猫猫</x-checkbox>
</x-checkbox-group>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue' 
import XCheckbox from './components/checkbox/XCheckbox.vue'
import XCheckboxGroup from './components/checkbox/XCheckboxGroup.vue'

export default defineComponent({
  
  components: {  XCheckbox, XCheckboxGroup },
  setup() {
    const hobby = reactive([])
    return{
      hobby
    }
  },
})
</script>

```


## 表单和表单项form&formItem
表单

属性
|name|value|dataType|detail|default|
|-|-|-|-|-|
|formData|-/-|Object|表单内容|{}|
|labelStyle|CSS样式对象|Object|label样式|{}|
|rules|-/-|Object|表单校验规则，详情见下面示例|{}|
插槽
|name|detail|
|-|-|
|-/-|子表单项|

表单项

属性
|name|value|dataType|detail|default|
|-|-|-|-|-|
|label|-/-|string|label文本|""|
|ruleKey|-/-|string|根据该项在formData和rules中进行表单校验|""|
插槽
|name|detail|
|-|-|
|-/-|子表单控件|

for example：
```vue
<template>
  <x-form :formData="formData">
    <x-form-item label="username">
      <x-input  v-model="formData.username"></x-input>
    </x-form-item>
    <x-form-item label="hobby">
      <x-checkbox-group v-model="formData.hobby">
        <x-checkbox label="1">吃饭</x-checkbox>
        <x-checkbox label="2">睡觉</x-checkbox>
        <x-checkbox label="3"> 撸猫猫</x-checkbox>
      </x-checkbox-group>
    </x-form-item>
  </x-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue' 
import XCheckbox from './components/checkbox/XCheckbox.vue'
import XCheckboxGroup from './components/checkbox/XCheckboxGroup.vue'
import XForm from './components/form/XForm.vue'
import XFormItem from './components/form/XFormItem.vue'
import XInput from './components/input/XInput.vue'

export default defineComponent({
  
  components: {  XCheckbox, XCheckboxGroup, XInput, XForm, XFormItem },
  setup() {
    const formData = reactive({
      username:"",
      hobby:[]
    })
    return{
      formData
    }
  },
})
</script>

```

加入表单校验，校验的时机会在blur：
```vue
<template>
  <x-form :formData="formData" :rules="rules">
    <x-form-item label="username" ruleKey="username">
      <x-input  v-model="formData.username"></x-input>
    </x-form-item>
    <x-form-item label="hobby" ruleKey="hobby">
      <x-checkbox-group v-model="formData.hobby">
        <x-checkbox label="1">吃饭</x-checkbox>
        <x-checkbox label="2">睡觉</x-checkbox>
        <x-checkbox label="3"> 撸猫猫</x-checkbox>
      </x-checkbox-group>
    </x-form-item>
  </x-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue' 
import XCheckbox from './components/checkbox/XCheckbox.vue'
import XCheckboxGroup from './components/checkbox/XCheckboxGroup.vue'
import XForm from './components/form/XForm.vue'
import XFormItem from './components/form/XFormItem.vue'
import XInput from './components/input/XInput.vue'

export default defineComponent({
  
  components: {  XCheckbox, XCheckboxGroup, XInput, XForm, XFormItem },
  setup() {
    const formData = reactive({
      username:"",
      hobby:[]
    })
    const rules = {
      username:[{
        verify:(data:string)=>data.length,error:"不可为空" 
      },{
        verify:/^\w+$/,error:"非法用户名" 
      }],
      hobby:[{
        verify:(data:Array<string>)=>data.length,error:"不可为空"
      }]
    }
    return{
      formData,rules
    }
  },
})
</script>

```