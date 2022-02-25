<template>
  <div class="IAddressDialog">
    <!-- 地址弹窗 -->
    <van-dialog v-model="showAddress" :before-close='closeDialog' :closeOnClickOverlay="true" :showConfirmButton='false'
                title="新建收货地址">
      <div class="dialog_div">
        <van-form input-align="right" label-align="left">
          <van-field
            v-model="form.realName"
            label="收货人"
            maxlength='20'
            name="收货人"
            placeholder="请输入收货人姓名"
          />
          <van-field
            v-model="form.mobile"
            label="手机号码"
            maxlength='20'
            name="手机号码"
            placeholder="请输入手机号码"
            type="tel"
            @input="numberInput"
          />
          <van-field
            :value="value"
            clickable
            label="选择省/市/区"
            name="area"
            placeholder="请选择"
            readonly
            @click="openPopup"
          />
          <van-field
            v-model="form.detailInfo"
            label="详细地址"
            maxlength='100'
            name="详细地址"
            placeholder="请输入详细地址"
          />
        </van-form>
      </div>
      <footer :primaryKey="0" class="footer" elemId="005" elemName="提交地址" @click="toSubmit">
        <span>提交</span>
      </footer>

    </van-dialog>
    <van-popup v-model="showArea" position="bottom">
      <van-area
        :area-list="areaList"
        @cancel="showArea = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>
<script>

export default {
  name: 'IDialog',
  props: {
    areaList: {
      required: true,
    },
    formData: {
      required: true,
    },
    showAddress: {
      default: false,
      required: true,
    },
  },
  // props: ['showAddress', 'areaList', 'formData'],
  data() {
    return {
      value: '',
      form: {
        realName: '',
        mobile: '',
        address: [],
        detailInfo: '',
      },
      showArea: false,
      address: '',
      searchResult: [],
      // columns: [
      //   { values: Object.values(areaList.province_list) },
      //   { values: [] },
      //   { values: [] },
      // ],
    };
  },
  watch: {
    showAddress() {
      this.value = '';
      this.form = {
        realName: '',
        mobile: '',
        address: [],
        detailInfo: '',
      };
    },
  },
  mounted() {
    this.form = this.formData;
    if (this.form.county) {
      this.value = this.form.province + this.form.city + this.form.county;
      this.form.countyCode = `${this.form.countyCode}`;
    }
  },
  methods: {
    openPopup() {
      this.showArea = true;
    },
    toTicket() {
      this.$router.push({
        name: 'PointsRecords',
      });
    },
    toCenter() {
      this.$router.push({
        name: 'PersonalCenter',
        params: {
          shopId: sessionStorage.getItem('LZ_CRM_CUSTOMER_ShopId') || null,
        },
      });
    },
    numberInput(val) {
      this.form.mobile = val.replace(/\D/g, '');
    },
    // 提交地址表单
    toSubmit() {
      // 校验form
      if (this.form.realName === '') {
        this.$toast('请输入收货人姓名');
        return;
      }
      if (this.$core.isEmojiCharacter(this.form.realName)) {
        this.$toast('收货人姓名不能输入特殊字符，请重新输入');
        return;
      }
      if (this.form.mobile === '') {
        this.$toast('请输入手机号码');
        return;
      }
      if (this.form.mobile.length !== 11) {
        this.$toast('请输入正确的手机号码');
        return;
      }
      if (this.form.address.length === 0) {
        this.$toast('请选择地址');
        return;
      }
      if (this.form.detailInfo === '') {
        this.$toast('请输入详细地址');
        return;
      }
      if (this.$core.isEmojiCharacter(this.form.detailInfo)) {
        this.$toast('详细地址不能输入特殊字符，请重新输入');
        return;
      }
      this.$emit('formSubmit', this.form);
    },
    closeDialog() {
      this.$emit('closeDialog');
    },

    onConfirm(val) {
      val = val.filter((e) => e != undefined);
      this.value = val.map((item) => item.name).join('/');
      console.log(this.value);
      this.form.province = val[0]?.name;
      this.form.city = val[1]?.name;
      this.form.county = val[2] && val[2].code ? val[2].name : '';
      this.form.address = this.value;
      this.form.countyCode = val[2] && val[2].code ? val[2].code : val[1].code;
      this.showArea = false;
      // if ((val[0] !== '海外' && val[2] === undefined) || (val[0] === '海外' && val[1] === undefined)) {
      //   this.$toast('请选择省市区');
      // } else {
      //   // this.value = val.map(item => item.name).join('')
      //   this.value = val.map((item) => item.name).join('/');
      //   this.form.province = val[0].name;
      //   this.form.city = val[1].name;
      //   this.form.county = val[2].name;
      //   this.form.address = this.value;
      //   this.form.countyCode = val[val.length - 1].code;
      //   this.showArea = false;
      // }
    },
  },

};
</script>
<style scoped>
.IAddressDialog >>> .van-dialog {
  width: 90%;
  border-radius: 0.2rem;
}

.dialog_div {
  height: 4.5rem;
  line-height: 2.6rem;
}

.IAddressDialog >>> .van-button--default {
  color: #333333;
  font-size: 0.3rem;
}

.IAddressDialog .footer {
  background: #0083ff;
  color: #ffffff;
  font-size: 0.3rem;
  height: 1rem;
  line-height: 1rem;
}

.IAddressDialog >>> .van-field__label {
  text-align: left;
}

.IAddressDialog >>> .van-cell::after {
  position: absolute;
  box-sizing: border-box;
  content: ' ';
  pointer-events: none;
  right: 16px;
  bottom: 0;
  left: 16px;
  border-bottom: 1px solid #ebedf0;
  -webkit-transform: scaleY(.5);
  transform: scaleY(.5);
}
</style>
