<!--
 * @Author: 一尾流莺
 * @Description:表单组件
 * @Date: 2021-12-15 13:13:10
 * @LastEditTime: 2021-12-16 10:41:13
 * @FilePath: \nuxt-template-admin\components\h-form.vue
-->
<template>
  <form class='h-form'>
    <slot name='default'></slot>
  </form>
</template>

<script lang='ts' setup>
import { emitter } from '~~/composables/useMitt'
type ValidateFunc = () => boolean

// 声明一个空数组  用来存放所有的验证函数
let funcArr: ValidateFunc[] = []
// 验证函数
const submitForm = () => {
  // 获取所有item的验证结果,有一个没有通过返回false 否则返回true
  const result = funcArr.every((func) => func())
  return result
}
// 把item的验证函数添加到数组中
const addValidator = (func: ValidateFunc | undefined) => {
  funcArr.push(func as ValidateFunc)
}
// 监听form-item-created事件,当有item触发的时候把验证函数添加到数组中
emitter.on('form-item-created', addValidator)
// 组件卸载的时候移除监听事件,数组重置为空
onUnmounted(() => {
  emitter.off('form-item-created', addValidator)
  funcArr = []
})

defineExpose<{
  submitForm: Function
}>({
  submitForm,
})
</script>

<style lang='scss' scoped>
.h-form {
}
</style>