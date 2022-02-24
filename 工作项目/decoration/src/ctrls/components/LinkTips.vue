<!--
 * @Description:
 * @Date: 2021-05-06 09:57:10
 * @LastEditTime: 2021-08-16 16:32:13
 * @FilePath: \decoration\src\ctrls\components\LinkTips.vue
-->
<template>
  <div class="link-tips">
    <p class="tip"
       v-if='platform==="tmall"'>注：链接需符合
      <lz-popover placement="top"
                  width="350"
                  trigger="hover">
        <a slot="reference">《海报及广告链接规范》</a>
        <p>1. 只能以http://,https://开头</p>
        <p>2. 链接须包含以下内容
          <br>
          &nbsp; &nbsp; <span>.m.tmall.com</span>
          <br>
          &nbsp; &nbsp; <span>.m.taobao.com</span>
          <br>
          &nbsp; &nbsp; <span>.tmall.com</span>
          <br>
          &nbsp; &nbsp; <span>https://m.duanqu.com/</span>
          <br>
          &nbsp; &nbsp; <span>https://market.m.taobao.com/</span>
          <br>
          &nbsp; &nbsp; <span>https://www.taobao.com/</span>
        </p>
      </lz-popover>
    </p>
    <p class="tip"
       v-else>注：链接需符合
      <lz-popover placement="top"
                  width="350"
                  trigger="hover">
        <a slot="reference">《海报及广告链接规范》</a>
        <p>1. 链接须包含 .isvjcloud.com，.isvjd.com或.jd.com</p>
        <p>2. 只能以http://,https://开头</p>
      </lz-popover>
    </p>
  </div>
</template>

<script>

export default {
  data () {
    return {
      platform: process.env.VUE_APP_PLATEFORM,
    };
  },
};
</script>

<style lang='scss'>
@import '~lz-crm/style/variables';
.link-tips {
  .tip {
    font-size: 12px;
    color: $FONT_MINOR_GRAY;
  }
}
</style>
