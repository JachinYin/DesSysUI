<template>
  <div class="cashRecList">
    <div class="head-box">
      <span class="filter" @click="showFilter()">筛选</span>
      <span class="static">统计数据</span>
    </div>
    <div class="table">
      <el-table :data="cashRecList.slice(index,size)" border :height="609" tooltip-effect="light">
        <el-table-column align="center" label="提交时间" prop="time" width="200px"></el-table-column>
        <el-table-column align="center" label="AID" prop="aid" width="170px"></el-table-column>
        <el-table-column align="center" label="设计师名称" prop="nickName" width="200px"
                         show-overflow-tooltip></el-table-column>
        <el-table-column align="center" label="本次提现金额" prop="price" width="200px"></el-table-column>
        <el-table-column align="center" label="剩余可提现金额" prop="balance" width="200px"></el-table-column>
        <el-table-column align="center" label="操作" width="125px">
          <template slot-scope="scope">
            <span @click="showDetail(scope.$index)" class="showDetail_btn">查看</span>
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

  </div>
</template>

<script>
    import {Pagination_Mixins2} from "../../assets/mixins";

    export default {
      name: "CashRecList",
      mixins:[Pagination_Mixins2],
      data(){
        return{
          cashRecList:[]
        }
      },
      methods:{

        refreshTabData: function () {
          let thiz = this;
          $.ajax({
            url: thiz.preUrl + "/getCashFlowShowList",
            type: 'get',
            data: {
              // aid: thiz.aid,
              // designer: thiz.designer,
              // status: thiz.status,
              // tempId: thiz.tempId || 0,
              // title: thiz.title,
              time: thiz.time,
              // distinct: true,
            },
            success: function (res) {
              if (res.success) {
                let data = res.data;
                thiz.cashRecList = data.list;
                thiz.page.total = thiz.templateList.length;
                thiz.isLoad = false;
              } else {
                thiz.$message.error(res.msg);
                if (res.code === 101){
                  thiz.$router.push('/login');
                }
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
