<template>
  <div>
    <div id="loginPage" class="page-content">
      <div class="cover">
        <div class="container">
          <el-row>
            <el-col :span="16" class="text-center">
              <br>
              <br>
              <br>
              <h1>实力品牌 专业技能 技术人才 创新科技 永不止步</h1>
              <p style="font-size: x-small">FOCUS ON WEB DESIGN BRAND POSITIONING HELP YOU REALIZE THE VALUE OF INTERNET BRAND</p>
              <p>专注高端 精准定位 用心服务 帮您实现品牌价值</p>
            </el-col>
            <el-col :span="8">
              <el-card style="height: 300px;">
                <div v-if="corpList.length>0">
                  <el-carousel :interval="5000" :autoplay="false" indicator-position="none" arrow="always">
                    <el-carousel-item v-for="item in corpList" :key="item.corpId" class="crop-list">
                      <div class="crop-list-item" @click="doLogin(item)">
                        <div><img src="../assets/img/default-avatar.png"/></div>
                        <div>{{item.corpName}}</div>
                      </div>
                    </el-carousel-item>
                  </el-carousel>
                </div>
                <div class="text-danger text-center login-error" v-if="error">
                  <p>
                    {{error}}
                  </p>
                  <el-button type="primary" @click="$router.replace('/login')">返回登陆页面</el-button>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="footer black-footer">
      <p>地 址：西安市高新区高新一路25号S713 </p>
      <p>邮 箱：service@datass.cn </p>
      <p>电 话：029-83810688 </p>
      <p>传 真：029-83810688</p>
      <p>Copyright ©大数科技,Inc.All rights reserved. 网站地图 陕ICP备14008667号-1</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "scan_auth",
    data() {
      return {
        code: '',
        corpList: [],
        error: ''
      }
    },
    created() {
      this.code = this.$route.query.code;
    },
    mounted() {
      this.$http.post('/ding/scanLogin', {code: this.code}, r => {

        this.corpList = r.data;
        if (this.corpList.length === 1) {
          this.doLogin(this.corpList[0]);
        }
      }, e => {

        this.error = e.msg;
      });
    },
    methods: {
      doLogin(item) {
        this.$http.post('/ding/login', {corpId: item.corpId, userId: item.userId}, r => {
          this.onSuccess(r.data);
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

<style lang="scss" scoped>

  .crop-list {
    display: flex;
    height: 100%;
    align-items: center;
    color: #333;
    .crop-list-item {
      cursor: pointer;
      text-align: center;
      width: 100%;
    }
  }

  .main-page {
    margin: 0;
    padding: 0 !important;
  }

  .loading-box {
    padding-bottom: 0;
    width: auto;
    .el-icon-loading {
      font-size: xx-large;
    }
  }

  #loginPage {
    width: 100%;
    .cover {
      padding: 45px 0;
      display: flex;
      align-items: center;
      background: #000 url("../assets/img/banner02.jpg") no-repeat;
      background-size: cover;
      color: white;
      h1 {
        font-size: xx-large;
      }
    }
  }

  .container {
    width: 1200px;
    margin: auto;
  }

  .black-footer {
    color: #bdbdbd;
    padding: 10px;
    line-height: 1;
    font-size: small;
    text-align: center;
  }
</style>
