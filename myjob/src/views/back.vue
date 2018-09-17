<template>
    <div id="singIn">
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "index",
  data() {
    return {
    };
  },
  mounted() {
    if(this.$route.query.tar='friendSignIn') {
      this.$router.push("/friendSignIn?" + window.location.href.split("tar=friendSignIn&")[1]);
    }else if(this.$route.query.tar='friendStar'){
      this.$router.push("/friendStar?" + window.location.href.split("tar=friendStar&")[1]);
    }else {
      this.$router.push("/index");
    }
    //   setTimeout(() => {
    //       window.reload();
    //   }, 0);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>
