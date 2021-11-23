<!--
 * @Description:
 * @Date: 2021-03-29 18:50:51
 * @LastEditTime: 2021-05-03 12:17:13
 * @FilePath: \my-zhihu\src\App.vue
-->
<template>
  <div class="container">
    <global-header :user='currentUser'></global-header>
    <Loader v-if="isLoading" text="加载中" background="rgba(0,0,0,0.8)"></Loader>
    <button @click='chengeError'>点击弹出错误信息</button>
    <button @click.prevent="modalVisiable=true">点击弹出Dialog</button>

    <modal :visible="modalVisiable" v-if="modalVisiable" title='删除文章' @modal-on-close="modalVisiable=false" @modal-on-confirm="modalVisiable=false">
      <p>确定删除么?</p>
    </modal>
    <div ref='test'>dasdasda大苏打速度奥迪asd爱我的</div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css';
import { defineComponent, computed, ref, watch } from 'vue';
import GlobalHeader from './components/GlobalHeader.vue';
import Loader from './components/Loader.vue';
import { useStore } from 'vuex';
import { GlobalDataProps } from './store';
import createMessage from './components/useCreateMessage';
import Modal from './components/Modal.vue';
export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    Loader,
    Modal,
  },
  setup() {
    const test = ref(null);
    console.log('🚀🚀~test :', test);
    const store = useStore<GlobalDataProps>();
    const currentUser = computed(() => store.state.user);
    const isLoading = computed(() => store.state.loading);
    const status = ref(true);
    const error = ref(true);
    const modalVisiable = ref(false);
    const chengeError = () => {
      error.value = false;
    };
    watch(
      () => error.value,
      () => {
        if (!error.value) {
          createMessage('错了错了吖 ', 'error');
          error.value = true;
        }
      }
    );
    const handleFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const files = target.files;
      if (files) {
        const uploadFile = files[0];
        const formData = new FormData();
        formData.append(uploadFile.name, uploadFile);
      }
    };
    const modalOnClose = () => {};
    return {
      currentUser,
      store,
      isLoading,
      status,
      error,
      chengeError,
      handleFileChange,
      modalVisiable,
    };
  },
});
</script>

<style>
</style>