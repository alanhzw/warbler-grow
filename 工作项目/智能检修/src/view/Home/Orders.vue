<!--
 * @Description:
 *     首页的组件
 * @Author:LJN
 * @Date: 2021-05-05
 * @LastEditTime: 2021-05-20
 * @FilePath: \intelligent-overhaul-app\src\view\Home\Orders.vue
-->
<template>
  <div class="home-orders">
    <header>
      <van-tabs class="van-tab1" v-model:active="active" v-if="user.userType == 1 || user.userType == 2" >
        <van-tab name="1" title="本周工单" />
        <van-tab name="2">
          <template #title> 待派单<span class="tab-count">({{statData.sendNumber}})</span></template>
        </van-tab>
        <van-tab v-if="user.userType==1" name="4">
          <template #title> 待验收<span class="tab-count">({{statData.checkNumber}})</span></template>
        </van-tab>
        <van-tab v-if="user.userType==2" name="4">
          <template #title> 待自检<span class="tab-count">({{statData.selfCheckNumber}})</span></template>
        </van-tab>
      </van-tabs>
      <van-tabs class="van-tab2" v-model:active="active" v-else-if="user.userType == 'F1' || user.userType == 'F2'">
        <van-tab name="1" title="本周工单" />
        <van-tab name="2">
          <template #title> 待验收<span class="tab-count">({{statData.checkNumber}})</span></template>
        </van-tab>
      </van-tabs>
      <div v-else style="font-size: 0.28rem;font-weight: 500">本周工单</div>
      <div style="flex: 1"></div>
      <div>
        <img v-role="'mobile:batchDispatch'" v-if="user.userType==1&&active==2&&!selecting" class="btn-img" src="../../assets/icon-checker.png" @click="selecting=true">
        <img v-if="user.userType!=2 && user.userType!=3 && active ==1" class="btn-img" src="../../assets/icon-funnel.png" @click="filterShowed=true">
      </div>
    </header>
    <div class="order-list">
      <van-checkbox-group v-model="orderData.selected">
        <!-- <p class="tip" ></p> -->
        <blank-tip v-if="orderData.list.length === 0" text="暂无工单"/>
        <load-more @load="load">
          <div class="order-wrapper" :class="{selecting: selecting && active==2}" v-for="order in orderData.list" :key="`order-${order.id}`">
            <van-checkbox v-show="selecting&& active==2" :name="order.id" />
            <order :type="user.userType == 2 || user.userType == 3 ? 2 : 1" :info="order" @click="showOrder(order.id)" />
          </div>
          <p class="tip" v-if="orderData.list.length > 0 && orderData.noMore">以上为全部工单</p>
        </load-more>
      </van-checkbox-group>
    </div>
    <bottom-button v-show="selecting && active==2">
      <van-button class="btn-withdraw" @click="selecting=false">取消</van-button>
      <van-button class="btn-send" type="info" color="#4FA0F7" @click="openSendBox">派单</van-button>
    </bottom-button>
    <van-popup v-if="monitorSelectorShow" v-model:show="monitorSelectorShow" position="bottom">
      <monitor-selector @selected="send"/>
    </van-popup>
    <van-popup v-model:show="filterShowed" position="bottom" :style="{ height: '95%' }">
      <popup-filter-leader v-if="filterShowed" @close="filterShowed=false" @changeData="getOrders" />
    </van-popup>
  </div>
</template>
<script setup>
import { ref, reactive, watch, computed ,onMounted} from 'vue';
import { getService } from '../../service';
import Order from '../../components/Order.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import BottomButton from '../../components/BottomButton.vue';
import MonitorSelector from '../../components/MonitorSelector.vue';
import PopupFilterLeader from '../../components/PopupFilterLeader.vue';
import BlankTip from '../../components/BlankTip.vue';

import { getStatData,statData } from './store/statData';
import { Toast } from 'vant';

import LoadMore from '../../components/LoadMore.vue';
const beforeInfo = computed(() => store.state.user.beforeInfo)

