<template>
  <div>
    <el-carousel :interval="4000" height="200px" type="card" v-if="items.length>0">
      <el-carousel-item v-for="(item,index) in items" :key="index">
        <div class="image-view-box" :style="'background-image: url('+item+')'" @click="preview(item)" title="点击我放大预览"></div>
      </el-carousel-item>
    </el-carousel>
    <div class="tip" v-else>没有图片</div>
  </div>
</template>

<script>
  export default {
    name: "gallery-inline",
    props: ['data'],
    data() {
      return {}
    },
    computed: {
      items: function () {
        let list = [];
        if (this.data) {
          if (typeof this.data === 'string') {
            list = JSON.parse(this.data);
          } else if (this.data instanceof Array) {
            list = this.data;
          }
        }
        return list;
      }
    },
    methods: {
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
    height: 200px;
    background-color: white;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
    cursor: pointer;
  }

  .tip {
    font-size: 14px;
    color: #606266;
    padding: 1rem 0;
  }
</style>
