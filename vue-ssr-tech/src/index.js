import Vue from 'vue'
import App from './App.vue'
import './assets/styles/global.styl'
import './assets/styles/common.styl'
// import './assets/styles/test.css'
// import './assets/imgs/test.png'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  render: (h) => h(App) 
}).$mount(root)