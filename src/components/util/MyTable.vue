<template>
  <div>
    <el-table :data="dataList" border :height="600" tooltip-effect="light">
      <el-table-column align="center" label="模板ID" prop="id" width="125px"></el-table-column>
      <el-table-column align="center" label="模板标题" prop="name" width="245px"
                       show-overflow-tooltip></el-table-column>
      <el-table-column align="center" label="设计师" prop="designer" width="150px"></el-table-column>
      <el-table-column align="center" label="审核时间" prop="status" width="200px"></el-table-column>
      <el-table-column align="center" label="审核状态" prop="status" width="125px"></el-table-column>
      <el-table-column align="center" label="采购价" prop="price" width="125px"></el-table-column>
      <el-table-column align="center" label="操作" width="125px">
        <template slot-scope="scope">
          <span @click="showInfo(scope.$index)" class="showDetail">查看</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {
        name: "MyTable",
      // 数据
      data(){
          return{
          }
      },
      // 方法
      methods:{
        showInfo: function (index) {
          console.log(index);
        },
      },
      // 组件通信
      props:['dataList']
    }
</script>

<style scoped>

</style>
