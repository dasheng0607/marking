<template>
    <div id="singIn">
        <div class="btn">
           <router-link to="/index" class="btn-left"></router-link>
        </div>
        <div class="icon"></div>
        <div class="sign-in-text"></div>
        <div class="sules">
            <ul>
                <li v-for="(item,index) in rules" :key="index" v-html="item"></li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "index",
  data() {
    return {
      rules:["1、活动期间，每人每天可获得一次签到机会，连续3天完成签到，即可获得一次抽奖机会，每人最多两次抽奖机会。如果签到期间出现中断，可邀请好友为你补签，但一位好友仅有一次补签机会，补签的次数限制在50次/人；抽奖奖品最终以页面显示出的结果为准。本次活动签到设置奖品如下：<br/>（1）价值313元中秋团圆礼盒（内含Swisse深海鱼油胶囊一瓶、Swisse钙D一瓶、Swisse定制镜子一个），共计1份；<br/>（2）价值112元Swisse益生菌压片糖果，共计100瓶；<br/>（3）30元Swisse商城现金券。","2、活动期间，每参与抢C位环节并分享好友，集齐七个好友点亮后，即可获得一次抽奖机会，每人最多五次抽奖机会。抽奖奖品最终以页面显示出的结果为准。每人每天不限制发起活动的次数，但每人只有1次帮助好友点亮的机会，点亮的次数限制在50次/人。奖品为随机分配，本次抢C位奖品为：<br/>（1）价值1080元FOREO Luna Mini2代洁面仪（粉色），共计1份；<br/>（2）价值483元中秋团圆礼盒（内含Swisse深海鱼油胶囊一瓶、Swisse乳清蛋白粉（香草味）一瓶、Swisse定制镜子一个），共计5份；<br/>（3）价值112元Swisse益生菌压片糖果，共计20份。<br/>（4）40元Swisse商城现金券（满299减30元Swisse商城现金券一张、满199减10元Swisse商城现金券一张）。","奖品领取说明：<br/>1、实物类领奖说明：（1）获奖者在接到中奖通知后，需向主办方提供领取奖品所需的必要信息，主办方会在收到以上信息后10个工作日内完成奖品寄发。（2）实物类奖品将在活动结束后1个月内完成寄送，寄送地址以获奖者领奖时提供的地址为准，请确认该地址可以收到奖品，如地址有变，请及时联系客服电话进行修改。<br/>2、活动抽中的Swisse商城现金券，仅限注册Swisse会员领取，详细用券规则请在“Swisse官方微信-会员账户-我的优惠券”处查看。<br/>声明：<br/>1、本活动与奖品有关的个人所得税、任何费用和开支皆由获奖者自行承担，且主办方提供的奖品不兑现、不找零；<br/>2、本次活动领取实物礼品及现金券需注册Swisse会员。针对本活动有任何问题，可以拨打客服电话4008832490；<br/>3、若发现不符合活动规则或其它违反活动目的的作弊行为，swisse有权取消此会员的活动资格及其所获利益，并保留追究其法律责任的权利。<br/>4、本活动解释权在法律允许的范围内归Swisse官方所有。"]
    };
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
#singIn {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  background: url("../../static/img/sign_in_bg.png") no-repeat center -1.2rem fixed;
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
.sign-in-text {
  margin-top: 0.3rem;
  height: 1.98rem;
  background: url("../../static/img/rules.png") 0.32rem center no-repeat;
  background-size: contain;
}
.sules{
    // min-height: 200px;
    height:  6.90rem;
    overflow-x: scroll;
    margin: 0 0.7rem;
    padding: 0.1rem 0;
    border: 0.04rem solid rgb(175, 149, 119);
    border-radius: 0.1rem;
}
.sules ul{
    padding: 0.3rem;
}
.sules li{
    text-align: left;
    font-size: 0.22rem;
    color:rgb(175, 149, 119);
}
</style>
