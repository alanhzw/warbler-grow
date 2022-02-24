<template>
  <div>
    <comp />
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
</script>

<style scoped></style>
