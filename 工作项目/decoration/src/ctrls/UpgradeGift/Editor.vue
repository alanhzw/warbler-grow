<template>
  <div class="ctrl-upgrade-gift-editor">
    <form-block title="等级礼包图片设置"
                ref="formBlock"
                :model="data"
                :rules="rules">
      <input-block class="level-block">
        <lz-tabs v-model="level"
                 type="card"
                 @tab-click="()=>{}">
          <lz-tab-pane v-for="lvl in levels"
                       :label="lvl.levelName"
                       :name="lvl.Level"
                       :key="lvl.level">
            <div class="upload-box"
                 @click="uploadBoxShowed = true">
              <img class="bg"
                   :src="`${CONST.IMAGE_PREFIX}${data.pics[lvl.level-1]}`"
                   alt="">
              <p class="tip"
                 slot="tip">注：图片大小不超过500k，类型为jpg、png的图片，建议使用宽度690px高度240px的图片</p>
            </div>
          </lz-tab-pane>
        </lz-tabs>
      </input-block>

      <input-block title="可用的等级礼包活动">
        <p class="activity-list"
           v-for="a in activities.filter(a => a.memberRating - 1 == level)"
           :key="a.activityId">{{a.activityName}}</p>
        <p class="activity-list"
           v-if="activities.filter(a => a.memberRating - 1 == level).length == 0">暂无</p>
      </input-block>
    </form-block>

    <lz-checkbox style="margin-top:10px"
                 disabled
                 v-model="data.showExpire">无可领取等级礼包自动隐藏该模块</lz-checkbox>
    <MarginBottomSetting :data="data" />
    <lz-dialog title="图片空间"
               class="jd-image-dialog"
               :visible.sync="uploadBoxShowed"
               v-if='uploadBoxShowed'
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
import Service from '@/business/service';
import CONST from '@/utils/constant';
import { LzMsg } from '@/utils/UI';
import V from '@/utils/valid';

export default {
  name: 'CtrlUpgradeGiftEditor',
  components: {
    FormBlock,
    InputBlock,
    MarginBottomSetting,
  },
  props: {
    data: {
      default: () => ({}),
    },
    validators: {
      default: () => ({}),
    },
  },
  data() {
    return {
      level: '0',
      levels: [],
      activities: [],
      CONST,
      V,
      uploadBoxShowed: false,
      hotzoneBoxShowed: false,
      rules: {
        pics: {
          trigger: 'change',
          validator: (rule, value, cb) => this.validators.pics(value),
        },
      },
    };
  },
  async created() {
    await this.getLevels();
    await this.getActivities();
  },
  methods: {
    // 获取会员等级设置
    async getLevels() {
      const { data } = await Service.getLevels();
      console.log('🚀 ~ getLevels ~ data', data);
      // this.levels = JSON.parse(data.levelJson).filter(l => l.level > 0);
      this.levels = data.levels;
    },
    // 获取会员等级礼包活动列表
    async getActivities() {
      const { data } = await Service.getUpgradeActivities();
      this.activities = data;
    },
    imgValidator(width, height, size, type = '') {
      return new Promise((resolve, reject) => {
        if (size > 500 * 1024) {
          reject(new Error('图片文件大小不可超过500k'));
        } else if (['jpg', 'jpeg', 'png'].indexOf(type) === -1) {
          reject(new Error('请使用jpg或png格式的文件'));
        } else {
          resolve();
        }
      });
    },
    selectImage(url) {
      if (url !== this.data.pic) {
        this.data.pics.splice(this.level, 1, url);
      }
      this.uploadBoxShowed = false;
    },
  },
};
</script>
<style lang="scss">
@import '~lz-crm/style/variables';

.ctrl-upgrade-gift-editor {
  .level-block .input-block-content {
    background-color: unset;
    padding: 0px;
  }
  .lz-tabs--card > .lz-tabs__header {
    border: 0;
  }
  .lz-tabs__header {
    margin-bottom: 0;
  }
  .lz-tabs__item.is-top {
    font-size: 12px;
    background-color: $BORDER_GRAY;
    width: auto;
    padding: 0 10px !important;
    border-radius: 5px 5px 0 0;
    margin-right: 5px;
    text-align: center;
  }
  .lz-tabs__item.is-top.is-active {
    background-color: $WHITE;
    border: 0;
  }

  .lz-tabs--card > .lz-tabs__header .lz-tabs__nav {
    border: 0;
  }
  .lz-tabs__content {
    background-color: $WHITE;
    padding: 20px;
  }

  .lz-textarea__inner {
    padding-bottom: 30px;
  }
  .upload-box {
    // padding: 20px 0;
    .bg {
      width: 100%;
    }
  }
  .activity-list {
    font-size: 12px;
    background-color: $BG_BLOCK_GRAY;
    border-radius: 2px;
    color: $FONT_MAIN_BLACK;
    padding: 8px 15px;
  }
}
</style>
