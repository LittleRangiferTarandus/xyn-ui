<template>
  <xyn-form :formData="formData" :rules="rules">
    <xyn-form-item label="username" ruleKey="username">
      <xyn-range v-model="formData.username" :reverse="true"></xyn-range>
    </xyn-form-item>
  </xyn-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue' 
import XynRange from '../packages/range/XynRange.vue'

export default defineComponent({
  components: { XynRange },
  setup() {
    const formData = reactive({
      username:1,
      hobby:[]
    })
    const rules = {
      username:[{
        verify:(data)=>{console.log(data);
        },error:"不可为空" 
      },{
        verify:/^\w+$/,error:"非法用户名" 
      }],
    }
    return{
      formData,rules
    }
  },
})
</script>