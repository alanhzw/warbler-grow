<template>
  <div class="ctrl-member-card-editor">
    <form-block title="会员卡片设置"
                ref="formBlock">
      <div class="ctrl-member-card-levels">
        <div class="ctrl-member-card-level"
             v-for="(level, lIndex) in data.levels"
             :key="`member-card-level-${level.level}`">
          <p class="level-name">{{level.levelName}}</p>
          <div class="upload-box"
               @click="showUploadBox(lIndex) ">
            <img v-if="typeof level.pic === 'string' && level.pic !== ''"
                 class="bg"
                 :src="`${CONST.IMAGE_PREFIX}${level.pic}`"
                 alt="">
            <img class="bg"
                 v-else
                 src="./assets/default.jpeg">
          </div>
        </div>
      </div>
      <p class="tip">注：图片推荐宽度750px，推荐高度420px，大小不超过1M图片类型为jpg、png</p>
    </form-block>
    <MarginBottomSetting :data="data" />
    <lz-dialog title="图片空间"
               class="jd-image-dialog"
               v-if='uploadBoxShowed'
               :visible.sync="uploadBoxShowed"
               :append-to-body="true"
               width="1150px">
      <image-selector @selected="selectImage"
                      :validator="imgValidator" />
    </lz-dialog>
  </div>
</template>

<script>
import FormBlock from '../components/FormBlock.vue';
import InputBlock from '../components/InputBlock.vue';
import MarginBottomSetting from '../components/MarginBottomSetting.vue';
import CONST from '@/utils/constant';
import Service from '@/business/service';

export default {
  name: 'CtrlMemberCardEditor',
  components: {
    FormBlock,
    InputBlock,
    MarginBottomSetting,
  },
  props: {
    data: {
      default: () => ({
        lIndex: 0,
        levels: [],
        mb15: false,
      }),
    },
    validators: {
      default: () => ({}),
    },
  },
  data() {
    return {
      CONST,
      uploadBoxShowed: false,
    };
  },
  created() {
    Service.getShopLevels().then(({
      data,
    }) => {
      this.data.levels = data.levels.map((l) => {
        const levelData = Array.isArray(this.data.levels) ? (this.data.levels.filter(level => level.level === l.level)[0] || {}) : {};
        return ({
          level: l.level,
          levelName: l.levelName,
          pic: '',
          ...levelData,
        });
      });
    });
  },
  methods: {
    imgValidator(width, height, size, type = '') {
      return new Promise((resolve, reject) => {
        if (size > 1000 * 1024) {
          reject(new Error('图片文件大小不可超过1M'));
        } else if (['jpg', 'jpeg', 'png', 'gif', 'image/jpeg'].indexOf(type) === -1) {
          reject(new Error('请使用jpg、png或gif格式的文件'));
        } else {
          resolve();
        }
      });
    },
    showUploadBox(lIndex) {
      this.uploadBoxShowed = true;
      this.data.lIndex = lIndex;
    },
    selectImage(url) {
      console.log('🚀🚀~ url:', url);
      this.data.levels[this.data.lIndex].pic = url;
      this.uploadBoxShowed = false;
    },
  },
};
</script>

<style lang="scss">
@import '~lz-crm/style/variables';

.ctrl-member-card-editor {
  .ctrl-member-card-levels {
    // background-color: $BG_BLOCK_GRAY;
    display: flex;
    // padding: 5px;
    flex-wrap: wrap;
    justify-content: space-between;

    .ctrl-member-card-level {
      background-color: $WHITE;
      width: 100%;
      margin: 5px 0;
      box-sizing: border-box;
      border: 1px solid #d7dde4;

      .level-name {
        text-align: left;
        font-size: 12px;
        color: $FONT_COMMON_BLACK;
        margin: 10px 20px;
      }

      .upload-box {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 16px;
        width: 328px;
        height: 175px;
        font-size: 12px;
        color: $TAG_INFO_BLUE;
        text-align: center;
        border: 1px dashed $BORDER_GRAY;

        .bg {
          width: 100%;
          height: 100%;
          vertical-align: center;
        }
      }
    }
  }
}
</style>
