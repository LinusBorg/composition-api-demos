import Vue from 'vue'
import App from './App.vue'
import router from './router'
import FnApi from 'vue-function-api'

Vue.use(FnApi)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
