<!--
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-11-14 17:50:55
 * @LastEditTime: 2021-11-21 23:23:43
 * @FilePath: \ired_resource\src\pages\public\search\components\SearchList.vue
-->
<template>
  <div class="search-list">
    <div class="header">
      <div class="title"
           :class="{ 'active-title': activeTitle === 1 }"
           @click="handleQueryRelatedPositions">相关职业</div>
      <div>|</div>
      <div class="title"
           :class="{ 'active-title': activeTitle === 2 }"
           @click="handleQueryRelatedEnterprises">相关公司</div>
    </div>
    <div class="jobs"
         v-if="activeTitle === 1">
      <div class="result-list">
        <div class="result-item"
             v-for="item in queryPositionsResult"
             @click="router.push(`/job/${item.recruitmentInfoId}`)"
             :key="item.recruitmentInfoId">
          <div class="left">
            <div class="left-title">{{ item.recruitmentPostName }}</div>
            <div class="left-money">{{ item.moneyStart }}K - {{ item.moneyEnd }}K</div>
            <div class="left-tags">
              <span>{{ item.city }}</span>丨
              <span>{{ item.workingYearsType }}</span>丨
              <span>{{ item.education }}</span>
            </div>
          </div>
          <div class="middle">
            <div class="middle-title">{{ item.shortName }}</div>
            <div class="middle-tags">
              <span>{{ item.companyIntroduce }}</span>丨
              <span>{{ item.financingStatus }}</span>丨
              <span>{{ item.staffSize }}</span>
            </div>
          </div>
          <div class="right">
            <img class="right-icon"
                 :src="item.companyLogo" />
          </div>
        </div>
        <div class="no-data"
             v-if='totalPositions===0'> 暂无数据 </div>
        <div class="pagination-div">
          <el-pagination background
                         layout="prev, pager, next"
                         :page-size="pageSize"
                         :total="totalPositions"
                         prev-text="上一页"
                         next-text="下一页"
                         @current-change="goPage"
                         @prev-click="goPage"
                         @next-click="goPage"></el-pagination>
        </div>
      </div>
    </div>
    <div class="companies"
         v-if="activeTitle === 2">
      <div class="result-list">
        <div class="result-item"
             v-for="item in queryEnterprisesResult"
             @click="router.push(`/company/${item.companyId}`)"
             :key="item.recruitmentInfoId">
          <div class="left">
            <img class="left-icon"
                 :src="item.logoUrl" />
            <div class="left-title">{{ item.fullName }}</div>
            <div class="left-info">{{ item.companyIntroduce }}</div>
          </div>
          <div class="right">
            <div class="right-quantity">在招职位 · {{ item.recruitmentCount }}</div>
            <div class="right-tags">
              <span>{{ item.companyIntroduce }}</span>丨
              <span>{{ item.financingStatus }}</span>丨
              <span>{{ item.staffSize }}</span>
            </div>
          </div>
        </div>
        <div class="no-data"
             v-if='totalEnterprises===0'> 暂无数据 </div>

        <div class="pagination-div">
          <el-pagination background
                         layout="prev, pager, next"
                         :page-size="pageSize"
                         :total="totalEnterprises"
                         @current-change="goPage"
                         @prev-click="goPage"
                         prev-text="上一页"
                         next-text="下一页"
                         @next-click="goPage"></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref, defineProps, defineEmits, computed, onMounted,defineExpose } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();


const props = defineProps({
  queryPositionsResult: {
    default: () => ([{
      recruitmentInfoId: "",
      postClassifyName: "",
      moneyStart: "",
      moneyEnd: "",
      shortName:"",
      city: "",
      fullName: "",
      industryName: "",
      companyLogo: "",
      workingYearsType: 0,
      financingStatus: 0,
      education: 0,
      staffSize: 0,
      recruitmentPostName:"",
    }]),
  },
  queryEnterprisesResult: {
    default: () => ([{
      recruitmentInfoId: "",
      postClassifyName: "",
      moneyStart: "",
      moneyEnd: "",
      city: "",
      fullName: "",
      industryName: "",
      logoUrl: "",
      workingYearsType: 0,
      financingStatus: 0,
      education: 0,
      staffSize: 0,
      recruitmentCount: 0,
      companyIntroduce: "",
      companyId:"",
    }]),
  },
  totalPositions: {
    default: () => 0,
  },
  totalEnterprises: {
    default: () => 0,
  },
  cityCode:{
    default: () => '',
  },
  provinceCode:{
    default: () => '',
  },
  queryContent:{
    default: () => '',
  }
});

const emit = defineEmits(["queryRelatedPositions", "queryRelatedEnterprises"])


// 工作经验
const workingYearsTypeMap = ['', '不限', '1年以内', '1-3年', '3-5年', '5-10年'];

// 学历
const educationMap = ['', '不限', '初中及以下', '中专/中技', '高中', '大专', '本科', '硕士', '博士'];

// 融资状态
const financingStatusMap = ['', '未融资', '天使轮', 'A轮', 'B轮', 'C轮', 'D轮及以上'];

// 人数规模
const staffSizeMap = ['', '0-20人', '20-99人', '100-499人', '500-999人', '1000-9999人', '10000人以上'];


// 分页条目
const pageSize = ref(10)
// 当前页码
const pageNo = ref(1)
// 当前激活的标题
const activeTitle = ref(1)


const searchParams = ref({
    cityCode: computed(() => props.cityCode),
    pageNo: computed(() => pageNo.value),
    pageSize:computed(() => pageSize.value),
    provinceCode: computed(() => props.cityCode),
    searchName: computed(() => props.queryContent),
})


