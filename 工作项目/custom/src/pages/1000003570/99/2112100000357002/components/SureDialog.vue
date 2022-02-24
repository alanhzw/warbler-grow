<template>
  <!-- 福袋选择弹窗 -->
  <div class="box" :class="[bagSize===1?'small':'big']">
    <div class="close-btn" @click="closeDialog"></div>
    <div class="sure-btn" @click="sureDraw"></div>
  </div>
</template>

<script lang='ts' setup>
import { defineEmits, defineProps } from 'vue';

const props = defineProps({ bagSize: Number });
const emit = defineEmits(['closeDialog', 'sureDraw']);

const closeDialog = () => {
  emit('closeDialog');
};

const sureDraw = () => {
  emit('sureDraw', props.bagSize);
};

</script>

<style lang='scss' scoped>
.big {
  background: {
    image: url("../assets/dialog/dialog-sure-big.png");
    repeat: no-repeat;
    size: contain;
  };
}

.small {
  background: {
    image: url("../assets/dialog/dialog-sure-small.png");
    repeat: no-repeat;
    size: contain;
  };
}

.box {
  width: 4.63rem;
  height: 4.55rem;
  box-sizing: border-box;

  .sure-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 1rem;
    overflow: auto;
  }

  .close-btn {
    position: absolute;
    top: 0;
    right: 0;
    width: 1rem;
    height: 1rem;
  }
}
</style>
