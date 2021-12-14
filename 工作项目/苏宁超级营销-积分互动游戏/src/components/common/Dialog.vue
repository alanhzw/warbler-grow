<!--
 * @Description:弹窗
 * @Autor: hanzhiwei
 * @Date: 2021-01-04 15:34:00
 * @LastEditTime: 2021-01-05 12:19:41
 * @FilePath: \SNActivity\src\components\common\Dialog.vue
-->
<template>
  <div class="dialog-box">
    <!-- type===1  权益兑换成功  -->
    <van-dialog v-if="type===1" v-model="showDialog" :closeOnClickOverlay="true" :show-cancel-button="false" :show-confirm-button="false" :before-close='closeDialog'>
      <div class="dialog-div">{{text}}</div>
      <footer class="footer">
        <div style="width: 100%;" @click="toCenter">返回会员中心</div>
      </footer>
    </van-dialog>
    <!-- type===2  是否确认删除  -->
    <van-dialog v-if="type===2" v-model="showDialog" :closeOnClickOverlay="true" :show-confirm-button="false" :show-cancel-button="false" :loading="false" :before-close='closeDialog'>
      <div class="dialog-div">{{text}}</div>
      <footer class="footer">
        <div @click="closeDialog()">取消</div>
        <div @click="toDelete()">删除</div>
      </footer>
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    type: {
      default: () => (''),
    },
    activityInfo: {
      default: () => ({}),
    },
    unionld: {
      default: () => (''),
    },
    shopId: {
      default: () => (''),
    },
    addressId: {
      default: () => (''),
    },
  },
  data () {
    return {
      showDialog: false, // 是否展示弹窗
      text: '', // 提示内容
    };
  },
  methods: {
    // 关闭弹窗
    closeDialog () {
      this.showDialog = false;
    },
    // 打开弹窗
    openDialog (text) {
      this.text = text;
      this.showDialog = true;
    },
    // 去个人中心
    toCenter () {
      this.$router.push({
        name: 'PersonalCenter',
        query: {
          shopId: this.activityInfo.shopId,
          unionld: this.unionld,
          entrance: 'pointsExchange'
        }
      });
    },
    // 取消删除
    toDelete () {
      this.$emit('toDelete', this.addressId);
    }

  }
};
</script>

<style lang="scss">
.dialog-box {
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

    div:last-child {
      border-top: 1px solid #0083ff;
      background: #0083ff;
      color: #fff;
    }
  }
}
</style>