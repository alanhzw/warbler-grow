<template>
  <!-- 未解锁弹窗 -->
  <div class="box">
    <img src="../assets/img/dialog/no-lock-dialog.png"
         class="popup">

    <div class="btn-group">
      <!-- 去店铺按钮 -->
      <a class="btn" style="display: block" href="https://shop.m.jd.com/?shopId=1000016561"></a>

      <!-- 关闭按钮 -->
      <div class="btn" @click="closeDialog('unlockDialog')"></div>
    </div>

    <!-- 关闭按钮 -->
    <div class="close-btn"
         @click="closeDialog('unlockDialog')"></div>
  </div>
</template>

<script lang='ts' setup>
import { defineEmits, defineProps } from 'vue';

const props = defineProps({ baseInfo: Object });
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
