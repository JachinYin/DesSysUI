<template>
  <div class="cashList openHtml" v-if="isVisible">
    <div class="body">
      <div class="header">
        <span class="left_title"><span style="color:#ff7f29;">▌</span> 提现记录</span>
        <span class="right_title"><span style="color:#2b89fb;">▌</span> 设计师信息</span>
        <span class="close"><span style="cursor: pointer" @click="closeBox">✖</span></span>
      </div>
      <div class="inner">
        <div class="left">
          <div class="left-inner">
            <div class="money-surplus">
              <span class="money">
                ￥65,822.1
              </span>
              <br>
              <span class="tip">可提现余额</span>
            </div>
            <div class="money-other">
              <div class="money-income">
                <div class="money">￥66,679.1</div>
                <div class="tip">全部收入</div>
              </div>
              <div class="split"></div>
              <div class="money-balance">
                <div class="money">￥857</div>
                <div class="tip">已提现金额</div>
              </div>
              <div class="clear"></div>
            </div>

            <div
              class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition"
              style="width: 340px; border-radius: 8px; box-shadow: rgba(153, 153, 153, 0.2) 0px 2px 10px 0px;">
              <div class="hidden-columns">
                <div style="text-align: center;"></div>
                <div></div>
              </div>
              <div class="el-table__header-wrapper">
                <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width: 338px;">
                  <colgroup>
                    <col name="el-table_1_column_1" width="169">
                    <col name="el-table_1_column_2" width="169">
                    <col name="gutter" width="0">
                  </colgroup>
                  <thead class="has-gutter">
                  <tr class="">
                    <th colspan="1" rowspan="1" class="el-table_1_column_1  is-center   is-leaf">
                      <div class="cell">提现金额</div>
                    </th>
                    <th colspan="1" rowspan="1" class="el-table_1_column_2  is-center   is-leaf">
                      <div class="cell">提现时间</div>
                    </th>
                    <th class="gutter" style="width: 0px; display: none;"></th>
                  </tr>
                  </thead>
                </table>
              </div>
              <div class="el-table__body-wrapper is-scrolling-none">
                <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 338px;">
                  <colgroup>
                    <col name="el-table_1_column_1" width="169">
                    <col name="el-table_1_column_2" width="169">
                  </colgroup>
                  <tbody>
                  <tr class="el-table__row">
                    <td class="el-table_1_column_1 is-center ">
                      <div class="cell">10</div>
                    </td>
                    <td class="el-table_1_column_2 is-center ">
                      <div class="cell">2019-01-08 18:43</div>
                    </td>
                  </tr>
                  <tr class="el-table__row">
                    <td class="el-table_1_column_1 is-center ">
                      <div class="cell">66</div>
                    </td>
                    <td class="el-table_1_column_2 is-center ">
                      <div class="cell">2019-01-04 18:05</div>
                    </td>
                  </tr>
                  <tr class="el-table__row">
                    <td class="el-table_1_column_1 is-center ">
                      <div class="cell">100</div>
                    </td>
                    <td class="el-table_1_column_2 is-center ">
                      <div class="cell">2019-01-04 15:43</div>
                    </td>
                  </tr>
                  <tr class="el-table__row">
                    <td class="el-table_1_column_1 is-center ">
                      <div class="cell">666</div>
                    </td>
                    <td class="el-table_1_column_2 is-center ">
                      <div class="cell">2019-01-04 15:39</div>
                    </td>
                  </tr>
                  <tr class="el-table__row">
                    <td class="el-table_1_column_1 is-center ">
                      <div class="cell">5</div>
                    </td>
                    <td class="el-table_1_column_2 is-center ">
                      <div class="cell">2019-01-03 09:47</div>
                    </td>
                  </tr>
                  <tr class="el-table__row">
                    <td class="el-table_1_column_1 is-center ">
                      <div class="cell">10</div>
                    </td>
                    <td class="el-table_1_column_2 is-center ">
                      <div class="cell">2019-01-02 16:58</div>
                    </td>
                  </tr>
                  <tr class="el-table__row">
                    <td class="el-table_1_column_1 is-center ">
                      <div class="cell">10</div>
                    </td>
                    <td class="el-table_1_column_2 is-center ">
                      <div class="cell">2019-01-02 16:58</div>
                    </td>
                  </tr>
                  <tr class="el-table__row">
                    <td class="el-table_1_column_1 is-center ">
                      <div class="cell">10</div>
                    </td>
                    <td class="el-table_1_column_2 is-center ">
                      <div class="cell">2019-01-02 16:58</div>
                    </td>
                  </tr>
                  <tr class="el-table__row">
                    <td class="el-table_1_column_1 is-center ">
                      <div class="cell">10</div>
                    </td>
                    <td class="el-table_1_column_2 is-center ">
                      <div class="cell">2019-01-02 16:58</div>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div class="el-table__column-resize-proxy" style="display: none;"></div>
            </div>
          </div>
        </div>
        <div class="info right">
          <div class="right-inner">
            <br>
            <div class="item"><span class="name">企业AID</span> <span class="value">9858936</span></div>
            <div class="item"><span class="name">昵称</span> <span class="value">勋的复古咖啡馆法国巴黎新加坡</span></div>
            <div class="item"><span class="name">联系手机</span> <span class="value">15913133927</span></div>
            <div class="item"><span class="name">真实姓名</span> <span class="value">彭文勋</span></div>
            <div class="item"><span class="name">联系QQ</span> <span class="value">766691498</span></div>
            <div class="el-table el-table--fit el-table--enable-row-hover el-table--enable-row-transition"
                 style="width: 370px; border-radius: 8px; box-shadow: rgba(153, 153, 153, 0.2) 0px 2px 10px 0px;">
              <div class="hidden-columns">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div class="el-table__header-wrapper">
                <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width: 370px;">
                  <colgroup>
                    <col name="el-table_2_column_3" width="70">
                    <col name="el-table_2_column_4" width="70">
                    <col name="el-table_2_column_5" width="115">
                    <col name="el-table_2_column_6" width="115">
                    <col name="gutter" width="0">
                  </colgroup>
                  <thead class="has-gutter">
                  <tr class="">
                    <th colspan="1" rowspan="1" class="el-table_2_column_3  is-center   is-leaf">
                      <div class="cell">作品ID</div>
                    </th>
                    <th colspan="1" rowspan="1" class="el-table_2_column_4  is-center   is-leaf">
                      <div class="cell">产品</div>
                    </th>
                    <th colspan="1" rowspan="1" class="el-table_2_column_5  is-center   is-leaf">
                      <div class="cell">作品名称</div>
                    </th>
                    <th colspan="1" rowspan="1" class="el-table_2_column_6  is-center   is-leaf">
                      <div class="cell">模板收入</div>
                    </th>
                    <th class="gutter" style="width: 0px; display: none;"></th>
                  </tr>
                  </thead>
                </table>
              </div>
              <div class="el-table__body-wrapper is-scrolling-none">
                <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 370px;">
                  <colgroup>
                    <col name="el-table_2_column_3" width="70">
                    <col name="el-table_2_column_4" width="70">
                    <col name="el-table_2_column_5" width="115">
                    <col name="el-table_2_column_6" width="115">
                  </colgroup>
                  <tbody>
                  <tr class="el-table__row">
                    <td class="el-table_2_column_3 is-center ">
                      <div class="cell">55</div>
                    </td>
                    <td class="el-table_2_column_4 is-center ">
                      <div class="cell">微传单</div>
                    </td>
                    <td class="el-table_2_column_5 is-center ">
                      <div class="cell">快乐是什么 你懂快乐吗？</div>
                    </td>
                    <td class="el-table_2_column_6 is-center ">
                      <div class="cell">12</div>
                    </td>
                  </tr>
                  <tr class="el-table__row">
                    <td class="el-table_2_column_3 is-center ">
                      <div class="cell">118</div>
                    </td>
                    <td class="el-table_2_column_4 is-center ">
                      <div class="cell">微传单</div>
                    </td>
                    <td class="el-table_2_column_5 is-center ">
                      <div class="cell">我的微传单</div>
                    </td>
                    <td class="el-table_2_column_6 is-center ">
                      <div class="cell">0</div>
                    </td>
                  </tr>
                  <tr class="el-table__row">
                    <td class="el-table_2_column_3 is-center ">
                      <div class="cell">56</div>
                    </td>
                    <td class="el-table_2_column_4 is-center ">
                      <div class="cell">微传单</div>
                    </td>
                    <td class="el-table_2_column_5 is-center ">
                      <div class="cell">我的微传单</div>
                    </td>
                    <td class="el-table_2_column_6 is-center ">
                      <div class="cell">1.1</div>
                    </td>
                  </tr>
                  <tr class="el-table__row">
                    <td class="el-table_2_column_3 is-center ">
                      <div class="cell">54</div>
                    </td>
                    <td class="el-table_2_column_4 is-center ">
                      <div class="cell">微传单</div>
                    </td>
                    <td class="el-table_2_column_5 is-center ">
                      <div class="cell">我的微传单</div>
                    </td>
                    <td class="el-table_2_column_6 is-center ">
                      <div class="cell">66666</div>
                    </td>
                  </tr>
                  <tr class="el-table__row">
                    <td class="el-table_2_column_3 is-center ">
                      <div class="cell">53</div>
                    </td>
                    <td class="el-table_2_column_4 is-center ">
                      <div class="cell">微传单</div>
                    </td>
                    <td class="el-table_2_column_5 is-center ">
                      <div class="cell">我的微传单</div>
                    </td>
                    <td class="el-table_2_column_6 is-center ">
                      <div class="cell">0</div>
                    </td>
                  </tr>
                  <tr class="el-table__row">
                    <td class="el-table_2_column_3 is-center ">
                      <div class="cell">52</div>
                    </td>
                    <td class="el-table_2_column_4 is-center ">
                      <div class="cell">微传单</div>
                    </td>
                    <td class="el-table_2_column_5 is-center ">
                      <div class="cell">春节快乐！happynewyear</div>
                    </td>
                    <td class="el-table_2_column_6 is-center ">
                      <div class="cell">0</div>
                    </td>
                  </tr><!----></tbody>
                </table><!----><!----></div><!----><!----><!----><!---->
              <div class="el-table__column-resize-proxy" style="display: none;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mask" @click="closeBox"></div>
  </div>
