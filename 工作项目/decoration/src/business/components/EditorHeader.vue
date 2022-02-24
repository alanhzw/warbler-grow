<!--
 * @Author: YC
 * @Date: 2020-12-01 14:31:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-22 10:33:34
 * @Description:
-->
<template>
  <header class="page-editor-header">
    <img class="logo" src="@/assets/logo-decoration.png" alt=''>
    <span class="page-name">{{info.title}}：{{info.instanceName}}</span>
    <lz-rename-pop class="edit-box" :maxLength="20" :defaultValue="info.instanceName" @confirm="(name) => $emit('rename', info,name)" />
    <span v-if="info.pType === 0 && info.isReleased === 1" class="mark-publish">当前发布</span>
    <div class="offset"></div>
    <div v-if="loaded" class="right btn-bar">
      <lz-dropdown @command="publish">
        <lz-button type="primary">发布<i class="lz-icon-arrow-down lz-icon--right"></i></lz-button>
        <lz-dropdown-menu slot="dropdown">
          <lz-dropdown-item command="1">立即发布</lz-dropdown-item>
          <lz-dropdown-item command="2">定时发布</lz-dropdown-item>
        </lz-dropdown-menu>
      </lz-dropdown>
      <lz-popover placement="bottom" trigger="click">
        <img :src="`${CONST.IMAGE_PREFIX}${info.qrcodeUrl}`">
        <lz-button class="page-btn" slot="reference">预览</lz-button>
      </lz-popover>
      <lz-button class="page-btn" v-if="info.isReleased === 1" @click="$emit('sync')">同步</lz-button>
      <!-- <lz-button @click="$emit('save')">保存</lz-button> -->
      <lz-button class="page-btn" @click="$emit('copy')">另存为</lz-button>
      <div class="offset"></div>
    </div>
    <lz-dialog title="请选择发布时间" :visible.sync="timerVisible" width="30%" append-to-body>
      <lz-date-picker v-model="time" type="datetime" placeholder="选择发布的日期时间">
      </lz-date-picker>
      <span slot="footer" class="dialog-footer">
        <lz-button type="primary" @click="setTimer">确 定</lz-button>
        <lz-button @click="timerVisible = false">取 消</lz-button>
      </span>
    </lz-dialog>
  </header>
</template>
<script>
import Moment from 'moment';
import CONST from '@/utils/constant';
import NameEditBox from '@/business/components/NameEditBox';
import { LzMsg } from '@/utils/UI';

export default {
  name: 'EditorHeader',
  components: {
    NameEditBox,
  },
  props: {
    info: {
      default: () => ({}),
    },
    loaded: {
      default: true,
    },
  },
  data() {
    return {
      CONST,
      time: '',
      timerVisible: false,
    };
  },
  methods: {
    /**
     * 发布页面
     */
    publish(type) {
      if (type === '1') {
        // 立即发布
        this.$emit('publish');
      } else if (type === '2') {
        // 定时发布
        this.timerVisible = true;
      }
    },
    /**
     * 设置定时
     */
    setTimer() {
      if (this.time > new Date()) {
        this.$emit('publish', Moment(this.time).format('YYYY-MM-DD HH:mm:ss'));
        this.timerVisible = false;
      } else if (!this.time) {
        LzMsg.error('发布时间不可以为空!');
      } else {
        LzMsg.error('发布时间不可以晚于当前时间');
      }
    },
  },
};

</script>
<style lang="scss">
@import '~lz-crm/style/variables.scss';

$HEADER_HEIGHT: 60px;

.page-editor-header {
  background-color: $BG_BLOCK_GRAY;
  display: flex;
  align-items: center;
  height: $HEADER_HEIGHT;

  .logo {
    float: left;
    height: 40px;
    margin-left: 15px;
  }
  .page-name {
    margin-left: 30px;
    margin-right: 10px;
    font-size: 14px;
    line-height: $HEADER_HEIGHT;
    color: $FONT_COMMON_GRAY;
  }
  .is-released {
    display: inline-block;
    font-size: 14px;
    width: 60px;
    height: 20px;
    padding: 0 10px;
    color: white;
    background-color: #0b6;
  }
  .mark-publish {
    margin-left: 30px;
    color: #3399FF;
    background-color: $BG_MINOR_PINK;
    border-radius: 4px;
    font-size: 12px;
    padding: 3px 5px;
  }
  .page-type {
    color: $WHITE;
    font-size: 14px;
    color: $FONT_COMMON_BLACK;
    line-height: $HEADER_HEIGHT;
  }
  .btn-bar {
    display: flex;
    align-items: center;
    .page-btn {
      margin-left: 10px;
    }
  }
}
</style>
