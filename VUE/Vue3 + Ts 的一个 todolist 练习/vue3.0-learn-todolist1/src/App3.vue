<!--
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-11-02 16:58:13
 * @LastEditTime: 2021-11-02 16:59:14
 * @FilePath: \Vue3 + Ts 的一个 todolist 练习\vue3.0-learn-todolist1\src\App3.vue
-->
<template>
  <div class=''>
    123
  </div>
</template>

<script lang='ts' setup>
import { arrObjectWithoutDupli } from 'warbler-js'
const fruits = [
  { name: 'Grapes', quantity: 2 },
  { name: 'Bananas', quantity: 5 },
  { name: 'Apples', quantity: 10 },
  { name: 'Grapes', quantity: 4 },
  { name: 'Grapes', quantity: 6 },
]
const result = arrObjectWithoutDupli(fruits, 'name')
console.log(result)
</script>

<style lang='scss'>
</style>
