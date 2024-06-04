import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'
// 加载vant全局样式
import Vant from 'vant'
import 'vant/lib/index.css'
// rem适配
import 'amfe-flexible'
import './utils/dayjs'

// 注册
Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
