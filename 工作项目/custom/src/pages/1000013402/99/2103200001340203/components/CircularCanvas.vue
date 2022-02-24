<template>
  <div>
    <canvas ref="canvas" width="1000" height="1000"
            style="height: 6rem;background-color: transparent;"></canvas>
  </div>
</template>

<script lang='ts' setup>
import {
  defineProps, nextTick, onMounted, Ref, ref, watch,
} from 'vue';

const props = defineProps({ activeIndex: Number });

const canvas: Ref = ref(null);
const trackW = 20;
const rx = 500;
const ry = 500;
const radius = 400;
const innerLineW = 20;
// 比例点
const proport = 0.129;

let ctx: any = null;

const draw = (angle = 1) => {
  const currentAngle = (angle * proport + 1) * Math.PI;
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

  // 半圆轨道
  ctx.beginPath();
  ctx.strokeStyle = '#bbedb5';
  ctx.lineWidth = trackW;
  ctx.arc(rx, ry, radius, -0.1 * Math.PI, -0.9 * Math.PI, true);
  ctx.stroke();
  // 圆弧
  ctx.beginPath();
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = innerLineW;
  ctx.arc(rx, ry, radius, 1.1 * Math.PI, currentAngle, false);
  ctx.stroke();

  // 圆形亮点
  const pointX = rx - radius * Math.cos(angle * proport * Math.PI);
  const pointY = rx - radius * Math.sin(angle * proport * Math.PI);
  console.log('pointX:', pointX, 'pointY:', pointY);

  ctx.beginPath();
  ctx.lineCap = 'round';
  ctx.lineWidth = 15;
  ctx.strokeStyle = '#bbedb5';
  ctx.fillStyle = '#ffffff';
  ctx.arc(pointX, pointY, 25, 0, 2 * Math.PI, true);
  ctx.fill();
  ctx.stroke();
};

onMounted(() => {
  console.log(Math.cos(radius));
  ctx = canvas.value.getContext('2d');
  draw(props.activeIndex);
});

watch(() => props.activeIndex, (newValue, oldValue) => {
  nextTick(() => {
    draw(props.activeIndex);
  });
});

</script>

<style lang='scss' scoped>

</style>
