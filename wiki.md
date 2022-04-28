# 开始

欢迎来到Xyn-UI组件库

示例中的代码默认全局注册了组件

导入CSS样式：
```js
import 'xyn-ui/dist/style.css'
```

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


# 表单组件
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

# 数据展示
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
|sortable|-/-|string|该列的是否可排序，数字类型则按数字大小排序，其他则按原生的sort方法默认的方式排序|false|
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
  <x-virtual-list :estimateItemHeight="50" :resource="dataSource" :showHeight="500">
    <template v-slot="data" >
      <div :style='{height:data*10+"px"}'>
      {{data}}
      </div>
    </template>
  </x-virtual-list>
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