<template>
  <!-- 我的奖品弹窗 -->
  <div class="popup">
    <div class="box">
      <img src="../assets/img/dialog/skus-dialog.png"
           class="popup">

      <!-- 商品价值信息 -->
      <div class="cart-info">
        <div class="cart-bg">已选择{{ skusObj.selectNum }}件</div>
        <div class="cart-bg">价值{{ skusObj.selectPrice }}元</div>
      </div>

      <!-- 数据 -->
      <div class="sku">
        <div v-for="(item,index) in skuArr" :key="index" class="sku-bg" :class="{'gray':item.buttonStatus === 1}"
             @click="chooseSku(item)">
          <!-- 价值icon -->
          <img src="../assets/img/prize-icon.png" class="prize-icon"/>
          <!-- 价值num -->
          <div class="prize-num">价值{{ item.value }}元</div>
          <img :src="require(`../assets/img/skus/${item.id}.jpg`)" style="width: 1.4rem"/>
          <div style="font-size: .18rem">{{ item.name }}</div>
          <img style="width: .98rem;margin-top: .13rem" src="../assets/img/lock-btn.png"/>
        </div>
      </div>

      <!-- 关闭按钮 -->
      <div class="close-btn" @click="closeDialog()"></div>
      <div class="close-btn-bottom" style="bottom: 0;top: unset" @click="closeDialog()"></div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import {
  defineEmits, defineProps, ref, watch,
} from 'vue';
import { Toast } from 'vant';

const props = defineProps({
  skusObj: Object,
});
const skuArr = ref([]);
// eslint-disable-next-line vue/no-setup-props-destructure
skuArr.value = props.skusObj?.skuList;

watch(() => props.skusObj, (newValue, oldValue) => {
  skuArr.value = props.skusObj?.skuList;
});

const emit = defineEmits(['closeDialog', 'chooseSku']);

const closeDialog = () => {
  emit('closeDialog', 'skusDialog');
};

const chooseSku = (item: any) => {
  if (item.buttonStatus === 0) {
    emit('chooseSku', item.id);
  } else {
    Toast('您已锁定当前商品~');
  }
};
</script>

<style lang='scss' scoped>
.box {
  position: relative;

  .popup {
    width: 6rem;
  }

  .cart-info {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    position: absolute;
    top: 2.4rem;
    width: 100%;

    .cart-bg {
      width: 2.07rem;
      height: 0.53rem;
      line-height: .53rem;
      font-size: .24rem;
      color: #FFFFFF;
      text-align: center;
      background-color: #e4301f;
      border-radius: 0.27rem;
    }
  }

  .sku {
    position: absolute;
    top: 4rem;
    padding: 0 .25rem;
    display: flex;
    flex-flow: row wrap;
    height: 6.4rem;
    overflow-y: auto;

    .sku-bg {
      background: url("../assets/img/sku-bg.png") no-repeat;
      background-size: 100% 100%;
      width: 2.38rem;
      height: 2.51rem;
      margin: .15rem .17rem;
      text-align: center;
      box-sizing: border-box;
      padding-top: .2rem;
      position: relative;

      .prize-icon {
        width: 1.01rem;
        position: absolute;
        top: -.2rem;
        left: -.04rem;
      }

      .prize-num {
        position: absolute;
        top: -.02rem;
        left: -.04rem;
        width: 1rem;
        text-align: center;
        font-size: 0.18rem;
        color: #FFFFFF;
        transform: rotate(-20deg);
        -ms-transform: rotate(-20deg);
        -moz-transform: rotate(-20deg);
        -webkit-transform: rotate(-20deg);
        -o-transform: rotate(-20deg);
      }
    }
  }

  .data-view {
    width: 5.33rem;
    height: 2.5rem;
    overflow-y: auto;
    align-content: center;
    position: absolute;
    top: 2.4rem;
    left: .3rem;
    font-size: 0.2rem;
    text-align: center;

    .data-arr {
      display: flex;
      justify-content: space-evenly;
      width: 100%;
      height: 0.63rem;
      margin: .15rem 0;
      line-height: .63rem;
      background-color: #ffffff;
      border-radius: 0.15rem;

      .data-one {
        width: 34%;
        text-align: center;
      }
    }
  }

  .close-btn {
    position: absolute;
    top: .2rem;
    right: 0.3rem;
    width: 1rem;
    height: 1rem;
  }

  .close-btn-bottom {
    position: absolute;
    bottom: 0;
    left: 2rem;
    width: 2rem;
    height: 1rem;
  }
}

img {
  margin: 0 auto;
}
</style>
