
<template>
  <div class="file-upload">
    <!-- 使用 button 模拟 input 上传-->
    <div v-on="events"
         class="upload-area"
         :class="{ 'is-dragover': drag && isDragOver }"
         :disabled="isUploading">
      <slot v-if="isUploading"
            name="loading">
        <button disabled>正在上传</button>
      </slot>
      <slot name="uploaded"
            v-else-if="lastFileData && lastFileData.loaded">
        <button>点击上传</button>
      </slot>
      <slot v-else
            name="default">
        <button>点击上传</button>
      </slot>
    </div>
    <!-- 隐藏 input 控件 -->
    <input type="file"
           ref="fileInput"
           @change="handleFileChange"
           :style="{ display: 'none' }">
    <!-- 上传文件列表 -->
    <ul class="uploaded-file">
      <li v-for="file in filesList"
          :class="`uploaded-file upload-${file.status}`"
          :key="file.uid">
        <img :src="file.url"
             v-if="file.url && listType === 'picture'"
             :alt="file.name">
        <span class="filename">{{ file.name }}</span>
        <button class="delete-icon"
                @click="removeFile(file.uid)">del</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">

import axios from 'axios';
import { ref, defineProps, reactive, computed, PropType } from 'vue';
import { v4 as uuidv4 } from 'uuid'
import { last } from 'lodash-es'
export type CheckUpload = (file: File) => boolean | Promise<File>
export type UploadStatus = 'ready' | 'success' | "error" | 'loading'
export type FileListType = 'picture' | 'text'
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status: UploadStatus;
  raw: File;
  resp?: any;
  url?: string;
}
const props = defineProps({
  action: {
    type: String,
    required: true,
  },
  beforeUpload: {
    type: Function as PropType<CheckUpload>
  },
  drag: {
    type: Boolean,
    default: false
  },
  autoUpload: {
    type: Boolean,
    default: true
  },
  listType: {
    type: String as PropType<FileListType>,
    default: 'text'
  }
})
// 上传文件列表
const filesList = ref<UploadFile[]>([])

const isDragOver = ref(false)

// 最后一个文件的数据
const lastFileData = computed(() => {
  const lastFile = last(filesList.value)
  if (lastFile) {
    return {
      loaded: lastFile.status === 'success',
      data: lastFile.resp
    }
  }
  return false
})

// 是否正在上传
const isUploading = computed(() => {
  return filesList.value.some((file => file.status === 'loading'))
})

// 删除文件
const removeFile = (id: string) => {
  filesList.value = filesList.value.filter((file) => file.uid === id)
}

// input ref
const fileInput = ref<null | HTMLInputElement>(null)
// 点击 button 触发选择文件弹窗
const triggerUpload = () => {
  fileInput?.value?.click()
}

const postFile = (readyFile: UploadFile) => {
  // 创建 FormData 数据结构
  const formData = new FormData()
  // 往 FormData 中 添加数据
  formData.append(readyFile.name, readyFile.raw)
  readyFile.status = 'loading'
  // 发送请求
  axios.post(props.action, formData, {
    headers: {
      // 需要在请求头中设置类型
      'Content-Type': "multipart/form-data"
    }
  }).then((resp) => {
    console.log(resp.data);
    readyFile.status = 'success'
    readyFile.resp = resp.data
  }).catch(() => {
    readyFile.status = 'error'
  }).finally(() => {
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  })
}

// 添加到文件列表
const addFileToList = (uploadedFile: File) => {
  const fileObj = reactive<UploadFile>({
    uid: uuidv4(),
    size: uploadedFile.size,
    name: uploadedFile.name,
    status: 'ready',
    raw: uploadedFile,
  })
  if (props.listType === 'picture') {
    // try {
    //   fileObj.url = URL.createObjectURL(uploadedFile)
    // } catch (error) {
    //   console.log('upload transform error', error)
    // }
    const fileReader = new FileReader()
    fileReader.readAsDataURL(uploadedFile)
    fileReader.addEventListener('load', () => {
      fileObj.url = fileReader.result as string
    })
    fileReader.addEventListener('error', () => {

      //   console.log('upload transform error', error)
    })
  }



  filesList.value.push(fileObj)
  if (props.autoUpload) {
    postFile(fileObj)
  }
}


// 上传文件
const upLoadFiles = (files: FileList | null) => {
  if (files) {
    // 获取文件
    const uploadedFile = files[0]
    // beforeUpload 钩子
    if (props.beforeUpload) {
      const result = props.beforeUpload(uploadedFile)
      if (result && result instanceof Promise) {
        result.then((processedFile) => {
          // 判断是否是 file 类型
          if (processedFile instanceof File) {
            addFileToList(processedFile)
          } else {
            throw new Error("beforeUpload Promise should return a file")
          }
        }).catch((e) => console.log(e))
      } else if (result === true) {
        addFileToList(uploadedFile)
      }
    } else {
      addFileToList(uploadedFile)
    }
  }
}



// 上传文件到服务器
const handleFileChange = (e: Event) => {
  // 获取文件列表
  const target = e.target as HTMLInputElement
  const files = target.files
  upLoadFiles(files)
}


/**
 * @description: 上传文件列表
 * @return {*} 常阳大傻逼
 */
const uploadFiles = () => {
  filesList.value.filter(file => file.status === 'ready').forEach((readFile) => { postFile(readFile) })
}

const handleDrag = (e: DragEvent, over: boolean) => {
  // 取消默认行为
  e.preventDefault()
  isDragOver.value = over
}

const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  isDragOver.value = false
  if (e.dataTransfer) {
    upLoadFiles(e.dataTransfer.files)
  }
}

// 事件列表
let events: { [key: string]: (e: any) => void } = {
  'click': triggerUpload,
}
if (props.drag) {
  events = {
    ...events,
    'dragover': (e: DragEvent) => { handleDrag(e, true) },
    'dragleave': (e: DragEvent) => { handleDrag(e, false) },
    'drop': handleDrop
  }
}

</script>

<style scoped>
.upload-loading {
  color: yellow
}

.upload-success {
  color: green
}

.upload-error {
  color: red
}
</style>