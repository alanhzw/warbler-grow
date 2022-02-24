<!--
 * @Author: 一尾流莺
 * @Description:我的奖品弹窗
 * @Date: 2021-09-02 14:19:26
 * @LastEditTime: 2021-09-06 21:26:33
 * @FilePath: \custom\src\pages\1000001195\99\2109100000119502\components\PopupMyPrize.vue
-->
<template>
  <van-popup v-model:show="myVisible"
             get-container="#app">
    <div class="my-prize-box">
      <img src="../assets/popup-my-prize.png"
           class="popup-content" />
      <div class="my-prize"
           v-if="myPrizeList.length > 0">
        <div class="my-prize-item">
          <div class="flex-content weight">时间</div>
          <div class="flex-content weight">奖品</div>
          <div class="flex-content weight">领取</div>
        </div>
        <div class="my-prize-item"
             v-for="(item) in myPrizeList"
             :key="item.name">
          <div class="flex-content">{{ item.prizeTime }}</div>
          <div class="flex-content">{{ item.name }}</div>
          <div class="flex-content"
               @click='addAddress(item)'>{{ item.status }}</div>
        </div>
      </div>
      <div v-else
           class="no-prize">暂无奖品</div>
      <div class="close-icon"
           @click="closePopup"></div>
    </div>
  </van-popup>
</template>

<script lang='ts' setup>
import {
  Popup as VanPopup,
} from 'vant';
import {
  defineProps, defineEmits, PropType, computed,
} from 'vue';
import useAddAddress from '../hooks/useAddAddress';

const emit = defineEmits(['closePopup', 'openAddAddressPopup']);
const props = defineProps({
  visible: {
    type: Boolean,
    default: () => (false),
  },
  baseInfo: {
    type: Object,
    default: () => ({}),
  },
  prizeList: {
    type: Array as PropType<any[]>,
    default: () => [
      {
        drawTime: '2021-01-05 11:11:12',
        name: '双肩包',
        addressId: '12321',
      },
      {
        drawTime: '2021-01-05 11:11:12',
        name: '满50-20',
        addressId: '',
      },
      {
        drawTime: '2021-01-05 11:11:12',
        name: '20京豆',
        addressId: '',
      },
    ],
  },
});
const myPrizeList = computed(() => props.prizeList.map((item) => ({
  ...item,
  status: item.addressId ? '填写/查看地址' : '已自动到账',
  prizeTime: item.drawTime.slice(0, 10),
})));
const myVisible = computed(() => props.visible);

// 关闭弹窗
const closePopup = () => {
  emit('closePopup');
};

const {
  checkAddress,
} = useAddAddress();
// 添加/查看地址
const addAddress = async (prize:any) => {
  if (prize.addressId) {
    const res = await checkAddress(props.baseInfo, prize.addressId);
    if (res.result) {
      if (res.data.phone) {
        emit('openAddAddressPopup', res.data, false);
      } else {
        emit('openAddAddressPopup', {}, true);
      }
    }
  }
};
</script>

<style lang='scss'>
.my-prize-box {
  position: relative;
  .popup-content {
    width: 6.5rem;
  }
  .close-icon {
    width: 1rem;
    height: 1rem;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%);
  }
  .my-prize {
    width: 92%;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    top: 1.6rem;

    .my-prize-item {
      width: 100%;
      display: flex;
      justify-content: space-around;
      color: #fff;
      border-top: 1px dashed #fff;
      font-size: 0.28rem;
      line-height: 0.6rem;
    }
  }
  .no-prize {
    color: #fff;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    top: 1.6rem;
  }
  .flex-content{
    width: 33%;
    text-align: center;
  }
  .weight{
    font-weight: 700;
  }
}

</style>
