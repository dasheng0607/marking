<template>
    <div class="center-back">
        <div class="btn">
          <router-link to="/index"><div class="btn-left"></div></router-link>
            <router-link to="/rules"> <div class="btn-right"></div></router-link>
        </div>
        <div class="icon"></div>
        <div class="title"></div>
        <div class="pick2">
            <div v-for="(item,index) in starName" :key="item" :class="'pick-star'+(index+1)" class="start">
                <div class="span"  v-if="!starList[index+1]" ><strong>{{item}}</strong></div>
                <div class="span " v-else ><img v-if="starList[index+1]" class="pick-img" :src="starList[index+1]" alt="">{{item}}</div>
                
            </div>
            <div class="pick-moon">
               <img :src="this.myImg" alt="">
            </div>
        </div>
        <div class="getstart" v-if="!successBtn" @click="share"></div>
        <div class="getstart all-star" v-else @click="openDraw"></div>
        <div class="world">
            <strong>最多集齐5套喔，你当前是{{userData.lightNo}}套啦！</strong>
        </div>
        <pop v-if="showPop" :text1="text" :btnText="btnText" :text2="text2" @btnup="btnup" @close="close"></pop>
        <div v-if="shareFriend" @click="shareFriend = false" class="shareFriend"></div>
    </div>
</template>

