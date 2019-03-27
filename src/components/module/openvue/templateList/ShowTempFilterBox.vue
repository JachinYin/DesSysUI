<template>
  <div class="temp_filter openHtml" v-if="isVisible">
    <div class="body">
      <span class="title">
        <span style="color:#2b89fb;">▌</span> 筛选条件
        <span class="close_btn" @click="closeFilterBox">&#10006</span>
      </span>
      <hr>
      <el-form :inline="true" :model="form" @keyup.enter.native="onFilter()">
        <el-form-item label="审核时间" label-width="80px">
          <el-date-picker class="dateRange"
                          v-model="times"
                          type="daterange"
                          range-separator="至"
                          start-placeholder="开始时间"
                          end-placeholder="结束时间"
                          value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>

        <br>
        <el-form-item label="模板ID" label-width="80px">
          <el-input v-model="form.tempId" maxlength="11"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="模板标题" label-width="80px">
          <el-input v-model="form.title" maxlength="20"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="设计师" label-width="80px">
          <el-input v-model="form.nickName" maxlength="20"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="审核状态" label-width="80px">
          <el-select v-model="form.status" filterable style="width: 250px">
            <el-option v-for="(status, index) in statusList" :key="index" :label="status.name"
                       :value="status.value"></el-option>
          </el-select>
        </el-form-item>


        <br>
        <el-form-item>
          <el-button type="info" @click="onClear()" size="medium" style="width: 100px;">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onFilter()" size="medium" style="width: 200px;margin-left: 8px">
            确定
          </el-button>
        </el-form-item>

      </el-form>
    </div>
    <div class="mask" @click="closeFilterBox"></div>
  </div>
</template>

<script>
    export default {
      name: "ShowTempFilterBox",
      props: ['isVisible'],
      data(){
        return{
          form: this.onClear(),
          times: [],
          statusList:[
            {value: 0, name: '全部'},
            {value: 1, name: '待审核'},
            {value: 2, name: '打回'},
            {value: 3, name: '通过'},
          ]
        }
      },
      methods: {
        onClear(){
          this.form = {
            nickName: '',
            status: 0,
            tempId: '',
            title: '',
          };
          this.times = [];
          return this.form;
        },
        closeFilterBox(){
          this.form.isSubmit = false;
          this.$emit("closeFilterBox", this.form);
        },
        onFilter(){
          this.form.begTime = this.times[0] || '';
          this.form.endTime = this.times[1] || '';
          this.$emit("onFilter", this.form);
        }
      }
    }
</script>

<style scoped>
  .body {
    height: 470px;
    width: 400px;
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




  .dateRange{
    width: 250px!important;
    height: 40px;
    font-size: 40px;
  }
  .el-form-item__label{
    line-height: 40px;
    font-size: 16px!important;
    user-select: none!important;
  }
  .el-input{
    width: 250px!important;
    font-size: 16px;
  }

</style>


