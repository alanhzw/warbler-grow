<!--
 * @Description:
 *      消息页面
 * @Author:SXW
 * @Date: 2021-05-05
 * @LastEditTime: 2021-06-01
 * @FilePath: \intelligent-overhaul-app\src\view\User\Message.vue
-->
<template>
    <!-- <div class="header-item">
        <div class="sub-item" @click="onGoToPrev">
            <div></div>
            <div>返回</div>
        </div>
        <div>消息</div>
        <div></div>
    </div> -->

      <div class="content-item">
          <van-tabs v-model:active="active">
            <van-tab title="工作消息" name="1"></van-tab>
            <van-tab title="系统消息" name="2"></van-tab>
          </van-tabs>
      </div>
    <!-- <div class="order-source" v-for="item in orderData.list" :key="`order-${item.id}`" @click="showOrder(item.msgCategory,item.id,item.anntId,item.operateType,item.trustFormMainTableId)">
        <div style="width:26px">
          <p :class="item.readFlag == '0'?'dot1':'dot'"></p>
        </div>
        <div class="list-div">
          <div><span class="p1">{{item.titile}}</span><span class="class2">{{item.sendTime}}</span></div>
          <div class="p2">{{item.msgCategory=='1'?item.resume:item.approvalResult}}</div>
        </div>
    </div> -->
    <div style="height: 16rem;">
      <load-more @load="load">
        <div class="order-source" v-for="item in orderData.list" :key="`order-${item.id}`" @click="showOrder(item.msgCategory,item.id,item.anntId,item.operateType,item.trustFormMainTableId)">
          <div style="width:26px">
            <p :class="item.readFlag == '0'?'dot1':'dot'"></p>
          </div>
          <div class="list-div">
            <div><span class="p1">{{item.titile}}</span><span class="class2">{{item.sendTime}}</span></div>
            <div class="p2">{{item.msgCategory=='1'?item.resume:item.approvalResult}}</div>
          </div>
        </div>
        <p class="tip" v-if="orderData.list.length > 0 && orderData.noMore">以上为全部消息</p>
      </load-more>
    </div>

</template>

<script setup>
import { useRouter} from 'vue-router';
import { getService } from '../../service';

import { ref, reactive, watch,getCurrentInstance  } from 'vue';
import { Toast } from 'vant'

import LoadMore from '../../components/LoadMore.vue';

const orderData = reactive({
  list: [],
  page: {
    pageNo: 1,
    pageSize:10,
    total: 0,
  },
  noMore: false
})
const router = useRouter();
const onGoToPrev = () => {
  router.push(`/h5`)
}
const { ctx } = getCurrentInstance();
const service = getService();
const showOrder = (msgCategory,id,anntId,operateType,trustFormMainTableId) => {
  if(msgCategory == '1'){
    if(operateType == '204'){
      router.push(`/h5/backDetail/${trustFormMainTableId}/${id}`)
    }else{
      service.readMessage({
        anntId:anntId
      }).then(res => {
        console.log(res)
        router.push(`/h5/refundApprovalResult/${id}`)
      })
    }
  }else{
    service.readMessage({
      anntId:anntId
    }).then(res => {
      console.log(res)
      router.push(`/h5/systemDetail/${id}`)
    })
  }
}
const load = () => {
  console.log('load more')
  if(active.value==2){
    getSystemMessagePage();
  }else{
    getReadMessagePage();
  }
}

