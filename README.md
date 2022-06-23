# 写在前面
大家好，这里是小驯鹿LittleRangiferTarandus，就...这个是自己写的一个小小的组件库，请大家提个建议。


>//该段为自动生成内容
>## Vue 3 + Typescript + Vite
>This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.


# 开始

欢迎来到Xyn-UI组件库

//示例中的代码默认全局注册了组件
## 导入

```js
import XynUI from 'xyn-ui'
```

按需导入：
```js
import {XynButton} from 'xyn-ui'
```

## style

请全局导入CSS：
```js
import 'xyn-ui/dist/style.css'
import 'xyn-ui/theme/theme.css'
```

按需导入transColor函数来切换主题：
```js
import {transColor} from 'xyn-ui'
```
目前仅支持主题暖色调和冷色调，可传入"warm"或者"cold"进行设置


## 关于字体图标
本组件库字体图标依赖于`remix icon`开源图标库，请见：http://www.remixicon.cn/。
引入图标库：

```js
import 'remixicon/fonts/remixicon.css'
```



# 提示组件
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

举个例子

```vue
<template>
  <xyn-dialog v-model:visible="visible" ></xyn-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    let visible = ref(true)
    return{
      visible
    }
  },
})
</script>

```


# 输入组件

## 按钮Button

参数：

|name|value|dataType|detail|default|
|-|-|-|-|-|
|shape|default/round/circle|string|按钮形状|default|
|type|primary/danger/info/success/warning|string|类型|default|
|plain|-/-|boolean|是否为朴素按钮（空心按钮）|false|
|disabled|-/-|boolean|是否禁用|false|
|icon|-/-|string|图标类名|""|
|size|mini/small/default|尺寸|middle|




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

举个例子
```vue
<template>
  <xyn-input :showPassword="true" type="password" :clearable="true" v-model="input" ></xyn-input>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue' 

export default defineComponent({
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

举个例子
```vue
<template>
  <xyn-switch v-model="input"  ></xyn-switch>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue' 

