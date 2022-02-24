<template>
  <div>
    <!-- 填写地址弹窗 -->
    <div class="box">
      <img src="../assets/img/dialog/winner-dialog.png"
           class="popup">
      <div class="dialog-commit-fillin">
        <input maxlength="10" v-model="commitInfo.userName" placeholder="请输入收货人姓名"/>
        <input maxlength="11" type="tel" v-model="commitInfo.phone" placeholder="请输入收货人手机号"/>
        <input :value="address" @click="addressSelect=true" readonly placeholder="省市区县、乡镇等"/>
        <input maxlength="30" v-model="commitInfo.address" placeholder="街道、楼牌号等"/>
      </div>

      <!-- 提交按钮 -->
      <div class="commit-btn"
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
const emit = defineEmits(['closeDialog', 'commitInfo']);

const addressSelect = ref(false);
const address = ref('');

const commitInfo = ref({
  userName: '',
  phone: '',
  province: '',
  city: '',
  district: '',
  address: '',
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
    Toast('请选择省市区县、乡镇等');
  } else if (!commitInfo.value.address) {
    Toast('请输入街道、楼牌号等详细地址');
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

  .commit-btn {
    position: absolute;
    bottom: .4rem;
    left: 1.3rem;
    width: 3.5rem;
    height: 1rem;
    overflow: auto;
    word-break: break-all;
  }

  .close-btn {
    position: absolute;
    top: .2rem;
    right: 0.3rem;
    width: 1rem;
    height: 1rem;
    overflow: auto;
    word-break: break-all;
  }

  .dialog-commit-fillin {
    width: 40%;
    position: absolute;
    top: 4.05rem;
    right: 1.2rem;

    input {
      width: 100%;
      height: 0.53rem;
      font-size: 0.25rem;
      float: right;
      padding: 0.03rem 0;
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
