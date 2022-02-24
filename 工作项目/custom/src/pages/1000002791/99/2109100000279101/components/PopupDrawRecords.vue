<!--
 * @Author: 一尾流莺
 * @Description:抽奖记录弹窗
 * @Date: 2021-09-17 10:36:06
 * @LastEditTime: 2021-09-27 16:08:59
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\components\PopupDrawRecords.vue
-->
<template>
  <div class="draw-records-popup">
    <img src="../assets/popup-draw-records.png"
         class="popup-content" />
    <div class="draw-records-content">
      <div class="content-item"
           v-for="item in myList"
           :key="item.drawTime">
        <div class="item1">{{ item.giftType }}</div>
        <div class="item3">{{ item.drawTime }}</div>
        <div class="item4">{{ item.giftName }}</div>
        <div class="item2">{{ item.status }}</div>
      </div>
    </div>
    <div class="close-icon"
         @click="closePopup"></div>
  </div>
</template>

<script lang='ts' setup>
import { defineProps, defineEmits, computed } from 'vue';
import dayjs from 'dayjs';

const emit = defineEmits(['closePopup']);
const props = defineProps({
  recordList: {
    type: Array as any,
    default: () => ([]),
  },
});

const myList = computed(() => props.recordList.map((item: any) => ({
  giftType: item.giftType === 3 ? '抽奖' : '兑换',
  status: item.status === 1 ? '是' : '否',
  drawTime: dayjs(item.drawTime).format('MM-DD HH:mm:ss'),
  giftName: item.giftName,
})));

// 关闭弹窗
const closePopup = () => {
  emit('closePopup');
};
</script>

<style lang='scss'>
.draw-records-popup {
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
  .draw-records-content {
    width: 6.5rem;
    height: 2.5rem;
    position: absolute;
    left: 50%;
    top: 2.8rem;
    transform: translate(-50%);
    overflow: auto;
    color: #000000;
    font-size: 0.28rem;

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
        font-size: 0.20rem;
      }

      .item1 {
        width: 20%;
      }
      .item2 {
        width: 15%;
      }
      .item3 {
        width: 35%;
      }
      .item4 {
        width: 35%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
