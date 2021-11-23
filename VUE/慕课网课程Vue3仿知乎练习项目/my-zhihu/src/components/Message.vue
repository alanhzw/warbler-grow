<!--
 * @Description:
 * @Date: 2021-04-11 18:08:13
 * @LastEditTime: 2021-04-12 11:44:06
 * @FilePath: \my-zhihu\src\components\Message.vue
-->
<template>
  <teleport to='#message'>
    <div class="alert  message-info fixed-top w-50 mx-auto d-flex justify-content-between mt-2" :class="classObject" v-if='isVisible'>
      <span>{{message}}</span>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click.prevent="hide"></button>
    </div>
  </teleport>
</template>

<script lang='ts'>
import { defineComponent, PropType, onUnmounted, ref } from 'vue';
export type MessageType = 'success' | 'error' | 'default';
import useDOMCreate from '../hooks/useDOMCreate';

export default defineComponent({
  name: 'Message',
  props: {
    message: {
      type: String,
      default: '',
    },
    type: {
      type: String as PropType<MessageType>,
      default: 'default',
    },
  },
  emits: ['close-message'],
  setup(props, { emit }) {
    const isVisible = ref(true);
    const classObject = {
      'alert-success': props.type === 'success',
      'alert-danger': props.type === 'error',
      'alert-primary': props.type === 'default',
    };
    const hide = () => {
      isVisible.value = false;
      emit('close-message', true);
    };
    useDOMCreate('message');
    return {
      classObject,
      isVisible,
      hide,
    };
  },
});
</script>

<style>
</style>
