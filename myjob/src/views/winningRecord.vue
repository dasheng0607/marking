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
                    <i class="star-icon"></i>{{item.date}} {{item.prizeInfo}}
                </p>
            </div>
        </div>
        <div style="text-align:center;">
          <div class="delivery-msg" @click="showBg()"></div>
        </div>
        
        <div class="bg" style="font-size:0.24rem;color: #6f4d20;" v-if="bgFlag" @click.self="bgFlag = false" >
            <div class="delivery-box" >
                <flexbox>
                  <flexbox-item :span="6"><div class="flex-demo text-r">收件人姓名：</div></flexbox-item>
                  <flexbox-item><div class="flex-demo"><x-input v-model="address.name" placeholder="输入姓名"></x-input></div></flexbox-item>
                </flexbox>
                <flexbox>
                  <flexbox-item :span="6"><div class="flex-demo text-r">收件人手机号码：</div></flexbox-item>
                  <flexbox-item><div class="flex-demo"><x-input  v-model="address.phone" placeholder="输入手机号码"></x-input></div></flexbox-item>
                </flexbox>
                <flexbox  class="address" style="font-size:0.24rem;box-sizing: border-box; padding-top:0.21rem">
                  <flexbox-item :span="2"><div class="flex-demo">地址：</div></flexbox-item>
                  <flexbox-item :span="10">
                    <div class="flex-demo">
                      <span @click.stop="address.province.isShow = true">
                        {{address.province.value[0] ? address.province.value[0].split('-')[0] : '请选择'}}
                      </span> - 
                      <span @click.stop="address.city.isShow = true">
                        {{address.city.value[0] ? address.city.value[0].split('-')[0] : '请选择'}}
                      </span> -
                      <span @click.stop="address.area.isShow = true">
                        {{address.area.value[0] ? address.area.value[0].split('-')[0] : '请选择'}}
                      </span>
                    </div>
                  </flexbox-item>
                </flexbox>
                <flexbox>
                  <flexbox-item :span="2"><div class="flex-demo text-r" ></div></flexbox-item>
                  <flexbox-item><div class="flex-demo"><x-textarea :rows="2" :autosize="true" v-model="address.addr" placeholder="请输入详细地址" ></x-textarea></div></flexbox-item>
                </flexbox>
                <div class="save-address" @click.stop="saveNewAddress"></div>
            </div>
            
        <popup-picker :show.sync="address.province.isShow" :show-cell="false" title="TEST" :data="address.province.tab" @on-change="change1" v-model="address.province.value"></popup-picker>
        <popup-picker :show.sync="address.city.isShow" @on-change="change2" :show-cell="false" title="TEST" :data="address.city.tab" v-model="address.city.value"></popup-picker>
        <popup-picker :show.sync="address.area.isShow" @on-change="change3" :show-cell="false" title="TEST" :data="address.area.tab" v-model="address.area.value"></popup-picker>
          
        </div>
    </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
