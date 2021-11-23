<!--
 * @Description:
 *      知网/诊断嵌套的页面
 * @Author:HJ
 * @Date: 2021-05-05
 * @LastEditTime: 2021-06-20
 * @FilePath: \intelligent-overhaul-app\src\view\WorkOrder\Frame.vue
-->
<template>
  <iframe class="order-frame" :src="src"></iframe>
</template>
<script setup>
import { defineProps,computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
const store = useStore();
const orderInfo = computed(() => store.state.order.current);

const route = useRoute();

let prefix = '';
let tmpSrc = '';
// 知网
if (route.name === 'WorkOrderCheck') {
  prefix = import.meta.env.VITE_APP_BASEZWURL
  tmpSrc = `${prefix}${orderInfo.value.id}`
}
// 诊断
if (route.name === 'WorkOrderDefects') {
  prefix = import.meta.env.VITE_APP_BASEZDURL
  tmpSrc = `${prefix}${orderInfo.value.clientDocumentNo}`
}

const src = tmpSrc
</script>
<style lang="scss" scoped>
.order-frame {
  flex: 1;
  border: 0;
  width: 100vw;
}
</style>