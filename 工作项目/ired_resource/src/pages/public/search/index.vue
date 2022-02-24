<!--
 * @Author: 一尾流莺
 * @Description:搜索页面
 * @Date: 2021-11-14 17:25:29
 * @LastEditTime: 2021-11-21 23:42:19
 * @FilePath: \ired_resource\src\pages\public\search\index.vue
-->
<template>
  <div class="search-box">
    <div class="search-title">搜索结果</div>
    <div class="search-kuang">
      <div class="search-kuang-select">

        <el-cascader v-model="area"
                     :show-all-levels="false"
                     @change="handleChangeCity"
                     placeholder="全国"
                     :props="{
                    expandTrigger: 'hover',
                    value: 'value',
                    label: 'label',
                    children: 'children',
            }"
                     :options="regionData"></el-cascader>
      </div>
      <div class="line">丨</div>

      <div class="search-kuang-input">
        <el-input v-model="queryContent"
                  placeholder="搜索企业/岗位"></el-input>
      </div>
      <div class="search-kuang-btn"
           @click="handleSearch">搜索</div>
    </div>
    <search-list @query-related-enterprises="queryRelatedEnterprises"
                 :query-positions-result="queryPositionsResult"
                 :total-enterprises="totalEnterprises"
                 :query-content="queryContent"
                 :total-positions="totalPositions"
                 :city-code="cityCode"
                 :province-code='provinceCode'
                 :query-enterprises-result="queryEnterprisesResult"
                 ref='serachList'
                 @query-related-positions="queryRelatedPositions"></search-list>
  </div>
</template>

<script lang='ts' setup>
import { ref, onMounted } from 'vue';
import useRegionData from './apis/useRegionData';
import useQueryRelatedEnterprises from './apis/queryRelatedEnterprises';
import useQueryRelatedPositions from './apis/queryRelatedPositions';
import SearchList from './components/SearchList.vue'
import { useRoute } from 'vue-router';
const route = useRoute();
// 获取省市区
const { regionData, getRegionData } = useRegionData();
// 搜索相关企业
const { queryEnterprisesResult, queryRelatedEnterprises, totalEnterprises } = useQueryRelatedEnterprises();
// 搜索相关职位
const { queryPositionsResult, queryRelatedPositions, totalPositions } = useQueryRelatedPositions();

const serachList = ref(null)

// 市编码
const cityCode = ref('')

//省编码
const provinceCode =  ref('')

// 区域map

const area = ref([])

// 搜索内容
const queryContent = ref('')

// 切换下拉框
const handleChangeCity = (value:any)=>{
  provinceCode.value = value[0]
  cityCode.value = value[1]
}

// 搜索方法
const handleSearch = async () => {
  if(serachList.value!.isPosition){
      await queryRelatedPositions({
        cityCode: cityCode.value,
        pageNo: 1,
        pageSize: 10,
        provinceCode: provinceCode.value,
        searchName: queryContent.value,
      })
  }else{
      await queryRelatedEnterprises({
        cityCode: cityCode.value === '0' ? '' : cityCode.value,
        pageNo: 1,
        pageSize: 10,
        provinceCode: cityCode.value === '0' ? '' : cityCode.value,
        searchName: queryContent.value,
      })
  }

}


onMounted(async () => {
  // @ts-ignore
  queryContent.value = route.params?.queryContent || ''
  await getRegionData()
  queryRelatedPositions({
    cityCode: cityCode.value === '0' ? '' : cityCode.value,
    pageNo: 1,
    pageSize: 10,
    provinceCode: cityCode.value === '0' ? '' : cityCode.value,
    searchName: queryContent.value,
  })
})

</script>

<style lang='scss'>
.search-box {
  width: 1032px;
  margin: 0 auto;
  .search-title {
    font-size: 24px;
    font-family: PingFang SC-Medium, PingFang SC;
    font-weight: 500;
    color: #222222;
    margin-top: 40px;
  }

  .search-kuang {
    height: 46px;
    margin: 20px 0;
    position: relative;

    .search-kuang-select {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      .el-input__inner {
        width: 160px;
        border: none;
        background: transparent;
        color: #999999;
      }
    }
    .line {
      position: absolute;
      left: 160px;
      top: 8px;
      z-index: 2;
      color: #999999;
    }
    .search-kuang-input {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
      width: 100%;
      .el-input {
        width: 920px;
        .el-input__inner {
          border-radius: 8px 8px 8px 8px;
          padding-left: 180px;
        }
      }
    }

    .search-kuang-btn {
      position: absolute;
      right: 0;
      top: 0;
      z-index: 1;
      width: 120px;
      height: 40px;
      background-color: #ed263d;
      color: #ffffff;
      cursor: pointer;
      text-align: center;
      line-height: 40px;
      border-radius: 8px 8px 8px 8px;
    }
  }
}
</style>
