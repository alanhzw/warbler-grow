<!--
 * @Author: 一尾流莺
 * @Description:查看全部
 * @Date: 2021-09-23 08:03:25
 * @LastEditTime: 2021-12-03 15:40:57
 * @FilePath: \ired_resource\src\pages\public\overall\index.vue
-->
<template>
  <empty-div height="40px"></empty-div>
  <!-- 组件根节点 -->
  <div class="overall-page">
    <!-- 搜索框部分 -->
    <!-- 左侧列表 -->
    <overall-list :company-list='recruitmentEnterprise'
                  @get-post-data-by-companyId='handleGetPostDataByCompanyId'></overall-list>
    <!-- 右侧详情 -->
    <overall-info :post-data='postData'
                  :tab-index='tabIndex'
                  :company-info='companyInfo'
                  @handle-get-job-details='handleGetJobDetails'
                  @handle-get-company-info='handleGetCompanyInfo'
                  :job-details='jobDetails'></overall-info>
  </div>
</template>

<script lang='ts' setup>
import { onMounted ,ref} from 'vue'
import EmptyDiv from './components/EmptyDiv.vue';
import OverallInfo from './components/OverallInfo.vue';
import OverallList from './components/OverallList.vue';
import useGetCompanyInfo from './apis/getCompanyInfo';
import useGetJobDetails from './apis/getJobDetails';
import useGetPostDataByCompanyId from './apis/getPostDataByCompanyId';
import useGetRecruitmentEnterpriseList from './apis/getRecruitmentEnterpriseList';

import { useRoute } from 'vue-router';
const route = useRoute();

const { companyInfo, getCompanyInfo } = useGetCompanyInfo();
const { jobDetails, getJobDetails } = useGetJobDetails();
const { postData, getPostDataByCompanyId } = useGetPostDataByCompanyId();
const { recruitmentEnterprise, getRecruitmentEnterpriseList } = useGetRecruitmentEnterpriseList();

const tabIndex = ref(0)

// 切换公司的时候获取岗位列表
const handleGetPostDataByCompanyId = async (companyId:any)=>{

   // 获取公司列表第一个的所有岗位列表
   await getPostDataByCompanyId(companyId);

    tabIndex.value = postData.value.findIndex((item)=>item.classifyCode === route.params.classifyCode)
    // 获取岗位列表第一个的岗位详情
    handleGetJobDetails(postData.value[tabIndex.value].postDatas[0].recruitmentInfoId);
    // 获取公司详情
    handleGetCompanyInfo(companyId)
}

// 获取岗位详情
const handleGetJobDetails = async (recruitmentInfoId:any)=>{
   await getJobDetails(recruitmentInfoId);
}

// 获取公司详情
const handleGetCompanyInfo = async (companyId:any)=>{
   await getCompanyInfo(companyId);
}

onMounted(async () => {
   // 初始获取公司列表
   console.log('🚀🚀~ route:',route);
   await getRecruitmentEnterpriseList(route.params.classificationValue,route.params.classifyCode);
   // 初始获取公司列表第一个的所有岗位列表
   await handleGetPostDataByCompanyId(recruitmentEnterprise.value[0].companyId)
});
</script>

<style lang='scss'>
.overall-page {
    width: 1200px;
    line-height: 1;
    display: grid;
    grid-template-columns: 384px 1fr;
    grid-column-gap: 40px;
}
</style>
