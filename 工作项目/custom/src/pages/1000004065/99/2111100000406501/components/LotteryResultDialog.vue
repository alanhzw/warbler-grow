<template>
  <!-- 中奖弹窗 -->
  <div class="box">
    <img src="../assets/img/dialog/dialog-lottery.png"
         class="popup">

    <div class="view">

      <img v-if="isThanks" class="icon" src="../assets/img/dialog/fail.png"/>
      <img v-else class="icon" :style="{width: winnerInfo.drawInfoType===20? '1.2rem':''}"
           :src="getPrizeImg(winnerInfo.drawInfoType)"/>

      <div v-if="isThanks" class="title">很遗憾!<br/>您未获得奖品</div>
      <div v-else class="title">恭喜您!<br/>获得{{ winnerInfo.name }}</div>

      <div v-if="isThanks" class="btn-bg" @click="closeDialog('scroll')" style="margin-top: .2rem">抽英雄联盟盲盒</div>
      <div v-else-if="!isThanks && winnerInfo.drawInfoType===7" class="btn-bg" style="margin-top: .2rem"
           @click="toAddressPage(winnerInfo)">填写地址
      </div>
      <div v-else class="btn-bg" style="margin-top: .2rem" @click="closeDialog()">立即收下</div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { computed, defineEmits, defineProps, inject, ref } from 'vue';
import { BaseInfo } from '@/types/BaseInfo';

const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
// 获取活动id
const { pin } = baseInfo;

const emit = defineEmits(['close']);
const props = defineProps({ winnerInfo: Object });
// 谢谢参与
const isThanks = computed(() => props.winnerInfo.id === 0);

const closeDialog = (str: string) => {
  emit('close', str);
};

// 获取奖品图片
const getPrizeImg = (type: number) => {
  let url = '';
  if (type === 7) {
    // 实物
    url = 'https://img10.360buyimg.com/imgzone/jfs/t1/199214/31/19259/23825/61a86b2aE6a94053e/3623168ee6a5fc8d.png';
  } else if (type === 20) {
    // 优惠券
    url = 'https://img10.360buyimg.com/imgzone/jfs/t1/199030/35/19210/9169/61a86b2aE9f983487/4df32d53e4686651.png';
  } else if (type === 9) {
    // 积分
    url = 'https://img10.360buyimg.com/imgzone/jfs/t1/212033/39/6386/5475/61a86b2aE07b15bea/2a22f3477f60203e.png';
  } else if (type === 6) {
    // 京豆
    url = 'https://img10.360buyimg.com/imgzone/jfs/t1/210883/21/11898/27779/61ae0411Ef54b1262/4ebc3319f76a1b5f.png';
  }
  return url;
};

// 跳转通用填写地址页面
const toAddressPage = () => {
  window.location.href = `${window.location.origin}/wxAddress/indexPage?pin=${pin}&generateId=${props.winnerInfo.addressId}&fromWhere=product`;
};

</script>

<style lang='scss' scoped>
.box {
  position: relative;

  img {
    margin: 0 auto;
  }

  .popup {
    width: 5.5rem;
  }

  .view {
    width: 100%;
    color: #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    position: absolute;
    top: .7rem;

    .icon {
      width: 1.39rem;
      margin-top: .79rem;
    }

    .title {
      text-align: center;
      height: .88rem;
      font-size: .3rem;
      font-weight: 800;
      line-height: .5rem;
      margin: .3rem 0;
    }

    .btn-bg {
      width: 2.75rem;
      height: .5rem;
      line-height: .5rem;
      text-align: center;
      color: #0b0442;
      margin: 0 auto;
      font-size: .28rem;
      font-weight: 800;
      background: {
        image: url("../assets/img/dialog/btn-format.png");
        repeat: no-repeat;
        size: cover;
      };
    }
  }
}
</style>
