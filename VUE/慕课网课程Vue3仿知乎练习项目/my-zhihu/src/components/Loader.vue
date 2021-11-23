<!--
 * @Description:
 * @Date: 2021-04-10 16:23:34
 * @LastEditTime: 2021-04-14 16:28:16
 * @FilePath: \my-zhihu\src\components\Loader.vue
-->
<template>
  <Teleport to="#back">
    <div class="d-flex justify-content-center align-items-center h-100 loading-container" :style='{backgroundColor:background}'>
      <div class="loading-content">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only"></span>
        </div>
        <p v-if='text' class="text-primary small">{{text}}</p>
      </div>
    </div>
  </Teleport>
</template>

<script lang='ts'>
import { defineComponent, onUnmounted } from 'vue';
import useDOMCreate from '../hooks/useDOMCreate';

export default defineComponent({
  name: '',
  props: {
    text: {
      type: String,
      default: '',
    },
    background: {
      type: String,
      default: '',
    },
  },
  setup() {
    useDOMCreate('back');
    return {};
  },
});
</script>

<style>
.loading-content {
  text-align: center;
}
.loading-container {
  background: rgba(255, 255, 255, 0.5);
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>
