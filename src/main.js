import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router.js'
import $conf from './common/config/config'
//把自己封装的东西引进来
Vue.config.productionTip = false
Vue.prototype.$conf = $conf
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
