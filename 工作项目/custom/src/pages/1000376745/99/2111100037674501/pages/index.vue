<!--
 * @Author: caoshijie
 * @Date: 2021-09-23 14:48:11
 * @LastEditTime: 2021-09-30 15:21:13
 * @LastEditors: caoshijie
 * @Description: 雅诗兰黛复购礼首页
 * @FilePath: \custom\src\pages\1000376745\99\2111100037674501\pages\index.vue
-->
<template>
  <div class='box'>
    <img class='bgImg' src='../assets/indexBg.png' alt srcset />
    <!-- 礼品 -->
    <Gift class='gift'></Gift>
    <!-- 规则 -->
    <div class='rules' @click='isShowPopUp = true'>
      <img src='../assets/ruleIcon.png' alt srcset />
      活动规则
    </div>
    <!-- 商品列表 -->
    <sku-list class='skuList' :isShowBtn='true'></sku-list>

    <!--    <div class='skuTipInfo'>-->
    <!--      Ⅰ为产品昵称，产品注册名为雅诗兰黛特润修护肌活精华露-->
    <!--      Ⅳ为产品昵称，产品注册名为雅诗兰黛持妆粉底液SPF 10/PA++-->
    <!--      Ⅸ为产品昵称，产品注册名为雅诗兰黛樱花微精华露-->
    <!--    </div>-->
    <!-- 规则弹窗 -->
    <rule :isShowPopUp='isShowPopUp' @close-popup='isShowPopUp = false'></rule>
    <!-- 活动结束弹窗 -->
    <activityEnd :isShowPopUp='activeInfo.isStop'></activityEnd>
  </div>
</template>

<script lang='ts' setup>
import {
  ref, inject, onMounted, provide, defineProps, computed,
} from 'vue';
import Gift from '../components/gift.vue';
import skuList from '../components/skuList.vue';
import Rule from '../components/rule.vue';
import activityEnd from '../components/activityEnd.vue';

const props = defineProps({
  activeInfo: {
    type: Object,
    default: () => ({}),
  },
});
const isShowPopUp = ref(false);
const activeInfo = computed(() => props.activeInfo);

</script>

<style lang='scss' scoped>
.box {
  position: relative;
}

.bgImg {
  width: 100%;
}

.gift {
  position: absolute;
  top: 8.2rem;
  padding: 0 0.25rem;
  width: 100%;
  box-sizing: border-box;
}

.rules {
  position: absolute;
  top: 10.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: inline-block;
  border-bottom: 1px solid #020d29;
  font-size: 0.32rem;
  padding-bottom: 0.1rem;
  box-sizing: border-box;
  font-weight: 600;
  letter-spacing: 0.15em;

  img {
    height: 0.32rem;
    vertical-align: middle;
    margin-top: -0.01rem;
  }
}

.skuList {
  position: absolute;
  top: 14.3rem;
}

</style>
