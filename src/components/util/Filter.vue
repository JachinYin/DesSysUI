<template>
  <div class="filter-box" v-if="isVisible" v-cloak>
    <div class="body">
            <span class="title">
                <span style="color:#2b89fb;">▌</span> 筛选条件
                <span class="close_btn" @click="isFilterVisible = !isVisible">&#10006</span>
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
    <div class="mask" v-if="isVisible"></div>
  </div>
</template>

<script>
    export default {
      name: "Filter",
      data(){
        return{
          isFilterVisible: false,
        }
      },
      methods:{
        showBox: function () {
          this.isVisible = true;
          this.$emit('showBox');
        },
        onClear: function () {

        },
        onFilter: function () {
          this.isVisible = !this.isFilterVisible;
        }
      }
    }
</script>

<style scoped>

</style>
