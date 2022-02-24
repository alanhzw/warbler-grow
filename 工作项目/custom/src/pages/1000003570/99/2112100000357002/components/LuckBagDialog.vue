<template>
  <!-- 福袋弹窗 -->
  <div class="box" :class="[bagSize===1?'small':'big']">
    <div class="title">
      <div>奖品信息</div>
    </div>
    <div class="info">
      <template v-for="(item) in luckbagPrizeArr" :key="item.id">
        <div class="prize-view">
          <img :src="item.showImage" style="width: 1rem"/>
          <div>
            <div class="prize-name">{{ item.name }}</div>
            <div class="prize-time">奖品价值: <span style="color: #f2270c">￥{{ item.priceInfo }}</span></div>
          </div>
<!--          <div class="win-rate">{{ item.drawChance }}</div>-->
        </div>
      </template>
    </div>
    <div class="close-btn" @click="closeDialog"></div>
  </div>
</template>

<script lang='ts' setup>
import { computed, defineEmits, defineProps, ref } from 'vue';

const props = defineProps({ luckbagPrizeArr: Array, bagSize: Number });
const emit = defineEmits(['closeDialog', 'openDialog']);

const luckbagPrizeArr = computed(() => props.luckbagPrizeArr?.filter((item: any) => (item.bagType === props.bagSize)));

const closeDialog = () => {
  emit('closeDialog');
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
.small {
  background: {
    image: url("../assets/dialog/dialog-luckbag-small.png");
    repeat: no-repeat;
    size: contain;
  };
}

.big {
  background: {
    image: url("../assets/dialog/dialog-luckbag-big.png");
    repeat: no-repeat;
    size: contain;
  };
}

.box {
  position: fixed;
  width: 7.5rem;
  height: 10.3rem;
  box-sizing: border-box;
  bottom: 0;

  .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 2.8rem;
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
        width: 4.7rem;
        font-size: .27rem;
        font-weight: 540;
        color: #262626;
        font-family: PingFang-SC-Bold;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .prize-time {
        font-size: .22rem;
        color: #8c8c8c;
        font-family: PingFang-SC-Medium;
      }

      .win-rate {
        width: 1rem;
        font-size: 0.35rem;
        color: #ff9900;
      }
    }
  }

  .close-btn {
    position: absolute;
    top: 2rem;
    right: .2rem;
    width: 1rem;
    height: 1rem;
    overflow: auto;
  }
}
</style>
