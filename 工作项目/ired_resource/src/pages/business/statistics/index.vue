<!--
 * @Descripttion: 企业端-数据统计
 * @Author: yang chenglin
 * @Date: 2021-10-10 17:03:28
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-23 20:10:13
-->
<template>
  <div class="data-statistics-root">
    <div class='form-div'>
      <el-input v-model='formInfo'
                placeholder='搜索职位名称'></el-input>
      <div class="input-wd"
           @click="searchList">搜索</div>
    </div>
    <el-table :data="dataStatistics.list"
              border
              stripe>
      <el-table-column align="center"
                       type="index"
                       label="序号"
                       width="50" />
      <el-table-column align="center"
                       prop="recruitmentPostName"
                       label="职位名称" />
      <el-table-column align="center"
                       prop="hiringNumber"
                       label="拟招聘总数" />
      <el-table-column align="center"
                       prop="recruitmentNumber"
                       label="招聘数量" />
      <el-table-column align="center"
                       prop="browseTheNumber"
                       label="岗位浏览总数" />
      <el-table-column align="center"
                       prop="deliveryNumber"
                       label="简历投递总数" />
      <el-table-column align="center"
                       prop="firstInterviewNumber"
                       label="初试邀约数量" />
      <el-table-column align="center"
                       prop="secondInterviewNumber"
                       label="复试邀约数量" />
      <el-table-column align="center"
                       prop="employmentNumber"
                       label="录用人数" />
    </el-table>
    <div class='pagination-div'
         v-if="dataStatistics.list.length">
      <el-pagination background
                     layout='prev, pager, next'
                     :page-size="dataStatistics.page.size"
                     :total='dataStatistics.page.total'
                     @current-change='goPage'
                     @prev-click='goPage'
                     @next-click='goPage'>
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import useDataStatistics from './hooks/useDataStatistics';

// 岗位名称
const formInfo = ref('');

const { dataStatistics, getDataStatistics } = useDataStatistics();
getDataStatistics({
  recruitmentPostName: formInfo.value,
});

// 查询列表数据
const searchList = async () => {
  await getDataStatistics({
    recruitmentPostName: formInfo.value,
  });
};

// 分页方法
const goPage = async (val: any) => {
  dataStatistics.page.current = val;
  await getDataStatistics({
    recruitmentPostName: formInfo.value,
  });
};
</script>

<style lang="scss">
.data-statistics-root {
  .form-div {
    height: 46px;
    display: flex;
    margin: 20px 0;
    margin-top: 0;
    .el-input {
      width: calc(100% - 120px);
      .el-input__inner {
        border-radius: 0;
      }
    }
    .input-wd {
      width: 120px;
      height: 40px;
      background-color: #ED263D;
      color: #ffffff;
      cursor: pointer;
      text-align: center;
      line-height: 40px;
    }
  }
  .pagination-div {
    margin: 30px 0;
    text-align: right;
    .el-pagination.is-background .el-pager li:not(.disabled).active {
      background-color: #ED263D;
      color: #ffffff;
    }
  }
  .has-gutter {
    .el-table_1_column_2 {
      background: #ED263D;
      color: #ffffff;
    }
  }
}
</style>
