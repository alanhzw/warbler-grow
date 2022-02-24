<!--
 * @Author: 一尾流莺
 * @Description:开卡
 * @Date: 2021-09-17 10:36:06
 * @LastEditTime: 2021-10-11 10:07:55
 * @FilePath: \custom\src\pages\1000123965\99\2110100012396501\components\PopupOpenCard.vue
-->
<template>
  <div class="open-card-popup">
    <img src="../assets/popup-open-card.png"
         class="popup-content" />
    <div class="open-card-content"
         @click='handleClick'></div>
  </div>
</template>

<script lang='ts' setup>
import { openCard } from '../hooks/useMethods';

const handleClick = () => {
  openCard(false);
};
</script>

<style lang='scss'>
.open-card-popup {
  position: relative;
  .popup-content {
    width: 7.2rem;
  }
  .open-card-content {
    width: 5.1rem;
    height: 1rem;
    position: absolute;
    left: 50%;
    top: 6.5rem;
    transform: translate(-50%);
    overflow: auto;
    color: #000000;
    font-size: 0.28rem;
  }
}
</style>
