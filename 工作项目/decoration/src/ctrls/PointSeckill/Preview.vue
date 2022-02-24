<!--
 * @Description:
 * @Date: 2021-03-15 11:31:55
 * @LastEditTime: 2021-04-26 15:06:34
 * @FilePath: \yunluzhuangxiu\src\ctrls\PointSeckill\Preview.vue
-->
<template>
  <div class="ctrl-member-coupon-preview" v-if="data.coupons.length > 0 || data.products.length > 0 || data.beans.length > 0 ||data.selectType == 2 || isB==1">
    <result v-if="data.coupons.length > 0 || data.products.length > 0 || data.beans.length > 0 ||data.selectType == 2" :data="data" />
    <div v-else class="blank-tip" :class="{mb15: data.mb15}">
      <img alt='' src="../assets/icon-text.png"><span class="text">请添加积分秒杀活动</span>
    </div>
  </div>
</template>

<script>
import Result from './Result';
// 获取设备 1是客户端 2是移动端
const isB = sessionStorage.getItem('LZ_CRM_CLIENT_TYPE');
export default {
  name: 'CtrlMemberCouponPreview',
  components: {
    Result,
  },
  props: {
    data: {
      default: () => ({
        text: '',
      }),
    },
  },
  data() {
    return {
      isB,
    };
  },
};
</script>

<style lang="scss">
@import '../style/common_ctrl';

.ctrl-member-coupon-preview {
  .blank-tip {
    @extend .ctrl;
    height: 60px;
    font-size: 12px;
    color: $FONT_DISABLE_GRAY;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 10px;
    }
  }
}
</style>
