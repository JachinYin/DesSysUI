<template>
  <div class="desList">
    <div class="head-box">
      <span class="filter" @click="showFilter()">筛选</span>
      <span class="static">统计数据</span>
    </div>
    <div class="table">
      <el-table :data="desList.slice(index, size)" border :height="609" tooltip-effect="light">
        <el-table-column align="center" label="AID" prop="aid" width="200px"></el-table-column>
        <el-table-column align="center" label="设计师名称" prop="nickName" width="300px"
                         show-overflow-tooltip></el-table-column>
        <el-table-column align="center" label="提交时间" prop="time" width="250px"></el-table-column>
        <el-table-column align="center" label="审核状态" prop="status" width="200px">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">待审核</span>
            <span v-if="scope.row.status === 2" style="color: #fd2814;">打回</span>
            <span v-if="scope.row.status === 3" style="color: #41C26E">通过</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="149px">
          <template slot-scope="scope">
            <span @click="showInfo(scope.$index)" class="showDetail_btn">查看</span>
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
    <!--查看审核信息-->
    <ShowDesDetailBox
      :is-visible="isDetailVisible"
      :desData="desData"
      @closeDetailBox="closeDetailBox"
    />

    <!--打开筛选-->
    <ShowDesFilterBox :is-visible="isFilterVisible" @closeFilterBox="closeFilterBox" @onFilter="onFilter"/>
  </div>
</template>

<script>
  import Pagination from "@/components/util/Pagination";
  import {Comm_Mixins,Pagination_Mixins2} from "@/api/comm/mixins";
  import ShowDesDetailBox from "@/components/module/openvue/designerList/ShowDesDetailBox";
  import ShowDesFilterBox from "@/components/module/openvue/designerList/ShowDesFilterBox";

  export default {
    name: "DesList",
    components: {ShowDesFilterBox, ShowDesDetailBox, Pagination},
    mixins:[Comm_Mixins,Pagination_Mixins2],
    data: function() {
      return {
        desList: [],
        desData: {},
        form:{},
      }
    },
    methods: {
      // 过滤器相关方法
      showFilter : function(){
        this.isFilterVisible = true;
      },
      closeFilterBox: function(){
        this.isFilterVisible = false;

      },
      onFilter: function(form){
        this.form = form;
        this.isFilterVisible = false;
        this.refreshDesList();
      },


      // 查看设计师详细信息相关方法
      showInfo: function (index) {
        let thiz = this;
        let aid = thiz.desList[index].aid;
        $.ajax({
          url: thiz.preUrl + "/getDesigner",
          data: {
            aid: aid,
          },
          success: function (res) {
            if(res.success) {
              thiz.desData = res.data;
              thiz.isDetailVisible = true;
            }else{
              thiz.$message.error("服务繁忙，请稍后重试");
            }
          },
          error: function (res) {
            thiz.$message.error("服务繁忙，请稍后重试");
          }
        });
      },
      closeDetailBox: function(){
        this.isDetailVisible = false;
      },



      refreshDesList: function () {
        let thiz = this;
        $.ajax({
          url: thiz.preUrl + "/getDesignerAuditList",
          data: {
            aid: thiz.form.aid || 0,
            status: thiz.form.status,
            nickName: thiz.form.nickName,
            begTime: thiz.form.begTime,
            endTime: thiz.form.endTime,
            distinct: true,
          },
          success:function (res) {
            if(res.success){
              let data = res.data;
              thiz.desList = data.list;
              thiz.page.total = thiz.desList.length;
              thiz.isLoad = false;
            }else{
              if (res.code === 101){
                thiz.$router.push('/login');
                return;
              }
              thiz.$message.error(res.msg);

            }
          },
          error: function (data) {
            thiz.$message.error('【认证审核表】服务繁忙，请稍后重试');
          }
        });
      },

    },
    created: function() {
      this.refreshDesList()
    }
  }
</script>

<style scoped>

</style>
