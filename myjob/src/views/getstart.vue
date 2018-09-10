<template>
    <div class="center-back">
        <div class="btn">
            <div class="btn-left"></div>
            <div class="btn-right"></div>
        </div>
        <div class="icon"></div>
        <div class="title"></div>
        <div class="pick2">
            <div class="start pick-start1">
                <div class="span">温暖星</div>
            </div>
            <div class="start pick-start2">
                <div class="span">能量星</div>
            </div>
            <div class="start pick-start3">
                <div class="span">守护星</div>
            </div>
            <div class="start pick-start4">
                <div class="span">自由星</div>
            </div>
            <div class="start pick-start5">
                <div class="span">幸运星</div>
            </div>
            <div class="start pick-start6">
                <div class="span">快乐星</div>
            </div>
            <div class="start pick-start7">
                <div class="span">智慧星</div>
            </div>
            <div class="pick-start7">
            </div>
        </div>
        <div class="bottom">
            <div class="banner">

            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
.start{
    color:rgb(185, 160, 132);
    font-size: 0.14rem;
    line-height: 0.2rem;
    width: 1.88rem;
    height: 1.88rem;
    position: absolute;
    background: url("/static/img/start.png") center center no-repeat;
    background-size: contain;
}
.span{
    padding-top: 1.68rem;
}
.pick-start1{
    top: 0px;
    left: 2.78rem;
    /* background: url("/static/img/start.png") center center no-repeat;
    background-size: contain; */
}
.pick-start2{
    top: 0.78rem;
    left: 1.09rem;
    /* background: url("/static/img/power-start.png") center center no-repeat;
    background-size: contain; */
}
.pick-start3{
    top: 0.78rem;
    left: 4.49rem;
    /* background: url("/static/img/protect-start.png") center center no-repeat;
    background-size: contain; */
}
.pick-start4{
    top: 2.45rem;
    left: 0.68rem;
    /* background: url("/static/img/freedom-start.png") center center no-repeat;
    background-size: contain; */
}
.pick-start5{
    top: 2.45rem;
    left: 5.07rem;
    /* background: url("/static/img/lucky-start.png") center center no-repeat;
    background-size: contain; */
}
.pick-start6{
    top: 4.05rem;
    left: 1.69rem;
    /* background: url("/static/img/happy-start.png") center center no-repeat;
    background-size: contain; */
}
.pick-start7{
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
</style>
