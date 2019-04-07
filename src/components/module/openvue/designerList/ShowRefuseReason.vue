<template>
  <div class="具体弹窗名字 openHtml" v-if="isVisible">
    <div class="body">
      <div class="header">
        <span style="color:#2b89fb;">▌</span>打回原因
        <hr>
      </div>
      <div class="container">
        <div class="chose">
          <el-checkbox-group v-model="reasons" @change="setReason">
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
      props: ['isVisible', 'aid'],
      data: function () {
        return{
          reason: '',
          reasons: [],
          isRefuse: false
        }
      },
      methods: {
        closeReasonBox: function () {
          this.$emit("closeReasonBox", this.isRefuse);
          this.isRefuse = false;
        },
        submitReason: function () {
        //  doDesignerAudit
          if(this.reason === '') {
            this.$message.warning("请填写打回原因");
            return;
          }
          this.$confirm('确定打回该设计师？打回后将不可撤销！请确认', '提示', {
            confirmButtonText: '打回',
            confirmButtonClass: 'el-button--danger el-button--medium',
            cancelButtonText: '取消',
            cancelButtonClass: 'el-button--medium',
            type: 'warning',
            center: true,
            distinguishCancelAndClose: true
          }).then((action) => {
            this.doRefuse();
          }).catch(action => {});
          
        },
        // 打回ajax
        doRefuse: function(){
          let that = this;
          $.ajax({
            url: that.preUrl + '/doDesignerAudit/back',
            type: 'get',
            data: {
              aid: that.aid,
              reason: that.reason,
            },
            success : function (res) {
              if(res.success){
                that.$message.success(res.msg);
                that.isRefuse = true;
                that.closeReasonBox();
              }else{
                that.$message.error(res.msg);
              }
            },
            error: function (res) {
              that.$message.error("网络繁忙，请刷新后重试");
            }
          });
        },

        setReason: function () {
          this.reason = String(this.reasons) + ",";
          this.reason = this.reason.slice(0,this.reason.length-1);
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
