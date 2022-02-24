<template>
  <!-- 确认选择弹窗 -->
  <div class="box">
    <img src="../assets/dialog-jiugong.png"
         class="popup">

    <div class="lottery">
      <div class="message">
        <span>当前剩余抽奖次数: </span>
        <span style="color: #ffb728">{{ drawNum }}</span>
        <span>次</span>
      </div>

      <JiuGongLottery @getResult="lotteryResult"
                      @drawIsOver="drawIsOver"
                      :drawNum="drawNum"
                      :drawPrizeInfo="drawPrizeArr"
                      :TurntableBg="LotteryConfig.TurntableBg"
                      :TurnStartBg="LotteryConfig.TurnStartBg"
                      :PrizeGridOddBg="LotteryConfig.PrizeGridOddBg"
                      :PrizeGridEvenBg="LotteryConfig.PrizeGridEvenBg"
                      :FontOddColor="LotteryConfig.FontOddColor"
                      :FontEvenColor="LotteryConfig.FontEvenColor"
                      :PrizeImgSize="`${LotteryConfig.PrizeImgSize/100}rem`"
                      :FontSize="`${LotteryConfig.FontSize/100}rem`"
                      :JdouUrl="LotteryConfig.JdouUrl"
                      :winnerInfo="winnerInfo">
      </JiuGongLottery>
    </div>

    <!-- 关闭按钮 -->
    <div class="close-btn"
         @click="closeDialog('jiuGongLotteryDialog')"></div>
  </div>
</template>

<script lang='ts' setup>
import { defineEmits, defineProps, ref } from 'vue';
import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import JiuGongLottery from '@/widgets/JiuGongLottery/JiuGongLottery.vue';
import { LotteryConfig } from '../assets/ts/JiuGongConfig';

const emit = defineEmits(['closeDialog', 'openDialog', 'getAllRightsList', 'winnerInfo']);

// 转盘是否在转动
const drawTurn = ref(false);

// 关闭弹窗
const closeDialog = (name: any) => {
  if (drawTurn.value) {
    Toast('转盘正在转动，请耐心等待！');
  } else {
    emit('closeDialog', name);
  }
};

const props = defineProps({ drawPrizeArr: Array, rightItemId: Number });

// eslint-disable-next-line vue/no-setup-props-destructure
const { drawPrizeArr } = props;

const drawNum = ref(1);
const winnerInfo = ref(-1);

// 获取抽奖结果
const lotteryResult = () => {
  drawTurn.value = true;
  drawNum.value -= 1;
  cjwxRequest.get('/yili/medal/receive/draw', {
    params: {
      brand: 'shuhua',
      rightsItemId: props.rightItemId,
    },
  }).then((res) => {
    if (res.success) {
      //  (res.data.drawOk)
      winnerInfo.value = res.data;
    }
  });
};

// 抽奖转盘转动结束
const drawIsOver = () => {
  drawTurn.value = false;
  // losingLotteryDialog
  const dialogName = winnerInfo.value.position === 0 ? 'losingLotteryDialog' : 'winningLotteryDialog';
  // 刷新主接口
  emit('getAllRightsList');
  if (winnerInfo.value.position !== 0) {
    emit('winnerInfo', winnerInfo.value);
    console.log(winnerInfo.value, '转盘结束时传值');
  }
  emit('openDialog', dialogName);
};

</script>

<style lang='scss' scoped>
.box {
  position: relative;
  overflow-y: hidden;
  height: 10rem;

  .popup {
    width: 7rem;
  }

  .lottery {
    position: absolute;
    top: 1.5rem;

    .message {
      font-size: 0.28rem;
      color: #568cff;
    }
  }

  .close-btn {
    background: url("//img10.360buyimg.com/imgzone/jfs/t1/169145/10/23787/1469/61765bdeEe6501799/0b42973e0ab600bc.png") no-repeat;
    background-size: 100% 100%;
    width: .7rem;
    height: .7rem;
    position: absolute;
    bottom: 0;
    left: 3.15rem;
    overflow: auto;
    word-break: break-all;
  }
}
</style>
