<template>
    <div class="reg">
      <div class="box">
        <div class="left"><img src="../../assets/Register_bg.png" alt="bg"></div>
        <div class="right">
          <span class="title">
            注册
          </span>
          <hr>
        </div>

      </div>
    </div>
</template>

<script>
    export default {
        name: "Register"
    }
</script>

<style scoped>
  .reg{
    height: 100%;
    width: 100%;
    position: relative;
    background: #f2f2f2;
  }
  .box{
    width: 1550px;
    height: 750px;
    display: table-cell;
    vertical-align: middle;
  }
  img {
    width: 600px;
    height: 452px;
  }
  .left{
    height: 600px;
    width: 850px;
    vertical-align: middle;
    text-align: center;
    display: table-cell;
  }
  .right{
    width: 400px;
    height: 600px;
    box-shadow:0 0 10px #858585;
    display: table-cell;
    /*vertical-align: middle;*/
    background: white;
    border-radius: 4px;
    padding-top: 1px;
  }
  .right .title{
    font-size: 26px;
    font-weight: bold;
    line-height: 30px;
  }
  .right hr{
    border: none;
    border-top: 1px #999309 solid;
  }
</style>
