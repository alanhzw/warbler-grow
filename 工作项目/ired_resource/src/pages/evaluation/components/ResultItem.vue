<!--
 * @Author: 一尾流莺
 * @Description:测评结果item组件
 * @Date: 2021-10-15 16:05:59
 * @LastEditTime: 2021-11-27 17:28:22
 * @FilePath: \ired_resource\src\pages\evaluation\components\ResultItem.vue
-->
<template>
  <div class="result-item">
    <div class="result-title">{{ title }}</div>
    <div class="result-content">
      <p class="item"
         v-html="content"></p>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: () => '个性特征描述：',
  },
  content: {
    type: String,
    default: () => '',
  },
});

const content = computed(() => props.content.replace(/\r/g, '<br>'));

</script>

<style lang='scss'>
.result-item {
  margin-top: 30px !important;
  .result-title {
    font-size: 24px;
    font-family: PingFang SC-Heavy, PingFang SC;
    font-weight: 800;
    color: #222222;
    border-left: 4px solid #ED263D;
    padding-left: 10px;
  }
  .result-content {
    width: 820px;
    margin-top:20px;
    .item {
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #656565;
      line-height: 25px;
      margin: 5px 0;
    }
  }
}
</style>
