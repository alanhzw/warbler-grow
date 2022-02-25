<template>
  <div class="IOpenCard">
    <div v-if="isShowOpenCard1">
      <van-dialog v-model="isShowOpenCard1"
                  :before-close='closeDialog'
                  :closeOnClickOverlay="true"
                  :loading="false"
                  :show-cancel-button="false"
                  :show-confirm-button="false">
        <div class="dialog_div">
          <div>
            <p>您需先成为开卡会员，</p>
            <p>才可参与会员活动</p>
          </div>
        </div>
        <footer class="footer">
          <div @click="toHandler($event)">立刻开卡</div>
          <div @click="toCancel">随便逛逛</div>
        </footer>
      </van-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name: 'IOpenCard',
  props: ['isShowOpenCard'],
  computed: {
    isShowOpenCard1() {
      return this.isShowOpenCard;
    },
  },
  methods: {
    closeDialog() {
      this.$emit('closeCardDialog');
    },
    toHandler(evt) {
      this.$emit('toHandler', evt);
    },
    toCancel() {
      this.$emit('closeCardDialog');
    },
  },

};
</script>
<style scoped>
.IOpenCard >>> .van-dialog {
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

.IOpenCard >>> .van-button--default {
  color: #333333;
  font-size: 0.3rem;
}

.IOpenCard >>> .van-dialog__confirm, .van-dialog__confirm:active {
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
