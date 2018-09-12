<template>
    <div id="singIn">
        <div class="btn">
             <router-link to="/index"><div class="btn-left"></div></router-link>
            <router-link to="/rules"> <div class="btn-right"></div></router-link>
        </div>
        <div class="icon"></div>
        <div class="sign-in-text"></div>
        <div class="sign-in-box">
            <div class="sign-in" @click="friendSign()"
            v-for="(item,index) in signList" :key="index" :class="'sign-in-'+ (index+1)">
                <img :src="item.headImage" alt="">
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
      openId: "11",
      signOpenId: '22',
      signDateList: [],
      signRecords: []
    };
  },
  created() {
  

    this.getList();
    this.submitUserMsg();
    // this.getDateList();
  },
  mounted() {},
  computed: {
    signList() {
      let self = this;
      let newArr = [];
      this.signDateList.forEach(function(v1) {
        newArr.push({ date: v1 });
      });

      newArr.forEach(function(v1) {
        self.signRecords.forEach(function(v2) {
          if (v1.date == v2.date) {
            v1.headImage = v2.headImage;
          }else {
            v1.headImage = '';
          }
        });
      })

      console.log(newArr);
      return newArr;
    }
  },
  methods: {
    btnup() {
      alert("提交事件");
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
          console.log(response);
          this.today = response[0].data.data.toDay;
          this.signDateList = response[0].data.data.signDateList;
          this.signRecords = response[1].data.data.signRecords;
          console.log(this.signDateList, this.signRecords);
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
    submitUserMsg() {
      //提交用户信息
      axios
        .post(
          "/qxby/api/member/addMember?",
          qs.stringify({
            openId: this.openId,
            customerId: "",
            headImageUrl:
              "https://ss0.baidu.com/73t1bjeh1BF3odCf/it/u=3075942851,1445479430&fm=85&s=8DFAEE049A647D1506BD849003005097",
            nickName: "test2"
          })
        )
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    signIn() {
      axios
        .post(
          "/qxby/api/sign/addSign",
          qs.stringify({
            openId: this.openId,
            signOpenId: this.signOpenId,
            signDate: this.today
          })
        )
        .then(response => {
          console.log(response);
          if (response.data.errCode == 0) {
            this.mark = true;
            this.prizeName = response.data.data.prizeName || "";
            this.text = "恭喜你<br/>喜提" + this.prizeName + 
            "<br/>抢C位，邀请好友打CALL<br/>即可赢得中秋甄选好礼！";
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
  img {
    display: block;
    width: 1.13rem;
    height: 1.13rem;
    background: url("/static/img/sign_in_icon1.png") center center no-repeat;
    background-size: contain;
    position: absolute;
    top: 0.42rem;
    left: 0.5rem;
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
