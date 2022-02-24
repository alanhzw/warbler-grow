<template>
  <!-- 我的奖品弹窗 -->
  <div class="box">
    <div class="title">
      <div>订单信息</div>
      <div>订单金额</div>
    </div>
    <div class="info">
      <div v-if="myOrderArr.length>0">
        <template v-for="(item) in myOrderArr" :key="item.id">
          <div class="order-view">
            <div>
              <div class="order-id">编号：{{ item.orderId }}</div>
              <div class="order-time">日期：{{ item.ordStartDate }}</div>
            </div>
            <div class="order-prize">￥{{ item.price }}</div>

          </div>
        </template>
      </div>

      <div v-else class="none-data">暂无订单记录哦~</div>
    </div>
    <div class="close-btn" @click="closeDialog"></div>
  </div>
</template>

<script lang='ts' setup>
import { defineEmits, defineProps, ref } from 'vue';

const props = defineProps({ myOrderArr: Array });
const emit = defineEmits(['closeDialog']);

const closeDialog = () => {
  emit('closeDialog');
};

</script>

<style lang='scss' scoped>
.box {
  position: fixed;
  width: 7.5rem;
  height: 11.02rem;
  box-sizing: border-box;
  bottom: 0;
  background: {
    image: url("../assets/dialog/dialog-order.png");
    repeat: no-repeat;
    size: contain;
  };

  .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 3.5rem;
    padding: .1rem .9rem;
    box-sizing: border-box;
    color: #dd5344;
    font-size: .3rem;
  }

  .info {
    height: 6.8rem;
    overflow-y: auto;

    .order-view {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      background-color: #FFFFFF;
      padding: .18rem .5rem .18rem .35rem;
      margin: 0.1rem .3rem;
      border-radius: .1rem;
      align-items: center;

      .order-id {
        font-size: .27rem;
        color: #262626;
      }

      .order-time {
        font-size: 0.2rem;
        color: #8c8c8c;
      }

      .order-prize {
        width: 1.5rem;
        text-align: center;
        font-size: .3rem;
        color: #ff9900;
      }
    }

    .none-data {
      line-height: 1.3rem;
      height: 1.3rem;
      background-color: #FFFFFF;
      font-size: .25rem;
      color: #555555;
      text-align: center;
      margin: .2rem .4rem;
      border-radius: .1rem;
    }
  }

  .close-btn {
    position: absolute;
    top: 2.6rem;
    right: .2rem;
    width: 1rem;
    height: 1rem;
    overflow: auto;
  }
}
</style>
