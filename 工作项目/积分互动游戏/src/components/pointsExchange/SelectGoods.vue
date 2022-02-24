<!--
 * @Description:
 * @Autor: hanzhiwei
 * @Date: 2020-12-31 11:29:30
 * @LastEditTime: 2021-01-13 18:47:45
 * @FilePath: \SNActivity\src\components\pointsExchange\SelectGoods.vue
-->
<template>
  <div class="selsect-goods-box">
    <!-- 选择规格 弹窗 -->
    <div class="popup">
      <van-popup v-model="isShowSelectGoods" closeable position="bottom" :style="{ height: '40%' }" @close="closeSelectGoods()">
        <p class="popup-title">选择规格</p>
        <div class="pop-container">
          <div class="item" v-for="(item, index) in activityInfo.wareData" :key="item.prizeId" :class="{'select-item':selectedItem==index,'other-item':selectedItem!=index,'dis-item':item.operation}"
            @click="changeItem(item.prizeId, index)">
            <span>{{item.prizeName}}</span>
          </div>
        </div>
        <div class="button">
          <van-button type="danger" block @click="changeWareParamsPrize()" elemName="选择规格确认" :primaryKey="0" elemId="004">确认</van-button>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      isShowSelectGoods: false, // 是否展示选择规格弹窗
      selectedItem: 0, // 选择的规格
      prizeId: '', // 奖品id
    };
  },
  props: {
    activityInfo: {
      default: () => ({}),
    },
  },
  methods: {
    /**
    * @description: 展示选择规格弹窗
    */
    showSelectGoods () {
      this.isShowSelectGoods = true;
    },
    /**
    * @description: 关闭选择规格弹窗
    */
    closeSelectGoods () {
      this.isShowSelectGoods = false;
    },
    /**
     * @description: 修改选择的规格
     */
    changeItem (prizeId, index) {
      this.selectedItem = index;
      this.prizeId = prizeId;
      console.log('prizeId', prizeId);
    },
    /**
     * @description: 确认修改规格
     */
    changeWareParamsPrize () {
      this.$emit('changeWareParamsPrize', this.prizeId, this.selectedItem);
      this.isShowSelectGoods = false;
    },
  }
};
</script>

<style lang="scss">
.selsect-goods-box {
  .popup {
    .popup-title {
      width: 100%;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
    }

    .button {
      position: fixed;
      bottom: 0;
      width: 100%;
      padding: 0.3rem;
      box-sizing: border-box;
      z-index: 5000;
    }

    .pop-container {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      flex-direction: row;
      justify-content: start;
      flex-wrap: wrap;
      align-items: flex-start;
      overflow-y: auto;

      .item {
        display: inline-block;
        padding: 0.03rem 0.2rem 0.04rem 0.2rem;
        background: #ffffff;
        font-size: 0.24rem;
        margin-left: 0.2rem;
        word-wrap: initial;
        margin-bottom: 0.1rem;
        border-radius: 0.3rem;
        position: relative;
        height: 0.3rem;
        margin-top: 0.1rem;
      }

      .select-item {
        border: 1px solid #e2231a;
        color: #e2231a;
        background: #f9dad9;
      }

      .other-item {
        border: 1px solid #e8e8e8;
        background: #e8e8e8;
        color: #676767;
      }

      .dis-item {
        border: 1px solid #f0f0f0;
        background: #e8e8e8;
        color: #cacaca;
      }
    }
  }
}
</style>