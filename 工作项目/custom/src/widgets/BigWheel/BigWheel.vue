<template>
  <div ref="wheel" class="wheel">
    <div ref="plate" class="plate">
      <div
        class="prize"
        v-for="(prize, index) in prizes"
        :key="`prize${index}`"
        :style="{
          transform: `translateX(-50%) rotate(${index / prizes.length}turn)`
        }">
        <slot name="prize" v-if="$slots.prize" :prize="prize"></slot>
        <prize v-else :data="prize" :scale="scale"/>
      </div>
    </div>
    <div ref="point" class="pointer"  @click="emit('rotate-start')"></div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  defineProps,
  defineEmits,
  defineExpose,
  withDefaults,
} from 'vue';
import {
  getDiameter,
  rotatePlateToPrize,
  rotatePointerToPrize,
  addStopListener,
} from './logic';
import Prize from './Prize';

// const props = defineProps({
//   bg: {
//     type: String,
//   },
//   pointer: {
//     type: String,
//   },
//   rotateType: {
//     type: Number,
//     default: 1, // 1 - 转盘子，2 - 转指针
//   },
//   prizes: {
//     type: Array,
//     default: () => [],
//   },
//   loop: {
//     type: Number,
//     default: 0,
//   },
// });

interface BigWheelProps {
  plate?: string, // 轮盘背景
  pointer?: string, // 指针背景
  rotateType?: number, // 旋转类型 1: 转盘子，2: 转指针
  prizes?: Array, // 奖品信息
  loop?: number // 前置旋转全数
}

const props = withDefaults(defineProps<BigWheelProps>(), {
  rotateType: 1,
  prizes: () => [],
  loop: 1,
});

// 轮盘背景样式
const plateStyleStr = computed(() => `url(${props.plate})`);
// 指针背景样式
const pointerStyleStr = computed(() => `url(${props.pointer})`);

// 轮盘角度及对应的style字符串
const plateAngle = ref(0);
const plateRotateStyleStr = computed(() => `rotate(${plateAngle.value}turn)`);

// 指针角度及对应的style字符串
const pointAngle = ref(0);
const pointRotateStyleStr = computed(() => `rotate(${pointAngle.value}turn)`);

let targetPrizeIndex = 0;

/**
 * 旋转到奖品函数
 */
const rotateToPrize = (prizeIndex: number) => {
  // 记录旋转结果，用于事件上报
  targetPrizeIndex = prizeIndex;
  if (props.rotateType === 1) {
    // 旋转盘子角度
    plateAngle.value = rotatePlateToPrize(prizeIndex, props.prizes.length, props.loop);
  } else if (props.rotateType === 2) {
    // 旋转指针角度
    pointAngle.value = rotatePointerToPrize(prizeIndex, props.prizes.length, props.loop);
  }
};

// 组件、转盘、指针的ref
const wheel = ref<HTMLElement>();
const plate = ref<HTMLElement>();
const point = ref<HTMLElement>();

// 注册父组件可监听的旋转开始和旋转结束事件
// const emit = defineEmits(['rotate-start', 'rotate-over']);
const emit = defineEmits<{(e: 'rotate-start'): void, (e: 'rotate-over', prizeIndex: number, prize: any): void}>();
// 旋转结束时触发rotate-over时间，携带奖品索引和奖品信息参数
const emitOver = () => {
  emit('rotate-over', targetPrizeIndex, props.prizes[targetPrizeIndex]);
};

// 缩放比例
const scale = ref(1);

onMounted(() => {
  // 计算圆盘直径
  const diameter = getDiameter(wheel.value.clientWidth, wheel.value.clientHeihgt);
  // 设置大转盘的高度
  wheel.value.style.height = `${diameter}px`;
  // 计算出缩放比例
  scale.value = diameter / 714;

  // 针对不同的旋转对象监听旋转结束
  if (props.rotateType === 1) {
    // 监听转盘旋转结束
    addStopListener(plate.value, emitOver);
  } else if (props.rotateType === 2) {
    // 监听指针旋转结束
    addStopListener(point.value, emitOver);
  }
});

// 对外开放旋转到奖品接口
defineExpose({
  rotateToPrize,
});
</script>

<style scoped lang="scss">
.wheel {
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  .plate {
    position: relative;
    height: 100%;
    background: {
      image: v-bind(plateStyleStr);
      size: cover;
      position: center;
    };
    transform: v-bind(plateRotateStyleStr);
    transition: transform 3s ease-in-out;
    .prize {
      position: absolute;
      left: 50%;
      height:50%;
      overflow: hidden;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center ;
      color: #000000;
      transform-origin: 50% bottom;
    }

  }
  .pointer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: {
      image: v-bind(pointerStyleStr);
      size: cover;
      position: center;
    };
    transform: v-bind(pointRotateStyleStr);
    transition: transform 3s ease-in-out;
  }
}
.test {
  counter-reset: num;
  li {
    color: red;
    counter-increment: num;
    --m: calc(var(--m) + 1);
    padding-left: calc(var(--m) * 1px);

    &::before {
      content: counter(num);
    }
  }
}
</style>
