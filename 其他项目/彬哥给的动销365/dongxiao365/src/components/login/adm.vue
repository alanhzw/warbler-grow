<template>

</template>

<script>
  export default {
    name: "adm",
    data() {
      return {
        loading: null
      }
    },
    created() {
      this.loading = this.$loading({
        lock: true,
        text: '获取登录授权中...',
        spinner: 'el-icon-loading'
      });

      const code = this.$route.query.code;
      const state = this.$route.query.state;


      this.$http.post('/login/adm', {
        code: code,
        state: state
      }, r => {
        this.onSuccess(r.data);

      })
      // 获取用户令牌
    },
    methods: {
      onSuccess(obj) {
        localStorage.access_token = obj.access_token;
        localStorage.expire = obj.expire;
        localStorage.style = obj.style;
        localStorage.user = encodeURIComponent(JSON.stringify(obj.user));
        localStorage.corp = encodeURIComponent(JSON.stringify(obj.corp));
        localStorage.menus = encodeURIComponent(JSON.stringify(obj.menus));
        const currentTime = new Date().getTime();
        const time = parseInt(obj.expire, 10) * 1000;// to ms
        localStorage.expireTime = this.$util.format_time(new Date(currentTime + time));
        const redirect = this.$route.query.redirect || '/';
        this.loading.close();
        this.$router.replace({path: '/'});
      }
    }
  }
</script>

<style scoped>

</style>
