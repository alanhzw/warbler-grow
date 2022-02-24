<template>
  <div class="end">
    <div class="mar-bo-144">
      <div v-if="props.codeStatus">
        <img
          src="//img10.360buyimg.com/imgzone/jfs/t1/216560/11/10311/4492/61d7d558Ea7ad0542/43aab0d49102d3dc.png"
          class="end-icon"
        />
        <p class="end-titel">恭喜，礼品领取成功！</p>
      </div>
      <div v-else>
        <img
          src="//img10.360buyimg.com/imgzone/jfs/t1/157617/21/25504/3876/61d7d558E31a5661c/a6db1535eeaed33a.png"
          class="end-icon"
        />
        <p class="end-titel">礼品领取失败！</p>
      </div>
    </div>
    <div>
      <div @click="back" class="button back">返回卡券中心</div>
      <div @click="goShop" class="button go-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, ref, defineProps, defineEmits } from 'vue';

const emit = defineEmits(['endBack', 'goShop']);

const codeUrl = ref('');
const props = defineProps({
  codeStatus: {
    type: Boolean,
    default: () => (true),
  },
});

const back = () => {
  emit('endBack');
};

const goShop = () => {
  emit('goShop');
};

</script>

<style lang="scss">
</style>
