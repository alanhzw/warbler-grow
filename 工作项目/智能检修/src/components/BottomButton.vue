<!--
 * @Description:
 *     底部按钮的组件
 * @Author:HJ
 * @Date: 2021-05-05
 * @LastEditTime: 2021-05-12
 * @FilePath: \intelligent-overhaul-app\src\components\BottomButton.vue
-->
<template>
  <div class="bottom-button">
    <div class="content">
      <slot>

      </slot>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss'>
.bottom-button {
  width: 100vw;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
  .content {
    display: flex;
    padding: 0.26rem 0.32rem 0.2rem 0.32rem;
    border-top: 1px solid #cccccc;
    button {
      flex: 1;
      border-radius: 4px !important;
      font-size: 0.32rem;
      border: none;
    }
  }
  .whiteBtn {
    background-color: #fff !important;
    border: 1px solid #dddddd !important;
    margin-right: 0.22rem;
    color: rgba(0, 0, 0, 1) !important;
  }
}
</style>