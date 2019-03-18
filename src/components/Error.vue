<template>
  <div class="error" @click="toHome">
    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553520410&di=f4565f52210e51d172daaf3556e0fac6&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01ca6659ce55f5a80121ae0c08e107.jpg%401280w_1l_2o_100sh.jpg" alt="">

    <h1>404 Not Found</h1></div>
</template>

<script>
    export default {
        name: "Error",
      methods: {
          toHome:function () {
            this.$router.push("/")
          }
      }
    }
</script>

<style scoped>
  .error{
    background: #f2f2f2;
  }

  h1{
    position: relative;
    color: white;
    z-index: auto;
  }

  img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

</style>
