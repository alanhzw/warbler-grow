/**
* @Description:caoshijie
* @Date: 2021/10/11
* @Description: 曝光商品展示组件
* @FilePath:src\pages\1000376431\99\2110100037643102\components\ExposureGoods.vue
*/
<template>
  <!-- 曝光商品 -->
  <div class='skus'>
    <!-- 曝光商品列表 -->
    <div class='sku-list'>
      <!-- 单个曝光商品 -->
      <div class='sku-item'
           v-for='item in skusList'
           :key='item.id'>
        <div @click='gotoSkuPage(item.skuId)'>
          <!-- 商品图片 -->
          <img class='good-photo'
               :src='`${baseUrl}${item.logo}`'
               alt />
          <!-- 商品名称 -->
          <div class='good-name'>{{ item.skuName }}</div>
        </div>
        <!-- 商品价格 -->
        <div class='good-prize' @click='addCar(item.skuId)'>
          <span class='good-prize-icon'>￥</span>
          <span class='good-prize-text'>{{ item.jdPrice.split('.')[0] }}</span>
        </div>
      </div>
    </div>
    <!-- 进店逛逛按钮 -->
    <div @click='go2Shop'
         class='go-to-shop'>进店浏览更多&nbsp;&nbsp;&gt;&nbsp;&gt;
    </div>
  </div>
</template>

<script setup lang='ts'>
import {
  defineProps, defineEmits, PropType, inject,
} from 'vue';
import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
import { gotoSkuPage } from '@/utils/platforms';

const emit = defineEmits(['go2Shop']);
const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
const props = defineProps({
  baseUrl: String,
  skusList: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
});
const go2Shop = () => {
  emit('go2Shop');
};
const addCar = async (id: string) => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    overlay: true,
    duration: 0,
  });
  const res = await cjwxRequest
    .post('/common/pointRedeem/addCart', {
      type: baseInfo.activityType,
      activityId: baseInfo.activityId,
      skuId: id,
    });
  Toast.clear();

  if (res.result) {
    Toast('加购成功');
  } else {
    Toast(res.errorMessage);
  }
};
</script>

<style lang='scss'>
.skus {
  width: 7.5rem;
  top: 5rem;
  position: absolute;

  .sku-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background: #fff;
    padding-bottom: .2rem;
    box-sizing: border-box;

    .sku-item {
      height: 5.1rem;
      width: 3.5rem;
      border-radius: 0.1rem;
      margin-top: .2rem;
      background: #f0f0f0;
      padding: .1rem;
      box-sizing: border-box;

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
        background: url(//img10.360buyimg.com/imgzone/jfs/t1/155744/38/1221/2766/5fe03334E77884f92/d5e7632920cb64fb.png) no-repeat;
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
    width: 5.78rem;
    line-height: 0.67rem;
    background-color: #000000;
    border-radius: 0.1rem;
    color: #fff;
    text-align: center;
    font-size: .33rem;
  }
}
</style>
