<template>
  <!-- 攻略弹窗 -->
  <div class="box">
    <img :src="pageStyle.backgroundImage"
         class="popup">
  </div>
</template>

<script>
export default {
  name: 'StragegyDialog',
  props: {
    pageStyle: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang='scss' scoped>
.box {
  position: relative;

  .popup {
    width: 7rem;
  }
}
</style>
