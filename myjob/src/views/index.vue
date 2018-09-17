<template>
    <div class="center-back">
        <div class="btn">
            <router-link to="/winningRecord"><div class="btn-left" @click="goRecord()"></div></router-link>
            <router-link to="/rules"><div class="btn-right" @click="goRules()"></div></router-link>
        </div>
        <div class="icon"></div>
         <router-link to="/signIn">
            <div class="pick" @click="goSignIn()"></div>
         </router-link>
        <div class="title"></div>
         <router-link to="/getstar">
             <div class="pick2" @click="goStar()"></div>
         </router-link>
        <div class="bottom">
          <a href="http://www.swisse-china.com.cn/swisse-wmall/activityDemo/shoppingGuide/index.html?_campaign=20180916151543_13739">
            <div class="banner">
            </div>
          </a>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {};
  },
  created() {
      this.sendDot('B000020100')
  },
  methods: {
    sendDot(code) {
      axios
        .post(
          process.env.SET_DOT,
          {
            platform: 2,
            point_code: code,
            created_time: new Date().getTime()
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    goSignIn() {
         this.sendDot('B000020121')
    },
    goStar() {
         this.sendDot('B000020122')
    },
    goRecord() {
         this.sendDot('B000020125')
    },
     goRules() {
         this.sendDot('B000020124')
    }
  }
};
</script>
<style scoped>
.center-back {
  position: relative;
  min-height: 100%;
  width: 100%;
  background: url("../../static/img/background.png") no-repeat center 0px fixed;
  background-size: 100vw 100vh;
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
  background: url("../../static/img/icon1.png") left center no-repeat;
  background-size: 1.61rem 0.34rem;
}
.btn-right {
  margin-right: 0.64rem;
  float: right;
  width: 1.69rem;
  height: 100%;
  background: url("../../static/img/icon2.png") left center no-repeat;
  background-size: 1.68rem 0.32rem;
}
.icon {
  margin-top: 0.3rem;
  height: 0.46rem;
  background: url("../../static/img/icon3.png") center center no-repeat;
  background-size: 2.45rem 0.47rem;
}
.pick {
  padding: 0rem 1.3rem;
  margin-top: 0.11rem;
  height: 0.54rem;
  background: url("../../static/img/newpick.png") center center no-repeat;
  background-size: 4.81rem 0.54rem;
}
.title {
  z-index: 999;
  margin-top: 0.5rem;
  height: 2.84rem;
  background: url("../../static/img/title.png") center center no-repeat;
  background-size: 5.11rem 2.84rem;
}
.pick2 {
  margin-top: 0.63rem;
  padding: 0 1.4rem;
  height: 1.15rem;
  background: url("../../static/img/pick2.png") center center no-repeat;
  background-size: 4.56rem 1.13rem;
}
.bottom {
  margin-top: 0.46rem;
  width: 100vw;
  height: 4.38rem;
  background: url("../../static/img/gift.png") no-repeat;
  background-position-x: 1.05rem;
  background-position-y: 0;
  background-size: 4.48rem 3.51rem;
  position: absolute;
  bottom: 0;
}
.banner {
    position: absolute;
    bottom: 0;
  padding-top: 2.48rem;
  width: 100vw;
  height: 2.16rem;
  background: url("../../static/img/banner1.png") no-repeat;
  background-position-x: 0;
  background-position-y: 2.48rem;
  background-size: 7.5rem 2.17rem;
}
</style>
