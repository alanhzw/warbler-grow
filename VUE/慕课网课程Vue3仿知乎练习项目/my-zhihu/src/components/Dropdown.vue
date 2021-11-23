<!--
 * @Description:
 * @Date: 2021-03-30 18:32:29
 * @LastEditTime: 2021-05-03 12:19:22
 * @FilePath: \my-zhihu\src\components\Dropdown.vue
-->
<template>
  <div class="dropdown" ref='dropdownRef'>
    <a class="btn btn-outline-light my-2 dropdown-toggle" href="#" @click.prevent='toggleOpen'>
      {{title}}
    </a>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink" :style='{display:"block"}' v-if="isOpen">
      <slot></slot>
    </ul>
  </div>
  <div ref='test111'></div>
</template>

<script lang='ts'>
import { defineComponent, ref, watch } from 'vue';

import useClickOutside from '../hooks/useClickOutside';
export default defineComponent({
  name: 'DropDown',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    const isOpen = ref(false);
    const toggleOpen = () => {
      isOpen.value = !isOpen.value;
    };
    const dropdownRef = ref<null | HTMLElement>(null);
    console.log('🚀🚀~ dropdownRef:', dropdownRef);
    const test111 = ref<null | HTMLElement>(null);
    console.log('🚀🚀~ test111:', test111);
    const isClickOutside = useClickOutside(dropdownRef);

    watch(isClickOutside, () => {
      if (isOpen.value && isClickOutside.value) {
        isOpen.value = false;
      }
    });
    return {
      toggleOpen,
      isOpen,
      dropdownRef,
      isClickOutside,
    };
  },
});
</script>

<style>
</style>
