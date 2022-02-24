<template>
  <div class="progress">
    <div class="progress-bar">
      <div class="progress" :style="getProgressHeight()"></div>
    </div>
    <div class="progress-reward">
      <template v-for="(item,index) in progressStageArr" :key="index" style="position: relative">
        <img class="stage" :src="getImg(item,index)" @click="convertPrize(index)"/>
      </template>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, defineProps, ref } from 'vue';
import { Icon as VanIcon } from 'vant';
import { progressStageArr } from '../assets/ts/inviteStage';

const props = defineProps({ inviteNumber: Number });
const emit = defineEmits(['getProgressHeight', 'convertPrize']);
// eslint-disable-next-line vue/no-setup-props-destructure
const { inviteNumber } = props;

const inviteLevel = ref(0);
const inviteList = [1, 3, 5, 10, 20, 50, 75];
const stageLength = [3.35, 1.96, 1.75, 1.45, 2.02, 2.38];

// 操作数据
const getProgressHeight = () => {
  let height = 0;
  // 当前已邀请人数为0 或 1 时不显示进度条
  if (inviteNumber === 1 || inviteNumber === 0) {
    inviteLevel.value = inviteNumber === 0 ? -1 : 0;
  } else if (inviteList.filter((item) => item === inviteNumber).length > 0) {
    // 当前已邀请人数是否在阶段点上?
    // 在
    const index = inviteList.sort((a, b) => a - b).findIndex((item) => item === inviteNumber);
    inviteLevel.value = index;
    height = Number(stageLength.slice(0, index).reduce((a, b) => a + b));
  } else {
    // 不在
    // 插入当前已邀请人数
    inviteList.push(inviteNumber);
    // 计算已插入数据后索引位
    // eslint-disable-next-line no-shadow
    const index = inviteList.sort((a, b) => a - b).findIndex((item) => item === inviteNumber);
    inviteLevel.value = index - 1;
    // 超过3人计算之前 list长度总和
    height = inviteNumber < 3 ? 0 : stageLength.slice(0, index - 1).reduce((a, b) => a + b);
    // 当前邀请人数 前一个阶段 --> 后一阶段相差多少个刻度
    const a = inviteList[index + 1] - inviteList[index - 1];
    // 刻度 - 每个刻度多长
    const unit = inviteNumber < 3 ? stageLength[0] / a : stageLength[index - 1] / a;
    // 刻度 * 多少刻度 + 之前阶段总长
    height += unit * (inviteNumber - inviteList[index - 1]);
    console.log(height);
  }
  return `height:${inviteNumber >= 75 ? 13 : height}rem`;
};

// 兑奖接口
const convertPrize = (index) => {
  // 只有点击 第0 2 5个 是优惠券，需要点击领取 && 当前等级达到领取条件
  if ((index === 0 || index === 2 || index === 5) && inviteLevel.value >= index) {
    emit('getGiftId', index);
  }
};

// 图片
const getImg = (item, index) => {
  let url = '';
  // 当前等级大于 图片索引位
  if (inviteLevel.value >= index) {
    // 如果是等级 1 3 需要进行 是否超过邀请5人判断
    if ((index === 0 || index === 1) && inviteNumber < 5) {
      url = item.img_no;
    } else {
      url = item.img;
    }
  } else {
    url = item.img_lock;
  }
  return url;
};

</script>

<style scoped lang="scss">
.progress {
  margin: .3rem 0;
  padding: 0 .5rem 0 .75rem;
  display: flex;
  justify-content: space-between;

  .progress-bar {
    width: .91rem;
    height: 13.1rem;
    background: url("../assets/img/progress-bar.png") no-repeat;
    background-size: cover;
    position: relative;

    .progress {
      width: .23rem;
      position: absolute;
      left: 0;
      top: 0;
      background: #e4301f;
      padding: unset;
      margin: unset;
      border-radius: .2rem;
    }

  }

  .progress-reward {
    width: 80%;

    .icon {
      width: 1.78rem;
      height: 0.36rem;
      background-color: #ffffff;
      border-radius: 0.16rem;
      font-family: FZLTHJW--GB1-0;
      font-size: 0.19rem;
      position: absolute;
      top: 1rem;
      left: .2rem;
    }

    img:nth-child(1) {
      width: 5.33rem;
      margin-left: -.3rem;
    }

    img:nth-child(2) {
      width: 4.5rem;
      display: inline;
      margin-top: .18rem;
    }

    img:nth-child(3) {
      width: 4.94rem;
      margin-top: .14rem;
    }

    img:nth-child(4) {
      width: 4.19rem;
      margin-top: .22rem;
      display: inline;
    }

    .stage:nth-child(5) {
      width: 4.43rem;
      margin-top: .12rem;
      display: inline;
    }

    .stage:nth-child(6) {
      width: 4.56rem;
      margin-top: .15rem;
    }

    .stage:nth-child(7) {
      width: 3.92rem;
      margin-top: .18rem;
      margin-left: .3rem;
      display: inline;
    }
  }
}

img {
  margin: 0 auto;
}
</style>
