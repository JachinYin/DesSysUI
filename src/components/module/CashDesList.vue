<template>
  <div class="cashDesList">

    <div class="head-box">
      <span class="filter" @click="showFilter()">筛选</span>
      <span class="static">统计数据</span>
    </div>

    <div class="table">
      <el-table :data="dataList.slice(page.index, page.size)" border :height="609" tooltip-effect="light">
        <el-table-column align="center" label="AID" prop="aid" width="150px"></el-table-column>
        <el-table-column align="center" label="设计师名称" prop="name" width="150px"
                         show-overflow-tooltip></el-table-column>
        <el-table-column align="center" label="全部收入" prop="status" width="150px"></el-table-column>
        <el-table-column align="center" label="今日收入" prop="status" width="120px"></el-table-column>
        <el-table-column align="center" label="已提现金额" prop="status" width="200px"></el-table-column>
        <el-table-column align="center" label="可提现金额" prop="status" width="200px"></el-table-column>
        <el-table-column align="center" label="操作" width="125px">
          <template slot-scope="scope">
            <span @click="showInfo(scope.$index)" class="showDetail_btn">查看</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <Pagination :data-list="dataList" @getPage="changePage"/>
  </div>
</template>

<script>
    import Pagination from "@/components/util/Pagination";
    export default {
      name: "CashDesList",
      components: {Pagination},
      data(){
        return{
          dataList:[],
          page:{
            index: 0,
            size: 14
          }
        }
      },
      methods:{
        showDetail: function (index) {

        },
        changePage: function (index, size) {
          this.page.index = index;
          this.page.size = size;
        }
      },
      created() {
        this.dataList = [
          {
            aid: 1,
            name: '花艺',
            time: '2019-03-11',
            status: '审核中',
          },
          {
            aid: 2,
            name: '花艺',
            time: '2019-03-11',
            status: '审核中',
          },
          {
            aid: 3,
            name: '花艺',
            time: '2019-03-11',
            status: '审核中',
          },
          {
            aid: 4,
            name: '花艺',
            time: '2019-03-11',
            status: '审核中',
          },
          {
            aid: 5,
            name: '花艺',
            time: '2019-03-11',
            status: '审核中',
          },
          {
            aid: 6,
            name: '花艺',
            time: '2019-03-11',
            status: '审核中',
          },
          {
            aid: 7,
            name: '花艺',
            time: '2019-03-11',
            status: '审核中',
          },
          {
            aid: 8,
            name: '花艺',
            time: '2019-03-11',
            status: '审核中',
          },
          {
            aid: 9,
            name: '花艺',
            time: '2019-03-11',
            status: '审核中',
          },
          {
            aid: 10,
            name: '花艺',
            time: '2019-03-11',
            status: '审核中',
          },
          {
            aid: 11,
            name: '花艺',
            time: '2019-03-11',
            status: '审核中',
          },
          {
            aid: 12,
            name: '花艺',
            time: '2019-03-11',
            status: '审核中',
          },
          {
            aid: 13,
            name: '花艺',
            time: '2019-03-11',
            status: '审核中',
          },
          {
            aid: 14,
            name: '花艺',
            time: '2019-03-11',
            status: '审核中',
          },
          {
            aid: 15,
            name: '花艺',
            time: '2019-03-11',
            status: '审核中',
          },
          {
            aid: 16,
            name: '花艺',
            time: '2019-03-11',
            status: '审核中',
          },
        ];
      },
    }
</script>

<style scoped>

</style>
