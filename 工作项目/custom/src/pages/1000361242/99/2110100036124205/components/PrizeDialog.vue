<template>
  <!-- 申领记录弹窗 -->
  <div class="popup">
    <div class="box">
      <img src="../assets/img/prize-dialog.png"
           class="popup">

      <!-- 数据 -->
      <div v-if="prizeList.length > 0" class="data-view">
        <div v-for="(item,index) in prizeList" :key="index" class="data">
          <div class="data-one" style="width: 30%">{{ item.giftName }}</div>
          <div class="data-one" style="width: 30%">{{ getDateFormat(item.createTime) }}</div>
          <div class="data-btn" v-if="item.giftType !== 7" style="width: 25%"></div>
          <div class="data-btn" v-else @click="getPrizeInfo(item)" style="width: 25%">
            {{ item.addressFlag ? '查看地址' : '填写地址' }}
          </div>
        </div>
      </div>
      <div v-else class="data-view"
           style="top: 3rem;font-size: .26rem;text-align: center">暂无我的奖品数据
      </div>

      <!-- 关闭按钮 -->
      <div class="close-btn"
           @click="closeDialog()"></div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import {
  defineComponent, defineEmits, defineProps, inject, ref,
} from 'vue';
import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
// 数据
const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
const { activityId, venderId } = baseInfo;

const props = defineProps({
  prizeList: Array,
});
const emit = defineEmits(['closeDialog', 'getPrizeInfo']);

// 格式化时间戳
const getDateFormat = (dateNumber: number) => {
  const date = new Date(dateNumber); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  const Y = `${date.getFullYear()}-`;
  const M = `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-`;
  const D = `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()} `;
  const h = `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:`;
  const m = (date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes());
  return Y + M + D + h + m;
};

// 关闭弹窗
const closeDialog = () => {
  emit('closeDialog', 'prizeDialog');
};

// 点击操作按钮将 整条奖品信息传回父组件
const getPrizeInfo = (prizeInfo: any) => {
  console.log(prizeInfo);
  if (!prizeInfo.addressFlag) {
    emit('getPrizeInfo', prizeInfo);
  } else {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    });
    cjwxRequest.post('/common/brand/getAddress', {
      venderId,
      activityId,
      addressId: prizeInfo.addressId,
    }).then((res) => {
      if (res.result) {
        const { data } = res;
        Toast(`${data.province} ${data.city} ${data.district} ${data.address}`);
      } else {
        Toast(res.errorMessage);
      }
    });
  }
};
</script>

<style lang='scss' scoped>
.box {
  position: relative;

  .popup {
    width: 6rem;
  }

  img {
    margin: 0 auto;
  }

  .data-view {
    position: absolute;
    top: 1.7rem;
    left: 0.57rem;
    width: 80%;
    font-size: 0.2rem;
    height: 3.5rem;
    overflow-y: auto;

    .data {
      display: flex;
      justify-content: space-evenly;
      align-content: center;
      align-items: center;
      margin-bottom: .25rem;
    }

    .data-one {
      text-align: center;
    }

    .data-btn {
      background: #4fcaf8;
      color: #FFFFFF;
      font-size: .25rem;
      text-align: center;
      border-radius: .2rem;
    }
  }

  .close-btn {
    position: absolute;
    bottom: 0;
    left: 1.3rem;
    width: 3.5rem;
    height: 1rem;
    overflow: auto;
    word-break: break-all;
  }
}
</style>
