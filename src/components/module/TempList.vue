<template>
  <div class="tempList">
    <div class="head-box">
      <span class="filter" @click="showFilter()">筛选</span>
      <span class="static">统计数据</span>
    </div>
    <div class="table">
      <el-table :data="templateList.slice(index, size)" border :height="609" tooltip-effect="light">
        <el-table-column align="center" label="模板ID" prop="tempId" width="125px"></el-table-column>
        <el-table-column align="center" label="模板标题" prop="name" width="245px"
                         show-overflow-tooltip></el-table-column>
        <el-table-column align="center" label="设计师" prop="designer" width="150px"></el-table-column>
        <el-table-column align="center" label="审核时间" prop="time" width="200px"></el-table-column>
        <el-table-column align="center" label="审核状态" prop="status" width="125px"></el-table-column>
        <el-table-column align="center" label="采购价" prop="price" width="125px"></el-table-column>
        <el-table-column align="center" label="操作" width="125px">
          <template slot-scope="scope">
            <span @click="showInfo(scope.$index)" class="showDetail">查看</span>
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
    <div class="filter-box " v-if="isFilterVisible" v-cloak>
      <div class="body">
            <span class="title">
                <span style="color:#2b89fb;">▌</span> 筛选条件
                <span class="close_btn" @click="isFilterVisible = !isFilterVisible">&#10006</span>
            </span>
        <hr>
        <span class="input_line">
                <label for="tempId">模板ID</label><input type="text" id="tempId">
            </span>
        <span class="input_line">
                <label for="name">设计师</label><input type="text" id="name">
            </span>
        <span class="input_line">
                <label for="title">模板标题</label><input type="text" id="title">
            </span>
        <span class="input_line">
                <label for="time">审核时间</label><input type="text" id="time">
            </span>
        <span class="input_line">
                <label for="status">审核状态</label><input type="text" id="status">
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
  import {Pagination_Mixins2} from "@/assets/mixins";

  export default {
    name: "TempList",
    data(){
      return{
        isFilterVisible: false,
        templateList: [],
      }
    },
    mixins: [Pagination_Mixins2],
    methods:{
      showFilter: function () {
        this.isFilterVisible = true;
      },
      onClear: function () {

      },
      onFilter: function () {
        this.isFilterVisible = !this.isFilterVisible;
      },
      showInfo: function (index) {
        console.log(index);
      },
      refreshTabData: function () {
        let thiz = this;
        $.ajax({
          url: thiz.preUrl + "getTemplateList",
          type: 'get',
          dataType: 'json',
          success:function (res) {
            if(res.success){
              let data = res.other;
              thiz.templateList = data.list;
              thiz.page.total = thiz.templateList.length;
            }else{
              thiz.$message.error('【模板审核表】服务繁忙，请稍后重试');
            }
          },
          error: function (data) {
            // thiz.$message.error('【模板审核表】服务繁忙，请稍后重试');
          }
        });
      }
    },
    created() {
      this.refreshTabData();
    }
  }
</script>

<style scoped>
  /*filter */
  .filter-box{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .body{
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    position: relative;
    top: 12%;
    margin: auto;
    text-align: center;
    background: white;
    color: #909399;
    border-radius: 6px;

    width: 400px;
    height: 460px;
    z-index: 1000;

    padding-top: 1px;
  }

  .body .title{
    display: block;
    text-align: left;
    margin: 15px 25px;
    height: 25px;
    font-size: 18px;
  }
  .body .close_btn{
    float: right;
    padding-right: 10px;
    cursor: pointer;
  }
  .body hr{
    border: none;
    width: 90%;
    border-bottom: 1px #bfbfbf4a solid;
    margin-bottom: 30px;
  }
  .body .footer{
    margin-top: 15px;
  }

  .body .input_line{
    display: inline-block;
  }
  .body .input_line label{
    width: 65px;
    padding-right: 10px;
    display: inline-block;
    text-align: right;
    height: 55px;
  }
  .body .input_line input{
    width: 250px;
    height: 30px;
    border: 0 #dbdbdb solid;
    outline: none;
    background: #F2F3F5;
  }

  .btn{
    border-radius: 6px;
    width: 150px;
    height: 40px;
    line-height: 40px;      /*在div中让文字垂直居中,设置了div的高度,则相应设置文字的行高即可*/
    border: 1px #dedede solid;
    cursor: pointer;
    display: inline-block;
  }
  .btn:nth-child(1){
    width: 110px;
    background: #909399;
    color: white;
  }
  .btn:nth-child(2){
    margin-left: 20px;
    width: 190px;
    background: #2b89fb;
    color: white;
  }
  .btn:nth-child(1):hover{
    background: rgba(144, 147, 153, 0.81);
  }
  .btn:nth-child(2):hover{
    background: rgba(43, 137, 251, 0.81);
  }
</style>
