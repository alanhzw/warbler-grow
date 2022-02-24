<template>
  <guide class="block vh100"/>
  <drop-guide class="block"/>
  <drop-detail id="earn" class="block"/>
  <drop-way class="block"/>
  <other-methods class="block vh100"/>
  <do-good class="block vh100"/>
  <products class="block vh100"/>
  <join-now class="block vh100"/>
</template>

<script setup lang="ts">
import Guide from './blocks/Guide.vue';
import DropGuide from './blocks/DropGuide.vue';
import DropWay from './blocks/DropWay.vue';
import DropDetail from './blocks/DropDetail.vue';
import OtherMethods from './blocks/OtherMethods.vue';
import DoGood from './blocks/DoGood.vue';
import Products from './blocks/Products.vue';
import JoinNow from './blocks/JoinNow.vue';

</script>

<style lang="scss">

@font-face {
  font-family: 'Noto Sans CJK SC';
  font-style: normal;
  font-weight: normal;
  src: url(assets/NotoSansCJKsc-Regular.woff) format('woff'),
  url(assets/NotoSansCJKsc-Regular.woff2) format('woff2');
  font-display: swap;
}

@font-face {
  font-family: 'Domaine Sans Text';
  font-style: normal;
  font-weight: normal;
  src: url(assets/DomaineSans-Regular.woff2) format('woff2'),
  url(assets/DomaineSans-Regular.woff) format('woff');
  font-display: swap;
}

body.lock {
  #app {
    overflow: hidden;
  }
}

body.unlock {
  #app {
    overflow-y: auto !important;
  }
}

#app{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  scroll-snap-type: y mandatory;
  text-align: center;
  color: #202020;
  transition: all 1s ease;
  // 英文，数字使用 Domaine Sans Text,中文使用 Noto Sans CJK SC'
  font-family: 'Domaine Sans Text', 'Noto Sans CJK SC', sans-serif;
}

.vh100 {
  height: 100vh;
}

.block {
  position: relative;
  overflow: hidden;
  width: 100vw;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}
</style>
