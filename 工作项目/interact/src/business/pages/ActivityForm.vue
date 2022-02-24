<template>
  <div class="page-activity-form">
    <lz-horizontal-steps-tip :steps="steps"
                             style="margin-bottom:20px"
                             :currentIndex="currentStep" />
    <div v-if="currentStep===0">
      <div v-if="sTpl.instanceId">
        <form-block title="编辑模板项">
          <component class="preview"
                     @change="changeTplOptions"
                     @reset="resetTpl"
                     :is="`${sTpl.templateKey}Editor`"
                     :options="tplOptions"
                     :activityInfo="activityInfo" />
        </form-block>
        <form-block>
          <lz-button v-if="$route.name === 'NewActivityForm'"
                     type="primary"
                     plain
                     @click="back">上一步</lz-button>
          <lz-button @click="next"
                     type="primary">下一步</lz-button>
        </form-block>
      </div>
      <div v-else>
        <form-block title="选择模版">
          <div class="tpl-list">
            <div class="tpl-wrapper"
                 v-for="tpl in tpls"
                 :key="`tpl-${tpl.instanceId}`">
              <div class="tpl-id">ID: {{tpl.templateId}}</div>
              <div class="tpl-content">
                <component :is="tpl.templateKey"
                           :options="JSON.parse(tpl.configJson)" />
              </div>
              <div class="cover">
                <div class="operates">
                  <p>
                    <lz-button class="btn"
                               type="primary"
                               @click="previewTpl(tpl)">预览</lz-button>
                  </p>
                  <p>
                    <lz-button class="btn"
                               type="primary"
                               @click.capture="selectTpl(tpl)">应用模版</lz-button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form-block>
      </div>

    </div>
    <div v-show="currentStep===1">
      <form-block v-for="(form, index) in forms"
                  :key="`form-${index}`"
                  :title="formInfo[form.name].title">
        <component :id="form.name"
                   :is="form.name"
                   :ref="form.name"
                   :activityInfo="activityInfo"
                   :formData="formData[form.name]"
                   @checkOneOption='checkOneOption'
                   :settings="form.settings"
                   :getAllData="getAllData"
                   @upDatePrizeList="upDatePrizeList" />
      </form-block>
      <form-block>
        <lz-button type="primary"
                   plain
                   @click="back">上一步</lz-button>
        <lz-button type="primary"
                   @click="next">下一步</lz-button>
      </form-block>
    </div>
    <div v-if="currentStep===2">
      <form-block title="预览活动">
        <lz-form ref="elForm"
                 label-width="200px">
          <lz-form-item label="活动主页: ">
            <div class="preview-page">
              <div style="position: relative; width: 375px">
                <component :is="sTpl.templateKey"
                           :options="tplOptions"
                           :formData="formData" />
              </div>
              <qrcode style="margin-left: 20px;"
                      :width="200"
                      :height="200"
                      :margin="0"
                      :value="`${cDomain}/tpl/${sTpl.templateKey}?key=${key}`" />
            </div>
          </lz-form-item>
        </lz-form>
      </form-block>
      <form-block>
        <!-- v-if="$route.name === 'NewActivityForm'" -->
        <div v-if='activityInfo.activityType!=508'>
          <lz-button class="btn"
                     type="primary"
                     plain
                     @click="back">上一步</lz-button>
          <lz-button class="btn"
                     v-if="activityInfo.status != 4"
                     type="primary"
                     @click="save">{{$route.name === 'NewActivityForm' ?'提交' : '保存'}}</lz-button>
        </div>
        <div v-else>
          <lz-button class="btn"
                     type="primary"
                     plain
                     @click="back">上一步</lz-button>
          <lz-button class="btn"
                     v-if="!activityInfo.status || activityInfo.status <2"
                     type="primary"
                     @click="save">{{$route.name === 'NewActivityForm' ?'完成' : '保存'}}</lz-button>
          <lz-button class="btn"
                     v-else
                     type="primary"
                     @click="$router.push('/list')">返回列表</lz-button>
        </div>
      </form-block>
    </div>
    <div class="preview-cover"
         v-show="previewShowed"
         @click.capture.stop="previewShowed=false">
      <div class="preview-phone">
        <component :is="pTpl.templateKey" />
      </div>
    </div>
  </div>
