//引用vue
import Vue from 'vue'
//引用入口文件
import App from './App.vue'
//引用路由
import router from './router'
//引用vueX
import store from './store'
//引用elementui
import ElementUI from 'element-ui';
//引用elementui的css
import 'element-ui/lib/theme-chalk/index.css';
//引用axios的方法
import instance from "./api/methods"
//引用后端接口的路径
import path from "./api/path"
//引用自定义指令
import directive from "./directives/directive"
//把axios的方法赋值给Vue的原型的$api
Vue.prototype.$api = instance
//把后端接口的接口文件赋值给vue的原型的$path
Vue.prototype.$path = path
Vue.config.productionTip = false
//使用elementui
Vue.use(ElementUI);
//验证跳转的页面如果不是登录界面并且没有登录成功后设置的本地存储的内容，就会强制跳转到路由name为login的界面，确保用户不能直接通过地址栏直接跳过登录，确保是登录进去的
//这个方法叫做导航守卫
router.beforeEach((to, from, next) => {
  if (to.name != "login" && to.name != "sign" && !sessionStorage.name) {
    next({ name: "login" });
  } else {
    next();
  }
})
//手动配置路由
// router.addRoutes();
if (sessionStorage.getItem("routeData")) {
  store.commit("updateRouteData", JSON.parse(sessionStorage.getItem("routeData")));
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
//vue 全家桶
// vue vue-cli vue-router vuex axios
