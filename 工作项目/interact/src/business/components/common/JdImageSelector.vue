<template>
  <div class="jd-image-selector">
    <lz-form class=""
             inline>
      <!-- <lz-form-item class="item" label="">
        <lz-input
          class="search-input-ctrl"

          placeholder="请输入图片名称名称"
          v-model="conditions.pictureName" />
      </lz-form-item>
    <lz-form-item class="item" label="">
      <lz-select class="search-input-ctrl"  v-model="conditions.pictureCateId">
        <lz-option value="" label="根目录" />
        <lz-option v-for="t in types" :key="`jd-image-type-${t.cateId}`" :label="`|- ${t.cateName}`" :value="t.cateId" />
      </lz-select>
    </lz-form-item>

    <lz-form-item class="item" :style="{textAlign: 'right'}">
      <lz-button  type="danger" plain @click="getJDImages(1)">查询</lz-button>
      <lz-button  type="info" :style="{marginLeft: 10}" @click="reset">重置</lz-button>
    </lz-form-item> -->

      <lz-button style="float: right"
                 @click="getJDImages()">刷新</lz-button>
      <lz-upload style="float: right; margin-right: 10px;"
                 :action="uploadUrl"
                 name="cmfFile"
                 :multiple="false"
                 :show-file-list="false"
                 :headers="{
          'x-token-header': token
        }"
                 :data="{
          number: 2
        }"
                 :before-upload="beforeUpload"
                 :on-success="uploadSuccess"
                 :on-error="uploadError">
        <lz-button type="primary">上传图片</lz-button>
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
                     background
                     @current-change="getJDImages"
                     :total="pageInfo.total">
      </lz-pagination>
    </div>
  </div>
</template>

<script>
import Service, { requestConfig } from '@/business/service';
import CONST from '@/utils/constant';
import LzMsg from '@/business/utils/LzMsg';

export default {
  name: 'JDImageSelector',
  data() {
    return {
      CONST,
      types: [],
      uploadUrl: `${requestConfig.baseURL}/rightActivityPoint/uploadImage`,
      // uploadUrl: `${requestConfig.baseURL}pagesDecoration/uploadImage`,
      token: localStorage.getItem(CONST.LZ_CRM_BIZ_TOKEN),
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
    this.getJDImagesTypes().then(this.getJDImages);
    // this.getJDImages()
  },
  methods: {
    reset() {
      this.conditions = {
        pictureName: '',
        pictureCateId: 95913943,
      };
      this.getJDImages();
    },
    getJDImagesTypes() {
      return sessionStorage.getItem('LZ_CRM_PLATFORM') === 'suning' ? Promise.resolve() : Service.getJDImagesTypes().then(({
        data,
      }) => {
        this.types = data || [];
        // 只使用页面装修的文件夹
        const folders = data.filter(c => c.cateName === 'CRM系统装修');
        if (folders.length > 0) {
          this.conditions.pictureCateId = folders[0].cateId;
        }
      });
    },
    beforeUpload(file) {
      this.loading = true;
      if (file.size > 1000 * 1024) {
        LzMsg.error('图片大小超过1M');
        this.loading = false;
        return false;
      } else if (['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].indexOf(file.type) === -1) {
        LzMsg.error('请使用jpg或png格式的文件');
        this.loading = false;
        return false;
      }
      return true;
    },
    uploadSuccess() {
      setTimeout(() => this.getJDImages(), 1000);
      this.loading = false;
    },
    uploadError() {
      this.loading = false;
      LzMsg.error('图片上传失败!');
    },
    getJDImages(pageNo = this.pageInfo.pageNo) {
      this.loading = true;
      Service.getJDImages({
        ...this.conditions,
        ...this.pageInfo,
        pageNo,
      }).then(({
        data,
        page,
      }) => {
        let images = data;
        // 适配苏宁的数据
        if (sessionStorage.getItem('LZ_CRM_PLATFORM') === 'suning') {
          images = data.map((item) => {
            const [pictureWidth, pictureHeight] = item.picPixel.split('x').map(val => parseInt(val));
            return {
              pictureUrl: item.picUrl,
              pictureSize: item.picSize,
              pictureWidth,
              pictureHeight,
              pictureType: item.picSuffix,
            };
          });
        }
        console.log('getJDImages -> images', images);
        this.images = images;
        if (page.total > 990) {
          page.total = 990;
        }
        this.pageInfo = page;
        this.loading = false;
      }).catch(() => {
        this.loading = false;
        LzMsg.error('获取图片失败');
      });
    },
    selectImg(image) {
      this.validator(image.pictureWidth, image.pictureHeight, image.pictureSize, image.pictureType.toLowerCase()).then(() => {
        this.$emit('selected', image.pictureUrl);
      }).catch((e) => {
        LzMsg.error(e);
      });
    },
  },

};
</script>

<style lang="scss">
@import '~lz-crm/style/variables';

.jd-image-selector {
  .image-list {
    width: 1100px !important;
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
