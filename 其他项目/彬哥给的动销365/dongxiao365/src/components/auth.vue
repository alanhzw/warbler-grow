<template>

</template>

<script>
  export default {
    name: "auth",
    data() {
      return {
        corpId: '',
        jsApiList: [
         'device.notification.alert',
         'device.notification.confirm',
         'device.notification.prompt',
         'device.notification.toast',
         'device.notification.actionSheet',
         'biz.navigation.setLeft',
         'biz.navigation.setTitle',
         'biz.navigation.quit',
         'addEventListener',
         'removeEventListener',
         'runtime.permission.requestAuthCode',
         'runtime.permission.requestOperateAuthCode',
         'biz.cspace.preview',
         'biz.util.open',
         'biz.util.openModal',
         'biz.util.openSlidePanel',
         'biz.util.previewImage',
         'biz.util.openLink',
         'biz.util.downloadFile',
         'biz.util.openLocalFile',
         'biz.util.isLocalFileExist',
         'biz.util.ut',
         'biz.util.uploadImage',
         'biz.ding.post',
         'biz.contact.choose',
         'biz.customContact.choose',
         'biz.customContact.multipleChoose',
         'biz.contact.externalComplexPicker',
         'biz.user.get']
      }
    },
    created() {
      this.loading = this.$loading({
        lock: true,
        text: '获取钉钉授权中...',
        spinner: 'el-icon-loading'
      });
      this.corpId = this.$route.query.corpId || this.$util.url.query("corpId");

      this.$http.get('/ding/api/get_js_config', {corpId: this.corpId, appId: this.appId, url: location.href}, (r) => {
        const options = r.content;
        options.jsApiList = this.jsApiList;
        options.type = 1;

        DingTalkPC.config(options);
      });

      DingTalkPC.ready(() => {
        this.dingLogin();
      });
      DingTalkPC.error((error) => {
        this.loading = this.$loading({
          lock: true,
          text: '获取临时授权码,失败'
        });
        console.error('开始失败');
        console.error(error);
      });
    },
    methods: {
      dingLogin() {
        const that = this;
        console.log('dingLogin')
        DingTalkPC.runtime.permission.requestAuthCode({
          corpId: that.corpId, // 企业ID
          onSuccess: function (result) {
            that.auth(result.code);
          },
          onFail: function (err) {
            console.error('获取临时授权码失败');
            console.error(err);
            that.loading.close();
            that.loading = this.$loading({
              lock: true,
              text: '获取临时授权码,失败'
            });
          }
        });
      },
      auth(code) {
        this.$http.post('/ding/auth', {corpId: this.corpId, code: code, portCode: 'pc'}, r => {
          this.onSuccess(r.data);
          this.loading.close();
        }, e => {
          console.error('登陆失败');
          console.error(e);
          this.$message.error(e.msg);
          this.loading.close();
          this.loading = this.$loading({
            lock: true,
            text: '登录授权失败'
          });
        });
      },
      onSuccess(obj) {
        localStorage.access_token = obj.access_token;
        localStorage.expire = obj.expire;
        localStorage.user = encodeURIComponent(JSON.stringify(obj.user));
        localStorage.corp = encodeURIComponent(JSON.stringify(obj.corp));
        localStorage.menus = encodeURIComponent(JSON.stringify(obj.menus));
        const currentTime = new Date().getTime();
        const time = parseInt(obj.expire, 10) * 1000;// to ms
        localStorage.expireTime = this.$util.format_time(new Date(currentTime + time));
        const redirect = this.$route.query.redirect || '/';
        this.$router.replace({path: redirect});
      }
    }
  }
</script>

<style scoped>

</style>
