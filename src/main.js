import Vue from 'vue'
import App from './App'
import router from 'router/index'
import store from 'store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import 'element-ui/lib/theme-chalk/base.css'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import 'common/stylus/index.styl'
import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/vs.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueHighlightJS)
Vue.component(CollapseTransition.name, CollapseTransition)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
