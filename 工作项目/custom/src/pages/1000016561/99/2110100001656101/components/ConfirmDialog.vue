<template>
  <!-- 确认选择弹窗 -->
  <div class="box">
    <img src="../assets/img/dialog/sure-hand-dialog-.png"
         class="popup">

    <div class="btn-group">
      <!-- 去店铺按钮 -->
      <a class="btn" style="display: block" href="https://shop.m.jd.com/?shopId=1000016561"></a>
      <!-- 确认助力按钮 -->
      <div class="btn" @click="sureAssistance()"></div>
    </div>

    <!-- 关闭按钮 -->
    <div class="close-btn"
         @click="closeDialog('confirmDialog')"></div>
  </div>
</template>

<script lang='ts' setup>
import { defineEmits, defineProps, ref } from 'vue';

const props = defineProps({ baseInfo: Object });
const emit = defineEmits(['closeDialog', 'sureAssistance']);

const closeDialog = (name: any) => {
  emit('closeDialog', name);
};

const sureAssistance = () => {
  emit('sureAssistance', true);
};

</script>

<style lang='scss' scoped>
.box {
  position: relative;

  .popup {
    width: 6rem;
  }

  .btn-group {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 100%;
    position: absolute;
    bottom: .8rem;

    .btn {
      width: 1.5rem;
      height: .5rem;
    }
  }

  .close-btn {
    position: absolute;
    top: .2rem;
    right: 0.3rem;
    width: 1rem;
    height: 1rem;
    overflow: auto;
    word-break: break-all;
  }
}
</style>