// 是否搜索职业

const isPosition = ref(true)


// 搜索相关职业
const handleQueryRelatedPositions = () => {
  pageNo.value = 1
  activeTitle.value = 1
  isPosition.value = true
  emit("queryRelatedPositions",searchParams.value)
}


// 搜索相关公司
const handleQueryRelatedEnterprises = () => {
  pageNo.value = 1
  isPosition.value=false
  activeTitle.value = 2
  emit("queryRelatedEnterprises",searchParams.value)
}



// 分页方法
const goPage = async (val: any) => {
  pageNo.value = val
  console.log('🚀🚀~ val:',val);
  console.log('🚀🚀~ searchParams:',searchParams.value);

  if(activeTitle.value===1){
    emit("queryRelatedPositions",searchParams.value)
  }else{
    emit("queryRelatedEnterprises",searchParams.value)
  }
};


defineExpose({
  isPosition
})



onMounted(()=>{

})


</script>

<style lang='scss'>
.search-list {
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1032px;
    height: 64px;
    background: #f8f8f8;
    color: #656565;
    cursor: pointer;

    .title {
      width: 50%;
      text-align: center;
      height: 100%;
      line-height: 64px;
    }
    .active-title {
      color: #ed263d;
    }
  }
  .jobs {
    box-sizing: border-box;
    width: 1032px;
    border: 1px #e8e8e8 solid;
    border-top: none;
    margin-bottom: 200px;
    .result-list {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 30px 30px 30px 30px;

      .result-item {
        width: 972px;
        height: 114px;
        background: #ffffff;
        box-shadow: 0px 3px 20px 1px rgba(0, 0, 0, 0.05999999865889549);
        border-radius: 0px 0px 0px 0px;
        margin-top: 30px;
        position: relative;
   cursor: pointer;
        .left {
          width: 300px;
          position: absolute;
          left: 30px;
          top: 30px;
          .left-title {
            font-size: 18px;
            font-family: PingFang SC-Bold, PingFang SC;
            font-weight: bold;
            color: #222222;
          }
          .left-money {
            position: absolute;
            top: 35px;
            left: 0;
            font-size: 18px;
            font-family: PingFang SC-Semibold, PingFang SC;
            font-weight: 600;
            color: #ff9100;
          }
          .left-tags {
            position: absolute;
            top: 37px;
            left: 100px;
            font-size: 14px;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #222222;
          }
        }
        .middle {
          position: absolute;
          width: 300px;
          left: 525px;
          top: 30px;
          .middle-title {
            font-size: 18px;
            font-family: PingFang SC-Bold, PingFang SC;
            font-weight: bold;
            color: #222222;
          }
          .middle-tags {
            position: absolute;
            top: 35px;
            left: 0;
            font-size: 14px;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #222222;
          }
        }
        .right {
          position: absolute;
          right: 30px;
          top: 27px;
          img {
            width: 60px;
            height: 60px;
            border-radius: 8px;
          }
        }
      }

      .result-item:nth-child(1) {
        margin-top: 0;
      }
    }
  }
  .companies {
    box-sizing: border-box;
    width: 1032px;
    border: 1px #e8e8e8 solid;
    border-top: none;
    margin-bottom: 200px;
    .result-list {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 30px 30px 30px 30px;

      .result-item {
        width: 972px;
        height: 114px;
        background: #ffffff;
        box-shadow: 0px 3px 20px 1px rgba(0, 0, 0, 0.05999999865889549);
        border-radius: 0px 0px 0px 0px;
        margin-top: 30px;
        position: relative;
   cursor: pointer;

        .left {
          width: 500px;
          position: absolute;
          left: 30px;
          top: 30px;
          .left-icon {
            position: absolute;
            left: 0px;
            top: 0px;
            width: 60px;
            height: 60px;
            border-radius: 8px;
          }
          .left-title {
            font-size: 18px;
            font-family: PingFang SC-Bold, PingFang SC;
            font-weight: bold;
            color: #222222;
            position: absolute;
            left: 90px;
            top: 0px;
          }
          .left-info {
            position: absolute;
            top: 35px;
            left: 90px;
            font-size: 14px;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #656565;
            position: absolute;
          }
        }
        .right {
          position: absolute;
          width: 400px;
          right: 0;
          top: 30px;
          .right-quantity {
            font-size: 14px;
            font-family: PingFang SC-Bold, PingFang SC;
            font-weight: bold;
            color: #ed263d;
            position: absolute;
            top: 0px;
            right: 30px;
          }
          .right-tags {
            position: absolute;
            top: 35px;
            right: 30px;
            font-size: 14px;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #222222;
          }
        }
      }

      .result-item:nth-child(1) {
        margin-top: 0;
      }
    }
  }
  .pagination-div {
    margin-top: 30px;
    text-align: right;
    .el-pagination.is-background .el-pager li:not(.disabled).active {
      background-color: #ed263d;
      color: #ffffff;
    }
    .btn-prev,
    .btn-next {
      span {
        font-size: 12px;
        box-sizing: border-box;
        background: #ffffff;
        padding: 0px 14px;
        border: 1px solid #dedede;
      }
    }
    .el-pagination.is-background .btn-prev,
    .el-pagination.is-background .btn-next,
    .el-pagination.is-background .el-pager li {
      background: #ffffff;
      border-radius: 0px 0px 0px 0px;
      opacity: 1;
      border: 1px solid #dedede;
      margin: 0 3px;
    }
  }
  .no-data{
    text-align: center;
    color: #656565;
  }
}
</style>
