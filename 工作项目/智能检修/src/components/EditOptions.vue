<!--
 * @Description:
 *    编辑页面组件
 * @Author:HJ
 * @Date: 2021-05-05
 * @LastEditTime: 2021-05-14
 * @FilePath: \intelligent-overhaul-app\src\components\EditOptions.vue
-->
<template>
  <div class="security-bottom" v-if='editing > -1'>
    <div @click="cancle">取消</div>
    <div @click='confirm'>完成</div>
  </div>
</template>

<script>
export default {
  props: {
    editing: {
      type: Number,
      default: -1
    }
  },
  methods: {
    //取消修改
    cancle () {
      this.$emit('cancle')
    },
    //完成修改
    confirm () {
      this.$emit("confirm")
    }
  }
}
</script>

<style lang='scss'>
.security-bottom {
  width: 100vw;
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #cccccc;
  background-color: #fff;
  transform: translateX(-0.32rem);
  div {
    padding: 0.28rem 0.32rem;
    color: #045bb8;
    font-size: 0.32rem;
  }
}
</style>