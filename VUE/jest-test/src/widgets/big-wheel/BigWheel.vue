<!--
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-11-16 17:02:46
 * @LastEditTime: 2021-11-24 16:15:48
 * @FilePath: \jest-test\src\widgets\big-wheel\BigWheel.vue
-->
<template>
  <div ref='bwWrapper'>
    <div class="big-wheel"
         :style="{ width: `${ diameter}px`, height: `${diameter}px` }">
      <div class="plate back-option"
           :style="{backgroundImage: `url(${plate})`,transform:`rotate${plateAngle}turn` }">
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
           :style="{ backgroundImage: `url(${pointer})` }">
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, PropType, onMounted, computed } from "vue";
import { calcDiameter, calcPrizeFontSize, rotatePlateToPrize } from "../logic";
// @ts-ignore
import defaultPlate from "./assets/plate.png";
// @ts-ignore
import defaultPointer from "./assets/pointer.png";

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

const diameter = ref(355);

const plateAngle = ref(0);

const start = () => {
  rotatePlateToPrize(5, props.prizes.length);
};

const prizeFontSize = computed(() => calcPrizeFontSize(diameter.value));

const bwWrapper = ref<HTMLElement | null>(null);

onMounted(() => {
  diameter.value = calcDiameter(bwWrapper.value!.offsetWidth, bwWrapper.value!.offsetHeight);
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




