<template>
  <div class="yili">
    <!-- banner -->
    <div class="banner">
      <!--      <img class="bg" src="../assets/home-banner.png"/>-->

      <!-- 返回勋章馆 -->
      <img @click="$router.push('/')" class="back-index" src="../assets/detail-back-index.png"/>

      <!--当前等级-->
      <div class="current-level">{{ growLevel }}</div>

      <!-- 当前成长值 -->
      <div class="grow-num">
        <div class="num">{{ growNum }}</div>
      </div>
    </div>

    <!-- 成长值列表 -->
    <div class="content">
      <div v-if="growthList.length > 0" style="margin-top:-.8rem;height: 7rem;overflow-y: auto;">
        <div class="growth" v-for="(item,index) in growthList" :key="index">
          <!-- 成长任务 信息 -->
          <div class="growth-message">{{ item.name }}</div>
          <!-- 分值 -->
          <div class="growth-point">
            <!--            <img class="growth-img" :src="item.img"/>-->
            <div style="font-size: .28rem">成长值+</div>
            <div style="font-size:.28rem;width: .3rem;text-align: center;color:#ff9900;">{{ item.points }}</div>
          </div>
        </div>
      </div>

      <div v-else class="none-data" style="color: #0a4a39;">
        暂无成长明细数据
      </div>
    </div>

  </div>
</template>

<script lang='ts' setup>

/* const growthList = [{
  img: '//img10.360buyimg.com/imgzone/jfs/t1/196246/13/19949/2370/612458deE2bd71c16/55b2363b487504af.png',
  name: '10笔',
  points: 5,
}, {
  img: '//img10.360buyimg.com/imgzone/jfs/t1/196246/13/19949/2370/612458deE2bd71c16/55b2363b487504af.png',
  name: '10笔',
  points: 15,
}, {
  img: '//img10.360buyimg.com/imgzone/jfs/t1/196246/13/19949/2370/612458deE2bd71c16/55b2363b487504af.png',
  name: '10笔',
  points: 5,
}, {
  img: '//img10.360buyimg.com/imgzone/jfs/t1/196246/13/19949/2370/612458deE2bd71c16/55b2363b487504af.png',
  name: '10笔',
  points: 15,
}, {
  img: '//img10.360buyimg.com/imgzone/jfs/t1/196246/13/19949/2370/612458deE2bd71c16/55b2363b487504af.png',
  name: '10笔',
  points: 5,
}, {
  img: '//img10.360buyimg.com/imgzone/jfs/t1/196246/13/19949/2370/612458deE2bd71c16/55b2363b487504af.png',
  name: '10笔',
  points: 15,
}, {
  img: '//img10.360buyimg.com/imgzone/jfs/t1/196246/13/19949/2370/612458deE2bd71c16/55b2363b487504af.png',
  name: '10笔',
  points: 5,
}, {
  img: '//img10.360buyimg.com/imgzone/jfs/t1/196246/13/19949/2370/612458deE2bd71c16/55b2363b487504af.png',
  name: '10笔',
  points: 15,
}]; */

import { ref } from 'vue';
import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';

// 活动子品牌 - 伊利 舒化
const sonBrand = 'yousuanru';
const cjwxPin = window.sessionStorage.getItem('LZ_JD_USER_PIN');

const growthList = ref([]);
const growNum = ref(0);
const growLevel = ref(0);

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
      growLevel.value = res.data[0].level;
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
    background: url('../assets/growth-main.png') no-repeat;
    background-size: cover;
    height: 13.35rem;

    .banner {
      position: relative;
      height: 5rem;

      .current-level {
        width: .5rem;
        position: absolute;
        right: 2.27rem;
        top: 2.05rem;
        font-size: .3rem;
        color: white;
        font-weight: bold;
        text-align: center;
      }

      .bg {
        width: 7.5rem;
      }

      .back-index {
        width: 1.82rem;
        position: absolute;
        top: 1.48rem;
        left: 0.34rem;
      }

      .grow-num {
        width: 100%;
        line-height: .3rem;
        text-align: center;
        position: absolute;
        bottom: 2.1rem;
        display: flex;
        flex-direction: row;
        justify-content: center;

        .num {
          font-size: 0.7rem;
          color: #ff9900;
        }

        .icon {
          width: .3rem;
          margin-left: .1rem;
        }
      }
    }

    .content {
      width: 6.8rem;
      height: 6.5rem;
      margin: 0 auto;
      padding: 1.5rem 0 0;
      background: url("../assets/detail-grow-bg.png") no-repeat;
      background-size: cover;

      .growth {
        width: 6.5rem;
        height: .9rem;
        margin: 0.1rem auto;
        padding: .16rem .29rem .16rem .29rem;
        align-items: center;
        /*background-color: #ffffff;*/
        background: url('../assets/grow-item-bg.png') no-repeat;
        background-size: 100%;
        /* border-radius: 0.12rem; */
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        box-sizing: border-box;

        .growth-message {
          width: 3rem;
          text-align: left;
          font-family: MicrosoftYaHei;
          font-size: 0.28rem;
          /*font-weight: bold;*/
          color: #084b39;
        }

        .growth-point {
          height: .45rem;
          display: flex;
          flex-direction: row;
          color: #084b39;
          /*font-weight: bold;*/
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
