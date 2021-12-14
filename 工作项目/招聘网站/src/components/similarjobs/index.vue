<!--
 * @Descripttion: 相似职位公共组件
 * @Author: yang chenglin
 * @Date: 2021-09-23 18:40:06
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-27 16:21:40
-->
<template>
  <div class="similar-jobs">
    <div class="header-div display-flex">
      <div class="page-title">相似职位</div>
      <!-- <div class='load-more-link'>
        更多相似职位 >
      </div>-->
    </div>
    <div class="jobs-div">
      <div v-for="item in similarPositions.list"
           :key="item"
           class="jobs-item display-flex"
           @click="$router.push(`/job/${item.recruitmentInfoId}`)">
        <div>
          <div class="display-flex">
            <div class="jobs-name">{{ item.recruitmentPostName }}</div>
            <div class="jobs-pay">{{ item.moneyType == 1 ? `${item.moneyStart}-${item.moneyEnd}k` : '面议' }}</div>
          </div>
          <div>
            <span>{{ item.shortName }}</span>
            <span v-if="item.city"> | </span>
            <span>{{ item.city }}</span>
          </div>
        </div>
        <div class="jobs-icon">
          <img :src="item.companyLogo"
               alt="暂无图片" />
        </div>
      </div>
      <div class="pagination-div"
           @click="goPage">查看更多</div>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { defineProps, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import useSimilarPositions from './hooks/useSimilarPositions';

const props = defineProps({
  recruitmentInfoId: {
    type: String,
    default: () => '',
  },
});

const { similarPositions, setSimilarPositions, setNotThisCompanySimilarJobList } = useSimilarPositions();

onMounted(() => {
  if (props.recruitmentInfoId) {
    setNotThisCompanySimilarJobList({
      recruitmentInfoId: props.recruitmentInfoId,
      pageSize: similarPositions.page.size,
    });
  } else {
    setSimilarPositions({
      pageSize: similarPositions.page.size,
    });
  }
});

/**
 * @description: 加载更多
 * @param {*}
 * @return {*}
 */
const goPage = () => {
  similarPositions.page.size += 4;
  if (props.recruitmentInfoId) {
    setNotThisCompanySimilarJobList({
      recruitmentInfoId: props.recruitmentInfoId,
      pageSize: similarPositions.page.size,
    });
  } else {
    setSimilarPositions({
      pageSize: similarPositions.page.size,
    });
  }
};
</script>

<style lang="scss">
.similar-jobs {
  color: #999999;
  font-family: PingFang SC-Regular, PingFang SC;
  .display-flex {
    display: flex;
    align-items: center;
  }

  .header-div {
    justify-content: space-between;
    .page-title {
      color: #222222;
      font-size: 24px;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
    }
    .load-more-link {
      font-size: 14px;
      font-family: PingFang SC-Light, PingFang SC;
      cursor: pointer;
    }
  }

  .jobs-div {
    .jobs-item {
      height: 120px;
      justify-content: space-between;
      border-bottom: 1px solid #e8e8e8;
      font-size: 14px;
      line-height: 30px;
      border-radius: 0px 0px 0px 0px;
      .jobs-name {
        font-size: 18px;
      }
      .jobs-pay {
        margin-left: 10px;
        color: #ff9100;
        font-size: 18px;
        font-family: PingFang SC-Semibold, PingFang SC;
      }
      .jobs-icon {
        width: 80px;
        height: 80px;
        img {
          width: 80px;
          height: 80px;
          border-radius: 16px;
          border: 1px solid #F9F9F9;
        }
      }
    }
    .pagination-div {
      height: 46px;
      text-align: center;
      line-height: 46px;
      background: #F8F8F8;
      font-size: 14px;
      cursor: pointer;
	  margin-top: 10px;
      margin-bottom: 20px;
      &:hover, &:active {
        background: #ED263D;
        color: #FFFFFF;
      }
    }
  }
}
</style>
