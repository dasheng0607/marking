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
      this.$router.push("/index");
    //   setTimeout(() => {
    //       window.reload();
    //   }, 0);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>
