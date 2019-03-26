<template>
  <!--<img src="../assets/vue_logo.png">-->
  <div class="header">
    <img src="../../assets/logo.png" alt="logo">
    <span v-for="(item, index) in navList" :class="'nav '+ item.flag" @click="check(item.url, index)">{{item.name}}</span>
  </div>
</template>

<script>

  export default {
      name: "Header",
      data() {
        return {
          active: 'active',
          navList: this.refresh()
        }
      },
      methods: {
        check: function (name, index) {
          this.$router.push(name);
          this.refresh();
          this.navList[index].flag = 'active';
        },
        refresh: function(){
          this.navList = [
            {
              name: '模板审核',
              flag: '',
              url: '/tempList'
            },
            {
              name: '协议管理',
              flag: '',
              url: '/desList'
            },
            {
              name: '提现记录',
              flag: '',
              url: '/cashRecList'
            },
            {
              name: '分佣管理',
              flag: '',
              url: '/cashDesList'
            },
          ];
          return this.navList;
        }
      },
      created() {
        this.navList[0].flag = 'active';
      }
  }
</script>

<!--指定scope后，样式只对当前组件生效-->
<style scoped>
  .header{
    text-align: center;
    height: 60px;
    font-size: 22px;
    /*font-weight: bold;*/
    user-select: none;
    background: white;
  }
  img{
    position: absolute;
    /*text-align: left;*/
    top: 10px;
    left: 10px;

  }
  .nav{
    cursor: pointer;
    margin: 0 10px;
    line-height: 60px;
  }
  .nav:hover{
    color: #3a8ee6;
    border: none;
    border-bottom: 1px #3a8ee6 solid;
    border-bottom-width: 4px;
  }
  .active{
    color: #3a8ee6;
  }
</style>
