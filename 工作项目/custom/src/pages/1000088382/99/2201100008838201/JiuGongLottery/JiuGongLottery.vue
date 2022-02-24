<template>
  <div id="draw">
    <div
      v-for="(item,index) in drawPrizeInfo"
      :key="item"
      :id="`draw-${index}`"
      class="draw-normal"
      :class="`draw-${index}`"
    >
      <!-- 京豆 -->
      <template v-if="item.type === 6">
        <img style="width: 1.2rem" :src="JdouUrl" />
        <div>{{ item.name }}</div>
      </template>
      <!-- 实物 -->
      <template v-if="item.type === 7">
        <img style="width: 1.2rem" :src="item.showImage" />
        <div>{{ item.name }}</div>
      </template>
      <!-- 积分 -->
      <template v-if="item.type === 9">
        <img style="width: 1.2rem" :src="JifenUrl" />
        <div>{{ item.name }}</div>
      </template>
      <!-- 谢谢参与 -->
      <template v-if="item.type === 0">
        <img
          style="width: 1.2rem"
          src="//img10.360buyimg.com/imgzone/jfs/t1/174543/9/28248/6960/617a7be0E57ec7740/d6e5f7e695cb925e.png"
        />
        <div>{{ item.name }}</div>
      </template>
    </div>

    <div @click="goDraw()" class="draw-click" v-click-track="`立即抽奖`"></div>
  </div>
</template>

<script lang='ts' setup>
import { ref, defineProps, defineEmits, withDefaults, computed, watch, nextTick } from 'vue';
import { Toast } from 'vant';
import { defalutUrl } from './Prize';

/* 不传参数使用默认数据 */
interface JiuGongProps {
  JdouUrl?: string, // 京豆icon
  JifenUrl?: string, // 积分icon
  TurntableBg?: string, // 转盘背景img
  PrizeGridBg?: string, // 奖品格子背景img
  CircleNum?: number // 需要转几圈 开始中奖
  VariableSpeed?: boolean // 转速是否可变
  winnerId?: number, // 中奖奖品位
  drawPrizeInfo?: Array<any> // 奖品数据
  restTimes?: number // 可抽奖次数
  openCard?: boolean
}

const emit = defineEmits(['getResult', 'endResult']);
const props = withDefaults(defineProps<JiuGongProps>(), {
  CircleNum: 5,
  VariableSpeed: true,
  JdouUrl: defalutUrl.JdouUrl,
  JifenUrl: defalutUrl.JifenUrl,
  TurntableBg: defalutUrl.TurntableBg,
  PrizeGridBg: defalutUrl.PrizeGridBg,
  winnerId: -1,
  drawPrizeInfo: () => [],
});

const winnerId = computed(() => props.winnerId);
const TurntableBg = computed(() => `url(${props.TurntableBg})`);
const PrizeGridBg = computed(() => `url(${props.PrizeGridBg})`);
let isDrawing = false; // 转盘是否正在运行
let circleId = 0; // 转动奖品Id
let startTime = Date.now();
let t = 0;
let speed = 100;

const goDraw = async () => {
  if (!props.openCard) {
    emit('endResult');
    return;
  }
  if (props.restTimes === 0) {
    Toast('暂无抽奖机会');
    return;
  }
  // 判断 是否正在抽奖
  if (isDrawing) {
    return;
  }

  // 判断 是否入会
  // 判断 是否有抽奖次数

  // 调用抽奖接口 --> 获取中奖信息及结果
  emit('getResult');

  // 判断 接口是否成功返回
  let circleNum = props.CircleNum;

  isDrawing = true;

  // 奖品循环转动
  function circle() {
    circleId += 1;
    // 9宫格 8件商品 + 1按钮; 超过8 --> 转满一圈
    if (circleId > 8) {
      // 圈数 -1
      circleNum -= 1;
      // 奖品 Id = 1
      circleId = 0;
    }

    if (props.VariableSpeed) {
      // 圈数大于或等于3时
      if (circleNum >= 3) {
        // 转动每格速度所需时间减少 3ms
        speed -= 3;
      } else {
        // 圈数小于3时 转动每格所需时间 增加 10ms
        speed += 10;
      }
    }

    // 转动到 相应奖品Id （置灰 or 高亮显示）
    props.drawPrizeInfo.forEach((item, index) => {
      if (index === circleId) {
        document.getElementById(`draw-${index}`).classList.add('gray');
      } else {
        document.getElementById(`draw-${index}`).classList.remove('gray');
      }
    });

    // 圈数 = 0 并且 奖品位ID = 接口返回中奖奖品ID
    if (circleNum < 1 && circleId === props.winnerId) {
      return props.winnerId;
    }
    return -1;
  }

  function timeCheck(time: any) {
    t += time;
    let result = -1;

    if (t > speed) {
      t = 0;
      result = circle();
    }
    return result;
  }

  // 定时器
  function rafHandle() {
    const resultCircleId = timeCheck(Date.now() - startTime);
    startTime = Date.now();
    // 剩余圈数大于0 或者 圈数等于0 并且 当前转动Id !== 中奖奖品Id
    if (circleNum > 0 || resultCircleId === -1 || (circleNum === 0 && resultCircleId !== props.winnerId)) {
      requestAnimationFrame(rafHandle);
    } else {
      isDrawing = false;
      speed = 100;
      emit('endResult');
    }
  }

  requestAnimationFrame(rafHandle);
};

</script>

<style lang='scss' scoped>
.gray {
  /*grayscale(val):val值越大灰度就越深*/
  -webkit-filter: grayscale(0) brightness(0.6);
  -moz-filter: grayscale(0) brightness(0.6);
  -ms-filter: grayscale(0) brightness(0.6);
  -o-filter: grayscale(0) brightness(0.6);
  filter: grayscale(0) brightness(0.6);
  filter: gray brightness;
}

#draw {
  width: 7rem;
  height: 7rem;
  background: {
    image: v-bind(TurntableBg);
    size: cover;
    position: center;
  }
  margin: -1.25rem auto;
  position: relative;

  .draw-click {
    width: 2rem;
    height: 2rem;
    position: absolute;
    background: {
      image: url(//img10.360buyimg.com/imgzone/jfs/t1/217438/19/2115/4118/617933e6Ee3c71af1/129de3b07b9c9a45.png);
      size: cover;
      position: center;
    }
    top: 2.5rem;
    left: 2.5rem;
  }

  .draw-normal {
    width: 2rem;
    height: 2rem;
    background: {
      image: v-bind(PrizeGridBg);
      size: cover;
      position: center;
    }
    border-radius: 0.2rem;
    text-align: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    font-size: 0.28rem;
    color: #a81b14;
  }

  .draw-0 {
    position: absolute;
    top: 0.4rem;
    left: 0.4rem;
  }

  .draw-1 {
    position: absolute;
    top: 0.4rem;
    left: 2.5rem;
  }

  .draw-2 {
    position: absolute;
    top: 0.4rem;
    left: 4.6rem;
  }

  .draw-3 {
    position: absolute;
    top: 2.5rem;
    left: 4.6rem;
  }

  .draw-4 {
    position: absolute;
    top: 4.6rem;
    left: 4.6rem;
  }

  .draw-5 {
    position: absolute;
    top: 4.6rem;
    left: 2.5rem;
  }

  .draw-6 {
    position: absolute;
    top: 4.6rem;
    left: 0.4rem;
  }

  .draw-7 {
    position: absolute;
    top: 2.5rem;
    left: 0.4rem;
  }
}
</style>
