// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './stroe/index'
import fastclick from 'fastclick'
import axios from "axios";
import qs from "qs";
import '../static/css/main.css'
import '../static/js/fontSize.js'
import wxShowMenu from "../static/js/share.js";
fastclick.attach(document.body);
//提交用户信息
axios
  .post(
    "/qxby/api/member/addMember",
    qs.stringify({
      openId: window.openId,
      customerId: "",
      headImageUrl: window.user.headimgurl,
      nickName: window.user.nickname
    })
  )
  .then(response => {
    this.friendCanSave = true;
  })
  .catch(error => {
    console.log(error);
  });
Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
  //根据字段判断是否路由过滤
  console.log("to", to)
  console.log("from", from)
  // 查看记录要获取到customerId
  if (to.path === '/winningRecord' && !window.customerId) {
    // 如果没有custerId并且点击历史记录，则跳转到注册页面
    // window.location.href = process.env.LOGIN;
    next();
  } else {
    next()//若点击的是不需要验证的页面,则进行正常的路由跳转
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
