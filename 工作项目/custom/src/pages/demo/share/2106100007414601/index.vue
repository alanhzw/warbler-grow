<template>
  <div>
    <cell-group title="页面列表">
      <cell @click="openTestPage" title="跳转到test页面" value="" is-link></cell>
    </cell-group>
    <comp/>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { CellGroup, Cell } from 'vant';
import { useRouter } from 'vue-router';
import { BaseInfo } from '@/types/BaseInfo';
import Comp from './components/Comp.vue';

const router = useRouter();
const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;

window.document.title = '首页';

const openTestPage = () => {
  router.push('test');
};

</script>

<style scoped>
</style>
