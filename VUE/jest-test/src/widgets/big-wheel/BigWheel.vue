<!--
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-11-16 17:02:46
 * @LastEditTime: 2021-11-26 17:25:36
 * @FilePath: \jest-test\src\widgets\big-wheel\BigWheel.vue
-->
<template>
  <div ref='bwWrapper'>
    <div class="big-wheel"
         :style="{ width: `${ diameter}px`, height: `${diameter}px` }">
      <div class="plate back-option"
           ref='plateRef'
           :style="{backgroundImage: `url(${plate})`,transform:`rotate(${plateAngle}turn)` }">
        <div class="prize"
             v-for='(item,index) in prizes'
             :key='index'
             :style="{transform:`rotate(${index/prizes.length}turn)`}">
          <Prize :prize='item'
                 :index='index'
                 :style='{fontSize:`${prizeFontSize}px`}'></Prize>
        </div>
      </div>
      <div class="pointer back-option"
           @click='start'
           ref='pointerRef'
           :style="{ backgroundImage: `url(${pointer})` }">
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, PropType, onMounted, computed, defineEmits, defineExpose } from "vue";
import { addStopListener, calcDiameter, calcPrizeFontSize, rotatePlateToPrize } from "../logic";
// @ts-ignore
import defaultPlate from "./assets/WechatIMG65.png";
// @ts-ignore
import defaultPointer from "./assets/WechatIMG73.png";

import Prize from "./prize.vue";

const props = defineProps({
  plate: {
    type: String,
    default: defaultPlate,
  },
  pointer: {
    type: String,
    default: defaultPointer,
  },
  prizes: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
});
const emit = defineEmits(["start", "over"]);

const diameter = ref(355);

const plateAngle = ref(0);

const pointerAngle = ref(0);

const plateRef = ref<HTMLElement | null>(null);
const pointerRef = ref<HTMLElement | null>(null);

const targetPrize = ref();

const start = () => {
  emit("start");
};

const rotateTo = (prizeIndex: number) => {
  plateAngle.value = rotatePlateToPrize(prizeIndex, props.prizes.length) + 5;
  targetPrize.value = props.prizes[prizeIndex];
};

const prizeFontSize = computed(() => calcPrizeFontSize(diameter.value));

const bwWrapper = ref<HTMLElement | null>(null);

defineExpose({
  rotateTo,
});

onMounted(() => {
  diameter.value = calcDiameter(bwWrapper.value!.offsetWidth, bwWrapper.value!.offsetHeight);
  addStopListener(plateRef.value!, () => {
    emit("over", targetPrize.value.prizeName);
  });
});
</script>

<style lang="scss">
.big-wheel {
  display: flex;
  justify-content: center;
  position: relative;

  .back-option {
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .plate {
    z-index: 2;
    transition: all 5s ease-in-out;
  }
  .pointer {
    z-index: 3;
  }
  .prize {
    position: absolute;
    height: 50%;
    top: 0;
    left: 0;
    width: 100%;
    transform-origin: 50% 100%;
  }
}
</style>