export default defineComponent({
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

**radio**
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
  <xyn-radio v-model="input"></xyn-radio>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue' 

export default defineComponent({
  setup() {
    const input = ref(true) 
    return{
      input
    }
  },
})
</script>
```

单选按钮组**radioGroup**

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

举个例子
```vue

<template>
  <xyn-radio-group v-model="input">
    <xyn-radio label="1">喵呜</xyn-radio>
    <xyn-radio label="2">嗷呜</xyn-radio>
  </xyn-radio-group>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue' 

export default defineComponent({
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


多选按钮组**checkboxGroup**

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

举个例子
```vue
<template>
<xyn-checkboxyn-group v-model="hobby">
  <xyn-checkbox label="1">吃饭</xyn-checkbox>
  <xyn-checkbox label="2">睡觉</xyn-checkbox>
  <xyn-checkbox label="3"> 撸猫猫</xyn-checkbox>
</xyn-checkboxyn-group>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue' 

export default defineComponent({
  
  setup() {
    const hobby = reactive([])
    return{
      hobby
    }
  },
})
</script>

```


## 表单form
表单**form**

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

表单项**formItem**

属性
|name|value|dataType|detail|default|
|-|-|-|-|-|
|label|-/-|string|label文本|""|
|ruleKey|-/-|string|根据该项在formData和rules中进行表单校验|""|

插槽
|name|detail|
|-|-|
|-/-|子表单控件|

举个例子：
```vue
<template>
  <xyn-form :formData="formData">
    <xyn-form-item label="username">
      <xyn-input  v-model="formData.username"></xyn-input>
    </xyn-form-item>
    <xyn-form-item label="hobby">
      <xyn-checkboxyn-group v-model="formData.hobby">
        <xyn-checkbox label="1">吃饭</xyn-checkbox>
        <xyn-checkbox label="2">睡觉</xyn-checkbox>
        <xyn-checkbox label="3"> 撸猫猫</xyn-checkbox>
      </xyn-checkboxyn-group>
    </xyn-form-item>
  </xyn-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue' 

export default defineComponent({
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
  <xyn-form :formData="formData" :rules="rules">
    <xyn-form-item label="username" ruleKey="username">
      <xyn-input  v-model="formData.username"></xyn-input>
    </xyn-form-item>
    <xyn-form-item label="hobby" ruleKey="hobby">
      <xyn-checkboxyn-group v-model="formData.hobby">
        <xyn-checkbox label="1">吃饭</xyn-checkbox>
        <xyn-checkbox label="2">睡觉</xyn-checkbox>
        <xyn-checkbox label="3"> 撸猫猫</xyn-checkbox>
      </xyn-checkboxyn-group>
    </xyn-form-item>
  </xyn-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue' 

export default defineComponent({
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

## markdown
本组件的markdown语法高亮使用了highlight.js，请在恰当的地方（例如vue项目根目录的main.js）引入语法高亮样式
```js
import 'highlight.js/styles/googlecode.css' //举个例子
```
本组件库使用了`marked`进行markdown解析

markdown样式使用了github的样式，请在恰当的地方（例如vue项目根目录的main.js）引入
```js
import 'github-markdown-css';
```

组件库中，编辑器`mdEditor`和预览器`mdPreviewer`可同时作为`mdGroup`的子组件使用，也可以单独使用
```vue
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const text = ref("```javascript\nvar a=1\n```")
    return{
      text
    }
  },
})
</script>

<template>
  <xyn-md-group v-model="text">
    <xyn-md-editor></xyn-md-editor>
    <xyn-md-previewer></xyn-md-previewer>
  </xyn-md-group>
</template>
```

**mdGroup**

属性
|name|value|dataType|detail|default|
|-|-|-|-|-|
|modelValue|-/-|string|markdown文本|""|

插槽
|name|detail|
|-|-|
|-/-|子markdown组件|

**mdEditor**

属性
|name|value|dataType|detail|default|
|-|-|-|-|-|
|modelValue|-/-|string|markdown文本|""|

当父（或祖先）组件mdGroup存在时，modelValue将被mdGroup的modelValue覆盖

**mdPreviewer**

属性
|name|value|dataType|detail|default|
|-|-|-|-|-|
|mdValue|-/-|string|markdown文本|""|

同理，当父（或祖先）组件mdGroup存在时，mdValue将被mdGroup的modelValue覆盖

## 上传upload

举个栗子：
```vue
<script lang="ts">
import { defineComponent, ref  } from 'vue'
import axios from 'axios'
export default defineComponent({
  setup() {
    const func = (fileFormData:FormData)=>{
      disabled.value=true
      loading.value=true
      axios.post("http://xxxx",fileFormData,{
        headers:{
          'Content-Type':'mutipart/form-data'
        }
      }).then(res=>{
        loading.value=false
        disabled.value=false
      },err=>{
        loading.value=false
        disabled.value=false
      })
    }
    const disabled = ref(false)
    const loading=ref(false)
    return{
      func,disabled,loading
    }
  },
})
</script>

<template>
  <xyn-upload 
    :submit-function="func" 
    v-model:disabled="disabled"  v-model:pushLoading="loading"
    fileName="avatar" 
    :multiple="true"
  ></xyn-upload>
</template>
```

单个按钮的自动上传模式
```vue
<script lang="ts">
import { defineComponent, ref  } from 'vue'
import axios from 'axios'
export default defineComponent({
  setup() {
    const func = (fileFormData:FormData)=>{
      axios.post("http://xxxx",fileFormData,{
        headers:{
          'Content-Type':'mutipart/form-data'
        }
      }).then(res=>{
        loading.value=false
        disabled.value=false
      },err=>{
        loading.value=false
        disabled.value=false
      })
    }
    const disabled = ref(false)
    const loading=ref(false)
    return{
      func,disabled,loading
    }
  },
})
</script>

<template>
  <xyn-upload 
    :submit-function="func" 
    v-model:disabled="disabled"  
    v-model:pushLoading="loading"
    fileName="avatar" 
    :auto-upload="true"
  ></xyn-upload>
</template>
```

属性
|name|value|dataType|detail|default|
|-|-|-|-|-|
|isDisabled|-/-|boolean|组件是否禁用|false|
|pushIsLoading|-/-|boolean|上传组件是否加载中|false|
|verifyFunction|-/-|Function,undefined|选择文件后进行校验，输入参数为File类型的数据|undefined|
|submitFunction|-/-|Function,undefined|上传文件触发的函数，请在此定义上传行为，输入参数为FormData类型的数据，文件位于字段名为fileName字段|undefined|
|fileName|-/-|string|上传的文件名，即submitFunction输入参数FormData，文件所在字段|""|
|fileMIMEType|-/-|string|上传的文件的MIME类型，可不填，默认为空|""|
|multiple|-/-|boolean|是否为多文件上传|false|
|showFileList|-/-|boolean|是否显示文件列表|true|
|autoUpload|-/-|boolean|是否自动上传，若为是则multiple项无效，并且只呈现一个选择文件的按钮|false|

# 展示组件
## 表格Table

举个例子
```vue
<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const dataSource = reactive([{name:"orangeCat",weight:"100kg",miao:"miao~~~"},{name:"bigOrangeCat",weight:"200kg",miao:"miao~~~wu"}])
    return{
      dataSource
    }
  },
})
</script>

