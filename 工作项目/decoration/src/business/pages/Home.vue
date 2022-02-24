<!--
 * @Author: YC
 * @Date: 2020-12-11 11:27:10
 * @LastEditors: YC
 * @LastEditTime: 2020-12-18 15:42:55
 * @Description:
-->
<template>
  <div class="demo-page">
    <div class="component">
      <lz-page-header title="lz-page-header : 页面标题"/>
    </div>

    <div class="component">
      <lz-page-header title="页面标题">
        <lz-button type="primary" size="small" slot="rightSlot">主要按钮</lz-button>
      </lz-page-header>
    </div>


    <div class="component">
      <lz-page-section>lz-page-section : 这是一段内容区域</lz-page-section>
      <lz-page-section>这是另一段内容区域，默认处理的上下10px外边距和四周20px内边距</lz-page-section>
      <lz-page-section>
        <lz-title title="lz-title : 这是一个栏目标题"/>
      </lz-page-section>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
  },
};
</script>
<style lang="scss" scoped>
.demo-page {
  .component {
    margin: 20px;

    border: 1px solid red;
  }
}
</style>
