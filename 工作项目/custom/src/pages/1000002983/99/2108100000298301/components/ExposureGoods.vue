<!--
 * @Author: 一尾流莺
 * @Description:曝光商品组件
 * @Date: 2021-08-27 14:10:35
 * @LastEditTime: 2021-09-29 09:29:53
 * @FilePath: \custom\src\pages\1000002983\99\2108100000298301\components\ExposureGoods.vue
-->
<template>
  <!-- 曝光商品 -->
  <div class="skus"
       :style="optins.skusOptins">
    <!-- 曝光商品列表 -->
    <div class="sku-list">
      <!-- 单个曝光商品 -->
      <div class="sku-item"
           :style="optins.skuItemOptions"
           v-for="item in skusList"
           @click="go2Good(item.skuId)"
           :key="item.id">
        <!-- 商品图片 -->
        <img class="good-photo"
             :src="imgUrl(item.logo)"
             alt />
        <!-- 商品名称 -->
        <div class="good-name">{{ item.skuName }}</div>
        <!-- 商品价格 -->
        <div class="good-prize">
          <span class="good-prize-icon">￥</span>
          <span class="good-prize-text">{{ item.jdPrice.split(".")[0] }}</span>
        </div>
      </div>
    </div>
    <!-- 进店逛逛按钮 -->
    <div @click="go2Shop"
         :style="optins.goToshopOptions"
         class="go-to-shop"></div>
  </div>
</template>

<script setup lang='ts'>

import { defineProps, defineEmits, PropType } from 'vue';

const emit = defineEmits(['go2Shop']);

const props = defineProps({
  baseUrl: String,
  skusList: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  optins: {
    type: Object,
    default: () => ({}),
  },
});
// 跳转至商品详情页
const go2Good = (id: number) => {
  window.location.href = `https://wq.jd.com/item/view?sku=${id}`;
};
const go2Shop = () => {
  emit('go2Shop');
};
const imgUrl = (url:string) => {
  if (url.indexOf('http') > -1) {
    return url;
  }
  return props.baseUrl + url;
};

</script>

<style lang="scss" >
.skus {
  position: absolute;
  .sku-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .sku-item {
      border-radius: 0.1rem;
      margin-left: 0.15rem;

      .good-photo {
        border: 0;
        max-width: 100%;
      }
      .good-name {
        width: 3rem;
        line-height: 0.4rem;
        height: 0.8rem;
        overflow-y: hidden;
        margin: 0.05rem auto;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        line-clamp: 2;
        font-size: 0.2rem;
      }
      .good-prize {
        background: url(//img10.360buyimg.com/imgzone/jfs/t1/155744/38/1221/2766/5fe03334E77884f92/d5e7632920cb64fb.png)
          no-repeat;
        background-size: 100%;
        width: 2.2rem;
        height: 0.63rem;
        margin: 0.15rem auto;
        height: 0.63rem;
        line-height: 0.43rem;
        color: rgb(209, 29, 34);

        .good-prize-icon {
          font-size: 0.2rem;
          padding-left: 0.1rem;
        }
        .good-prize-text {
          font-weight: bold;
          font-size: 0.3rem;
        }
      }
    }
  }
  .go-to-shop {
    margin: 0.5rem auto;
    background-repeat: no-repeat;
    background-size: 100%;
  }
}
</style>
