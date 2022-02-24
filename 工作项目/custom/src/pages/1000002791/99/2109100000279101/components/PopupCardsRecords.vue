<!--
 * @Author: 一尾流莺
 * @Description:卡片获取记录弹窗
 * @Date: 2021-09-17 10:36:06
 * @LastEditTime: 2021-09-27 16:10:32
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\components\PopupCardsRecords.vue
-->
<template>
  <div class="cards-records-popup">
    <img src="../assets/popup-cards-records.png"
         class="popup-content" />
    <div class="cards-records-content">
      <div class="content-item"
           v-for="item in myList"
           :key='item.drawTime'>
        <div class="item1">{{item.remark}}</div>
        <div class="item2">{{item.giftName}}</div>
        <div class="item3">{{item.drawTime}}</div>
        <div class="item4">{{item.giftCnt}}</div>
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

const myList = computed(() => props.recordList.map((item:any) => ({
  giftType: item.giftType === 1 ? '抽奖' : '下单',
  status: item.status === 1 ? '获得' : '使用',
  drawTime: dayjs(item.drawTime).format('MM-DD HH:mm:ss'),
  giftCnt: item.status === 1 ? '+1' : '-1',
  giftName: item.giftName,
  remark: item.remark,
})));

// 关闭弹窗
const closePopup = () => {
  emit('closePopup');
};
</script>

<style lang='scss'>
.cards-records-popup {
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
  .cards-records-content {
    width: 6.5rem;
    height: 4.5rem;
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
      }

      .item1 {
        width: 25%;
      }
      .item2 {
        width: 22%;
      }
      .item3 {
        width: 40%;
      }
      .item4 {
        width: 13%;
      }
    }
  }
}
</style>
