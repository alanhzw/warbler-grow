/*
 * @Description:
 * @Date: 2021-04-14 18:05:44
 * @LastEditTime: 2021-04-14 18:30:37
 * @FilePath: \my-zhihu\src\hooks\useLoadMore.ts
 */
import { useStore } from 'vuex';
import { ref, computed, ComputedRef, Ref } from 'vue';

interface LoadParames {
  currentPage: number;
  pageSize: number;
}
const useLoadMore = (
  actionName: string,
  total: ComputedRef<number>,
  params: LoadParames = { currentPage: 2, pageSize: 5 }
) => {
  const store = useStore();
  const currentPage = ref(params.currentPage);
  const requireParams = computed(() => ({
    currentPage: currentPage.value,
    pageSize: params.pageSize,
  }));
  const loadMorePage = () => {
    store.dispatch(actionName, requireParams).then(() => {
      currentPage.value++;
    });
  };
  const isLastPage = computed(() => {
    return Math.ceil(total.value / params.pageSize) < currentPage.value;
  });
  return {
    loadMorePage,
    isLastPage,
    currentPage,
  };
};

export default useLoadMore;
