<template>
  <button class="xyn-button" 
      :class="[`xyn-button-type-${type}`,`xyn-button-shape-${shape}`,`xyn-button-size-${size}`,{'is-plain':plain,'is-disabled':disabled}]"
      :disabled="disabled"
      @click="handleClick">
      <i v-if="icon" :class="[icon ,{'iconed':icon}]" ></i>
      <!-- 如果没传入文本插槽，则不显示span内容 -->
      <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name:"XynButton",
    props:{
        type:{
            type:String,
            default:"default"
        },
        shape:{
            type:String,
            default:"default"
        },
        size:{
            type:String,
            default:"default"
        },
        plain:{
            type:Boolean,
            default:false
        },
        disabled:{
            type:Boolean,
            default:false
        },
        icon: {
            type: String,
            default: ''
        },
    },
    setup(props,context) {
        const handleClick = (e:any)=>{
            context.emit("click",e)
        }
        return{
            handleClick
        }
    },
})
</script>
<style lang="less" scoped>

.xyn-button {
    display: inline-flex;
    align-items: center;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center ;
    box-sizing: border-box ;
    outline: none;
    margin: 0;
    transition: 0.1s;
    font-weight: 500;
    //禁止元素的文字被选中
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none ;
    user-select:none;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    &:hover {
        color:var(--xyn-primary-color);
        border-color:var(--xyn-primary-light-color);
        background-color:var(--xyn-primary-more-light-color);
    }

}
  
.xyn-button-type-primary{
  color:#fff;
  background-color: var(--xyn-primary-color);
  border-color: var(--xyn-primary-color);
  &:hover{
    background: var(--xyn-primary-light-color);
    background-color: var(--xyn-primary-light-color);
    color: #fff;
    }
  }
.xyn-button-type-success{
  color:#fff;
  background-color: #67c23a;
  border-color: #67c23a;
  &:hover{
    background: #85ce61;
    background-color: #85ce61;
    color: #fff;
    }
  }
.xyn-button-type-info{
  color:#fff;
  background-color: #909399;
  border-color: #909399;
  &:hover{
    background: #a6a9ad;
    background-color: #a6a9ad;
    color: #fff;
    }
  }
.xyn-button-type-warning{
  color:#fff;
  background-color: #e6a23c;
  border-color: #e6a23c;
  &:hover{
    background: #ebb563;
    background-color: #ebb563;
    color: #fff;
    }
  }
.xyn-button-type-danger{
  color:#fff;
  background-color: #f56c6c;
  border-color: #f56c6c;
  &:hover{
    background: #f78989;
    background-color: #f78989;
    color: #fff;
    }
  }
// 朴素按钮样式
.xyn-button.is-plain{
  &:hover{
    background: #fff;
    border-color: var(--xyn-primary-light-color);
    color: var(--xyn-primary-color);
  }
}
.xyn-button-type-primary.is-plain{
  color: var(--xyn-primary-color);
  background: #ecf5ff;
  &:hover{
    background: var(--xyn-primary-color);
    border-color: var(--xyn-primary-color);
    color: #fff;
  }
}
.xyn-button-type-success.is-plain{
  color: #67c23a;
  background: #c2e7b0;
  &:hover{
    background: #67c23a;
    border-color: #67c23a;
    color: #fff;
  }
}
.xyn-button-type-info.is-plain{
  color: #909399;
  background: #d3d4d6;
  &:hover{
    background: #909399;
    border-color: #909399;
    color: #fff;
  }
}
.xyn-button-type-warning.is-plain{
  color: #e6a23c;
  background: #f5dab1;
  &:hover{
    background: #e6a23c;
    border-color: #e6a23c;
    color: #fff;
  }
}
.xyn-button-type-danger.is-plain{
  color: #f56c6c;
  background: #fbc4c4;
  &:hover{
    background: #f56c6c;
    border-color: #f56c6c;
    color: #fff;
  }
}
// round属性
.xyn-button-shape-round{
  border-radius: 20px;
  padding: 12px 23px;
}
// circle属性
.xyn-button-shape-circle{
  border-radius: 50%;
  padding: 12px;
}
// icon配套样式
.xyn-button [class*=iconed]+span{
  margin-left: 5px;
}
// disabled属性
.xyn-button.is-disabled{
    background: rgb(245, 245, 245);
    border: 1px solid rgb(210,213,220);
    color: rgb(0,0,28);
    cursor: no-drop;
    opacity: .3;
    &:hover{
        background: rgb(245, 245, 245);
        border: 1px solid rgb(210,213,220);
        color: rgb(0,0,28);
   }
}
.xyn-button-type-primary.is-disabled{
  color:#fff;
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  &:hover{
  color:#fff;
  background-color: var(--primary-color);
  border-color: var(--primary-color);
    }
  }
.xyn-button-type-success.is-disabled{
  color:#fff;
  background-color: #67c23a;
  border-color: #67c23a;
  &:hover{
  color:#fff;
  background-color: #67c23a;
  border-color: #67c23a;
    }
  }
.xyn-button-type-info.is-disabled{
  color:#fff;
  background-color: #909399;
  border-color: #909399;
  &:hover{
  color:#fff;
  background-color: #909399;
  border-color: #909399;
    }
  }
.xyn-button-type-warning.is-disabled{
  color:#fff;
  background-color: #e6a23c;
  border-color: #e6a23c;
  &:hover{
  color:#fff;
  background-color: #e6a23c;
  border-color: #e6a23c;
    }
  }
.xyn-button-type-danger.is-disabled{
  color:#fff;
  background-color: #f56c6c;
  border-color: #f56c6c;
  &:hover{
  color:#fff;
  background-color: #f56c6c;
  border-color: #f56c6c;
    }
  }
//size
.xyn-button-size-mini{
    transform:scale(70%);
}
.xyn-button-size-small{
    transform:scale(85%);
}
</style>