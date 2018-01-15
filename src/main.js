import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000/recipes'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
