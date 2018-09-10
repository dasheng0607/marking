<template>
    <div class="center-back">
        <div class="btn">
            <div class="btn-left"></div>
            <div class="btn-right"></div>
        </div>
        <div class="icon"></div>
        <div class="title"></div>
        <div class="pick2">
            <div class="start pick-star1">
                <div class="span">温暖星</div>
            </div>
            <div class="start pick-star2">
                <div class="span">能量星</div>
            </div>
            <div class="start pick-star3">
                <div class="span">守护星</div>
            </div>
            <div class="start pick-star4">
                <div class="span">自由星</div>
            </div>
            <div class="start pick-star5">
                <div class="span">幸运星</div>
            </div>
            <div class="start pick-star6">
                <div class="span">快乐星</div>
            </div>
            <div class="start pick-star7">
                <div class="span">智慧星</div>
            </div>
            <div class="pick-moon">
               <span>&nbsp;&nbsp;？</span>
            </div>
        </div>
        <div class="getstart"></div>
        <div class="world">
            最多集齐5套喔，你当前是4套啦！
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
    height: 1.07rem;
    background: url("/static/img/get-start.png") center center no-repeat;
    /* all-start */
    background-size: contain;
}
.world{
    margin-top: 0.1rem;
    text-align: center;
    font-size: 0.26rem;
    line-height: 0.26rem;
    background: linear-gradient(to right, rgb(90,72,53), rgb(214,188,158),rgb(159,131,101));
    -webkit-background-clip: text;
    color: transparent;
}
</style>