</template>

<script>
import Service from '@/business/service';
import FormBlock from '@/business/components/common/FormBlock';
import LzMsg from '@/business/utils/LzMsg';
import LzLoading from '@/business/utils/LzLoading';
import formInfo from '@/business/forms';
import Settings from '@/business/data/ActivitySettings';
import Qrcode from 'vue-qrcode';

export default {
  name: 'ActivityForm',
  components: {
    FormBlock,
    Qrcode,
  },
  data() {
    return {
      key: `${this.$route.params.type}-${Date.now()}`,
      cDomain: window.location.host === 'crmb.dianpusoft.cn' ? 'https://lzbk-isv.isvjcloud.com/activity' : 'https://lzkplcrm-isv.isvjcloud.com/activity',
      currentStep: 0,
      steps: [
        {
          title: '设置模版',
        }, {
          title: '设置活动',
        }, {
          title: '预览活动',
        },
      ],
      tpls: [],
      sTpl: {
        instanceId: '',
      },
      tplOptions: {},
      pTpl: {},
      previewShowed: false,
      formInfo,
      settings: {},
      activityInfo: {
        activityType: parseInt(this.$route.params.type),
        tplId: '',
      },
      forms: [],
      formData: {},
      btnState: true, // 防止连击 true 可点击  false不可点击
    };
  },

  // computed: {
  //   previewFormData () {
  //     if (this.activityInfo.activityType == 504) {
  //       if (this.formData && this.formData.cardForm && Array.isArray(this.formData.cardForm.collectCardInfoList)) {
  //         return {
  //           cardForm: {
  //             collectCardInfoList: this.formData.cardForm.collectCardInfoList.map(info => ({
  //               cardUrl: info.cardUrl,
  //             }))
  //           }
  //         };
  //       } else {
  //         return {
  //           cardForm: {
  //             collectCardInfoList: []
  //           }
  //         };
  //       }
  //     } else if (this.activityInfo.activityType == 507) {
  //       debugger
  //       return {
  //         prizeSettingsForm: { ...this.formData.prizeSettingsForm }
  //       }
  //     } else  {
  //       return { ...this.formData };
  //     }
  //   }
  // },
  watch: {},
  async created() {
    this.getTpls();
    this.settings = await Settings.getActivitySettings(this.$route.params.type);
    const forms = this.settings.forms || [];
    if (this.$route.params.id) {
      const { data } = await Service[this.settings.apis.get]({
        activityId: this.$route.params.id,
      });
      this.activityInfo = {
        ...this.activityInfo,
        ...data,
      };
      // this.sTpl.instanceId = this.activityInfo.tplId;
      const tplRes = await Service.getTemplateDetail({
        instanceId: this.activityInfo.tplId,
      });
      this.sTpl = tplRes.data;
      this.tplOptions = JSON.parse(tplRes.data.configJson);
      forms.forEach((form) => {
        const content = {};
        formInfo[form.name].fields.forEach(key => (content[key] = data[key]));
        this.formData[form.name] = content;
      });
      this.forms = [...forms];
    } else {
      this.forms = [...forms];
    }
  },
  mounted() { },
  methods: {
    // 单项验证某一项
    async checkOneOption(form, option) {
      console.log(111, this.$refs);
      const awardRange = this.$refs.prizeDistributionForm[0].form.awardRange;
      await this.$refs.prizeDistributionForm[0].getAllDataSelf();
      await this.$refs.orderForm[0].getAllDataSelf();
      // 判断如果领奖时间存在才验证是否正确
      if (awardRange[0]) {
        this.$refs[form][0].$refs.elForm.validateField(option);
      }
    },
    // 修改奖品发放类型的时候刷新奖品列表
    upDatePrizeList() {
      this.$refs.prizeSettingsForm[0].calcuPrizeRank();
    },
    getTpls() {
      Service.getRootTemplates({
        tType: this.$route.params.type,
      }).then(({ data }) => {
        this.tpls = data;
      });
    },
    selectTpl(tpl) {
      this.sTpl = { ...tpl };
    },
    previewTpl(tpl) {
      this.pTpl = tpl;
      this.previewShowed = true;
    },
    changeTplOptions(options) {
      this.tplOptions = {
        ...this.tplOptions,
        ...options,
      };
    },
    resetTpl() {
      this.tplOptions = {};
    },
    back() {
      if (this.currentStep > 0) {
        this.currentStep = this.currentStep - 1;
      } else if (this.currentStep === 0) {
        this.sTpl = {};
      }
    },
    async next() {
      if (this.currentStep === 0) {
        //
      } else if (this.currentStep === 1) {
        await this.verify();
        if (!this.uniqueCheck()) {
          return;
        }
        this.forms.forEach((form) => {
          this.formData[form.name] = this.$refs[form.name][0].$refs.elForm.model;
        });
        this.$nextTick(() => {
          Service.cacheJSON({
            key: this.key,
            value: JSON.stringify({
              options: this.tplOptions,
              formData: this.formData,
            }),
          });
        });
      }
      // 编辑活动也需要进入预览页面
      // // 如果是编辑活动直接提交
      // if (this.$route.params.id) {
      //   this.save();
      // } else {
      //   // 如果是新建活动跳到下一页
      //   this.currentStep = this.currentStep + 1;
      // }
      this.currentStep = this.currentStep + 1;
    },
    // 获取所有数据
    getAllData() {
      const allData = {};
      try {
        this.forms.forEach((form) => {
          allData[form.name] = this.$refs[form.name][0].$refs.elForm.model;
        });
      } catch (error) {
        console.log(error);
      }
      return allData;
    },
    uniqueCheck() {
      let flag = true;
      if (this.$route.params.type === '504') {
        const params = this.$refs.cardForm[0].$refs.elForm.model;
        if (params.collectCardInfoList.length < 3) {
          flag = false;
          LzMsg.error('卡片的数量不可少于3张');
          return;
        }
        for (let i = 0; i < params.collectCardInfoList.length; i++) {
          if (!params.collectCardInfoList[i].cardUrl) {
            flag = false;
            LzMsg.error(`请上传第${i + 1}张卡片的图片`);
            break;
          }
          if (params.collectCardInfoList[i].isLimit !== '1' && !params.collectCardInfoList[i].maxCount) {
            flag = false;
            LzMsg.error(`请设置第${i + 1}张卡片的最多抽取数量`);
            break;
          }
        }
      }
      if (this.$route.params.type === '505') {
        const maxAward = this.$refs.drawForm[0].$refs.elForm.model.maxAward;
        const drawPrizeInfoList = this.$refs.drawPrizeForm[0].$refs.elForm.model.drawPrizeInfoList;
        let total = 0;
        drawPrizeInfoList.forEach((item) => {
          total += Number(item.drawChance);
        });
        if (maxAward !== -1 && total === 100) {
          flag = false;
          LzMsg.error('当设置最大中奖次数时，中奖总概率概率不能设置为100%');
        }
      }

      if (this.$route.params.type === '506' || this.$route.params.type === '507') {
        const orderRange = this.$refs.orderForm[0].$refs.elForm.model.orderRange;
        const awardRange = this.$refs.prizeDistributionForm[0].$refs.elForm.model.awardRange;
        const awardStartTs = typeof awardRange[0] === 'string' ? new Date(awardRange[0]).getTime() : awardRange[0].getTime();
        const orderEndTs = typeof orderRange[1] === 'string' ? new Date(orderRange[1]).getTime() : orderRange[1].getTime();
        if (awardStartTs < orderEndTs + 24 * 60 * 60 * 1000 * 1) {
          flag = false;
          LzMsg.error('领奖开始时间不得早于订单结算截止时间1天后');
        }
      }

      // 校验试用商品
      if (this.$route.params.type === '508') {
        const product = this.$refs.trialForm[0].$refs.elForm.model.freeSamplingPrizeReqDTO.prizeName;
        if (!product) {
          flag = false;
          LzMsg.error('请设置试用商品!');
          return;
        }
      }
      return flag;
    },
    verify() {
      return new Promise((resolve, reject) => {
        let validate = true;
        Promise.all(this.forms.map(form =>
          this.$refs[form.name][0].$refs.elForm.validate().catch(() => {
            if (validate) {
              window.location.href = `#${form.name}`;
              // LzMsg.error(`${formInfo[form.name].title}设置有误`);
            }
            validate = false;
          }))).then(() => {
          if (validate) {
            resolve();
          } else {
            // LzMsg.error('活动设置有误')
            reject();
          }
        }).catch(reject);
      });
    },
    async save() {
      const loading = LzLoading.start();

      const params = {
        activityType: this.$route.params.type,
      };
      this.forms.forEach(form =>
        Object.assign(params, this.$refs[form.name][0].$refs.elForm.model));
      console.log(params);

      params.tplId = this.sTpl.instanceId;
      // if (Object.keys(this.tplOptions).some((key) => this.tplOptions[key])) {
      // }

      const { data } = await Service.createTemplate({
        instanceName: `${params.activityName}模版`,
        templateId: this.sTpl.templateId,
        configJson: JSON.stringify(this.tplOptions),
        isGeneral: 0,
        parentId: this.sTpl.instanceId,
      });
      params.tplId = data;
      let api = this.settings.apis.create;
      if (this.$route.params.id) {
        params.activityId = this.$route.params.id;
        api = this.settings.apis.update;
      }
      console.log('save -> params', JSON.stringify(params));
      if (this.$route.params.type === '501' || this.$route.params.type === '503') {
        params.prizeList.forEach((prize, index) => (prize.prizeIndex = index + 1));
      }
      if (this.$route.params.type === '506' || this.$route.params.type === '507') {
        params.prizeList.forEach((prize, index) => (prize.prizeIndex = index + 1));
        params.prizeInfoList = params.prizeList;
        delete params.prizeList;
      }
      if (this.$route.params.type === '502' || this.$route.params.type === '505') {
        params.drawTimesInfoList.forEach((time, index) => (time.index = index + 1));
        params.drawPrizeInfoList = params.drawPrizeInfoList
          .map((prize, index) => ({
            position: index + 1,
            ...prize,
          }))
          .filter(prize => !prize.isEmpty);
      }
      if (this.$route.params.type === '504') {
        params.drawPrizeInfoList = params.drawPrizeInfoList
          .map((prize, index) => ({
            position: index + 1,
            ...prize,
          }));
        params.prizeList = params.drawPrizeInfoList;
        delete params.drawPrizeInfoList;
      }
      console.log('save -> params', JSON.stringify(params));
      Service[api](params).then(() => {
        if (this.$route.params.id) {
          LzMsg.success('活动修改成功');
        } else {
          LzMsg.success('活动创建成功');
        }
        this.$router.replace({ name: 'Activities' });
        loading.close();
      })
        .catch((e) => {
          LzMsg.error(e.message);
          loading.close();
        });
    },
    cancel() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss">
@import '~lz-crm/style/variables';

.page-activity-form {

  .tip {
    font-size: 12px;
    line-height: 15px;
    margin-top: 5px;
    margin-bottom: 5px;
    color: $FONT_DISABLE_GRAY;
  }
  .tpl-list {
    display: flex;

    .tpl-id {
      text-align: center;
      font-size: 20px;
      padding: 10px;
    }
  }
  .tpl-wrapper {
    position: relative;
    width: 187.5px;
    height: 370.5px;
    margin-right: 20px;

    .cover {
      position: absolute;
      display: none;
      top: 43px;
      left: 0;
      width: 100%;
      height: calc(100% - 55px);
      background-color: rgba(0, 0, 0, 0.3);
      .operates {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .btn {
          width: 100px;
        }
      }
    }
    &:hover {
      .cover {
        display: block;
      }
    }
  }
  .tpl-content {
    width: 375px;
    height: 627px;
    overflow: hidden;
    transform-origin: 0 0;
    transform: scale(0.5);
  }
  .preview-page {
    display: flex;
    min-height: 627px;
    overflow: auto;
  }
  .preview-qrcode {
    margin-left: 40px;
  }
  .preview-cover {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    .preview-phone {
      width: 375px;
      height: 627px;
      overflow-y: auto;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
</style>
