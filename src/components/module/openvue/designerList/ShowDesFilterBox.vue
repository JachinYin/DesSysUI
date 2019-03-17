<template>
  <div class="filter_temp openHtml" v-if="isVisible" v-cloak>
    <div class="body">
      <span class="title">
        <span style="color:#2b89fb;">▌</span> 筛选条件
        <span class="close_btn" @click="closeFilterBox">&#10006</span>
      </span>
      <hr>
      <span class="input_line">
        <label>账户AID</label><input type="text" v-model="form.aid">
      </span>
      <span class="input_line">
        <label>设计昵称</label><input type="text" v-model="form.nickName">
      </span>
      <span class="input_line">
        <label>审核时间</label><input type="text" v-model="form.time">
      </span>
      <span class="input_line">
        <label>审核状态</label>
        <select type="select" v-model="form.status">
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
    <div class="mask" @click="closeFilterBox"></div>
  </div>
</template>

<script>
    export default {
      name: "ShowDesFilterBox",
      props: ['isVisible'],
      data: function () {
        return{
          form: this.onClear(),
        }
      },

      methods: {
        closeFilterBox: function () {
          this.$emit("closeFilterBox");
        },
        onClear: function () {
          this.form = {
            aid: '',
            nickName: '',
            time:  '',
            status: 0
          };
          return this.form;
        },
        onFilter: function () {
          this.$emit("onFilter", this.form);
          this.closeFilterBox();
        }
      }
    }
</script>

<style scoped>
  .body {
    height: 420px;
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

