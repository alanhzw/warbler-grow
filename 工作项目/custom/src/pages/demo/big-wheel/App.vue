<template>
  <header>big wheel 测试页面</header>
  <big-wheel
    ref="bw"
    class="big-wheel"
    :plate="bgPic"
    :pointer="pointerPic"
    :prizes="prizes"
    :loop="10"
    :rotateType="1"
    @rotate-start="start"
    @rotate-over="finish">
    <!-- <template #prize="{prize}">
      <p>{{prize.prizeName}}</p>
    </template> -->
  </big-wheel>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import bgPic from './assets/plate.png';
import pointerPic from './assets/pointer.png';
import prizePic1 from './assets/prize1.png';
import prizePic2 from './assets/prize2.png';

const prizes = ref<Array<any>>([]);

setTimeout(() => {
  prizes.value = [
    {
      prizeName: '实物奖品1',
      prizeDesc: '',
      prizePic: prizePic1,
      prizeType: 1,
      prizeId: 0,
    }, {
      prizeName: '优惠券',
      prizeDesc: '200',
      prizePic: '',
      prizeType: 2,
      prizeId: 1,
    }, {
      prizeName: '再来一次',
      prizeDesc: '再来一次',
      prizePic: '',
      prizeType: 4,
      prizeId: 2,
    }, {
      prizeName: '京豆',
      prizeDesc: '20',
      prizePic: '',
      prizeType: 3,
      prizeId: 3,
    }, {
      prizeName: '实物商品2',
      prizeDesc: '',
      prizePic: prizePic2,
      prizeType: 1,
      prizeId: 4,
    }, {
      prizeName: '优惠券',
      prizeDesc: '100',
      prizePic: '',
      prizeType: 2,
      prizeId: 5,
    }, {
      prizeName: '谢谢参与',
      prizeDesc: '谢谢参与',
      prizePic: '',
      prizeType: -1,
      prizeId: 6,
    }, {
      prizeName: '京豆',
      prizeDesc: '50',
      prizePic: '',
      prizeType: 3,
      prizeId: 7,
    },
  ];
}, 300);

const bw = ref();
const start = () => {
  console.log('旋转开始');
  bw.value.rotateToPrize(1);
};
const finish = (prizeIndex: number, prize: any) => {
  console.log(`大转盘旋转到第${prizeIndex + 1}个奖品的位置结束转动`);
  console.log(`奖品信息为：${JSON.stringify(prize)}`);
};
</script>

<style lang="scss">
body {
  font-family: MicrosoftYaHei;
}
.big-wheel {}
</style>
