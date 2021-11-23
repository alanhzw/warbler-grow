<template>
  <div class="avatar-uploader" @click="uploadAvatar" >
    <img v-if="src" :src="src" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </div>
</template>

<script>
  export default {
    props: ['onSuccess', 'onFail', 'defaultValue'],
    name: "avatar",
    data () {
      return {
        src: ''
      }
    },
    created () {
      this.src = this.defaultValue;
    },
    methods: {
      uploadAvatar () {

        const that = this;
        if (DingTalkPC.ua.isDesktop) {
          DingTalkPC.ready(() => {
            DingTalkPC.biz.util.uploadImage({
              multiple: false, // 是否多选，默认false
              onSuccess: function (result) {
                that.src = result[0];
                that.$emit('onSuccess', that.src);
              },
              onFail: function (e) {
                that.$emit('onFail');
              }
            })
          })
        } else {
          this.$confirm('此操作需要在钉钉PC端完成，是否立即打开钉钉PC端？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const user = this.$util.getCurrentUser();
            location.href = 'dingtalk://dingtalkclient/action/sendmsg?dingtalk_id=' + user.dingId;
          });
        }
      }
    }, watch: {
      defaultValue () {
        this.src = this.defaultValue;
      }
    }
  }
</script>

<style scoped>

  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
    text-align: center;
    line-height: 180px;
    height: 180px;
    width: 180px;
    color: #8c939d;
    font-size: 2rem;
  }

  .avatar-uploader:hover {
    border-color: #409EFF;
    color: #409eff;
  }

  .avatar {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
