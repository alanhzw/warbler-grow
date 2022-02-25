<template>
  <!-- 活动结束弹窗 -->
  <div class="box">
    <img :src="pageStyle.backgroundImage"
         class="popup">

    <!-- 关闭按钮 -->
    <div class="close-btn"
         @click="closeDialog()"></div>

    <!-- 去店铺首页 -->
    <div style="text-align: center" class="shop-btn-view">
      <div class="shop-btn"
           @click="gotoShop()"
           :style="[{background:pageStyle.shopButtonBackgroundColor,color:pageStyle.shopButtonColor}]">
        进入店铺
        <van-icon name="arrow"/>
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

  .close-btn {
    background: url("//img10.360buyimg.com/imgzone/jfs/t1/106244/33/21797/7596/61f0c3e7Ed62d5fc9/83040f42f77793f2.png") no-repeat;
    background-size: contain;
    position: absolute;
    top: 0;
    right: 0;
    width: 1rem;
    height: 1rem;
    overflow: auto;
  }

  .shop-btn-view {
    width: 100%;
    position: absolute;
    bottom: .95rem;
  }

  .shop-btn {
    width: 3rem;
    height: 0.79rem;
    line-height: 0.56rem;
    box-sizing: border-box;
    margin: 0 auto;
    display: flex;
    border-radius: .39rem;
    justify-content: space-between;
    align-items: center;
    padding: 0 .4rem 0 .5rem;
    font-size: 0.41rem;
    background: #000000;
    color: #FFFFFF;
    overflow: auto;
  }
}
</style>
