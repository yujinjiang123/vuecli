import Vue from 'vue'
import Router from 'vue-router'
import RouterConfig from './modules' //引入业务逻辑模块
import CommonConfig from './common' //引入通用模块

Vue.use(Router);

export default new Router({
  routes: RouterConfig.concat(CommonConfig)
})
