<!--
 * @Description:
 *     代办事项
 * @Author:LJN
 * @Date: 2021-05-05
 * @LastEditTime: 2021-06-01
 * @FilePath: \intelligent-overhaul-app\src\view\OrderNavs\ItemToDo.vue
-->
<template>
    <!-- <div class="header-item">
        <div class="sub-item" @click="goBack">
            <div></div>
            <div>返回</div>
        </div>
        <div>待办事项</div>
        <div></div>
    </div> -->
    <van-tabs v-if="user.userType == 1 || user.userType == 2 || user.userType == 3" v-model:active="active">
        <!-- <van-tab name="2" title="全部"></van-tab> -->
        <van-tab v-if="user.userType != 3" name="2" title="待派单"></van-tab>
        <van-tab v-if="user.userType == 1" name="4" title="待验收"></van-tab>
        <van-tab v-if="user.userType == 2" name="4" title="待自检"></van-tab>
        <van-tab v-if="user.userType == 3" name="2" title="待开工"></van-tab>
        <van-tab name="6" title="检查"></van-tab>
        <van-tab name="5" title="其他"></van-tab>
    </van-tabs>
    <van-tabs v-else v-model:active="active">
        <van-tab v-if="user.userType != 'F0'" name="2" title="待验收"></van-tab>
        <van-tab name="6" title="检查"></van-tab>
        <van-tab name="5" title="权限委托"></van-tab>
    </van-tabs>
    <div class="header" v-if="user.userType == 1 && (active == 2 || active == 4)">
        <img v-if="active == 2 && !selecting" src="../../assets/icon-checker.png" @click="selecting=true">
        <img src="../../assets/icon-funnel.png" @click="isShow = true"/>
    </div>
    <div class="order-list">
      <template v-if="active == 5">
        <blank-tip v-if="permissionsData.list.length == 0"/>
        <load-more @load="permissionsLoad">
          <div v-for="order in permissionsData.list" :key="`order-${order.id}`">
            <order-back v-if="('orderSendType' in order)" :info="order" @click="onShowOrderBack(order.id)" />
            <permissions-entrust v-else :info="order" @click="onShowEntrust(order.id)" />
          </div>
        </load-more>
      </template>
      <template v-else-if="active == 6">
        <blank-tip v-if="checkInfomationData.list.length == 0"/>
        <load-more @load="checkLoad">
          <template v-for="infomation in checkInfomationData.list" :key="`infomation-${infomation.id}`">
            <check-up v-if="infomation.status == 1" :info="infomation" @click="showInfomation(infomation)"></check-up>
          </template>
        </load-more>
      </template>
      <template v-else>
        <van-checkbox-group v-model="orderData.selected">
          <blank-tip v-if="orderData.list.length == 0"/>
          <load-more @load="orderLoad">
            <div class="order-wrapper" :class="{selecting: selecting && active==2}" v-for="order in orderData.list" :key="`order-${order.id}`" >
              <van-checkbox v-show="selecting&& active==2" :name="order.id"/>
              <order :type="user.userType == 2 || user.userType == 3 ? 2 : 1" :info="order" @click="showOrder(order.id)"/>
            </div>
          </load-more>
        </van-checkbox-group>
      </template>
      <bottom-button v-show="selecting && active==2">
        <van-button class="btn-withdraw" @click="selecting=false">取消</van-button>
        <van-button class="btn-send" type="info" color="#4FA0F7" @click="openSendBox">派单</van-button>
      </bottom-button>
    </div>
    <van-popup v-if="monitorSelectorShow" v-model:show="monitorSelectorShow" position="bottom">
      <monitor-selector @selected="send"/>
    </van-popup>
    <van-popup v-model:show="isShow" position="bottom" :style="{ height: '95%' }">
      <popup-filter-leader v-if="isShow" @close="onClose" @changeData="getOrders"/>
    </van-popup>
</template>

<script setup>
import PopupFilterLeader from '../../components/PopupFilterLeader.vue';
import { getService } from '../../service';
import Order from '../../components/Order.vue';
import OrderBack from '../../components/OrderBack.vue';
import PermissionsEntrust from '../../components/PermissionsEntrust.vue';
import MonitorSelector from '../../components/MonitorSelector.vue';
import BottomButton from '../../components/BottomButton.vue';
import BlankTip from '../../components/BlankTip.vue';
import CheckUp from '../../components/CheckUp.vue';
import LoadMore from '../../components/LoadMore.vue';
import { ref, reactive, watch, computed } from 'vue';
import { useRouter} from 'vue-router';
import { useStore } from 'vuex';
import { Toast } from 'vant';

const store = useStore()
const user = computed(() => store.state.user.info)

const isShow = ref(false)
const monitorSelectorShow = ref(false);
const selecting = ref(false);
const orderData = reactive({
  list: [],
  selected: [],
  page: {
    pageNo: 1,
    pageSize: 10,
    total: 0
  },
  data: {}
})

