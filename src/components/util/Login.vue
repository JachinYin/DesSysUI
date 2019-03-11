<template>
    <div>
      <div class="login_box">
        <div class="head">
          <span class="title">
                <span style="color:#2b89fb;">▌</span> 登陆
                <!--<span class="close_btn" @click="isLoginVisible = !isLoginVisible">&#10006</span>-->
          </span>
          <hr>
        </div>
        <div class="body">
          <div class="icon">
            <i class="el-icon-loading"></i>
          </div>

          <el-form ref="form" :model="form" label-width="40px">
            <el-form-item label="账户">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox-group v-model="form.rememberMe">
                <el-checkbox label="记住我" name="type"></el-checkbox>
              </el-checkbox-group>
              <!--<span>记住我</span>-->
              <el-button type="primary" @click="login()">登 陆</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="foot"><span>还没有账号？点击<span class="reg" @click="register">注册</span></span></div>
      </div>
      <div class="mask"></div>
    </div>
</template>

<script>
    export default {
        name: "Login",
      data(){
          return{
            form:{
              name: '',
              password: '',
              rememberMe: false,
            },
            isLoginVisible: false
          }
      },
      methods:{
          login: function () {
            this.$message.success("成功");
            console.log(this.form);
          },
          register: function () {
            this.$message.success("注册成功")
          }
      }
    }
</script>

<style scoped>
  .login_box{
    position: relative;
    text-align: center;
    background: white;
    /*background: linear-gradient(to bottom right, rgba(250, 251, 255, 1), #7cc2ff); !* 标准的语法（必须放在最后） *!*/
    color: #858585;
    border-radius: 6px;

    height: 533px;
    width: 400px;
    margin: auto;
    z-index: 1000;
    box-shadow:0 0 10px #858585;
    padding-top: 1px;
  }
  .body{
    text-align: left;
  }
  .body .icon{
    text-align: center;
    margin-bottom: 30px;
  }
  .body .icon .el-icon-loading{
    width: 100px;
    height: 100px;
  }

  .body .title{
    display: block;
    text-align: left;
    margin: 15px 25px;
    height: 25px;
    font-size: 18px;
  }
  .body .close_btn{
    float: right;
    padding-right: 10px;
    cursor: pointer;
  }
  .body hr{
    border: none;
    width: 90%;
    border-bottom: 1px #bfbfbf4a solid;
    margin-bottom: 50px;
  }

  .foot {
    position: relative;
    bottom: 0;
    height: 50px;
  }
  .foot .reg{
    color: #409EFF;
    cursor: pointer;
  }

  .mask{
    background-color: rgba(143, 143, 143, 0.64);
  }

  .el-form{
    width: 250px;
    margin: auto;
  }
  .el-button{
    /*width: 100%;*/
  }

</style>
