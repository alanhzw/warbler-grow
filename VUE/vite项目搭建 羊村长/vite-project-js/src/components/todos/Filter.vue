<!--
 * @Description:
 * @Date: 2021-03-26 15:22:09
 * @LastEditTime: 2021-04-16 12:17:28
 * @FilePath: \vite-project-js\src\components\todos\Filter.vue
-->
<template>
  <p class="filters">
    <span class="text" v-for="item in items" :key='item.value' @click='$emit("update:modelValue",item.value)' :class="{selected:modelValue===item.value}">{{item.label}}</span>
  </p>
</template>

<script>
export default {
  props: ['items', 'modelValue'],
  emits: ['update:modelValue'],

};
</script>

<style lang="scss" scoped>
.filters span {
  padding: 2px 4px;
  margin-right: 4px;
  border: 1px solid transparent;
}

.filters > span.selected {
  border-color: red;
}
.text {
  font-size: 100px;
}
</style>