const active = ref(1);
watch(active, () => {
  orderData.page.pageNo = 1;
  if(active.value == 2){
    getSystemMessage();
  }else{
    getReadMessage();
  }
})
const getSystemMessage = () => {
  service.getSystemMessage({
    ...orderData.page
  }).then(res => {
    orderData.list = res.records
    console.log(orderData.list)
    for(let i in orderData.list){
      var myDate = new Date(Date.parse(orderData.list[i].sendTime))
      var d = new Date(orderData.list[i].sendTime.toString().replace(/-/g,"/"));
      var todaysDate = new Date();
      if(d.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)){
        var minute = myDate.getMinutes();
        if(minute.toString().length<2){
          // myDate.getMinutes() = myDate.getMinutes() + "0"
          const min = "0" + minute
          orderData.list[i].sendTime = myDate.getHours()+":"+ min
        }else{
          orderData.list[i].sendTime = myDate.getHours()+":"+minute
        }
      } else {
          orderData.list[i].sendTime = (myDate.getMonth()+1)+"."+ myDate.getDate()
      }
    }
  })
}
const getReadMessage = () => {
  service.getReadMessage({
    ...orderData.page
  }).then(res => {
    orderData.list = res.records
    console.log(orderData.list)
    for(let i in orderData.list){
      var myDate = new Date(Date.parse(orderData.list[i].sendTime))
      var d = new Date(orderData.list[i].sendTime.toString().replace(/-/g,"/"));
      var todaysDate = new Date();
      if(d.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)){
        var minute = myDate.getMinutes();
        if(minute.toString().length<2){
          // myDate.getMinutes() = myDate.getMinutes() + "0"
          const min = "0" + minute
          orderData.list[i].sendTime = myDate.getHours()+":"+ min
        }else{
          orderData.list[i].sendTime = myDate.getHours()+":"+minute
        }
      } else {
          orderData.list[i].sendTime = (myDate.getMonth()+1)+"."+ myDate.getDate()
      }
    }
  }).catch(() => {
            Toast.fail({
                message: '暂无消息',
              })
          })
}
const getSystemMessagePage = () => {
  service.getSystemMessage({
    ...orderData.page,
    pageNo: orderData.page.pageNo+1
  }).then(res => {
    orderData.list = orderData.list.concat(res.records);
    orderData.page.total = res.total;
    if (res.records.length > 0) {
      orderData.page.pageNo = res.current;
    }
    orderData.noMore = res.records.length < orderData.page.pageSize;
    console.log(orderData.list)
    for(let i in orderData.list){
      if(orderData.list[i].sendTime.toString().indexOf('-')>-1){
        var myDate = new Date(Date.parse(orderData.list[i].sendTime))
        var d = new Date(orderData.list[i].sendTime.toString().replace(/-/g,"/"));
        var todaysDate = new Date();
        if(d.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)){
          var minute = myDate.getMinutes();
          if(minute.toString().length<2){
            // myDate.getMinutes() = myDate.getMinutes() + "0"
            const min = "0" + minute
            orderData.list[i].sendTime = myDate.getHours()+":"+ min
          }else{
            orderData.list[i].sendTime = myDate.getHours()+":"+minute
          }
        } else {
            orderData.list[i].sendTime = (myDate.getMonth()+1)+"."+ myDate.getDate()
        }
      }
    }
  })
}
const getReadMessagePage = () => {
  service.getReadMessage({
    ...orderData.page,
    pageNo: orderData.page.pageNo+1
  }).then(res => {
    orderData.list = orderData.list.concat(res.records);
    console.log(orderData.list)
    orderData.page.total = res.total;
    if (res.records.length > 0) {
      orderData.page.pageNo = res.current;
    }
    orderData.noMore = res.records.length < orderData.page.pageSize;
    for(let i in orderData.list){
      if(orderData.list[i].sendTime.toString().indexOf('-')>-1){
        var myDate = new Date(Date.parse(orderData.list[i].sendTime))
        var d = new Date(orderData.list[i].sendTime.toString().replace(/-/g,"/"));
        var todaysDate = new Date();
        if(d.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)){
          var minute = myDate.getMinutes();
          if(minute.toString().length<2){
            // myDate.getMinutes() = myDate.getMinutes() + "0"
            const min = "0" + minute
            orderData.list[i].sendTime = myDate.getHours()+":"+ min
          }else{
            orderData.list[i].sendTime = myDate.getHours()+":"+minute
          }
        } else {
            orderData.list[i].sendTime = (myDate.getMonth()+1) + "."+ myDate.getDate()
        }
      }
    }
  }).catch(() => {
            Toast.fail({
                message: '暂无消息',
              })
          })
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
.content-item {
    background: #F4F1F4;
    height: 50px;
}
.dot {
  width: 0.24rem;
  height: 0.24rem;
  border-radius: 100%;
  background: #E5E5E5;
}
.dot1 {
  width: 0.24rem;
  height: 0.24rem;
  border-radius: 100%;
  background:#4D9FF8;
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


  .list-div{
    border-bottom: 1px solid#EAEAEA;
    width: 6.73rem;
    height: 1.35rem;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .p1{
      font-size: 14px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 600;
      color: #000000;
      line-height: 21px;
    }
    .p2{
      font-size: 12px;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 200;
      color: #000000;
      line-height: 18px;
    }

    .class2{
      float: right;
      margin-right: .6rem;
    }
  }


}
.tip {
    font-size: 0.24rem;
    margin: 0.32rem;
  }
.clock{
  position: absolute;
  right: 30px;
  font-size: 0.24rem;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  color: #000000;
  line-height: 0.36rem;
  font-weight: 100;
}
</style>