</template>

<script>
  export default {
    name: "ShowCashDetailBox",
    props: ['isVisible'],
    methods: {
      closeBox(){
        this.$emit("closeBox");
      },

    }
  }
</script>

<style scoped>
  .body{
    width: 860px;
    height: 550px;
    text-align: left;
  }

  /* 内容弹出框 */
  .header {
    line-height: 40px;
    width: 100%;
    height: 40px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    color: black;
  }
  .header .left_title{
    box-sizing: border-box;
    padding-left: 30px;
    width: 400px;
    display: inline-block;
  }
  .header .right_title{
    box-sizing: border-box;
    padding-left: 40px;
    width: 400px;
    display: inline-block;
  }
  .header .close {
    width: 50px;
    text-align: center;
    float: right;
    color: #666666;
    display: inline-block;
    z-index: 10;
  }

  /* 提现记录-左边部分 */
  .inner .left {
    width: 420px;
    overflow: hidden;
    float: left;
    height: 480px;
    box-sizing: border-box;
  }
  .inner .left .left-inner {
    width: 360px;
    height: 480px;
    overflow: auto;
    margin: auto;
  }
  .inner .left .left-inner .money-surplus {
    margin-top: 40px;
    text-align: center;
  }
  .inner .left .left-inner .money-surplus .money {
    font-size: 30px;
    color: #ff7f29;
    line-height: 27px;
  }

  .inner .left .left-inner .money-other {
    width: 360px;
    margin-top: 38px;
    margin-bottom: 37px;
  }
  .inner .left .left-inner .money-other .money-income,
  .inner .left .left-inner .money-other .money-balance {
    width: 168px;
    float: left;
    text-align: center;
  }
  .inner .left .left-inner .money-other .money {
    font-size: 18px;
    line-height: 18px;
    color: #111111;
    margin-bottom: 14px;
  }
  .inner .left .left-inner .money-other .tip {
    font-size: 14px;
    color: #888888;
    line-height: 18px;
  }
  .inner .left .left-inner .money-other .split {
    float: left;
    width: 1px;
    height: 26px;
    background-color: #e9e8ed;
  }

  /* /提现记录-左边部分 */

  /* 设计师信息-右边部分 */
  .inner .right {
    width: 410px;
    float: right;
    overflow: hidden;
    background: #fcfcfc;
    /*margin-top: 15px;*/
    margin-right: 30px;
  }
  .inner .right .right-inner {
    width: 380px;
    height: 480px;
    padding: 0 15px 0 30px;
    overflow: auto;
  }
  .inner .right .right-inner .item {
    margin-bottom: 13px;
  }
  .inner .right .right-inner .item:nth-of-type(6) {
    margin-bottom: 32px;
  }
  .inner .right .right-inner .item .name {
    display: inline-block;
    width: 90px;
    color: #888888;
    font-size: 14px;
    line-height: 18px;
    margin-right: 10px;
  }
  .inner .right .right-inner .item .value {
    display: inline-block;
    color: #111111;
    font-size: 14px;
    line-height: 18px;
  }

  /* /设计师信息-右边部分 */

  /* 表格 */
  .inner .el-table th {
    background-color: #ffffff;
  }
  .inner .el-table th > .cell {
    opacity: .6;
    font-size: 14px;
    font-weight: normal;
  }

  /* /表格 */

  .inner .bottom {
    width: 100%;
    height: 130px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15) inset;
    text-align: center;
    padding-top: 20px;
  }
  .inner .bottom div {
    position: relative;
  }
  .inner .bottom .tip {
    display: inline-block;
    position: absolute;
    top: 21px;
    right: 320px;
  }
  /* /内容弹出框 */

  ::-webkit-scrollbar
  {
    width: 0;
    height: 0;
  }
</style>
