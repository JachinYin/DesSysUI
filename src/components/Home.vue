<template>
  <div class="body">
    <Header/>
    <div class="main">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import Header from "./inc/Header"
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
  .body{
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
    border-right: none;
    font-weight: normal;
    color: #676e6e;
  }
  .el-table td{
    padding: 8px 0;
    color: #909399;
  }

  .head-box{
    text-align: center;
    height: 50px;
    border-radius: 15px 15px 0 0 ;
    background-color: white;
    color: #909399;
    user-select: none;
  }
  .head-box .filter, .static{
    position: relative;
    top: 12px;
    margin-right: 12px;
    cursor: pointer;
  }
  .head-box .filter:hover{
    color: #3a8ee6;
  }
  .head-box .static:hover{
    color: #5daf34;
  }

  .showDetail{
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

  .el-message{
    margin-top: 60px!important;
  }
</style>
