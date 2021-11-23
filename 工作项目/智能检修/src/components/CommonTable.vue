<!--
 * @Description:
 *    表格组件
 * @Author:HJ
 * @Date: 2021-05-13
 * @LastEditTime: 2021-05-14
 * @FilePath: \intelligent-overhaul-app\src\components\CommonTable.vue
-->
<template>
  <div class="common-table-box">
    <div class='table-title'>组员自检结果</div>
    <table>
      <thead>
        <tr class="black-ground">
          <th>序号</th>
          <th>姓名</th>
          <th>状态</th>
          <th>时间</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='(item,index) in tableData' :key='index' :class="{'black-ground':index%2!==0}">
          <td>{{item.number}}</td>
          <td>{{item.fullName}}</td>
          <td>{{item.isCheckedSelf?"已自检":"未自检"}}</td>
          <td>{{item.time}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'CommonTable',
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const state = reactive({})
    return {
      ...toRefs(state),
    }
  },
})
</script>

<style lang='scss'>
.common-table-box {
  font-size: 0.28rem;
  .table-title {
    text-align: left;
    font-size: 0.28rem;
    font-weight: 500;
    color: #000;
    line-height: 0.42rem;
    padding: 0.24rem 0;
  }
  .black-ground {
    background-color: rgba(0, 0, 0, 0.05);
    padding: 0.32rem 0.24rem;
  }

  td,
  th {
    border: none;
    text-align: left;
    padding: 0.32rem 0 0.32rem 0.24rem;
  }

  table {
    border-spacing: 0;
    width: 100%;
  }
}
</style>
