import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import SignIn from '@/views/signIn'
import WinningRecord from '@/views/winningRecord'
import getstar from '@/views/getstar'
import friendstar from '@/views/friends-star'

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
      path: '/getstar',
      name: 'getstar',
      component: getstar
    },
    {
      path: '/friendStar',
      name: 'friendstar',
      component: friendstar
    }
  ]
})
