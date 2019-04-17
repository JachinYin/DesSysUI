<template>
    <div style="background: #f2f2f2">
      <div class="login_box">
        <div class="head">
          <span class="title">
                <span style="color:#2b89fb;">▌</span> 登陆
                <!--<span class="close_btn" @click="isLoginVisible = !isLoginVisible">&#10006</span>-->
          </span>
          <hr>
        </div>
        <div class="container">
          <div class="icon">
            <img src="../../assets/timg.png" alt="logo">

          </div>

          <el-form ref="form" :model="form" label-width="40px" @keyup.enter.native="login()">
            <el-form-item label="账户">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <!--<el-form-item>-->
              <el-button type="primary" @click="login()">登 陆</el-button>
            <!--</el-form-item>-->
          </el-form>
        </div>
        <!--<div class="foot"><span>还没有账号？点击<span class="reg" @click="register">注册</span></span></div>-->
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
              name: 'adm',
              password: '123456',
              rememberMe: false,
            },
            isLoginVisible: false
          }
      },
      methods:{
        login: function () {
          if (this.form.name === '') {
            this.$message.warning("输入用户名");
            return;
          }
          if (this.form.password === '') {
            this.$message.success("输入密码");
            return;
          }

          let that = this;
          $.ajax({
            url: that.preUrl + '/authLogin',
            data: {
              userName: that.form.name,
              password: that.form.password,
            },
            type: 'post',
            success: function (res) {
              that.$CommUtil.setToken(res.data.TOKEN);
              // 成功登陆
              if (res.success) {
                let url = that.$route.query.redirect || '/tempList';
                that.$router.push(url);
              }
              // 登陆失败
              else {
                that.$message.error(res.msg);
              }
            },
            error: function () {
              that.$message.error("网络繁忙，请稍后重试~");
            }
          })

        },
        register: function () {
          this.$router.push("/register")
        },
      },
      created() {
          // let TOKEN = this.$CommTool.getCookie("TOKEN");
          // if(TOKEN !== ""){
          //   this.$router.push("/tempList");
          // }
      }
    }
</script>

<style scoped>
  .login_box{
    position: relative;
    text-align: center;
    background: #fafafa;
    /*background: linear-gradient(to bottom right, rgba(250, 251, 255, 1), #7cc2ff); !* 标准的语法（必须放在最后） *!*/
    color: #858585;
    border-radius: 6px;

    height: 560px;
    width: 400px;
    margin: auto;
    z-index: 1000;
    box-shadow:0 0 10px #858585;
    padding-top: 1px;
  }
  .container{
    text-align: left;
  }
  .container .icon{
    text-align: center;
  }
  .container .icon img{
    width: 240px;
    height: 240px;
    -webkit-user-drag: none;
  }

  .head .title{
    display: block;
    text-align: left;
    margin: 15px 25px;
    height: 25px;
    font-size: 18px;
  }
  .head .close_btn{
    float: right;
    padding-right: 10px;
    cursor: pointer;
  }
  .head hr{
    border: none;
    width: 90%;
    border-bottom: 1px #bfbfbf4a solid;
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
    width: 100%;
  }

</style>
