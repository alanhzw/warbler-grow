<!--
 * @Description:兑换记录头部组件
 * @Autor: hanzhiwei
 * @Date: 2021-01-07 13:40:48
 * @LastEditTime: 2021-01-07 18:43:46
 * @FilePath: \SNActivity\src\components\personalCenter\Header.vue
-->
<template>
  <div class="header-box">
    <van-sticky>
      <div class="top">
        <div class="top-contain">
          <div class="data-time" @click="showDatePicker">
            {{defaultDate}}月
            <van-icon color="#c6c6c6" class="arrow-icon" name="arrow-down" />
          </div>
          <div class="select-type" @click="showTypePicker" v-if="options.isShow">
            {{typeText}}
            <van-icon color="#c6c6c6" class="arrow-icon" name="arrow-down" />
          </div>
        </div>
      </div>
    </van-sticky>

    <DataTimePicker ref="dataPicker" @changeDate="changeDate" />
    <TypePicker ref="typePicker" @changeType="changeType" />

  </div>
</template>

<script>
// 时间选择器组件
import DataTimePicker from '@/components/personalCenter/DateTimePacker.vue';
// 引入全局js
import { timeFormat } from '@/assets/js/common.js';
import TypePicker from './TypePicker.vue';

export default {
  name: '',
  components: {
    DataTimePicker,
    TypePicker,
  },
  props: {
    options: {
      default: () => ({}),
    },
  },
  data () {
    return {
      defaultDate: timeFormat(new Date(), 'yyyy-mm'), // 默认显示的时间
      dataShow: false, // 日期弹窗
      typeShow: false, // 类型弹窗
      typeText: '全部', // 默认显示的类型
    };
  },
  methods: {
    // 展示时间选择器弹窗
    showDatePicker () {
      this.$refs.dataPicker.dataShow = true;
    },
    // 展示类型选择器弹窗
    showTypePicker () {
      this.$refs.typePicker.typeShow = true;
    },
    // 修改选择的年月
    changeDate (val) {
      this.defaultDate = timeFormat(val, 'yyyy-mm');
      this.$emit('changeDate', val);
    },
    // 修改选择的类型
    changeType (text, arr) {
      this.typeText = text;
      this.$emit('changetype', arr);
    }

  }
};
</script>

<style lang="scss">
.header-box {
  .top {
    width: 100%;
    height: 0.9rem;
    font-size: 0.26rem;
    border-bottom: 1px solid #c5c5c5;

    .top-contain {
      padding: 0 0.24rem;
      width: 100%;
      height: 0.9rem;
      display: flex;
      background: #ffffff;
      line-height: 0.9rem;
      justify-content: space-between;
      box-sizing: border-box;
      color: #353535;

      .data-time {
        display: flex;
      }

      .select-type {
        display: flex;
      }

      .arrow-icon {
        margin-left: 0.1rem;
        padding-top: 0.3rem;
      }
    }
  }
}
</style>