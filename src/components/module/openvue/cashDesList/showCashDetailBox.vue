<template>
  <div class="cashList openHtml" v-if="isVisible">
    <div class="body">
      <div class="header">
        <span class="left_title"><span style="color:#ff7f29;">▌</span> 提现记录</span>
        <span class="right_title"><span style="color:#2b89fb;">▌</span> 设计师信息</span>
        <span class="close"><span style="cursor: pointer" @click="closeBox">✖</span></span>
      </div>
      <div class="inner">
        <div class="left">
          <div class="left-inner">
            <div class="money_balance">
              <span class="money">
                ￥{{desData.balance||0}}
              </span>
              <br>
              <span class="tip">可提现余额</span>
            </div>
            <div class="money-other">
              <div class="money-income">
                <div class="money">￥{{desData.totalPrice||0}}</div>
                <div class="tip">全部收入</div>
              </div>
              <div class="split"></div>
              <div class="money-balance">
                <div class="money">￥{{desData.totalWithdraw||0}}</div>
                <div class="tip">已提现金额</div>
              </div>
              <div class="clear" style="clear:both;width: 100%; height: 10px;"></div>
            </div>

            <div class="cashRecTable table">
              <el-table :data="cashRecList">
                <el-table-column label="提现金额(元)" prop="price" align="center"></el-table-column>
                <el-table-column label="提现时间" prop="time" align="center"></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div class="info right">
          <div class="right-inner">
            <br>
            <div class="item">
              <span class="name">企业AID</span>
              <span class="value">{{desData.aid}}</span>
            </div>
            <div class="item">
              <span class="name">昵称</span>
              <span class="value">{{desData.nickName}}</span>
            </div>
            <div class="item">
              <span class="name">联系手机</span>
              <span class="value">{{desData.phone}}</span>
            </div>
            <div class="item">
              <span class="name">真实姓名</span>
              <span class="value">{{desData.realName}}</span>
            </div>
            <div class="item">
              <span class="name">联系微信</span>
              <span class="value">{{desData.weChat}}</span>
            </div>
            <div class="item">
              <span class="name">联系QQ</span>
              <span class="value">{{desData.qq}}</span>
            </div>
            <div class="cashTempTable table" style="width: 350px;">
              <el-table :data="cashTempList" tooltip-effect="light">
                <el-table-column label="模板ID" prop="tempId" align="center" width="68px"></el-table-column>
                <el-table-column label="模板标题" prop="title" align="center" width="100px" show-overflow-tooltip></el-table-column>
                <el-table-column label="金额" prop="price" align="center" width="80px">
                  <template slot-scope="scope">
                    <span v-if="scope.row.price < 0" style="color: #c15c0d">{{scope.row.price}}</span>
                    <span v-if="scope.row.price > 0" style="color: #41C26E">{{scope.row.price}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作时间" prop="time" align="center" width="100px"></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mask" @click="closeBox"></div>
  </div>
</template>

<script>
  export default {
    name: "ShowCashDetailBox",
    props: ['isVisible', 'aid'],
    data: function () {
      return{
        desData: {},
        cashRecList: [],
        cashTempList: [],
      }
    },
    methods: {
      closeBox() {
        this.$emit("closeBox");
      },
      // 获取设计师信息
      getDesData() {
        let that = this;
        $.ajax({
          url: that.preUrl + '/getDesignerInfo',
          data:{
            aid: that.aid || 0,
          },
          success: function(res){
            if(res.success){
              that.desData = res.data.desData;
            }else{
              that.$message.error(res.msg);
            }
          },
          error: function(){
            that.$message.error("网络繁忙，请稍后重试~");
          }
        })
      },
      // 获取提现记录列表(左边的表)
      getCashRecList() {
        let that = this;
        $.ajax({
          url: that.preUrl + '/getCashFlowShowList',
          data:{
            aid: that.aid || 0,
            type: 2,
          },
          success: function(res){
            if(res.success){
              that.cashRecList = res.data.list;
            }else{
              that.$message.error(res.msg);
            }
          },
          error: function(){
            that.$message.error("网络繁忙，请稍后重试~");
          }
        })
      },
      // 获取收入记录列表(右边的表)
      getCashTempList() {
        let that = this;
      },

      getCashDetail(){
        let that = this;
        $.ajax({
          url: that.preUrl + '/getCashDetail',
          data:{
            aid: that.aid || 0,
          },
          success: function(res){
            if(res.success){
              that.desData = res.data.desData;
              that.cashRecList = res.data.cashRecList;
              that.cashTempList = res.data.cashTempList;
            }else{
              that.$message.error(res.msg);
            }
          },
          error: function(){
            that.$message.error("网络繁忙，请稍后重试~");
          }
        })
      }
    },
    watch:{
      isVisible(){
        if(this.isVisible){
          this.getCashDetail();
          // this.getDesData();
          // this.getCashRecList();
          // this.getCashTempList();
        }

      }
    }
  }
</script>

<style scoped>
  .body{
    width: 860px;
    height: 550px;
    text-align: left;
  }

  /* 内容弹出框 */
  .header {
    line-height: 40px;
    width: 100%;
    height: 40px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    color: black;
  }
  .header .left_title{
    box-sizing: border-box;
    padding-left: 30px;
    width: 400px;
    display: inline-block;
  }
  .header .right_title{
    box-sizing: border-box;
    padding-left: 40px;
    width: 400px;
    display: inline-block;
  }
  .header .close {
    width: 50px;
    text-align: center;
    float: right;
    color: #666666;
    display: inline-block;
    z-index: 10;
  }

  /* 提现记录-左边部分 */
  .inner .left {
    width: 420px;
    overflow: hidden;
    float: left;
    height: 480px;
    box-sizing: border-box;
  }
  .inner .left .left-inner {
    width: 360px;
    height: 480px;
    overflow: auto;
    margin: auto;
  }
  .inner .left .left-inner .money_balance {
    margin-top: 40px;
    text-align: center;
  }
  .inner .left .left-inner .money_balance .money {
    font-size: 30px;
    color: #ff7f29;
    line-height: 27px;
  }
  .inner .left .left-inner .money-other {
    width: 360px;
    margin-top: 38px;
    margin-bottom: 37px;
  }
  .inner .left .left-inner .money-other .money-income,
  .inner .left .left-inner .money-other .money-balance {
    width: 168px;
    float: left;
    text-align: center;
  }
  .inner .left .left-inner .money-other .money {
    font-size: 18px;
    line-height: 18px;
    color: #111111;
    margin-bottom: 14px;
  }
  .inner .left .left-inner .money-other .tip {
    font-size: 14px;
    color: #888888;
    line-height: 18px;
  }
  .inner .left .left-inner .money-other .split {
    float: left;
    width: 1px;
    height: 26px;
    background-color: #e9e8ed;
  }

  /* /提现记录-左边部分 */

  /* 设计师信息-右边部分 */
  .inner .right {
    width: 410px;
    float: right;
    overflow: hidden;
    background: #fcfcfc;
    /*margin-top: 15px;*/
    margin-right: 30px;
  }
  .inner .right .right-inner {
    width: 380px;
    height: 480px;
    padding: 20px 15px 0 30px;
    overflow: auto;
  }
  .inner .right .right-inner .item {
    margin-bottom: 13px;
  }
  .inner .right .right-inner .item:nth-of-type(6) {
    margin-bottom: 32px;
  }
  .inner .right .right-inner .item .name {
    display: inline-block;
    width: 90px;
    color: #888888;
    font-size: 14px;
    line-height: 18px;
    margin-right: 10px;
  }
  .inner .right .right-inner .item .value {
    display: inline-block;
    color: #111111;
    font-size: 14px;
    line-height: 18px;
  }

  /* /设计师信息-右边部分 */

  /* 表格 */
  .inner .el-table{
    border-radius: 8px;
    border: 1px #f2f2f2 solid;
    box-shadow: rgba(153, 153, 153, 0.2) 0px 2px 10px 0px;

  }
  .inner .el-table th {
    background-color: #ffffff;
  }
  .inner .el-table th > .cell {
    opacity: .6;
    font-size: 14px;
    font-weight: normal;
  }

  /* /表格 */

  .inner .bottom {
    width: 100%;
    height: 130px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15) inset;
    text-align: center;
    padding-top: 20px;
  }
  .inner .bottom div {
    position: relative;
  }
  .inner .bottom .tip {
    display: inline-block;
    position: absolute;
    top: 21px;
    right: 320px;
  }
  /* /内容弹出框 */

  ::-webkit-scrollbar
  {
    width: 0;
    height: 0;
  }
</style>
