<!--
 * @Description:
 * @Date: 2021-04-14 16:07:41
 * @LastEditTime: 2021-04-22 15:18:42
 * @FilePath: \my-zhihu\src\components\Modal.vue
-->
<template>
  <teleport to='#modal'>
    <div class="modal d-block" tabindex="-1" v-if="visible">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{title}}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" @click="onClose" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <slot>
            </slot>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="onClose">取消</button>
            <button type="button" class="btn btn-primary" @click="onConfirm">确认</button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import useDOMCreate from '../hooks/useDOMCreate';

export default defineComponent({
  name: 'Modal',
  props: {
    title: {
      type: String,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['modal-on-close', 'modal-on-confirm'],
  setup(props, { emit }) {
    useDOMCreate('modal');
    const onClose = () => {
      emit('modal-on-close');
    };
    const onConfirm = () => {
      emit('modal-on-confirm');
    };
    return {
      onClose,
      onConfirm,
    };
  },
});
</script>

<style>
</style>
