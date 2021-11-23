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
              <div id="login_container" style="width: 365px;height: 320px; background-color: white; overflow: hidden; border-radius: 5px;"></div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="content">
        <div class="container">
          <div class="border search-panel">
            <h1>快捷登陆(仅用于测试) </h1>
            <el-row class="test-login ">
              <el-col :span="8" :key="c.corpId" v-for="c in quickLogin">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>{{c.corpName}}</span>
                  </div>
                  <el-tree
                    v-loading="c.loading"
                    :data="c.users"
                    :empty-text="c.emptyText"
                    :props="{label:'name',value:'id'}"
                    default-expand-all
                    :render-content="renderContent"/>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div v-if="fullscreenLoading" class="el-message-box__wrapper" style="z-index: 2001;background-color: rgba(31, 30, 30, 0.46);">
        <div class="el-message-box loading-box el-message-box--center">
          <div class="el-message-box__content">
            <div class="el-message-box__message">
              <div class="el-icon-loading" style="font-size: xx-large;"></div>
              <div>登陆中，请耐心等待...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer black-footer">
      <p style="padding-top:30px;">© 2017-2018 sfa365.cn All rights reserved 西安点畅触控网络科技有限公司 版权所有 陕ICP备18010707号-1</p>
    </div>
  </div>
</template>
<script>
  // import menus from '../router/menus'

  export default {
    data() {
      return {
        loading: null,
        fullscreenLoading: false,
        form: {
          username: '',
          password: ''
        },
        quickLogin: [
          {
            portCode: 'pc',
            corpId: 'ding3b44f6105b00f56835c2f4657eb6378f',
            corpName: '点畅测试企业A',
            users: [],
            emptyText: '正在加载人员',
            loading: false
          },
          {
            portCode: 'pc',
            corpId: 'ding02fe6e4f874e3aaa35c2f4657eb6378f',
            corpName: '点畅测试企业B',
            users: [],
            emptyText: '正在加载人员',
            loading: false
          }, 
          {
            portCode: 'pc',
            corpId: 'ding50fd4464a8fb0f9f35c2f4657eb6378f',
            corpName: '动销测试企业3',
            users: [],
            emptyText: '正在加载人员',
            loading: false
          }],
        rules: {
          username: [
            {required: true, message: '请输入账号', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 32, message: '长度在 6 到 32 个字符', trigger: 'blur'}
          ]
        },
        corpId: '',
        scanLoginAppId: 'dingoaekubllsfrbxogtqm',
        scanLoginRedirectUrl: ''
      }
    },
    created() {
      localStorage.clear();
      this.corpId = this.$route.query.corpId || this.$util.url.query("corpId");
      this.initTest();
      this.scanLoginRedirectUrl = window.location.origin + '/login_callback.html';
    },
    mounted() {
      const gotoUrl = encodeURIComponent('https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=' + this.scanLoginAppId + '&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=' + this.scanLoginRedirectUrl);
      DDLogin({
        id: "login_container", // 这里需要你在自己的页面定义一个HTML标签并设置id，例如<div id="login_container"></div>或<span id="login_container"></span>
        goto: gotoUrl,
        style: "border:none;background-color:#FFFFFF;"
      });

      if (typeof window.addEventListener !== 'undefined') {
        window.addEventListener('message', this.hanndleMessage, false);
      } else if (typeof window.attachEvent !== 'undefined') {
        window.attachEvent('onmessage', this.hanndleMessage);
      }
    },
    methods: {
      hanndleMessage: function (event) {
        const origin = event.origin;
        if (origin === "https://login.dingtalk.com") { // 判断是否来自ddLogin扫码事件。
          const loginTmpCode = event.data; // 拿到loginTmpCode后就可以在这里构造跳转链接进行跳转了

          location.href = 'https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=APPID&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=' + this.scanLoginRedirectUrl + '&loginTmpCode=' + loginTmpCode;
        }
      },
      initTest() {
        for (const c of this.quickLogin) {
          this.loadUsers(c);
        }
      },
      renderContent(h, {node, data, store}) {
        const corpId = store.root.data[0].corpId;
        return (
          <div style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
          <span>
            <span>{node.label}</span>
            {data.isBoss ? <sup class="text-primary">领导</sup> : ''}
            {data.isAdmin ? <sup class="text-warning"> 管理员</sup> : ''}
            {data.isManager ? <sup class="text-success"> 主管</sup> : ''}
          </span>
            {data.userid ? <span><el-button style="font-size: 12px;" type="text" on-click={() => this.login(corpId, data.userid)}>模拟登录</el-button></span> : ''}
          </div>);
      },
      loadUsers(c) {
        c.loading = true;
        this.$http.get('/ding/api/user/list', {corpId: c.corpId}, r => {
          if (r.code === 0) {
            c.users = r.data;
          } else {
            c.emptyText = r.data.msg;
          }
          c.loading = false;
        }, e => {
          c.emptyText = e.msg;
          c.loading = false;
        });
      },
      onSubmit() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.postLogin()
          }
        })
      },
      postLogin() {
        this.$http.post('/login', this.form, r => {
          // console.log("hnvdvj",r.data)
          this.onSuccess(r.data)
        });
      },
      onSuccess(obj) {
        localStorage.access_token = obj.access_token;
        localStorage.expire = obj.expire;
        localStorage.user = encodeURIComponent(JSON.stringify(obj.user));
        localStorage.corp = encodeURIComponent(JSON.stringify(obj.corp));
        localStorage.menus = encodeURIComponent(JSON.stringify(obj.menus));
        localStorage.authority = JSON.stringify(obj.authority);
        const currentTime = new Date().getTime();
        const time = parseInt(obj.expire, 10) * 1000;// to ms
        localStorage.expireTime = this.$util.format_time(new Date(currentTime + time));
        this.calculationAuthority(obj.authority);
        const redirect = this.$route.query.redirect || '/';
        this.$router.replace({path: '/'});
      },
      calculationAuthority(authority) {
        // console.log(menus);
        // console.log(authority);
      },
      login(corpId, userid, portCode) {
        this.fullscreenLoading = true;
        this.$http.post('/ding/login', {corpId: corpId, userId: userid, portCode: 'pc'}, r => {
          this.fullscreenLoading = false;
          this.onSuccess(r.data);
        }, e => {
          this.fullscreenLoading = false;
          this.$message.error(e.msg);
        });
      }
    }
  }
</script>
<style lang="scss" scoped>
  .loading-box {
    padding-bottom: 0;
    width: auto;
    .el-icon-loading {
      font-size: xx-large;
    }
  }

  #loginPage {
    margin: -15px;
    .cover {
      padding: 45px 0;
      background: #000 url("../assets/img/banner02.jpg") no-repeat;
      background-size: 100% 100%;
      color: white;
      h1 {
        font-size: xx-large;
      }
    }
    .test-login .el-col {
      padding: 10px;
    }
  }

  .content {
    margin: 20px auto;
    min-height: 500px;
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
