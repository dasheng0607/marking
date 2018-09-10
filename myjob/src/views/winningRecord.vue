<template>
    <div id="winningRecord">
        <div class="btn">
            <div class="btn-left"></div>
            <div class="btn-right"></div>
        </div>
        <div class="icon"></div>
        <div class="username-text">Hi，亲爱的{{userName}}</div>
        <div class="wish-text"></div>
        <div class="record-box">
            <p class="record-text">
                9月24日00点00分，我完成了“集七星”获得了一份中秋团圆大礼！
            </p>
        </div>
        <div class="delivery-msg"></div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'index',
  data () {
    return {
      userName: '1111'
    }
  },
  mounted () {

  }
}
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
    background: url("/static/img/icon1.png") left center no-repeat;
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
.pick{
    margin-top: 0.11rem;
    height: 0.54rem;
    background: url("/static/img/pick.png") center center no-repeat;
    background-size: contain;
}
.title{
    margin-top: 0.28rem;
    height: 2.84rem;
    background: url("/static/img/title.png") center center no-repeat;
    background-size: contain;
}
.pick2{
    margin-top: 0.63rem;
    height: 1.15rem;
    background: url("/static/img/pick2.png") center center no-repeat;
    background-size: contain;
}
.bottom{
    margin-top: 0.46rem;
    height: 4.38rem;
    background: url("/static/img/gift.png") no-repeat;
    background-position-x: 1.05rem;
    background-position-y: 0;
    background-size: 4.48rem 3.51rem;
}
.banner{
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
    color: #977C61;
    margin-top: 0.22rem;

}
.wish-text {
    width: 5.56rem;
    height: 1.48rem;
    margin: 0.34rem auto 0 auto;
    background: url('/static/img/wish_text.png') no-repeat center center;
    background-size: contain;
}
.record-box {
    width: 5.29rem;
    height: 6.24rem;
    margin: 0.65rem auto 0 auto;
    background: url('/static/img/record_box.png') no-repeat center center;
    background-size: contain;
    padding: 0.5rem 0.4rem;
    box-sizing: border-box;
    .record-text {
        padding-left: 0.38rem;
        font-size: 0.24rem;
        color: #C3A281;
        text-align: left;
    }
}
.delivery-msg {
    width: 2.97rem;
    height: 1.07rem;
    margin: 0.52rem auto 0 auto;
    background: url('/static/img/delivery_msg.png') no-repeat center center;
    background-size: contain;
}

</style>
