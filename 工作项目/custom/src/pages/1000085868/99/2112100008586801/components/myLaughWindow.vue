<template>
  <div class="laugh-view">
    <div class="laughView-area">
      <div v-if="myLaugh.length > 0">
        <div v-for="(item,index) in myLaugh" :key="index" class="laugh-item">
          <div>{{getDateFormat(item.createTime)}}</div>
          <div>{{item.taskName}}</div>
          <div>{{ item.value }}</div>
        </div>
      </div>
      <div v-else class="no-laugh">
        <div>暂无领取记录</div>
      </div>
    </div>
    <div class="close-btn" @click="closeDialog()"></div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  myLaugh: Array,
  default: () => [],
});
const emit = defineEmits(['closeLaugh']);
const closeDialog = () => {
  emit('closeLaugh', 'laughDialog');
};

// 时间戳
const add0 = (num: number) => (num < 10 ? `0${num}` : num);
const getDateFormat = (date: number) => {
  // console.log(date.substring(0, date.length - 2));
  const time = new Date(date.substring(0, date.length - 2).replace(/-/g, '/'));
  const y = time.getFullYear();
  const m = time.getMonth() + 1;
  const d = time.getDate();
  const h = time.getHours();
  const mm = time.getMinutes();
  const s = time.getSeconds();
  return `${y}-${add0(m)}-${add0(d)} ${add0(h)}:${add0(mm)}`;
};
</script>

<style lang='scss'>
.laugh-view{
  width: 5.8rem;
  height: 7.93rem;
  position: relative;
  background: url("//img10.360buyimg.com/imgzone/jfs/t1/206551/35/11680/67302/61add135E982281a2/915099237b493cd5.png") no-repeat;
  background-size: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .laughView-area{
    height: 3.5rem;
    width: 87%;
    overflow: scroll;
    color: #FFFFFF;
    font-size: 0.23rem;
    display: flex;
    flex-direction: column;
    margin-top: 2rem;

    .laugh-item{
      display: flex;
      justify-content: flex-start;
      align-items: center;

      :nth-child(1){
        width: 2.1rem;
        word-break: break-all;
        overflow:hidden;
        text-overflow: ellipsis;
        display:-webkit-box;
        -webkit-line-clamp:1;
        -webkit-box-orient:vertical;
      }
      :nth-child(2){
        width: 2.1rem;
        word-break: break-all;
        overflow:hidden;
        text-overflow: ellipsis;
        display:-webkit-box;
        -webkit-line-clamp:1;
        -webkit-box-orient:vertical;
      }
    }
    .no-laugh{
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
      font-size: .25rem;
    }
  }
  .close-btn{
    width: 0.42rem;
    height: 0.42rem;
    position: absolute;
    bottom: 0;
    background: url("../assets/closeBtn.png") no-repeat;
    background-size: 100%;
  }
}
</style>
