<template>
  <div class="xyn-upload-buttons">
    <label class="xyn-upload-select xyn-upload-button" 
      :class="{'is-disabled':disabled}"  
    >
      <i :class="[
        (autoUpload?pushLoading:selectLoading)?'ri-refresh-line':'ri-upload-line',
        'xyn-upload-icon',
        {'is-loading':autoUpload?pushLoading:selectLoading}
      ]"></i>
      <span class="xyn-upload-text">
        选择文件
      </span>
      <span>
        <input :disabled="disabled" class="xyn-upload-inner" type="file" @change="selectFile">
      </span>
    </label>
    <div :disabled="disabled"  
      class="xyn-upload-push xyn-upload-button" 
      @click="submitClick"
      v-if="!autoUpload"
    >
      <span class="xyn-upload-push-content">
        <i 
          :class="[pushLoading?'ri-refresh-line':'ri-upload-line','xyn-upload-icon',{'is-loading':pushLoading}]"
          
        ></i>
        <span class="xyn-upload-text">
          上传文件
        </span>
      </span>
    </div>
  </div>
  <div class="xyn-upload-file" v-if="showFileList">
    <div v-for="(item,index) in fileList" :key="item.key+index" class="xyn-upload-file-item">
      {{item.name}}
      <i :class="['ri-close-fill','xyn-upload-file-icon'] " :token="item.key"
        @click="deleteFileHandler"
      ></i>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType,  reactive,  ref } from 'vue'
import XButton from '../button/XButton.vue'

export default defineComponent({
  name:"XynUpload",
  components: { XButton },
  props:{
    disabled:{
      default:false,
      type:Boolean
    },
    pushLoading:{
      default:false,
      type:Boolean
    },
    verifyFunction:{
      default:undefined,
      type: Function as PropType<undefined|Function>
    },
    submitFunction:{
      default:undefined,
      type: Function as PropType<undefined|Function>
    },
    fileName:{
      default:"",
      type:String
    },
    fileMIMEType:{
      default:"",
      type:String
    },
    multiple:{
      default:false,
      type:Boolean
    },
    showFileList:{
      default:true,
      type:Boolean
    },
    autoUpload:{
      default:false,
      type:Boolean
    }
  },
  setup(props,context) {
    const selectLoading = ref(false)

    

    const fileList:any[] = reactive([])
    const selectFile =(e: Event)=>{
      
      if((e.target as any)?.files){
        let currentFile: any = (e.target as any).files[0]
        if(props.verifyFunction){
          if(!props.verifyFunction(currentFile)){
            (e.target as any).files=[]
            return
          }
        }
        
        const reader = new FileReader()
        reader.onload = (res:any)=>{
          let tempFile =  new File([res.target.result],currentFile.name,{type:props.fileMIMEType})
          if(props.multiple&&!props.autoUpload){
      
            fileList.push({
              name:currentFile.name+"  "+Math.round(currentFile.size/1024)+"KB",
              key:Date.now()+Math.random(),
              file:tempFile
            })
          }else{
            fileList.pop()
            fileList.push({
              name:currentFile.name+"  "+Math.round(currentFile.size/1024)+"KB",
              key:Date.now()+Math.random(),
              file:tempFile
              
            })
          }
          
          if(props.autoUpload){
            
            submitFile()
          }else{
            setTimeout(() => {
              selectLoading.value=false
              context.emit("update:disabled",false)
            }, 100);
          }

          
        }
        reader.readAsDataURL(currentFile)
        if(props.autoUpload){
          context.emit("update:pushLoading",true)
        }else{
          selectLoading.value=true
        }
        context.emit("update:disabled",true)
      }
      
    }
    const deleteFileHandler =(e:any)=>{
      if(!props.multiple||props.autoUpload){
        fileList.pop()
        return
      }
      
      let currentKey = e.currentTarget.attributes.token;
      for(let i =0 ;i<fileList.length;i++){ 
        if(fileList[i].key===currentKey.value-0){
          
          fileList.splice(i,1)
          break
        }
      }
      
      
    }
    const submitClick=()=>{
      
      if(props.disabled){
        return
      }
      submitFile()
    }

    const submitFile=()=>{
      if(fileList.length===0){
        return
      }
      let fileFormData:FormData=new FormData()
      if(props.submitFunction){
        if(props.multiple&&!props.autoUpload){
          fileList.forEach((v:any)=>{
            fileFormData.append(props.fileName,v.file)
          })
        }else{
          fileFormData.append(props.fileName,fileList[0].file)
        }
        props.submitFunction(fileFormData)
      }
    }
    return{
      selectLoading,
      selectFile,
      submitClick,
      fileList,
      deleteFileHandler
    }
  },
})
</script>

<style lang="less" sscoped>
@selectColor:var(--xyn-primary-color);
@selectBack:var(--xyn-primary-more-light-color);

@pushColor:#67c23a;
@pushBack:#c2e7b0;
.xyn-upload-buttons{
  display: flex;
  align-items: center;
    
  .xyn-upload-button {
      display: inline-flex;
      align-items: center;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
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
      border: 1px solid rgb(210,213,220);
      transform: scale(85%);
  }

  
  .xyn-upload-select{
    color: @selectColor;
    background: @selectBack;
    &:hover{
      background: @selectColor;
      border-color: @selectColor;
      color: #fff;
    }
  }

  .xyn-upload-push{
    color: @pushColor;
    background: @pushBack;
    &:hover{
      background: @pushColor;
      border-color: @pushColor;
      color: #fff;
    }
  }
}

.xyn-upload-inner{
  display: none;
}

.xyn-upload-button.is-disabled{
    background: rgb(245, 245, 245);
    border: 1px solid rgb(210,213,220);
    color: rgb(0,0,28);
    cursor: not-allowed;
    opacity: .3;
    &:hover{
        background: rgb(245, 245, 245);
        border: 1px solid rgb(210,213,220);
        color: rgb(0,0,28);
   }
}
.xyn-upload-text{
  margin-left: 5px;
}

.xyn-upload-push-content{
  display: inline-flex;
  align-items: center;
}

@keyframes turnZ{
  0%{transform:rotateZ(0deg);}
  100%{transform:rotateZ(360deg);}
}
.xyn-upload-icon.is-loading{
  animation-name:turnZ;
  animation-timing-function:linear;
  animation-duration:2s;
  animation-iteration-count:infinite;

}

.xyn-upload-file{
  margin-left: 20px;
  color: gray;
  font-size: 0.8em;
}
.xyn-upload-file-icon{
  border-radius: 50%;
  &:hover{
    background: rgba(128, 128, 128, 0.151);
  }
}
.xyn-upload-file-item{
  display: flex;
  align-items: center;
}
</style>