
<template>
  <div class="page-wx-guide">
    <!-- <qrcode v-if="$route.query.url" class="qrcode" :margin="1" :value="$route.query.url" /> -->
    <!-- <div class="btn-go"
         @click="go2JD"></div> -->
  </div>
</template>
<script>

// import Qrcode from 'vue-qrcode';

export default {
  name: 'WxGuide',
  components: {
    // Qrcode
  },
  mounted() {
    console.log(this.$route.query);
    console.log('mounted');
    // setTimeout(() => {
    //   console.log('go');
    //   this.go2JD();
    // }, 2000);
    document.title = '活动页面';
  },
  methods: {
    go2JD() {
      console.log('Go to JD');
      const url = this.$route.query.url;
      const opt = {
        downAppURl: 'https://wqs.jd.com/downloadApp/downloadAppIOSMPage.html?channel=jd-m',
        downAppIos: 'https://itunes.apple.com/us/app/jing-dong-wang-gou-shou-dan/id414245413',
        downWeixin: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.jingdong.app.mall&g_f=991850',
        downIpad: 'https://itunes.apple.com/cn/app/jing-dong-hd/id434374726?mt=8',
        inteneUrl: 'openApp.jdMobile://virtual?',
        inteneUrlParams: {
          category: 'jump',
          des: 'm',
          url,
        },
        M_sourceFrom: 'mxz',
        openAppEventId: 'MDownLoadFloat_OpenNow',
        openAppEventParam: {},
      };
      // eslint-disable-next-line no-undef
      $.immediateOpenApp(opt);
    },
  },
};
</script>
<style lang="scss" scoped>
.page-wx-guide {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #ec453f;
  // background-image: url(//img10.360buyimg.com/imgzone/jfs/t1/159929/24/4692/190400/600d798bE2de3ee86/9624ef6aff0f52e4.png);
  background-image: url(https://img10.360buyimg.com/imgzone/jfs/t1/142529/8/21182/613530/619f4d59E77f94d7c/14b5e99359f2b319.png);
  background-position: top center;
  background-size: contain;
  background-repeat: no-repeat;
  .btn-go {
    width:4rem;
    height:0.9rem;
    background: url("//img10.360buyimg.com/imgzone/jfs/t1/151671/33/17246/13946/601cc065Eaf43de4b/7b3778e7d0150716.png") center / 100% 100%;
    font-size: 0;
    position: absolute;
    top: 9.2rem;
    left: 50%;
    transform: translateX(-50%);
  }

  .qrcode {
    position: absolute;
    transform: translate(-50%, -50%);
    width: 3rem;
    height: 3rem;
    display: block;
    left: 50vw;
    top: 77%;
  }
}
</style>
