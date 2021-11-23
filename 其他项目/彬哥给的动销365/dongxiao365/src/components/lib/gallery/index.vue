<template>
  <div>
    <el-tooltip v-if="data" class="item" effect="dark" content="点击我预览" placement="top">
      <el-button type="text" @click="showPic">共{{items.length}}张</el-button>
    </el-tooltip>
    <div v-else>无</div>
    <el-dialog :title="title" :visible.sync="picDetailsVisible" width="800px">
      <el-carousel :interval="4000" height="400px">
        <el-carousel-item v-for="(item,index) in items" :key="index">
          <div class="image-view-box" :style="'background-image: url('+item+')'" @click="preview(item)" title="点击我放大预览"></div>
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "gallery",
    props: {
      data: String,
      title: {
        type: String,
        default: '照片预览'
      }
    },
    data() {
      return {
        picDetailsVisible:
         false
      }
    },
    computed: {
      items: function () {
        let list = [];
        if (this.data && this.data.length > 0) {
          list = JSON.parse(this.data);
        }
        return list;
      }
    },
    methods: {
      showPic() {
        this.picDetailsVisible = true;
      },
      preview(item) {
        if (!DingTalkPC.ua.isDesktop) {
          window.open(item);
        } else {
          DingTalkPC.ready(() => {
            DingTalkPC.biz.util.previewImage({
              urls: this.items,
              current: item
            })
          })
        }
      }
    }
  }
</script>

<style scoped>
  .image-view-box {
    width: 100%;
    height: 400px;
    background-color: white;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
    cursor: pointer;
  }
</style>
