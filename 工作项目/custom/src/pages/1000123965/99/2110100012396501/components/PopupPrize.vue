<!--
 * @Author: 一尾流莺
 * @Description:我的奖品弹窗
 * @Date: 2021-09-17 10:36:06
 * @LastEditTime: 2021-10-12 17:51:26
 * @FilePath: \custom\src\pages\1000123965\99\2110100012396501\components\PopupPrize.vue
-->
<template>
  <div class="prize-popup">
    <img src="../assets/popup-prize.png"
         class="popup-content" />
    <div class="prize-content">
      <div class="item"
           v-for="item in prizeList"
           :key="item.id">
        <img class="icon"
             :src="item.showImage" />
        <p class="name">{{ item.giftName }}</p>
        <p class="time">{{ dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss') }}</p>
        <div class="address"
             @click='address(item)'>填写地址</div>
      </div>
      <div class="non-more">没有更多了...</div>
    </div>
    <div class="close-icon"
         @click="closePopup"></div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, PropType } from 'vue';
import dayjs from 'dayjs';
import useGetAddress from '../apis/useGetAddress';
import useBaseInfo from '../hooks/useBaseInfo';
// 获取基本信息
const { baseInfo } = useBaseInfo();
// 获取回显地址api
const { getAddress, addressInfo } = useGetAddress(baseInfo);
const emit = defineEmits(['closePopup', 'openAddAddressPopup', 'openSeeAddressPopup', 'changeGiftId', 'changeInitAddress']);

const props = defineProps({
  prizeList: {
    type: Array as PropType<Array<any>>,
    default: () => [],
  },
  giftId: {
    type: String,
    default: () => (''),
  },
});

// 查看or填写地址
const address = async (item:any) => {
  await emit('changeGiftId', item.giftId);
  await getAddress(item.giftId);
  emit('changeInitAddress', addressInfo.value);
  emit('openAddAddressPopup');
};

// 关闭弹窗
const closePopup = () => {
  emit('closePopup');
};
</script>

<style lang="scss">
.prize-popup {
  position: relative;
  .popup-content {
    width: 6.8rem;
  }
  .close-icon {
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: 0rem;
    right: 0rem;
  }
  .prize-content {
    width: 6rem;
    height: 6.2rem;
    position: absolute;
    left: 50%;
    top: 1.3rem;
    transform: translate(-50%);
    overflow: auto;
    color: #000000;
    font-size: 0.28rem;
    .item {
      width: 100%;
      height: 1.5rem;
      background: #fff6ee;
      margin: 0.2rem 0;
      position: relative;
      .icon {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0.2rem;
        background: #ffffff;
      }
      .name {
        position: absolute;
        top: 0rem;
        left: 1.3rem;
        font-size: 0.32rem;
        color: #ff9900;
        width: 2.6rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .time {
        position: absolute;
        top: 0.65rem;
        left: 1.3rem;
        font-size: 0.25rem;
        color: #666666;
        width: 2.6rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .address {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0.3rem;
        color: #ffffff;
        background-color: #e2231a;
        border-radius: 30px;
        padding: 0.1rem 0.2rem;
      }
    }
    .non-more {
      width: 100%;
      text-align: center;
      font-size: 0.28rem;
      color: #666666;
    }
  }
}
</style>