const permissionsData = reactive({
  list: [],
  page: {
    pageNo: 1,
    pageSize: 10,
    total: 0
  }
})

const checkInfomationData = reactive({
  list: [],
  page: {
    pageNo: 1,
    pageSize: 10,
    total: 0
  }
})

const service = getService();

const active = ref('2');
const getOrders = (params) => {
  orderData.page.pageNo = 1;
  if(params){
    orderData.data = Object.assign(orderData.data,params)
  }
  service.getOrders({
    type: active.value,
    ...orderData.data,
    ...orderData.page,
  }).then(res => {
    orderData.list = res.records;
    orderData.page.total = res.total;
    orderData.page.pageNo = res.current;
  })
}

const orderLoad = () => {
  service.getOrders({
    type: active.value,
    ...orderData.page,
    ...orderData.data,
    pageNo: orderData.page.pageNo + 1,
  }).then(res => {
    orderData.list = orderData.list.concat(res.records);
    orderData.page.total = res.total;
    if (res.records.length > 0) {
      orderData.page.pageNo = res.current;
    }
  })
}

const getPermissions = () => {
  permissionsData.page.pageNo = 1
  if(user.value.userType == 1) {
    service.getPermissions().then(res => {
      permissionsData.list = res.returnList.records.concat(res.transferList.records);
      permissionsData.list.sort((a,b) => {
        return b.createTime < a.createTime ? -1 : 1
      })
    })
  } else {
    service.getPermissions({
      ...permissionsData.page
    }).then(res => {
      permissionsData.list = res.records;
      permissionsData.page.total = res.total;
      permissionsData.page.pageNo = res.current;
    })
  }
}

const permissionsLoad = () => {
  service.getPermissions({
      ...permissionsData.page,
      pageNo: orderData.page.pageNo + 1
  }).then(res => {
    permissionsData.list = permissionsData.list.concat(res.records);
    permissionsData.page.total = res.total;
    if (res.records.length > 0) {
      permissionsData.page.pageNo = res.current;
    }
  })
}

const getCheckInfomation = () => {
  checkInfomationData.page.pageNo = 1
  service.getCheckInfomation({
    ...checkInfomationData.page
  }).then(res => {
    checkInfomationData.list = res.records
    permissionsData.page.total = res.total;
    permissionsData.page.pageNo = res.current;
  })
}

const checkLoad = () => {
  service.getCheckInfomation({
      ...checkInfomationData.page,
      pageNo: checkInfomationData.page.pageNo + 1
  }).then(res => {
    checkInfomationData.list = checkInfomationData.list.concat(res.records);
    checkInfomationData.page.total = res.total;
    if (res.records.length > 0) {
      checkInfomationData.page.pageNo = res.current;
    }
  })
}

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
    znjxBsnClientPageMainList: orderData.selected.map(id => ({id})),
  }).then(() => {
    Toast.success('派单成功')
    monitorSelectorShow.value = false;
    selecting.value = false;
    getOrders()
  }).catch((e) => {
    Toast.fail(e.message);
  })
}
const onClose = () => {
  isShow.value = false;
}
const onChangeData = (data) => {
  orderData.list = data
}
watch(active, () => {
  if ( active.value == 5 ) {
    getPermissions();
  } else if( active.value == 6 ) {
    getCheckInfomation();
  } else {
    getOrders();
  }
})

const router = useRouter();
const goBack = () => {
  router.push(`/h5`)
}
const showOrder = (id) => {
  router.push(`/h5/order/${id}/detail`)
}

const onShowEntrust = (id) => {
  router.push(`/h5/entrustDetail/${id}`)
}
const onShowOrderBack = (id) => {
  router.push(`/h5/backDetail/${id}`)
}

const showInfomation = (infomation) => {
  window.location.href = `${infomation.redirectUrl}&workId=${infomation.id}`;
}

getOrders();
</script>

<style lang="scss" scoped>
@import '../../style/_variable.scss';

.header-item {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 1rem;
    background-image: url(/src/assets/bg-home-banner.png);
    font-size: 0.32rem;
    color: $WHITE;
    .sub-item {
        width: 20vw;
        > :nth-child(1) {
        display: inline-block;
        width: 0.2rem;
        height: 0.2rem;
        margin-right: 0.08rem;
        border-top: 2px solid $WHITE;
        border-right: 2px solid $WHITE;
        transform: rotate(-135deg);
        -webkit-transform: rotate(-135deg);
        }
        > :nth-child(2) {
            display: inline-block;
        }
    }
    > :nth-child(2) {
        width: 60vw;
    }
    > :nth-child(3) {
        width: 20vw;
    }
}
.header {
  text-align: right;
  margin: 0.3rem 0;
  padding: 0 0.3rem;
  img {
    width: 0.4rem;
    height: 0.4rem;
    margin-left: 0.2rem;
  }
}
.order-list  {
  display: flex;
  flex-direction: column;
  padding: 0 0.3rem;
  flex: 1;
  overflow: scroll;
  height: 100vh;
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