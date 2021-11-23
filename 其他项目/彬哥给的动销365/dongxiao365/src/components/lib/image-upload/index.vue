<template>
  <div class="image-list">
    <div class="image-thumbnail" v-for="(item,index) in items" :key="index">
      <img :src="item"/>
      <div class="remove-bar" @click="remove(index)">删除</div>
    </div>
    <a class="upload-control" v-if="max > this.items.length" @click="upload">
      <i class="fa fa-cloud-upload"></i>
      <div>点我选择文件</div>
    </a>
  </div>
</template>

<script>
  export default {
    name: "image-upload",
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      multiple: {
        type: Boolean,
        default: true
      },
      max: {
        type: Number,
        default: 10
      },
      value: null
    },
    data() {
      return {}
    },
    computed: {
      items: function () {
        if (this.value instanceof Array) { return this.value; } else {
          if (typeof this.value === 'string') {
            if (this.value.indexOf('[') >= 0 && this.value.indexOf(']') > 0) {
              return JSON.parse(this.value);
            }
          }
        }
        return [];
      }
    },
    methods: {
      upload() {
        if (DingTalkPC.ua.isDesktop) {
          DingTalkPC.ready(() => {
            DingTalkPC.biz.util.uploadImage({
              multiple: this.multiple, // 是否多选，默认false
              max: this.max - this.items.length,
              onSuccess: this.uploadSuccess
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
      },
      uploadSuccess(result) {
        let list = [];
        for (let i = 0, len = this.items.length; i < len; i++) {
          list.push(this.items[i]);
        }
        list = list.concat(result);
        this.$emit('change', list);
      },
      remove(i) {
        let list = [];
        list = list.concat(this.items);
        list.splice(i, 1);
        this.$emit('change', list);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .image-list {
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
    flex-wrap: wrap;
    .image-thumbnail {
      display: block;
      padding: 4px;
      line-height: 1.42857143;
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 4px;
      transition: border .2s ease-in-out;
      position: relative;
      overflow: hidden;
      margin: 0 10px 10px 0;
      .remove-bar {
        background-color: rgba(0, 0, 0, 0.5);
        height: 32px;
        line-height: 32px;
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        color: white;
        text-align: center;
        cursor: pointer;
        transition: background-color .2s ease-in-out;
      }
      &:hover {
        border-color: #337ab7;
        .remove-bar {
          background-color: rgba(255, 0, 0, 0.6);
        }
      }
      img {
        height: 180px;
        width: 171px;
        display: block;
      }
    }

    .upload-control {
      height: 190px;
      width: 181px;
      background-color: #fff;
      border: 1px dashed #ddd;
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ddd;
      transition: all .2s ease-in-out;
      cursor: pointer;
      flex-direction: column;
      i {
        font-size: 5rem;
      }
      &:hover {
        border-color: #337ab7;
        color: #337ab7;
      }
    }
  }
</style>
