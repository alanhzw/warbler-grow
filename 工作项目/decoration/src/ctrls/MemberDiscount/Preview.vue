<!--
 * @Description:
 * @Date: 2021-03-15 11:31:55
 * @LastEditTime: 2021-09-08 10:39:10
 * @FilePath: \decoration\src\ctrls\MemberDiscount\Preview.vue
-->
<template>
  <div class="ctrl-member-coupon-preview"
       v-if="data.discounts.length > 0 || isB==1">
    <result v-if="data.discounts.length > 0"
            :data="data" />
    <div v-else
         class="blank-tip"
         :class="{mb15: data.mb15}">
      <img alt=''
           src="../assets/icon-text.png"><span class="text">请添加会员专享折扣</span>
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
