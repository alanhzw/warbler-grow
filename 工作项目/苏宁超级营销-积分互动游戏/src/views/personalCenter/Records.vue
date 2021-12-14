<!--
 * @Description:各种记录
 * @Autor: hanzhiwei
 * @Date: 2021-01-07 11:49:38
 * @LastEditTime: 2021-01-08 14:34:28
 * @FilePath: \SNActivity\src\views\personalCenter\Records.vue
-->
<template>
  <div class="records-box">
    <div v-for="(item, index) in modules" :key="`module-${index}`">
      <component :is="item.name" :options="item.options || {}" @getRecords="getRecords" @changeDate="changeDate" @changetype="changetype" :dataList="dataList" />
    </div>
  </div>
</template>

<script>
// 注入组件
import '@/components/personalCenter/index.js';
// 引入封装api
import { personalCenterService } from '@/axios/apis';
// 引入活动配置文件
import recordsSettings from '@/data/personalCenter/recordsSettings';
// 引入全局js
import { timeFormat } from '@/assets/js/common.js';
export default {
  name: '',
  data () {
    return {
      unionld: this.$route.query.unionld || '', // 用户pin
      shopId: this.$route.query.shopId || '', // 店铺id
      settings: '', // 总配置信息
      modules: '', // 组件信息
      getTime: timeFormat(new Date(), 'yyyy-mm-01-00-00-00'), // 查询的日期参数
      activityType: [301, 302, 303], // 默认查询的类型
      dataList: '', // 记录列表
      type: this.$route.params.type, // 当前处在何种记录页中  1礼包发放  2会员权益领取  3积分兑换  4活动获奖
    };
  },
  methods: {
    // 获取记录
    async getRecords () {
      let { data } = await personalCenterService[this.settings.apis.getRecords]({
        getTime: this.getTime,
        pin: this.unionld,
        shopId: this.shopId,
        activityType: this.activityType
      });
      // 由于活动返回的数据类型不一致  所以此处需要进行判断
      if (this.type === '3') {
        this.dataList = data.data.usercPointExchangeRecordListRespDTO;
      } else {
        this.dataList = data.data;
      }
      // 对数据的姓名和电话号进行脱敏操作
      this.dataList.forEach(e => {
        if (e.realName) {
          e.realNameStr = e.realName.slice(0, 1) + '**';
          e.mobileStr = (e.mobile + '').slice(0, 3) + '****' + (e.mobile + '').slice(7, 11);
        }
      });
    },
    // 修改查询时间
    changeDate (val, data) {
      this.getTime = timeFormat(val, 'yyyy-mm-dd-hh-mm-ss');
      this.getRecords();
    },
    // 修改查询类型
    changetype (arr) {
      this.activityType = arr;
      this.getRecords();
    }
  },

  async created () {
    this.settings = await recordsSettings.getRecordsSettings(this.type);
    this.modules = this.settings.modules;
    this.getRecords();
  },
};
</script>

<style lang="scss">
.records-box {
}
</style>