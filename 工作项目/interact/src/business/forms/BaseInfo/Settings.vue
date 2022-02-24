<template>
  <div class="component-base-info-settings">
    <lz-form ref="elForm"
             label-width="200px"
             :model="form"
             style='font-size: 12px'
             :rules="rules"
             :disabled="settings.disableStatus.includes(activityInfo.status)">

      <lz-form-item label="活动标题："
                    prop="activityName"
                    v-if="settings.items.includes('activityName')">
        <lz-input :disabled="isFinished"
                  v-model="form.activityName"
                  :maxlength="20"
                  show-word-limit></lz-input>
      </lz-form-item>

      <lz-form-item label="活动等级设置："
                    prop="grade"
                    v-if="settings.items.includes('grade')">
        <div class="same-line">
          <lz-checkbox :indeterminate="isIndeterminate"
                       :disabled="awardStarted"
                       v-model="checkAll"
                       @change="handleCheckAllChange">全部会员
          </lz-checkbox>
          <lz-checkbox-group :disabled="awardStarted"
                             v-model="grades"
                             @change="changeGrades">
            <lz-checkbox v-for="l in levels"
                         :label="l.level"
                         name="type"
                         :key="`level-option-${l.level}`">
              {{ l.levelName }}
            </lz-checkbox>
          </lz-checkbox-group>
        </div>
      </lz-form-item>

      <lz-form-item label="参与条件："
                    prop="baseCondition"
                    v-if="settings.items.includes('baseCondition')">
        <lz-select v-model="form.baseCondition"
                   placeholder="请选择"
                   @change="changeBaseCondition">
          <lz-option v-for="item in optionsType"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </lz-option>
        </lz-select>
        <div v-if="isShowGrades">
          <div class="same-line">
            <lz-checkbox :indeterminate="isIndeterminate"
                         v-model="checkAll"
                         @change="handleCheckAllChange">全部会员
            </lz-checkbox>
            <lz-checkbox-group v-model="grades"
                               @change="changeGrades">
              <lz-checkbox v-for="l in levels"
                           :label="l.level"
                           name="type"
                           :key="`level-option-${l.level}`">
                {{ l.levelName }}
              </lz-checkbox>
            </lz-checkbox-group>
          </div>
        </div>
        <div v-if="isShowJoinTime">
          <lz-radio-group v-model="form.joinTime">
            <lz-radio :label="0">活动期间入会</lz-radio>
            <lz-radio :label="1">活动以前入会</lz-radio>
          </lz-radio-group>
        </div>
      </lz-form-item>

      <lz-form-item label="活动时间："
                    prop="activityTime"
                    v-if="settings.items.includes('activityTime')">
        <lz-date-picker :picker-options="pickerOptions"
                        v-model="form.activityTime"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        @change="activityTimeChange" />
        <p class="tip">注：活动时间不得超过60天,不得早于当前时间</p>
      </lz-form-item>

    </lz-form>
  </div>
</template>


<script>
import Service from '@/business/service';
import Moment from 'moment';
import { ActivityTypeEnum } from '@/utils/ActivityType';

