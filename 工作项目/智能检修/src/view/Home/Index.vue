<!--
 * @Description:
 *     首页
 * @Author:SXW
 * @Date: 2021-05-05
 * @LastEditTime: 2021-06-20
 * @FilePath: \intelligent-overhaul-app\src\view\Home\Index.vue
-->
<template>
  <div class="home">
    <card />
    <order-nav />
    <orders />
  </div>
</template>
<script setup>
import Card from './Card.vue';
import OrderNav from './OrderNav.vue';
import Orders from './Orders.vue';
import { getStatData } from './store/statData';
import { useStore } from 'vuex';
import { ref,reactive,computed } from 'vue';

const beforeInfo = computed(() => store.state.user.beforeInfo)

const store = useStore()

// getStatData();
if(beforeInfo.value.loginFlg ==1 || beforeInfo.value.loginFlg==2){
  getStatData();
}

</script>
<style lang="scss" scoped>
.home {
 background-color: #F0F3F7
}
</style>
