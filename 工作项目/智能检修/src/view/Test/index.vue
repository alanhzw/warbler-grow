<template>
  <div>
    <h3>Test</h3>
    <!-- <p>{{JSON.stringify(data)}}</p>
    <p @click="changeUser">{{user}}</p>

    <p v-for="order in orders.list" :key="order.id" @click="getOrderDetail(order.id)">
      {{order.id}}
    </p>
    <p>
      {{orderDetail}}
    </p> -->
  </div>
</template>
<script setup>
// import { statData, getStatData } from './statData'
// getStatData();

import useStatData from '../Home/store/statData';
const { statData, getStatData } = useStatData();
getStatData();
</script>