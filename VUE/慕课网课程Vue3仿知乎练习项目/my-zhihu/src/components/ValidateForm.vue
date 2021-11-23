<!--
 * @Description:
 * @Date: 2021-04-01 11:21:31
 * @LastEditTime: 2021-04-02 17:58:13
 * @FilePath: \my-zhihu\src\components\ValidateForm.vue
-->
<template>
  <form class='valid-form-container'>
    <slot name='default'></slot>
    <div class="submit-area" @click.prevent='submitForm'>
      <slot name='submit'>
        <button type="submit" class='btn btn-primary'>提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang='ts'>
import { defineComponent, onUnmounted } from 'vue';
import mitt, { Emitter } from 'mitt';
export const emitter: Emitter = mitt();

type ValidateFunc = () => boolean;

export default defineComponent({
  name: 'ValidateForm',
  emits: ['form-submit'],
  setup(props, { emit }) {
    let funcArr: ValidateFunc[] = [];
    const submitForm = () => {
      const result = funcArr.map((func) => func()).every((result) => result);
      emit('form-submit', result);
    };
    const callback = (func: ValidateFunc | undefined) => {
      funcArr.push(func as ValidateFunc);
    };
    emitter.on('form-item-created', callback);
    onUnmounted(() => {
      emitter.off('form-item-created', callback);
      funcArr = [];
    });
    return {
      submitForm,
      callback,
    };
  },
});
</script>

<style>
</style>