const store = useStore()
const user = computed(() => store.state.user.info)

const tabs = [
  {
    title: '本周工单',
    name: '1',
  }, {
    title: '待验收工单',
    name: '2',
  }, {
    title: '待派工单',
    name: '3',
  }
]

const orderData = reactive({
  list: [],
  selected: [],
  page: {
    pageNo: 1,
    pageSize: 10,
    total: 0,
  },
  noMore: false,
  data: {}
})
const service = getService();

const active = ref('1');
const getOrders = (params) => {
  orderData.page.pageNo =1;
  if(params) {
    orderData.data = Object.assign(orderData.data,params)
  }
  service.getOrders({
    type: active.value,
    ...orderData.data,
    ...orderData.page
  }).then(res => {
    orderData.list = res.records; // orderData.list.concat(res.records);
    orderData.page.total = res.total;
    orderData.page.pageNo = res.current;
    orderData.noMore = res.records.length < orderData.page.pageSize;
  })
}

watch(active, () => {
  getOrders();
})
const router = useRouter();
const showOrder = (id) => {
  router.push(`/h5/order/${id}/detail`)
}

if(beforeInfo.value.loginFlg == 1 || beforeInfo.value.loginFlg == 2){
getOrders();
}


const load = () => {
  service.getOrders({
    type: active.value,
    ...orderData.data,
    ...orderData.page,
    pageNo: orderData.page.pageNo + 1,
  }).then(res => {
    orderData.list = orderData.list.concat(res.records);
    orderData.page.total = res.total;
    if (res.records.length > 0) {
      orderData.page.pageNo = res.current;
    }
    orderData.noMore = res.records.length < orderData.page.pageSize;
  })
}

const selecting = ref(false);

const monitorSelectorShow = ref(false);
const openSendBox = () => {
  if (orderData.selected.length > 0) {
    monitorSelectorShow.value = true;
  } else {
    Toast.fail('请选择工单');
  }
}
const send = (monitor) => {
  service.sendOrder({
    toOperator: monitor.groupsLeaderId,
    toOrgan: monitor.departId,
    znjxBsnClientPageMainList: orderData.selected.map(id => ({ id })),
  }).then(() => {
    Toast.success('派单成功')
    monitorSelectorShow.value = false;
    getStatData();
    getOrders()

  }).catch((e) => {
    Toast.fail(e.message);
  })
}

const filterShowed = ref(false);

onMounted(() => {
  if(user.value.userType == 2){
    tabs.push({
      title: '待自检工单',
      name: '4',
    })
  }else{
    tabs.push({
      title: '待验收工单',
      name: '4',
    })
  }
})

</script>
<style lang="scss" scoped>
.home-orders {
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 0 0.32rem;
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // margin-bottom: 0.16rem;
    .van-tab1 {
      width: 4.5rem;
      // flex: 1;
    }
    .van-tab2 {
      width: 3rem;
    }
    .tab-count {
      font-size: 0.2rem;
    }
    .btn-img {
      width: 0.4rem;
      height: 0.4rem;
      margin-left: 0.5rem;
    }
  }

  .order-list {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    margin-top: -0.08rem;
  }
  .tip {
    font-size: 0.24rem;
    margin: 0.32rem;
  }
}
</style>
<style lang="scss">
.home-orders {
  .van-tabs__nav {
    background-color: transparent !important;
  }

  .van-tabs__nav--line {
    padding-bottom: 0.1rem;
  }
  .van-tabs__line {
    width: 1.2rem;
    height: 0.04rem;
    background-color: #f17300;
  }
  .order-wrapper {
    &.selecting {
      display: flex;
      align-items: center;
      width: 7.8rem;
      .van-checkbox {
        margin-right: 0.08rem;
      }
      .home-order {
        flex: 1;
      }
    }
  }
  .van-checkbox-group {
    height: 100%;
    overflow: hidden;
  }
}
</style>
