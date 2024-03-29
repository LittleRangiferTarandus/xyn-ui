import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'

const path = require('path')



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),vueJsx(),dts({
    skipDiagnostics: false,
    logDiagnostics: true,
    outputDir:'dist/types'
  })],
  build: {
    outDir: 'dist',
    
    lib: {
      entry: path.resolve(__dirname, 'packages/index.ts'),
      name: 'xyn-ui',
      fileName: (format) => `xyn-ui-${format}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue','less','marked','highlight.js',"html2canvas"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'vue',
          less:'less',
          marked:"marked",
          'highlight.js':"highlight.js",
          html2canvas:'html2canvas'
        }
      }
      
    }
  },
  
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        strictMath: false,
      },
    },
    
},
  
})
