<template>
    <div class="showDetail openHtml" v-if="isVisible">
      <div class="body">
        <div class="container">
          <div class="left">
            <div class="info1">
              <!--<img :src="desData.photoImg" width="62px" @click="showPic(desData.photoImg)">-->
              <div class="img_box imgPhoto" @click="showPic(desData.photoImg)">
                <div class="img" :style="desData.photoImg ? `background-image: url('${preUrl + desData.photoImg}')` : ''"></div>
              </div>
              <div class="item">
                <span class="keyClass">昵称：</span> <span class="valClass">{{desData.nickName}}</span>
              </div>
              <div class="item">
                <span class="keyClass">所在地：</span>
                <span class="valClass">
                  {{desData.country}}
                  {{desData.province}}
                  {{desData.city}}
                </span>
              </div>
            </div>
            <hr>

            <div class="info2">
              <div class="item">
                <span class="keyClass">账号AID：</span> <span class="valClass">{{desData.aid}}</span>
              </div>
              <div class="item">
                <span class="keyClass">真实姓名：</span> <span class="valClass">{{desData.realName}}</span>
              </div>
              <div class="item">
                <span class="keyClass">身份证：</span> <span class="valClass">{{desData.idNum}}</span>
              </div>
              <div class="item">
                <span class="keyClass">提现账号：</span> <span class="valClass">{{desData.bankAcct}}</span>
              </div>
            </div>
            <hr>

            <div class="info3">
              <div class="item">
                <span class="keyClass">联系手机：</span> <span class="valClass">{{desData.phone}}</span>
              </div>
              <div class="item">
                <span class="keyClass">联系QQ：</span> <span class="valClass">{{desData.qq}}</span>
              </div>
              <div class="item">
                <span class="keyClass">联系邮箱：</span> <span class="valClass">{{desData.weChat}}</span>
              </div>
            </div>
            <hr>

            <div class="info4">
              <div class="item">
                <span class="keyClass">个人简介：</span> <span class="valClass">{{desData.intro}}</span>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="center_box">
              <div class="img_box" @click="showPic(desData.frontImg)">
                <div class="img" :style="desData.frontImg ? `background-image: url('${preUrl + desData.frontImg}')` : ''"></div>
              </div>
              <span>身份证正面照</span>
              <!--<img :src="desData.frontImg" width="320px" @click="showPic(desData.frontImg)">-->
              <!--<span v-show="!desData.frontImg">暂无身份证正面照</span>-->
              <br><br>
              <div class="img_box" @click="showPic(desData.reverseImg)">
                <div class="img" :style="desData.reverseImg ? `background-image: url('${preUrl + desData.reverseImg}')` : ''"></div>
              </div>
              <span>身份证反面照</span>
              <!--<img :src="desData.reverseImg" width="320px" @click="showPic(desData.reverseImg)">-->
              <!--<span v-show="!desData.reverseImg">暂无身份证反面照</span>-->
            </div>
          </div>

          <div class="bottom">
            <!--这里放审核记录表-->
            <!--<div class="tableTitle">审核记录表</div>-->
            <el-table :data="desData.list" class="table" tooltip-effect="light" height="260px">
              <el-table-column align="center" label="审核状态" prop="status" width="80px">
                <template slot-scope="scope">
                  <span v-if="scope.row.status === 1">审核中</span>
                  <span v-if="scope.row.status === 2" style="color: #fd2814;">打回</span>
                  <span v-if="scope.row.status === 3" style="color: #41C26E;">通过</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="审核时间" prop="time" width="200px"></el-table-column>
              <el-table-column align="center" label="打回原因" prop="reason" width="220px" show-overflow-tooltip></el-table-column>
            </el-table>
          </div>
        </div>

        <div class="footer">
          <span v-if="desData.status===1">
            <el-button type="danger" @click="refuse">打回</el-button>
            <el-button type="primary" @click="pass">通过</el-button>
          </span>
          <span v-if="desData.status === 3">
            <el-button type="success" @click="refuse">重新审核</el-button>
          </span>
          <span class="close_btn" @click="closeDetailBox" v-if="desData.status === 2">&#10006</span>
        </div>
      </div>
      <div class="mask" @click="closeDetailBox"></div>
      <ShowRefuseReason :is-visible="isReasonVisible" :aid="desData.aid" @closeReasonBox="closeReasonBox"/>

      <!--查看原图-->
      <div class="openOriPic openHtml" v-if="isShowPic">
        <div class="body2"  @click="isShowPic = !isShowPic" >
          <img :src="srcPic" width="600px">
          <span class="close_btn" @click="closeDetailBox">&#10006</span>
        </div>
        <div class="mask" @click="isShowPic = !isShowPic" style="z-index: 1000"></div>
      </div>
    </div>
</template>

