<template>
  <div class="component-draw-settings">
    <lz-form ref="elForm"
             label-width="200px"
             :model="form"
             :rules="rules"
             :disabled="settings.disableStatus.includes(activityInfo.status) || calcuStarted">

      <lz-form-item label="每人每日可抽卡次数:"
                    prop="dailyDrawTimes"
                    v-if="settings.items.includes('dailyDrawTimes')">
        <lz-radio-group v-model="form.dailyDrawTimesType"
                        @change="changedailyDrawTimesType">
          <lz-radio :label="1">不限制</lz-radio>
          <lz-radio :label="2">
            限制次数
            <span style="margin-left: 10px"
                  v-show="form.dailyDrawTimesType == 2">
              <lz-input class="count-input"
                        @input='toInteger("dailyDrawTimes")'
                        maxlength="7"
                        :disabled="form.dailyDrawTimesType == 1"
                        v-model="form.dailyDrawTimes" />次
            </span>
          </lz-radio>
        </lz-radio-group>
        <!-- <p class="tip"></p> -->
      </lz-form-item>

      <lz-form-item label="每日首次分享增加抽卡次数:"
                    prop="shareDrawTimes"
                    v-if="settings.items.includes('shareDrawTimes')">
        <lz-radio-group v-model="form.shareDrawTimesType"
                        @change="changeshareDrawTimesType">
          <lz-radio :label="1">不增加</lz-radio>
          <lz-radio :label="2">
            增加次数
            <span style="margin-left: 10px"
                  v-show="form.shareDrawTimesType == 2">
              <lz-input class="count-input"
                        maxlength="7"
                        :disabled="form.shareDrawTimesType == 1"
                        v-model="form.shareDrawTimes"
                        @input='toInteger("shareDrawTimes")' />次
            </span>
          </lz-radio>
        </lz-radio-group>
        <!-- <p class="tip"></p> -->
      </lz-form-item>

      <lz-form-item label="卡片设置:"
                    prop="collectCardInfoList"
                    v-if="settings.items.includes('collectCardInfoList')">
        <span>单次抽中卡片总概率：{{totalChanceStr}}%</span>
        <p class="tip">注：卡片抽中累计概率不能超过100%。</p>
        <p class="tip">抽中概率，用户每次抽取到该卡片的概率；最多抽取，每个用户在活动周期内，可以抽到该卡片的总数量</p>
        <p class="tip">注：可上传尺寸为600*800px，大小不超过500k的图片。图片格式为png、jpg。</p>
        <div class="collect-card-list">
          <div class="collect-card-item prize-info"
               v-for="(item,index) in form.collectCardInfoList"
               :key="index">
            <lz-form label-width="200px"
                     label-position="right"
                     :model="form"
                     :disabled="settings.disableStatus.includes(activityInfo.status) || calcuStarted">

              <lz-form-item label="图片:"
                            prop="cardUrl"
                            label-width="90px">
                <div class="img-box"
                     :class="{'is-can-be-click':isCanBeClick}"
                     @click='changeIndex(index)'>
                  <img v-if="item.cardUrl == '' "
                       :src="tipPic"
                       @click="uploadBoxShowed = true" />
                  <img v-else
                       class="share-img"
                       :src="`${CONST.IMAGE_PREFIX}${item.cardUrl}`"
                       @click="uploadBoxShowed = true" />
                </div>
              </lz-form-item>
              <div class="tool-div"></div>
              <lz-form-item label="标题:"
                            prop="cardName"
                            label-width="90px">
                <lz-input v-model="item.cardName"
                          :maxlength="6"></lz-input>
              </lz-form-item>
              <div class="tool-div"></div>
              <lz-form-item label="抽中概率:"
                            prop="chance"
                            label-width="90px">
                <lz-input v-model="item.chance"
                          :maxlength="7"
                          @input="toFixedThree(index)"></lz-input> %
              </lz-form-item>
              <div class="tool-div"></div>
              <lz-form-item label="最多抽取:"
                            prop="maxCount"
                            label-width="90px">
                <lz-select v-model="item.isLimit"
                           placeholder="请选择"
                           @change='changeIsLimit(index)'>
                  <lz-option v-for="items in options"
                             :key="items.value"
                             :label="items.label"
                             :value="items.value">
                  </lz-option>
                </lz-select>
                <div class="tool-div"></div>
                <lz-input :disabled="item.isLimit=='1' "
                          v-model="item.maxCount"
                          :maxlength="7"
                          @input='item.maxCount=Number(item.maxCount.toString().replace(/^(0+)|[^\d]+/g, ""))==0?"":Number(item.maxCount.toString().replace(/^(0+)|[^\d]+/g, ""))'></lz-input> 张
              </lz-form-item>
              <div class="tool-div"></div>
              <i class="btn-del iconfont icon-icon-07"
                 :class="{'is-can-be-click':isCanBeClick}"
                 @click="deleteCard(index)" />
            </lz-form>
            <lz-dialog title="图片空间"
                       class="jd-image-dialog"
                       :visible.sync="uploadBoxShowed"
                       :append-to-body="true"
                       width="1150px"
                       :close-on-click-modal='false'>
              <jd-image-selector @selected="selectImage"
                                 :validator="imgValidator" />
            </lz-dialog>
          </div>
        </div>
        <div class="tool-div"></div>
        <lz-form-item>
          <lz-button v-if="form.collectCardInfoList.length < 5"
                     type="primary"
                     plain
                     @click="addOneCard">添加卡片（{{ form.collectCardInfoList.length }} / 5）</lz-button>
        </lz-form-item>
      </lz-form-item>

    </lz-form>
  </div>
