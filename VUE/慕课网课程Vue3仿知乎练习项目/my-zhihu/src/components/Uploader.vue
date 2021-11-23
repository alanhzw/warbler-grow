<!--
 * @Description:
 * @Date: 2021-04-12 19:11:53
 * @LastEditTime: 2021-04-13 18:12:44
 * @FilePath: \my-zhihu\src\components\Uploader.vue
-->
<template>
  <div class="file-upload">
    <div class="file-uoload-container" @click.prevent='triggerUpload' v-bind='$attrs'>
      <slot v-if='fileStatus==="loading" ' name='loading'>
        <button class="btn btn-primary">正在上传</button>
      </slot>
      <slot v-else-if='fileStatus==="success" ' name='uploaded' :uploadedData='uploadedData'>
        <button class="btn btn-primary">
          上传成功
        </button>
      </slot>
      <slot v-else name="default">
        <button class="btn btn-primary">点击上传</button>
      </slot>
    </div>
    <input @change='handleFileChange' type="file" class="file-input d-none" ref='fileInput'>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, ref } from 'vue';
import request from '../request';

type UploadStatus = 'ready' | 'loading' | 'success' | 'error';
type CheckFunction = (file: File) => boolean;

export default defineComponent({
  name: '',
  props: {
    action: {
      type: String,
      required: true,
    },
    beforeUpload: {
      type: Function as PropType<CheckFunction>,
    },
  },
  inheritAttrs: false,
  emits: ['file-uploaded', 'file-upload-error'],
  setup(props, { emit }) {
    const fileInput = ref<null | HTMLInputElement>(null);
    const fileStatus = ref<UploadStatus>('ready');
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click();
      }
    };
    const uploadedData = ref();
    const handleFileChange = (e: Event) => {
      const currentTarget = e.target as HTMLInputElement;
      if (currentTarget.files) {
        const files = Array.from(currentTarget.files);
        if (props.beforeUpload) {
          const result = props.beforeUpload(files[0]);
          if (!result) {
            return;
          }
        }
        fileStatus.value = 'loading';
        const formData = new FormData();
        formData.append('file', files[0]);
        request({
          url: props.action,
          method: 'post',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then((res) => {
            fileStatus.value = 'success';
            emit('file-uploaded', res);
            uploadedData.value = res;
          })
          .catch((error) => {
            emit('file-upload-error', error);
            fileStatus.value = 'error';
          })
          .finally(() => {
            if (fileInput.value) {
              fileInput.value.value = '';
            }
          });
      }
    };
    return {
      fileInput,
      triggerUpload,
      fileStatus,
      handleFileChange,
      uploadedData,
    };
  },
});
</script>

<style>
</style>
