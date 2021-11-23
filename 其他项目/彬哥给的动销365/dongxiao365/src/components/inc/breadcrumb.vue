<template>
  <el-breadcrumb class="g-breadcrumb" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="(vo,index) in breadcrumbs" :key="vo.path" :to="{ path: vo.path }">{{vo.name}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  export default {
    name: "breadcrumb",
    data() {
      return {
        breadcrumbs: []
      }
    },
    mounted() {
      // 页面加载完毕
      this.buildBreadcrumb();
    },
    methods: {
      buildBreadcrumb() {
        const fp = this.$route.path;
        const pathArray = fp.split('/');
        this.breadcrumbs = this.getCrossMenuName(pathArray);
      },
      getCrossMenuName(pathArray) {
        let basePath = '';
        let menus = JSON.parse(decodeURIComponent(localStorage.modules))
        const breadcrumbs = [];
        for (const i in pathArray) {
          const p = pathArray[i];
          if (p && typeof p === 'string') {
            basePath += '/' + p;
            let menu = null;
            if (menus && menus.length > 0) {
              menu = this.getFromMenu(p, menus);
            }
            if (menu !== null) {
              const r = {
                path: null,
                name: menu.name
              };
              if (menu.children && menu.children.length === 0) {
                r.path = basePath;
                menus = menu.children;
              }
              if (r) { breadcrumbs.push(r); }
            } else {
              const _route = this.getFromRouter(basePath);
              if (_route) { breadcrumbs.push(_route); }
            }
          }
        }
        return breadcrumbs;
      },
      getFromMenu(path, menus) {
        for (const i in menus) {
          const _menu = menus[i];
          if (_menu && _menu.key === path) {
            return _menu;
          }
        }
        return null;
      },
      getFromRouter(path) {
        const _routers = this.$router.options.routes;
        for (const i in _routers) {
          const _router = _routers[i];
          if (_router && _router.path === path) {
            const rNames = _router.name.split('-');
            const name = rNames[rNames.length - 1];
            return {
              path: _router.path,
              name: name
            };
          }
        }
        return null;
      },
      handleNodeClick(node) {
        if (node.children && node.children.length > 0) {
          this.$router.push(node.path)
        }
      }
    },
    watch: {
      "$route": "buildBreadcrumb"
    }
  }
</script>
