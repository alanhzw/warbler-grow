<!--
 * @Author: 一尾流莺
 * @Description:热门企业
 * @Date: 2021-09-28 16:53:34
 * @LastEditTime: 2021-11-27 17:17:29
 * @FilePath: \ired_resource\src\pages\public\home\components\HomeCompany.vue
-->
<template>
  <!-- 组件根节点 -->
  <div class="home-company">
    <empty-div height="60px"></empty-div>
    <!-- 正在招聘和热门企业的架子 -->
    <home-block title="热门企业"
                @page-size="pageSize"
                @change-page-size="changePageSize">
      <empty-div height="30px"></empty-div>
      <div class="list">
        <div class="job-item"
             @click="router.push(`/company/${item.companyId}`)"
             v-for="item in companyList"
             :key="item.companyId">
          <company-item :info="item"></company-item>
        </div>
      </div>
      <empty-div height="30px"></empty-div>
    </home-block>
    <!-- 查看更多 -->
    <div class="more-box">
      <el-button type="danger"
                 @click="more"
                 class="more">查看更多</el-button>
    </div>
    <empty-div height="70px"></empty-div>
  </div>
</template>

<script lang='ts' setup>
import { onMounted } from 'vue';
import EmptyDiv from './EmptyDiv.vue';
import HomeBlock from './HomeBlock.vue';
import CompanyItem from './CompanyItem.vue';
import useGetCompanyList from '../apis/getCompanyList';
import usePageSize from '../hooks/usePageSize';
import { useRouter } from 'vue-router';
const router = useRouter();
const { companyList, getCompanyList } = useGetCompanyList();

const { pageSize, changePageSize } = usePageSize();

const more = async () => {
  await changePageSize()
  await getCompanyList(pageSize.value);
}

onMounted(async () => {
  await getCompanyList(pageSize.value);
});
</script>

<style lang='scss'>
@import "styles/_variables.scss";

.home-company {
  .list {
    width: 1200px;
    display: grid;
    grid-template-columns: 285px 285px 285px 285px;
    grid-template-rows: 264px 264px;
    grid-row-gap: 20px;
    grid-column-gap: 20px;
  }
  .job-item {
    width: 285px;
    height: 264px;
    background: #fff;
    padding: 30px 0px;
    box-sizing: border-box;
    position: relative;
    cursor: pointer;
        &:hover{
      box-shadow: 0px 3px 20px 1px rgba(0, 0, 0, 0.05999999865889549);
    }
  }
  .more-box {
    width: 1200px;
    display: flex;
    justify-content: center;
  }
  .more {
    width: 354px;
    height: 46px;
    background: $MAIN_COLOR;
    border-radius: 0px 0px 0px 0px;
    opacity: 1;
    font-size: 14px;
  }
}
</style>
