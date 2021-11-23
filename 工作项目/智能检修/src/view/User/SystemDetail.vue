<!--
 * @Description:
 *      系统消息页面
 * @Author:SXW
 * @Date: 2021-05-05
 * @LastEditTime: 2021-06-05
 * @FilePath: \intelligent-overhaul-app\src\view\User\SystemDetail.vue
-->
<template>
    <!-- <div class="header-item">
        <div class="sub-item" @click="onGoToPrev">
            <div></div>
            <div>返回</div>
        </div>
        <div>系统消息</div>
        <div></div>
    </div> -->
    <div class="order-source" @click="showOrder(order.id)">
      <div class="list-div">
        <div><span class="p1">{{orderData.systemInfo.titile}}</span></div>
        <div class="p2"><span>{{orderData.systemInfo.sender}}</span><span class="test-margin">{{orderData.systemInfo.sendTime}}</span></div>
      </div>
    </div>
    <div class="test" v-html="orderData.systemInfo.msgContent" style="white-space: pre-line;"></div>
    <div class="botton-div">
        <van-button type="default" class="botton" @click="onOk">关闭</van-button>
    </div>
</template>
<script setup>
import { useRouter,useRoute} from 'vue-router';
import { getService } from '../../service';
import { ref, reactive, watch,getCurrentInstance  } from 'vue';
const orderData = reactive({
  list: [],
  page: {
    pageNo: 1,
    pageSize: 10,
    total: 0,
  },
  systemInfo:{}
})
const router = useRouter();
const route = useRoute();
const onGoToPrev = () => {
  router.push(`/h5/message`)
}
const service = getService();
const { ctx } = getCurrentInstance();//实例化当前组件
const ids= route.params.id
const getSystemMessage = (id = ids) => {
  service.getSystemMessage({
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
getSystemMessage()
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
.content{
  display: flex;
  justify-content: center;
  height: 138px;
  flex-direction: column;
}
.order-source {
  margin: 0.24rem;
  font-size: 0.24rem;
  text-align: left;
  line-height: 0.36rem;
  padding-left: 0.12rem;
  height: 1.35rem;
  display: flex;
  align-items: center;
  width: 100%;
  height: 1.35rem;
}
.p1{
  font-family: SourceHanSansCN-Medium, SourceHanSansCN;
  font-size: 0.28rem;
  color: #000000;
  line-height: 0.42rem;
  font-weight: 500;
}
.p2{
  font-size: 0.24rem;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 200;
  color: #000000;
  line-height: 0.36rem;
}
.list-div{
  border-bottom: 1px solid#EAEAEA;
  width: 6.73rem;
  height: 1.35rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.test{
    margin: 0.25rem;
    height: 11rem;
    overflow-y: scroll
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
}
.test-margin{
  margin-left: 0.2rem;
}
</style>