<template>
  <div class="cashDesList" >

    <div class="head-box">
      <span class="filter" @click="showFilter()">筛选</span>
      <span class="static">统计数据</span>
    </div>

    <div class="table">
      <el-table :data="cashDesList.slice(index, size)" border :height="609" tooltip-effect="light">
        <el-table-column align="center" label="AID" prop="aid" width="190px"></el-table-column>
        <el-table-column align="center" label="设计师名称" prop="nickName" width="200px"></el-table-column>
        <el-table-column align="center" label="全部收入" prop="totalPrice" width="180px"></el-table-column>
        <el-table-column align="center" label="已提现金额" prop="withdraw" width="200px"></el-table-column>
        <el-table-column align="center" label="可提现金额" prop="balance" width="200px"></el-table-column>
        <el-table-column align="center" label="操作" width="125px">
          <template slot-scope="scope">
            <span @click="showCashDesDetailBox(scope.$index)" class="showDetail_btn">查看</span>
          </template>
        </el-table-column>
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

    <ShowCashDesFilterBox :is-visible="isFilterVisible" @closeFilterBox="closeFilterBox" @onFilter="onFilter"></ShowCashDesFilterBox>
    <ShowCashDetailBox :is-visible="isCashVisible" :aid="aid" @closeBox="closeCashDetailBox"></ShowCashDetailBox>

  </div>
</template>

<script>
    import Pagination from "../../components/util/Pagination";
    import ShowCashDesFilterBox from "../../components/module/openvue/cashDesList/ShowCashDesFilterBox";
    import ShowCashDetailBox from "../../components/module/openvue/cashDesList/ShowCashDetailBox";
    import {Comm_Mixins, Pagination_Mixins2} from "../../api/comm/mixins";

    export default {
      name: "CashDesList",
      components: {ShowCashDetailBox, ShowCashDesFilterBox, Pagination},
      mixins: [Pagination_Mixins2, Comm_Mixins],
      data(){
        return{
          cashDesList:[],
          form:{},
          aid: 0,
        }
      },
      methods:{
        showCashDesDetailBox: function(index){
          this.aid = this.cashDesList[index].aid;
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

        refreshTabData: function () {
          let thiz = this;
          $.ajax({
            url: thiz.preUrl + "/getCashDesList",
            data: {
              nickName: thiz.form.nickName,
              aid: thiz.form.aid || 0,
            },
            success: function (res) {
              if (res.success) {
                let data = res.data;
                thiz.cashDesList = data.list;
                thiz.page.total = thiz.cashDesList.length;
                thiz.isLoad = false;
              } else {
                if (res.code === 101){
                  thiz.$router.push('/login');
                  return;
                }
                thiz.$message.error(res.msg);
              }
            },
            error: function (data) {
              thiz.$message.error("网络繁忙，请稍后重试~");
            }
          });
        }
      },
      created() {
        this.refreshTabData();
      },
    }
</script>

<style scoped>

</style>
