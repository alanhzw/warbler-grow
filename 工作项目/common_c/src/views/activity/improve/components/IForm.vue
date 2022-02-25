<!--
 * @Author: 一尾流莺
 * @Description:表单组件
 * @Date: 2022-01-10 13:59:58
 * @LastEditTime: 2022-02-15 09:44:10
 * @FilePath: \common_c\src\views\activity\improve\components\IForm.vue
-->
<template>
  <div class="improve-form">
    <van-form>
      <!-- 姓名 -->
      <div class="form-item"
           v-if="nameOption.name">
        <van-field v-model="username"
                   name="姓名"
                   maxlength="12"
                   :disabled="nameOption.disabled"
                   :label="nameOption.alias || nameOption.label"
                   placeholder="- -" />
        <span class="required"
              v-if="nameOption.required=='0'">*</span>
      </div>
      <!-- 性别 -->
      <div class="form-item"
           v-if="genderOption.name">
        <van-field readonly
                   clickable
                   name="姓别"
                   :disabled="genderOption.disabled"
                   :value="gender"
                   :label="genderOption.alias || genderOption.label"
                   placeholder="- -"
                   @click="isChoose(genderOption.disabled,'gender')" />
        <van-popup v-model="showGender"
                   position="bottom">
          <van-picker title="性别"
                      show-toolbar
                      :columns="columns"
                      @confirm="onConfirmGender"
                      @cancel="showGender = false"
                      @change="onConfirmGender" />
        </van-popup>
        <span class="required"
              v-if="genderOption.required=='0'">*</span>
      </div>
      <!-- 生日 -->
      <div class="form-item"
           v-if="birthdayOption.name">
        <van-field readonly
                   clickable
                   :disabled="birthdayOption.disabled"
                   name="calendar"
                   :value="birthday"
                   :label="birthdayOption.alias || birthdayOption.label"
                   placeholder="- -"
                   @click="isChoose(birthdayOption.disabled,'birthday')" />
        <van-popup v-model="showDate"
                   position="bottom">
          <van-datetime-picker type="date"
                               title="选择年月日"
                               v-model="currentDate"
                               @confirm="onConfirmDate"
                               @cancel="showDate = false"
                               :min-date="minDate"
                               :max-date="maxDate" />
        </van-popup>
        <span class="required"
              v-if="birthdayOption.required=='0'">*</span>
      </div>
      <!-- 省市 -->
      <div class="form-item"
           v-if="addressOption.name">
        <van-field readonly
                   clickable
                   name="area"
                   :disabled="addressOption.disabled"
                   :value="address"
                   :label="addressOption.alias || addressOption.label"
                   placeholder="- -"
                   @click="isChoose(addressOption.disabled,'address')" />
        <van-popup v-model="showArea"
                   position="bottom">
          <van-cascader v-model="cascaderValue"
                        title="请选择所在地区"
                        :options="areaOptions"
                        @close="showArea = false"
                        @finish="onFinish" />
        </van-popup>
        <span class="required"
              v-if="addressOption.required=='0'">*</span>
      </div>
      <!-- 详细地址 -->
      <div class="form-item"
           v-if="addressInfoOption.name">
        <van-field v-model="addressInfo"
                   rows="1"
                   :disabled="addressInfoOption.disabled"
                   autosize
                   :label="addressInfoOption.alias || addressInfoOption.label"
                   type="textarea"
                   placeholder="- -" />
        <span class="required"
              v-if="addressInfoOption.required=='0'">*</span>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Toast } from 'vant';
import areaList from '../../../../assets/js/Area';
// 网络请求
import { PointsService } from '@/http';

