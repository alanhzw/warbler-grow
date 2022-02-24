<!--
 * @Author: 一尾流莺
 * @Description:正在招聘
 * @Date: 2021-09-28 16:53:24
 * @LastEditTime: 2021-11-23 20:11:59
 * @FilePath: \ired_resource\src\pages\public\home\components\HomeJob.vue
-->
<template>
  <!-- 组件根节点 -->
  <div class="home-job">
    <empty-div height="60px"></empty-div>
    <!-- 正在招聘和热门企业的架子 -->
    <home-block title="正在招聘"
                @page-size="pageSize"
                @change-page-size="changePageSize">
      <empty-div height="30px"></empty-div>
      <div class="list">
        <div class="job-item"
             @click="router.push(`/job/${item.recruitmentInfoId}`)"
             v-for="item in recruitmentPlazaList"
             :key="item.recruitmentInfoId">
          <job-item :job-item="item"></job-item>
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
  </div>
</template>

<script lang='ts' setup>
import { onMounted } from 'vue';
import HomeBlock from './HomeBlock.vue';
import EmptyDiv from './EmptyDiv.vue';
import JobItem from './JobItem.vue';
import useGetRecruitmentPlazaList from '../apis/getRecruitmentPlazaList';
import usePageSize from '../hooks/usePageSize';
import { useRouter } from 'vue-router';
const router = useRouter();

const { recruitmentPlazaList, getRecruitmentPlazaList } = useGetRecruitmentPlazaList();

const { pageSize, changePageSize } = usePageSize();

const more = async () => {
  await changePageSize()
  await getRecruitmentPlazaList(pageSize.value);
}

onMounted(async () => {
  await getRecruitmentPlazaList(pageSize.value);
});
</script>

<style lang='scss'>
@import "styles/_variables.scss";

.home-job {
  .list {
    width: 1200px;
    display: grid;
    grid-template-columns: 380px 380px 380px;
    grid-template-rows: 168px 168px 168px 168px;
    grid-row-gap: 30px;
    grid-column-gap: 30px;
  }
  .job-item {
    width: 380px;
    height: 168px;
    background: #fff;
    padding: 30px 20px 20px 20px;
    box-sizing: border-box;
    position: relative;
    &:hover{
      box-shadow: 0px 3px 20px 1px rgba(0, 0, 0, 0.05999999865889549);
    }
  }

  .job-item:hover .left {
    color: red !important;
    font-size: 18px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 800;
    color: #ed263d;
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
