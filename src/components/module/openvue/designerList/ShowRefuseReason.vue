<template>
  <div class="具体弹窗名字 openHtml" v-if="isVisible">
    <div class="body">
      <div class="header">
        <span style="color:#2b89fb;">▌</span>打回原因
        <hr>
      </div>
      <div class="container">
        <div class="chose">
          <el-checkbox-group v-model="reasons" @change="putReason">
            <div class="item"><el-checkbox label="缺少封面" name="reasons"></el-checkbox></div>
            <div class="item"><el-checkbox label="封面不符合主题" name="reasons"></el-checkbox></div>
            <div class="item"><el-checkbox label="标题或内容含敏感词汇" name="reasons"></el-checkbox></div>
            <div class="item"><el-checkbox label="关键词填写有误" name="reasons"></el-checkbox></div>
            <div class="item"><el-checkbox label="行业信息不对" name="reasons"></el-checkbox></div>
            <div class="item"><el-checkbox label="内容过长" name="reasons"></el-checkbox></div>
            <div class="item"><el-checkbox label="主题不明显" name="reasons"></el-checkbox></div>
          </el-checkbox-group>
        </div>
        <div class="input">
          <div>填写其他原因</div>
          <el-input type="textarea" :rows="5" v-model="reason"></el-input>
        </div>
      </div>
      <div class="footer">
        <el-button type="primary" size="small" @click="submitReason">确认</el-button>
      </div>
    </div>
    <div class="mask" @click="closeReasonBox"></div>
  </div>
</template>

<script>
    export default {
      name: "ShowRefuseReason",
      props: ['isVisible'],
      data: function () {
        return{
          reason: '',
          reasons: [],
        }
      },
      methods: {
        closeReasonBox: function () {
          this.$emit("closeReasonBox")
        },
        submitReason: function () {
          console.log(this.reasons);
          console.log(this.reason);
        },
        putReason: function () {
          this.reason = String(this.reasons) + ",";
          // this.reason = this.reasons;
          // console.log(this.reasons);
          // for(let i in this.reasons){
          //   this.reason += this.reasons[i];
          //   this.reason += ';'
          // }
        }
      }
    }
</script>

<style scoped>
  .mask{
    z-index: 1001;
    opacity: 0.6;
  }
  .body{
    z-index: 1002;
    height: 440px;
    /*width: 440px;*/
    padding: 20px;
    margin-top: 3%;
  }

  .header{
    height: 30px;
    text-align: left;
  }
  hr{
    border: none;
    border-top: 1px #d5d4c0 solid;
  }

  .container{
    padding: 20px;
    background: #f8f8f8;
    margin: 10px 0;
    border-radius: 6px;
    text-align: left;
  }
  .item{
    margin-bottom: 5px;
  }
  .input{
    margin: 10px 0;
  }
</style>
