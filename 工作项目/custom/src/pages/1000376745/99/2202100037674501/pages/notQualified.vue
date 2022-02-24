/**
 * @Description:caoshijie
 * @Date: 2022/1/17
 * @Description: 雅诗兰黛复购礼 2月
 * @FilePath:src\pages\1000376745\99\2202100037674501\pages\notQualified.vue
*/
<template>
  <div class='box'>
    <img class='bgImg' src='../assets/notQualifiedBg.png' />
    <div class='til'>复购有礼</div>
    <div class='til sor'>抱歉</div>
    <div class='til sorTip'>您暂时无法参加活动~</div>
    <div class='til reason'>可能因为您未在本店购买过正装产品</div>
    <!-- 进入店铺按钮 -->
    <div class='goShop' @click='gotoShopPage(baseInfo.venderId);' v-insertCrm="'店铺首页'">
      <img src='../assets/shop.png' />
      进入店铺
    </div>
    <!-- 活动规则 -->
    <div class='goShop ruleBtn' @click='isShowPopUp = true'>
      <img src='../assets/rule.png' alt srcset />
      活动规则
    </div>
    <!-- 商品列表 -->
    <sku-list class='skuList'></sku-list>
    <!-- 规则弹窗 -->
    <rule :isShowPopUp='isShowPopUp' @close-popup='isShowPopUp = false'></rule>
  </div>
</template>
<script lang='ts' setup>
import {
  ref, inject, provide, onMounted,
} from 'vue';
import { gotoShopPage } from '@/utils/platforms';
import { BaseInfo } from '@/types/BaseInfo';
import skuList from '../components/skuList.vue';
import Rule from '../components/rule.vue';

const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
const isShowPopUp = ref(false);
</script>
<style lang='scss' scoped>
.box {
  position: relative;

  .bgImg {
    width: 100%;
    display: block;
  }

  .til {
    position: absolute;
    top: 1.2rem;
    font-size: 0.52rem;
    text-align: center;
    width: 100%;
    font-weight: 600;
  }

  .sor {
    top: 3.5rem;
    font-size: 0.38rem;
  }

  .sorTip {
    top: 4rem;
    font-size: 0.38rem;
  }

  .reason {
    top: 4.55rem;
    font-size: 0.32rem;
  }

  .goShop {
    position: absolute;
    top: 7.15rem;
    left: 0.55rem;
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
    margin-left: 0;
    transform: translateX(0);

    img {
      height: 0.34rem;
      vertical-align: middle;
      margin-top: -0.01rem;
    }
  }

  .ruleBtn {
    left: 3.95rem;
  }

  .skuList {
    position: absolute;
    top: 8.5rem;
  }
}
</style>
