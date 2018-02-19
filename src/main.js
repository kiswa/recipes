import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'

Vue.config.productionTip = false

const api = axios.create({ baseURL: 'http://localhost:3000/' })

Object.defineProperty(Vue.prototype, '$http', {
  get() {
    return api
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