// import { Picker, Popup } from "vux";
import { PopupPicker, Flexbox, FlexboxItem, XInput, XTextarea } from "vux";
import wxShowMenu from "../../static/js/share.js";
export default {
  name: "index",
  data() {
    return {
      customerId:'',
      showPopupPicker: false,
      userName: "",
      openId: window.openId,
      recordList: [],
      bgFlag: false,
      address: {
        province: {
          value: ["北京-001001"],
          tab: [],
          isShow: false
        },
        city: {
          value: [""],
          tab: [],
          isShow: false
        },
        area: {
          value: [""],
          tab: [],
          isShow: false
        },
        name: "",
        phone: "",
        addr: ""
      }
    };
  },
  components: {
    PopupPicker,
    Flexbox,
    FlexboxItem,
    XInput,
    XTextarea
  },
  created() {
    wxShowMenu.getCustomer((id) =>{
      this.customerId = id;
      this.sendDot("B000020600");
      this.getList();
      this.getAddress();
      this.addressInfo();
    },(err) =>{
      window.location.href = process.env.LOGIN;
    })
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
    getList() {
      wxShowMenu.getAccessToken(this.customerId,(data) =>{
        axios
          .post(
            "/qxby/api/ticket/getPrizeListByOpenId",
            qs.stringify({
              openId: window.openId,
              customerId: this.customerId,
              accessToken:data.accessToken,
              pageIndex: 1,
              pageSize: 100
            })
          )
          .then(response => {
            if (response.data.errCode == 0) {
              this.recordList = response.data.data.winnerList;
            }
          })
          .catch(error => {
            console.log(error);
          });
      })
    },
    addressInfo() {
      axios
        .post(
          "/qxby/api/address/getAddress",
          qs.stringify({
            openId: window.openId
          })
        )
        .then(response => {
          console.log("response", response);
          if (response.data.errMsg === "成功") {
            this.address.phone ||
              !this.address.name ||
              !this.address.addr ||
              !this.address.province.value[0] ||
              !this.address.city.value[0] ||
              !this.address.area.value[0];
            this.address.phone = response.data.data.mobile;
            this.address.name = response.data.data.name;
            this.address.addr = response.data.data.addr;
            this.address.province.value[0] =
              response.data.data.provinceName +
              "-" +
              response.data.data.province;
            this.address.city.value[0] =
              response.data.data.cityName + "-" + response.data.data.city;
            this.address.area.value[0] =
              response.data.data.areaName + "-" + response.data.data.area;
            this.getAddress(response.data.data.province, "city");
            this.getAddress(response.data.data.city, "area");
            // 获取市区级内容
          } else {
            this.getAddress(
              this.address.province.value[0].split("-")[1],
              "city"
            );
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getAddress(code = "0", tar = "province") {
      axios
        .post(
          "/qxby/api/address/linkProvinceAndCity",
          qs.stringify({
            code: code
          })
        )
        .then(response => {
          this.address[tar].tab = [
            response.data.data.list.map(ele => {
              return {
                value: ele.name + "-" + ele.code,
                name: ele.name
              };
            })
          ];
        })
        .catch(error => {
          console.log(error);
        });
    },
    showBg() {
      this.bgFlag = true;
    },
    change1() {
      //获取市级级清空区级
      console.log(this.address.province.value[0].split("-")[1]);
      this.address.city.value[0] = "";
      this.getAddress(this.address.province.value[0].split("-")[1], "city");
      this.address.area.value[0] = "";
      this.address.area.tab = [[]];
    },
    change2() {
      // 有值的时候变化
      if (this.address.city.value[0]) {
        this.getAddress(this.address.city.value[0].split("-")[1], "area");
        this.address.area.value[0] = "";
      }
    },
    change3() {
      // console.log('new Value', value)
    },
    saveNewAddress() {
      // 判断不能为空
      console.log(this.address);
      if (
        !this.address.phone ||
        !this.address.name ||
        !this.address.addr ||
        !this.address.province.value[0] ||
        !this.address.city.value[0] ||
        !this.address.area.value[0]
      ) {
        alert("请输入完整地址信息");
        return;
      }
      axios
        .post(
          "/qxby/api/address/addOrUpdateAddress",
          qs.stringify({
            openId: window.openId,
            province: this.address.province.value[0].split("-")[1],
            city: this.address.city.value[0].split("-")[1],
            area: this.address.area.value[0].split("-")[1],
            provinceName: this.address.province.value[0].split("-")[0],
            cityName: this.address.city.value[0].split("-")[0],
            areaName: this.address.area.value[0].split("-")[0],
            mobile: this.address.phone,
            name: this.address.name,
            addr: this.address.addr
          })
        )
        .then(response => {
          console.log(response);
          if (response.data.errMsg === "成功") {
            alert("提交成功");
            this.bgFlag = false;
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
#winningRecord {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: url("../../static/img/background.png") no-repeat center 0px fixed;
  background-size: 100% 100%;
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
  background-size: contain;
}
.btn-right {
  margin-right: 0.64rem;
  float: right;
  width: 1.69rem;
  height: 100%;
  background: url("../../static/img/icon2.png") left center no-repeat;
  background-size: contain;
}
.icon {
  margin-top: 0.1rem;
  height: 0.46rem;
  background: url("../../static/img/icon3.png") center center no-repeat;
  background-size: contain;
}
.pick {
  margin-top: 0.11rem;
  height: 0.54rem;
  background: url("../../static/img/pick.png") center center no-repeat;
  background-size: contain;
}
.title {
  margin-top: 0.28rem;
  height: 2.84rem;
  background: url("../../static/img/title.png") center center no-repeat;
  background-size: contain;
}
.pick2 {
  margin-top: 0.63rem;
  height: 1.15rem;
  background: url("../../static/img/pick2.png") center center no-repeat;
  background-size: contain;
}
.bottom {
  margin-top: 0.46rem;
  height: 4.38rem;
  background: url("../../static/img/gift.png") no-repeat;
  background-position-x: 1.05rem;
  background-position-y: 0;
  background-size: 4.48rem 3.51rem;
}
.banner {
  padding-top: 2.48rem;
  height: 2.16rem;
  background: url("../../static/img/banner1.png") no-repeat;
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
  background: url("../../static/img/wish_text.png") no-repeat center center;
  background-size: contain;
}
.record-box {
  width: 5.29rem;
  height: 6.24rem;
  margin: 0.65rem auto 0 auto;
  background: url("../../static/img/record_box.png") no-repeat center center;
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
    padding-left: 0.42rem;
    font-size: 0.26rem;
    color: #c3a281;
    text-align: left;
    margin-bottom: 0.3rem;
    position: relative;
    .star-icon {
      position: absolute;
      top: -0.1rem;
      left: -0.18rem;
      display: inline-block;
      width: 0.67rem;
      height: 0.67rem;
      background: url("../../static/img/star_icon.png") no-repeat center center;
      background-size: contain;
    }
  }
}
.delivery-msg {
  display: inline-block;
  width: 2.97rem;
  height: 1.07rem;
  // margin: 0.52rem auto 0 auto;
  background: url("../../static/img/delivery_msg.png") no-repeat center center;
  background-size: contain;
}

.bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(105, 103, 103, 0.7);
  z-index: 9;
  .delivery-box {
    width: 5.29rem;
    min-height: 4.56rem;
    padding: 0.4rem 0.3rem;
    box-sizing: border-box;
    text-align: left;
    background-color: #fff;
    border: 0.06rem solid rgb(136, 100, 59);
    border-radius: 10%;
    // background: url("../../static/img/delivery_bg.png") no-repeat center center;
    // background-size: contain;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    p,
    span {
      color: #6f4d20;
      font-size: 0.24rem;
    }
    p {
      box-sizing: border-box;
      margin-bottom: 0.3rem;
      padding-left: 0.35rem;
    }
    span {
      display: inline-block;
      height: 0.3rem;
      border-bottom: 1px solid #ae8863;
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
    .flex-demo span {
      width: auto;
      padding: 0.06rem 0;
    }
    .address-1 {
      width: 3.22rem;
      height: 0.3rem;
      margin-left: 1.08rem;
      padding: 0;
      border-bottom: 1px solid #ae8863;
    }
    .save-address {
      width: 2.32rem;
      height: 0.68rem;
      margin: 0.08rem auto;
      background: url("../../static/img/save_address.png") no-repeat center
        center;
      background-size: contain;
    }
  }
}
</style>