export default {
  name: 'IForm',
  props: {
    options: {
      default: () => ({}),
    },
    defaultOption: {
      default: () => ({}),
    },
    allCollects: {
      default: () => ({}),
    },
    apis: {
      default: () => ({}),
    },
  },
  data() {
    return {
      username: '', // 姓名
      gender: '', // 性别
      birthday: '', // 生日
      address: '', // 地区选择
      addressInfo: '', // 详细地址
      showArea: false, // 展示选择地址弹窗
      showDate: false, // 展示选择时间弹窗
      showGender: false, // 展示选择性别弹窗
      areaList, // 地址列表
      minDate: new Date(1900, 0, 1), // 最大时间
      maxDate: new Date(2025, 10, 1), // 最小时间
      currentDate: new Date(), // 默认时间
      columns: ['男', '女'], // 性别选择区间
      formAddress: '',
      formBirthday: '',
      formGender: '',
      cascaderValue: '',
      areaOptions: [
        {
          text: '浙江省',
          value: '330000',
          children: [{ text: '杭州市', value: '330100' }],
        },
        {
          text: '江苏省',
          value: '320000',
          children: [{ text: '南京市', value: '320100' }],
        },
      ],
    };
  },
  computed: {
    nameOption() {
      return this.allCollects.find((item) => item.name === 'name') || {};
    },
    genderOption() {
      return this.allCollects.find((item) => item.name === 'gender') || {};
    },
    birthdayOption() {
      return this.allCollects.find((item) => item.name === 'birthday') || {};
    },
    addressOption() {
      return this.allCollects.find((item) => item.name === 'address') || {};
    },
    addressInfoOption() {
      return this.allCollects.find((item) => item.name === 'addressDetail') || {};
    },
  },
  methods: {
    // 选择器是否可选
    isChoose(isDisabled, type) {
      if (type === 'gender') {
        if (!isDisabled) {
          this.showGender = true;
        }
      }
      if (type === 'birthday') {
        if (!isDisabled) {
          this.showDate = true;
        }
      }
      if (type === 'address') {
        if (!isDisabled) {
          this.showArea = true;
        }
      }
    },
    // 判断是不是预览页
    isPreview() {
      return window.location.href.includes('preview');
    },
    // 获取地址列表
    async getAreaList() {
      const res = await PointsService.getAreaInfoList({});
      this.areaOptions = res.data;
    },
    // 选择生日
    onConfirmDate(date) {
      this.birthday = this.$moment(date).format('YYYY年MM月DD日');
      this.formBirthday = this.$moment(date).format('YYYY-MM-DD HH:mm:ss');
      this.showDate = false;
    },
    // 选择地址
    onFinish({ selectedOptions }) {
      this.showArea = false;
      this.address = selectedOptions.map((option) => option.text).join('/');
      console.log('🚀🚀~ selectedOptions:', selectedOptions);
      this.formAddress = [selectedOptions[0].value, selectedOptions[1].value].toString();
    },
    // 选择性别
    onConfirmGender(value, index) {
      if (value === '男' || value === '女') {
        this.gender = value;
      }
      if (value === '男') {
        this.formGender = 'M';
      } else {
        this.formGender = 'F';
      }
      this.showGender = false;
    },
    // 表单验证
    Validate() {
      console.log(this.addressInfoOption.required);
      if (this.nameOption.required == '0' && !this.username) {
        this.$emit('show-error', '请输入姓名');
        return false;
      }
      if (this.genderOption.required == '0' && !this.gender) {
        this.$emit('show-error', '请选择性别');
        return false;
      }
      if (this.birthdayOption.required == '0' && !this.birthday) {
        this.$emit('show-error', '请选择出生日期');
        return false;
      }
      if (this.addressOption.required == '0' && !this.address) {
        this.$emit('show-error', '请选择地址');
        return false;
      }
      if (this.addressInfoOption.required == '0' && !this.addressInfo) {
        this.$emit('show-error', '请输入详细地址');
        return false;
      }
      const iconRule2 = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
      if (iconRule2.test(this.username) || iconRule2.test(this.addressInfo)) {
        this.$emit('show-error', '请不要输入表情符号');
        return false;
      }
      return true;
    },
  },
  created() {

  },
  // 由于defaultOption,allCollects是接口获取的 所以生命周期中无法使用  只能使用 watch 进行监听
  watch: {
    defaultOption(newValue, oldValue) {
      document.body.style.setProperty('--form-background-color', newValue.formBackgroundColor);
      document.body.style.setProperty('--form-font-color', newValue.formFrontColor);
    },
    allCollects() {
      this.username = this.nameOption.value;

      if (this.genderOption.value) {
        this.gender = this.genderOption.value === 'M' ? '男' : '女';
      } else {
        this.gender = this.genderOption.value;
      }

      this.birthday = this.birthdayOption.value ? this.$moment(this.birthdayOption.value).format('YYYY年MM月DD日') : '';
      this.addressInfo = this.addressInfoOption.value;
      this.formAddress = this.addressOption.value;
      this.formGender = this.genderOption.value;
      this.formBirthday = this.birthdayOption.value ? this.$moment(this.birthdayOption.value).format('YYYY-MM-DD HH:mm:ss') : '';
      // 如果是预览页使用默认地址列表
      if (!this.isPreview()) {
        this.getAreaList().then(() => {
          try {
            const addressFirst = this.addressOption.value && this.addressOption.value.split(',')[0];
            const addressLast = this.addressOption.value && this.addressOption.value.split(',')[1];
            const first = this.areaOptions.find((item) => item.value === addressFirst) || {};
            const last = first.children.find((item) => item.value === addressLast) || {};
            this.address = `${first.text}/${last.text}`;
          } catch (error) {

          }
        });
      }
    },

  },
};
</script>

<style lang="scss">
body {
  --form-background-color: #ffffff;
  --form-font-color: #333333;
}
.improve-form {
  .van-cell {
    background-color: var(--form-background-color);
  }
  .van-field__label,
  .van-field__control {
    color: var(--form-font-color);
    font-size: 0.28rem;
  }

  .van-field__label,
  .van-field__value {
    border-bottom: 1px solid #ebedf0 !important;
    padding-bottom: 5px;
  }

  .van-field__label {
    padding-right: 12px;
    margin-right: 0;
  }
  .van-cell::after {
    display: none;
  }
  input::-webkit-input-placeholder {
    color: var(--form-font-color);
    font-size: 0.28rem;
    opacity: 0.7;
  }
  input::-moz-input-placeholder {
    color: var(--form-font-color);
    font-size: 0.28rem;
    opacity: 0.7;
  }
  input::-ms-input-placeholder {
    color: var(--form-font-color);
    font-size: 0.28rem;
    opacity: 0.7;
  }
  textarea::-webkit-input-placeholder {
    color: var(--form-font-color);
    font-size: 0.28rem;
    opacity: 0.7;
  }
  textarea::-moz-input-placeholder {
    color: var(--form-font-color);
    font-size: 0.28rem;
    opacity: 0.7;
  }
  textarea::-ms-input-placeholder {
    color: var(--form-font-color);
    font-size: 0.28rem;
    opacity: 0.7;
  }
  .form-item {
    position: relative;
    .required {
      position: absolute;
      top: 13px;
      left: 6px;
      color: #ff3333;
    }
  }
}
</style>
