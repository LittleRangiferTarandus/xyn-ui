import { createApp } from 'vue'
import App from './App.vue'
import XynUI from '../packages'
import { transColor } from "../packages";
import 'remixicon/fonts/remixicon.css'
import 'highlight.js/styles/googlecode.css' 
import 'github-markdown-css';

import '../theme/theme.css'

transColor("cold")
createApp(App).use(XynUI).mount('#app')
