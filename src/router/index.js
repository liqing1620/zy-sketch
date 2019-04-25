import Vue from 'vue'
import {Cookies} from 'quasar'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)


/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */
//设置白名单
const WHITE_LIST = ['/login','/admin']
const ACCESS_TOKEN="access_token"

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })
  // 路由跳转前验证
  Cookies.set(ACCESS_TOKEN, null, {
    secure: true
  })
  Router.beforeEach((to, from, next) => {
    let token=Cookies.get(ACCESS_TOKEN)
    if(token){
      next()
    }else {
      if(WHITE_LIST.includes(to.path)){
        next()
      }else{
        next({ path: '/login', replace: true })
      }
    }
  })

  return Router
}
