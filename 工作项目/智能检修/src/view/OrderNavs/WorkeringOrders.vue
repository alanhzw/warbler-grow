<!--
 * @Description:
 *     进行中的工单
 * @Author:HJ
 * @Date: 2021-05-05
 * @LastEditTime: 2021-06-01
 * @FilePath: \intelligent-overhaul-app\src\view\OrderNavs\WorkeringOrders.vue
-->
<template>
  <!-- <div class="header">
    <span>共{{ orderData.page.total }}个进行中工单</span>
    <img src="../../assets/icon-funnel.png"/>
  </div> -->
  <div class="order-list">
    <blank-tip v-if="orderData.list.length == 0"/>
    <load-more @load="orderLoad">
      <order :type="2" v-for="order in orderData.list" :key="`order-${order.id}`" :info="order" @click="showOrder(order.id)"/>
    </load-more>
  </div>
</template>

<script setup>
import { getService } from '../../service';
import { reactive, computed } from 'vue';
import { useRouter} from 'vue-router';
import Order from '../../components/Order.vue';
import BlankTip from '../../components/BlankTip.vue';
import LoadMore from '../../components/LoadMore.vue';
import { useStore } from 'vuex';

const orderData = reactive({
  list: [],
  page: {
    pageNo: 1,
    pageSize: 10,
    total: 0,
  }
})

const store = useStore()
const user = computed(() => store.state.user.info)

const service = getService()

const orderLoad = (type = 3) => {
  service.getOrders({
    type: type,
    ...orderData.data,
    ...orderData.page,
    pageNo: orderData.page.pageNo + 1
  }).then(res => {
    orderData.list = orderData.list.concat(res.records)
    orderData.page.total = res.total;
    if (res.records.length > 0) {
      orderData.page.pageNo = res.current;
    }
  })
}

const getWorkeringOrders = (type = 3) => {
  service.getOrders({
    type,
    ...orderData.page
  }).then(res => {
    orderData.list = res.records;
    orderData.page.total = res.total;
    orderData.page.pageNo = res.current;
  })
}
getWorkeringOrders();

const router = useRouter();
const showOrder = (id) => {
  router.push(`/h5/order/${id}/detail`)
}

</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  margin: 0.3rem 0;
  padding: 0 0.3rem;
  img {
    width: 0.4rem;
    height: 0.4rem;
  }
}
.order-list  {
  display: flex;
  flex-direction: column;
  padding: 0 0.3rem;
  flex: 1;
  overflow: scroll;
  height: 100vh;
}
</style>