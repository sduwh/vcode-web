import Vue from 'vue';
import App from './App';
import router from 'router/index';
import store from 'store/index';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import 'element-ui/lib/theme-chalk/base.css';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import 'common/stylus/index.styl';
import VueHighlightJS from 'vue-highlightjs';
import 'highlight.js/styles/vs.css';
import cpp from 'highlight.js/lib/languages/cpp';
import python from 'highlight.js/lib/languages/python';
import java from 'highlight.js/lib/languages/java';
import VueCodeMirror from 'vue-codemirror-lite';
import VueFilterDateFormat from 'vue-filter-date-format';
import enLocale from 'element-ui/lib/locale/lang/en';


Vue.use(VueFilterDateFormat);
Vue.config.productionTip = false;
Vue.use(ElementUI, { enLocale });
Vue.use(VueHighlightJS, {
  // Register only languages that you want
  languages: {
    cpp,
    python,
    java,
  },
});
Vue.use(VueCodeMirror);
Vue.component(CollapseTransition.name, CollapseTransition);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
