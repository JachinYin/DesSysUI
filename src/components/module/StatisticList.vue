<template>
  <div content="statisticList">
    <div class="head-box">
      <div class="filter" @click="back">
        <span style="padding-left: 58px">
        <icon i-class="back"></icon>
          返回
        </span>
      </div>
      <div class="search">
        <div style="display: inline-block">
          调整年份
          <i class="el-icon-remove-outline" @click="changeDate('year', -1)"></i>
          <span style="color: black">{{form.year}}</span>
          <!--<span @click="isShowYear=!isShowYear" v-if="!isShowYear">{{form.year}}</span>-->
          <!--<el-input v-model="form.year" style="width: 60px" size="mini" v-if="isShowYear" @change="isShowYear=!isShowYear"></el-input>-->
          <i class="el-icon-circle-plus-outline" @click="changeDate('year', 1)"></i>
        </div>
        -
        <div style="display: inline-block">
          调整月份
          <i class="el-icon-remove-outline" @click="changeDate('month', -1)"></i>
          <span style="color: black">{{form.month}}</span>
          <!--<span @click="isShowYear=!isShowYear" v-if="!isShowYear">{{form.year}}</span>-->
          <!--<el-input v-model="form.year" style="width: 60px" size="mini" v-if="isShowYear" @change="isShowYear=!isShowYear"></el-input>-->
          <i class="el-icon-circle-plus-outline" @click="changeDate('month', 1)"></i>
        </div>
      </div>
      <div class="export">
        <span @click="onExport"><icon i-class="export"></icon>导出</span>
      </div>
    </div>
    <div class="table">
      <p>{{form.year}}年{{form.month}}月提现统计</p>
      <el-table :data="cashStatisticList.slice(index,size)" border :height="572" tooltip-effect="light" id="out-table">
        <el-table-column align="center" label="AID" prop="aid" width="100px"></el-table-column>
        <el-table-column align="center" label="真实姓名" prop="realName" width="100px"></el-table-column>
        <el-table-column align="center" label="联系手机" prop="phone" width="150px"></el-table-column>
        <el-table-column align="center" label="持卡人" prop="cardHolder" width="100px"></el-table-column>
        <el-table-column align="center" label="开户行" prop="openBank" width="250px"></el-table-column>
        <el-table-column align="center" label="银行卡账号" prop="bankAcct" width="250px"></el-table-column>
        <el-table-column align="center" label="提现总额" prop="price" width="148px"></el-table-column>
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

    // 引入导出Excel表格依赖
    import FileSaver from "file-saver";
    import XLSX from "xlsx";


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
          let that = this;
          $.ajax({
            url: that.preUrl + "/getTotalWithdraw",
            data: {
              year: that.form.year,
              month: that.form.month,
            },
            success: function (res) {
              if (res.success) {
                let data = res.data;
                that.cashStatisticList = data.totalList;
                that.page.total = that.cashStatisticList.length;
                that.isLoad = false;
              } else {
                that.$message.error(res.msg);
              }
            },
            error: function (data) {
              that.$message.error("网络繁忙，请稍后重试~");
            }
          });
        },

        onExport: function () {
          /* 从表生成工作簿对象 */
          let wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
          /* 获取二进制字符串作为输出 */
          let wbout = XLSX.write(wb, {
            bookType: "xlsx",
            bookSST: true,
            type: "array"
          });
          try {
            FileSaver.saveAs(
              //Blob 对象表示一个不可变、原始数据的类文件对象。
              //Blob 表示的不一定是JavaScript原生格式的数据。
              //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
              //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
              new Blob([wbout], { type: "application/octet-stream" }),
              //设置导出文件名称
              "财务打款表.xlsx"
            );
          } catch (e) {
            if (typeof console !== "undefined") console.log(e, wbout);
          }
          return wbout;
        }
      },
      created() {
        let date = new Date();
        this.form.year = date.getFullYear();
        this.form.month = date.getMonth() + 1;
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
    box-sizing: border-box;
  }
  .export span{
    cursor: pointer;
    padding-right: 58px;
    float: right;
    line-height: 50px;
  }
  .export span:hover{
    color: #5daf34;
  }

  .table p {
    cursor: default;
    font-weight: bold;
    background: white;
    margin: 0;
    padding: 8px 0;
    border-top: 1px #eaeaea solid;
  }
</style>
