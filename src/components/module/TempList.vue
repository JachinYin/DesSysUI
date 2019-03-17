<template>
  <div class="tempList">
    <div class="head-box">
      <span class="filter" @click="showFilter()">筛选</span>
      <span class="static">统计数据</span>
    </div>
    <div class="table">
      <el-table :data="templateList.slice(index, size)" border :height="609" tooltip-effect="light" v-loading="isLoad">
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
    <div class="filter_temp openHtml" v-if="isFilterVisible" v-cloak>
      <div class="body">
        <span class="title">
          <span style="color:#2b89fb;">▌</span> 筛选条件
          <span class="close_btn" @click="isFilterVisible = !isFilterVisible">&#10006</span>
        </span>
        <hr>
        <span class="input_line">
          <label>模板ID</label><input type="text" v-model="tempId">
        </span>
        <span class="input_line">
          <label>设计师</label><input type="text" v-model="designer">
        </span>
        <span class="input_line">
          <label>模板标题</label><input type="text" v-model="title">
        </span>
        <span class="input_line">
          <label>审核时间</label><input type="text" v-model="time">
        </span>
        <span class="input_line">
          <label>审核状态</label>
          <select type="select" v-model="status">
            <option value="1">待审核</option>
            <option value="2">打回</option>
            <option value="3">通过</option>
          </select>
          </span>
        <br>
        <div class="footer">
          <div class="btn" @click="onClear">重置</div>
          <div class="btn" @click="onFilter">确认</div>
        </div>
      </div>
      <div class="mask" v-if="isFilterVisible"></div>
    </div>
  </div>
</template>

<script>
  import {Comm_Mixins, Pagination_Mixins2} from "../../assets/mixins";
  import ShowDetail from "./openvue/templateList/ShowTempDetail";

  export default {
    name: "TempList",
    components: {ShowDetail},
    data() {
      return {
        templateList: [],
        tempData: {},
        designer: '',
        status: 0,
        tempId: '',
        time: '',
        title: '',
      }
    },
    mixins: [Comm_Mixins, Pagination_Mixins2],
    methods: {
      showFilter: function () {
        this.isFilterVisible = true;
      },
      onClear: function () {
        this.designer = '';
        this.status = 0;
        this.tempId = '';
        this.time = '';
        this.title = '';
      },
      onFilter: function () {
        this.refreshTabData();
        this.isFilterVisible = !this.isFilterVisible;
      },
      showDetail: function (index) {
        console.log(index);
        let thiz = this;
        let tempId = thiz.templateList[index].tempId;
        $.ajax({
          url: thiz.preUrl + "getTempById",
          data: {
            tempId: tempId,
          },
          type: 'get',
          dataType: 'json',
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
          url: thiz.preUrl + "getTemplateList",
          type: 'get',
          data: {
            designer: thiz.designer,
            status: thiz.status,
            tempId: thiz.tempId || 0,
            time: thiz.time,
            title: thiz.title,
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


  .btn {
    border-radius: 6px;
    width: 150px;
    height: 40px;
    line-height: 40px; /*在div中让文字垂直居中,设置了div的高度,则相应设置文字的行高即可*/
    border: 1px #dedede solid;
    cursor: pointer;
    display: inline-block;
  }

  .btn:nth-child(1) {
    width: 110px;
    background: #909399;
    color: white;
  }

  .btn:nth-child(2) {
    margin-left: 20px;
    width: 190px;
    background: #2b89fb;
    color: white;
  }

  .btn:nth-child(1):hover {
    background: rgba(144, 147, 153, 0.81);
  }

  .btn:nth-child(2):hover {
    background: rgba(43, 137, 251, 0.81);
  }
</style>
