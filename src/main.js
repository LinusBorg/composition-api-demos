import Vue from 'vue'
import './composition-plugin'
import router from './router'
import App from './App.vue'

import './assets/main.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
