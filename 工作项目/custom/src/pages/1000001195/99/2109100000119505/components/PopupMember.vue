<!--
 * @Author: 一尾流莺
 * @Description:入会成功
 * @Date: 2021-09-02 14:19:26
 * @LastEditTime: 2021-09-06 17:26:37
 * @FilePath: \custom\src\pages\1000001195\99\2109100000119502\components\PopupMember.vue
-->
<template>
  <van-popup v-model:show="myVisible"
             get-container="#app">
    <div class="member-box">
      <img src="../assets/popup-member-success.png"
           class="popup-content" />
      <div class="close-icon"
           @click="closePopup"></div>
    </div>
  </van-popup>
</template>

<script lang='ts' setup>
import {
  Popup as VanPopup,
} from 'vant';
import { defineProps, defineEmits, computed } from 'vue';

const emit = defineEmits(['closePopup']);
const props = defineProps({
  visible: {
    type: Boolean,
    default: () => (false),
  },
});

const myVisible = computed(() => props.visible);

// 关闭弹窗
const closePopup = () => {
  emit('closePopup');
};
</script>

<style lang='scss'>
.member-box {
  position: relative;
  .popup-content {
    width: 6.5rem;
  }
  .close-icon {
    width: 1rem;
    height: 1rem;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%);
  }
}

</style>
