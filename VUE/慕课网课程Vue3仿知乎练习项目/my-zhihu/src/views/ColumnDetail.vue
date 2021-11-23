<!--
 * @Description:
 * @Date: 2021-04-01 19:58:13
 * @LastEditTime: 2021-04-14 14:59:37
 * @FilePath: \my-zhihu\src\views\ColumnDetail.vue
-->
<template>
  <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center">
      <div class="col-3 text-center">
        <img :src="column?.avatar" :alt="column?.title" class="rounded-circle">
      </div>
      <div class="col-9">
        <h4>{{column?.title}}</h4>
        <p class="text-muted">{{column?.description}}</p>
      </div>
    </div>
    <post-list :list="list"></post-list>
    <button>编辑</button>
  </div>
</template>

<script lang='ts'>
import PostList from '../components/PostList.vue';
import { defineComponent, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { GlobalDataProps } from '../store/index';

export default defineComponent({
  components: { PostList },
  name: '',
  setup() {
    const store = useStore<GlobalDataProps>();

    const route = useRoute();
    const router = useRouter();
    const currentId = +route.params.id;
    const column = computed(() => store.getters.getColumnById(currentId));
    const list = computed(() => store.getters.getPostsByCid(currentId));
    onMounted(() => {
      store.dispatch('fetchColumn', currentId);
      store.dispatch('fetchPosts', currentId);
    });
    return {
      route,
      router,
      currentId,
      column,
      list,
      store,
    };
  },
});
</script>

<style>
</style>
