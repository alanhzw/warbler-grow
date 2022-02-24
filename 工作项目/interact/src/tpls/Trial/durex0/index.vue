<!--
 * @Description:会员试用
 * @Autor: hanzhiwei
 * @Date: 2021-01-25 10:28:55
 * @LastEditTime: 2021-10-27 18:54:17
 * @FilePath: \interact\src\tpls\Trial\durex0\index.vue
-->
<template>
  <div class="trial-durex-page0">

    <!-- 主图 -->
    <div class="main">
      <img v-if="options.mainPic"
           :src="`${CONST.IMAGE_PREFIX}${options.mainPic}`">
      <img v-else
           :src="mainPic">
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
      mainPic: require('@/mobile/pages/trial/durex0/main-img.jpg'), // 主图
      ruleImg: require('@/assets/trial-rule.png'), // 活动规则
      btnImg: require('@/assets/trial-btn-going.png'), // 按钮图片
      CONST,
    };
  },
};
</script>

<style lang='scss'>
.trial-durex-page0 {
  // width: 375px;
  min-height: 100%;
  background: url('../../../mobile/pages/trial/durex0/back-img.jpg');
  background-repeat: no-repeat;
  background-size: contain;
  background-color: #090806;
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
