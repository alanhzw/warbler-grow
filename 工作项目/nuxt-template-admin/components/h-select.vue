<!--
 * @Author: 一尾流莺
 * @Description:下拉选择组件
 * @Date: 2021-12-15 13:13:29
 * @LastEditTime: 2021-12-17 11:55:29
 * @FilePath: \nuxt-template-admin\components\h-select.vue
-->
<template>
  <div class='h-select'>
    <div class="label"
         :style="`width:${labelWidth}`"
         v-if='label'>{{label}} :</div>
    <select class="h-select-inner"
            v-model='selectValue'
            :style="`width:${width}`"
            v-bind='$attrs'>
      <option v-for='item in options'
              :key='item.value'>{{item.label}}</option>
    </select>
  </div>
</template>

<script lang='ts'>
export default {
  inheritAttrs: false,
}
</script>
<script lang='ts' setup>
interface Option {
  value: string | number
  label: string
}

export type Options = Option[]

interface SelectProps {
  modelValue: string | number
  label?: string
  options: Options
  width?: string
  labelWidth?: string
}
const props = withDefaults(defineProps<SelectProps>(), {
  modelValue: '',
  label: '',
  options: () => [],
  width: '238px',
  labelWidth: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: string | number): void
  (e: 'change', val: string): void
}>()

// 下拉框绑定值
const selectValue = computed({
  get: () =>
    props.options.find((option) => option.value === props.modelValue)?.label ||
    '',
  set: (val) => {
    emit(
      'update:modelValue',
      props.options.find((option) => option.label === val).value,
    )
  },
})
</script>

<style lang='scss' scoped>
.h-select {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .label {
    white-space: nowrap;
    margin-right: 10px;
    text-align: right;
  }
  .h-select-inner {
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 30px;
    line-height: 30px;
    outline: 0;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
  }
}
</style>