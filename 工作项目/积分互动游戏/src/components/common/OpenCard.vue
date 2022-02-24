<!--
 * @Description:
 * @Autor: hanzhiwei
 * @Date: 2020-12-04 15:54:30
 * @LastEditTime: 2021-01-21 10:24:31
 * @FilePath: \SNActivity\src\components\common\OpenCard.vue
-->
<template>
  <div class="open-card-views">
    <!--v-if='showModal'  -->
    <div class="open-card-box" v-if='showModal'>
      <div class="shadow"></div>
      <div class="opencard-img">
        <div class="text-box">
          <p class="no-vip">您未加入会员,</p>
          <p class="no-activity">无法参与活动!</p>
          <p class="join-vip">绑定会员即享优惠</p>
        </div>
        <div class="goOpenCard" @click="goOpenCard()"></div>
        <div class="close" @click="closeModal()">
          <img src="../../assets/img/close-gray.png">
        </div>
      </div>
    </div>
    <van-dialog v-model="isShowDialog" :closeOnClickOverlay="true" :show-confirm-button="false" :show-cancel-button="false" :loading="false" :before-close='closeDialog'>
      <div class="dialog-div">未开卡不能参与活动</div>
      <footer class="footer">
        <div style="width: 50%;" @click="closeDialog">取消</div>
        <div style="width: 50%;"><a style="color:#ffffff" :href="`https://shop.m.suning.com/${activityInfo.shopId}.html`">
            去店铺首页</a></div>
      </footer>
    </van-dialog>
  </div>
</template>

<script>
// 引入封装api
import { commonService } from '@/axios/apis';
export default {
  data () {
    return {
      showModal: false, // 开卡弹窗
      isShowDialog: false, // 取消开卡提示框
    };
  },
  props: {
    options: {
      default: () => ({}),
    },
    activityInfo: {
      default: () => ({}),
    },
    unionld: {
      default: () => ({}),
    }
  },
  methods: {
    /**
     * @description: 去开卡
     */
    async goOpenCard () {
      await commonService['goOpenCard']({
        shopId: this.activityInfo.shopId,
        snUnionId: this.unionld,
        sourceNo: 1,
      }).then(({ data }) => {
        if (data.result) {
          this.showModal = false;
          this.$toast('开卡成功');
          setTimeout(() => {
            this.$emit('getActivityInfo');
          }, 1000);
        } else {
          this.$toast(data.errorMessage);
        }
      });
    },
    // 取消开卡
    closeModal () {
      this.showModal = false;
      this.isShowDialog = true;
    },
    // 关闭提示框
    closeDialog () {
      this.isShowDialog = false;
      this.showModal = true;
    }
  },
};
</script>

<style lang="scss">
.open-card-views {
  .open-card-box {
    position: relative;
    display: flex;
    justify-content: center;

    .close {
      position: absolute;
      top: 0;
      right: 0.5rem;
    }
    .shadow {
      width: 100%;
      height: 100vh;
      background-color: black;
      position: fixed;
      top: 0;
      left: 0;
      opacity: 0.6;
      z-index: 10;
    }
    .opencard-img {
      background: url('https://uimgproxy.suning.cn/uimg1/sop/commodity/lOrbw9N8miBdktc2iMXJ_w.png');
      background-size: contain;
      background-repeat: no-repeat;
      position: fixed;
      display: flex;
      justify-content: center;
      width: 7rem;
      height: 7rem;
      top: 3rem;
      z-index: 11;

      .text-box {
        position: absolute;
        top: 1.4rem;
        width: 100%;
        z-index: 11;
        p {
          display: block;
          width: 100%;
        }
      }
      .goOpenCard {
        width: 100%;
        height: 1rem;
        position: absolute;
        top: 5.6rem;
      }
    }
    .no-vip,
    .no-activity {
      z-index: 999;
      font-size: 0.34rem;
      text-align: center;
      color: rgb(143, 107, 39);
      font-weight: 600;
      height: 0.5rem;
      line-height: 0.5rem;
    }
    .join-vip {
      font-size: 0.2rem;
      text-align: center;
      color: rgb(143, 107, 39);
      font-weight: 400;
      height: 0.5rem;
      line-height: 0.5rem;
    }
  }
  .dialog-div {
    height: 2.6rem;
    justify-content: center;
    align-items: center;
    display: flex;
    box-sizing: border-box;
    padding: 0.3rem;
  }

  .van-dialog {
    width: 70%;
    border-radius: 0.2rem;
  }

  .van-button--default {
    color: #333333;
    font-size: 0.3rem;
  }

  .van-dialog__confirm:active {
    background: #0083ff;
    color: #ffffff;
    font-size: 0.3rem;
  }

  .footer {
    height: 0.9rem;
    line-height: 0.9rem;
    display: flex;
    justify-content: center;
    box-sizing: border-box;

    div {
      text-align: center;
      border-top: 1px solid #e0e0e0;
      width: 50%;
    }
    div:first-child {
      border-top: 1px solid #d4cccc;
      background: #d4cccc;
      color: #fff;
    }
    div:last-child {
      border-top: 1px solid #0083ff;
      background: #0083ff;
      color: #fff;
    }
  }
}
</style>