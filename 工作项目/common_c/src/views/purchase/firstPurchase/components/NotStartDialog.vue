<template>
  <!-- 活动结束弹窗 -->
  <div class="box">
    <img src="../assets/img/dialog-notStart.png"
         class="popup">

    <!-- 去店铺首页 -->
    <div style="text-align: center" class="shop-btn-view">
      <div class="shop-btn" @click="gotoShop()">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FinishDialog',
  props: {
    pageStyle: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {};
  },
  methods: {
    gotoShop() {
      const shopId = sessionStorage.getItem('LZ_CRM_CUSTOMER_ShopId');
      window.location.href = `https://shop.m.jd.com/?shopId=${shopId}`;
    },
    closeDialog() {
      this.$emit('closeDialog');
    },
  },
};
</script>

<style lang='scss' scoped>
.box {
  position: relative;

  .popup {
    width: 6rem;
  }

  .shop-btn-view {
    width: 100%;
    position: absolute;
    bottom: .95rem;
  }

  .shop-btn {
    width: 3rem;
    height: 0.79rem;
    margin: 0 auto;
    display: flex;
  }
}
</style>
