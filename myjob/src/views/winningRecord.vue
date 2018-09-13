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
                <!-- <p class="address">地址：</p> -->
                <flexbox style="font-size:12px;">
                  <flexbox-item :span="6"><div class="flex-demo">6/12</div></flexbox-item>
                  <flexbox-item :span="2"><div class="flex-demo">
                    <popup-picker title="请选择" :data="list3" :columns="3" v-model="value4" show-name></popup-picker></div>
                  </flexbox-item>
                  <flexbox-item ><div class="flex-demo">rest</div></flexbox-item>
                </flexbox>
                <!-- <p class="address">地址：<popup-picker :title="请选择" :data="list3" :columns="3" v-model="value4" show-name></popup-picker></p>
                <p class="address-1">
                  <div  style="width:1rem;font-size:12px;">
                    <popup-picker title="请选择" :data="list3" :columns="3" v-model="value4" show-name></popup-picker>
                  </div>
          -<span @click="address.province.isShow = false;address.city.isShow = true;address.area.isShow = false">{{address.city.value[0].name || '请选择'}}</span>-<span @click="address.province.isShow = false;address.city.isShow = false;address.area.isShow = true">{{address.area.value[0].name || '请选择'}}</span></p>
                <div class="save-address" @click="bgFlag =false"></div> -->
            </div>
            
        <div style="position:absolute;bottom:0;left:0;right:0">
          <group v-if="address.province.isShow">
           <picker :data='address.province.tab' v-model='address.province.value' @on-change='change1'></picker>
          </group>
          <group v-if="address.city.isShow">
            <picker :data='address.city.tab' v-model='address.city.value' @on-change='change2'></picker>
          </group>
          <group v-if="address.area.isShow">
            <picker :data='address.area.tab' v-model='address.area.value' @on-change='change3'></picker>
          </group>
        </div>
          
        </div>
    </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
// import { Picker, Popup } from "vux";
import {  Group, Picker ,PopupPicker , Flexbox, FlexboxItem} from 'vux'
let years = []
for (var i = 2000; i <= 2030; i++) {
  years.push({
    name: i + '年',
    value: i + ''
  })
}
export default {
  name: "index",
  data() {
    return {
      userName: "1111",
      openId: 11,
      recordList: [],
      bgFlag: false,
      province: [],
      // 
      years: [years],
      year1: [''],
      address: {
        province:{
          value:[''],
          tab:[],
          isShow:false,
        },
        city:{
          value:[''],
          tab:[],
          isShow:false,
        },
        area:{
          value:[''],
          tab:[],
          isShow:false,
        },
      },
      title4: '联动显示文字',
      value4: [],
      list3: [{
        name: '中国',
        value: 'china',
        parent: 0
      }, {
        name: '美国',
        value: 'USA',
        parent: 0
      }, {
        name: '广东',
        value: 'china001',
        parent: 'china'
      }, {
        name: '广西',
        value: 'china002',
        parent: 'china'
      }, {
        name: '美国001',
        value: 'usa001',
        parent: 'USA'
      }, {
        name: '美国002',
        value: 'usa002',
        parent: 'USA'
      }, {
        name: '广州',
        value: 'gz',
        parent: 'china001'
      }, {
        name: '深圳',
        value: 'sz',
        parent: 'china001'
      }, {
        name: '广西001',
        value: 'gx001',
        parent: 'china002'
      }, {
        name: '广西002',
        value: 'gx002',
        parent: 'china002'
      }, {
        name: '美国001_001',
        value: '0003',
        parent: 'usa001'
      }, {
        name: '美国001_002',
        value: '0004',
        parent: 'usa001'
      }, {
        name: '美国002_001',
        value: '0005',
        parent: 'usa002'
      }, {
        name: '美国002_002',
        value: '0006',
        parent: 'usa002'
      }],
    };
  },
  components: {
    Picker,
    Group,
    PopupPicker,
    Flexbox,
    FlexboxItem
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
    getAddress(code='0',tar='province') {
      axios
        .post(
          "/qxby/api/address/linkProvinceAndCity",
          qs.stringify({
            code: "0"
          })
        )
        .then(response => {
          console.log(response);
          this.$nextTick(() => {
            this.address[tar].tab = [response.data.data.list.map((ele) =>{
              return {
                value : ele.code,
                name:ele.name
              }
            })];
            console.log(this.address[tar].tab);
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    showBg() {
      this.bgFlag = true;
    },
    change1 (value) {
      console.log('new Value', value)
    },
    change2 (value) {
      console.log('new Value', value)
    },
    change3 (value) {
      console.log('new Value', value)
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
  background: url("../../static/img/background.png") no-repeat center 0px fixed;
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
  background: url("../../static/img/delivery_msg.png") no-repeat center center;
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
    background: url("../../static/img/delivery_bg.png") no-repeat center center;
    background-size: contain;
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
      margin: 0.68rem auto;
      background: url("../../static/img/save_address.png") no-repeat center center;
      background-size: contain;
    }
  }
}
</style>
