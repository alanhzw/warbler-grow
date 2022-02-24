<template>
  <div class="layout-business-menu">
    <div v-for="item in menu"
         :key="item.label">
      <div class="menu-item"
           :class="{'is-active': isActive(item)}"
           @click="menuItemClicked(item)">
        <img v-if="isActive(item)"
             :src="item.iconRed">
        <img v-else
             :src="item.iconGray">
        <span>{{item.label}}</span>
      </div>
      <div v-if="item.children"
           v-show="!item.fold">
        <div v-for="subItem in item.children"
             :key="subItem.label"
             class="submenu-item"
             :class="{'is-active': $route.path === subItem.path}"
             @click="menuItemClicked(subItem)">{{subItem.label}}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import iconHomeRed from '@/assets/business/icon_home_red.png';
import iconHomeGray from '@/assets/business/icon_home_gray.png';

import iconDataRed from '@/assets/business/icon_data_red.png';
import iconDataGray from '@/assets/business/icon_data_gray.png';

import iconTalentRed from '@/assets/business/icon_talent_red.png';
import iconTalentGray from '@/assets/business/icon_talent_gray.png';

import iconSearchRed from '@/assets/business/icon_search_red.png';
import iconSearchGray from '@/assets/business/icon_search_gray.png';

import iconRecruitmentRed from '@/assets/business/icon_recruitment_red.png';
import iconRecruitmentGray from '@/assets/business/icon_recruitment_gray.png';

import iconAccountRed from '@/assets/business/icon_account_red.png';
import iconAccountGray from '@/assets/business/icon_account_gray.png';

export interface ItemInfo {
  label: string,
  path?: string,
  iconRed?: string
  iconGray?: string
  fold?: boolean,
  children?: Array<ItemInfo>
}

const menu: Array<ItemInfo> = reactive([
  {
    label: '首页',
    path: '/business',
    iconRed: iconHomeRed,
    iconGray: iconHomeGray,
  }, {
    label: '数据统计',
    iconRed: iconDataRed,
    iconGray: iconDataGray,
    path: '/business/statistics',
  }, {
    label: '人才市场',
    iconRed: iconTalentRed,
    iconGray: iconTalentGray,
    path: '/business/people/square',
  }, {
    label: '应聘管理',
    iconRed: iconSearchRed,
    iconGray: iconSearchGray,
    path: '/business/application/0',
  }, {
    label: '招聘管理',
    iconRed: iconRecruitmentRed,
    iconGray: iconRecruitmentGray,
    path: '/business/recruitment/list',
  }, {
    label: '账号设置',
    iconRed: iconAccountRed,
    iconGray: iconAccountGray,
    fold: true,
    children: [
      {
        label: '公司主页',
        path: '/business/homepage/setting',
      }, {
        label: 'HR管理',
        path: '/business/hrManage',
      },
    ],
  },
]);

const route = useRoute();
const isActive = (item: ItemInfo) => {
  if (item.label === '招聘管理') {
    return route.path.startsWith('/business/recruitment/');
  } if (item.label === '账号设置') {
    return item.children?.some((subItem: ItemInfo) => subItem.path === route.path);
  }

  return route.path === item.path;
};
const router = useRouter();
const menuItemClicked = (item: ItemInfo) => {
  if (item.path) {
    router.push(item.path);
  } else if (item.children) {
    item.fold = !item.fold;
  }
};

</script>

<style scoped lang="scss">
.layout-business-menu {
  // width: 250px;
  // min-width: 150px;

  width: 180px;
  height: 100%;
  border-right: 1px solid #E8E8E8;
  background-color: transparent;
  font-size: 18px;

  .menu-item {
    line-height: 80px;
    color: #656565;
    cursor: pointer;
    // padding-left: 60px;

    padding-left: 30px;
    display: flex;
    align-items: center;
    img {
      vertical-align: top;
      margin-right: 6px;
    }

    &.is-active {
      color: #222222;
      background: #FFFFFF;
      box-shadow: 0px 3px 20px 1px rgba(0, 0, 0, 0.05999999865889549);
    }

  }
  .submenu-item {
    cursor: pointer;
    line-height: 80px;
    // padding-left: 94px;
    padding-left: 64px;
    color: #656565;
    position: relative;
    &.is-active {
      color: #ED263D;
      background: #FFF9FA;
      &::after {
        position: absolute;
        right: 0;
        height: 100%;
        content: ' ';
        width: 4px;
        background-color: #ED263D;
      }
    }
  }
}

</style>
