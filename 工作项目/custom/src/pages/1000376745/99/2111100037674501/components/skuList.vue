<!--
 * @Author: caoshijie
 * @Date: 2021-09-23 17:08:41
 * @LastEditTime: 2021-09-30 13:39:25
 * @LastEditors: caoshijie
 * @Description: 商品列表
 * @FilePath: \custom\src\pages\1000376745\99\2111100037674501\components\skuList.vue
-->
<template>
  <div class='listBox'>
    <div class='list' v-for='item in skuList' :key='item.id'>
      <div class='skuInfo'>
        <div @click='gotoSkuPage(item.skuId)' v-insertCrm='item.skuId'>
          <img class='skuImg' :src='formatUrl(item.logo)' />
          <div class='skuName'>{{ item.skuName }}</div>
        </div>
        <div class='price'>
          <span style='font-size: 0.3rem'>￥</span>{{ item.jdPrice }}
          <div class='addShopCar' @click='addCar(item.skuId)'>
            <icon name='shopping-cart-o' size='0.24rem' />
          </div>
        </div>
      </div>
      <div class='btn' @click='addCar(item.skuId)'> 立即加购</div>
    </div>
    <div v-if='isShowBtn'>
      <!-- 进入店铺按钮 -->
      <div class='goShop' @click='gotoShopPage(baseInfo.shopId)' v-insertCrm="'店铺首页'">
        <img src='../assets/shop.png' />
        进入店铺
      </div>
      <div class='skuTipInfo'>
        IV 为产品昵称，产品注册名为雅诗兰黛特润修护精华眼霜，国妆备进字J20186020.
        <!--        Ⅳ为产品昵称，产品注册名为雅诗兰黛持妆粉底液SPF 10/PA++-->
        <!--        Ⅸ为产品昵称，产品注册名为雅诗兰黛樱花微精华露-->
      </div>
    </div>
  </div>
</template>
<script lang='ts' setup>
import {
  inject, defineProps, computed, reactive, onMounted,
} from 'vue';
import { Icon, Toast } from 'vant';
import { BaseInfo } from '@/types/BaseInfo';
import { cjwxRequest } from '@/utils/service';
import { gotoShopPage, gotoSkuPage } from '@/utils/platforms';

const props = defineProps({
  isShowBtn: {
    type: Boolean,
    default: () => false,
  },
});

const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
const isShowBtn = computed(() => props.isShowBtn);
const formatUrl = (url: string) => {
  if (url.indexOf('http') > -1) {
    return url;
  }
  return `http://img11.360buyimg.com/n0${url}`;
};
const addCar = async (id: string) => {
  // Toast.loading({
  //   message: '加载中...',
  //   forbidClick: true,
  //   overlay: true,
  //   duration: 0,
  // });
  const res = await cjwxRequest
    .post('/common/pointRedeem/addCart', {
      type: baseInfo.activityType,
      activityId: baseInfo.activityId,
      skuId: id,
    });
  Toast.clear();

  if (res.result) {
    Toast('加购成功。');
  } else {
    Toast(res.errorMessage);
  }
};

const skuList = inject('skuList');
</script>
<style lang='scss'>
.listBox {
  padding: 0 0.25rem;
  box-sizing: border-box;
  width: 100%;

  .list {
    display: inline-block;
    margin-right: 0.2rem;
    margin-bottom: 0.2rem;
    vertical-align: text-top;

    &:nth-child(2n) {
      margin-right: 0;
    }

    .skuInfo {
      background: #fff;
      border-radius: 0.1rem;
      padding-bottom: 0.15rem;
      box-sizing: border-box;
    }

    .skuImg {
      width: 3.4rem;
      height: 3.4rem;
      border-radius: 0.1rem 0.1rem 0 0;
    }

    .skuName {
      font-size: 0.21rem;
      width: 3.4rem;
      padding: 0 0.1rem;
      box-sizing: border-box;
      //text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      line-height: 0.35rem;
      min-height: 0.68rem;
    }

    .price {
      font-size: 0.34rem;
      color: #f00;
      padding: 0 0.1rem;
      box-sizing: border-box;

      .addShopCar {
        display: inline-block;
        width: 0.36rem;
        line-height: 0.36rem;
        text-align: center;
        float: right;
        margin-right: 0.16rem;
        border-radius: 50%;
        background: #f5f5f5;
      }
    }

    .btn {
      background: #020d29;
      line-height: 0.5rem;
      color: #fff;
      width: 2.3rem;
      margin-left: 50%;
      transform: translateX(-50%);
      margin-top: 0.2rem;
      text-align: center;
      border-radius: 0.5rem;
      font-size: 0.25rem;
    }
  }
}

.goShop {
  border-bottom: 0;
  background: #020d29;
  line-height: 0.7rem;
  font-weight: bold;
  color: #fff;
  width: 3rem;
  text-align: center;
  border-radius: 0.5rem;
  font-size: 0.32rem;
  margin-left: 50%;
  transform: translateX(-50%);
  display: inline-block;

  img {
    height: 0.32rem;
    vertical-align: middle;
    margin-top: -0.01rem;
  }
}

.skuTipInfo {
  text-align: center;
  padding: 0 0.45rem;
  box-sizing: border-box;
  font-size: 0.12rem;
  color: #020d29;
  margin: .38rem 0 .25rem 0;
  line-height: 0.2rem;
}

</style>
