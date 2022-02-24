<template>
  <div id="mobile-app">
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Interact',
  data() {
    return {};
  },
  computed: {
    ...mapState(['enterLoading', 'pageLoading']),
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss">
@import "~lz-crm/style/variables";

* {
  user-select: auto;
}

body {
  background-color: $BG_BLOCK_GRAY;
}

#mobile-app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 0.32rem;

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
::-webkit-scrollbar{
  display: none;
}
</style>
