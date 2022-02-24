<!--
 * @Author: 一尾流莺
 * @Description:消息提示组件
 * @Date: 2021-12-15 13:13:39
 * @LastEditTime: 2021-12-18 16:34:17
 * @FilePath: \nuxt-template-admin\components\h-message.vue
-->
<template>
  <!-- 过渡效果 淡入淡出 并且移动一个身位 -->
  <transition name='message'
              @after-leave="$emit('destroy')">
    <div :class="classes"
         v-show='visible'
         class="h-message"
         :style='styles'>
      {{message}}
    </div>
  </transition>
</template>

<script lang='ts' setup>
// 类型
type MessageType = 'success' | 'error'

interface InputProps {
  offsetNumber?: number
  duration?: number
  message?: string
  type?: MessageType
}
const props = withDefaults(defineProps<InputProps>(), {
  message: '',
  duration: 2000,
  offsetNumber: 0,
  type: 'success',
})
// 决定样式
const classes = computed(() => ['message-' + props.type])

const visible = ref(false)

// 几秒钟以后消失
let timer: any = null
const startTimer = () => {
  timer = setTimeout(() => {
    visible.value = false
  }, props.duration)
}
const styles = computed(() => {
  return { top: `${(props.offsetNumber - 1) * 55 + 90}px` }
})
// 组件渲染完了显示
onMounted(() => {
  visible.value = true
  // 开启定时器
  startTimer()
})
onUnmounted(() => {
  clearTimeout(timer)
})
</script>

<style lang='scss'>
.h-message {
  font-size: 14px;
  width: 380px;
  line-height: 45px;
  text-align: center;
  position: fixed;
  left: 50%;
  color: #fff;
  z-index: 2005;
  transform: translateX(-50%);
  transition: top 0.3s;
  border-radius: 4px;
}
.message-success {
  border: 1px solid #e1f3d8;
  color: #67c23a;
  background: #f0f9eb;
}
.message-error {
  border: 1px solid #fde2e2;
  color: #f56c6c;
  background: #fef0f0;
}
// 渐入渐出效果
.message-enter-active,
.message-leave-active {
  transition: all 0.3s ease;
}
.message-enter-to,
.message-leave-from {
  opacity: 1;
}
.message-enter-from,
.message-leave-to {
  transform: translate(-50%, -100%);
  opacity: 0;
}
</style>