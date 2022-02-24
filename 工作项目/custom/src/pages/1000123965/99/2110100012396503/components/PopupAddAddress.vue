<!--
 * @Author: 一尾流莺
 * @Description:添加地址弹窗
 * @Date: 2021-09-17 10:36:06
 * @LastEditTime: 2021-10-18 15:05:34
 * @FilePath: \custom\src\pages\1000123965\99\2110100012396501\components\PopupAddAddress.vue
-->
<template>
  <div class="add-address-popup">
    <img src="../assets/popup-add-address.png"
         class="popup-content" />
    <div class="add-address-content">
      <van-field v-model="form.receiver"
                 label-width='60px'
                 placeholder="请输入收件人"
                 label="收件人" />
      <van-field v-model="form.phone"
                 label-width='60px'
                 placeholder="请输入手机号"
                 label="手机号" />
      <van-field v-model="form.area"
                 label-width='60px'
                 placeholder="请选择地区"
                 @focus="noBomBox"
                 readOnly
                 rows="1"
                 autosize
                 @click='showArea=true'
                 label="省/市/区" />
      <van-field v-model="form.address"
                 label-width='60px'
                 placeholder="请输入详细地址"
                 rows="1"
                 autosize
                 label="详细地址"
                 type="textarea" />
    </div>
    <div class="submit"
         @click='onSave'></div>
    <div class="close-icon"
         @click="closePopup"></div>
  </div>
  <van-popup v-model:show="showArea"
             get-container="body"
             position="bottom">
    <van-area :area-list="areaList"
              @confirm="onConfirm"
              @cancel="onCancel"
              title="标题" />
  </van-popup>
</template>

<script lang='ts' setup>
import {
  defineProps, defineEmits, ref, onMounted,
} from 'vue';
import {
  Field as VanField, Area as VanArea, Popup as VanPopup, Toast,
} from 'vant';
import { areaList } from '@vant/area-data';
import useAddAddress from '../apis/useAddAddress';
import useBaseInfo from '../hooks/useBaseInfo';
// 获取基本信息
const { baseInfo } = useBaseInfo();
// 添加地址api
const { addAddress, addResult } = useAddAddress(baseInfo);
const emit = defineEmits(['closePopup']);

// 验证手机号
const complexTelReg = (value:any) => {
  const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
  return reg.test(value);
};

const props = defineProps({
  giftId: {
    type: String,
    default: () => (''),
  },
  initAddress: {
    type: Object,
    default: () => ({}),
  },
});
// 展示选择省市区的弹窗
const showArea = ref(false);
const noBomBox = (Event:any) => {
  document.activeElement.blur();
};
// 表单
const form = ref({
  receiver: '',
  phone: '',
  area: '',
  address: '',
  province: '',
  city: '',
  district: '',
});

// 取消选择省市区
const onCancel = () => {
  showArea.value = false;
};
// 确认选择省市区
const onConfirm = (content:any) => {
  showArea.value = false;
  form.value.area = `${content[0].name}/${content[1].name}/${content[2].name}`;
  form.value.province = content[0].name;
  form.value.city = content[1].name;
  form.value.district = content[2].name;
};

// 关闭弹窗
const closePopup = () => {
  emit('closePopup');
  form.value = {
    receiver: '',
    phone: '',
    area: '',
    address: '',
    province: '',
    city: '',
    district: '',
  };
};
// 提交数据
const onSave = async () => {
  if (!form.value.receiver.trim()) {
    Toast.fail('请输入收件人');
    return false;
  }
  if (!form.value.phone.trim()) {
    Toast.fail('请输入手机号');
    return false;
  }
  if (!form.value.area.trim()) {
    Toast.fail('省/市/区不可以为空');
    return false;
  }
  if (!form.value.address.trim()) {
    Toast.fail('请输入详细地址');
    return false;
  }
  if (!complexTelReg(form.value.phone.trim())) {
    Toast.fail('请输入正确的手机号码');
    return false;
  }

  await addAddress(props.giftId, form.value);
  if (addResult.value) {
    Toast('保存成功');
    closePopup();
  }
  return true;
};
onMounted(() => {
  console.log('🚀🚀~ 123:', props);
  if (props.initAddress && props.initAddress[0]) {
    form.value.receiver = props.initAddress[0].receiver || '';
    form.value.phone = props.initAddress[0].phone || '';
    form.value.area = props.initAddress[0].province ? `${props.initAddress[0].province}/${props.initAddress[0].city}/${props.initAddress[0].district}` || '' : '';
    form.value.address = props.initAddress[0].address || '';
    form.value.province = props.initAddress[0].province || '';
    form.value.city = props.initAddress[0].city || '';
    form.value.district = props.initAddress[0].district || '';
  }
});
</script>

<style lang='scss'>
.add-address-popup {
  position: relative;
  .popup-content {
    width: 6.8rem;
  }
  .close-icon {
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: 0rem;
    right: 0rem;
  }
  .submit{
    width:5rem;
    height: 1rem;
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
  }
  .add-address-content {
    width: 4.5rem;
    height: 3.2rem;
    position: absolute;
    left: 50%;
    top: 1.8rem;
    transform: translate(-50%);
    overflow: auto;
    color: #000000;
    font-size: 0.28rem;

  }
}
</style>
