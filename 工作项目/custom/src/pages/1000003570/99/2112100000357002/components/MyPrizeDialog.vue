<template>
  <!-- 我的奖品弹窗 -->
  <div class="box">
    <div class="title">
      <div>奖品</div>
    </div>
    <div class="info">
      <div v-if="myPrizeArr.length>0" style="text-align: center">
        <template v-for="(item) in myPrizeArr" :key="item.id">
          <div class="prize-view">
            <img :src="item.showImage" style="width: 1rem"/>
            <div>
              <div class="prize-name">{{ item.name }}</div>
              <div class="prize-time">{{ item.createTime }}</div>
            </div>
          </div>
        </template>
        <img @click="openDialog()" src="../assets/dialog/btn-save-address.png"
             style="width: 5.71rem;margin-top: .3rem"/>
      </div>

      <div v-else class="none-data">暂无奖品记录哦~</div>
    </div>
    <div class="close-btn" @click="closeDialog"></div>
  </div>
</template>

<script lang='ts' setup>
import { defineEmits, defineProps, ref } from 'vue';

const props = defineProps({ myPrizeArr: Array });
const emit = defineEmits(['closeDialog', 'openBottomDialog']);

const closeDialog = () => {
  emit('closeDialog');
};

// 打开填写地址弹窗
const openDialog = () => {
  emit('closeDialog');
  setTimeout(() => {
    emit('openBottomDialog', 'address');
  }, 300);
};

// 获取时间格式
const add0 = (m: number) => (m < 10 ? `0${m}` : m);
const getDateFormat = (date: string) => {
  const time = new Date(date);
  const y = time.getFullYear();
  const m = time.getMonth() + 1;
  const d = time.getDate();
  const h = time.getHours();
  const mm = time.getMinutes();
  const s = time.getSeconds();
  return `${y}.${add0(m)}.${add0(d)} ${add0(h)}:${add0(mm)}:${add0(s)}`;
};

</script>

<style lang='scss' scoped>
.box {
  position: fixed;
  width: 7.5rem;
  height: 11.02rem;
  box-sizing: border-box;
  bottom: 0;
  background: {
    image: url("../assets/dialog/dialog-prize.png");
    repeat: no-repeat;
    size: contain;
  };

  .title {
    margin-top: 3.5rem;
    padding: .1rem .9rem;
    box-sizing: border-box;
    color: #dd5344;
    font-size: .3rem;
  }

  .info {
    height: 6.8rem;
    overflow-y: auto;

    .prize-view {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      background-color: #FFFFFF;
      padding: .18rem .35rem;
      margin: 0.1rem .3rem;
      border-radius: .1rem;
      align-items: center;

      .prize-name {
        width: 4.5rem;
        height: .7rem;
        text-align: left;
        font-size: .27rem;
        font-weight: 540;
        color: #dd5344;
        font-family: PingFang-SC-Bold;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .prize-time {
        width: 4.5rem;
        text-align: left;
        font-size: .22rem;
        color: #8c8c8c;
        font-family: PingFang-SC-Medium;
      }
    }

    .none-data {
      line-height: 1.3rem;
      height: 1.3rem;
      background-color: #FFFFFF;
      font-size: .25rem;
      color: #555555;
      text-align: center;
      margin: .2rem .4rem;
      border-radius: .1rem;
    }
  }

  .close-btn {
    position: absolute;
    top: 2.6rem;
    right: .2rem;
    width: 1rem;
    height: 1rem;
    overflow: auto;
  }
}
</style>
