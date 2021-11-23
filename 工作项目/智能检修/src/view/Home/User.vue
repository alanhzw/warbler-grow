<!--
 * @Description:
 *     权限委托的组件
 * @Author:LJN
 * @Date: 2021-05-05
 * @LastEditTime: 2021-05-20
 * @FilePath: \intelligent-overhaul-app\src\view\Home\User.vue
-->
<template>
  <div class="home-user">
    <img class="avatar" :src="info.avatar==null||info.avatar==''? avatar :imgPath+info.avatar" >
    <div class="info">
      <p v-if="info.transferToUserId==''" class="name">{{info.realName}}</p>
      <p v-if="info.transferToUserId!=''" class="name">{{info.realName}} (委任)</p>
      <p class="tags"><span class="tag">{{info.orgName}}</span><span class="tag">{{info.roleName}}</span></p>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
import { getService,imgPath } from '../../service';
import avatar from '../../assets/default-member.png';

const store = useStore()
const info = computed(() => store.state.user.info)
// const userTypeName = computed(() => ['', '作业长', '班组长', '组员'][info.value.userType])
</script>

<style lang="scss" scoped>
@import '../../style/_variable.scss';

.home-user {
  display: flex;
  justify-content: center;
  align-items: center;

  .avatar {
    width: 1.08rem;
    height: 1.08rem;
    border-radius: 50%;
  }

  .info {
    text-align: left;
    margin-left: 0.25rem;
    color: $WHITE;

    p {
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  .name {
    font-size: 0.3rem;
  }

  .tag {
    background-color: $BLUE;
    display: inline-block;
    line-height: 0.32rem;
    border-radius: 0.16rem;
    font-size: 0.22rem;
    padding: 0 0.16rem;
    margin-right: 0.16rem;
    margin-top: 0.12rem;
  }
}
</style>