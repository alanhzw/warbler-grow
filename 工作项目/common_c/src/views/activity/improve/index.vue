<!--
 * @Author: 一尾流莺
 * @Description:完善信息有礼活动页
 * @Date: 2022-01-10 11:40:08
 * @LastEditTime: 2022-02-17 09:21:02
 * @FilePath: \common_c\src\views\activity\improve\index.vue
-->
<template>
  <div class="improve-box"
       :style="styles">
    <div v-for="(item, index) in modules"
         :key="`module-${index}`">
      <component :is="item.name"
                 :ref="item.name"
                 :options="item.options"
                 :all-collects="allCollects"
                 :activity-info="activityInfo"
                 @show-error="showError"
                 @get-activity-info="getActivityInfo"
                 @handle-submit="onImproveSubmit"
                 :default-option='defaultOption' />
    </div>
  </div>
</template>

<script>
import './components/index';
import apis from './utils/apis';
import modules from './utils/modules';
import defaultOption from './utils/defaultOption';
import allCollects from './utils/allCollects';
import setHeaderShare from '@/utils/jdShare';
import constant from '@/utils/constant';

// 解析参数
import Qs from 'qs';

// 网络请求
import { PointsService } from '@/http';

export default {
  name: 'home',
  data() {
    return {
      modules,
      apis,
      defaultOption,
      allCollects,
      activityInfo: {},
      tplId: '',
      activityId: '',
      type: '',
      formData: [],
    };
  },
  computed: {
    // 根据活动类型返回模板样式
    styles() {
      // 完善信息有礼的模板样式
      return {
        backgroundColor: this.defaultOption.backgroundColor,
      };
    },
  },
  methods: {
    // 解析url参数
    async getParams() {
      let params;
      if (window.location.href.indexOf('sid') > -1) {
        params = Qs.parse(window.location.hash.split('?')[1] || '');
      } else {
        params = Qs.parse(window.location.href.split('?')[1] || '');
      }
      const { tplId, activityId, type } = params;
      this.tplId = tplId;
      this.activityId = activityId;
      this.type = type;
      console.log('🚀🚀~ params:', params);
    },
    // 完善信息有礼的提交
    onImproveSubmit() {
      const result = this.$refs.IForm[0].Validate();
      if (result) {
        this.join();
      }
    },
    // 提交表单,参加活动
    async join() {
      // 组合表单信息
      const nameIndex = this.formData.findIndex((item) => item.name === 'name');
      const genderIndex = this.formData.findIndex(
        (item) => item.name === 'gender',
      );
      const birthdayIndex = this.formData.findIndex(
        (item) => item.name === 'birthday',
      );
      const addressIndex = this.formData.findIndex(
        (item) => item.name === 'address',
      );
      const addressDetailIndex = this.formData.findIndex(
        (item) => item.name === 'addressDetail',
      );
      if (nameIndex > -1) {
        this.formData[nameIndex].value = this.$refs.IForm[0].username;
      }
      if (genderIndex > -1) {
        this.formData[genderIndex].value = this.$refs.IForm[0].formGender;
      }
      if (birthdayIndex > -1) {
        this.formData[birthdayIndex].value = this.$refs.IForm[0].formBirthday;
      }
      if (addressIndex > -1) {
        this.formData[addressIndex].value = this.$refs.IForm[0].formAddress;
      }
      if (addressDetailIndex > -1) {
        this.formData[addressDetailIndex].value = this.$refs.IForm[0].addressInfo;
      }

      const { data } = await PointsService[this.apis.submitActivity]({
        activityId: this.activityId,
        items: this.formData,
      });
      this.$refs.ISuccess[0].points = data;
      this.$refs.ISuccess[0].show = true;
    },
    // 展示错误信息
    showError(message) {
      this.$refs.IError[0].error = message;
      this.$refs.IError[0].showError();
    },
    // 取模板
    async tplPreview(instanceId) {
      // 获取模板信息
      const { data } = await PointsService[this.apis.getCTemplateDetail]({
        instanceId,
      });
      this.defaultOption = JSON.parse(data.configJson);
    },
    // 获取活动信息
    async getActivityInfo() {
      const { data } = await PointsService[this.apis.getActivityInfo]({
        activityId: this.activityId,
      });
      this.allCollects = data.items;
      this.activityInfo = data;
      this.formData = data.items;
      document.title = data.activityName;
      if (data.memberActivityStatus !== 7) {
        if (data.memberActivityStatus === 11) {
          this.$refs.IError[0].show = true;
          this.$refs.IError[0].showBtn = false;
          this.$refs.IError[0].error = '会员等级不符合';
        }
        if (data.memberActivityStatus === 17) {
          this.$refs.IError[0].show = true;
          this.$refs.IError[0].showBtn = false;
          this.$refs.IError[0].error = '不符合活动条件';
        }
        if (data.memberActivityStatus === -1) {
          this.$refs.IError[0].show = true;
          this.$refs.IError[0].showBtn = false;
          this.$refs.IError[0].error = '你与奖品擦肩而过';
        }
        if (data.memberActivityStatus === 28) {
          this.$refs.IError[0].show = true;
          this.$refs.IError[0].showBtn = false;
          this.$refs.IError[0].error = '请关注店铺后再参加活动';
        }
      }
    },
    async getOpenCard() {
      const { data } = await PointsService[this.apis.getOpenCard]({});
      if (!data.openedCard) {
        window.location.href = `${
          data.openCardLink
        }&returnUrl=${encodeURIComponent(window.location.href)}`;
      }
    },
  },
  async created() {
    await this.getParams();
    await this.tplPreview(this.tplId);
    await this.getActivityInfo();
    await this.getOpenCard();
    // 设置头部分享
    setHeaderShare({
      type: constant.SHARE_TYPE,
      title: this.activityInfo.shareText,
      imageUrl: this.activityInfo.sharePic,
    });
  },
  mounted() {

  },

};
</script>

<style lang="scss">
.improve-box {
  min-height: calc(100vh - 1.52rem);
  position: relative;
  padding-bottom: 1.52rem;
}
</style>
