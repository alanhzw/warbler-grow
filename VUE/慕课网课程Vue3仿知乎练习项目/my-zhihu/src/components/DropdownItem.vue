<!--
 * @Description:
 * @Date: 2021-03-31 15:21:54
 * @LastEditTime: 2021-03-31 18:07:01
 * @FilePath: \my-zhihu\src\components\DropdownItem.vue
-->
<template>
  <li class="dropdown-option" :class="{'is-disabled':disabled}">
    <slot></slot>
  </li>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DropdownItem',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style>
.dropdown-option.is-disabled * {
  color: #6c757d;
  cursor: no-drop;
  pointer-events: none;
  background-color: transparent;
}
</style>
