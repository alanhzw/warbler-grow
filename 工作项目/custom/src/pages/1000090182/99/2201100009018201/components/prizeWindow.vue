<template>
  <div class="close-btn" @click="closeDialog()"></div>
  <div class="prize-view">
    <div class="prizeView-area">
      <div v-if="myPrize.length > 0" class="prize-item">
        <div>{{myPrize[0].exchangeTime}}</div>
        <div class="prize-item-id">{{myPrize[0].giftName}}</div>
<!--        <div v-for="(item,index) in myPrize" :key="index" class="prize-item">-->
<!--          <div>{{getDateFormat(item.createTime)}}</div>-->
<!--          <div>{{item.giftName}}</div>-->
<!--          <div v-if="item.giftType === 7" class="fix-btn" @click="toFix(item.addressId)"></div>-->
<!--          <div v-else>已领取</div>-->
<!--        </div>-->
      </div>
      <div v-else class="no-prize">
        <div style="margin-top: 1rem;opacity: .4;">暂无领取记录</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  myPrize: Array,
  default: () => [],
});
const emit = defineEmits(['closeWin']);
const closeDialog = () => {
  emit('closeWin');
};
// const toFix = (addressId) => {
//   emit('openFix', addressId);
// };

// 时间戳
// const add0 = (num: number) => (num < 10 ? `0${num}` : num);
// const getDateFormat = (date: number) => {
//   const time = new Date(date);
//   const y = time.getFullYear();
//   const m = time.getMonth() + 1;
//   const d = time.getDate();
//   const h = time.getHours();
//   const mm = time.getMinutes();
//   const s = time.getSeconds();
//   return `${y}-${add0(m)}-${add0(d)} ${add0(h)}:${add0(mm)}`;
// };
</script>

<style lang='scss'>
.prize-view{
  width: 5.15rem;
  height: 3.83rem;
  position: relative;
  background: url("../assets/order-view.png") no-repeat;
  background-size: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

.prizeView-area{
  height: 100%;
  width: 87%;
  overflow: scroll;
  font-size: 0.23rem;
  display: flex;
  flex-direction: column;

  .prize-item{
    display: flex;
    justify-content: space-between;
    width: 94%;
    height: 100%;
    align-items: center;
    margin: 0 auto;
    font-weight: 600;

    .prize-item-id{
      width: 2.3rem;
      white-space: nowrap;
      word-break: keep-all;
      overflow-x: scroll;
      height: .3rem;
      line-height: .3rem;
      text-align: end;
    }
  }
  //.prize-item{
  //  display: flex;
  //  justify-content: flex-start;
  //  margin-bottom: 0.1rem;
  //  width: 100%;
  //  height: 0.4rem;
  //  align-items: center;
  //
  //  :nth-child(1){
  //    width: 2rem;
  //    overflow: hidden;
  //    text-overflow:ellipsis;
  //    white-space: nowrap;
  //    //word-break: break-all;
  //    //overflow:hidden;
  //    //text-overflow: ellipsis;
  //    //display:-webkit-box;
  //    //-webkit-line-clamp:1;
  //    //-webkit-box-orient:vertical;
  //    //height: .35rem;
  //  }
  //  :nth-child(2){
  //    width: 1.75rem;
  //    overflow: hidden;
  //    text-overflow:ellipsis;
  //    white-space: nowrap;
  //    //word-break: break-all;
  //    //overflow:hidden;
  //    //text-overflow: ellipsis;
  //    //display:-webkit-box;
  //    //-webkit-line-clamp:1;
  //    //-webkit-box-orient:vertical;
  //    //height: .35rem;
  //  }
  //  .fix-btn{
  //    background: url("//img10.360buyimg.com/imgzone/jfs/t1/162461/15/27828/11157/61aec2d5Eb4e1db76/e9f7c1b5f3ee692c.png") no-repeat;
  //    background-size: 100%;
  //    width: 1.2rem;
  //    height: .4rem;
  //  }
  //}
  .no-prize{
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    font-size: 0.25rem;
  }
}
}
.close-btn{
  width: 0.75rem;
  height: 0.75rem;
  position: absolute;
  top: 1rem;
  right: 0.3rem;
  background: url('../assets/closeBtn.png') no-repeat;
  background-size: 100%;
  z-index: 9999;
}
</style>
