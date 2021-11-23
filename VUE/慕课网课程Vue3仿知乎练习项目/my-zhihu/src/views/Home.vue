<!--
 * @Description:
 * @Date: 2021-04-01 18:30:23
 * @LastEditTime: 2021-04-13 17:31:47
 * @FilePath: \my-zhihu\src\views\Home.vue
-->
<template>
  <div>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang='ts'>
import { defineComponent, computed, onMounted } from 'vue';
import ColumnList from '../components/ColumnList.vue';
import { useStore } from 'vuex';
import { GlobalDataProps } from '../store/index';

export default defineComponent({
  name: 'Home',
  components: {
    ColumnList,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    onMounted(() => {
      store.dispatch('fetchColumns');
    });
    const list = computed(() => store.state.columns);
    const biggerColumnLen = computed(() => store.getters.biggerColumnLen);

    return {
      list,
      store,
      biggerColumnLen,
    };
  },
});
</script>

<style>
</style>
