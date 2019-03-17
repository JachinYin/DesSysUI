<template>
    <div class="showDetail openHtml" v-if="isVisible">
      <div class="body">
        <div class="container">
          <div class="left">
            <div class="imgBox">
              <img :src="tempData.imgUrl" width="340px">
              <span v-show="!tempData.imgUrl">暂无封面</span>
            </div>
          </div>
          <div class="right">
            <div class="tempData">
              <div class="item">
                <span class="keyClass">标题：</span> <span class="valClass" >{{tempData.title}}</span>
              </div>
              <div class="item">
                <span class="keyClass">状态：</span>
                <span class="valClass">
                  <span class="status1" v-if="tempData.status === 1">待审核</span>
                  <span class="status2" v-else-if="tempData.status === 3">通过</span>
                  <span class="status3" v-else>打回</span>
                </span>
              </div>
              <div class="item">
                <span class="keyClass">描述：</span> <span class="valClass">{{tempData.content}}</span>
              </div>
              <div class="item">
                <span class="keyClass">采购价：</span> <span class="valClass">{{tempData.price}}</span>
              </div>
              <div class="item">
                <span class="keyClass">关键词：</span> <span class="valClass">{{tempData.keyWd}}</span>
              </div>
              <div class="item">
                <span class="keyClass">行业信息：</span> <span class="valClass">{{tempData.info}}</span>
              </div>
              <div class="item">
                <span class="keyClass">AID：</span> <span class="valClass">{{tempData.aid}}</span>
              </div>
              <div class="item">
                <span class="keyClass">昵称：</span> <span class="valClass">{{tempData.designer}}</span>
              </div>
              <div class="item">
                <span class="keyClass">姓名：</span> <span class="valClass">{{tempData.realName}}</span>
              </div>
              <div class="item">
                <span class="keyClass">手机：</span> <span class="valClass">{{tempData.phone}}</span>
              </div>
            </div>
            <div class="tempAuditList">
              <div class="tableTitle">审核记录表</div>
              <el-table :data="tempData.list" class="table" tooltip-effect="light">
                <el-table-column align="center" label="审核状态" prop="status" width="80px">
                  <template slot-scope="scope">
                    <span v-if="scope.row.status === 1">审核中</span>
                    <span v-if="scope.row.status === 2" style="color: #fd2814;">打回</span>
                    <span v-if="scope.row.status === 3" style="color: #41C26E;">通过</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="审核时间" prop="time" width="180px"></el-table-column>
                <el-table-column align="center" label="打回原因" prop="reason" width="110px" show-overflow-tooltip></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div class="footer">
          <el-button type="danger" @click="refuse" v-if="tempData.status !== 2">打回</el-button>
          <el-button type="primary" @click="pass" v-if="tempData.status === 1">通过</el-button>
          <span class="close_btn" @click="closeDetailBox" v-if="tempData.status === 2">&#10006</span>
        </div>
      </div>
      <div class="mask" @click="closeDetailBox"></div>
      <ShowRefuseReason :is-visible="isReasonVisible" @closeReasonBox="closeReasonBox"/>
    </div>
</template>

<script>
    import ShowRefuseReason from "./ShowRefuseReason";
    export default {
      name: "ShowTempDetail",
      components: {ShowRefuseReason},
      props:['isVisible', 'tempData'],
      data: function () {
        return {
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
        closeReasonBox: function () {
          this.isReasonVisible = false;
        },
        pass: function () {
          this.$prompt('请输入采购价', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: this.reg_Price,
            inputErrorMessage: '金额格式不正确'
          }).then(({ value }) => {
            let thiz = this;
            $.ajax({
              url: thiz.preUrl + 'tempPass',
              type: 'get',
              dataType: 'json',
              data: {
                price: value,
                tempId: thiz.tempData.tempId,
              },
              success : function (res) {
                if(res.success){
                  thiz.$message.success(res.msg);
                  thiz.$emit("refresh");
                  thiz.closeDetailBox();
                }else{
                  thiz.$message.error(res.msg);
                }
              },
              error: function (res) {
                this.$message.error("网络繁忙，请刷新后重试");
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            });
          });

        },
        refuse: function () {
          this.isReasonVisible = true;
          return;
          let thiz = this;
          $.ajax({
            url: thiz.preUrl + 'tempRefuse',
            type: 'get',
            dataType: 'json',
            data: {
              tempId: thiz.tempData.tempId,
            },
            success : function (res) {
              if(res.success){
                thiz.$message.success(res.msg);
                thiz.$emit("refresh");
                thiz.closeDetailBox();
              }else{
                thiz.$message.error(res.msg);
              }
            },
            error: function (res) {
              this.$message.error("网络繁忙，请刷新后重试");
            }
          })
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
  .container{
    padding: 20px;
    float: top;
    display: table-cell;
  }
  .left{
    background: #f9f9f9;
    border-radius: 8px;
    width: 340px;
    height: 470px;
    float: left;
    padding: 10px;
  }
  .left .imgBox{
    height: 470px;
    display: table-cell;
    vertical-align: middle;
  }
  .left img:hover{
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);
  }


  .right{
    /*background: #f2f2f2;*/
    width: 400px;
    height: 490px;
    float: right;
    /*padding: 10px;*/
    overflow-y: auto;
  }
  .right .item{
    margin: 10px 10px;
    padding: 6px 0;
    text-align: left;
    border-bottom: 1px #f1f1f1 solid;
  }
  .right .item .keyClass{
    /*font-size: 20px;*/
    /*font-weight: bold;*/
    display: inline-block;
    padding-left: 12px;
    width: 80px;
    color: #909399;
  }
  .right .item .valClass{
    display: inline-block;
    width: 275px;
  }
  .right .status1, .status2, .status3{
    padding: 1px 10px;
    display: inline-block;
    border-radius: 4px;
    user-select: none;
  }
  .right .status1{
    border: 1px #e0e5ee solid;
    background: rgba(224, 229, 238, 0.5);
  }
  .right .status2{
    border: 1px #41C26E solid;
    background: rgba(65, 194, 110, 0.47);
    color: #4f4f4f;
  }
  .right .status3{
    border: 1px #fd8a71 solid;
    background: rgba(255, 165, 139, 0.5);
  }

  .right .tempAuditList{
    margin: 0 12px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    /*border: 1px #909399 solid;*/
  }
  .right .tempAuditList .tableTitle{
    padding: 15px 0 5px 130px;
    text-align: left;
    font-weight: bold;
    border-bottom: 1px rgba(0, 0, 0, 0.1) solid;
  }
  .right .table{
    /*overflow-x: ;*/
  }

  .footer{
    height: 40px;
    float: bottom;
    padding: 15px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15) inset;
    text-align: center;
    vertical-align: middle;
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
