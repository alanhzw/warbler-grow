<template>
  <div class="IDialog">
    <!-- 权益已兑完 请填写收货地址-->
    <van-dialog v-model="showFinish"
                :before-close='closeDialog'
                :closeOnClickOverlay="true"
                :show-cancel-button="false"
                :show-confirm-button="false">
      <div class="dialog_div">{{ text }}</div>
      <footer class="footer">
        <div style="width: 100%;" @click="closeDialog">关闭</div>
      </footer>
    </van-dialog>
    <!-- 权益兑换成功 -->
    <van-dialog v-model="showSuccess"
                :before-close='closeDialog'
                :closeOnClickOverlay="true"
                :show-cancel-button="false"
                :show-confirm-button="false">
      <div class="dialog_div">{{ text }}</div>
      <footer class="footer">
        <div style="width: 100%;" @click="toCenter">返回会员中心</div>
      </footer>
    </van-dialog>
    <!-- 删除按钮 -->
    <div v-if="showDelete && btns">
      <van-dialog v-model="showDelete"
                  :before-close='closeDialog'
                  :closeOnClickOverlay="true"
                  :loading="false"
                  :show-cancel-button="false"
                  :show-confirm-button="false">
        <div class="dialog_div">{{ btns[0] }}</div>
        <footer class="footer">
          <div @click="toCancel">{{ btns[2] }}</div>
          <div @click="toHandler">{{ btns[1] }}</div>
        </footer>
      </van-dialog>
    </div>
    <!-- 会员专项折扣 -->
    <van-dialog v-model="showBuyDic"
                :before-close='closeDialog'
                :closeOnClickOverlay="true"
                :show-cancel-button="false"
                :show-confirm-button="false">
      <div class="dialog_div">兑换成功</div>
      <footer class="footer">
        <div v-lz-click.isMain="'jump_to_buy_link'" style="width: 100%;" @click="goBuy">去购买</div>
      </footer>
    </van-dialog>
    <!-- 积分兑换礼品卡 -->
    <van-dialog v-model="showBuy"
                title="确认"
                :before-close='closeDialog'
                :closeOnClickOverlay="true"
                :show-cancel-button="false"
                :show-confirm-button="false">
      <div class="dialog_div">兑换成功</div>
      <footer class="footer">
        <div v-lz-click.isMain="'106'" style="width: 100%;" @click="goBuy">去购买</div>
      </footer>
    </van-dialog>
    <!-- 积分加钱购立即兑换 -->
    <van-dialog v-model="showConfirm"
                title="确认"
                :before-close='closeDialog'
                :closeOnClickOverlay="true"
                :show-cancel-button="false"
                :show-confirm-button="false">
      <div class="dialog_div">确定要花费{{tips}}积分兑换{{rightsName}}吗？</div>
      <footer class="footer">
        <div @click="toCancel" style="background: #D7D7D7">取消</div>
        <div v-lz-click.isMain="'106'" @click="exchange">立即兑换</div>
      </footer>
    </van-dialog>
    <!-- 积分兑换礼品卡成功后 -->
    <van-dialog v-model="showKnow"
                title="确认"
                :before-close='closeDialog'
                :closeOnClickOverlay="true"
                :show-cancel-button="false"
                :show-confirm-button="false">
      <div class="dialog_div">兑换成功，可以进入会员中心>积分兑换记录中查看</div>
      <footer class="footer">
        <div style="width: 100%;" @click="goBuy">知道了</div>
      </footer>
    </van-dialog>

  </div>
</template>
<script>
export default {
  name: 'IDialog',
  props: ['showFinish', 'showSuccess', 'text', 'showDelete', 'btns', 'showBuy', 'showBuyDic', 'type', 'showConfirm', 'tips', 'showKnow', 'rightsName'],
  methods: {
    toTicket() {
      this.$router.push({
        name: 'PointsRecords',
      });
    },
    toCenter() {
      this.$router.push({
        name: 'PersonalCenter',
        params: {
          shopId: sessionStorage.getItem('LZ_CRM_CUSTOMER_ShopId') || null,
        },
      });
    },
    goOtherLink() {

    },
    closeDialog() {
      this.$emit('closeDialog');
    },
    toHandler() {
      this.$emit('toHandler');
    },
    toCancel() {
      this.$emit('closeDialog');
    },
    goBuy() {
      this.$emit('goBuy');
    },
    exchange() {
      this.$emit('exchange');
    },
  },

};
</script>
<style scoped>
.IDialog >>> .van-dialog {
  width: 70%;
  border-radius: 0.2rem;
}

.dialog_div {
  height: 2.6rem;
  justify-content: center;
  align-items: center;
  display: flex;
  box-sizing: border-box;
  padding: 0.3rem;
}

.IDialog >>> .van-button--default {
  color: #333333;
  font-size: 0.3rem;
}

.IDialog >>> .van-dialog__confirm, .van-dialog__confirm:active {
  background: #0083ff;
  color: #ffffff;
  font-size: 0.3rem;
}

.IDialog >>> .van-dialog__header {
  background: #D7D7D7;
  padding-top:0.3rem;
  padding-bottom:0.3rem;
}

.footer {
  height: 0.9rem;
  line-height: 0.9rem;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
}

.footer div {
  border-top: 1px solid #e0e0e0;
  width: 50%;
}

.footer div:last-child {
  border-top: 1px solid #0083ff;
  background: #0083ff;
  color: #fff;
}
</style>
