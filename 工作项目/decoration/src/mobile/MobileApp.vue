<!--
 * @Description:
 * @Date: 2021-04-08 18:40:30
 * @LastEditTime: 2021-12-13 14:59:05
 * @FilePath: \decoration\src\mobile\MobileApp.vue
-->
<template>
  <div id="mobile-app">
    <router-view v-show="!enterLoading" />
    <!-- <img class="enter-loading" src="/images/entering.gif" alt=""> -->
    <div id="entry-loading-cover"
         v-if="enterLoading" />

    <van-overlay :show="pageLoading" />
    <van-loading v-if="pageLoading"
                 class="lz-loading" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import setHeaderShare from '@/utils/jdShare/index';

export default {
  name: 'Decoration',
  data() {
    return {};
  },
  computed: {
    ...mapState(['enterLoading', 'pageLoading']),
  },
  created() { },
  methods: {},
  mounted() {
    setHeaderShare({
      type: '1',
      title: '会员中心',
    });
  },
};
</script>

<style lang="scss">
@import '~lz-crm/style/variables';

* {
  user-select: none;
}

body {
  background-color: $BG_BLOCK_GRAY;
}

#mobile-app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 0.16rem;

  .enter-loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vm;
    height: 100vh;
  }
}

#entry-loading-cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // background-image: url('/images/entering.gif');
  background-size: cover;
  background-position: center;
}
.lz-loading {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
