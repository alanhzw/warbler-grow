<template>
  <!-- 按钮  -->
  <div class="IShortButton iosButton">
    <div v-if="type === '1'" class="IShortButton1">
      <van-button block type="info" @click="clickBtn">{{ text }}</van-button>
    </div>
    <div v-else class="IShortButton2 iosButton">
      <van-button block type="info" @click="clickBtn">{{ text }}</van-button>
    </div>
  </div>

</template>
<script>
export default {
  name: 'IShortButton',
  props: ['text', 'type'],
  data() {
    return {};
  },
  methods: {
    clickBtn() {
      this.$emit('clickBtn');
    },

  },

};
</script>
<style scoped>
.IShortButton1 {
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
}

.IShortButton2 {
  width: 100%;
  padding: 0.3rem;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
}

.IShortButton >>> .van-button {
  width: 100%;
  height: 1rem;
}
</style>