<template>
  <xyn-table :data-source="dataSource">
    <xyn-table-column prop="name" label="name" ></xyn-table-column>
    <xyn-table-column prop="weight" label="weight"></xyn-table-column>
    <xyn-table-column prop="miao" label="sound">
      <template v-slot='sui_bian'>
        {{"叫声："+sui_bian.miao}}
      </template>
    </xyn-table-column>
  </xyn-table>
</template>
```

建议只在table中使用tableColumn组件

可展开的表格：
```vue
<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const dataSource = reactive([{name:"orangeCat",weight:"100kg",miao:"miao~~~"},{name:"bigOrangeCat",weight:"200kg",miao:"miao~~~wu"}])
    return{
      dataSource
    }
  },
})
</script>

<template>
  <xyn-table :data-source="dataSource">
    <xyn-table-column prop="name" label="name" ></xyn-table-column>
    <xyn-table-column prop="weight" label="weight"></xyn-table-column>
    <xyn-table-column type="expand">
      <template v-slot='sui_bian'>
        {{"叫声："+sui_bian.miao}}
      </template>
    </xyn-table-column>
  </xyn-table>
</template>
```

带有合计栏的表格
```vue
<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const dataSource = reactive([{name:"orangeCat",weight:5},{name:"bigOrangeCat",weight:10},{name:"bigOrangeCat",weight:15}])

    return{
      dataSource
    }
  },
})
</script>

<template>
  <xyn-table :data-source="dataSource" :summary="true" >
    <xyn-table-column prop="name" label="name"  ></xyn-table-column>
    <xyn-table-column prop="weight" label="weight" :sortable="true"></xyn-table-column>
  </xyn-table>
</template>
```

自定义合计函数
```vue
<script lang="ts">
import { defineComponent, reactive  } from 'vue'

export default defineComponent({
  setup() {
    const dataSource = reactive([{name:"orangeCat",weight:5},{name:"bigOrangeCat",weight:10},{name:"bigOrangeCat",weight:15}])
    const summaryFunction = (prop:string,data:any[])=>{
      if(prop==="name"){
        return "总和"
      }
      if(prop==="weight"){
        return data.reduce(function(prev, curr){
            return prev + curr;
        });
      }
      
    }
    return{
      dataSource,summaryFunction
    }
  },
})
</script>

<template>
  <xyn-table :data-source="dataSource" :summary="true" :summaryFunction="summaryFunction">
    <xyn-table-column prop="name" label="name"  ></xyn-table-column>
    <xyn-table-column prop="weight" label="weight" :sortable="true"></xyn-table-column>
  </xyn-table>
</template>
```

添加行点击事件
```vue
<script lang="ts">
import { defineComponent, reactive  } from 'vue'

