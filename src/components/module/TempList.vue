<template>
  <div class="tempList" v-loading="isLoad" element-loading-text="数据加载中">
    <div class="head-box">
      <span class="filter" @click="showFilter()">筛选</span>
      <span class="static">统计数据</span>
    </div>
    <div class="table">
      <el-table :data="templateList.slice(index, size)" border :height="609" tooltip-effect="light">
        <el-table-column align="center" label="模板ID" prop="tempId" width="125px"></el-table-column>
        <el-table-column align="center" label="模板标题" prop="title" width="245px"
                         show-overflow-tooltip></el-table-column>
        <el-table-column align="center" label="设计师" prop="designer" width="150px"></el-table-column>
        <el-table-column align="center" label="审核时间" prop="time" width="200px"></el-table-column>
        <el-table-column align="center" label="审核状态" prop="status" width="125px">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">待审核</span>
            <span v-if="scope.row.status === 2" style="color: #fd2814;">打回</span>
            <span v-if="scope.row.status === 3" style="color: #41C26E">通过</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="采购价" prop="price" width="125px"></el-table-column>
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
    <ShowDetail :is-visible="isDetailVisible" :temp-data="tempData" @closeDetailBox="closeDetailBox"
                @refresh="refreshTabData"/>

    <!--打开筛选-->
    <ShowTempFilterBox :is-visible="isFilterVisible" @closeFilterBox="closeFilterBox" @onFilter="onFilter"/>
  </div>
</template>

<script>
  import {Comm_Mixins, Pagination_Mixins2} from "../../assets/mixins";
  import ShowDetail from "./openvue/templateList/ShowTempDetail";
  import ShowTempFilterBox from "@/components/module/openvue/templateList/ShowTempFilterBox";

  export default {
    name: "TempList",
    components: {ShowTempFilterBox, ShowDetail},
    data() {
      return {
        templateList: [],
        tempData: {},
        form:{}
      }
    },
    mixins: [Comm_Mixins, Pagination_Mixins2],
    methods: {
      showFilter: function () {
        this.isFilterVisible = true;
      },
      closeFilterBox(form){
        this.isFilterVisible = false;
        if(form.isSubmit){
          this.designer = form.nickName;
          this.status = form.status;
          this.tempId = form.tempId;
          this.begTime = form.begTime;
          this.endTime = form.endTime;
          this.title = form.title;
          this.refreshTabData();
        }
      },
      onFilter(form){
        this.form = form;
        this.isFilterVisible = false;
        this.refreshTabData();
      },

      showDetail: function (index) {
        console.log(index);
        let thiz = this;
        let tempId = thiz.templateList[index].tempId;
        $.ajax({
          url: thiz.preUrl + "/getAuditShowData",
          data: {
            tempId: tempId,
          },
          type: 'get',
          success: function (res) {
            console.log(res);
            thiz.tempData = res.data;
            thiz.isDetailVisible = true;
          },
          error: function (res) {
            console.log(res);
          }
        });

      },
      closeDetailBox: function () {
        this.isDetailVisible = false;
      },

      refreshTabData: function () {
        let thiz = this;
        $.ajax({
          url: thiz.preUrl + "/getTemplateAuditList",
          type: 'get',
          data: {
            designer: thiz.form.nickName,
            title: thiz.form.title,
            status: thiz.form.status || 0,
            tempId: thiz.form.tempId || 0,
            begTime: thiz.form.begTime,
            endTime: thiz.form.endTime,
            distinct: true,
          },
          success: function (res) {
            if (res.success) {
              let data = res.data;
              thiz.templateList = data.list;
              thiz.page.total = thiz.templateList.length;
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
            thiz.$message.error('【模板审核表】服务繁忙，请稍后重试');
          }
        });
      },


    },
    created() {
      this.refreshTabData();
    }
  }

</script>

<style scoped>
  .body {
    height: 480px;
  }

  .body .title {
    display: block;
    text-align: left;
    margin: 15px 25px;
    height: 25px;
    font-size: 18px;
  }

  .body .close_btn {
    float: right;
    padding-right: 10px;
    cursor: pointer;
  }

  .body hr {
    border: none;
    width: 90%;
    border-bottom: 1px #bfbfbf4a solid;
    margin-bottom: 30px;
  }

  .body .footer {
    margin-top: 15px;
  }

  .body .input_line {
    display: inline-block;
  }

  .body .input_line label {
    width: 65px;
    padding-right: 10px;
    display: inline-block;
    text-align: right;
    height: 55px;
  }

  .body .input_line input, select {
    padding: 0 12px;
    width: 226px;
    height: 36px;
    border: 0 #dbdbdb solid;
    border-radius: 2px;
    outline: none;
    background: #f2f2f2;
    color: #777777;
    font-size: 16px;
  }

  .body .input_line select {
    width: 250px;
  }

  body .input_line option {
    background: white;
    font-size: 16px;
  }


</style>
