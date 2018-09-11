<template>
    <div class="center-back">
        <div class="btn">
            <router-link to="/index"><div class="btn-left"></div></router-link>
            <router-link to="/rules"> <div class="btn-right"></div></router-link>
        </div>
        <div class="icon"></div>
        <div class="title"></div>
        <div class="pick2">
            <div class="start pick-star1">
                <div class="span"  @click.stop="lightUp('1')">温暖星</div>
            </div>
            <div class="start pick-star2">
                <div class="span"  @click.stop="lightUp('2')">能量星</div>
            </div>
            <div class="start pick-star3">
                <div class="span"  @click.stop="lightUp('3')">守护星</div>
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
            </div>
            <div class="pick-moon">
               <span>&nbsp;&nbsp;？</span>
            </div>
        </div>
        <div class="getstart"></div>
        <pop v-if="mark" :text1="text" :btnText="btnText" :text2="text2" @btnup="btnup" @close="close"></pop>
    </div>
</template>

<script>
import axios from 'axios';
import Pop from '../components/pop.vue';
export default {
  name: 'index',
  components: {
      Pop
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      mark: false,
      text:'补签成功<br/>喜提XXX<br/>抢C位邀请好友打CALL,<br/>即可赢取中秋甄选好礼！',
      text2:'赢中秋团圆礼~',
      btnText:'我也要抢C位',
      userData:{}
    }
  },
  created () {
     axios.post('/qxby/api/light/getLightInfo?openId=789', {
        })
        .then( (response) => {
            console.log(response.data.data);
            // isDraw 复制	[boolean]	是	领奖按钮状态	
            // lightRecords	[json]	是	点亮列表	
            // position	[string]	是	点亮位置	
            // headImage	[string]	是	点亮者的头像地址	
            // lightNo	[int]	是	点亮批次	
            // isPrize	[boolean]	是	是否奖品弹窗
            this.userData =Object.assign({},this.userData,response.data.data)
        })
        .catch( (error) => {
            console.log(error);
        });
  },
  mounted () {

  },
  methods: {
      btnup(){
         alert('提交事件')
      },
      close(){
          this.mark = false;
      },
      lightUp(str) {
        this.mark = true;
        axios.post('/qxby/api/light/getLightInfo', {
            openId: '789',
            lightOpenId:'666',
            postison: str,
            lightNo: this.userData.lightNo
        })
        .then( (response) => {
            console.log(response.data);
        })
        .catch( (error) => {
            console.log(error);
        });
      }
  }
}
</script>

<style scoped>
.center-back{
    position: relative;
    min-height: 100%;
    width: 100%;
    background: url("/static/img/background.png") no-repeat center 0px fixed;
    background-size: contain;
    background-color: #000;
}
.btn{
    width: 100%;
    height: 0.34rem;
    padding-top: 0.5rem;
}
.btn-left{
    margin-left: 0.5rem;
    float: left;
    width: 1.62rem;
    height: 100%;
    background: url("/static/img/index_icon.png") left center no-repeat;
    background-size: contain;
}
.btn-right{
    margin-right: 0.64rem;
    float: right;
    width: 1.69rem;
    height: 100%;
    background: url("/static/img/icon2.png") left center no-repeat;
    background-size: contain;
}
.icon{
    margin-top: 0.1rem;
    height: 0.46rem;
    background: url("/static/img/icon3.png") center center no-repeat;
    background-size: contain;
}
.start{
    color:rgb(185, 160, 132);
    font-size: 0.14rem;
    line-height: 0.2rem;
    width: 1.88rem;
    height: 1.88rem;
    position: absolute;
    background: url("/static/img/star.png") center center no-repeat;
    background-size: contain;
}
.pick-moon{
    width: 3.33rem;
    height: 3.33rem;
    position: absolute;
    background: url("/static/img/moon.png") center center no-repeat;
    background-size: contain;
    top: 1.58rem;
    left: 2.10rem;
    color:rgb(185, 160, 132);
    text-align: center;
    line-height:  3.33rem;
}
.span{
    padding-top: 1.68rem;
}
.pick-star1{
    top: 0px;
    left: 2.78rem;
    /* background: url("/static/img/start.png") center center no-repeat;
    background-size: contain; */
}
.pick-star2{
    top: 0.78rem;
    left: 1.09rem;
    /* background: url("/static/img/power-start.png") center center no-repeat;
    background-size: contain; */
}
.pick-star3{
    top: 0.78rem;
    left: 4.49rem;
    /* background: url("/static/img/protect-start.png") center center no-repeat;
    background-size: contain; */
}
.pick-star4{
    top: 2.45rem;
    left: 0.68rem;
    /* background: url("/static/img/freedom-start.png") center center no-repeat;
    background-size: contain; */
}
.pick-star5{
    top: 2.45rem;
    left: 5.07rem;
    /* background: url("/static/img/lucky-start.png") center center no-repeat;
    background-size: contain; */
}
.pick-star6{
    top: 4.05rem;
    left: 1.69rem;
    /* background: url("/static/img/happy-start.png") center center no-repeat;
    background-size: contain; */
}
.pick-star7{
    top: 4.05rem;
    left: 3.87rem;
    /* background: url("/static/img/wit-start.png") center center no-repeat;
    background-size: contain; */
}
.title{
    margin-top: 0.28rem;
    height: 2.66rem;
    background: url("/static/img/title2.png") center center no-repeat;
    background-size: contain;
}
.pick2{
    margin-top: 0.63rem;
    height: 6.00rem;
    position: relative;
}
.getstart{
    margin-top: 0.4rem;
    height: 1.14rem;
    background: url("/static/img/friendsGif.png") center center no-repeat;
    background-size: contain;
}
</style>
