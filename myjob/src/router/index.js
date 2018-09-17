import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import SignIn from '@/views/signIn'
import WinningRecord from '@/views/winningRecord'
import getstar from '@/views/getstar'
import back from '@/views/back'
import friendstar from '@/views/friends-star'
import rules from '@/views/rules'
import FriendSignIn from '@/views/friends-signIn'

Vue.use(Router)

const my_router = new Router({
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
      path: '/friendSignIn',
      name: 'friendSignIn',
      component: FriendSignIn
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
    },
    {
      path: '/rules',
      name: 'rules',
      component: rules
    },
    {
      path: '/back',
      name: 'back',
      component: back
    },
    {
      path: '*',
      redirect:'/index'
    }
  ]
})


export default my_router