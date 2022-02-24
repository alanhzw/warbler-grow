<!--
 * @Description:选择地址和规格组件
 * @Autor: hanzhiwei
 * @Date: 2020-12-29 16:59:14
 * @LastEditTime: 2021-01-11 10:19:52
 * @FilePath: \SNActivity\src\components\pointsExchange\Select.vue
-->
<template>
  <div class="select-box">
    <div class="top">
      <p class="top-title">已选规格</p>
      <div class="right" @click="showSelectGoods()">
        <p class="right-text">{{ defaultSelect }}</p>
        <van-icon name="arrow" class="right-icon" />
      </div>
    </div>
    <div class="bottom">
      <p class="bottom-title">送至</p>
      <div class="right" @click="showAddressModal()">
        <p class="right-text">{{ addressStr }}</p>
        <van-icon name="arrow" class="right-icon" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      selectedItem: 0, // 选择的规格
      prizeId: '', // 奖品id
    };
  },
  props: {
    options: {
      default: () => ({}),
    },
    activityInfo: {
      default: () => ({}),
    },
  },
  computed: {
    addressStr () {
      let temp = '';
      if (this.activityInfo.province) {
        temp = this.activityInfo.province + this.activityInfo.city + this.activityInfo.county + this.activityInfo.detailInfo;
      } else {
        temp = '点击新建收货地址';
      }
      return temp;
    },
    defaultSelect () {
      if (this.activityInfo.wareData) {
        return this.activityInfo.wareData[this.activityInfo.selectedItem].prizeName;
      }
      return '';
    }
  },
  methods: {
    /**
    * @description: 展示选择规格弹窗
    */
    showSelectGoods () {
      this.$emit('showSelectGoods');
    },
    /**
    * @description: 展示选择地址弹窗
    */
    showAddressModal () {
      this.$emit('showAddressModal');
    },

  }
};
</script>

<style lang="scss">
.select-box {
  width: 100%;
  background: #ffffff;
  box-sizing: border-box;
  padding: 0.3rem 0.3rem 0.14rem 0.3rem;
  margin-bottom: 0.2rem;

  .right-icon {
    padding-top: 0.08rem;
    height: 0.24rem;
    color: #a7a7a7;
  }

  .top {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding-bottom: 0.24rem;
    border-bottom: 1px solid #ecebeb;

    .top-title {
      color: #303030;
      font-size: 0.3rem;
      text-align: left;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    .right {
      width: 70%;
      font-size: 0.24rem;
      padding-top: 0.14rem;
      display: flex;
      justify-content: flex-end;

      .right-text {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #a7a7a7;
        margin-top: 0.03rem;
      }
    }
  }

  .bottom {
    height: 0.7rem;
    padding-top: 0.1rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .bottom-title {
      color: #303030;
      font-size: 0.3rem;
      text-align: left;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    .right {
      width: 70%;
      font-size: 0.24rem;
      padding-top: 0.14rem;
      display: flex;
      justify-content: flex-end;

      .right-text {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #a7a7a7;
        margin-top: 0.03rem;
      }
    }
  }
}
</style>