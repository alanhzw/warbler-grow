<!--
 * @Description:
 * @Date: 2021-03-30 17:13:23
 * @LastEditTime: 2021-04-02 17:48:14
 * @FilePath: \my-zhihu\src\components\GlobalHeader.vue
-->
<template>
  <nav class="navbar  navbar-dark bg-primary justify-content-between mb-4 px-4">
    <router-link class="navbar-brand" to="/">者也专栏</router-link>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item">
        <router-link class="btn btn-outline-light my-2" to="/login">登陆</router-link>
      </li>
      <li class="list-inline-item">
        <router-link class="btn btn-outline-light my-2" to="/login">注册</router-link>
      </li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <dropdown :title='`你好,${user.name}`'>
          <dropdown-item>
            <router-link class="dropdown-item" to='/create'>新建文章</router-link>
          </dropdown-item>
          <dropdown-item disabled><a class="dropdown-item" href="#">编辑资料</a></dropdown-item>
          <dropdown-item>
            <router-link class="dropdown-item" to="/login">退出登陆</router-link>
          </dropdown-item>
        </dropdown>
      </li>
    </ul>
  </nav>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue';
import Dropdown from './Dropdown.vue';
import DropdownItem from './DropdownItem.vue';
import { UserProps } from '../data/testData';

export default defineComponent({
  components: {
    Dropdown,
    DropdownItem,
  },
  name: 'GlobalHeader',
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style>
</style>
