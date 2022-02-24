<!--
 * @Author: 一尾流莺
 * @Description:页面组件
 * @Date: 2021-08-27 15:35:43
 * @LastEditTime: 2021-11-12 17:23:16
 * @FilePath: \custom\src\pages\1000002520\99\2109100000252001\pages\PageInfo.vue
-->
<template>
  <div class="page-box-new"
       v-if="isScheduled(changeTime)"
       :style="options.styleOption">
    <div class="return-home"
         @click="returnHome"></div>
    <div class="part-one-new">
      <div class="top"
           @click="handler(options.linkOptions.partOne.coupon0)"></div>
      <div class="block">
        <div class="left"
             @click="handler(options.linkOptions.partOne.coupon1)"></div>
        <div class="right"
             @click="gotoSkuPage(options.linkOptions.partOne.goods1)"></div>
      </div>
      <div class="block">
        <div class="left"
             @click="handler(options.linkOptions.partOne.coupon2)"></div>
        <div class="right"
             @click="gotoSkuPage(options.linkOptions.partOne.goods2)"></div>
      </div>
      <div class="block">
        <div class="left"
             @click="handler(options.linkOptions.partOne.coupon3)"></div>
        <div class="right"
             @click="gotoSkuPage(options.linkOptions.partOne.goods3)"></div>
      </div>
    </div>
    <div class="part-two-new">
      <div class="top"
           @click="getCoupon(options.linkOptions.partTwo.coupon1)"></div>
      <div class="bottom">
        <div class="item"
             @click="gotoSkuPage(options.linkOptions.partTwo.goods1)"></div>
        <div class="item"
             @click="gotoSkuPage(options.linkOptions.partTwo.goods2)"></div>
        <div class="item"
             @click="gotoSkuPage(options.linkOptions.partTwo.goods3)"></div>
        <div class="item"
             @click="gotoSkuPage(options.linkOptions.partTwo.goods4)"></div>
        <div class="item"
             @click="gotoSkuPage(options.linkOptions.partTwo.goods5)"></div>
        <div class="item"
             @click="gotoSkuPage(options.linkOptions.partTwo.goods6)"></div>
      </div>
    </div>
  </div>

  <div class="page-box-old"
       v-else
       :style="options.styleOption">
    <div class="return-home"
         @click="returnHome"></div>
    <div class="part-one">
      <div class="block">
        <div class="left"
             @click="getCoupon(options.linkOptions.partOne.coupon1)"></div>
        <div class="right"
             @click="gotoSkuPage(options.linkOptions.partOne.goods1)"></div>
      </div>
      <div class="block">
        <div class="left"
             @click="getCoupon(options.linkOptions.partOne.coupon2)"></div>
        <div class="right"
             @click="gotoSkuPage(options.linkOptions.partOne.goods2)"></div>
      </div>
      <div class="block">
        <div class="left"
             @click="getCoupon(options.linkOptions.partOne.coupon3)"></div>
        <div class="right"
             @click="gotoSkuPage(options.linkOptions.partOne.goods3)"></div>
      </div>
    </div>
    <div class="part-two">
      <div class="top"
           @click="getCoupon(options.linkOptions.partTwo.coupon1)"></div>
      <div class="bottom">
        <div class="item"
             @click="gotoSkuPage(options.linkOptions.partTwo.goods1)"></div>
        <div class="item"
             @click="gotoSkuPage(options.linkOptions.partTwo.goods2)"></div>
        <div class="item"
             @click="gotoSkuPage(options.linkOptions.partTwo.goods3)"></div>
        <div class="item"
             @click="gotoSkuPage(options.linkOptions.partTwo.goods4)"></div>
        <div class="item"
             @click="gotoSkuPage(options.linkOptions.partTwo.goods5)"></div>
        <div class="item"
             @click="gotoSkuPage(options.linkOptions.partTwo.goods6)"></div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { defineProps, defineEmits, onMounted } from 'vue';
import { gotoSkuPage, isScheduled } from '../hooks/useMethods';
import useGetCoupon from '../apis/useGetCoupon';
import useBaseInfo from '../hooks/useBaseInfo';
import { changeTime } from '../config/time';
import useClick from '../apis/useClick';

const { baseInfo } = useBaseInfo();
// 点击埋点
const { hanlderClick } = useClick(baseInfo);

const { getCoupon } = useGetCoupon(baseInfo);
const emit = defineEmits(['changePageType']);

const props = defineProps({
  options: {
    type: Object,
    default: () => ({}),
  },
});

// 领券还是商品详情页
const handler = (id:any) => {
  if (props.options.pageName === 'bozhen') {
    getCoupon(id);
  } else {
    gotoSkuPage(id);
  }
};

const returnHome = () => {
  emit('changePageType', 'home');
};

onMounted(() => {
  hanlderClick(props.options.pageName);
});

</script>

<style lang='scss'>
.page-box-old {
  width: 7.5rem;
  background-repeat: no-repeat;
  background-size: 100%;
  position: relative;
  .return-home {
    position: absolute;
    top: 0;
    left: 0;
    width: 1.5rem;
    height: 0.8rem;
  }
  .part-one {
    position: absolute;
    top: 9.6rem;
    left: 50%;
    transform: translate(-50%);
    width: 7.5rem;
    height: 6.4rem;
    .block {
      width: 100%;
      height: 2.13rem;
      display: flex;
      justify-content: flex-start;
      flex-wrap: nowrap;
      .left {
        width: 55%;
        height: 100%;
      }
      .right {
        width: 45%;
        height: 100%;
      }
    }
  }
  .part-two {
    position: absolute;
    top: 17rem;
    left: 50%;
    transform: translate(-50%);
    width: 7rem;
    height: 5.2rem;
    .top {
      width: 100%;
      height: 25%;
    }
    .bottom {
      width: 100%;
      height: 75%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .item {
        width: 33%;
        height: 50%;
      }
    }
  }
}
.page-box-new {
  width: 7.5rem;
  background-repeat: no-repeat;
  background-size: 100%;
  position: relative;
  .return-home {
    position: absolute;
    top: 0;
    left: 0;
    width: 1.5rem;
    height: 0.8rem;
  }
  .part-one-new {
    position: absolute;
    top: 9.6rem;
    left: 50%;
    transform: translate(-50%);
    width: 7.5rem;
    height: 6.4rem;
    .top {
      width: 100%;
      height: 1.5rem;
    }
    .block {
      width: 100%;
      height: 1.5rem;
      display: flex;
      justify-content: flex-start;
      flex-wrap: nowrap;
      .left {
        width: 55%;
        height: 100%;
      }
      .right {
        width: 45%;
        height: 100%;
      }
    }
  }
  .part-two-new {
    position: absolute;
    top: 16.5rem;
    left: 50%;
    transform: translate(-50%);
    width: 7rem;
    height: 5.2rem;
    .top {
      width: 100%;
      height: 25%;
    }
    .bottom {
      width: 100%;
      height: 75%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .item {
        width: 33%;
        height: 50%;
      }
    }
  }
}
</style>
