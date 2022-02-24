<template>
  <div class="yili">
    <!-- banner -->
    <div class="banner">
      <img class="bg" src="../assets/home-banner.png"/>

      <!-- 返回勋章馆 -->
      <img @click="$router.back(-1)" class="back-index" src="../assets/detail-back-index.png"/>

      <!-- 当前成长值 -->
      <div class="grow-num">
        <div>当前成长值：</div>
        <div class="num">{{ growNum }}</div>
      </div>
    </div>

    <!-- 成长值列表 -->
    <div class="content">
      <div v-if="growthList.length > 0" style="height: 5.6rem;overflow-y: auto">
        <div class="growth" v-for="(item,index) in growthList" :key="index">
          <!-- 成长任务 信息 -->
          <div class="growth-message">{{ item.name }}</div>
          <!-- 分值 -->
          <div class="growth-point">
            <img class="growth-img" :src="item.icon"/>
            <div style="font-size: .2rem">+</div>
            <div style="font-size:.26rem;width: .3rem;text-align: center">{{ item.points }}</div>
          </div>
        </div>
      </div>

      <div v-else class="none-data">
        暂无成长明细数据
      </div>
    </div>

  </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue';
import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';

// 活动子品牌 - 伊利 舒化
const sonBrand = 'shuhua';
const cjwxPin = window.sessionStorage.getItem('LZ_JD_USER_PIN');

const growthList = ref([]);
const growNum = ref(0);

// 用户初始化;
const getGrowthList = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/yili/medal/growth/detail', {
    brand: sonBrand,
    cjwxPin,
  }).then((res) => {
    if (res.success) {
      growthList.value = res.data;
      growNum.value = res.data[0].achievePoints;
    }
  }).finally(() => {
    Toast.clear();
  });
};

getGrowthList();

</script>

<style lang='scss' scoped>
.yili {
  position: relative;
  text-align: center;

  .banner {
    position: relative;

    .bg {
      width: 7.5rem;
    }

    .back-index {
      width: 1.64rem;
      position: absolute;
      top: .21rem;
      left: .34rem;
    }

    .grow-num {
      width: 100%;
      line-height: .3rem;
      text-align: center;
      position: absolute;
      bottom: 1.7rem;
      font-size: .26rem;
      color: #fefefe;
      display: flex;
      flex-direction: row;
      justify-content: center;

      .num {
        font-size: .32rem;
      }

      .icon {
        width: .3rem;
        margin-left: .1rem;
      }
    }
  }

  .content {
    width: 6.8rem;
    height: 5.88rem;
    margin: 0 auto;
    margin-top: -1rem;
    padding: .6rem 0;
    position: relative;
    background: url("../assets/detail-grow-bg.png") no-repeat;
    background-size: 100% 100%;

    .growth {
      width: 5.8rem;
      height: 1rem;
      margin: 0.1rem auto;
      padding: .16rem .29rem .16rem .29rem;
      align-items: center;
      background-color: #ffffff;
      box-shadow: 5px 5px 5px #def4ff;
      border-radius: 0.12rem;
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      box-sizing: border-box;

      .growth-message {
        width: 3rem;
        text-align: left;
        font-family: MicrosoftYaHei;
        font-size: 0.24rem;
        font-weight: bold;
        color: #3d83e6;
      }

      .growth-point {
        height: .45rem;
        display: flex;
        flex-direction: row;
        color: #3d83e6;
        font-weight: bold;
        align-items: center;

        .growth-img {
          width: .4rem;
          height: .4rem;
        }
      }
    }
  }
}
</style>
