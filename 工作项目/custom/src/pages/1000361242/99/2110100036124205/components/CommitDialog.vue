<template>
  <div>
    <!-- 填写申请弹窗 -->
    <div class="box">
      <img src="../assets/img/commit-dialog.png"
           class="popup">
      <div class="dialog-commit-fillin">
        <input maxlength="10" v-model="commitInfo.userName" placeholder="收货人姓名"/>
        <input maxlength="11" type="tel" v-model="commitInfo.phone" placeholder="收货人手机号"/>
        <input :value="address" @click="addressSelect=true" readonly placeholder="选择省/市/区"/>
        <input maxlength="30" v-model="commitInfo.address" placeholder="街道门牌号"/>
        <input maxlength="6" type="tel" v-model="commitInfo.postalCode" placeholder="邮政编码"/>
      </div>

      <!-- 提交按钮 -->
      <div class="close-btn" style="bottom: 1.2rem"
           @click='getCommitCheck()'></div>
      <!-- 关闭按钮 -->
      <div class="close-btn"
           @click="closeDialog()"></div>

    </div>
    <!--底部地址选择弹出层-->
    <van-popup v-model:show="addressSelect" position="bottom" :style="{ height: '40%' }" teleport="body">
      <van-area title="选择地址" :area-list="areaList" @confirm="confirmAddress"
                @cancel="addressSelect= false"/>
    </van-popup>
  </div>
</template>

<script lang='ts' setup>
import { defineEmits, defineProps, ref } from 'vue';
import { areaList } from '@vant/area-data';
import { Popup as vanPopup, Toast, Area as vanArea } from 'vant';

// const props = defineProps('');
const emit = defineEmits(['closeDialog']);

const addressSelect = ref(false);
const address = ref('');

const commitInfo = ref({
  userName: '',
  phone: '',
  province: '',
  city: '',
  district: '',
  address: '',
  postalCode: '',
});

const closeDialog = () => {
  emit('closeDialog', 'commitDialog');
};

const getCommitCheck = () => {
  const phoneReg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
  if (!commitInfo.value.userName) {
    Toast('请输入收货人姓名');
  } else if (!commitInfo.value.phone) {
    Toast('请输入收货人手机号');
  } else if (!phoneReg.test(commitInfo.value.phone)) {
    Toast('请输入正确的手机号');
  } else if (!address.value) {
    Toast('请选择省市区');
  } else if (!commitInfo.value.address) {
    Toast('请输入详细地址');
  } else if (!commitInfo.value.postalCode) {
    Toast('请输入邮政编码');
  } else {
    emit('commitInfo', commitInfo);
  }
};

const confirmAddress = (info: any) => {
  console.log(info);
  addressSelect.value = false;
  address.value = ''; // 点击确认后清空之前地址信息

  for (let i = 0; i < info.length; i += 1) {
    if (i !== 0) {
      address.value = `${address.value} ${info[i].name}`;
    } else {
      address.value += info[i].name;
    }
  }
  commitInfo.value.province = info[0].name;
  commitInfo.value.city = info[1].name;
  commitInfo.value.district = info[2].name;
};

</script>

<style lang='scss' scoped>
.box {
  position: relative;

  .popup {
    width: 6rem;

  }

  img {
    margin: 0 auto;
  }

  .close-btn {
    position: absolute;
    bottom: 0;
    left: 1.3rem;
    width: 3.5rem;
    height: 1rem;
    overflow: auto;
    word-break: break-all;
  }

  .dialog-commit-fillin {
    position: absolute;
    top: .93rem;
    left: 2.3rem;
    width: 45%;

    input {
      width: 100%;
      height: 0.43rem;
      font-size: 0.25rem;
      margin: 0.092rem 0;
      padding: 0.033rem 0;
      background: unset !important;
      border: unset !important;
      text-align: left;
    }
  }
}

.popup {
  background: unset !important;
}
</style>
