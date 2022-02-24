<!--
 * @Description:会员集卡
 * @Autor: hanzhiwei
 * @Date: 2021-01-25 10:26:16
 * @LastEditTime: 2021-03-11 16:25:13
 * @FilePath: \yunluhuodong\src\tpls\CollectCard\common\index.vue
-->
<template>
  <div class="collect-card-page2">

    <!-- 主图 -->
    <div class="main">
      <img v-if="options.mainPic" :src="`${CONST.IMAGE_PREFIX}${options.mainPic}`">
      <img v-else :src="mainPic">
    </div>
    <!-- 活动规则按钮 -->
    <div class="rules" @click='toastMsg'>
      <img :src="ruleImg">
      <p>活动规则</p>
    </div>
    <!-- 我的奖品按钮 -->
    <div class="my-price" @click='toastMsg'>
      <img :src="ruleImg">
      <p>我的奖品</p>
    </div>
    <!-- 分享活动按钮 -->
    <div class="share-btn" @click='toastMsg'>
      <img :src="ruleImg">
      <p>分享活动</p>
    </div>
    <!-- 分享好友增加机会的文字 -->
    <div class="share-text" @click='toastMsg'>
      <p>分享好友增加抽卡机会</p>
    </div>
    <!-- 卡片列表 -->
    <div class="card-list">
      <div class="card-flex" v-if="formData.cardForm">
        <div class="card-item" v-for="(item,index) in formData.cardForm.collectCardInfoList" :key="index">
          <div class="card-number">
            {{item.count ? item.count : 0}}
          </div>
          <img class="card-border" src="../../../assets/collect-card-border.png">

          <img class="card-showImg" :src="`${CONST.IMAGE_PREFIX}${item.cardUrl}`">
        </div>
      </div>
      <div class="card-flex" v-else>
        <div class="card-item" v-for="(item,index) in cardList" :key="index">
          <div class="card-number-11">
            {{item.count ? item.count : 0}}
          </div>
          <img class="card-showImg" :src="item.url">
        </div>

      </div>
    </div>
    <!-- 抽卡按钮 -->
    <div class="status-btn" @click='toastMsg'>
      <img :src="btnImg">
    </div>
    <!-- 抽奖按钮 -->
    <!-- <div class="draw-btn">
      已集齐卡片,立即抽奖
    </div> -->

  </div>
</template>

<script>
import { Toast } from 'vant';

import CONST from '@/utils/constant';

export default {
  name: 'CommonLzTplCardCollect',
  props: {
    options: {
      type: Object,
      // 默认是个空对象
      default: () => ({
      }),
    },
    formData: {
      type: Object,
      // 默认是个空对象
      default: () => ({
      }),
    },
  },
  data() {
    return {
      CONST,
      btnImg: require('@/assets/collect-btn-draws.png'), // 按钮图片
      mainPic: require('@/assets/collect-mainPic.png'), // 主图
      ruleImg: require('@/assets/collect-rule.png'), // 活动规则图片
      cardList: [{
        url: require('@/assets/collect-card-1.png'),
      }, {
        url: require('@/assets/collect-card-2.png'),
      }, {
        url: require('@/assets/collect-card-3.png'),
      }, {
        url: require('@/assets/collect-card-4.png'),
      }, {
        url: require('@/assets/collect-card-5.png'),
      }],
    };
  },
  methods: {
    toastMsg() {
      console.log(123);
      Toast('预览页面，禁用相关操作');
    },
  },
};
</script>

<style lang='scss'>
.collect-card-page2 {
  min-height: 100%;
  background: url('../../../assets/collect-bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  overflow-x: hidden;

  .main {
    position: absolute;
    width: 100%;
    img {
      width: 100%;
      position: absolute;
      top: 0rem;
      left: 0rem;
    }
  }

  .share-btn {
    position: absolute;
    top: 1.2rem;
    right: 0rem;
    img {
      width: 1.5rem;
      position: absolute;
      right: -0.25rem;
      top: 0.2rem;
    }
    p {
      line-height: initial;
      width: 1.1rem;
      position: absolute;
      right: 0.04rem;
      top: 0.02rem;
      color: #ffffff;
      font-size: 0.26rem;
    }
  }
  .rules {
    img {
      width: 1.5rem;
      position: absolute;
      right: -0.25rem;
      top: 0.2rem;
    }
    p {
      line-height: initial;
      width: 1.1rem;
      position: absolute;
      right: 0.04rem;
      top: 0.02rem;
      color: #ffffff;
      font-size: 0.26rem;
    }
  }

  .my-price {
    position: absolute;
    top: 0.6rem;
    right: 0rem;
    img {
      width: 1.5rem;
      position: absolute;
      right: -0.25rem;
      top: 0.2rem;
    }
    p {
      line-height: initial;
      width: 1.1rem;
      position: absolute;
      right: 0.04rem;
      top: 0.02rem;
      color: #ffffff;
      font-size: 0.26rem;
    }
  }

  .share-text {
    text-align: center;
    position: absolute;
    top: 8rem;
    width: 100%;
    p {
      display: inline-block;
      width: 100%;
      color: #751e00;
    }
  }

  .card-list {
    width: 100%;
    position: absolute;
    top: 9.3rem;

    .card-flex {
      display: flex;
      justify-content: space-around;
      flex-wrap: nowrap;
      width: 95%;
      margin: 0 auto;

      .card-item {
        position: relative;
        .card-showImg {
          width: 1.2rem;
          height: 1.6rem;
          margin: 0 0.1rem;
        }

        .card-border {
          position: absolute;
          z-index: 3;
          right: -0.05rem;
          top: -0.3rem;
          width: 1.4rem;
          height: 2.1rem;
          margin: 0 0.1rem;
        }
        .card-number {
          text-align: center;
          position: absolute;
          z-index: 6;
          right: -0.05rem;
          top: -0.3rem;
          width: 0.5rem;
          height: 0.5rem;
          background: url('../../../assets/collect-card-number.png');
          background-repeat: no-repeat;
          background-size: contain;
          line-height: 0.5rem;
          color: #7c2e0b;
        }
        .card-number-11 {
          text-align: center;
          position: absolute;
          z-index: 6;
          right: -0.05rem;
          top: -0rem;
          width: 0.5rem;
          height: 0.5rem;
          background: url('../../../assets/collect-card-number.png');
          background-repeat: no-repeat;
          background-size: contain;
          line-height: 0.5rem;
          color: #7c2e0b;
        }
      }
    }
  }

  .status-btn {
    position: absolute;
    height: 1rem;
    width: 100%;
    left: 0;
    top: 11.2rem;
    display: flex;
    justify-content: center;
    img {
      width: 60%;
    }
    .draw-times {
      position: absolute;
      top: -0.1rem;
      left: 4.7rem;
      color: #f5e0af;
    }
  }

  .draw-btn {
    background: url('../../../assets/collect-candraw.png');
    background-size: cover;
    height: 0.8rem;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    line-height: 0.8rem;
    color: #ffa687;
  }
}
</style>
