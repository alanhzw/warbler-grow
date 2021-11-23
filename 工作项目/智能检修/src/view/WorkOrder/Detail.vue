<!--
 * @Description:
 *      委托单详情的页面
 * @Author:SXW
 * @Date: 2021-05-05
 * @LastEditTime: 2021-06-10
 * @FilePath: \intelligent-overhaul-app\src\view\WorkOrder\Detail.vue
-->
<template>
  <div class="order-detail">
    <div class="content">
      <content-wrapper>
        <content-item label="委托单位" :value="orderInfo.clientName" />
        <content-item label="委托单编号" :value="orderInfo.clientDocumentNo" />
        <content-item label="委托日期" :value="orderInfo.clientDate" />
        <content-item label="预计施工日期" :value="orderInfo.planConstDate" />
        <content-item label="委托人" :value="orderInfo.clientPerson" />
        <!-- <content-item label="打印日期" :value="orderInfo.clienprintDatetPerson" /> -->
      </content-wrapper>
      <content-wrapper>
        <content-item label="计划编号" :value="orderInfo.planCode" />
        <content-item label="协力单位" :value="orderInfo.partnerUnitName" />
        <content-item label="计划序号" :value="orderInfo.planSeqNo" />
        <content-item label="数量" :value="orderInfo.planCount" />
        <content-item label="点检员" :value="orderInfo.spotInspector" />
        <content-item label="项目分类" :value="orderInfo.itemClassValue" />
      </content-wrapper>

      <content-wrapper>
        <content-item label="标准项目编号" :value="orderInfo.standardItemCode" />
        <content-item label="项目名称" :value="orderInfo.projectName" />
        <content-item label="项目类别" :value="orderInfo.itemCategoryName" />
        <content-item label="施工类别" :value="orderInfo.constCategoryName" />
        <content-item label="检修定额编号" :value="orderInfo.overhaulQuotaCode" />
        <content-item label="总工时" :value="orderInfo.totalWorkingHours" />
        <content-item label="委托金额" :value="orderInfo.clientMoney" />
      </content-wrapper>
      <content-wrapper>
        <content-item label="请修原因" :value="orderInfo.repairReason" />
        <content-item label="工程说明" :value="orderInfo.engineeringExplain" />
        <content-item label="计划人力需求" isBlock>
          <table frame="void" cellspacing=0>
            <thead>
              <tr>
                <th>序号</th><th align="left">工种</th><th>人数</th><th>工时</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in orderInfo.znjxBsnWtdManpowerNeedList" :key="row.id">
                <td>{{index + 1}}</td><td align="left">{{Utils.getWorkTypeName(row.workType)}}</td><td>{{row.peopleCount}}</td><td>{{row.hour}}</td>
              </tr>

            </tbody>
          </table>
        </content-item>
        <content-item label="质量层级" :value="orderInfo.qualityGradeValue" />
        <content-item label="高危等级" :value="orderInfo.highDangerGradeValue" />
        <content-item label="高危属性" :value="orderInfo.highDangerPropValue" />
        <content-item label="关键设备" :value="orderInfo.crucialEquipmentValue" />
        <content-item label="相关事项" isBlock>
          <table frame="void" cellspacing=0>
            <thead>
              <tr>
                <th>序号</th><th align="left">事项</th>
              </tr>
            </thead>
            <tbody>
              <tr >
                <td>1</td><td align="left">安全检修牌：{{orderInfo.safeOverhaulBrandCount==''||orderInfo.safeOverhaulBrandCount==null?0:orderInfo.safeOverhaulBrandCount}}张；内容见安全检修牌</td>
              </tr>
              <tr >
                <td>2</td><td align="left">检修记录卡：{{orderInfo.overhaulRecordCardCount==''||orderInfo.overhaulRecordCardCount==null?0:orderInfo.overhaulRecordCardCount}}张；内容见检修记录卡</td>
              </tr>

            </tbody>
          </table>
        </content-item>
      </content-wrapper>
    </div>
    <bottom-button v-if="userInfo.userType == 1 && orderInfo.orderState == 'A01' && !orderInfo.foreman">
      <!-- <van-button class="btn-withdraw" @click="withdrawShow = true">退单</van-button>-->
      <van-button v-role="'mobile:dispatch'" class="btn-send" type="info" color="#4FA0F7" @click="sendShow=true">派单</van-button>
    </bottom-button>
    <!-- <bottom-button v-if="userInfo.userType == 2 && orderInfo.orderState === 'A01' && !orderInfo.progressState"> -->
    <bottom-button v-if="userInfo.userType == 2 && orderInfo.orderState === 'A01'">
      <van-button class="btn-withdraw" @click="tuidan">退单</van-button>
      <van-button class="btn-send" type="info" color="#4FA0F7" @click="router.push('./attach')">下一步</van-button>
    </bottom-button>

    <bottom-button v-if="userInfo.userType == 3 && (orderInfo.orderState == 'A01' || orderInfo.orderState == 'A02' || orderInfo.orderState == 'A03')">
      <van-button class="btn-send" type="info" color="#4FA0F7" @click="work">施工</van-button>
    </bottom-button>
    <van-popup v-if="sendShow" v-model:show="sendShow" position="bottom">
      <monitor-selector @selected="send"/>
    </van-popup>

    <van-popup v-model:show="withdrawShow" position="bottom">
      <section class='withdraw-box'>
        <header>退单 <span class="close" @click="withdrawShow=false">取消</span></header>
        <content-wrapper class="withdraw-order">
          <content-item label="标准项目编号" :value="orderInfo.standardItemCode" />
          <content-item label="项目名称" :value="orderInfo.projectName" />
        </content-wrapper>
        <div class="withdraw-form">
          <div class="withdraw-reason" @click="withdrawReasonsShow=true">
            <label>退单理由</label>
            <span>{{withdrawReasons.selected.value ? withdrawReasons.selected.text : '请选择'}}</span>
            <van-icon name="arrow" />
          </div>
          <van-field
            v-model="manualReason"
            rows="1"
            :autosize="{
              minHeight: 360
            }"
            type="textarea"
            placeholder="退单理由补充"
          />
        </div>
        <bottom-button>
          <van-button class="btn-withdraw" @click="withdrawShow = false">取消</van-button>
          <van-button class="btn-send" type="info" color="#4FA0F7" @click="withdraw">提交</van-button>
        </bottom-button>
      </section>
    </van-popup>
    <van-popup v-model:show="withdrawReasonsShow" position="bottom">
      <section class='withdraw-box'>
        <header>选择退单理由<span class="back" @click="withdrawReasonsShow=false"><van-icon name="arrow-left" />返回</span></header>
        <ul class="reason-list">
          <li v-for="reason in withdrawReasons.list" :key="`reason${reason.value}`" @click="withdrawReasons.selected=reason"><span class="text">{{reason.text}}</span><van-icon v-show="withdrawReasons.selected.value==reason.value" name="success" /></li>
        </ul>
      </section>
    </van-popup>
  </div>
