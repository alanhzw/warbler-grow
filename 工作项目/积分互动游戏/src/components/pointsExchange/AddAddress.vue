<!--
 * @Description:添加地址弹窗
 * @Autor: hanzhiwei
 * @Date: 2020-12-31 10:10:47
 * @LastEditTime: 2021-01-07 19:16:45
 * @FilePath: \SNActivity\src\components\pointsExchange\AddAddress.vue
-->
<template>
  <div class="add-address-box">
    <!-- 添加地址弹窗 -->
    <van-dialog v-model="isShowAddressModal" title="新建收货地址" :showConfirmButton='false' :closeOnClickOverlay="true" :before-close='closeAddressModal'>
      <div class="dialog_div">
        <van-form label-align="left" input-align="right">
          <van-field v-model="addressForm.realName" name="收货人" label="收货人" placeholder="请输入收货人姓名" maxlength='20' />
          <van-field v-model="addressForm.mobile" type="tel" name="手机号码" label="手机号码" placeholder="请输入手机号码" @input="numberInput" maxlength='11' />
          <van-field readonly clickable name="area" :value="value" label="选择省/市/区" placeholder="请选择" @click="openPopup" />
          <van-field v-model="addressForm.detailInfo" name="详细地址" label="详细地址" placeholder="请输入详细地址" maxlength='100' />
        </van-form>
      </div>
      <footer class="footer" @click="toSubmit" elemName="提交地址" :primaryKey="0" elemId="005">
        <span>提交</span>
      </footer>
    </van-dialog>
    <!-- 选择省市区 -->
    <van-popup v-model="showArea" position="bottom">
      <van-area :area-list="areaList" @confirm="onConfirm" @cancel="showArea = false" />
    </van-popup>

  </div>
</template>

<script>
// 引入通用js
import { isEmojiCharacter } from '@/assets/js/common';
// 引入省市区大全
import areaList from '@/assets/js/Area.js';
// 引入封装api
import { commonService } from '@/axios/apis';
export default {
  name: '',
  props: {
    addressForm: {
      default: () => ({}),
    },
    unionld: {
      default: () => ({}),
    },
  },
  data () {
    return {
      isShowAddressModal: false, // 是否展示添加地址弹窗
      showArea: false, // 展示添加省市区弹窗
      value: '', // 存放省市区信息
      areaList,
    };
  },
  methods: {
    /**
    * @description:关闭添加地址弹窗
    */
    closeAddressModal () {
      this.isShowAddressModal = false;
    },
    /**
    * @description:打开添加地址弹窗
    */
    openAddressModal () {
      this.isShowAddressModal = true;
    },
    /**
     * @description: 只可以输入正整数
     */
    numberInput (val) {
      this.addressForm.mobile = val.replace(/\D/g, '');
    },
    /**
     * @description:打开选择省市区弹窗
     */
    openPopup () {
      this.showArea = true;
    },
    /**
     * @description:提交表单
     */
    toSubmit () {
      // 校验form
      if (this.addressForm.realName === '') {
        this.$toast('请输入收货人姓名');
        return;
      }
      if (isEmojiCharacter(this.addressForm.realName)) {
        this.$toast('收货人姓名不能输入特殊字符，请重新输入');
        return;
      }
      if (this.addressForm.mobile === '') {
        this.$toast('请输入手机号码');
        return;
      }
      if (this.addressForm.mobile.length !== 11) {
        this.$toast('请输入正确的手机号码');
        return;
      }
      if (this.addressForm.address.length === 0) {
        this.$toast('请选择地址');
        return;
      }
      if (this.addressForm.detailInfo === '') {
        this.$toast('请输入详细地址');
        return;
      }
      if (isEmojiCharacter(this.addressForm.detailInfo)) {
        this.$toast('详细地址不能输入特殊字符，请重新输入');
        return;
      }
      this.addressFormSubmit();
    },
    /**
     * @description:确认省市区信息 关闭弹窗
     */
    onConfirm (val) {
      if ((val[0] !== '海外' && val[2] === undefined) || (val[0] === '海外' && val[1] === undefined)) {
        this.$toast('请选择省市区');
        return;
      } else {
        if (val) {
          this.value = val.map(item => item.name).join('/');
          this.addressForm.province = val[0].name;
          this.addressForm.city = val[1].name;
          this.addressForm.county = val[2].name;
          this.addressForm.address = this.value;
          this.addressForm.countyCode = val[val.length - 1].code;
          this.showArea = false;
        }
      }
    },
    /**
      * @description: 新增地址
      */
    async addressFormSubmit () {
      await commonService['addAddress']({
        ...this.addressForm,
        isDefault: 1,
        pin: this.unionld,
      }).then(({ data }) => {
        if (data.success) {
          this.$emit('getActivityInfo');
          this.closeAddressModal();
        } else {
          this.$toast(data.resp_msg);
        }
      });
    }
  }
};
</script>

<style lang="scss">
.add-address-box {
  .van-dialog {
    width: 90%;
    border-radius: 0.2rem;
  }
  .dialog_div {
    height: 4.5rem;
    line-height: 2.6rem;
  }
  .van-button--default {
    color: #333333;
    font-size: 0.3rem;
  }
  .van-field__label {
    text-align: left;
  }
  .footer {
    background: #0083ff;
    color: #ffffff;
    font-size: 0.3rem;
    height: 1rem;
    line-height: 1rem;
    display: flex;
    justify-content: center;
  }
}
</style>