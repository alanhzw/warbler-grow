<template>
  <!-- 京豆来源记录弹窗 -->
  <div class="popup">
    <div class="box">
      <img src="../assets/Jd-dialog.png"
           class="popup">

      <!-- 数据 -->
      <div v-if="JdSourceList.length > 0" class="overflow">
        <div v-for="item in JdSourceList" :key="item" class="data-view">
          <div class="data-one" style="width: 33%">{{ item.jingdou }}京豆</div>
          <div class="data-one">下单{{ item.gmv }}元</div>
          <div class="data-one">{{ item.createTime }}</div>
        </div>
      </div>
      <div v-else class="none-data" style="position: absolute;top: 2.7rem;width: 99%">暂无京豆数据</div>

      <!-- 关闭按钮 -->
      <div class="close-btn"
           @click="closeDialog('jdSourceDialog')"></div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  JdSourceList: Array,
});
const emit = defineEmits(['closeDialog']);

const closeDialog = (name: any) => {
  emit('closeDialog', name);
};
</script>

<style lang='scss' scoped>
.box {
  position: relative;

  .popup {
    width: 6rem;
  }

  .overflow {
    position: absolute;
    top: 2rem;
    width: 100%;
    height: 4.8rem;
    overflow-y: auto;

    .data-view {
      display: flex;
      justify-content: center;
      align-content: center;
      width: 100%;
      padding: 0 .2rem;
      box-sizing: border-box;
      font-size: .26rem;
      line-height: .6rem;

      .data-one {
        width: 34%;
        text-align: center;
      }
    }
  }

  .close-btn {
    position: absolute;
    bottom: 0;
    left: 1.3rem;
    width: 3.5rem;
    height: 1rem;
    overflow: auto;
    word-break: break-all;
  }
}
</style>
