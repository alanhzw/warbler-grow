<!--
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-07-18 15:07:30
 * @LastEditTime: 2021-07-20 17:48:49
 * @FilePath: \vite-project-js\src\components\A.vue
-->
<template>
  <div>
    <h1>我是页面A啊</h1>

    <comp></comp>

  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import comp from './comp.vue';
export default defineComponent({
  name: '',
  components: {
    comp,
  },
  beforeEnter: (to, from) => {
    console.log('🚀🚀~ beforeEnter ');
  },

  beforeRouteEnter(to, from, next) {
    console.log('🚀🚀~ beforeRouteEnter');
    next(() => {
      console.log('🚀🚀~ 阿桑大事大撒:');
    });
  },
  beforeRouteUpdate(to, from) {
    console.log('🚀🚀~ beforeRouteUpdate');
  },
  beforeRouteLeave(to, from) {
    console.log('🚀🚀~ beforeRouteLeave');
  },
  setup() {
    return {};
  },
});
</script>

<style lang='scss'>
</style>
