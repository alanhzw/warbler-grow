<!--
 * @Description:
 *      退单的页面
 * @Author:LJN
 * @Date: 2021-05-05
 * @LastEditTime: 2021-06-10
 * @FilePath: \intelligent-overhaul-app\src\view\WorkOrder\BackDetail.vue
-->
<template>
  <div class="detail-container">
  <content-wrapper>
    <content-item label="项目标准编号" :value="backOrderData.data.standardItemCode"></content-item>
    <content-item label="项目名称" :value="backOrderData.data.projectName"></content-item>
  </content-wrapper>
  <content-wrapper>
    <content-item label="申请人" :value="backOrderData.data.fromOperator"></content-item>
    <content-item label="职务" :value="backOrderData.data.fromOperatorPosition"></content-item>
    <content-item label="申请时间" :value="backOrderData.data.operateTime"></content-item>
  </content-wrapper>
  <content-wrapper>
    <content-item label="退单理由" :value="backOrderData.data.operateIdea"></content-item>
  </content-wrapper>
  <bottom-button>
    <van-button class="whiteBtn text" @click="onShowOrder">查看委托单</van-button>
    <van-button v-if="backOrderData.showFlg" class="whiteBtn text" @click="onBackOrderCheck('99')">拒绝</van-button>
    <van-button v-if="backOrderData.showFlg" type="primary" class="text" @click="onBackOrderCheck('30')">同意</van-button>
  </bottom-button>
</div>
</template>

<script setup>
import BottomButton from '../../components/BottomButton.vue';
import ContentItem from '../../components/ContentItem.vue';
import ContentWrapper from '../../components/ContentWrapper.vue';
import { Toast } from 'vant';
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getService } from '../../service';

const service  = getService();
const route = useRoute();
const router = useRouter();
const backOrderData = reactive({
    data: {},
    showFlg:true
})

service.getOperationHistory({
  trustFormMainTableId: route.params.id
}).then(res => {
  backOrderData.data = res.filter(item => item.operateType == 204)[0]
})
const onShowOrder = () => {
  router.push(`/h5/order/${route.params.id}/detail`)
}

const onBackOrderCheck = (operateType) => {
  service.checkBackOrder({
    trustFormMainTableId: route.params.id,
    operateType: operateType
  }).then(res => {
    if(res == '添加成功!'){
      Toast.success('操作成功!')
      backOrderData.showFlg = true
      router.back()
    }else{
      Toast.fail('操作失败!')
    }
  }).catch((e) => {
    Toast.fail(e.message);
  })
}

if(route.params.anId!=null && route.params.anId !=''){
  backOrderData.showFlg = false
}


// const getReadMessage = () => {
//   service.getReadMessage({
//     id:route.params.anId
//   }).then(res => {
//     backOrderData.list = res.records
//     if(backOrderData.list!=null && backOrderData.list.length>0){
//       if(backOrderData.list[0].readFlag == '0'){
//         backOrderData.showFlg = true
//         service.readMessage({
//           anntId:backOrderData.list[0].anntId
//         }).then(res => {
//           console.log(res)
//         })
//       }
//     }
//   })
// // }
// getReadMessage()
</script>

<style lang='scss' scoped>
.detail-container {
  padding: 0 .32rem 2rem .32rem;
  .text {
    font-size: 0.3rem;
  }
}

</style>