<script>
import axios from "axios";
import Pop from "../components/pop.vue";
import wxShowMenu from "../../static/js/share.js";
import qs from "qs";
export default {
  name: "index",
  components: {
    Pop
  },
  data() {
    return {
      myImg:window.user.headimgurl || '',
      text:
        "太棒了！<br/>集齐七星祝福<br/>获得中秋甄选好礼40元Swisse商城现金券",
      text2: "PICK中秋甄选好礼~",
      btnText: "分享好友",
      winnerId:'',
      haveNum: "0",
      successBtn: false,
      showPop: false,
      shareFriend:false,
      customerId:"",
      starName: [
        "温暖星",
        "能量星",
        "守护星",
        "自由星",
        "幸运星",
        "快乐星",
        "智慧星"
      ],
      starList: [],
      userData: {
        lightNo: "",
        isDraw: false
      }
    };
  },
  created() {
    this.getUser();
    this.sendDot('B000020400');
  },
  mounted() {
  },
  methods: {
    myShare(){
      wxShowMenu.wxShowMenu({
        title1: '我正在抢C位，一起来抢夺C位，赢中秋礼，点击开奖！', // 分享标题
        title2: '这个中秋我要C位出道', // 分享标题
        desc1: '帮我抢C位，一起抢中秋礼，点击开抢', //分享描述
        desc2: '帮我抢C位，一起抢中秋礼，点击开抢！', //分享描述
        link1: window.location.origin + process.env.ROATER + '/#/friendStar' + '?imgUrl='+encodeURIComponent(this.myImg)+'&taropenId=' +window.openId +'&lightNo=' +this.userData.lightNo,// 分享链接
        link2: window.location.origin + process.env.ROATER + '/#/friendStar' + '?imgUrl='+encodeURIComponent(this.myImg)+'&taropenId=' +window.openId  +'&lightNo=' +this.userData.lightNo,// 分享链接
      },() =>{
        // 判断是不是最后点击月亮分享
        this.sendDot('B000020401');
        if(this.winnerId){
          // 发送请求获取礼物
          wxShowMenu.getCustomer((id) =>{
            this.customerId = id;
            // 先获取getAccessToken
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
                this.showPop = false;
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
    getUser() {
      axios
        .post(
          "/qxby/api/light/getLightInfo",
          qs.stringify({
            openId: window.openId
          }),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then(response => {
          let arr = [];
          response.data.data.lightRecords.forEach(element => {
            arr[element.position] = element.headImage;
          });
          this.starList = arr;
          if (response.data.data.isDraw) {
            this.successBtn = true;
          } else {
            this.successBtn = false;
          }
          if(response.data.data.isPrize){
            this.text =
              "太棒了！<br/>参与集七星祝福<br/>获得中秋甄选好礼" +
              response.data.data.prizeName;
            this.showPop = true;
            this.winnerId = response.data.data.winnerId;
          }
          this.userData = Object.assign({}, this.userData, response.data.data);
          this.myShare();
          console.log(this.userData);
        })
        .catch(error => {
          console.log(error);
        });
    },
    openDraw() {
        this.sendDot('B000020421')
      //   发送
      axios
        .post(
          "/qxby/api/light/openLightAward",
          qs.stringify({
            openId: window.openId,
            lightNo: this.userData.lightNo
          })
        )
        .then(response => {
          if (response.data.errMsg === "成功") {
            this.text =
              "太棒了！<br/>集齐七星祝福<br/>获得中秋甄选好礼" +
              response.data.data.prizeName;
            this.showPop = true;
            this.winnerId = response.data.data.winnerId;
            this.getUser();
          } else {
            alert(response.data.errMsg);
          }
        })
        .catch(error => {});
    },
    close() {
      this.showPop = false;
    },
    share() {
      this.sendDot('B000020421');
      this.shareFriend = true;
    },
    btnup(){
      this.shareFriend = true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
.start {
  color: rgb(185, 160, 132);
  font-size: 0.22rem;
  line-height: 0.2rem;
  width: 1.88rem;
  height: 1.88rem;
  position: absolute;
  background: url("../../static/img/star.png") center center no-repeat;
  background-size: 1.87rem 1.88rem;
}
.pick-moon {
  width: 3.33rem;
  height: 3.33rem;
  position: absolute;
  background: url("../../static/img/moon.png") center center no-repeat;
  background-size: 3.33rem 3.33rem;
  top: 1.58rem;
  left: 2.1rem;
  color: rgb(185, 160, 132);
  text-align: center;
  line-height: 3.33rem;
}
.pick-moon img{
  border-radius: 50%;
  width: 2.32rem;
  height:2.32rem;
  margin-top: 0.5rem;
}
.span {
  padding-top: 1.68rem;
}
.pick-star1 {
  top: 0px;
  left: 2.78rem;
}
.pick-star2 {
  top: 0.78rem;
  left: 1.09rem;
}
.pick-star3 {
  top: 0.78rem;
  left: 4.49rem;
}
.pick-star4 {
  top: 2.45rem;
  left: 0.68rem;
}
.pick-star5 {
  top: 2.45rem;
  left: 5.07rem;
}
.pick-star6 {
  top: 4.05rem;
  left: 1.69rem;
}
.pick-star7 {
  top: 4.05rem;
  left: 3.87rem;
}
.title {
  height: 2.66rem;
  background: url("../../static/img/title2.png") center center no-repeat;
  background-size: 5.41rem 2.66rem;
}
.pick2 {
  margin-top: 0.1rem;
  height: 6rem;
  position: relative;
}
.getstart {
  margin-top: 0.2rem;
  height: 1.07rem;
  background: url("../../static/img/get-start.png") center center no-repeat;
  background-size: 4.56rem 1.07rem;
}
.all-star {
  background: url("../../static/img/all-star.png") center center no-repeat;
  background-size: 4.94rem 1.07rem;
}
.world {
  min-height: 0.3rem;
  margin-top: 0.1rem;
  text-align: center;
  font-size: 0.26rem;
  background: linear-gradient(
    to right,
    rgb(90, 72, 53),
    rgb(214, 188, 158),
    rgb(159, 131, 101)
  );
  -webkit-background-clip: text;
  color: transparent;
}
.pick-img {
  position: absolute;
  top: 0.4rem;
  left: 0.46rem;
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
}
.shareFriend{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("../../static/img/shareFriend.png") no-repeat center 0px fixed;
  background-size: 100% 100%;
  /* background-color: #000; */
}
</style>
