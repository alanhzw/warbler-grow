<!--
 * @Author: 一尾流莺
 * @Description:按钮组件
 * @Date: 2021-12-15 13:14:29
 * @LastEditTime: 2021-12-16 14:40:56
 * @FilePath: \nuxt-template-admin\components\h-button.vue
-->
<template>
  <div class='h-button'>
    <div class="btn">
      <a href="#">{{title}}</a>
    </div>
  </div>
</template>

<script lang='ts' setup>
interface ButtonProps {
  title?: string
}
const props = withDefaults(defineProps<ButtonProps>(), {
  title: '按钮',
})
</script>

<style lang='scss' scoped>
.h-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #dcdfe6;
  color: #606266;
  text-align: center;
  outline: 0;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  border-style: solid;
  background: #39f;
  border-color: transparent;
  min-width: 88px;

  a {
    color: #ffffff;
    text-decoration: none;
  }
  &:hover {
    background: #5daeff;
  }
}
</style>
