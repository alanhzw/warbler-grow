<template>
  <div style="font-size: 16px">
    <!-- <lz-page-header :title="$route.meta.title"/> -->
    <div class="lz-page-main">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BizApp',
};
</script>

<style lang="scss" scoped>
.lz-page-main {
  margin: 20px;
}

</style>
<style>
.lz-tab-pane {
  overflow: visible;
}
</style>
