<!--
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-06-15 18:14:10
 * @LastEditTime: 2021-07-26 15:19:36
 * @FilePath: \decoration\src\ctrls\SingleRowFigure\Preview.vue
-->
<template>
  <div class="ctrl-single-row-figure-preview">
    <result v-if='data.levelState.levels.length > 0'
            :data="data" />
    <div v-else
         class="blank-tip"
         :class="{mb15: data.mb15}">
      <img alt=''
           src="../assets/icon-text.png"><span class="text">请添加会员权益</span>
    </div>
  </div>
</template>

<script>

import Result from './Result';

export default {
  name: 'CtrlSingleRowFigurePreview',
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
};
</script>

<style lang="scss">
@import '../style/common_ctrl';
@import '~lz-crm/style/variables';

.ctrl-single-row-figure-preview {
  .blank-tip {
    @extend .ctrl;
    position: relative;
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 10px;
      font-size: 12px;
      color: #C3CBD6;
    }
  }
}
</style>