</template>

<script>
import LzMsg from '@/business/utils/LzMsg';

import CONST from '@/utils/constant';
import JdImageSelector from '@/business/components/common/JdImageSelector';

export default {
  name: 'DrawSettings',
  components: {
    JdImageSelector,
  },
  props: {
    formData: {
      default: () => ({}),
    },
    activityInfo: {
      default: () => ({}),
    },
    settings: {
      default: () => ({}),
    },
  },
  data() {
    return {
      tipPic: require('@/assets/image-select.png'),
      uploadBoxShowed: false,
      CONST,
      options: [{
        value: '1',
        label: '不限制',
      }, {
        value: '2',
        label: '限制为',
      }],
      value: '1',
      cardIndex: '', // 卡片索引
      form: {
        shareDrawTimes: -1,
        shareDrawTimesType: 1,
        dailyDrawTimes: -1,
        dailyDrawTimesType: 1,
        collectCardInfoList: [],
      },
      rules: {
        collectCardInfoList: [
          {
            validator: (rule, value, cb) => {
              let sum = 0;
              value.forEach((p) => {
                const chance = p.chance - 0 > 0 ? p.chance - 0 : 0;
                sum += chance;
              });
              if (sum > 100) {
                cb(new Error('总概率不能大于100%'));
              } else if (sum < 0) {
                cb(new Error('总概率不能小于0'));
              } else {
                cb();
              }
              cb();
            },
            trigger: 'change',
          },
        ],
        dailyDrawTimes: [
          {
            required: true,
            message: '请设置每人每日可抽卡次数',
            trigger: 'change',
          },
          {
            validator(rule, value, cb) {
              if (value > 0 || value === -1) {
                cb();
              } else {
                cb(new Error('请输入正整数'));
              }
            },
            trigger: 'change',
          },
        ],
        shareDrawTimes: [
          {
            required: true,
            message: '请设置每日首次分享增加抽卡次数',
            trigger: 'change',
          },
          {
            validator(rule, value, cb) {
              if (value > 0 || value === -1) {
                cb();
              } else {
                cb(new Error('请输入正整数'));
              }
            },
            trigger: 'change',
          },
        ],
      },
    };
  },
  computed: {
    totalChanceStr() {
      let totalChance = 0; // 总概率
      this.form.collectCardInfoList.forEach((item) => {
        totalChance += Number(item.chance);
      });
      if (totalChance > 100) {
        LzMsg.error('卡片抽中累计概率不能超过100%');
      }
      return totalChance.toFixed(2);
    },
    calcuStarted() {
      // 是否已经开始结算
      return new Date(this.activityInfo.orderStartTime) < new Date();
    },
    isCanBeClick() {
      return this.settings.disableStatus.includes(this.activityInfo.status) || this.calcuStarted;
    },
  },
  watch: {
    totalChanceStr() {
      this.$refs.elForm.validateField('collectCardInfoList');
    },
  },
  created() {
    this.form = {
      ...this.form,
      ...this.formData,
    };
    this.form.dailyDrawTimesType = this.form.dailyDrawTimes === -1 ? 1 : 2;
    this.form.shareDrawTimesType = this.form.shareDrawTimes === -1 ? 1 : 2;
    if (this.form.collectCardInfoList) {
      this.form.collectCardInfoList = this.form.collectCardInfoList.map(item => ({
        ...item,
        maxCount: item.maxCount === -1 ? '' : item.maxCount,
        isLimit: item.maxCount === -1 ? '1' : '2',
      }));
    }
  },
  methods: {
    // 输入正整数
    toInteger(content) {
      this.form[content] = Number(this.form[content].toString().replace(/^(0+)|[^\d]+/g, ''));
    },
    // 保留三位小数
    toFixedThree(index) {
      console.log(this.form.collectCardInfoList);
      this.form.collectCardInfoList[index].chance = this.form.collectCardInfoList[index].chance.replace(/[^\d.]/g, ''); // 清除除了“数字”和“.”以外的字符
      this.form.collectCardInfoList[index].chance = this.form.collectCardInfoList[index].chance.replace(/\.{2,}/g, '.'); // 只保留第一个. 清除多余的
      this.form.collectCardInfoList[index].chance = this.form.collectCardInfoList[index].chance.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
      // eslint-disable-next-line no-useless-escape
      this.form.collectCardInfoList[index].chance = this.form.collectCardInfoList[index].chance.replace(/^(\-)*(\d+)\.(\d\d\d).*$/, '$1$2.$3');// 只能输入3个小数
      if (this.form.collectCardInfoList[index].chance.indexOf('.') < 0 && this.form.collectCardInfoList[index].chance !== '') {
        // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
        this.form.collectCardInfoList[index].chance = parseFloat(this.form.collectCardInfoList[index].chance);
      }
    },
    changedailyDrawTimesType(value) {
      if (value === 1) {
        this.form.dailyDrawTimes = -1;
      } else {
        this.form.dailyDrawTimes = 1;
      }
    },
    changeshareDrawTimesType(value) {
      if (value === 1) {
        this.form.shareDrawTimes = -1;
      } else {
        this.form.shareDrawTimes = 1;
      }
    },
    selectImage(pic) {
      this.form.collectCardInfoList[this.cardIndex].cardUrl = pic;
      this.uploadBoxShowed = false;
    },
    imgValidator(width, height, size, type) {
      return new Promise((resolve, reject) => {
        if (width !== 600 || height !== 800) {
          reject('上传图片的尺寸为600*800px,请上传对应尺寸图片');
        } else if (type !== 'png' && type !== 'jpeg') {
          reject('请上传png或jpg格式的图片');
        } else {
          resolve();
        }
      });
    },
    // 添加卡片
    addOneCard() {
      if (this.form.collectCardInfoList.length < 5) {
        this.form.collectCardInfoList.push({
          cardName: '',
          cardUrl: '',
          chance: '',
          maxCount: '',
          isLimit: '1',
        });
      }
    },
    // 修改当前索引  点的是第几张卡片
    changeIndex(index) {
      this.cardIndex = index;
    },
    // 删除卡片
    deleteCard(index) {
      this.form.collectCardInfoList.splice(index, 1);
    },
    // 数量限制的下拉框改变
    changeIsLimit() {
      this.form.collectCardInfoList.forEach((item) => {
        if (item.isLimit === '1') {
          item.maxCount = '';
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import '~lz-crm/style/variables';

.component-draw-settings {
  .prize-info {
    border: 1px dashed $BORDER_GRAY;
    padding: 0 20px;
    color: $FONT_COMMON_GRAY;
    font-size: 12px;
    position: relative;

    .btn-del {
      position: absolute;
      top: 0;
      right: 10px;
    }
  }
  .is-can-be-click {
    pointer-events: none;
    cursor: not-allowed;
    cursor: no-drop;
  }
  .count-input.lz-input {
    width: 60px;
    margin: 0 10px;
  }

  .draw-time-settings {
    font-size: 14px;

    color: $FONT_COMMON_GRAY;

    .btn-del {
      color: $TAG_INFO_BLUE;
      margin-left: 20px;
    }

    .lz-input {
      width: 80px;
      margin: 0 5px;
      text-align: center;
    }
  }
  .tool-div {
    padding-top: 10px;
  }
  .collect-card-list {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    .collect-card-item {
      margin: 20px 20px 0 0;
      padding: 20px 10px;
      width: 500px;

      .el-input {
        width: 340px;
      }
      .img-box {
        display: flex;
        justify-content: flex-start;
        height: 100px;
        .share-img {
          width: 100px;
        }
      }

      .delete-btn-box {
        display: flex;
        justify-content: center;
        padding: 0 20px;
        .delete-btn {
          width: 100%;
          margin: 0 auto;
        }
      }
    }
  }
  .jd-image-dialog {
    .lz-dialog {
      width: 1135px;
    }
  }
}
</style>
