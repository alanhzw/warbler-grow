<!--
 * @Description:
 *     完结工单
 * @Author:LJN
 * @Date: 2021-05-05
 * @LastEditTime: 2021-06-20
 * @FilePath: \intelligent-overhaul-app\src\view\OrderNavs\FinishedOrders.vue
-->
<template>
  <div class="header" v-if="user.userType != 2">
    <span>共{{ orderData.page.total }}个完结工单</span>
    <img src="../../assets/icon-funnel.png" @click="isShow = true" />
  </div>
  <div class="order-list">
    <blank-tip v-if="orderData.list.length == 0"/>
    <load-more @load="orderLoad">
      <order :type="user.userType == 2 ? 2 : 1" v-for="order in orderData.list" :key="`order-${order.id}`" :info="order" @click="showOrder(order.id)"/>
    </load-more>
  </div>
  <van-popup v-model:show="isShow" position="bottom" :style="{ height: '95%' }">
    <popup-filter-leader v-if="isShow" @close="onClose" @changeData="getFininshedOrders" />
  </van-popup>
</template>

<script setup>
import { getService } from '../../service';
import { ref, reactive, watch, computed } from 'vue';
import { useRouter} from 'vue-router';
import Order from '../../components/Order.vue';
import PopupFilterLeader from '../../components/PopupFilterLeader.vue';
import BlankTip from '../../components/BlankTip.vue';
import LoadMore from '../../components/LoadMore.vue';
import { useStore } from 'vuex';

const isShow = ref(false)

const orderData = reactive({
  list: [],
  page: {
    pageNo: 1,
    pageSize: 10,
    total: 0,
  },
  data: {}
})

const store = useStore()
const user = computed(() => store.state.user.info)

const typeIndex = user.value.userType == 1 ? 1 : user.value.userType == 2 ? 2 : 3
const orderType = computed(() => [ null, 7, 6, 4 ][typeIndex])

const service = getService()

const getFininshedOrders = (params) => {
  orderData.page.pageNo = 1
  if(params){
    orderData.data = Object.assign(orderData.data,params)
  }
  service.getOrders({
    type: orderType.value,
    ...orderData.data,
    ...orderData.page
  }).then(res => {
    orderData.list = res.records;
    orderData.page.total = res.total;
    orderData.page.pageNo = res.current;
  })
}
getFininshedOrders();

const orderLoad = () => {
  service.getOrders({
    type: orderType.value,
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

const router = useRouter();

const showOrder = (id) => {
  router.push(`/h5/order/${id}/detail`)
}

const onClose = () => {
  isShow.value = false;
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