export default {
  name: 'BaseInfoSettings',
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
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 3600 * 1000;// 禁止选择以前的时间
        },
      },
      isShowGrades: true, // 是否展示选择等级的多选框
      isShowJoinTime: false, // 是否展示入会时间的多选框
      grades: [],
      levels: [],
      checkAll: false,
      isIndeterminate: true,
      optionsType: [
        {
          value: '0',
          label: '按会员等级',
        },
        {
          value: '1',
          label: '按入会时间',
        },
        {
          value: '-1',
          label: '不限制',
        },
      ],
      form: {
        activityName: `${new Date().getMonth() + 1}月${ActivityTypeEnum[this.activityInfo.activityType]}`, // 活动名称
        grade: '', // 限制会员等级(全部会员为0，其他按数字表示级别，多个用逗号隔开)
        activityTime: [], // 活动时间
        startTime: '',
        endTime: '',
      },
      rules: {
        baseCondition: [
          {
            required: true,
            message: '请设置参与条件',
            trigger: 'change',
          },
          {
            validator: (rule, value, cb) => {
              if (value === '0' && this.grades.toString() === '') {
                cb(new Error('请设置活动等级'));
              } else {
                cb();
              }
            },
            trigger: 'change',
          },
        ],
        activityName: [
          {
            required: true,
            message: '请设置活动名称',
            trigger: 'change',
          },
          {
            validator: (rule, value, cb) => {
              const regEx = '[ ,\\`,\\~,\\!,\\-,\\@,\\#,\\$,\\%,\\^,\\+,\\*,\\&,\\\\,\\/,\\?,\\|,\\:,\\.,\\<,\\>,\\{,\\},\\\',\\;,\\=,"]';
              const reg = new RegExp(regEx);
              if (!value.trim()) {
                cb(new Error('请设置活动名称'));
              } else if (reg.test(value)) {
                cb(new Error('活动名称不可以出现特殊字符'));
              } else {
                cb();
              }
            },
            trigger: 'change',
          },
        ],
        grade: [
          {
            required: true,
            message: '请设置活动等级',
            trigger: 'change',
          },
        ],
        activityTime: [
          {
            required: true,
            message: '请设置活动时间',
            trigger: 'change',
          },
          {
            validator: (rule, value, cb) => {
              const now = new Date();
              if (value[1] - value[0] > 60 * 24 * 60 * 60 * 1000) {
                cb(new Error('活动不得超过60天'));
              }
              if (value[0] < now) {
                console.log('活动开始时间早于当前时间');
                cb();
              } else {
                cb();
              }
            },
            trigger: 'change',
          },
        ],
      },
    };
  },
  computed: {

    isFinished() {
      if (this.activityInfo.activityType === 501 || this.activityInfo.activityType === 502) {
        return this.activityInfo.awardEndTime && new Date() > new Date(this.activityInfo.awardEndTime);
      } else if (this.activityInfo.activityType === 506 || this.activityInfo.activityType === 507) {
        return this.activityInfo.awardStartTime && new Date() > new Date(this.activityInfo.awardStartTime);
      }
    },
    awardStarted() {
      // 是否可以修改
      if (this.activityInfo.activityType == 506 || this.activityInfo.activityType == 507) {
        return new Date(this.activityInfo.awardStartTime) < new Date();
      }
      return new Date(this.activityInfo.orderStartTime) < new Date();
    },
    activityNameStr() {
      if (this.activityInfo.activityType === 501) {
        return 1;
      } else if (this.activityInfo.activityType === 502) {
        return 2;
      } else if (this.activityInfo.activityType === 503) {
        return 3;
      } else if (this.activityInfo.activityType === 504) {
        return 4;
      } else if (this.activityInfo.activityType === 505) {
        return 5;
      } else if (this.activityInfo.activityType === 506) {
        return 6;
      } else if (this.activityInfo.activityType === 507) {
        return 7;
      } else if (this.activityInfo.activityType === 508) {
        return 8;
      }
      return 100;
    },
  },
  async created() {
    await this.getShopLevels();
    this.initActivityTime();
    if (this.activityInfo.activityType === 508) {
      this.form = {
        ...this.form,
        baseCondition: '0', // 参与条件 -1 不限制 0 按会员等级 1 按入会时间
        joinTime: 0, // (0：活动期间入会，1：活动以前入会)
      };
    }
    this.form = {
      ...this.form,
      ...this.formData,
    };
    if (this.formData.baseCondition === 0 || this.formData.baseCondition) {
      this.form.baseCondition = this.form.baseCondition.toString();
      this.changeBaseCondition(this.form.baseCondition);
    }
    if (this.formData.grade) {
      this.grades = this.form.grade.split(',')
        .map(g => parseInt(g));
      this.syncIndeterminate();
    } else {
      this.grades = this.levels.map(l => l.level);
      this.form.grade = this.grades.join(',');
      this.syncIndeterminate();
    }
    if (this.form.endTime) {
      this.form.activityTime = [this.form.startTime, this.form.endTime];
    }
  },
  methods: {

    // 初始化活动时间
    initActivityTime() {
      const beginDate = new Date().getTime();
      const endDate = beginDate + 24 * 60 * 60 * 1000 * 30;
      this.form.activityTime[0] = Moment(beginDate)
        .format('YYYY-MM-DD HH:mm:ss');
      this.form.activityTime[1] = Moment(endDate)
        .format('YYYY-MM-DD HH:mm:ss');
      this.form.startTime = this.form.activityTime[0];
      this.form.endTime = this.form.activityTime[1];
    },
    // 修改参与条件
    changeBaseCondition(val) {
      if (val === '0') {
        this.isShowGrades = true;
        this.isShowJoinTime = false;
      }
      if (val === '1') {
        this.isShowGrades = false;
        this.isShowJoinTime = true;
      }
      if (val === '-1') {
        this.isShowGrades = false;
        this.isShowJoinTime = false;
      }
    },
    async getShopLevels() {
      const { data } = await Service.getShopLevels();
      this.levels = JSON.parse(data.levelJson)
        .filter(l => l.level > 0);
      this.syncIndeterminate();
    },
    handleCheckAllChange(all) {
      this.isIndeterminate = false;
      this.grades = all ? this.levels.map(l => l.level) : [];
      this.form.grade = this.grades.join(',');
      this.$refs.elForm.validateField('grade');
    },
    changeGrades() {
      this.form.grade = this.grades.join(',');
      this.syncIndeterminate();
      this.$refs.elForm.validateField('grade');
    },
    syncIndeterminate() {
      this.isIndeterminate = this.grades.length > 0 && this.grades.length < this.levels.length;
      this.checkAll = this.grades.length === this.levels.length;
    },
    activityTimeChange(range) {
      // eslint-disable-next-line no-console
      console.log('rangeChange -> range', range);
      if (range[0]) {
        this.form.startTime = Moment(range[0])
          .format('YYYY-MM-DD HH:mm:ss');
      }
      if (range[1]) {
        this.form.endTime = Moment(range[1])
          .format('YYYY-MM-DD HH:mm:ss');
      }
    },
  },
};
</script>

<style lang="scss">
.component-base-info-settings {


  .same-line {
    display: flex;
    justify-content: flex-start;
  }

  .lz-checkbox {
    margin-right: 24px;
  }

  .lz-input {
    width: 600px;
  }
  .lz-date-editor--datetimerange.lz-input, .lz-date-editor--datetimerange.lz-input__inner{
    width: 600px;
  }
}
</style>
