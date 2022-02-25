<template>

  <!-- 此页还没写,之后提取 -->
  <div class="ISelectPopup">
    <!-- 选择规格 弹窗 -->
    <van-popup v-model="showSelect" :style="{ height: '40%' }" position="bottom" @close="closeDialog">
      <p class="popup_title">选择规格</p>
      <div class="pop_container">
        <div v-for="(o, index) in options" :key="o.prizeId" :class="[(o.operation === 0 || o.operation === null) ? (o.select ? 'select_item' : 'other_item') : 'dis_item']"
             class="item"
             @click="changeItem(o.prizeId, index, o.operation)">
          <span>{{ o.prizeName }}</span>
        </div>
      </div>
      <div class="IShortButton2 iosButtonPop">
        <van-button block type="danger" @click="saveChange()">确认</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'ISelect',
  props: ['options', 'showSelect'],
  data() {
    return {
      prizeId: '',
      pindex: '',
      prizeName: '',
    };
  },
  methods: {
    // 选中
    changeItem(prizeId, index, num) {
      // operation    是否可以操作   0：可以点击兑换，1：不可以
      if (num === 1) {
        return;
      }
      this.prizeId = prizeId;
      this.pindex = index;
      // 变色
      this.$emit('changeItem', prizeId);
    },
    saveChange() {
      if (!this.prizeId) {
        this.prizeId = this.options.find((v) => v.select) ? this.options.find((v) => v.select).prizeId : this.options[0].prizeId;
      }
      this.$emit('saveChange', this.prizeId, this.pindex);
    },
    closeDialog() {
      this.$emit('closeDialog');
    },
  },
};
</script>

<style scoped>
.popup_title {
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
}

.pop_container {
  display: flex;
  flex-direction: row;
  justify-content: start;
  flex-wrap: wrap;
  align-items: flex-start;
  overflow-y: auto;
}

.item {
  display: inline-block;
  padding: 0.03rem 0.2rem 0.04rem 0.2rem;
  background: #ffffff;
  font-size: 0.24rem;
  margin-left: 0.2rem;
  word-wrap: initial;
  margin-bottom: 0.1rem;
  border-radius: 0.3rem;
  /* position: relative; */
  height: 0.3rem;
  margin-top: 0.1rem;
}

.item_icon {
  width: 0.2rem;
  position: absolute;
  right: 0;
  bottom: 0;
}

.IShortButton2 {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 0.3rem;
  box-sizing: border-box;
  z-index: 5000;
}

.IShortButton >>> .van-button {
  width: 100%;
  height: 1rem;
}

.select_item {
  border: 1px solid #e2231a;
  color: #e2231a;
  background: #f9dad9;
}

.other_item {
  border: 1px solid #e8e8e8;
  background: #e8e8e8;
  color: #676767;
}

.dis_item {
  border: 1px solid #f0f0f0;
  background: #e8e8e8;
  color: #cacaca;
}
</style>
