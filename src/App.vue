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