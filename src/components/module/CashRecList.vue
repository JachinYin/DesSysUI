<template>
  <div class="cashRecList">
    <div class="head-box">
      <span class="filter" @click="showFilter()">
        <icon i-class="filter"></icon>
        筛选
      </span>
      <span class="static" @click="goStatistic" style="float: right;margin-right: 58px">
        <icon i-class="balance"></icon>
        统计数据
      </span>
    </div>
    <div class="table">
      <el-table :data="cashRecList.slice(index,size)" border :height="609" tooltip-effect="light">
        <el-table-column align="center" label="提现时间" prop="time" width="200px"></el-table-column>
        <el-table-column align="center" label="AID" prop="aid" width="280px"></el-table-column>
        <el-table-column align="center" label="设计师名称" prop="nickName" width="200px"
                         show-overflow-tooltip></el-table-column>
        <el-table-column align="center" label="本次提现金额" prop="price" width="200px"></el-table-column>
        <el-table-column align="center" label="剩余可提现金额" prop="balance" width="200px"></el-table-column>
        <!--<el-table-column align="center" label="操作" width="125px">-->
          <!--<template slot-scope="scope">-->
            <!--<span @click="showCashDetailBox(scope.$index)" class="showDetail_btn">查看</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
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


    <ShowCashRecFilterBox :is-visible="isFilterVisible" @closeFilterBox="closeFilterBox" @onFilter="onFilter"></ShowCashRecFilterBox>
    <ShowCashDetailBox :is-visible="isCashVisible" @closeBox="closeCashDetailBox"></ShowCashDetailBox>

  </div>
</template>

<script>
    import {Pagination_Mixins2, Comm_Mixins} from "@/api/comm/mixins";
    import ShowCashDetailBox from "@/components/module/openvue/cashDesList/ShowCashDetailBox";
    import ShowCashRecFilterBox from "@/components/module/openvue/cashRecList/ShowCashRecFilterBox";

    export default {
      name: "CashRecList",
      components: {ShowCashRecFilterBox, ShowCashDetailBox},
      mixins:[Pagination_Mixins2, Comm_Mixins],
      data(){
        return{
          cashRecList:[],
          form:{},
        }
      },
      methods:{
        showCashDetailBox: function(){
          this.isCashVisible = true;
        },
        closeCashDetailBox: function(){
          this.isCashVisible = false;
        },

        showFilter: function(){
          this.isFilterVisible = true;
        },
        closeFilterBox: function(){
          this.isFilterVisible = false;
        },
        onFilter: function(form){
          this.form = form;
          this.closeFilterBox();
          this.refreshTabData();
        },

        goStatistic: function(){
          this.$router.push('/statisticList');
        },

        refreshTabData: function () {
          let that = this;
          $.ajax({
            url: that.preUrl + "/getCashFlowShowList",
            data: {
              aid: that.form.aid || 0,
              begTime: that.form.begTime,
              endTime: that.form.endTime,
            },
            success: function (res) {
              if (res.success) {
                let data = res.data;
                that.cashRecList = data.list;
                that.page.total = that.cashRecList.length;
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
      },
      created() {
        this.refreshTabData();
        // getAllCashFlowList
      }
    }
</script>

<style scoped>

</style>
