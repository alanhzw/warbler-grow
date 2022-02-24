<!--
 * @Author: caoshijie
 * @Date: 2021-09-27 18:36:08
 * @LastEditTime: 2021-09-29 16:48:37
 * @LastEditors: caoshijie
 * @Description: 活动结束弹框
 * @FilePath: \custom\src\pages\1000376745\99\2111100037674501\components\activityEnd.vue
-->
<template>
  <div class='box ruleBox'>
    <van-popup v-model:show='showPopUp'>
      <div class='content'>
        <img src='../assets/end.png' />
        <div class='ruleTitle' v-html='title'></div>
        <div class='goShopTip'>进入店铺，进入店铺解锁更多福利</div>
        <!-- 进入店铺按钮 -->
        <div class='goShop' @click='goShop' v-insertCrm="'店铺首页'">
          <img src='../assets/shop.png' alt='' srcset='' />
          进入店铺
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script lang='ts' setup>
import { Popup as VanPopup } from 'vant';
import {
  ref, defineProps, defineEmits, computed, inject,
} from 'vue';
import { BaseInfo } from '@/types/BaseInfo';

const title = '抱歉</br>活动已经结束了';
const props = defineProps({
  isShowPopUp: {
    type: Boolean,
    default: () => false,
  },
});
const showPopUp = computed(() => props.isShowPopUp);
const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
const goShop = () => {
  window.location.href = `https://shop.m.jd.com/?shopId=${baseInfo.venderId}`;
};
</script>
<style lang='scss' scoped>
.content {
  padding: 0;
}

.ruleTitle {
  position: absolute;
  top: 2.1rem;
  font-weight: 500;
  width: 100%;
  font-size: 0.4rem;
  text-align: center;
}

.clooseBtn {
  top: 5.5rem;
}

.goShopTip {
  font-size: 0.32rem;
  position: absolute;
  top: 4rem;
  width: 100%;
  text-align: center;
}

.goShop {
  //position: absolute;
  top: 5.15rem;
  left: 50%;
  transform: translateX(-50%);
  border-bottom: 0;
  background: #020d29;
  line-height: 0.76rem;
  font-weight: bold;
  color: #fff;
  width: 3rem;
  text-align: center;
  border-radius: 0.5rem;
  font-size: 0.32rem;
  padding-bottom: 0;
  letter-spacing: 0.15em;

  img {
    height: 0.34rem;
    width: auto;
    display: inline-block;
    vertical-align: middle;
    margin-top: -0.03rem;
  }
}
</style>