<script>
    import ShowRefuseReason from "../designerList/ShowRefuseReason";
    export default {
      name: "ShowDesFilterBox",
      components: {ShowRefuseReason},
      props:['isVisible', 'desData'],
      data: function () {
        return {
          isShowPic: false,
          srcPic: '',
          myTempData:{
            title: 'defaultVal',
          },
          isReasonVisible: false, // 这个控制原因弹窗展示与否
        }
      },
      methods:{
        closeDetailBox: function () {
          // 根据 props 不可修改原则，要将该值的改变包装成事件，反馈给父组件进行处理
          // this.isVisible = !this.isVisible;
          this.$emit("closeDetailBox");
        },
        closeReasonBox: function (isRefuse) {
          this.isReasonVisible = false;
          if(isRefuse){
            this.$emit("closeDetailBox");
            this.$emit("refresh");
          }
        },
        pass: function () {
          this.$confirm('确定通过该设计师？', '提示', {
            confirmButtonText: '确定',
            confirmButtonClass: 'el-button--primary el-button--medium',
            cancelButtonText: '取消',
            cancelButtonClass: 'el-button--medium',
            type: 'success',
            center: true,
            distinguishCancelAndClose: true
          }).then((action) => {
            this.doPass();
          }).catch(() => {});
        },
        doPass: function(){
          let that = this;
          $.ajax({
            url: that.preUrl + '/doDesignerAudit/pass',
            type: 'get',
            data: {
              aid: that.desData.aid,
            },
            success : function (res) {
              if(res.success){
                that.$message.success(res.msg);
                that.closeDetailBox();
                that.$emit("refresh");
              }else{
                that.$message.error(res.msg);
              }
            },
            error: function (res) {
              that.$message.error("网络繁忙，请刷新后重试");
            }
          });
        },


        refuse: function () {
          this.isReasonVisible = true;
        },

        showPic:function (url) {
          if(url) {
            this.srcPic = this.preUrl + url;
            this.isShowPic = true;
          }
        }
      },
    }
</script>

<style scoped>
  /*总体*/
  .showDetail{

  }
  /*弹窗主体*/
  .body{
    width: 800px;  /*600*/
    height: 600px; /*460*/
    /*display: table-cell;*/
  }
  /*照片弹窗*/
  .body2{
    position: relative;
    top: 12%;
    margin: auto;
    text-align: center;
    border-radius: 6px;
    z-index: 1001;
    padding-top: 1px;
  }

  .container{
    padding: 20px;
    height: 489px;
    width: 760px;
    overflow-y: auto!important;
  }
  .right{
    background: #f9f9f9;
    border-radius: 8px;
    width: 333px;
    height: 470px;
    float: right;
    padding: 10px;
    position: relative;
  }
  .center_box{
    width: 333px;
    height: 85%;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  }
  .right .img{
    /*margin-top: 22px;*/
    height: 180px;
    width: 320px;
  }
  .right img:hover{
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);
  }

  .left{
    /*background: #f2f2f2;*/
    width: 390px;
    height: 490px;
    float: left;
    /*padding: 10px;*/
    overflow-y: auto;
  }
  .left hr{
    border: none;
    width: 360px;
    border-bottom: 1px #e0e0e0 solid;
    /*margin-bottom: 30px;*/
  }
  .left .item{
    margin: 0 10px;
    padding: 6px 0;
    text-align: left;
    /*border-bottom: 1px #f1f1f1 solid;*/
  }
  .left .item .keyClass{
    /*font-size: 20px;*/
    /*font-weight: bold;*/
    display: inline-block;
    padding-left: 12px;
    width: 80px;
    color: #909399;
  }
  .left .item .valClass{
    display: inline-block;
    width: 265px;
  }

  .left .info1 .img{
    width: 62px;
    height: 62px;
    position: relative;
    float: left;
    left: 20px;
    /*left: -140px;*/
  }
  .left .info1 .item{
    margin-left: 100px;
  }

  .left .info1 .item .valClass{
    width: 160px;
  }

  .left .status1, .status2, .status3{
    padding: 1px 10px;
    display: inline-block;
    border-radius: 4px;
    user-select: none;
  }
  .left .status1{
    border: 1px #e0e5ee solid;
    background: rgba(224, 229, 238, 0.5);
  }
  .left .status2{
    border: 1px #41C26E solid;
    background: rgba(65, 194, 110, 0.47);
    color: #4f4f4f;
  }
  .left .status3{
    border: 1px #fd8a71 solid;
    background: rgba(255, 165, 139, 0.5);
  }

  .bottom{
    margin: 530px  auto 0;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    width: 500px;
    /*border: 1px #909399 solid;*/
  }
  .bottom .tableTitle{
    padding: 15px 0 5px 130px;
    text-align: left;
    font-weight: bold;
    border-bottom: 1px rgba(0, 0, 0, 0.1) solid;
  }

  .footer{
    height: 40px;
    padding: 15px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15) inset;
  }
  .footer .close_btn{
    line-height: 40px;
    font-weight: lighter;
    margin-top: 100px;
    cursor: pointer;
    user-select: none;
    border: 1px #d6d6d6 solid;
    background: #f2f2f2;
    color: #b8bbc3;
    border-radius: 50%;
    padding: 10px 12px;
  }
  .footer .close_btn:hover{
    opacity: 0.8;
    border: 1px #a6a6a9 solid;
  }
</style>
