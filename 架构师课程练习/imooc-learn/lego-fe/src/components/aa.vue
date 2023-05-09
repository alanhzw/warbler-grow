
<template>
  <div>
    <input type="file"
           name="file"
           @change="handleFileChange">
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = target.files
  if (files) {
    const uploadedFile = files[0]
    const formData = new FormData()
    formData.append(uploadedFile.name, uploadedFile)
    axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': "multipart/form-data"
      }
    }).then((resp) => {
      console.log(resp.data);
    })
  }
}
</script>

<style scoped>
</style>