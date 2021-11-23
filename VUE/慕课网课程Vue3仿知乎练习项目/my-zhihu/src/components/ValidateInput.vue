<!--
 * @Description:
 * @Date: 2021-03-31 19:28:08
 * @LastEditTime: 2021-04-25 10:39:02
 * @FilePath: \my-zhihu\src\components\ValidateInput.vue
-->
<template>
  <div class="validate-input-container pb-3">
    <input v-if='tag!=="textarea"' class="form-control" :class="{'is-invalid':inputRef.error}" v-model="inputRef.val" @blur='validateInput' v-bind="$attrs">
    <textarea v-else class="form-control" :class="{'is-invalid':inputRef.error}" v-model="inputRef.val" @blur='validateInput' v-bind="$attrs"></textarea>
    <span v-if='inputRef.error' class="invalid-feedback">{{inputRef.message}}</span>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, reactive, onMounted, watch, computed } from 'vue';
import { emailReg, RulesProp, TagType } from '../data/testData';
import { emitter } from './ValidateForm.vue';

export default defineComponent({
  name: 'ValidateInput',
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String,
    tag: {
      type: String as PropType<TagType>,
      default: 'input',
    },
  },
  inheritAttrs: false, // 根元素不继承$attrs
  emits: ['update:modelValue'],
  setup(props, context) {
    const inputRef = reactive({
      val: computed({
        get: () => props.modelValue || '',
        set: (val) => {
          context.emit('update:modelValue', val);
        },
      }),
      error: false,
      message: '',
    });
    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every((rule) => {
          let passed = true;
          inputRef.message = rule.message;
          switch (rule.type) {
            case 'required':
              passed = inputRef.val.trim() !== '';
              break;
            case 'email':
              passed = emailReg.test(inputRef.val);
              break;
            case 'custom':
              passed = rule.validator ? rule.validator() : true;
              break;
            default:
              break;
          }
          return passed;
        });
        inputRef.error = !allPassed;
        return allPassed;
      }
      return true;
    };

    // const updatValue = (e: Event) => {
    //   const targetValue = (e.target as HTMLInputElement).value;
    //   inputRef.val = targetValue;
    //   context.emit('update:modelValue', targetValue);
    // };

    // watch(
    //   () => props.modelValue,
    //   (newValue) => {
    //     inputRef.val = newValue || '';
    //   }
    // );
    onMounted(() => {
      emitter.emit('form-item-created', validateInput);
    });
    return {
      inputRef,
      validateInput,
      // updatValue,
    };
  },
});
</script>

<style>
</style>
