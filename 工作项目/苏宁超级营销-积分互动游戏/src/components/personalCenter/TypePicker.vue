<!--
 * @Description:类型选择组件
 * @Autor: hanzhiwei
 * @Date: 2021-01-07 15:53:06
 * @LastEditTime: 2021-01-07 18:42:37
 * @FilePath: \SNActivity\src\components\personalCenter\TypePicker.vue
-->
<template>
  <div class="type-picker-box">
    <van-popup v-model="typeShow" position="bottom" :close-on-click-overlay="false" @click-overlay='closePopup'>
      <van-radio-group v-model="radio" icon-size="16px" @change="changeVal">
        <van-radio v-for="(item, index) in contains" :key='index' :name="item.id" checked-color="#07c160">{{item.value}}</van-radio>
      </van-radio-group>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      typeShow: false, // 是否展示弹出层
      radio: 0, // 选中的选项
      // 列表选项内容
      contains: [
        { id: 0, arr: [301, 302, 303], value: '全部' },
        { id: 1, arr: [301], value: '积分兑换实物商品' },
        { id: 2, arr: [302], value: '积分兑换优惠券' },
        { id: 3, arr: [303], value: '积分兑换云钻' },
      ],
    };
  },
  methods: {
    // 关闭弹出窗口
    closePopup () {
      this.typeShow = false;
    },
    // 切换选项
    changeVal (val) {
      this.typeShow = false;
      let data = this.contains.find(item => {
        return val === item.id;
      });
      let text = data.value;
      let arr = data.arr;
      this.$emit('changeType', text, arr);
    },

  }
};
</script>

<style lang="scss">
.type-picker-box {
  font-size: 0.26rem;

  .van-radio {
    padding-left: 0.24rem;
    height: 0.8rem;
    border-bottom: 1px solid #cacaca;
  }
}
</style>