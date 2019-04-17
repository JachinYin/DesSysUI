<template>
    <div class="reg">
      <div class="box">
        <div class="left">
          <div class="container"><span class="title">设计师平台</span><br>
            <span class="content">入驻成为认证设计师，轻松赚钱，从这里开始~</span> <br></div>
          <img src="../../assets/Register_bg.png" alt="bg">

        </div>
        <div class="right">
          <div class="reg_box">
            <div class="header"><span class="title">
              <span style="color:#2b89fb;">▌</span>注册
              </span>
              <hr>
            </div>
            <div class="container">
              <img src="../../assets/timg.png" alt="logo">
              <div class="form">
                <el-form ref="form" :model="form" label-width="40px" @keyup.enter.native="onRegister">
                  <el-form-item label="账户">
                    <el-input
                      v-model="form.username"
                      placeholder="请输入账号(6-20位字母数字)"
                      @input="limitIn(true)"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="密码">
                    <el-input
                      type="password"
                      v-model="form.password"
                      placeholder="请输入密码(6-20位)"
                      @input="limitIn(false)"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="密码">
                    <el-input
                      type="password"
                      v-model="form.rePassword"
                      placeholder="请确认密码(字母数字下划线组合)"
                      @input="limitIn(false)"
                    ></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onRegister()">注 册</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div class="foot"></div>
          </div>
        </div>

      </div>
    </div>
</template>

<script>
    export default {
      name: "Register",
      data: function () {
        return{
          form:{
            username: '',
            password: '',
            rePassword: '',
          }
        }
      },
      methods: {
        onRegister: function () {
          let form = this.form;
          let reg = /^\w+$/; //字母+数字+下划线组合
          if(form.username === ""){
            this.$message.warning("请输入账号");
            return;
          }
          if(form.password === ""){
            this.$message.warning("请输入密码");
            return;
          }
          if(form.rePassword === ""){
            this.$message.warning("请输入确认密码");
            return;
          }
          if(form.password.length < 6){
            this.$message.warning("密码长度最小6位");
            return;
          }
          if(!reg.test(form.username)){
            this.$message.error("账户包含非法字符");
            return;
          }
          if(!reg.test(form.password)||!reg.test(form.rememberMe)){
            this.$message.error("密码包含非法字符");
            return;
          }

          if(form.password !== form.rePassword){
            this.$message.error("两次密码不一致");
            return;
          }
          let that = this;
          $.ajax({
            url: that.preUrl + "/register",
            data: {
              userName: form.username,
              password: form.password,
            },
            success: function (res) {
              if(res.success){
                that.$message.success("注册成功");
                that.$router.push("/login");
              }
              else{
                that.$message.error(res.msg);
              }
            },
            error: function () {
              that.$message.error("网络繁忙，请稍后重试~");
            }
          });

        },
        limitIn: function (isUsername) {
          if(isUsername) {
            let value = this.form.username;
            if (value.length > 20) this.form.username = value.slice(0, 20);
          }else{
            let value = this.form.password;
            if (value.length > 20) this.form.password = value.slice(0, 20);
          }
        }
      }
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
  .left img:hover{
    box-shadow:0 0 10px #e4e4e4;
  }
  .left img {
    width: 600px;
    height: 452px;
    -webkit-user-drag: none;
  }
  .left{
    height: 600px;
    width: 850px;
    vertical-align: middle;
    text-align: center;
    display: table-cell;
    user-select: none;
  }
  .left .container{
    text-align: left;
    width: 600px;
    margin: auto;
  }
  .left .title{
    font-size: 24px;
    font-weight: bold;
    display: block;
    color: #909300;
  }
  .left .content{
    display: block;
    line-height: 24px;
  }
  .right{
    width: 400px;
    height: 600px;
    box-shadow:0 0 4px #858585;
    display: table-cell;
    /*vertical-align: middle;*/
    background: white;
    border-radius: 4px;
    padding-top: 1px;
  }
  .reg_box{
    padding: 15px;
    text-align: left;
  }
  .reg_box .title{
    font-size: 26px;
    /*font-weight: bold;*/
    line-height: 30px;
    user-select: none;
  }
  .reg_box hr{
    border: none;
    border-top: 1px #999309 solid;
  }
  .reg_box .container{
    text-align: center;
  }
  .reg_box img{
    width: 240px;
    height: 240px;
    user-select: none;
    -webkit-user-drag: none;
  }
  .reg_box .container .form{
    text-align: left;
    width: 280px;
    /*text-align: center;*/
    margin: auto;
  }
  .reg_box .container .form .el-button{
    width: 100%;
  }

  .el-message{
    /*padding-left: 1000px!important;*/
  }

</style>
