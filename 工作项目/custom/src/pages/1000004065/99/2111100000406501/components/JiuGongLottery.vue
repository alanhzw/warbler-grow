<template>
  <div id="draw">
    <div v-for="(item,index) in drawPrizeInfo" :key="item" :id="`draw-${index+1}`"
         class="draw-normal" :class="`draw-${index+1}`">
      <div>
        <!-- 京豆 -->
        <img v-if="item.type === 6" :src="JdouUrl"/>
        <!-- 实物 -->
        <img v-else-if="item.type === 7" :src="item.showImage"/>
        <!-- 优惠券 -->
        <img v-else-if="item.type === 20" :src="CouponUrl" style="width: 0.8rem"/>
        <!-- 积分 -->
        <img v-else-if="item.type === 9" :src="JifenUrl"/>

        <div>{{ item.name || item.giftName }}</div>
      </div>
    </div>

    <div @click="goDraw()" class="draw-click">
      <div class="tips">剩余次数{{ drawNum }}</div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { computed, defineEmits, defineProps, watch, withDefaults, ref } from 'vue';
import { Toast } from 'vant';

import CouponUrl from '../assets/img/lottery/winner-prize-coupon.png'; // 优惠券icon
import JifenUrl from '../assets/img/lottery/winner-peize-points.png'; // 积分icon

import JdouUrl from '../assets/img/lottery/winner-prize-jd.png'; // 京豆icon

/* 不传参数使用默认数据 */
interface JiuGongProps {
  winnerInfo: any, // 中奖奖品信息
  drawNum?: number, // 抽奖次数
  drawPrizeInfo?: Array<any> // 奖品数据
}

const emit = defineEmits(['getResult', 'drawIsOver', 'drawIsTurn']);
const props = withDefaults(defineProps<JiuGongProps>(), {
  drawNum: 0,
  drawPrizeInfo: () => [],
});

const drawNum = computed(() => props.drawNum);
const winnerInfo = computed(() => props.winnerInfo);

let isDrawing = false; // 转盘是否正在运行
let circleId = 1; // 转动奖品位
let startTime = Date.now();
let t = 0;
let speed = 100;

const goDraw = async () => {
  // 判断 是否入会

  // 判断 是否正在抽奖
  if (isDrawing) {
    Toast('转盘正在转动，请耐心等待！');
    return;
  }
  // 判断 是否有抽奖次数
  if (drawNum.value <= 0) {
    Toast('您没有抽奖次数了，请关注后续活动！');
    return;
  }
  // 调用抽奖接口 --> 获取中奖信息及结果
  emit('getResult');
  drawNum.value -= 1;
  // circleId = 1;

  let circleNum = 5;
  const { drawPrizeInfo } = props;

  isDrawing = true;

  // 奖品循环转动
  function circle() {
    circleId += 1;
    // 9宫格 8件商品 + 1按钮; 超过8 --> 转满一圈
    if (circleId > 8) {
      // 圈数 -1
      circleNum -= 1;
      // 奖品 Id = 1
      circleId = 1;
    }
    // 圈数大于或等于3时
    if (circleNum >= 3) {
      // 转动每格速度所需时间减少 3ms
      speed -= 3;
    } else {
      // 圈数小于3时 转动每格所需时间 增加 10ms
      speed += 10;
    }

    // 转动到 相应奖品Id （置灰 or 高亮显示）
    drawPrizeInfo.forEach((item, index) => {
      document.getElementById(`draw-${index + 1}`).classList.remove('draw-active');
    });
    document.getElementById(`draw-${circleId}`).classList.add('draw-active');

    // （未中奖：奖品id = 0 && 奖品position = 0）
    const isThanks = winnerInfo.value.position === 0 && drawPrizeInfo[circleId - 1].type === 0;
    // （中奖：奖品位ID = 接口返回中奖奖品ID）
    const isWinner = circleId === winnerInfo.value.position;

    // 圈数 = 0 && （未中奖：奖品id = 0 && 奖品position = 0） || （中奖：奖品位ID = 接口返回中奖奖品ID）
    if (circleNum < 1 && (isThanks || isWinner)) {
      // 谢谢参与
      return winnerInfo.value.position;
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
    if (circleNum > 0 || resultCircleId === -1) {
      requestAnimationFrame(rafHandle);
    } else {
      isDrawing = false;
      speed = 100;

      setTimeout(() => {
        emit('drawIsOver');
      }, 1500);
    }
  }

  requestAnimationFrame(rafHandle);
};

</script>

<style lang='scss' scoped>
.gray {
  /*grayscale(val):val值越大灰度就越深*/
  -webkit-filter: grayscale(0) brightness(.2);
  -moz-filter: grayscale(0) brightness(.2);
  -ms-filter: grayscale(0) brightness(.2);
  -o-filter: grayscale(0) brightness(.2);
  filter: grayscale(0) brightness(.2);
  filter: gray brightness;
}

.draw-active {
  border: solid 1px #d1aa5b !important;
}

#draw {
  width: 7rem;
  height: 7rem;
  margin: 0.5rem auto;
  position: relative;

  .draw-click {
    width: 2.2rem;
    height: 2.2rem;
    position: absolute;
    background: {
      image: url('../assets/img/lottery/lottery-btn.png');
      size: cover;
      position: center;
    }
    top: 2.58rem;
    left: 2.42rem;

    .tips {
      width: 100%;
      font-size: .2rem;
      color: #d1aa5b;
      position: absolute;
      bottom: .5rem;
    }
  }

  .draw-normal {
    width: 2.2rem;
    height: 2.2rem;
    text-align: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    color: #fff4df;
    background-color: #171e3b;
    border: solid 1px #171e3b;
    font-size: .24rem;

    img {
      width: 1rem;
    }
  }

  .draw-1 {
    position: absolute;
    top: 0.2rem;
    left: 0;
    border-radius: .1rem 0 0 0;
  }

  .draw-2 {
    position: absolute;
    top: 0.2rem;
    left: 2.42rem;
  }

  .draw-3 {
    position: absolute;
    top: 0.2rem;
    left: 4.82rem;
    border-radius: 0 .1rem 0 0;
  }

  .draw-4 {
    position: absolute;
    top: 2.58rem;
    left: 4.82rem;
  }

  .draw-5 {
    position: absolute;
    top: 4.95rem;
    left: 4.82rem;
    border-radius: 0 0 .1rem 0;
  }

  .draw-6 {
    position: absolute;
    top: 4.95rem;
    left: 2.42rem;
  }

  .draw-7 {
    position: absolute;
    top: 4.95rem;
    left: 0;
    border-radius: 0 0 0 .1rem;
  }

  .draw-8 {
    position: absolute;
    top: 2.58rem;
    left: 0;
  }
}
</style>
