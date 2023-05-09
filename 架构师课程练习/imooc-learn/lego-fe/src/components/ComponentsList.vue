<!--
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2022-05-24 16:21:01
 * @LastEditTime: 2023-03-07 13:50:31
 * @FilePath: \lego-fe\src\components\ComponentsList.vue
-->
<template>
  <div class="create-component-list">
    <div
      v-for="(item, index) in list"
      @click="onItemClick(item)"
      class="component-item"
      :key="index">
      <l-text v-bind="item"></l-text>
    </div>
  </div>
</template>

<script setup lang="ts">
import LText from '../components/LText.vue';
import { defineProps, withDefaults, defineEmits } from 'vue';
import { PartialTextComponentProps } from '../defaultProps';
interface MyProps {
  list: Array<PartialTextComponentProps>;
}
// 接收 TemplatesData 数据
const props = withDefaults(defineProps<MyProps>(), {
  list: () => [],
});
console.log('🚀🚀 ~ props', props);

const emit = defineEmits<{
  (e: 'on-item-click', data: PartialTextComponentProps): void;
  (e: 'on-item-click', data: PartialTextComponentProps): void;
}>();

// 点击发射事件
const onItemClick = (data: PartialTextComponentProps) => {
  emit('on-item-click', data);
};

const onImageUploaded = (resp: any) => {
  //
};
</script>

<style scoped></style>
