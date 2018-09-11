<template>
    <div id="singIn">
        <div class="btn">
             <router-link to="/index"><div class="btn-left"></div></router-link>
            <router-link to="/rules"> <div class="btn-right"></div></router-link>
        </div>
        <div class="icon"></div>
        <div class="sign-in-text"></div>
        <div class="sign-in-box">
            <div class="sign-in-1 sign-in">
                <span class="day-1 day"></span>
            </div>
            <div class="sign-in-2 sign-in">
                <span class="day-2 day"></span>
            </div>
            <div class="sign-in-3 sign-in">
                <span class="day-3 day"></span>
            </div>
            <div class="sign-in-4 sign-in">
                <span class="day-4 day"></span>
            </div>
            <div class="sign-in-5 sign-in">
                <span class="day-5 day"></span>
            </div>
            <div class="sign-in-6 sign-in">
                <span class="day-6 day"></span>
            </div>
            
        </div>
        <div class="sign-in-7 sign-in">
                <span class="day-7 day"></span>
        </div>
        <div class="click_text"></div>
        <div class="invite_text"></div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "index",
  data() {
    return {};
  },
  created() {
    //  axios
    //     .get("http://www.swisse-china.com.cn/swisseweixin/weixin/authorize?encodeTargetUrl=http://www.swisse-china.com.cn/#/signIn")
    //     .then(function(response) {
    //       console.log(response);
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    // this.$get('http://www.swisse-china.com.cn/swisseweixin/weixin/jsApiSign')
    // .then((response) => {
    //     console.log(response);
    //   })

    axios.post('/qxby/api/sign/getSignListByOpenId?openId=789', {
        })
        .then( (response) => {
            console.log(response.data.data);
         
      
        })
        .catch( (error) => {
            console.log(error);
        });

  },
  mounted() {
  },
  methods: {
    getId() {
     
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
#singIn {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url("/static/img/sign_in_bg.png") no-repeat center -0.7rem fixed;
  background-size: contain;
  background-color: #000;
}
.btn {
  width: 100%;
  height: 0.34rem;
  padding-top: 0.5rem;
}
.btn-left {
  margin-left: 0.5rem;
  float: left;
  width: 1.62rem;
  height: 100%;
  background: url("/static/img/index_icon.png") left center no-repeat;
  background-size: contain;
}
.btn-right {
  margin-right: 0.64rem;
  float: right;
  width: 1.69rem;
  height: 100%;
  background: url("/static/img/icon2.png") left center no-repeat;
  background-size: contain;
}
.icon {
  margin-top: 0.1rem;
  height: 0.46rem;
  background: url("/static/img/icon3.png") center center no-repeat;
  background-size: contain;
}
.sign-in-text {
  margin-top: 0.3rem;
  height: 1.52rem;
  background: url("/static/img/sign_in_text.png") center center no-repeat;
  background-size: contain;
}
.sign-in-box {
  width: 6rem;
  height: 3.7rem;
  margin: 0.74rem auto 0 auto;
}
.sign-in {
  width: 2rem;
  height: 1.86rem;
  float: left;
  background: url("/static/img/sign_in_icon.png") center center no-repeat;
  background-size: contain;
  position: relative;
}
.sign-in-7 {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
.day {
  position: absolute;
  width: 1.21rem;
  height: 0.78rem;
  bottom: -0.1rem;
  left: 50%;
  transform: translateX(-50%);
}
.day-1 {
  background: url("/static/img/day_1.png") center center no-repeat;
  background-size: contain;
}
.day-2 {
  background: url("/static/img/day_2.png") center center no-repeat;
  background-size: contain;
}
.day-3 {
  background: url("/static/img/day_3.png") center center no-repeat;
  background-size: contain;
}
.day-4 {
  background: url("/static/img/day_4.png") center center no-repeat;
  background-size: contain;
}
.day-5 {
  background: url("/static/img/day_5.png") center center no-repeat;
  background-size: contain;
}
.day-6 {
  background: url("/static/img/day_6.png") center center no-repeat;
  background-size: contain;
}
.day-7 {
  background: url("/static/img/day_7.png") center center no-repeat;
  background-size: contain;
}
.click_text {
  position: absolute;
  left: 0.63rem;
  bottom: 0.97rem;
  width: 2.66rem;
  height: 1.07rem;
  background: url("/static/img/click_text.png") no-repeat center center;
  background-size: contain;
}
.invite_text {
  position: absolute;
  right: 0.63rem;
  bottom: 0.97rem;
  width: 2.66rem;
  height: 1.07rem;
  background: url("/static/img/invite_text.png") no-repeat center center;
  background-size: contain;
}
</style>
