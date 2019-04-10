<template>
  <div content="statisticList">
    <div class="head-box">
      <div class="filter" @click="back"><span style="padding-left: 58px">返回</span></div>
      <div class="search">
        <div style="display: inline-block">
          <i class="el-icon-remove-outline" @click="changeDate('year', -1)"></i>
          <span>{{form.year}}</span>
          <!--<span @click="isShowYear=!isShowYear" v-if="!isShowYear">{{form.year}}</span>-->
          <!--<el-input v-model="form.year" style="width: 60px" size="mini" v-if="isShowYear" @change="isShowYear=!isShowYear"></el-input>-->
          <i class="el-icon-circle-plus-outline" @click="changeDate('year', 1)"></i>
        </div>
        <div style="display: inline-block">
          <i class="el-icon-caret-left" @click="changeDate('month', -1)"></i>
          <el-input v-model="form.month" style="width: 50px" size="mini"></el-input>
          <i class="el-icon-caret-right" @click="changeDate('month', 1)"></i>
        </div>
      </div>
      <div class="export"></div>
    </div>
    <div class="table">
      <p>{{form.year}}年{{form.month}}月提现统计</p>
      <el-table :data="cashStatisticList.slice(index,size)" border :height="572" tooltip-effect="light">
        <el-table-column align="center" label="提现时间" prop="time" width="200px"></el-table-column>
        <el-table-column align="center" label="AID" prop="aid" width="280px"></el-table-column>
        <el-table-column align="center" label="设计师名称" prop="nickName" width="200px"></el-table-column>
        <el-table-column align="center" label="本次提现金额" prop="price" width="200px"></el-table-column>
        <el-table-column align="center" label="剩余可提现金额" prop="balance" width="200px"></el-table-column>
      </el-table>
    </div>
    <div class="pageNav">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        :total="page.total"
        layout="total, prev, pager, next, jumper"
        style="padding-top: 12px"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
    import {Pagination_Mixins2} from "@/api/comm/mixins";

    export default {
      name: "StatisticList",
      mixins: [Pagination_Mixins2],
      data(){
        return {
          isShowYear: false,
          cashStatisticList: [],
          form: {
            year: 2010,
            month: 1,
          },
        }
      },
      methods:{
        back: function(){
          this.$router.push("/cashRecList")
        },

        changeDate(type, val){
          if(type === 'year'){
            let tmpYear = this.form.year + val;
            if(tmpYear > 0 ) this.form.year = tmpYear;
          }else{
            let tmpMonth = this.form.month + val;
            if(tmpMonth > 0 && tmpMonth < 13) this.form.month = tmpMonth;
          }
          this.refreshTabData();
        },

        refreshTabData: function () {
          let thiz = this;
          $.ajax({
            url: thiz.preUrl + "/getCashFlowShowList",
            data: {
              begTime: thiz.form.begTime,
              endTime: thiz.form.endTime,
            },
            success: function (res) {
              if (res.success) {
                let data = res.data;
                thiz.cashStatisticList = data.list;
                thiz.page.total = thiz.cashStatisticList.length;
                thiz.isLoad = false;
              } else {
                thiz.$message.error(res.msg);
              }
            },
            error: function (data) {
              thiz.$message.error("网络繁忙，请稍后重试~");
            }
          });
        },
      },
      created() {
        let date = new Date();
        this.form.year = date.getFullYear();
        this.form.month = date.getMonth();
        console.log(this.form);
        this.refreshTabData();
      }
    }
</script>

<style scoped>
  .head-box{
    display: flex;
  }
  .filter{
    flex: 1;
    margin: 0;
    /*padding-left: 58px;*/
    box-sizing: border-box;
  }

  .search{
    text-align: center;
    flex: 1;
    line-height: 50px;
    display: inline-block;
    /*width: 50%;*/
  }
  .search i{
    cursor: pointer;
    font-size: 18px;
  }
  .search i:hover{
    color: #2b89fb;
  }

  .export{
    flex: 1;
    display: inline-block;
  }

  .table p {
    cursor: default;
    font-weight: bold;
    background: white;
    margin: 0;
    padding: 8px 0;
    border-top: 1px #f2f2f2 solid;
  }
</style>
