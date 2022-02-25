<template>
  <div v-cloak
       id="app">
    <div v-show="vloading"
         id="loading">
      <van-loading />
    </div>
    <keep-alive>
      <router-view v-if="this.$route.meta.keepAlive"
                   :key="$route.name+$store.state.keepAlive"></router-view>
      <!--这里是会被缓存的组件-->
    </keep-alive>
    <router-view v-if="!this.$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
import Qs from 'qs';

export default {
  name: 'app',
  computed: {
    vloading() {
      return this.$store.state.loading;
    },
  },
  data() {
    return {
    };
  },

  async mounted() {
    const activityId = this.getParams();
    if (activityId) {
      setTimeout(async () => {
        this.$store.dispatch('asyncChangeStyleOptions', activityId);
      }, 500);
    }
  },
  methods: {
    // 解析url参数
    getParams() {
      let params;
      if (window.location.href.indexOf('sid') > -1) {
        params = Qs.parse(window.location.hash.split('?')[1] || '');
      } else {
        params = Qs.parse(window.location.href.split('?')[1] || '');
      }
      return params.activityId || '';
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow-x: hidden;
  height: 100%;
  font-size: 0.3rem;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 5000;
}
</style>
