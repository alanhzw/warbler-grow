<!--
 * @Author: YC
 * @Date: 2020-12-01 14:31:32
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-12 14:24:36
 * @Description:
-->
<template>
  <div class="ctrl-open-card-editor">
    <form-block title="开卡礼包"
                ref="formBlock"
                :model="data"
                :rules="rules">
      <input-block title="选择图片："
                   prop="pic">
        <div class="upload-box"
             @click="uploadBoxShowed = true">
          <img class="bg"
               :src="`${CONST.IMAGE_PREFIX}${data.pic}`"
               alt="">
        </div>
        <p class="tip"
           slot="tip">注：建议使用宽度690px，大小不超过500k图片类型为jpg、png</p>
      </input-block>
      <input-block title="可用的开卡礼包活动">
        <p class="activity-list"
           v-for="card in cardList"
           :key='card'>{{card}}</p>
        <p class="activity-list"
           v-if="cardList.length == 0">暂无</p>

      </input-block>
    </form-block>
    <lz-checkbox style="margin-top:10px"
                 disabled
                 v-model="data.showExpire">无可领取开卡礼包自动隐藏该模块</lz-checkbox>

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
import Service from '@/business/service';
import CONST from '@/utils/constant';
import { LzMsg } from '@/utils/UI';
import V from '@/utils/valid';

export default {
  name: 'CtrlTextEditor',
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
      CONST,
      V,
      cardList: '',
      uploadBoxShowed: false,
      hotzoneBoxShowed: false,
      rules: {
        pic: {
          trigger: 'change',
          validator: (rule, value, cb) => this.validators.pic(value),
        },
      },
    };
  },
  created() {
    this.getOpenCardPackList();
  },
  methods: {
    // 获取开卡礼包列表
    async getOpenCardPackList() {
      const { data } = await Service.getOpenCardPackList({
        isNow: 0,
      });
      this.cardList = data;
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
        this.data.pic = url;
        this.data.hotzones = [];
      }
      this.uploadBoxShowed = false;
    },
  },
};
</script>

<style lang="scss">
@import '~lz-crm/style/variables';

.ctrl-open-card-editor {
  .lz-textarea__inner {
    padding-bottom: 30px;
  }

  .upload-box {
    padding: 20px 0;

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
