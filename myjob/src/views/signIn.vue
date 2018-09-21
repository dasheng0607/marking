<template>
    <div id="singIn">
        <div class="btn">
             <router-link to="/index"><div class="btn-left"></div></router-link>
            <router-link to="/rules"> <div class="btn-right"></div></router-link>
        </div>
        <div class="icon"></div>
        <div class="sign-in-text"></div>
        <div class="sign-in-box">
            <div class="sign-in" 
            v-for="(item,index) in newArr" :key="index" :class="'sign-in-'+ (index+1)">
                <img :src="item.headImage" alt="" v-bind:class="{ img: dataShow(item.date,today) }">
                <span class="day" :class="'day-' + (index+1)"></span>
            </div>
        </div>
        
        <div class="click_text" @click="signIn()"></div>
        <div class="invite_text" @click="invite()"></div>
        <pop v-if="mark" :text1="text" :btnText="btnText" :text2="text2" @btnup="btnup" @close="close"></pop>
        <div v-if="shareFriend" @click="shareFriend = false" class="shareFriend"></div>
    </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import Pop from "../components/pop.vue";
import wxShowMenu from "../../static/js/share.js";
export default {
  name: "index",
  components: {
    Pop
  },
  data() {
    return {
      myImg:window.user.headimgurl || '',
      mark: false,
      shareFriend:false,
      text: "",
      text2: "一起PICK中秋团圆礼",
      btnText: "赶紧向朋友炫耀",
      today: "",
      prizeName: "",
      openId: window.openId,
      signDateList: [],
      signRecords: [],
      newArr: [],
      winnerId: '',
      customerId: '',
    };
  },
  created() {
    this.sendDot("B000020200");
    this.getList();
    // this.getDateList();
  },
  mounted() {
    
  },
  methods: {
    share(){
      wxShowMenu.wxShowMenu({
        title1: '这个中秋我要C位出道，快来帮我补卡领中秋团圆礼！', // 分享标题
        title2: '这个中秋我要C位出道', // 分享标题
        desc1: '快来帮我补卡领中秋团圆礼！', //分享描述
        desc2: '快来帮我补卡领中秋团圆礼！', //分享描述
        link1: window.location.origin + process.env.ROATER + '/#/friendSignIn' + '?imgUrl='+encodeURIComponent(this.myImg)+'&taropenId=' +window.openId,// 分享链接
        link2: window.location.origin + process.env.ROATER + '/#/friendSignIn' + '?imgUrl='+encodeURIComponent(this.myImg)+'&taropenId=' +window.openId,// 分享链接
      },() =>{
        // 判断是不是连续签到三天
        if(this.winnerId){
          // 发送请求获取礼物
          wxShowMenu.getCustomer((id) =>{
            this.customerId = id;
            wxShowMenu.getAccessToken(id,(data) =>{
              axios
              .post(
                '/qxby/api/ticket/exchangePrize',
                qs.stringify({
                  openId: window.openId,
                  customerId: this.customerId,
                  winnerId: this.winnerId,
                  accessToken:data.accessToken
                }),
                { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
              )
              .then(response => {
                console.log(response);
                this.mark = false;
              })
              .catch(error => {
                console.log(error);
              });
            })
          },(err) =>{
            window.location.href = process.env.LOGIN;
          })

        }
      })
    },
    dataShow(data1='',data2=''){
      if(!data1 || !data2) return false;
      if(new Date(data1) < new Date(data2)){
         return true;
      } else {
        return false;
      }
    },
    sendDot(code) {
      axios
        .post(
          process.env.SET_DOT,
          {
            platform: 2,
            point_code: code,
            user_mark:window.openId,
            customer_id:window.customerId,
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
    btnup() {
      this.shareFriend = true;
    },
    close() {
      this.mark = false;
    },
    getList() {
      axios
        .all([
          axios.post("/qxby/api/sign/getSignDateList"),
          axios.post(
            "/qxby/api/sign/getSignListByOpenId?openId=" + this.openId,
            {}
          )
        ])
        .then((response, typeResp) => {
          this.share();
          this.today = response[0].data.data.toDay;
          this.signDateList = response[0].data.data.signDateList;
          this.signRecords = response[1].data.data.signRecords;
          if(response[1].data.data.isPrize){
            this.mark = true;
            this.prizeName = response[1].data.data.prizeName || "";
            this.text = "恭喜你<br/>喜提" + this.prizeName + "<br/>";
            this.winnerId = response[1].data.data.winnerId;
          }
          let self = this;
          this.newArr = [];
          this.signDateList.forEach(function(v1) {
            self.newArr.push({ date: v1, headImage: "" });
          });

          this.newArr.forEach(function(v1) {
            self.signRecords.forEach(function(v2) {
              if (v1.date == v2.date) {
                v1.headImage = v2.headImage;
              }
            });
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    getDateList() {
      axios
        .post("/qxby/api/sign/getSignDateList")
        .then(response => {
          if (response.data.errCode == 0) {
            this.today = response.data.data.toDay;
            this.signDateList = response.data.data.signDateList;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    signIn() {
      this.sendDot("B000020221");
      axios
        .post(
          "/qxby/api/sign/addSign",
          qs.stringify({
            openId: this.openId,
            signOpenId: this.openId,
            signDate: this.today
          })
        )
        .then(response => {
          if (response.data.errCode == 0) {
            if (response.data.data.hasOwnProperty("prizeName")) {
              this.mark = true;
              this.prizeName = response.data.data.prizeName || "";
              this.text = "恭喜你<br/>喜提" + this.prizeName + "<br/>";
              this.winnerId = response.data.data.winnerId;
            }
            this.getList();
            console.log("sign", response.data.data);
          } else {
            alert(response.data.errMsg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    invite() {
      this.sendDot("B000020222");
      this.shareFriend = true;
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
  background: url("../../static/img/sign_in_bg.png") no-repeat center -0.7rem fixed;
  background-size: 7.5rem 12.8rem;
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
  background: url("../../static/img/index_icon.png") left center no-repeat;
  background-size: 1.11rem 0.33rem;
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
  margin-top: 0.1rem;
  height: 0.46rem;
  background: url("../../static/img/icon3.png") center center no-repeat;
  background-size: 2.45rem 0.47rem;
}
.sign-in-text {
  margin-top: 0.3rem;
  height: 1.52rem;
  background: url("../../static/img/sign_in_text.png") center center no-repeat;
  background-size: 4.97rem 1.52rem;
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
  background: url("../../static/img/sign_in_icon.png") center center no-repeat;
  background-size: 1.78rem 1.86rem;
  position: relative;
  img {
    display: block;
    width: 1.13rem;
    height: 1.13rem;
    background: url("../../static/img/sign_in_icon1.png") center center no-repeat;
    background-size: 0.89rem 0.89rem;
    position: absolute;
    top: 0.42rem;
    left: 0.5rem;
  }
  .img{
    background: url("../../static/img/sign_in_icon2.png") center center no-repeat;
    background-size: 0.89rem 0.89rem;
  }
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
  background: url("../../static/img/day_1.png") center center no-repeat;
  background-size: 1.21rem 0.78rem;
}
.day-2 {
  background: url("../../static/img/day_2.png") center center no-repeat;
  background-size: 1.21rem 0.78rem;
}
.day-3 {
  background: url("../../static/img/day_3.png") center center no-repeat;
  background-size: 1.21rem 0.78rem;
}
.day-4 {
  background: url("../../static/img/day_4.png") center center no-repeat;
  background-size: 1.21rem 0.78rem;
}
.day-5 {
  background: url("../../static/img/day_5.png") center center no-repeat;
  background-size: 1.21rem 0.78rem;
}
.day-6 {
  background: url("../../static/img/day_6.png") center center no-repeat;
  background-size: 1.21rem 0.78rem;
}
.day-7 {
  background: url("../../static/img/day_7.png") center center no-repeat;
  background-size: 1.21rem 0.78rem;
}
.click_text {
  position: absolute;
  left: 0.63rem;
  top: 10.05rem;
  width: 2.66rem;
  height: 1.07rem;
  background: url("../../static/img/click_text.png") no-repeat center center;
  background-size: 2.66rem 1.07rem;
}
.invite_text {
  position: absolute;
  right: 0.63rem;
  top: 10.05rem;
  width: 2.66rem;
  height: 1.07rem;
  background: url("../../static/img/invite_text.png") no-repeat center center;
  background-size: 2.66rem 1.07rem;
}
.shareFriend{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
   background: url("../../static/img/shareFriend.png") no-repeat center 0px fixed;
  background-size: 100vw 100vh;
  // background-color: #000;
}
</style>
