<template>
  <div class="home">
    <Header/>
    <div class="main">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import Header from "@/components/inc/Header"
    export default {
      name: "Home",
      components: {Header},
      comments: {
          Header,
      },
      created: function() {
        // 由根路由进来后，直接解析到下一级路由
        this.$router.push("/tempList")
      }
    }
</script>

<style scoped>
  .home{
    background: #f2f2f2;
  }
  .main{
    height: 100%;
    width: 1100px;
    margin: 10px auto;
  }
</style>
<style>
  .el-table th{
    padding: 8px 0!important;
    border-right: none;
    font-weight: normal;
    color: #676e6e;
  }
  .el-table td{
    padding: 8px 0!important;
    color: #909399;
  }

  .head-box{
    text-align: left;
    height: 50px;
    border-radius: 15px 15px 0 0 ;
    background-color: white;
    color: #909399;
    user-select: none;
  }
  .head-box .filter, .static{
    position: relative;
    line-height: 50px;
    margin-left: 58px;
    cursor: pointer;
  }
  .head-box .filter:hover{
    color: #3a8ee6;
  }
  .head-box .static:hover{
    color: #5daf34;
  }

  .showDetail_btn{
    color: #2b89fb;
    /*text-decoration: underline;*/
    cursor: pointer;
    user-select: none;
  }
  .pageNav {
    text-align: center;
    height: 50px;
    background-color: white;
    border-radius: 0 0 15px 15px;
  }


  .el-message{
    margin-top: 60px!important;
  }

</style>

<!--图片样式-->
<style>
  .img_box .img{
    width: 180px;
    height: 250px;
    background-image: url("../assets/template_default.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100%;
    vertical-align: middle;
  }
</style>
<!--弹窗样式-->
<style>
  /*通用弹窗格式*/
  /*
    <div class="具体弹窗名字 openHtml">
      <div class="body">
        这里是具体的弹窗内容，布局还有其他自定义
      </div>
      <div class="mask"></div>
    </div>
  */
  .openHtml{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .body{
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    position: relative;
    top: 12%;
    margin: auto;
    text-align: center;
    background: white;
    color: #909399;
    border-radius: 6px;

    width: 400px;
    height: 460px;
    z-index: 1000;

    padding-top: 1px;
  }

  /*mask*/
  .mask {
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(48, 48, 48, 0.74);
    z-index: 999;
  }
</style>
<!--滚动条-->
<style type="text/css">

  ::-webkit-scrollbar
  {
    width: 4px;
    height: 4px;
    background-color: #F5F5F5;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(196, 196, 196, 0.3);
    background-color: #7d7d7d;
  }
</style>
