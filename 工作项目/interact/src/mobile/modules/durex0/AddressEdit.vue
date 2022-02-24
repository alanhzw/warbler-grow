<!--
 * @Description:
 * @Date: 2021-03-18 11:33:43
 * @LastEditTime: 2021-12-02 14:13:19
 * @FilePath: \interact\src\mobile\modules\durex0\AddressEdit.vue
-->
<template>
  <div class="address-edit-container-durex">
    <van-field @input='checkInput("name")'
               v-model="info.name"
               label="姓名"
               placeholder="收货人姓名"
               required
               :error-message="nameMessage"
               maxlength='10' />
    <van-field @input='checkInput("tel")'
               v-model="info.tel"
               type="digit"
               label="电话"
               placeholder="收货人手机号"
               required
               :error-message="telMessage"
               maxlength='11' />
    <van-field label="地区"
               v-model="area"
               readonly
               placeholder="选择省 / 市 / 区"
               right-icon="arrow"
               @click='isShowArea=true'
               required
               :error-message="areaMessage" />
    <van-field @input='checkInput("addressDetail")'
               v-model="info.addressDetail"
               rows="1"
               autosize
               label="详细地址"
               type="textarea"
               placeholder="街道门牌、楼层房间号等信息"
               required
               :error-message="addressDetailMessage"
               maxlength='50' />
    <span class="tips">请注意：地址填写简陋、手机号错误皆会影响派单，导致您无法收到商品！</span>
    <van-button type="danger"
                class="save-btn"
                v-lz-click.isMain="'23'"
                @click="save">{{saveButtonText}}</van-button>
    <van-popup v-model="isShowArea"
               position="bottom"
               :close-on-click-overlay='false'>
      <van-area title="地区"
                :area-list="areaData"
                @cancel='cancelHandler'
                @confirm="confirmHandler" />
    </van-popup>
  </div>
</template>

<script>
import areaData from '@/mobile/data/vantArea';

export default {
  name: 'AddressEdit',
  props: {
    saveButtonText: {
      type: String,
      required: false,
      default: '保存',
    },
    addressInfo: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  computed: {
    area() {
      if (this.info.province) {
        return `${this.info.province} / ${this.info.city} / ${this.info.county}`;
      }
      return '';
    },
    clickEvent() {
      if (this.$route.meta.type == '504') {
        return '16';
      } else if (this.$route.meta.type == '508') {
        return '17';
      }
      return '16';
    },
  },
  data() {
    return {
      areaData,
      isShowArea: false,
      info: {
        name: '',
        tel: '',
        addressDetail: '',
        province: '', // 省
        city: '', // 城市
        county: '', // 区县
      },
      nameMessage: '',
      telMessage: '',
      addressDetailMessage: '',
      areaMessage: '',
    };
  },
  created() {
    this.init();
  },
  methods: {
    cancelHandler() {
      this.isShowArea = false;
    },
    confirmHandler(item) {
      this.info.province = item[0].name;
      this.info.city = item[1].name;
      this.info.county = item[2].name;
      this.areaMessage = '';
      this.isShowArea = false;
    },
    save() {
      console.log('this.this.$route:', this.$route);
      if (this.btnCheck()) {
        this.$emit('save', this.info);
      }
    },
    btnCheck() {
      if (!this.info.name) {
        this.nameMessage = '请填写收货人姓名';
        return false;
      }
      if (this.info.tel.length != 11) {
        this.telMessage = '手机号格式有误';
        return false;
      }
      if (!this.info.province) {
        this.areaMessage = '请选择收货地址';
        return false;
      }
      if (!this.info.addressDetail || this.info.addressDetail.trim() == '') {
        this.addressDetailMessage = '请填写详细地址';
        return false;
      }
      return true;
    },
    checkInput(item) {
      // 判断是否含有特殊符号
      // const iconRule1 = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im;
      // 判断是否含有emoji表情
      const iconRule2 = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;


      if (item === 'name') {
        if (!this.info.name) {
          this.nameMessage = '请填写收货人姓名';
        } else {
          this.nameMessage = '';
        }
        if (iconRule2.test(this.info.name)) {
          this.nameMessage = '请不要输入特殊字符';
        } else {
          this.nameMessage = '';
        }
      } else if (item === 'tel') {
        const reg = /^1[1|2|3|4|5|6|7|8|9][0-9]{9}$/; // 验证规则
        if (!this.info.tel) {
          this.telMessage = '请输入手机号';
        } else if (!reg.test(this.info.tel) && this.info.tel.length == 11) {
          this.telMessage = '手机号格式有误';
        } else {
          this.telMessage = '';
        }
        if (iconRule2.test(this.info.tel)) {
          this.telMessage = '请不要输入特殊字符';
        } else {
          this.telMessage = '';
        }
      } else if (item === 'addressDetail') {
        if (!this.info.addressDetail) {
          console.log('🚀🚀~ this.info.addressDetail:', this.info.addressDetail);
          this.addressDetailMessage = '请填写详细地址';
        } else {
          this.addressDetailMessage = '';
        }
        if (iconRule2.test(this.info.addressDetail)) {
          this.addressDetailMessage = '请不要输入特殊字符';
        } else {
          this.addressDetailMessage = '';
        }
      }
    },
    init() {
      Object.keys(this.addressInfo).forEach((item) => {
        this.info[item] = this.addressInfo[item];
      });
    },
  },
};
</script>

<style lang='scss'>
.address-edit-container-durex {
  .van-field {
    margin: 5px 0px;
    border-radius: 5px;
  }
  .save-btn {
    width: 100%;
    border-radius: 5px;
    font-size: 0.3rem;
    margin-top: 20px;
    background: #550908;
    border-color: #550908;
  }
  .tips {
    color: #b9b9b9;
    font-size: 0.01rem;
  }
}
</style>
