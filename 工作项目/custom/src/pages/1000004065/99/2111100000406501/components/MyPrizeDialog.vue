<template>
  <!-- 我的奖品弹窗 -->
  <div class="box">
    <img src="../assets/img/dialog/dialog-myprize.png"
         class="popup">

    <div class="prize-view">
      <div class="scroll-view">
        <template v-if="myPrizeArr.length>0">
          <div class="prize-info" :class="{'line-top':index !== 0}" v-for="(item,index) in myPrizeArr" :key="index">
            <div class="prize-name">{{ item.drawInfoName }}</div>
            <div v-if="item.drawType !== 9" class="status-btn" :class="{'gray':item.status===1}"
                 @click="toOtherPage(item)">
              {{ getBtnStatus(item.drawType) }}
            </div>
            <div v-else style="width: .9rem"></div>
          </div>
        </template>
        <div v-else class="none-prize-tip">暂无我的奖品数据</div>
      </div>

      <div class="btn" @click="closeDialog()">返回首页</div>
    </div>

  </div>
</template>

<script lang='ts' setup>
import { defineEmits, defineProps, inject, ref } from 'vue';
import { gotoSkuPage } from '@/utils';
import { BaseInfo } from '@/types/BaseInfo';

const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
// 获取活动id
const { pin } = baseInfo;

const emit = defineEmits(['close']);
const props = defineProps({ myPrizeArr: Array });

const closeDialog = () => {
  emit('close', 'ruleDialog');
};

const getBtnStatus = (type: number) => {
  let str = '';
  if (type === 7) {
    // 实物
    str = '编辑地址';
  } else if (type === 20) {
    // 优惠券
    str = '立即使用';
  } else if (type === 6) {
    // 京豆
    str = '已发放';
  }
  return str;
};

// 跳转通用页面
const toOtherPage = (info: any) => {
  if (info.drawType === 7) {
    // 实物
    window.location.href = `${window.location.origin}/wxAddress/indexPage?pin=${pin}&generateId=${info.addressId}&fromWhere=product`;
  } else if (info.drawType === 20) {
    // 优惠券
    gotoSkuPage(100029371874);
  }
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

  .prize-view {
    width: 100%;
    height: 4.8rem;
    position: absolute;
    top: 1.5rem;
    padding: 0 .5rem;
    box-sizing: border-box;

    .scroll-view {
      height: 3.6rem;
      padding-top: .2rem;
      overflow-y: auto;

      .prize-info {
        padding: .35rem 0;
        margin: 0 .3rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .prize-name {
          font-size: 0.18rem;
          color: #fff4df;
        }

        .status-btn {
          width: .9rem;
          height: .28rem;
          line-height: .28rem;
          font-size: .16rem;
          color: #090909;
          text-align: center;
          background: {
            image: url("../assets/img/index/btn-background.png");
            repeat: no-repeat;
            size: contain;
          };
        }
      }

      .none-prize-tip {
        font-size: .27rem;
        text-align: center;
        margin-top: 1rem;
      }
    }

    .line-top {
      border-top: solid #1f233b 1px;
    }

    .btn {
      width: 2.98rem;
      height: .5rem;
      line-height: .5rem;
      text-align: center;
      font-size: 0.28rem;
      font-weight: 800;
      color: #0b0442;
      position: absolute;
      bottom: .37rem;
      left: 1.24rem;
      background: {
        image: url("../assets/img/dialog/btn-format.png");
        repeat: no-repeat;
        size: cover;
      };
    }
  }
}
</style>
