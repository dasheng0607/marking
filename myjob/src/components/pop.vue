<!-- 
使用说明:3块文字,2个事件
上面的文字 text1:'' 换行使用<br/>      
按钮文字   btnText:''
下面的文字  text2:''
按钮事件:btnup: 
关闭事件:close:
-->
<template>
    <div class="mark">
        <div class="tip">
            <div class="close" @click="close"></div>
            <div class="tip-top">
                <span class="tip-top-span" v-html="text1"></span>
            </div>
            <div class="tip-bottom">
                <button  class="tip-bottom-bt" @click="btnup">{{btnText}}</button>
                <span class="tip-top-span" v-html="text2"></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'index',
  props:['mark','text1','text2','btnText'],
  data () {
    return {
    }
  },
  mounted () {

  },
  methods: {
      btnup(){
           this.$emit('btnup');
      },
      close(){
           this.$emit('close');
      }
  }
}
</script>
<style scoped>
/* 弹窗 */
.mark{
    font-weight: 400;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(105, 103, 103, 0.7);
    display: flex;
    justify-content:center;
    align-items:center;
}
.tip{
    width: 5.56rem;
    height: 5.56rem;
    text-align: center;
    background: url("../../static/img/reward.png") center center no-repeat ;
    background-size: contain;
    position: relative;
}
.close{
    width: 0.4rem;
    height: 0.4rem;
    background: url("../../static/img/close.png") center center no-repeat;
    background-size: contain;
    position: absolute;
    right: 0.6rem;
    top: 0.6rem;
}
.tip-top{
    min-height: 34%;
    text-align: center;
    margin-left: 1.2rem;
    margin-top: 0.8rem;
    margin-right: 1.2rem;
    padding-bottom: 0.20rem;
    display: flex;
    justify-content:center;
    align-items:flex-end;
    font-size: 0.26rem;
    border-bottom: 0.03rem solid rgb(214,188,158);
}
.tip-top-span{
    background: linear-gradient(to right, rgb(90,72,53), rgb(214,188,158),rgb(159,131,101));
    -webkit-background-clip: text;
    color: transparent;
}
.tip-bottom{
    min-height: 30%;
    text-align: center;
    margin-left: 1rem;
    margin-right: 1rem;
    padding-top: 0.1rem;
    display: flex;
    justify-content:top;
    flex-direction:column;
    align-items:center;
    font-size: 0.26rem;
}
.tip-bottom-bt{
    width: 2.32rem;
    height: 0.68rem;
    padding-left: 0.12rem;
    padding-top: 0.10rem;
    margin-bottom: 0.22rem;
    font-size: 0.26rem;
    font-weight: bold;
    background: url("../../static/img/btn-img.png") center center no-repeat;
    background-size: contain;
    display: inline-block;
    border: none;
    color:rgb(214,188,158);
}
</style>
