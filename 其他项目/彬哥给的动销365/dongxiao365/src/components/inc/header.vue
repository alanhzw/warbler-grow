<template>
  <div class="header">
    <el-menu :default-active="activeIndex" mode="horizontal" @select="menuSelect">
       <el-menu-item>
         <template>
            <img v-if="corpLogoUrl" :src="corpLogoUrl" height="42" width="130"/>
            <img v-else src="../../assets/logo.png" height="42" width="130"/>
          </template>
        <span class="corp-name">{{corpShortName}}</span>
      </el-menu-item>
      <el-menu-item index="index" @click="$router.push('/')"><i class="fa fa-tachometer" style="font-size: 18px;margin-right: 2px;"></i>首页</el-menu-item>
      <el-menu-item :index="menu.key" :tabindex="index" :key="menu.id" v-for="(menu,index) in modules" @click="handleSelect(menu)" :disabled="menu.children===null||menu.children.length===0">
        <template slot="title">
          <!-- {{menu}} -->
          <template v-if="menu.key==='customer'">
            <img v-if="activeIndex==='customer'" src="../../assets/icon/customer_active.png"/>
            <img v-else src="../../assets/icon/customer.png"/>
          </template>
          <template v-if="menu.key==='visit'">
            <img v-if="activeIndex==='visit'" src="../../assets/icon/visit_active.png"/>
            <img v-else src="../../assets/icon/visit.png"/>
          </template>
          <template v-if="menu.key==='psi'">
            <img v-if="activeIndex==='psi'" src="../../assets/icon/order_active.png"/>
            <img v-else src="../../assets/icon/order.png"/>
          </template>
          <template v-if="menu.key==='data'">
            <img v-if="activeIndex==='data'" src="../../assets/icon/data_active.png"/>
            <img v-else src="../../assets/icon/data.png"/>
          </template>
          <template v-if="menu.key==='help'">
            <img v-if="activeIndex==='help'" src="../../assets/icon/help_active.png"/>
            <img v-else src="../../assets/icon/help.png"/>
          </template>
          <template v-if="menu.key==='system'">
            <img v-if="activeIndex==='system'" src="../../assets/icon/system_active.png"/>
            <img v-else src="../../assets/icon/system.png"/>
          </template>
          <template>
          </template>
          <span slot="title">{{menu.name}}</span>
        </template>
      </el-menu-item>
      <div v-if="!isDesktop" class="user-panel">
        <a>
          <div class="user-info">
            <div class="user-avatar">
              <img v-if="user.avatar" :src="user.avatar">
              <img src="../../assets/img/default-avatar.png" v-else>
            </div>
            <div class="user-name" v-text="user.name"></div>
          </div>
        </a>
        <a @click="logout"><i class="fa fa-sign-out" aria-hidden="true"></i>退出登录</a>
      </div>
    </el-menu>
  </div>
</template>
<script>
  export default {
    inject: ['reload'],
    data() {
      return {
        activeIndex: 'index',
        isDesktop: false,
        user: {},
        modules: [],
        activeMenuIn: 0,
        corpLogoUrl: '',
        corpShortName: ''
      };
    },
    created() {
      this.user = JSON.parse(decodeURIComponent(localStorage.user));
      const corp = JSON.parse(decodeURIComponent(localStorage.corp));
      this.corpLogoUrl = corp.corpLogoUrl
      this.corpShortName = corp.corpShortName ? corp.corpShortName : corp.corpName
      this.isDesktop = DingTalkPC.ua.isDesktop;
      if (localStorage.menus) { this.modules = JSON.parse(decodeURIComponent(localStorage.menus)); } else { this.modules = null; }
    },
    mounted() {
      this.renderMenu();
    },
    methods: {
       menuSelect(key, keyPath) {
        console.log('menuSelect', key, keyPath);
      },
      renderMenu() {
        const path = this.$route.fullPath;
        const pathArray = path.split('/');
        let root = '/';
        if (pathArray.length > 1) {
          root = pathArray[1];
        }
        this.activeIndex = root || 'index';
      },
      handleSelect(menu) {
        let path = '/' + menu.key;
        const menus = menu.children;
        localStorage.modules = null;
        console.log('handleSelect', menu)
        if (menus) {
          const menu = menus[0];
          path += '/' + menu.key;
          if (menu.children && menu.children.length > 0) {
            const sub_menus = menu.children;
            if (sub_menus) {
              const sub_menu = sub_menus[0];
              path += '/' + sub_menu.key;
            }
          }
          localStorage.modules = encodeURIComponent(JSON.stringify(menus));
        }
        this.$router.push(path);
      },
      menuChange(menu) {
        // let path = '/' + menu.key;
        const menus = menu.children;
        // localStorage.modules = null;
        // console.log('handleSelect' ,menu)
        // if (menus) {
        //   const menu = menus[0];
        //   path += '/' + menu.key;
        //   if (menu.children && menu.children.length > 0) {
        //     const sub_menus = menu.children;
        //     if (sub_menus) {
        //       const sub_menu = sub_menus[0];
        //       path += '/' + sub_menu.key;
        //     }
        //   }
          localStorage.modules = encodeURIComponent(JSON.stringify(menus));
          // this.$router.go(0)
          this.reload()
        // }
      },
      logout() {
        this.$confirm('确定要退出登录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          localStorage.clear();
          this.$router.push('/login');
        });
      }
    },
    watch: {
      "$route": function() {
        this.renderMenu()
        this.modules.map((item, index) => {
          if (item.key === this.activeIndex) {
            this.menuChange(this.modules[index])
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .corp-name {
    display: inline-block;
    max-width: 220px;
    margin-right: 50px;
    text-align: left;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    color: #000;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
</style>
