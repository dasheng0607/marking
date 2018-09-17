<template>
    <div id="singIn">
        <div class="btn">
             <router-link to="/index"><div class="btn-left"></div></router-link>
            <router-link to="/rules"> <div class="btn-right"></div></router-link>
        </div>
        <div class="icon"></div>
        <div class="sign-in-text"></div>
        <div class="sign-in-box">
            <div class="sign-in" @click="friendSign(item.date)"
            v-for="(item,index) in newArr" :key="index" :class="'sign-in-'+ (index+1)">
                <img :src="item.headImage" alt="" v-bind:class="{ img: dataShow(item.date,today) }">
                <span class="day" :class="'day-' + (index+1)"></span>
            </div>
            <!-- <div class="sign-in-2 sign-in">
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
            <div class="sign-in-7 sign-in">
                <span class="day-7 day"></span>
            </div> -->
        </div>
        <div class="help-sign-in"></div>
        
        <!-- <div class="click_text" @click="signIn()"></div>
        <div class="invite_text"></div> -->
        <pop v-if="mark" :text1="text" :btnText="btnText" :text2="text2" @btnup="btnup" @close="close"></pop>
    </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import Pop from "../components/pop.vue";
export default {
  name: "index",
  components: {
    Pop
  },
  data() {
    return {
      mark: false,
      text: "",
      text2: "赢中秋团圆礼",
      btnText: "我也要抢C位",
      today: "",
      prizeName: "",
      openId: window.openId,
      signOpenId: this.$route.query.openId,
      signDateList: [],
      signRecords: [],
      newArr: []
    };
  },
  created() {
  
    this.sendDot('B000020300');
    this.getList();
    // this.getDateList();
  },
  mounted() {},
  methods: {
    dataShow(data1='',data2=''){
      if(!data1 || !data2) return false;
      if(new Date(data1) < new Date(data2)){
         return true;
      } else {
        return false;
      }
    },
    sendDot(code){
          axios.post(process.env.SET_DOT, {
            "platform": 2,
            "point_code":code,
            "created_time": (new Date()).getTime()
            },{headers: {'Content-Type':'application/json'}})
            .then( (response) => {
              console.log(response);
            })
            .catch( (error) => {
                console.log(error);
            });
      },
    btnup() {
      this.sendDot('B000020321');
      this.$router.replace({path: '/index'});
    },
    close() {
      this.mark = false;
    },
    getList() {
      axios
        .all([
          axios.post("/qxby/api/sign/getSignDateList"),
          axios.post(
            "/qxby/api/sign/getSignListByOpenId?openId=" + this.signOpenId,
            {}
          )
        ])
        .then((response, typeResp) => {
          console.log(response);
          this.today = response[0].data.data.toDay;
          this.signDateList = response[0].data.data.signDateList;
          this.signRecords = response[1].data.data.signRecords;
          console.log(this.signDateList, this.signRecords);

          let self = this;
          this.newArr = [];
          this.signDateList.forEach(function(v1) {
            self.newArr.push({ date: v1, headImage: ''});
          });

        console.log(this.newArr);
          this.newArr.forEach(function(v1) {
            self.signRecords.forEach(function(v2) {
              
              if (v1.date == v2.date) {
                console.log(v2);
                v1.headImage = v2.headImage;
              } 
            });
          });

          console.log(this.newArr);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getDateList() {
      axios
        .post("/qxby/api/sign/getSignDateList")
        .then(response => {
          console.log(response);
          if (response.data.errCode == 0) {
            this.today = response.data.data.toDay;
            this.signDateList = response.data.data.signDateList;
            console.log(this.today);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    friendSign(date) {
      axios
        .post(
          "/qxby/api/sign/addSign",
          qs.stringify({
            openId: this.signOpenId,
            signOpenId: this.openId,
            signDate: date
          })
        )
        .then(response => {
          console.log(response);
          if (response.data.errCode == 0) {
            this.mark = true;
            this.prizeName = response.data.data.prizeName || "";
            this.text = "恭喜你<br/>喜提" + this.prizeName + 
            "<br/>抢C位，邀请好友打CALL<br/>即可赢得中秋甄选好礼！";
            this.getList();
          } else {
            alert(response.data.errMsg);
          }
        })
        .catch(error => {
          console.log(error);
        });
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
.help-sign-in {
    width: 5.45rem;
    height: 1.14rem;
    margin: 2rem auto 0;
    background: url("../../static/img/help_sign_in.png") no-repeat center center;
    background-size: contain;
}
</style>
