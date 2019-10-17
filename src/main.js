import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import utils from './utils/utils'
import Button from './components/button'
Vue.prototype.$utils = utils
Vue.config.productionTip = false
Vue.component('Button', Button)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
