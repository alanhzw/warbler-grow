<template>
  <div class="image-selector">
    <lz-form class
             inline>
      <!-- <lz-form-item class="item" label="">
        <lz-input
          class="search-input-ctrl"
          size="small"
          placeholder="请输入图片名称名称"
          v-model="conditions.pictureName" />
      </lz-form-item>-->
      <!-- <lz-form-item class="item" label="">
        <lz-select class="search-input-ctrl" size="small" v-model="conditions.pictureCateId">
          <lz-option value="" label="根目录" />
          <lz-option v-for="t in types" :key="`jd-image-type-${t.cateId}`" :label="`|- ${t.cateName}`" :value="t.cateId" />
        </lz-select>
      </lz-form-item>

      <lz-form-item class="item" :style="{textAlign: 'right'}">
        <lz-button size="small" type="danger" plain @click="getJDImages(1)">查询</lz-button>
        <lz-button size="small" type="info" :style="{marginLeft: 10}" @click="reset">重置</lz-button>
      </lz-form-item>-->

      <lz-button style="float: right"
                 size="small"
                 @click="getImages()">刷新</lz-button>
      <lz-upload style="float: right; margin-right: 10px;"
                 :action="uploadUrl"
                 name="cmfFile"
                 :multiple="false"
                 :show-file-list="false"
                 :headers="{
          'Authorization': token,
          'Prod': 'crm'
        }"
                 :data="{
          number: 2
        }"
                 :before-upload="beforeUpload"
                 :on-success="uploadSuccess">
        <lz-button size="small"
                   type="primary">上传图片</lz-button>
      </lz-upload>
    </lz-form>
    <div class="image-list"
         v-loading="loading">
      <div v-for="image in images"
           :key="`jd-image-${image.pictureId}`">
        <div class="image-item"
             @click="selectImg(image)"
             :style="{backgroundImage: `url(${CONST.IMAGE_PREFIX}${image.pictureUrl})`}">
          <p class="image-size">{{image.pictureWidth}}✕{{image.pictureHeight}}</p>
        </div>
        <p class="image-name"
           :title="image.pictureName">{{image.pictureName}}</p>
      </div>
    </div>
    <div style="text-align: right;"
         v-show="pageInfo.total > 0">
      <!-- background -->
      <lz-pagination layout="total, prev, pager, next"
                     :current-page="pageInfo.pageNo"
                     :page-size="pageInfo.pageSize"
                     @current-change="getImages"
                     :total="pageInfo.total"></lz-pagination>
    </div>
  </div>
</template>

<script>
import Service, { requestConfig } from '@/business/service';
import CONST from '@/utils/constant';
import { LzMsg } from '@/utils/UI';

console.log('🚀 ~ Service', Service);

export default {
  name: 'ImageSelector',
  data() {
    return {
      CONST,
      types: [],
      uploadUrl: `${process.env.VUE_APP_DECO_BASEURL}/uploadImage`, // '/decoration/api/b/uploadImage',
      token: localStorage.getItem(CONST.LZ_SSO_TOKEN),
      images: [],
      conditions: {
        pictureName: '',
        pictureCateId: '',
      },
      pageInfo: {
        pageSize: 30,
        pageNo: 1,
        total: 0,
      },
      loading: false,
    };
  },
  props: {
    validator: {
      // 这个写法…………
      default: () => () => Promise.resolve(),
    },
  },
  created() {
    this.getImages();
  },
  methods: {
    reset() {
      this.conditions = {
        pictureName: '',
        pictureCateId: '',
      };
      this.getImages();
    },
    beforeUpload(file) {
      if (file.size > 1000 * 1024) {
        LzMsg.error('图片大小超过1M');
        return false;
      }
      if (['png', 'jpeg', 'jpg', 'gif', 'image/png', 'image/jpeg', 'image/jpg', 'image/gif'].indexOf(file.type) === -1) {
        LzMsg.error('请使用jpg、png或者gif格式的文件');
        return false;
      }
      return true;
    },
    uploadSuccess() {
      setTimeout(() => this.getImages(), 1000);
    },
    getImages(pageNo = this.pageInfo.pageNo) {
      this.loading = true;
      Service.queryPictures({
        ...this.conditions,
        ...this.pageInfo,
        pageNo,
      })
        .then(({ data, page = this.pageInfo }) => {
          if (process.env.VUE_APP_PLATEFORM === 'tmall') {
            data.forEach((img) => {
              const [pictureWidth, pictureHeight] = img.pixel.split('x');
              img.pictureWidth = parseInt(pictureWidth);
              img.pictureHeight = parseInt(pictureHeight);
              img.pictureType = img.pictureType || img.pictureName.substring(img.pictureName.lastIndexOf('.') + 1);
            });
          }
          this.images = data;
          if (page.total > 990) {
            page.total = 990;
          }
          this.pageInfo = page;
          this.loading = false;
        })
        .catch((e) => {
          console.log(e);
          this.loading = false;
          LzMsg.error('获取图片失败');
        });
    },
    selectImg(image) {
      this.validator(
        image.pictureWidth,
        image.pictureHeight,
        image.pictureSize,
        image.pictureType.toLowerCase(),
      )
        .then(() => {
          this.$emit('selected', image.pictureUrl);
        })
        .catch((e) => {
          LzMsg.error(e.message);
        });
    },
  },
};
</script>

<style lang="scss">
@import "~lz-crm/style/variables";

.image-selector {
  .image-list {
    width: 1110px !important;
    display: flex;
    flex-wrap: wrap;
    min-height: 544pxl;
  }

  .image-item {
    position: relative;
    width: 100px;
    height: 100px;
    overflow: hidden;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    margin: 5px;
    user-select: none;
  }

  .image-size {
    position: absolute;
    width: 100px;
    padding: 0 10px;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    color: $WHITE;
    font-size: 12px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 0;
  }

  .image-name {
    margin-top: 5px;
    width: 100px;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 12px;
    color: $FONT_COMMON_GRAY;
  }
}
</style>
