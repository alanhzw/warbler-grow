<!--
 * @Description:
 *      工单详情头部的页面
 * @Author:HJ
 * @Date: 2021-05-05
 * @LastEditTime: 2021-06-20
 * @FilePath: \intelligent-overhaul-app\src\view\WorkOrder\Index.vue
-->
<template>
  <div class="order">
    <div class="order-info">
      <img class="order-img-close" @click="showQrcode" src="../../assets/icon-qr.png">
      <img class="order-img" @click="closeIndex" src="../../assets/close.png">
      <content-item label="标准项目编号" :value="orderInfo.standardItemCode" />

      <content-item label="项目名称" :value="orderInfo.projectName" />
    </div>
    <van-tabs v-model:active="activeTab" @click="tabClicked">
      <van-tab v-if="showFlg" v-for="step in tabs" :key="step.name" :name="step.name" :title="step.title" />
    </van-tabs>
    <router-view></router-view>
  </div>
  <van-popup class="van-popup2" v-model:show="imgShow" :close-on-click-overlay="false">
    <img :src="qrCodeUrl" style="width: 4.8rem;border-radius: .1rem;">
    <div class="img-close" @click="imgClose">关闭</div>
  </van-popup>
</template>
<script setup>
// 工单页面
import { ref, reactive, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from "vue-router";
import { getService,imgPath } from '../../service';
import ContentItem from '../../components/ContentItem.vue';

const store = useStore();
const route = useRoute();
const router = useRouter();

const service = getService();

const orderInfo = computed(() => store.state.order.current);

const setCurrentOrder = (order) => store.commit('order/setCurrentOrder', order);

const getOrderDetail = () => service.getOrderDetail({
  trustFormMainTableId: route.params.id,
}).then(res => {
  setCurrentOrder(res);
})
getOrderDetail();

const user = computed(() => store.state.user.info);

const path = window.location.pathname.split('/');
const showFlg = ref(false);
const tabData = [
  {
    name: 'detail',
    title: '工单详情'
  }, {
    name: 'record',
    title: '履历'
  }, {
    name: 'check',
    title: '检查'
  }, {
    name: 'attach',
    title: '挂牌'
  }, {
    name: 'security',
    title: '安全确认'
  }, {
    name: 'clarification',
    title: '交底'
  }, {
    name: 'securityClarification',
    title: '安全交底及确认'
  }, {
    name: 'qualityPoints',
    title: '质量要点'
  }, {
    name: 'appointment',
    title: '指派'
  }, {
    name: 'execution',
    title: '施工'
  }, {
    name: 'summary',
    title: '施工情况'
  }, {
    name: 'inspection',
    title: '质量&自检'
  }, {
    name: 'defects',
    title: '缺陷管理'
  }, {
    name: 'acceptance',
    title: '质量&验收'
  }, {
    name: 'detach',
    title: '摘牌'
  }, {
    name: 'scheme',
    title: '高危安全作业方案'
  }, {
    name: 'standard',
    title: '维修作业标准'
  }
]

const activeTab = ref(path[path.length - 1]);
// const tabs = reactive({
//   activeTab: path[path.length -1],
//   steps: []
// })
const tabRoleMap = {
  '1': [
    'detail',
    'record',
    'check',
    'attach',
    //'security',
    //'clarification',
    // 'appointment',
    'summary',
    'scheme',
    'standard',
    // 'inspection',
    'acceptance',
    'detach',
  ],
  '2': [
    'detail',
    'record',
    'check',
    'attach',
    //'security',
    //'clarification',
    'appointment',
    'execution',
    'summary',
    'inspection',
    'defects',
    // 'acceptance',
    'detach',
    'scheme',
    'standard',
  ],
  '3': [
    'detail',
    'record',
    'check',
    'attach',
    //'security',
    //'clarification',
    'qualityPoints',
    // 'appointment',
    'execution',
    'scheme',
    'standard',
    // 'inspection',
    // 'acceptance',
    'detach',
  ],
  '4': [
    'detail',
    'record',
    'check',
    'attach',
    // 'security',
    // 'clarification',
    'summary',
    // 'acceptance',
    'detach',
    'scheme',
    'standard',
  ]
}

const getClarificationList = ()=> service.getClarificationList({
    trustFormMainTableId: route.params.id
  }).then(res => {
    if (res != null && res.znjxBsnSafeDetailsMoulds != null && res.znjxBsnSafeDetailsMoulds.length ==0) {
      tabRoleMap['1'].push('securityClarification')
      tabRoleMap['2'].push('securityClarification')
      tabRoleMap['3'].push('securityClarification')
      tabRoleMap['4'].push('securityClarification')
      console.log('安全交底');
    } else {
      tabRoleMap['1'].push('security')
      tabRoleMap['1'].push('clarification')
      tabRoleMap['2'].push('security')
      tabRoleMap['2'].push('clarification')
      tabRoleMap['3'].push('security')
      tabRoleMap['3'].push('clarification')
      tabRoleMap['4'].push('security')
      tabRoleMap['4'].push('clarification')
      console.log('安全确认,交底')
    }
    if (user.value.userType == 'F1' || user.value.userType == 'F2') {
      tabRoleMap['4'].push('acceptance')
    }
    showFlg.value = true;
  })

const getConstructionPersonnelList = ()=> service.getConstructionPersonnelList({
      trustFormMainTableId: route.params.id
    }).then(res => {
      console.log(res)
      // for(var i in res){
      //   if(res[i].sysUserId == user.value.userId){
      //     // tabRoleMap['2'].push('execution')
      //   }
      // }
      getClarificationList();
      //showFlg.value = true;
    })
getConstructionPersonnelList();
const tabs = computed(()  => {
  const type = user.value.userType == '1' || user.value.userType == '2' || user.value.userType == '3' ? user.value.userType : '4'
  const names = tabRoleMap[type];
  console.log(names)
  service.getConstructionPersonnelList({
      trustFormMainTableId: route.params.id
    }).then(res => {
      if(res.length>0){
        var flag = false
        for(var i in res){
          if(res[i].sysUserId == user.value.userId){
            flag = true
            let namesIndex = names.indexOf('execution')
            if(namesIndex == -1){
                names.push('execution')
            }
          }
        }
        if(!flag){
          for(let i in names){
            if(names[i]=='execution'){
              names.splice(i,1)
            }
          }
        }
      }else{
        for(let i in names){
          if(names[i]=='execution'){
            names.splice(i,1)
          }
        }
      }
      
      // names.splice(count,1)
      // getClarificationList();
      //showFlg.value = true;
    })
    console.log("sxw-------------->")
    console.log(names)
  return tabData.filter(tab => names.indexOf(tab.name) > -1)
})

const tabClicked = (name) => {
  if (!window.location.pathname.endsWith(name)) {
    router.push(name);
  }
}
const imgShow = ref(false)
const qrCodeUrl = ref('');
const showQrcode = ()=>{
  if(qrCodeUrl.value == ''){
    service.getClientPageQrcode({trustFormMainTableId: route.params.id}).then(res=>{
      if(res){
        qrCodeUrl.value = imgPath + res;
        imgShow.value = true;
      }
    })
  }else{
    imgShow.value = true;
  }

}
const closeIndex = ()=>{
  router.push(`/h5`)
}
const imgClose = () =>{
  imgShow.value = false;
}
watch(route, (routeInfo) => {
  const path = window.location.pathname.split('/');
  activeTab.value = path[path.length - 1];
})

</script>
<style lang="scss">
@import '../../style/_variable.scss';

.order {
  height: 100vh;
  display: flex;
  flex-direction: column;

  .order-info {
    padding: 0.32rem;
    background-color: $MAIN_COLOR;
    color: $WHITE;

    .order-img {
      width: 0.3rem;
      position: absolute;
      top: 0.85rem;
      right: 0.5rem;
    }
    .order-img-close{
      width: 0.3rem;
      position: absolute;
      top: 0.85rem;
      right: 1.35rem;
    }
  }
  .nav {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .van-tabs__line {
    background-color: #e6871e;
  }

  .van-tabs {
    border-bottom: 0.02rem solid rgba(0, 0, 0, 0.1);
  }
  .van-tabs__nav {
    background: #f7f9fd;
  }
}
.van-popup2{
  background-color: transparent;

  .img-close{
    background-color: #fff;
    margin-top: .48rem;
    height: .92rem;
    line-height: .92rem;
    font-size: .32rem;
    border-radius: .1rem;
  }
}
.van-overlay{
  background-color: rgb(0 0 0 / 44%);
}
</style>