</template>
<script setup>
// 工单详情页面
import { ref, computed, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { Toast } from 'vant';
import ContentItem from '../../components/ContentItem.vue';
import ContentWrapper from '../../components/ContentWrapper.vue';
import BottomButton from '../../components/BottomButton.vue';
import MonitorSelector from '../../components/MonitorSelector.vue';
import Utils from '../../utils';
import { imgPath, getService } from '../../service';
const service  = getService();
const store = useStore();
const route = useRoute();
const router = useRouter();
const orderInfo = computed(() => store.state.order.current);
const userInfo = computed(() => store.state.user.info);
const withdrawShow = ref(false);
const withdrawReasonsShow = ref(false);

const sendShow = ref(false);
const send = (monitor) => {
  service.sendOrder({
    toOperator: monitor.groupsLeaderId,
    toOrgan: monitor.departId,
    znjxBsnClientPageMainList: [{
      id: route.params.id
    }]
  }).then((res) => {
    if(res != '添加成功！'){
      Toast.fail(res)
    }else{
      Toast.success('派单成功')
      router.push(`/h5`)
    }
    sendShow.value = false;

  }).catch((e) => {
    Toast.fail(e.message);
  })
}

const manualReason = ref('');
const withdrawReasons = reactive({
  list: [],
  selected: {},
})
service.getWithdrawReasons().then((res) => {
  withdrawReasons.list = res;
})
const withdraw = () => {
  service.withdraw({
    trustFormMainTableId: route.params.id,
    operateOpinion: `${withdrawReasons.selected.text || ''} ${manualReason.value}`,
    znjxBsnClientPageMainList: [{
      id: orderInfo.value.id,
      standardItemCode: orderInfo.value.standardItemCode,
      clientDocumentNo: orderInfo.value.clientDocumentNo,
      projectName: orderInfo.value.projectName,
      totalWorkingHours: orderInfo.value.totalWorkingHours,
      partnerUnit: orderInfo.value.partnerUnit,
    }]
  }).then(() => {
    Toast.success('退单成功')
    withdrawShow.value = false;
    // router.back()
    router.push(`/h5`)

  }).catch((e) => {
    Toast.fail(e.message);
  })
}
const work = () => {
  router.push('./execution')
}
const tuidan = () =>{
  if (orderInfo.value.orderSendType != '40'){
    withdrawShow.value = true;
  }else{
    Toast('该委托单已经申请退单,请等待');
  }
}
</script>
<style lang="scss" scoped>
.order-detail {
  padding: 0 0.32rem;
  .content {
    padding-bottom: 0.9rem;
  }
  table {
    width: 100%;
    font-size: 0.28rem;
    * {
      border: 0!important;
    }
    thead {
      background-color: #f2f2f2;
    }
    tr {
      height: 0.92rem;
    }
    th {
      font-weight: 500;
      padding: 0 0.16rem;
    }
    td {
      font-weight: 400;
      padding: 0 0.16rem;
    }
    tbody {
      tr:nth-child(even) {
        background-color: #f2f2f2;
      }
    }
  }
  .btn-withdraw {
    border: 1px solid #dddddd;
  }
  .btn-send {
    margin-left: 0.2rem;
  }

  .withdraw-box {
    header {
      position: relative;
      font-size: 0.36rem;
      font-weight: 500;
      line-height: 0.88rem;

      .close {
        color: #045BB8;
        font-size: 0.32rem;
        position: absolute;
        top: 50%;
        right: 0.32rem;
        transform: translateY(-50%);
      }
      .back {
        display: flex;
        align-items: center;
        color: #045BB8;
        font-size: 0.32rem;
        position: absolute;
        top: 50%;
        left: 0.32rem;
        transform: translateY(-50%);
      }
    }
    .withdraw-order {
      background-color: #F7F9FD;
      border-top: 0.01rem solid rgba(0,0,0,0.1);
      border-bottom: 0.01rem solid rgba(0,0,0,0.1);
      padding: 0.16rem 0.32rem ;
    }
    .withdraw-form {
      padding: 0 0.32rem;
      border-bottom: 0.01rem solid rgba(0,0,0,0.1);
    }
    .withdraw-reason {
      display: flex;
      line-height: 1.08rem;
      align-items: center;
      border-bottom: 0.01rem solid rgba(0,0,0,0.1);
      font-size: 0.28rem;

      span {
        flex: 1;
        margin: 0 0.08rem;
        text-align: right;
        color: rgba(0,0,0,0.45);
      }
      .van-icon {
        color: rgba(0,0,0,0.45);
      }
    }
    .van-field {
      padding: 0.16rem 0;
    }
    .reason-list {
      list-style: none;

      border-top: 0.01rem solid rgba(0,0,0,0.1);
      padding: 0 0.32rem;
      li {
        display: flex;
        align-items: center;
        font-size: 0.28rem;
        color: rgba(0,0,0,0.8);
        line-height: 0.42rem;
        padding: 0.32rem 0;
        border-bottom: 0.01rem solid rgba(0,0,0,0.1);
        text-align: left;
        .text {
          flex: 1;
        }
        .van-icon {
          color: #108EE9;
        }
      }
    }
  }
}
</style>