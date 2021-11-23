<!--
 * @Description:
 * @Date: 2021-03-29 18:50:51
 * @LastEditTime: 2021-04-10 16:59:16
 * @FilePath: \my-zhihu\src\components\ColumnList.vue
-->

<template>
  <div class="row">
    <div class="col-4 mb-4" v-for='column in columnList' :key='column.title'>
      <div class="card h-100 shadow-sm" style="width: 18rem;">
        <div class="card-body text-center">
          <img :src="column.avatar" :alt='column.title' class="rounded-circle border border-light w-25 my-3">
          <h5 class="card-title">{{column.title}}</h5>
          <p class="card-text text-left">{{column.description}}</p>
          <router-link :to="`/column/${column.id}`" class="btn btn-outline-primary">进入专栏</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, computed } from 'vue';

import { ColumnProps } from '../data/testData';

import icon from '../assets/logo.png';

export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      require: true,
    },
  },
  setup(props) {
    const columnList = computed(() => {
      return props.list?.map((column) => {
        if (!column?.avatar) {
          column.avatar = icon;
        }
        return column;
      });
    });
    return {
      columnList,
    };
  },
});
</script>

<style >
</style>
