<!--
 * @Author: YC
 * @Date: 2020-12-01 14:31:32
 * @LastEditors: YC
 * @LastEditTime: 2021-01-07 11:02:02
 * @Description:
-->
<template>
  <div class="page-test">
    <p>1231231231</p>
    <p>1231231231</p>
    <p>1231231231</p>
    <p>1231231231</p>
    <button>Test</button>
  </div>
</template>
<script>
import contant from 'lz-crm/lib/constant';
import {
  mapState,
  mapMutations,
} from 'vuex';

export default {
  name: 'Test',
  data() {
    return {
      contant,
    };
  },
  created() {
  },
};

</script>
<style lang="scss">
@import '~lz-crm/style/variables';

.page-test {}

</style>
