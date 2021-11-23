<template>
  <div class="sidebar" :class="{'collapse':isCollapse}">
    <div class="toggle" @click="isCollapse=!isCollapse">
      <i class="fa fa-angle-right" v-if="isCollapse"></i>
      <i class="fa fa-angle-left" v-else></i>
    </div>
    <div class="sidebar-left">
      <transition name="el-zoom-in-center">
        <el-menu
          :default-active="defaultActive"
          :default-openeds="openeds"
          :router="true"
          active-text-color="#FFFFFF"
          class="menu-tree">
          <template v-for="item in menus">
            <el-submenu
              v-if="item.children&&item.children.length>0" :index="rootPath+'/'+item.key"
            >
              <span slot="title">
                <img :src="icons[item.icon]" class="icon"/>
                {{item.name}}
              </span>
              <el-menu-item :key="child.id" v-for="child in item.children" :index="rootPath+'/'+item.key+'/'+child.key"
                            :class="{'is-active':(defaultActive.indexOf(rootPath+'/'+item.key+'/'+child.key)===0)}">{{child.name}}
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else
                          :disabled="item.disabled"
                          :index="rootPath+'/'+item.key"
                          :class="{'is-active':defaultActive.indexOf(rootPath+'/'+item.key)===0}">
              <span slot="title">
                <img :src="icons[item.icon+'_active']" v-if="defaultActive.indexOf(rootPath+'/'+item.key)===0"/>
                <img :src="icons[item.icon]" v-else/>
                {{item.name}}
              </span>
            </el-menu-item>
          </template>
        </el-menu>
      </transition>
    </div>
  </div>
</template>
<script>
  export default {
    name: "sidebar",
    data() {
      return {
        isCollapse: false,
        menus: [],
        openeds: [],
        defaultActive: null,
        rootPath: '/',
        icons: {
          'customer': '/static/icon/customer.png',
          'guide': '/static/icon/guide.png',
          'guide_active': '/static/icon/guide_active.png',
          'connect': '/static/icon/connect.png',
          'connect_active': '/static/icon/connect_active.png',
          'corpinfo': '/static/icon/corpinfo.png',
          'corpinfo_active': '/static/icon/corpinfo_active.png',
          'region': '/static/icon/region.png',
          'tag': '/static/icon/tag.png',
          'tag_active': '/static/icon/tag_active.png',
          'map': '/static/icon/map.png',
          'map_active': '/static/icon/map_active.png',
          'step': '/static/icon/step.png',
          'plan': '/static/icon/plan.png',
          'visit_record': '/static/icon/visit_record.png',
          'visit_report': '/static/icon/visit_report.png',
          'order_base': '/static/icon/order_base.png',
          'order_sale': '/static/icon/order_sale.png',
          'order_return': '/static/icon/order_return.png',
          'order_inventory': '/static/icon/order_inventory.png',
          'data_picture': '/static/icon/data_picture.png',
          'data_sale_report': '/static/icon/data_sale_report.png',
          'data_stock_report': '/static/icon/data_stock_report.png',
          'data_in_stock_report': '/static/icon/data_in_stock_report.png',
          'organization': '/static/icon/organization.png',
          'organization_active': '/static/icon/organization_active.png',
          'authority': '/static/icon/authority.png',
          'authority_active': '/static/icon/authority_active.png'
        }
      }
    },
    mounted() {
      this.renderMenu();
      const that = this;
      that.resize();
      window.onresize = () => {
        that.resize();
      };
    },
    methods: {
      resize() {
        const clientWidth = `${document.documentElement.clientWidth}`;
        this.isCollapse = clientWidth < 1208;
      },
      renderMenu() {
        this.defaultActive = this.$route.path;
        console.log('this.defaultActive', this.defaultActive)
        if (localStorage.modules) {
          this.menus = JSON.parse(decodeURIComponent(localStorage.modules));
          console.log('this.menus', this.menus)
        } else {
          this.menus = [];
        }
        this.setStatus();
        this.setDefault();
      },
      setStatus() {
        let path = '';
        const pathArray = this.$route.path.split('/');
        for (let i = 0, len = pathArray.length; i < len; i++) {
          const p = pathArray[i];
          if (p) {
            path += '/' + p;
            if (i === 1) {
              this.rootPath = path;
            }
            this.openeds.push(path);
          }
        }
      },
      setDefault() {
        this.defaultActive = this.$route.path;
      }
    },
    watch: {
      "$route": "renderMenu"
          }
  }
</script>
<style lang="scss" scoped>
</style>
