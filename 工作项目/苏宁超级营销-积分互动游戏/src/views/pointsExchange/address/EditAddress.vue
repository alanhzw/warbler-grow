<!--
 * @Description:修改地址页面
 * @Autor: hanzhiwei
 * @Date: 2020-12-31 14:46:22
 * @LastEditTime: 2021-01-07 19:15:01
 * @FilePath: \SNActivity\src\views\pointsExchange\address\EditAddress.vue
-->
<template>
  <div class="edit-address-box">
    <van-form label-align="left" input-align="right">
      <van-field v-model="detailForm.realName" name="收货人" label="收货人" placeholder="请输入收货人姓名" maxlength='20' />
      <van-field v-model="detailForm.mobile" name="手机号码" type="tel" label="手机号码" maxlength='11' placeholder="请输入手机号码" @input="numberInput" />
      <van-field readonly clickable name="area" :value="value" label="选择省/市/区" placeholder="请选择" @click="showArea = true" />
      <van-field v-model="detailForm.detailInfo" name="详细地址" label="详细地址" placeholder="请输入详细地址" maxlength='100' />
      <van-switch-cell :disabled="isDisabled" v-model="detailForm.isDefault" size='0.32rem' title="设为默认地址" />
    </van-form>

    <div class="button">
      <van-button type="info" block @click="submitForm()">保存</van-button>
    </div>

    <van-popup v-model="showArea" position="bottom">
      <van-area :value="detailForm.countyCode" :area-list="areaList" @confirm="onConfirm" @cancel="showArea = false" />
    </van-popup>

  </div>
</template>

<script>
// 引入封装api
import { commonService } from '@/axios/apis';
// 引入省市区大全
import areaList from '@/assets/js/Area.js';
export default {
  name: '',
  data () {
    return {
      // 地址表单
      detailForm: {
        realName: '', // 姓名
        mobile: '', // 手机号
        detailInfo: '', // 详细地址
        isDefault: '', // 是否默认
        province: '', // 省
        city: '', // 市
        county: '', // 村
        address: '', // 省市区
      },
      isDisabled: false, // switch开关是否可以点击
      showArea: false, // 展示添加省市区弹窗
      value: '', // 存放省市区信息
      areaList, // 地址大全
    };
  },
  mounted () {
    // 如果存在addressId参数  证明是修改地址页面  则发起获取地址详情的请求
    if (this.$route.query.addressId) {
      this.getAddressDetail();
    }
  },
  methods: {
    /**
    * @description: 只可以输入正整数
    */
    numberInput (val) {
      this.detailForm.mobile = val.replace(/\D/g, '');
    },
    /**
        * @description: 获取地址详情
        */
    async getAddressDetail () {
      // 发起获取地址详情的请求
      await commonService['getAddressDetail']({
        shopId: this.$route.query.shopId,
        pin: this.$route.query.pin,
        addressId: this.$route.query.addressId
      }).then(({ data }) => {
        // 如果请求成功
        if (data.success) {
          // 数据回显到表单
          this.detailForm = data.data;
          // 把城市编码转成字符串 不然回显不了 不知道什么原因但是要这么做
          this.detailForm.countyCode = this.detailForm.countyCode.toString();
          // 把省市区保存为一个变量
          this.value = this.detailForm.province + this.detailForm.city + this.detailForm.county;
          // 数据库返回的isDefault的字段为0和1  而组件需要true和false  直接把0和1放进去会报错 所以这里需要转换
          if (data.data.isDefault) {
            // 如果是默认地址 switch开关禁用 不可修改 isDefault设置为true
            this.isDisabled = true;
            this.detailForm.isDefault = true;
          } else {
            // 如果不是默认地址 switch开关可用 可修改为默认地址 isDefault设置为false
            this.isDisabled = false;
            this.detailForm.isDefault = false;
          }
        } else {
          this.$toast(data.resp_msg);
        }
      });
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
          this.detailForm.province = val[0].name;
          this.detailForm.city = val[1].name;
          this.detailForm.county = val[2].name;
          this.detailForm.address = this.value;
          this.detailForm.countyCode = val[val.length - 1].code;
          this.showArea = false;
        }
      }
    },
    /**
     * @description: 提交表单 保存信息
     */
    async submitForm () {
      let request = '';
      // 根据是否含有addressId参数判断当前是新建地址页面还是修改地址页面
      if (this.$route.query.addressId) {
        request = 'updateAddress';
        this.detailForm.addressId = this.$route.query.addressId;
      } else {
        request = 'addAddress';
      }
      // 把isDefault的值再改回0和1传到后端
      if (this.detailForm.isDefault) {
        this.detailForm.isDefault = 1;
      } else {
        this.detailForm.isDefault = 0;
      }
      // 发起请求
      await commonService[request]({
        ...this.detailForm,
        pin: this.$route.query.pin,
        shopId: this.$route.query.shopId,
      }).then(({ data }) => {
        if (data.success) {
          this.$toast('保存成功');
          setTimeout(() => {
            // 返回上一级页面
            this.$router.back();
          }, 1000);
        } else {
          this.$toast(data.resp_msg);
        }
      });
    }
  }
};
</script>

<style lang="scss">
.edit-address-box {
  .button {
    width: 100%;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;

    .van-button {
      width: 100%;
      height: 1rem;
    }

    .van-radio__icon--checked .van-icon {
      background-color: #ffffff;
    }

    .van-radio__icon--checked .van-icon-success::before {
      color: #1989fa;
    }

    .van-switch {
      background-color: #c6c6c6;
    }

    .van-switch--on {
      background-color: #1989fa;
    }
  }
}
</style>