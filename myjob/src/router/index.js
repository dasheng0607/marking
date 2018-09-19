import Vue from 'vue'
import Router from 'vue-router'
// import index from '@/views/index'
// import SignIn from '@/views/signIn'
// import WinningRecord from '@/views/winningRecord'
// import getstar from '@/views/getstar'
// import back from '@/views/back'
// import friendstar from '@/views/friends-star'
// import rules from '@/views/rules'
// import FriendSignIn from '@/views/friends-signIn'

Vue.use(Router)

const my_router = new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      // component: index
      component: resolve => require(['@/views/index'], resolve),
    },
    {
      path: '/signIn',
      name: 'SignIn',
      // component: SignIn
      component: resolve => require(['@/views/signIn'], resolve),
    },
    {
      path: '/friendSignIn',
      name: 'friendSignIn',
      // component: FriendSignIn
      component: resolve => require(['@/views/friends-signIn'], resolve),
    },
    {
      path: '/winningRecord',
      name: 'WinningRecord',
      // component: WinningRecord
      component: resolve => require(['@/views/winningRecord'], resolve),
    },
    {
      path: '/getstar',
      name: 'getstar',
      // component: getstar
      component: resolve => require(['@/views/getstar'], resolve),
    },
    {
      path: '/friendStar',
      name: 'friendstar',
      // component: friendstar
      component: resolve => require(['@/views/friends-star'], resolve),
    },
    {
      path: '/rules',
      name: 'rules',
      // component: rules
      component: resolve => require(['@/views/rules'], resolve),
    },
    {
      path: '/back',
      name: 'back',
      // component: back
      component: resolve => require(['@/views/back'], resolve),
    },
    {
      path: '*',
      redirect:'/index'
    }
  ]
})


export default my_router