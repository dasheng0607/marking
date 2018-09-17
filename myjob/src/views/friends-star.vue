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
                <div class="span"  v-if="!starList[index+1]"   @click.stop="lightUp(index+1)">{{item}}</div>
                <div class="span " v-else ><img v-if="starList[index+1]" class="pick-img" :src="starList[index+1]" alt="">{{item}}</div>
                
            </div>
            <!-- <div class="start pick-star2">
                <div class="span"  v-if="!starList[2]"  @click.stop="lightUp('2')">能量星</div>
                <div class="span " v-else ><img v-if="starList[2]" class="pick-img" :src="starList[2]" alt="">能量星</div>
            </div>
            <div class="start pick-star3">
                <div class="span" v-if="!starList[3]"  @click.stop="lightUp('3')">守护星</div>
                <div class="span " v-else ><img v-if="starList[3]" class="pick-img" :src="starList[3]" alt="">守护星</div>
            </div>
            <div class="start pick-star4">
                <div class="span"  @click.stop="lightUp('4')">自由星</div>
            </div>
            <div class="start pick-star5">
                <div class="span"  @click.stop="lightUp('5')">幸运星</div>
            </div>
            <div class="start pick-star6">
                <div class="span" @click.stop="lightUp('6')">快乐星</div>
            </div>
            <div class="start pick-star7">
                <div class="span" @click.stop="lightUp('7')">智慧星</div>
            </div> -->
            <div class="pick-moon">
              <img :src="this.myImg" alt="">
            </div>
        </div>
        <div class="getstart"></div>
        <pop v-if="mark" :text1="text" :btnText="btnText" :text2="text2" @btnup="btnup" @close="close"></pop>
    </div>
</template>

<script>
import axios from "axios";
import Pop from "../components/pop.vue";
import qs from "qs";
export default {
  name: "index",
  components: {
    Pop
  },
  data() {
    return {
      myImg:decodeURIComponent(this.$route.query.imgUrl),
      mark: false,
      openId: this.$route.query.openId,
      lightNo: this.$route.query.lightNo,
      text:
        "补签成功<br/>喜提XXX<br/>抢C位邀请好友打CALL,<br/>即可赢取中秋甄选好礼！",
      text2: "赢中秋团圆礼~",
      btnText: "我也要抢C位",
      userData: {},
      friendCanSave: false,
      reword: {
        prizeName: ""
      },
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
      friendID: "515"
    };
  },
  created() {
    this.sendDot("B000020500");
    //   获取默认点亮的星星
    this.getUser();
    console.log(this.myImg);
  },
  mounted() {},
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
    getUser() {
      axios
        .post(
          "/qxby/api/light/getLightInfoByShare",
          qs.stringify({
            openId: this.openId,
            lightNo:this.lightNo
          }),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then(response => {
          let arr = [];
          response.data.data.lightRecords.forEach(element => {
            arr[element.position] = element.headImage;
          });
          this.starList = arr;
          this.userData = Object.assign({}, this.userData, response.data.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    btnup() {
      this.sendDot('B000020522')
      this.$router.push("/index");
    },
    close() {
      this.mark = false;
    },
    lightUp(str) {
        this.sendDot("B000020521");
      axios
        .post(
          "/qxby/api/light/lightUp",
          qs.stringify({
            openId: this.openId,
            lightOpenId: window.openId,
            postison: str * 1,
            lightNo: this.lightNo
          })
        )
        .then(response => {
          if (response.data.errMsg === "成功") {
            // 重新获取数据
            this.text =
              "恭喜你！<br/>喜提" +
              response.data.data.prizeName +
              "<br/>参与抢C位活动，即可抱中秋团圆礼回家！";
            this.mark = true;
            this.getUser();
          } else {
            alert(response.data.errMsg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {
    isAll() {}
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
  font-size: 0.14rem;
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
  background: url("../../static/img/friendsGif.png") center center no-repeat;
  background-size: 4.56rem 1.07rem;
}
.pick-moon img{
  border-radius: 50%;
  width: 2.32rem;
  height:2.32rem;
  margin-top: 0.5rem;
}
.pick-img {
  position: absolute;
  top: 0.4rem;
  left: 0.46rem;
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
}
</style>
