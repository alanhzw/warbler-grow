<template>
  <!-- 填写地址弹窗 -->
  <div class="box">
    <div class="close-btn" @click="closeDialog"></div>

    <div class="info">
      <div class="input-bg">
        <div><span style="color: #f2270c">*</span>收货人:</div>
        <input v-model="formData.receiver" maxlength="10" placeholder="请输入收货人姓名"/>
      </div>
      <div class="input-bg">
        <div><span style="color: #f2270c">*</span>手机号:</div>
        <input v-model="formData.phone" type="tel" maxlength="11" placeholder="请输入收货人手机号"/>
      </div>
      <div class="input-bg">
        <div><span style="color: #f2270c">*</span>所在地区:</div>
        <input v-model="address" @click="addressSelect=true" readonly placeholder="请选择所在地区">
      </div>
      <div class="input-bg">
        <div><span style="color: #f2270c">*</span>详细地址:</div>
        <input v-model="formData.address" maxlength="30" placeholder="请输入详细地址"/>
      </div>
    </div>

    <img src="../assets/dialog/btn-commit.png" @click="submitCheckOut" style="width: 5.71rem;margin-top: .15rem"/>
  </div>

  <!--底部地址选择弹出层-->
  <van-popup v-model:show="addressSelect" position="bottom" teleport="body">
    <Area title="选择地址" :area-list="areaList" @confirm="confirmAddress"
          @cancel="addressSelect= false"/>
  </van-popup>
</template>

<script lang='ts' setup>
import { Popup as vanPopup, Area, Toast } from 'vant';
import { areaList } from '@vant/area-data';
import { computed, defineEmits, defineProps, ref } from 'vue';

const props = defineProps({ addressInfo: Object });
const emit = defineEmits(['closeDialog', 'commitAddInfo']);
const closeDialog = () => {
  emit('closeDialog');
};

const addressSelect = ref(false);
const formData = computed(() => props.addressInfo);

const address = computed(() => (formData?.value.province !== null && formData?.value.province !== undefined ? `${formData?.value.province} ${formData?.value.city} ${formData?.value.county}` : ''));

const confirmAddress = (info: any) => {
  formData.value.province = info[0].name;
  formData.value.city = info[1].name;
  formData.value.county = info[2].name;
  addressSelect.value = false;
};

// 信息校验
const submitCheckOut = () => {
  // 特殊字符
  const spcWord = /[^\u4e00-\u9fa5a-zA-Z\d,.，。（）() - - ! ！? ？]+/;
  // 空格
  const whitespace = /\s+/g;
  // 表情符号
  const faceWord = /[\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/;
  if (!formData.value.receiver) {
    Toast('收货人姓名不能为空');
  } else if (spcWord.test(formData.value.receiver)) {
    Toast('收货人姓名不能包含特殊符号');
  } else if (faceWord.test(formData.value.receiver)) {
    Toast('收货人姓名不能包含表情符号');
  } else if (whitespace.test(formData.value.receiver)) {
    Toast('收货人姓名不能包含空格');
  } else if (!formData.value.phone) {
    Toast('收货人手机号不能为空');
  } else if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(formData.value.phone))) {
    Toast('请输入正确的手机号');
  } else if (!formData.value.province) {
    Toast('请选择地区');
  } else if (!formData.value.address) {
    Toast('详细地址不能为空');
  } else if (faceWord.test(formData.value.address)) {
    Toast('详细地址不能包含表情符号');
  } else if (whitespace.test(formData.value.address)) {
    Toast('详细地址不能包含空格');
  } else {
    emit('commitAddInfo', formData);
  }
};

</script>

<style lang='scss' scoped>
input {
  background-color: transparent;
  border: transparent;
  line-height: .88rem;
}

.box {
  position: fixed;
  width: 7.5rem;
  height: 8.94rem;
  box-sizing: border-box;
  overflow-y: hidden;
  bottom: 0;
  text-align: center;
  background: {
    image: url("../assets/dialog/dialog-address.png");
    repeat: no-repeat;
    size: contain;
  };

  .info {
    margin-top: 3.7rem;

    .input-bg {
      display: flex;
      justify-content: space-between;
      background-color: #FFFFFF;
      align-items: center;
      //line-height: .88rem;
      height: .88rem;
      margin: .05rem .4rem;
      padding: 0 .2rem;
      box-sizing: border-box;
      font-size: .26rem;

      input {
        width: 3.6rem;
        text-align: right;
      }
    }
  }

  .close-btn {
    position: absolute;
    top: 2.6rem;
    right: .2rem;
    width: 1rem;
    height: 1rem;
    overflow: auto;
  }
}
</style>
