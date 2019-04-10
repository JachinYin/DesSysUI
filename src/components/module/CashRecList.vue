<template>
  <div class="cashRecList">
    <div class="head-box">
      <span class="filter" @click="showFilter()">筛选</span>
      <span class="static" @click="goStatistic">统计数据</span>
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
          let thiz = this;
          $.ajax({
            url: thiz.preUrl + "/getCashFlowShowList",
            data: {
              aid: thiz.form.aid || 0,
              begTime: thiz.form.begTime,
              endTime: thiz.form.endTime,
            },
            success: function (res) {
              if (res.success) {
                let data = res.data;
                thiz.cashRecList = data.list;
                thiz.page.total = thiz.cashRecList.length;
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
        this.refreshTabData();
        // getAllCashFlowList
      }
    }
</script>

<style scoped>

</style>
