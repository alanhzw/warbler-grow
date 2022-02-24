<!--
 * @Description:
 * @Autor: hanzhiwei
 * @Date: 2021-01-04 10:34:58
 * @LastEditTime: 2021-01-13 10:44:11
 * @FilePath: \SNActivity\src\components\common\SunCode.vue
-->
<template>
  <div class="sun-code-box" :class='{maxHeight:isShowSunCode}'>
    <!-- 太阳码 小程序跳转 -->
    <img :src="sunCode" v-if="isShowSunCode" class="sun-code">
  </div>
</template>

<script>
// 引入苏宁方法
import getSn from '@/assets/js/suning.js';
const { galaxie, isSnApp, isMiniApp } = getSn();
// 引入封装api
import { commonService } from '@/axios/apis';


export default {
  name: '',
  props: {
    activityInfo: {
      default: () => ({}),
    },
  },
  data () {
    return {
      sunCode: '', // 太阳码
    };
  },
  methods: {
    /**
     * @description: 获取太阳码
     */
    async getSunCode () {
      let BASE_URL = `${process.env.VUE_APP_BASEURL}activity/pointsExchange/`;
      let sceneParam = encodeURIComponent(BASE_URL + this.activityInfo.activityType + '/' + this.activityInfo.activityId);
      console.log(sceneParam);
      await commonService['getSunCode']({
        posterHeight: '1334',
        posterUrl: 'https://uimgproxy.suning.cn/uimg1/sop/commodity/PlJO93jhXjf9LOC0KdIF0g.jpg',
        posterWith: '750',
        sunCodeX: '236',
        sunCodeY: '726',
        venderId: this.activityInfo.shopId,
        width: '252',
        sceneParam: sceneParam,
      }).then(({ data }) => {
        if (data.result) {
          this.sunCode = data.data.sunCodeUrl;
        } else {
          this.$toast(data.errorMessage);
        }
      });
    }
  },
  mounted () {

  },
  computed: {
    isShowSunCode () {
      if (process.env.NODE_ENV === 'loacl') {
        return false;
      }
      if (!isSnApp && !isMiniApp) {
        return true;
      } else {
        return false;
      }
    },
  }
};
</script>

<style lang="scss">
.sun-code-box {
  .maxHeight {
    min-height: 5vh;
    max-height: 95vh;
    overflow: hidden;
  }
  .sun-code {
    width: 100vw;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 99999999999;
  }
}
</style>