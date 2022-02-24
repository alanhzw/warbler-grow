<!--
 * @Author: 一尾流莺
 * @Description:我的奖品弹窗
 * @Date: 2021-09-17 10:36:06
 * @LastEditTime: 2021-09-29 14:17:48
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\components\PopupMyPrize.vue
-->
<template>
  <div class="my-prize-popup">
    <img src="../assets/popup-my-prize.png"
         class="popup-content" />
    <div class="my-prize-content">
      <div class="content-item"
           v-for="item in myList"
           :key="item.drawTime">
        <div class="item4">{{ item.giftName }}</div>
        <div class="item3">{{ item.drawTime }}</div>
        <div class="item1">{{ item.Key }}</div>
        <div class="item2"
             @click="checkInfo(item)">查看信息</div>
      </div>
    </div>
    <div class="close-icon"
         @click="closePopup"></div>
  </div>
</template>

<script lang='ts' setup>
import { defineProps, defineEmits, computed } from 'vue';
import dayjs from 'dayjs';
import { Toast } from 'vant';
import emitter from '../hooks/mitt';
import useGetAddress from '../apis/useGetAddress';
import useBaseInfo from '../hooks/useBaseInfo';
// 获取基本信息
const { baseInfo } = useBaseInfo();
const { getAddress } = useGetAddress(baseInfo);
const emit = defineEmits([
  'closePopup',
  'open5Popup',
  'openAddInfoPopup',
  'openAddAddressPopup',
  'changeAddressId',
  'changeCdk',
  'openCdkPopup',
]);
const props = defineProps({
  recordList: {
    type: Array as any,
    default: () => ([]),
  },
});

const myList = computed(() => props.recordList.map((item: any) => ({
  ...item,
  giftType: item.giftType === 3 ? '抽奖' : '兑换',
  Key: item.giftName === '谢谢参与' ? '未中奖' : '一份',
  drawTime: dayjs(item.drawTime).format('MM-DD HH:mm:ss'),
  giftName: item.giftName,
  type: item.giftType,
})));

// 关闭弹窗
const closePopup = () => {
  emit('closePopup');
};

const checkInfo = async (item: any) => {
  // 谢谢参与
  if (item.giftName === '谢谢参与') {
    Toast.fail('很抱歉,您未中奖');
    return;
  }
  // 实物
  if (item.type === 4 && item.addressId) {
    // 没有填写过信息
    if (item.status === 2) {
      emit('changeAddressId', item.addressId);
      emit('openAddAddressPopup');
    } else {
      emit('changeAddressId', item.addressId);
      emit('openAddAddressPopup');
      const res = await getAddress(item.addressId);
      emitter.emit('change-info', res.data);
    }
    return;
  }
  // 积分
  if (item.type === 4 && !item.addressId) {
    emit('open5Popup', true);
    return;
  }
  // 红包封面
  if (item.type === 3) {
    emit('changeCdk', item.awardKey);
    // 没有填写过信息
    if (item.status === 2) {
      emit('changeAddressId', item.addressId);
      emit('openAddInfoPopup');
    } else {
      // 填写过信息
      // 打开兑换码弹窗
      emit('openCdkPopup');
    }
  }
};
</script>

<style lang='scss'>
.my-prize-popup {
  position: relative;
  .popup-content {
    width: 7.2rem;
  }
  .close-icon {
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: 0rem;
    right: 0rem;
  }
  .my-prize-content {
    width: 6.5rem;
    height: 2.5rem;
    position: absolute;
    left: 50%;
    top: 2.8rem;
    transform: translate(-50%);
    overflow: auto;
    color: #000000;
    font-size: 0.1rem;

    .content-item {
      width: 100%;
      display: flex;
      flex-wrap: nowrap;
      justify-content: flex-start;
      .item1,
      .item2,
      .item3,
      .item4 {
        text-align: center;
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 0.2rem;
      }

      .item1 {
        width: 15%;
      }
      .item2 {
        width: 20%;
      }
      .item3 {
        width: 35%;
      }
      .item4 {
        width: 30%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
