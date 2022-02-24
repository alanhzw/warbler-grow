<template>
  <!-- 活动规则弹窗 -->
  <div class="box">
    <img src="../assets/img/img-upload-dialog.png"
         class="popup">

    <div class="upload">
      <input @change="toUpload" class="upload-input" readonly type="file"
             accept="image/png,image/gif,image/jpeg"/>
      <div class="img-size" v-if="babyBirthImg">
        <img :src="babyBirthImg"/>
      </div>
    </div>

    <!-- 提交按钮 -->
    <div class="option-btn" @click="toCommit()"></div>

    <!-- 关闭按钮 -->
    <div class="option-btn" style="left: 3.2rem" @click="closeDialog()"></div>

    <!-- 关闭按钮 -->
    <div class="close-btn" @click="closeDialog()"></div>
  </div>
</template>

<script lang='ts' setup>
import { defineEmits, defineProps, ref } from 'vue';
import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';

const emit = defineEmits(['closeDialog', 'toPerfectImage']);

const babyBirthImg = ref('');

const closeDialog = () => {
  babyBirthImg.value = '';
  emit('closeDialog');
};

const toUpload = (e: any) => {
  const file = e.target.files[0];
  const formData = new FormData();
  if (file.size > 1000 * 1024) {
    Toast('上传图片不能超过1MB');
    return;
  }
  formData.append('file', file);
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/wx/qqstar/perfectInfo/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then((res) => {
    if (res.result) {
      babyBirthImg.value = res.data;
    } else {
      Toast(res.errorMessage);
    }
  });
};

const toCommit = () => {
  if (babyBirthImg.value) {
    emit('toPerfectImage', babyBirthImg.value);
  } else {
    Toast('请先上传图片！');
  }
};

</script>

<style lang='scss' scoped>
.box {
  position: relative;

  img {
    margin: 0 auto;
  }

  .popup {
    width: 6rem;
  }

  .upload {
    background: url("//img10.360buyimg.com/imgzone/jfs/t1/171025/20/21891/1240/6179072bE9a528c6c/ffe948bf32ce980f.png");
    background-size: 100% 100%;
    width: 4.7rem;
    height: 2.57rem;
    position: absolute;
    top: .8rem;
    left: .65rem;

    .upload-input {
      opacity: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0
    }

    .img-size {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      background-color: #FFFFFF;

      img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
      }
    }
  }

  .option-btn {
    position: absolute;
    bottom: .4rem;
    left: .5rem;
    width: 2.3rem;
    height: 0.8rem;
  }

  .close-btn {
    position: absolute;
    bottom: 0;
    left: 2.5rem;
    width: 1rem;
    height: .5rem;
  }
}
</style>
