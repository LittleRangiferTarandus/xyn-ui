import { createApp } from 'vue'
import App from './App.vue'
import XynUI from '../packages'

import 'xyn-ui/dist/style.css'
import 'remixicon/fonts/remixicon.css'
import 'highlight.js/styles/googlecode.css' 
import 'github-markdown-css';
createApp(App).use(XynUI).mount('#app')
