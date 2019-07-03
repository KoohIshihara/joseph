import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

import device from "vue-device-detector"
import browserDetect from "vue-browser-detect-plugin";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
Vue.use(device)
Vue.use(browserDetect)
