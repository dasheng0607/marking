<template>
    <div id="winningRecord">
        <div class="btn">
             <router-link to="/index"><div class="btn-left"></div></router-link>
        </div>
        <div class="icon"></div>
        <div class="username-text">Hi，亲爱的{{userName}}</div>
        <div class="wish-text"></div>
        <div class="record-box">
            <div class="record-content">
                <p class="record-text" v-for="(item,index) in recordList" :key="index">
                    {{item.date}} {{item.prizeInfo}}
                </p>
            </div>
        </div>
        <div class="delivery-msg" @click="showBg()"></div>
        <div class="bg" v-if="bgFlag">
            <div class="delivery-box">
                <p class="name">收件人姓名：<span></span></p>
                <p class="phone">收件人手机号码：<span></span></p>
                <p class="address">地址：<span></span></p>
                <p class="address-1"></p>
                <div class="save-address"></div>
            </div>
        </div>
         <!-- <popup v-model="show_store_flag" @on-hide="confirm_store">
            <Picker ref=""
              :data=""
              v-model=""
              :columns=3
              @on-change="change_store"></Picker>
        </popup> -->
    </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import { Popup, Picker } from "vux";
export default {
  name: "index",
  data() {
    return {
      userName: "1111",
      openId: 11,
      recordList: [],
      bgFlag: false
    };
  },
  created() {
    this.getList();
    this.getAddress();
  },
  mounted() {},
  methods: {
    getList() {
      axios
        .post(
          "/qxby/api/ticket/getPrizeListByOpenId",
          qs.stringify({
            openId: this.openId,
            customerId: 1111,
            pageIndex: 1,
            pageSize: 100
          })
        )
        .then(response => {
          console.log(response);
          if (response.data.errCode == 0) {
            this.recordList = response.data.data.winnerList;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getAddress() {
      axios
        .post(
          "/qxby/api/address/linkProvinceAndCity",
          qs.stringify({
            code: "001006"
          })
        )
        .then(response => {
          console.log(response);
          if (response.data.errCode == 0) {
            this.recordList = response.data.data.winnerList;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    showBg() {
      this.bgFlag = true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
#winningRecord {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url("/static/img/background.png") no-repeat center 0px fixed;
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
.pick {
  margin-top: 0.11rem;
  height: 0.54rem;
  background: url("/static/img/pick.png") center center no-repeat;
  background-size: contain;
}
.title {
  margin-top: 0.28rem;
  height: 2.84rem;
  background: url("/static/img/title.png") center center no-repeat;
  background-size: contain;
}
.pick2 {
  margin-top: 0.63rem;
  height: 1.15rem;
  background: url("/static/img/pick2.png") center center no-repeat;
  background-size: contain;
}
.bottom {
  margin-top: 0.46rem;
  height: 4.38rem;
  background: url("/static/img/gift.png") no-repeat;
  background-position-x: 1.05rem;
  background-position-y: 0;
  background-size: 4.48rem 3.51rem;
}
.banner {
  padding-top: 2.48rem;
  height: 2.16rem;
  background: url("/static/img/banner1.png") no-repeat;
  background-position-x: 0;
  background-position-y: 2.48rem;
  background-size: contain;
}
.username-text {
  font-size: 0.36rem;
  text-align: center;
  color: #977c61;
  margin-top: 0.22rem;
}
.wish-text {
  width: 5.56rem;
  height: 1.48rem;
  margin: 0.34rem auto 0 auto;
  background: url("/static/img/wish_text.png") no-repeat center center;
  background-size: contain;
}
.record-box {
  width: 5.29rem;
  height: 6.24rem;
  margin: 0.65rem auto 0 auto;
  background: url("/static/img/record_box.png") no-repeat center center;
  background-size: contain;
  padding: 0.6rem 0.5rem;
  box-sizing: border-box;
  position: relative;
  .record-content {
    width: 4.3rem;
    height: 5.3rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    overflow: auto;
  }
  .record-text {
    padding-left: 0.38rem;
    font-size: 0.24rem;
    color: #c3a281;
    text-align: left;
    margin-bottom: 0.3rem;
  }
}
.delivery-msg {
  width: 2.97rem;
  height: 1.07rem;
  margin: 0.52rem auto 0 auto;
  background: url("/static/img/delivery_msg.png") no-repeat center center;
  background-size: contain;
}
.bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(105, 103, 103, 0.7);
  z-index: 9;
  .delivery-box {
    width: 5.29rem;
    height: 5.56rem;
    padding: 1.2rem 0.3rem;
    box-sizing: border-box;
    text-align: left;
    background: url("/static/img/delivery_bg.png") no-repeat center center;
    background-size: contain;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    p, span {
        color: #6F4D20;
        font-size: 0.24rem;
    }
    p {
        margin-bottom: 0.3rem;
        padding-left: 0.35rem;
    }
    span {
        display: inline-block;
        height: 0.3rem;
        border-bottom: 1px solid #AE8863;
    }
    .name span {
        width: 2.48rem;
    }
    .phone span {
        width: 1.96rem;
    }
    .address span {
        width: 3.22rem;
    }
    .address-1 {
        width: 3.22rem;
        height: 0.3rem;
        margin-left: 1.08rem;
        padding: 0;
        border-bottom: 1px solid #AE8863;
    }
    .save-address {
        width: 2.32rem;
        height: 0.68rem;
        margin: 0.68rem auto;
        background: url("/static/img/save_address.png") no-repeat center center;
        background-size: contain;
    }
  }
}
</style>
