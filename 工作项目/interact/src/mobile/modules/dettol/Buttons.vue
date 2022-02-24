<!--
 * @Description:
 * @Date: 2021-03-03 16:12:33
 * @LastEditTime: 2021-10-09 09:58:34
 * @FilePath: \interact\src\mobile\modules\dettol\Buttons.vue
-->
<template>
  <div class="buttons-box-dettol">
    <div class="item"
         :style="options.buttonStyle">
      您的订单<i class="iconfont icon-icon-11" />
    </div>
    <div class="item"
         v-lz-click="'18'"
         :style="options.buttonStyle">
      活动规则<i class="iconfont icon-icon-11" />
    </div>
    <div class="item"
         v-lz-click.isMain="'19'"
         :style="options.buttonStyle">
      中奖记录<i class="iconfont icon-icon-11" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      default: () => ({}),
    },
    userInfo: {
      default: () => ({}),
    },
    activityInfo: {
      default: () => ({}),
    },
    settings: {
      default: () => ({}),
    },
  },
  data() {
    return {

    };
  },
  created() {
    console.log(123123, this.options, this.userInfo, this.activityInfo);
  },
};
</script>

<style lang='scss'>
.buttons-box-dettol {
  margin-top: 0.3rem;
  padding: 0 0.5rem;
  display: flex;
  justify-content: space-between;

  .iconfont {
    font-size: 0.1rem;
  }
}
</style>
