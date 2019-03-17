// 全局混入！
/*
* 使用方法：
* 1.在 assets 文件夹下新建一个 js 文件
* 2.在 js 文件中定义好需要全局混入的变量
* 3.将该变量 export 出去
* 4.在需要全局混入的地方，先在 script 中引入 js 文件
* 5.同时引入的名字要写用{}包裹
* 6.{}中的名字就是定义的变量名字
* 7.在 Vue 中通过 mixins: 全局变量名, 的方式将混入整到 Vue 中
* 8.这时就可以正常在 Vue 中使用混入中定义的方法或data或其他了。
* */

export const Comm_Mixins = {
  data: function(){
    return{
      isLoad: true,
      isFilterVisible: false,
      isDetailVisible: false,
    }
  },
  methods: {
    changePage: function (index, size) {
      this.page.index = index;
      this.page.size = size;
    },
  }
};
export const Pagination_Mixins2 = {
  data: function(){
    return{
      page:{
        currentPage: 1,  // 当前页
        pageSize: 13,        // 分页数
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
  methods: {
    /*测试*/
    handleCurrentChange:function (val) {
      this.page.currentPage = val;
    },
    // handleSizeChange: function (val) {
    //   this.$emit("getPage", this.index, this.size);
    //   this.page.pageSize = val;
    // }
  }
};