export default defineComponent({
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
  <xyn-table :data-source="dataSource"  @rowClick="rowClick">
    <xyn-table-column prop="name" label="name"  ></xyn-table-column>
    <xyn-table-column prop="weight" label="weight" :sortable="true"></xyn-table-column>
  </xyn-table>
</template>
```

**table**

属性
|name|value|dataType|detail|default|
|-|-|-|-|-|
|dataSource|-/-|array|表格的全部数据|[]|
|border|-/-|boolean|表格是否有边框|false|
|stripe|-/-|boolean|表格行是否为斑马纹|false|
|selectType|""/radio/checkbox|string|表格是否可选，radio则是单选模式，checkbox则是多选模式|""|
|selectBoxShow|-/-|boolean|表格是否显示展示框|false|
|summary|-/-|boolean|表格是否显示合计栏|false|
|summaryFunction|-/-|function,undefined|(prop:string,data:any[])=>any，参数：合计栏的列名和该列的数据，返回在合计栏展示的内容|undefined|

插槽
|name|detail|
|-|-|
|-/-|表格tableColumn子组件|

事件：
|name|parameter|detail|
|-|-|-|
|rowClick|该行dataSourcs的数组和行号|tableBody的点击行事件|

**tableColumn**

属性
|name|value|dataType|detail|default|
|-|-|-|-|-|
|prop|-/-|string|该列对应的table组件中，dataSource中元素的字段|""|
|label|-/-|string|该列的表题|""|
|sortable|-/-|boolean|该列的是否可排序，数字类型则按数字大小排序，其他则按原生的sort方法默认的方式排序|false|
|type|expand|string|expand：表示表格是否可扩张，插槽的内容作为扩张的内容，此时prop、label、sortable的属性会被忽略；|""|


插槽
|name|detail|
|-|-|
|-/-|作用域插槽，可以在`v-slot="xxx"`（xxx为任意值）中取到对应的行元素所有值，即dataSource数组元素。要注意的是，该插槽不是响应式的，可能在热更新中不能观察到变化，修改插槽的模板后请刷新页面|


## 虚拟列表VirtualList

虚拟列表通常用于长数据“按需加载”，仅仅渲染可视区域的数据，减少性能消耗.

举个栗子：
```vue
<script lang="ts">
import { defineComponent, reactive  } from 'vue'

export default defineComponent({
  setup() {
    const dataSource = reactive([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26])

    return{
      dataSource
    }
  },
})
</script>

<template>
  <xyn-virtual-list :estimateItemHeight="50" :resource="dataSource" :showHeight="500">
    <template v-slot="data" >
      <div :style='{height:data*10+"px"}'>
      {{data}}
      </div>
    </template>
  </xyn-virtual-list>
</template>

```
estimateItemHeight指的是虚拟列表每一项的默认高度，当渲染行元素的默认插槽存在时，渲染后，再读取行元素实际高度

属性
|name|value|dataType|detail|default|
|-|-|-|-|-|
|getData|-/-|function,undefined|虚拟列表当前已有数据渲染到底部（滚动到底部）时，加载数据的回调函数|undefined|
|estimateItemHeight|-/-|number|虚拟列表每一项的默认高度，单位px|50|
|resource|-/-|array|虚拟列表的数据|[]|
|showHeight|-/-|number|可视区域高度，单位px|400|
|updateDelay|-/-|number|滚动列表后，更新所渲染数据的函数为节流函数，此项为节流延迟，单位ms|250|
|isEnd|-/-|boolean|虚拟列表是否到末尾，`isEnd`和`isLoading`为排斥或关系，不满足则不渲染虚拟列表底部元素|false|
|isLoading|-/-|boolean|虚拟列表是否正在加载，`isEnd`和`isLoading`为排斥或关系，不满足则不渲染虚拟列表底部元素|false|


插槽
|name|detail|
|-|-|
|-/-|作用域插槽，可以在`v-slot="xxx"`（xxx为任意值）中取到对应的行元素的值，即resource数组元素。要注意的是，该插槽不是响应式的，可能在热更新中不能观察到变化，修改插槽的模板后请刷新页面|
|end|虚拟列表底部元素的作用域插槽，可以在`v-slot:end="xxx"`（xxx为任意值）中取到`{isEnd,isLoading}`对象。要注意的是，该插槽不是响应式的，可能在热更新中不能观察到变化，修改插槽的模板后请刷新页面|

## 轮播图Carousel

举个栗子：
```vue
<script lang="ts">
import { defineComponent, reactive  } from 'vue'

export default defineComponent({
  setup() {
    const dataSource = reactive([{url:'https://images.unsplash.com/photo-1572197491557-5b1a2c767c7b?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000',id:1},
      {url:'https://images.unsplash.com/photo-1572197491557-5b1a2c767c7b?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000',id:2}
      
    ])

    return{
      dataSource
    }
  },
})
</script>

<template>
  <xyn-carousel :sliders="dataSource">
  </xyn-carousel>
</template>
```

属性
|name|value|dataType|detail|default|
|-|-|-|-|-|
|sliders|-/-|{url:string,id:string\|number}[]|轮播图的图片|[]|
|autoplay|-/-|boolean|是否开启自动播放|true|
|playDelay|-/-|number|轮播延迟，单位：ms|2000|
|arrowVisible|-/-|boolean|是否显示左右切换按钮|true|
|indicatorVisible|-/-|boolean|是否显示底部切换按钮|true|

## 统计图组件StatisticGraph

>Beta测试内容


**SstatisticGraph**

`beta-xyn-statistic-graph`是统计图的parent组件，`beta-xyn-chart-label`（图例）、`beta-xyn-bar-chart`（条形图）等必须作为`beta-xyn-statistic-graph`的子组件而存在。

`beta-xyn-statistic-graph`实例对象的clear方法可用于清空图像，downloadGraph可以用于下载图像（png格式）

**ChartLegend**

该组件用于绘制图例


**ChartTitle**

该组件用于绘制左、下边的标题

**CategoryContinueBaseChart**
分类-连续类型数据统计图的“基组件”，即为`beta-xyn-category-continue-base-chart`

属性
|name|value|dataType|detail|default|
|-|-|-|-|-|
|dataX|-/-|any[]|x轴变量|[]|
|dataY|-/-|any[]|y轴变量|[]|
|optionSet|-/-|见下|
|symbol|-/-|string|该图表的唯一标识，会自动生成|""|

`optionSet`属性
>`optionSet`属性默认为空，被监听到变化后会合并到组件`option`的`data`中，下面的默认值都是指`option`，下同略过

|attribute|type|default|detail|
|-|-|-|-|
|classAxis|Axis|Axis.x|类别轴，`Axis`：枚举类型，值为字符串`"x"`或`"y"`|
|drawAxis|boolean|true|是否绘制坐标轴|
|outerAxis|boolean|false|坐标轴是否位于统计图左、下边|
|showAxisLabel|[boolean,boolean]|[true, true]|是否显示坐标轴刻度，分别为x轴、y轴，如果不绘制坐标轴，也不会绘制刻度|
|showLegend|boolean|true|是否显示图例|
|unit|string|""|数值轴单位，如果不绘制坐标轴，也不会绘制单位|
|arrowAixs|boolean|true|是否使用箭头线绘制坐标轴|
|labelFont|font|[{}, {}]|坐标轴刻度字体，分别为x轴、y轴，`font={size:number,family:string}`，字体大小和字型|
|valueRange|[number,number]\|undefined|undefined|数值轴范围，不指定将根据输入数据计算|
|defaultColor|rgbColor|随机|默认绘图颜色，`rgbColor=[number,number,number]`，RGB颜色|


一个`beta-xyn-statistic-graph`下面可以含有多个`beta-xyn-base-chart`（含派生组件），行为表现为，在同一个画布上画出重叠的图

`beta-xyn-base-chart`实例对象（含派生组件）的update方法可用于数据变更后的异步更新，但是新的图像如果没有恰好覆盖原图像的现象（原图为空不会出现这种现象），会影响展示，如有需要请先用`beta-xyn-statistic-graph`实例对象的clear方法清空图像。

>`beta-xyn-bar-chart`组件继承自`beta-xyn-base-chart`组件，如果需要个性化的统计图，笔给你，你可以自己画。默认导入`beta-xyn-statistic-graph`，`drawTool`属性可以获得一些画图工具。`beta-xyn-base-chart`源码见GitHub。具体说明施工中......。



**BarChart**

该组件为CategoryContinueBaseChart的派生组件，用于绘制条形图，举个例子

```vue
<template>
  <beta-xyn-statistic-graph class="graph">
    <beta-xyn-chart-legend></beta-xyn-chart-legend>
    <beta-xyn-bar-chart :dataX="[-10,324,-54]" :dataY="['a','b','c']"  ></beta-xyn-bar-chart>
  </beta-xyn-statistic-graph>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
})
</script>
<style lang="less" scoped>
.graph{
  width: 700px;
  height: 700px;
}
</style>
```


属性
|name|value|dataType|detail|default|
|-|-|-|-|-|
|dataX|-/-|string[],string[][],number[],number[][]|x轴变量，二维数组则为多组数据|[]|
|dataY|-/-|string[],string[][],number[],number[][]|y轴变量，二维数组则为多组数据|[]|
|dataError|-/-|number[],number[][]|误差线，二维数组则为多组数据|[]|
|optionSet|见下|

>（*）如果要绘制分组的数据，请开启分类绘制，此时，分类轴只可以为1维数组，数值轴和`dataError`数据只能是2维数组。请把相应的`dataX`/`dataY`设置为3维数组，例如`dataY`为`[[1,2],[3,4],[5,6]]`，其中，1,3,5为同一组数据，绘制时颜色为`groupColor[0]`，图例名称为`groupLegend[0]`。`dataX`、`dataY`、`dataError`在不开启分类绘制时，维度要一致

`optionSet`属性
>继承自CategoryContinueBaseChart的`option`，继承的字段略去

|attribute|type|default|detail|
|-|-|-|-|
|drawTrendLine|boolean|false|是否绘制趋势线|
|groupColor|rgbColor[]|[]|当按组绘图时，每组颜色|
|groupLegend|string[]|[]|当按组绘图时，每组图例|
|groupBound|boolean|false|开启分组画图|
|drawErrorBar|boolean|false|绘制误差线|
|errorBarWidth|number|0|误差线宽度|
|eachColor|rgbColor[]\|undefined|undefined|每个柱的颜色，优于`defaultColor`，但在分组绘图时`groupColor`最为优先|

**ScatterBinChart**

该组件为BarChart的派生组件，用于绘制散点箱型图

举个例子：

```vue
<template>
    <beta-xyn-statistic-graph class="graph" ref="graph" title="TITLE">
    <beta-xyn-chart-legend></beta-xyn-chart-legend>
    <beta-xyn-chart-title 
      titleX="XXX"
      titleY="YYY"
    ></beta-xyn-chart-title>
    <beta-xyn-scatter-bin-chart 
    :dataY="[
      [[35,22,-47,55],
      [-51,-53.4011397,-5,20],
      [38,55,37,10],
    ],
    
    [
      [-10.50243747,17,60.30036601,59],
      [41.51499867,7,30.75770385,34.01836427],
      [-41.26532478,-6,-38,98.56478512],
    ],
    
    [
      [127,-1,54.89233982,48.1717766],
      [-10.46341803,-43,8,50.03504831],
      [34.94366247,-24.5078009,16.83234926,117.2118747]
    ]]"

    :dataX="['A','B','C']"  

    :dataError="[
      [[7,8,10],[10,20,10]],
      [[7,8,10],[10,20,10]],
      [[7,8,10],[10,20,10]]
    ]"

    :optionSet="{
      outerAxis:true,
      drawAxis:true,
      showAxisLabel:[true,true],
      showLabel:true,
      offsetRate:0.3,
      errorBarWidth:15,
      unit:'单位',
      drawTrendLine:true,
      groupColor:[[224, 165, 130],[155, 201, 186],[129,37, 205]],
      groupLabel:['A','B','C'],
      groupBound:true
    }"
    ></beta-xyn-scatter-bin-chart>
  </beta-xyn-statistic-graph>
  <xyn-button @click.stop="download">下载</xyn-button>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup(){
    const graph = ref()
    const download = ()=>{
      graph.value.downloadGraph()
      
    }
    return{
      graph,download
    }
  }
})
</script>

