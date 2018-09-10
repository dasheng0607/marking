import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import SignIn from '@/views/signIn'
import WinningRecord from '@/views/signIn'
import getstart from '@/views/getstart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/signIn',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/winningRecord',
      name: 'WinningRecord',
      component: WinningRecord
    },
    {
      path: '/getstart',
      name: 'getstart',
      component: getstart
    }
  ]
})
