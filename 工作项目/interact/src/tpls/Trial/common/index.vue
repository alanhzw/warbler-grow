<!--
 * @Description:会员试用
 * @Autor: hanzhiwei
 * @Date: 2021-01-25 10:28:55
 * @LastEditTime: 2021-10-27 18:53:30
 * @FilePath: \interact\src\tpls\Trial\common\index.vue
-->
<template>
  <div class="trial-page2">

    <!-- 主图 -->
    <div class="main">
      <img v-if="options.mainPic"
           :src="`${CONST.IMAGE_PREFIX}${options.mainPic}`">
      <img v-else
           :src="mainPic">
    </div>
    <!-- 活动规则按钮 -->
    <div class="rules">
      <img :src="ruleImg">
      <p>活动规则</p>
    </div>
    <!-- 申请按钮 -->
    <div class="status-btn">
      <img :src="btnImg">
    </div>

  </div>
</template>

<script>

import CONST from '@/utils/constant';

export default {
  name: 'CommonLzTplTrial',
  props: {
    options: {
      type: Object,
      // 默认是个空对象
      default: () => ({
      }),
    },
  },
  data() {
    return {
      mainPic: require('@/assets/trial-main.png'), // 主图
      ruleImg: require('@/assets/trial-rule.png'), // 活动规则
      btnImg: require('@/assets/trial-btn-going.png'), // 按钮图片
      CONST,
    };
  },
};
</script>

<style lang='scss'>
.trial-page2 {
  // width: 375px;
  min-height: 100%;
  background: url('../../../assets/trial-bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #00147f;
  position: relative;

  .status-btn {
    position: absolute;
    height: 1rem;
    width: 100%;
    left: 0;
    top: 10.8rem;
    display: flex;
    justify-content: center;
    img {
      width: 90%;
    }
  }

  .rules {
    position: relative;
    img {
      width: 1.5rem;
      position: absolute;
      right: 0.3rem;
      top: 0.2rem;
    }
    p {
      position: absolute;
      right: 0.44rem;
      top: 0.05rem;
      font-size: 0.28rem;
      line-height: 0.28rem;
    }
  }

  .main {
    position: absolute;
    width: 100%;
    img {
      width: 100%;
      position: absolute;
      top: 0rem;
      left: 0;
    }
  }
}
</style>
