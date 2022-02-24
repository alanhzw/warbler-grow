<template>
  <div id="draw">
    <div v-for="(item,index) in drawPrizeInfo" :key="item" :id="`draw-${index+1}`"
         class="draw-normal" :class="`draw-${index+1}`">
      <div>
        <!-- 京豆 -->
        <img v-if="item.type === 6" :src="JdouUrl"/>
        <!-- 实物 -->
        <img v-else-if="item.type === 7" :src="item.showImage"/>
        <!-- 积分 -->
        <img v-else-if="item.type === 9" :src="JifenUrl"/>

        <div>{{ item.name || item.giftName }}</div>
      </div>
    </div>

    <div @click="goDraw()" class="draw-click"></div>
  </div>
</template>

<script lang='ts' setup>
import { computed, defineEmits, defineProps, watch, withDefaults, ref } from 'vue';
import { Toast } from 'vant';
import { defalutUrl } from './Prize';

/* 不传参数使用默认数据 */
interface JiuGongProps {
  JdouUrl?: string, // 京豆icon
  JifenUrl?: string, // 积分icon
  TurntableBg?: string, // 转盘背景img
  TurnStartBg?: string, // 转盘开始按钮背景img
  PrizeImgSize?: string, // 奖品图片宽度
  PrizeGridOddBg?: string, // 奖品格子(偶数)背景img
  PrizeGridEvenBg?: string, // 奖品格子(奇数)背景img
  // PrizeGridOddColor?: string, // 奖品格子(偶数)背景颜色
  // PrizeGridEvenColor?: string, // 奖品格子(奇数)背景颜色
  FontOddColor?: string, // 奖品名称(偶数)颜色
  FontEvenColor?: string, // 奖品名称(奇数)颜色
  FontSize?: string, // 奖品字号
  CircleNum?: number // 需要转几圈 开始中奖
  VariableSpeed?: boolean // 转速是否可变
  winnerInfo?: any, // 中奖奖品信息
  drawNum?: number, // 抽奖次数
  drawPrizeInfo?: Array<any> // 奖品数据
}

const emit = defineEmits(['getResult', 'drawIsOver', 'drawIsTurn']);
const props = withDefaults(defineProps<JiuGongProps>(), {
  CircleNum: 5,
  VariableSpeed: true,
  JdouUrl: defalutUrl.JdouUrl,
  JifenUrl: defalutUrl.JifenUrl,
  drawNum: 0,
  drawPrizeInfo: () => [],
});

const drawNum = computed(() => props.drawNum);
const winnerInfo = computed(() => props.winnerInfo);
const TurntableBg = computed(() => `url(${props.TurntableBg})`);
const TurnStartBg = computed(() => `url(${props.TurnStartBg})`);
const PrizeImgSize = computed(() => props.PrizeImgSize);
const PrizeGridOddBg = computed(() => `url(${props.PrizeGridOddBg})`);
const PrizeGridEvenBg = computed(() => `url(${props.PrizeGridEvenBg})`);
// const PrizeGridOddColor = computed(() => props.PrizeGridOddColor);
// const PrizeGridEvenColor = computed(() => props.PrizeGridEvenColor);
const FontOddColor = computed(() => props.FontOddColor);
const FontEvenColor = computed(() => props.FontEvenColor);
const FontSize = computed(() => props.FontSize);

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

  let circleNum = props.CircleNum;
  const { VariableSpeed, drawPrizeInfo } = props;

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
    // 转盘是否变速转动
    if (VariableSpeed) {
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
    drawPrizeInfo.forEach((item, index) => {
      if (index + 1 === circleId) {
        document.getElementById(`draw-${index + 1}`).classList.add('gray');
      } else {
        document.getElementById(`draw-${index + 1}`).classList.remove('gray');
      }
    });

    // （未中奖：奖品id = 0 && 奖品position = 0）
    const isThanks = props.winnerInfo.position === 0 && drawPrizeInfo[circleId - 1].type === 0;
    // （中奖：奖品位ID = 接口返回中奖奖品ID）
    const isWinner = circleId === props.winnerInfo.position;
    // 圈数 = 0 && （未中奖：奖品id = 0 && 奖品position = 0） || （中奖：奖品位ID = 接口返回中奖奖品ID）
    if (circleNum < 1 && (isThanks || isWinner)) {
      // 谢谢参与
      return props.winnerInfo.position;
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
  -webkit-filter: grayscale(0) brightness(.6);
  -moz-filter: grayscale(0) brightness(.6);
  -ms-filter: grayscale(0) brightness(.6);
  -o-filter: grayscale(0) brightness(.6);
  filter: grayscale(0) brightness(.6);
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
  margin: 0 auto;
  position: relative;

  .draw-click {
    width: 1.8rem;
    height: 1.8rem;
    position: absolute;
    background: {
      image: v-bind(TurnStartBg);
      size: cover;
      position: center;
    }
    top: 2.5rem;
    left: 2.6rem;
  }

  .draw-normal {
    width: 1.8rem;
    height: 1.8rem;
    border-radius: .2rem;
    text-align: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    font-size: v-bind(FontSize);

    img {
      width: v-bind(PrizeImgSize);
    }
  }

  .draw-normal:nth-child(odd) {
    color: v-bind(FontOddColor);
    //background: v-bind(PrizeGridOddColor);
    background: {
      image: v-bind(PrizeGridOddBg) !important;
      size: cover;
      position: center;
    }
  }

  .draw-normal:nth-child(even) {
    color: v-bind(FontEvenColor);
    //background: v-bind(PrizeGridEvenColor);
    background: {
      image: v-bind(PrizeGridEvenBg) !important;
      size: cover;
      position: center;
    }
  }

  .draw-1 {
    position: absolute;
    top: 0.55rem;
    left: 0.6rem;
  }

  .draw-2 {
    position: absolute;
    top: 0.55rem;
    left: 2.6rem;
  }

  .draw-3 {
    position: absolute;
    top: 0.55rem;
    left: 4.55rem;
  }

  .draw-4 {
    position: absolute;
    top: 2.5rem;
    left: 4.55rem;
  }

  .draw-5 {
    position: absolute;
    top: 4.45rem;
    left: 4.55rem;
  }

  .draw-6 {
    position: absolute;
    top: 4.45rem;
    left: 2.6rem;
  }

  .draw-7 {
    position: absolute;
    top: 4.45rem;
    left: 0.6rem;
  }

  .draw-8 {
    position: absolute;
    top: 2.5rem;
    left: 0.6rem;
  }
}
</style>
