<!--
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2022-05-25 16:32:01
 * @LastEditTime: 2022-05-26 10:26:14
 * @FilePath: \lego-fe\src\components\EditWarpper.vue
-->
<template>
  <div class="edit-wrapper"
       :class="{ active: active }"
       @click="onItemClick">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, withDefaults } from 'vue';
interface Props {
  id: string;
  active: boolean;
}
// 接收数据
const props = withDefaults(defineProps<Props>(), {
  // 激活的时候添加样式,默认为 false
  active: false
})

const emit = defineEmits<{
  (e: 'set-active', id: string): void;
}>()
// 发射事件
const onItemClick = () => {
  emit('set-active', props.id)
}

</script>

<style scoped>
.edit-wrapper {
  padding: 0;
  cursor: pointer;
  border: 1px solid transparent;
  user-select: none;
}

.edit-wrapper:hover {
  border: 1px dashed #CCC;
}

.edit-wrapper.active {
  border: 1px solid #1890ff;
  user-select: none;
  z-index: 1000;
}
</style>