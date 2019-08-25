import Vue from 'vue'
import App from './App.vue'
import router from './router'
import FnApi from '@vue/composition-api'

import './assets/main.css'

Vue.use(FnApi)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
