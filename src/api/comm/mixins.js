// 全局混入！
/*
* 使用方法：
* 1.新建一个 mixins.js 文件
* 2.在 js 文件中定义好需要全局混入的变量
* 3.将该变量 export 出去
* 4.在需要全局混入的地方，import {Mixins1, Mixins2} from "@/api/comm/mixins";
*     {}中的名字就是定义的变量名字
* 5.在 Vue 中通过 mixins: 变量名 的格式将混入整到 VM 对象中
* 6.这时就可以正常在 Vue 中使用混入中定义的方法或data 和 methods 了。
* */

export const Comm_Mixins = {
  data: function(){
    return{
      isLoad: true,
      isFilterVisible: false,
      isDetailVisible: false,
      isCashVisible : false,
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

export const Filter_Mixins = {
  data:function () {
    return{
      form: this.onClear(),
      times:[],
      statusList:[
        {value: 0, name: '全部'},
        {value: 1, name: '待审核'},
        {value: 2, name: '打回'},
        {value: 3, name: '通过'},
      ],
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
      this.$emit("closeFilterBox");
    },
    onFilter: function () {
      this.form.begTime = this.times[1] || '';
      this.form.endTime = this.times[1] || '';
      this.$emit("onFilter", this.form);
    }
  }
};
