<!--
 * @Description:
 * @Date: 2021-04-02 17:28:15
 * @LastEditTime: 2021-04-13 18:44:54
 * @FilePath: \my-zhihu\src\views\CreatePost.vue
-->
<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <Uploader action="https://www.duwanyu.com/blog/uploadImg" :before-upload='uploadCheck' @file-uploaded="onFileUploaded" class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4">
      <h2>点击上传头图</h2>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-secondary" role='status'>
            <span class="sr-only"></span>
          </div>
          <h2>正在上传</h2>
        </div>
      </template>
      <template #uploaded='dataProps'>
        <img :src="dataProps.uploadedData.sinaPath" width="500">
      </template>
    </Uploader>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input :rules="titleRules" v-model="titleVal" placeholder="请输入文章标题" type="text" />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <validate-input ype='text' rows="10" tag="textarea" placeholder="请输入文章详情" :rules="contentRules" v-model="contentVal" />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">发表文章</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang='ts'>
import ValidateForm from '../components/ValidateForm.vue';
import ValidateInput from '../components/ValidateInput.vue';
import Uploader from '../components/Uploader.vue';

import { defineComponent, ref } from 'vue';
import { titleRules, contentRules, PostProps } from '../data/testData';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { GlobalDataProps } from '../store/index';
import createMessage from '../components/useCreateMessage';

import { beforeUploadCheck } from '../utils';

export default defineComponent({
  components: { ValidateForm, ValidateInput, Uploader },
  name: '',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore<GlobalDataProps>();
    const titleVal = ref('');
    const contentVal = ref('');
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { columnId } = store.state.user;
        if (columnId) {
          const newPost: PostProps = {
            id: new Date().getTime(),
            title: titleVal.value,
            content: contentVal.value,
            columnId,
            createdAt: new Date().toLocaleString(),
          };
          store.commit('createPost', newPost);
          router.push({ name: 'column', params: { id: columnId } });
        }
      }
    };
    const beforeUpload = (file: File) => {
      const isJPG = file.type === 'image/jpeg';
      if (!isJPG) {
        createMessage('格式不对', 'error');
      }
      return isJPG;
    };
    const onFileUploaded = (rawData: any) => {
      createMessage(`上传图片路径为:${rawData.sinaPath}`, 'error');
    };
    const uploadCheck = (file: File) => {
      const { passed, error } = beforeUploadCheck(file, {
        format: ['image/jpeg', 'image/png'],
        size: 1,
      });
      if (error === 'format') {
        createMessage('格式不对', 'error');
      }
      if (error === 'size') {
        createMessage('大小不对', 'error');
      }
      return passed;
    };
    return {
      titleRules,
      contentRules,
      titleVal,
      contentVal,
      onFormSubmit,
      router,
      route,
      store,
      beforeUpload,
      onFileUploaded,
      uploadCheck,
    };
  },
});
</script>

<style>
.create-post-page .file-uoload-container {
  height: 200px;
  cursor: pointer;
}
.create-post-page .file-uoload-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
}
</style>
