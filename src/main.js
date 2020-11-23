import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./stroe";
import toast from './components/common/toast'
import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";

// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
//添加事件总线对象
Vue.prototype.$bus = new Vue()
//安装toast插件
Vue.use(toast)
// Vue.use(ElementUI)

//解决移动端300ms延迟
FastClick.attach(document.body)

//图片懒加载
Vue.use(VueLazyload,{
  loading:require('./assets/img/common/NJLZ.jpg')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
