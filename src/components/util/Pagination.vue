<template>
  <div class="pageNav">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.currentPage"
      :page-sizes="[5, 10, 15]"
      :page-size="page.pageSize"
      :total="page.total"
      layout="total, prev, pager, next, jumper"
      style="padding-top: 12px"
    >
    </el-pagination>
  </div>
</template>

<script>
    export default {
      name: "Pagination",
      props:['dataList'],
      data(){
        return{
          page:{
            currentPage: 1,  // 当前页
            // pages: 50,        // 总页码
            pageSize: 14,        // 分页数
            total: 0,        // 总记录
          }
        }
      },
      computed:{
        index: function () {
          return (this.page.currentPage-1) * this.page.pageSize;
        },
        size: function () {
          return this.page.currentPage * this.page.pageSize;
        }
      },
      methods:{
        handleCurrentChange:function (val) {
          this.page.currentPage = val;
          this.$emit("getPage", this.index, this.size);
        },
        handleSizeChange: function (val) {
          this.$emit("getPage", this.index, this.size);
          this.page.pageSize = val;
        }
      },
      created() {
        this.page.total = this.dataList.length;
      }
    }
</script>

<style scoped>

</style>
