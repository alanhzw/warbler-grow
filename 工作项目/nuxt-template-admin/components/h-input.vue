<!--
 * @Author: 一尾流莺
 * @Description:输入框组件
 * @Date: 2021-12-15 13:12:58
 * @LastEditTime: 2021-12-17 11:55:21
 * @FilePath: \nuxt-template-admin\components\h-input.vue
-->
<template>
  <div class='h-input'>
    <div class="label"
         :style="`width:${labelWidth}`"
         v-if='label'>{{label}} :</div>
    <input class="h-input-inner"
           v-if='type==="text"'
           v-model="inputValue"
           :style="`width:${width}`"
           @change='validateInput'
           v-bind='$attrs'>
    <textarea class="h-input-inner"
              v-if='type==="textarea"'
              v-model="inputValue"
              :style="`width:${width};min-height:120px`"
              @change='validateInput'
              v-bind='$attrs'
              cols="50"
              rows="50"></textarea>
  </div>
</template>


<script lang='ts'>
export default {
  inheritAttrs: false,
}
</script>

<script lang='ts' setup>
import { emitter } from '~~/composables/useMitt'
import { handlerValidateInput, InputValidators } from './typescript/input'
interface InputProps {
  rules?: InputValidators
  modelValue: string
  label?: string
  width?: string
  labelWidth?: string
  type: string
}
const props = withDefaults(defineProps<InputProps>(), {
  rules: () => [],
  modelValue: '',
  label: '',
  width: '238px',
  labelWidth: '',
  type: 'text',
})
const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
}>()

// 输入框绑定值
const inputValue = computed({
  get: () => props.modelValue || '',
  set: (val) => {
    emit('update:modelValue', val)
  },
})

// 是否产生错误(没有通过验证)
const error = ref(false)
// 错误信息
const message = ref('')

// 验证函数
const validateInput = () => {
  // 循环rules数组 返回结果  every若有一个没通过返回false  全通过返回true
  const isAllPass = props.rules?.every((rule) => {
    // 赋值错误信息
    message.value = rule.message
    // 执行验证函数
    return handlerValidateInput(inputValue.value, rule)
  })
  console.log('🚀🚀~ isAllPass:', isAllPass, props.rules)
  // 如果有没通过的验证,则激活error错误开关
  error.value = !isAllPass
  if (!isAllPass) {
    // createMessage({ type: 'error', message: inputRef.message })
    console.log('🚀🚀~ 出错了:', message.value)
  }
  return isAllPass
}

// 初始化的时候执行form-item-created,向form组件添加验证函数
onMounted(() => {
  emitter.emit('form-item-created', validateInput)
})
</script>

<style lang='scss' scoped>
.h-input {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .label {
    white-space: nowrap;
    margin-right: 10px;
    text-align: right;
  }
  .h-input-inner {
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