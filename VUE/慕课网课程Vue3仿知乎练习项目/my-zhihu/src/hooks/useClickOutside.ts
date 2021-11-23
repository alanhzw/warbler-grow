/*
 * @Description:判断点击的位置是否是一个元素的外面
 * @Date: 2021-03-31 17:49:28
 * @LastEditTime: 2021-05-03 11:55:22
 * @FilePath: \my-zhihu\src\hooks\useClickOutside.ts
 */
import { onMounted, onUnmounted, ref, Ref } from 'vue';

// 参数如果传入dom节点 setup中调用是不会变化的  所以需要一个响应式对象

const useClickOutside = (elementRef: Ref<null | HTMLElement>): Ref<boolean> => {
  console.log('🚀🚀~ useClickOutside:', useClickOutside);
  const isClickOutside = ref(false);

  const handler = (e: MouseEvent) => {
    if (elementRef.value) {
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false;
      } else {
        isClickOutside.value = true;
      }
    }
  };
  onMounted(() => {
    document.addEventListener('click', handler);
  });
  onUnmounted(() => {
    document.removeEventListener('click', handler);
  });

  return isClickOutside;
};

export default useClickOutside;