```


属性
|name|value|dataType|detail|default|
|-|-|-|-|-|
|dataX|-/-|string[],string[][],number[][],number[][][]|x轴变量，三维数组则为多组数据（*）|[]|
|dataY|-/-|string[],string[][],number[][],number[][][]|y轴变量，三维数组则为多组数据（*）|[]|
|dataError|-/-|[number[],number[]],[number[],number[]][]|误差线（**）
|optionSet|见下|

>（*）如果要绘制分组的数据，请开启分类绘制，此时，分类轴只可以为1维数组，数值轴数据和`dataError`只能是3维数组。请把相应的`dataX`/`dataY`设置为3维数组，例如`dataY`为`[[[1,2],[3,4]],[[5,6],[7,8]],[[9,10],[11,12]]]`，其中，`[1,2]`、`[5,6]`、`[9,10]`为同一组数据，绘制时颜色为`groupColor[0]`，图例名称为`groupLabel[0]`。

>（**）`[number[],number[]]`这两个数组都表示误差，用于绘制箱形图，例如第一个数组表示SEM，第二个数组表示SD。`dataError`如为`[number[],number[]][]`表示多组数据，此时`dataError[0]`对应`dataY[0]`的误差（不妨假设`dataY`表示值）。


`optionSet`属性
>继承自BarChart的`option`，继承的字段略去

|attribute|type|default|detail|
|-|-|-|-|
|offsetRate|number|0|散点偏离程度，越接近0越不偏离|
|dotRadium|number|1|散点半径|

**ContinueContinueBaseChart**
连续-连续类型数据统计图的“基组件”，即为`beta-xyn-continue-continue-base-chart`

属性
|name|value|dataType|detail|default|
|-|-|-|-|-|
|dataX|-/-|number[],number[][]|x轴变量，二维数组则为多组数据（*）|[]|
|dataY|-/-|number[],number[][]|y轴变量，二维数组则为多组数据（*）|[]|
|optionSet|见下|



`optionSet`属性

|attribute|type|default|detail|
|-|-|-|-|
|classAxis|Axis|Axis.x|类别轴，`Axis`：枚举类型，值为字符串`"x"`或`"y"`|
|drawAxis|boolean|true|是否绘制坐标轴|
|outerAxis|boolean|false|坐标轴是否位于统计图左、下边|
|showAxisLabel|[boolean,boolean]|[true, true]|是否显示坐标轴刻度，分别为x轴、y轴，如果不绘制坐标轴，也不会绘制刻度|
|showLegend|boolean|true|是否显示图例|
|unit|string|""|数值轴单位，如果不绘制坐标轴，也不会绘制单位|
|arrowAixs|boolean|true|是否使用箭头线绘制坐标轴|
|labelFont|font|[{}, {}]|坐标轴刻度字体，分别为x轴、y轴，`font={size:number,family:string}`，字体大小和字型|
|range|[[number,number],[number,number]\]<br>\|undefined|undefined|数值轴范围，分别为x轴、y轴，不指定将根据输入数据计算|
|color|rgbColor\|rgbColor[]|随机|绘图颜色，若为`rgbColor`数组则为多组数据时每组颜色，`rgbColor=[number,number,number]`，RGB颜色|
|scale|[number,number]\|undefined|undefined|坐标轴刻度大小，分别为x轴、y轴，不填则自动计算刻度|
|legend|string[]\|string|""|图例，为字符串数组则为多组数据每组图例|

**ScatterChart**
继承自ContinueContinueBaseChart，绘制散点图

属性
|name|value|dataType|detail|default|
|-|-|-|-|-|
|optionSet|见下|


`optionSet`属性
>继承自ContinueContinueBaseChart的`option`

|attribute|type|default|detail|
|-|-|-|-|
|dotRadium|number|1|散点半径|
|drawTrendLine|boolean|false|是否绘制趋势线|

**LineChart**
继承自ScatterChart，绘制线型图

属性
|name|value|dataType|detail|default|
|-|-|-|-|-|
|dataError|-/-|number[],number[][]|误差变量，二维数组则为多组数据|[]|
|optionSet|见下|

`optionSet`属性
>继承自ContinueContinueBaseChart的`option`

|attribute|type|default|detail|
|-|-|-|-|
|drawErrorRange|boolean|false|是否绘制误差范围（尚未实装）|

