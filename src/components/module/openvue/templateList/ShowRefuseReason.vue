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
            <div class="item"><el-checkbox label="缺少封面或封面不符合主题" name="reasons"></el-checkbox></div>
            <div class="item"><el-checkbox label="模板内出现明星肖像" name="reasons"></el-checkbox></div>
            <div class="item"><el-checkbox label="标题或内容存在违规词，违反广告法" name="reasons"></el-checkbox></div>
            <div class="item"><el-checkbox label="主视觉不明确，不符合要求" name="reasons"></el-checkbox></div>
            <div class="item"><el-checkbox label="图片素材陈旧，风格不统一，呈现效果不及主流品质" name="reasons"></el-checkbox></div>
            <div class="item"><el-checkbox label="缺少行业或关键词设置" name="reasons"></el-checkbox></div>
            <div class="item"><el-checkbox label="其他原因" name="reasons"></el-checkbox></div>
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
      props: ['isVisible', 'tempId'],
      data: function () {
        return{
          reason: '',
          reasons: [],
          isRefuse: false
        }
      },
      methods: {
        closeReasonBox: function () {
          this.$emit("closeReasonBox", this.isRefuse)
        },
        submitReason: function () {
          if(this.reason === '') {
            this.$message.warning("请填写打回原因");
            return;
          }
          let thiz = this;
          this.$confirm('确定打回该作品？打回后将不可撤销！请确认', '提示', {
            confirmButtonText: '打回',
            confirmButtonClass: 'el-button--danger el-button--medium',
            cancelButtonText: '取消',
            cancelButtonClass: 'el-button--medium',
            type: 'warning',
            center: true,
            distinguishCancelAndClose: true
          }).then((action) => {

            $.ajax({
              url: thiz.preUrl + '/setTemplateAudit/2',
              type: 'get',
              data: {
                tempId: thiz.tempId,
                reason: thiz.reason,
              },
              success : function (res) {
                if(res.success){
                  thiz.$message.success(res.msg);
                  thiz.isRefuse = true;
                  thiz.closeReasonBox();
                  thiz.isRefuse = false;
                }else{
                  thiz.$message.error(res.msg);
                }
              },
              error: function (res) {
                thiz.$message.error("网络繁忙，请刷新后重试");
              }
            });

          }).catch(action => {});
        },
        putReason: function () {
          this.reason = String(this.reasons) + ",";
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
