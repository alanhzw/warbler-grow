<!--
 * @Description:
 *      退单审批结果页面
 * @Author:SXW
 * @Date: 2021-05-05
 * @LastEditTime: 2021-06-05
 * @FilePath: \intelligent-overhaul-app\src\view\User\RefundApprovalResult.vue
-->
<template>
    <!-- <div class="header-item">
      <div class="sub-item" @click="onGoToPrev">
        <div></div>
        <div>返回</div>
      </div>
      <div>退单审批结果</div>
      <div></div>
    </div> -->
    <div class="order-detail">
      <div class="test1">
        <content-wrapper>
          <content-item label="标准项目编号" :value="orderData.systemInfo.standardItemCode" />
          <content-item label="项目名称" :value="orderData.systemInfo.projectName" />
        </content-wrapper>
      </div>
    </div>
    <div class="order-detail1">
      <div class="test2">
        <content-wrapper>
          <content-item label="审批人" :value="orderData.systemInfo.approvalPerson" />
          <content-item label="职务" :value="orderData.systemInfo.position" />
          <content-item label="审批时间" :value="orderData.systemInfo.approvalTime" />
        </content-wrapper>
      </div>
    </div>
    <div class="order-detail1">
      <content-wrapper>
        <content-item label="审批结果" :value="orderData.systemInfo.approvalResult" />
        <content-item label="补充说明" :value="orderData.systemInfo.note" />
      </content-wrapper>
    </div>
    <div class="botton-div">
        <van-button type="default" class="botton" @click="onOk">关闭</van-button>
    </div>
</template>
<script setup>
import { useRouter,useRoute} from 'vue-router';
import { getService } from '../../service';
import { reactive,getCurrentInstance  } from 'vue';
import ContentItem from '../../components/ContentItem.vue';
import ContentWrapper from '../../components/ContentWrapper.vue';
const router = useRouter();
const route = useRoute();
const orderData = reactive({
  list: [],
  page: {
    pageNo: 1,
    pageSize: 10,
    total: 0,
  },
  systemInfo:{}
})
const service = getService();
const { ctx } = getCurrentInstance();//实例化当前组件
const ids= route.params.id
const getReadMessage = (id = ids) => {
  service.getReadMessage({
    id,
    ...orderData.page
  }).then(res => {
    if(res.records && res.records.length>0){
      orderData.systemInfo = res.records[0]
    }
  })
}
const onOk = () => {
  router.push(`/h5/message`)
}
getReadMessage()
const onGoToPrev = () => {
  router.push(`/h5/message`)
}
</script>

<style lang="scss" scoped>
@import '../../style/_variable.scss';

.header-item {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 60px;
    background-image: url(/src/assets/bg-home-banner.png);
    font-size: 0.32rem;
    color: $WHITE;
    .sub-item {
        width: 20%;
        > :nth-child(1) {
        display: inline-block;
        width: 10px;
        height: 10px;
        margin-right: 5px;
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
        width: 60%;
    }
    > :nth-child(3) {
        width: 20%;
    }
}
.test1{
  padding: 0.32rem;
  position: relative;
  width: 100%;
  background: #F7F9FD;
  height: 2.18rem;
}
.test2{
  border-bottom: 1px solid #EAEAEA;
}
.botton-div{
    position: absolute;
    bottom: 0px;
    height: 1.36rem;
    border-top: 1px solid gainsboro;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.botton{
    width: 6.8rem;
    border-radius: 0.1rem;
    margin: 10px;
}
.order-detail {

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
    }
    td {
      font-weight: 400
    }
    tbody {
      tr:nth-child(even) {
        background-color: #f2f2f2;
      }
    }
  }
}
.order-detail1 {
  padding: 0.32rem;

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
    }
    td {
      font-weight: 400
    }
    tbody {
      tr:nth-child(even) {
        background-color: #f2f2f2;
      }
    }
  }
}
</style>