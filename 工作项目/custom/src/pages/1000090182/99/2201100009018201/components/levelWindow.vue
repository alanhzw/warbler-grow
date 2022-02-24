<template>
    <div class="close-btn" @click="closeDialog()"></div>
    <div class="level-view">
      <div class="levelView-area">
        <div>{{levelInfo.level}}</div>
        <div class="levelView-area-name">{{levelInfo.points}}</div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  levelInfo: Array,
  default: () => [],
});
const emit = defineEmits(['closeWin']);
const closeDialog = () => {
  emit('closeWin');
};
</script>

<style lang='scss'>
.level-view{
  width: 5.15rem;
  height: 3.83rem;
  position: relative;
  background: url("../assets/level-view.png") no-repeat;
  background-size: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .levelView-area{
    height: 3.5rem;
    width: 80%;
    overflow: scroll;
    font-size: 0.3rem;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .levelView-area-name{
      text-align: center;
      width: 1.3rem;
      overflow-x: scroll;
      white-space: nowrap;
      word-break: keep-all;
    }
  }
}
.close-btn{
  width: 0.75rem;
  height: 0.75rem;
  position: absolute;
  top: 1rem;
  right: 0.3rem;
  background: url('../assets/closeBtn.png') no-repeat;
  background-size: 100%;
  z-index: 9999;
}
</style>
