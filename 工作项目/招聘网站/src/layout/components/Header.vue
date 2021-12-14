<!--
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-11-15 09:38:12
 * @LastEditTime: 2021-11-20 17:28:04
 * @FilePath: \ired_resource\src\layout\components\Header.vue
-->
<template lang="">
  <div class="header-content">
    <img style="height: 45px;" @click="goHome()" src="https://ired-1304913895.cos.ap-beijing.myqcloud.com/static/ims_ired_logo.png" />

    <el-dropdown class="avatar" v-if="userInfo.realName">
      <div class="avatar">
        <span class="name">{{userInfo.realName}}</span>
        <img class="avatar-pic" :src="userInfo.avatar ?? defaultAvatar">
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-if="!isBizPage" @click='router.push("/customer/resume/create")'>
            <div class="header-avatar-item">
              <img class="gray" src="@/assets/avatar/resume_gray.png">
              <img class="white" src="@/assets/avatar/resume_white.png">
              <span>我的简历</span>
            </div>
          </el-dropdown-item>
          <el-dropdown-item v-if="!isBizPage" @click='router.push("/evaluation")'>
            <div class="header-avatar-item">
              <img class="gray" src="@/assets/avatar/test_gray.png">
              <img class="white" src="@/assets/avatar/test_white.png">
              <span>人才测评</span>
            </div>
          </el-dropdown-item>
          <el-dropdown-item v-if="!isBizPage" @click='router.push("/customer/collect/records")'>
            <div class="header-avatar-item">
              <img class="gray" src="@/assets/avatar/favor_gray.png">
              <img class="white" src="@/assets/avatar/favor_white.png">
              <span>我的收藏</span>
            </div>
          </el-dropdown-item>
          <el-dropdown-item v-if="!isBizPage" @click='router.push("/customer/application/records")'>
            <div class="header-avatar-item">
              <img class="gray" src="@/assets/avatar/record_gray.png">
              <img class="white" src="@/assets/avatar/record_white.png">
              <span>应聘记录</span>
            </div>
          </el-dropdown-item>
          <el-dropdown-item :divided="!isBizPage" @click="logout">
            <div class="header-avatar-item">
              <img class="gray" src="@/assets/avatar/exit_gray.png">
              <img class="white" src="@/assets/avatar/exit_white.png">
              <span>退出登录</span>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <button v-else class="btn-sign" @click="login">登录 / 注册</button>
  </div>

</template>
<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import defaultAvatar from '@/assets/default_avatar.png';

const router = useRouter();
const route = useRoute();

const isBizPage = computed(() => route.path.startsWith('/business'));

const store = useStore();

const userInfo = computed(() => store.state.user);
const login = () => {
  // router.push('/login?returnUrl=');
  router.push('/login');
};
const logout = () => {
  store.commit('removeToken');
  store.commit('user/clearUser');
  router.push('/login');
};

const goHome = () => {
  if (userInfo.value.roles.includes('merchant') || userInfo.value.roles.includes('hr')) {
    router.push('/business');
  } else {
    router.push('/');
  }
};

onMounted(() => {
  console.log('🚀🚀~ route:');
});

</script>

<style lang="scss" scoped>
@import 'styles/_variables.scss';
.header-content {
  background-color: #ffffff;
  height: 94px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .avatar {
    display: flex;
    align-items: center;
    .avatar-pic {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }

    .name {
      margin-right: 20px;
      font-size: 16px;
      font-weight: bold;
      color: #222222;
    }
  }
  .btn-sign {
    width: 120px;
    height: 38px;
    border-radius: 24px;
    font-size: 16px;
    border: 1px solid $MAIN_COLOR;
    color: $MAIN_COLOR;
  }
}
.el-dropdown-menu__item {
  margin: 0;

  .white {
    display: none;
  }
  &:hover {
    background-color: #ED263D;
    color: #ffffff;

    .white {
      display: inline-block;
    }
    .gray {
      display: none;
    }
  }
}
.header-avatar-item {
  display: flex;
  align-items: center;

  img {
    margin-right: 6px;
  }
}
</style>
