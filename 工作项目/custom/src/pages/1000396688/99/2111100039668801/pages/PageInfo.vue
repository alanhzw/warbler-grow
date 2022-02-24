<!--
 * @Author: 一尾流莺
 * @Description:页面组件
 * @Date: 2021-08-27 15:35:43
 * @LastEditTime: 2021-12-03 14:09:55
 * @FilePath: \custom\src\pages\1000396688\99\2111100039668801\pages\PageInfo.vue
-->
<template>
  <div class="page-box">
    <img class="bg-main"
         :src="options.mainPicOptions.imgUrl" />
    <div class="btn-rule"
         :style="options.ruleBtnOptions"
         @click="handleOpenRulePopup"></div>
    <div class="btn-main"
         :style="options.mainBtnOptions"
         @click="handleClick"></div>
  </div>
</template>

<script lang='ts' setup>
import { defineProps, defineEmits, onMounted, PropType } from 'vue';
import { Toast } from 'vant';
import { HomePageOptions } from '../config/type';

const emit = defineEmits(['openOpenCardPopup', 'openRulePopup', 'join']);

const props = defineProps({
  options: {
    type: Object as PropType<HomePageOptions>,
    default: () => ({}),
  },
  isOpenCard: {
    type: Boolean,
    default: () => false,
  },
  activityInfo: {
    type: Object,
    default: () => ({}),
  },
  joinResult: {
    type: Boolean,
    default: () => false,
  },
});

// 打开规则弹窗
const handleOpenRulePopup = () => {
  emit('openRulePopup');
};

// 点击主按钮
const handleClick = () => {
  if (!props.isOpenCard) {
    emit('openOpenCardPopup');
    return;
  }
  if (props.activityInfo.hasFollow) {
    Toast.fail('该活动只针对新粉丝哦!');
    return;
  }
  emit('join');
};

onMounted(() => {
  //
});

</script>

<style lang='scss'>
.page-box {
  width: 7.5rem;
  background-repeat: no-repeat;
  background-size: 100%;
  position: relative;

  .bg-main {
    width: 100%;
  }
  .btn-rule {
    position: absolute;
    background-repeat: no-repeat;
    background-size: 100%;
  }
  .btn-main {
    position: absolute;
    background-repeat: no-repeat;
    background-size: 100%;
  }
}
</style>
