<template>
  <div v-cloak>
    <div v-if="dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss') > '2021-10-08 12:00:00'">
      <img id="kv" src="./assets/kJ-KV922New.png"/>
    </div>
    <div v-else>
      <img id="kv1" src="./assets/kJ-KV.png"/>
    </div>
    <!--    <div @click="openDialog" style="width: 1rem;height: 1rem;position: absolute;"></div>-->
    <div v-for="item in cardStatus" :key="item.giftId">
      <div class="title-font">{{item.orderTime}}</div>
      <!--    非会员-->
      <div v-if="isOpenCarded===false" class="dynamic-btn gray" @click="openDialog('noMember')"></div>
      <!--    无资格-->
      <div v-else-if="item.status===0">
        <div @click="openDialog('noQualified')" class="dynamic-btn gray"></div>
      </div>
      <!--    已领取-->
      <div v-else-if="item.status===2">
        <div class="collected-btn gray" @click="seeEInfo"></div>
      </div>
      <!--    可领取,已领取要置灰-->
      <div v-else class="dynamic-btn">
        <!--      判断库存-->
        <div v-if="item.status===3" style="width: 100%;height: 100%;" @click="noStorageInfo"></div>
        <div v-else-if="item.status===1" style="width: 100%;height: 100%;" @click="successInfo"></div>
      </div>
    </div>
    <!--    我的E卡记录-->
    <div @click="seeEInfo" class="prize-btn" ></div>
    <!--    规则-->
    <div class="rule-area" v-html="rule"></div>
    <!--    <div class="dynamic-btn" :class="{'gray':_item.isEffective === null || _item.isEffective === '1'}"></div>-->
    <!--非会员弹窗-->
    <Overlay class="overlay" v-model:show="noMemberShow" :close-on-click-overlay="false">
      <div class="wrapper">
        <div class="noMem-view">
          <div class="gotoOpen" @click="openStatus"></div>
          <!--          <div class="close-btn" @click="closeDialog('noQualified')"></div>-->
        </div>
      </div>
    </Overlay>
    <!--    无资格弹窗-->
    <Overlay class="overlay" v-model:show="noQualifiedShow" :close-on-click-overlay="false">
      <div class="wrapper">
        <div class="failed-view">
          <div class="gotoShop" @click="gotoShopPage('1000074146')"></div>
          <div class="close-btn" @click="closeDialog('noQualified')"></div>
        </div>
      </div>
    </Overlay>
    <!--    E卡记录弹窗-->
    <Overlay class="overlay" v-model:show="ecardInfoShow" :close-on-click-overlay="false">
      <div class="wrapper">
        <div class="info-view">
          <div v-if="eCardNo">
            <div class="info-text-up">【领取卡密】</div>
            <input class="info-text-down" :id="'copyInput'" :value="eCardNo" readonly/>
            <img class="copy-btn" src="./assets/copy.png" :id="'cliptxt'" @click="copy()"
                 :data-clipboard-target="'#copyInput'"/>
          </div>
          <div v-else class="info-text-invalid">暂无领取记录</div>
          <div class="gotoShop" @click="gotoShopPage('1000074146')"></div>
          <div class="close-btn" @click="closeDialog('myPrize')"></div>
        </div>
      </div>
    </Overlay>
    <!--    领取成功弹窗-->
    <Overlay class="overlay" v-model:show="successShow" :close-on-click-overlay="false">
      <div class="wrapper">
        <div class="success-view">
          <div class="gotoInfo" @click="changeSuccess"></div>
          <div class="close-btn" @click="closeDialog('success')"></div>
        </div>
      </div>
    </Overlay>

  </div>
</template>

<script lang='ts' setup>
import {
  ref, inject, onMounted, Ref, computed,
} from 'vue';
import dayjs from 'dayjs';
import { Popup, Toast, Overlay } from 'vant';
import Clipboard from 'clipboard';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
import { gotoShopPage } from '@/utils/platforms';

// 数据
const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
// 获取活动id
const activityId = ref<string>(baseInfo.activityId);
// 用户Pin
const userPin = ref<string>(baseInfo.pin);
// 是否开卡表示是否注册
const isOpenCarded: boolean = inject('isOpenCard') as boolean;
// const isOpenCarded = ref(false);
// 规则
const rule = ref('');
// 主接口信息
const cardStatus = ref([]);
// e卡卡密
const eCardNo = ref('');
// 卡状态
// const Estate = ref('');
/* -------------------------------弹窗开关-------------------------------------------*/
// 无资格弹窗
const noQualifiedShow = ref(false);
// 我的e卡记录
const ecardInfoShow = ref(false);
// 领取成功弹窗
const successShow = ref(false);
// 非会员弹窗
const noMemberShow = ref(false);

// 打开弹窗
const openDialog = (status) => {
  if (status === 'noMember') {
    noMemberShow.value = true;
  } else if (status === 'noQualified') {
    noQualifiedShow.value = true;
  } else if (status === 'myPrize') {
    ecardInfoShow.value = true;
  } else if (status === 'success') {
    successShow.value = true;
  }
  // dialogShow.value = true;
};
const seeEInfo = () => {
  ecardInfoShow.value = true;
};
let timea;
// 关闭弹窗
const closeDialog = (status) => {
  clearTimeout(timea);
  // if (status === 'noMember') {
  //   noMemberShow.value = false;
  // } else
  if (status === 'noQualified') {
    noQualifiedShow.value = false;
  } else if (status === 'myPrize') {
    ecardInfoShow.value = false;
  } else if (status === 'success') {
    successShow.value = false;
  }
  // dialogShow.value = false;
};
/* --------------------------------------------------------------------------*/
// 复制功能
const copy = () => {
  const clipboard = new Clipboard('#cliptxt');
  clipboard.on('success', (e) => {
    Toast('复制成功！');
    clipboard.destroy();
  });
  clipboard.on('error', (e) => {
    Toast('复制失败，请长按复制！');
    clipboard.destroy();
  });
};
// 成功弹窗切换
const changeSuccess = () => {
  closeDialog('success');
  openDialog('myPrize');
};
// 主接口
const getMainContent = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/wx/swisse/receiveECard/activityContent', {
    activityId: activityId.value,
    pin: userPin,
  }).then((res) => {
    console.log(res);
    if (res.result) {
      if (res.data) {
        const rules = res.data.rule.split('\n');
        rule.value = rules.join('<br/>');
        cardStatus.value = res.data.giftVOS;
        eCardNo.value = res.data.ecardKey;
        // Estate.value = res.data.giftVOS[0].status;
        if (res.data.giftVOS[0].status === 0) {
          openDialog('noQualified');
        }
      }
    } else {
      Toast(res.errorMessage);
    }
  }).finally(() => {
    Toast.clear();
  });
};
// 领取卡券成功
const successInfo = () => {
  // eslint-disable-next-line no-use-before-define
  prizeInfo();
  timea = setTimeout(() => {
    changeSuccess();
  }, 3000);
};

// 无库存提示
const noStorageInfo = () => {
  Toast('本周E卡库存不足，请下周一再来领取');
};
// 跳转开卡
const openStatus = () => {
  // if (!isOpenCarded) {
  window.location.href = `https://shopmember.m.jd.com/shopcard?venderId=100000000000198&shopId=1000002672&venderType=1&channel=7039&returnUrl=${window.location.href}`;
  // }
};
// 领取记录接口
const prizeInfo = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/wx/swisse/receiveECard/receive', {
    activityId: activityId.value,
    pin: userPin,
  }).then((res) => {
    console.log(res);
    if (res.result) {
      eCardNo.value = res.data;
      getMainContent();
      openDialog('success');
    } else {
      Toast(res.errorMessage);
      clearTimeout(timea);
    }
  }).finally(() => {
    Toast.clear();
  });
};

// openStatus();
getMainContent();
</script>

<style lang='scss'>
[v-cloak] {
  display: none;
}
html {
  max-width: 750px;
  margin: 0 auto;
  background: #c41d11;
}
#kv {
  position: relative;
  background-size: cover;
  width: 100%;
}
#kv1{
  position: relative;
  background-size: cover;
  width: 100%;
}
.title-font{
  position: absolute;
  width: 3rem;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  top: 10.7rem;
  left: 2.25rem;
  font-size: .2rem;
  color: #7d2402;
  font-weight: 700;
}
.gray {
  /*grayscale(val):val值越大灰度就越深*/
  -webkit-filter: grayscale(100%) brightness(1);
  -moz-filter: grayscale(100%) brightness(1);
  -ms-filter: grayscale(100%) brightness(1);
  -o-filter: grayscale(100%) brightness(1);
  filter: grayscale(100%) brightness(1);
  filter: gray brightness;
}
.dynamic-btn{
  background: url("./assets/btn.png") no-repeat;
  background-size: 100%;
  height: 0.75rem;
  position: absolute;
  top: 13.3rem;
  left: 2.7rem;
  width: 2rem;
}
.collected-btn{
  background: url("./assets/collected.png") no-repeat;
  background-size: 100%;
  height: 0.75rem;
  position: absolute;
  top: 13.3rem;
  left: 2.7rem;
  width: 2rem;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.noMem-view{
  background: url("./assets/noMem.gif") no-repeat;
  background-size: 100%;
  width: 5.74rem;
  height: 7.2rem;
  position: relative;

  .gotoOpen{
    width: 1.7rem;
    height: 0.6rem;
    position: absolute;
    top: 6.15rem;
    left: 2rem;
  }
}
.failed-view{
  background: url("./assets/no-qualified.png") no-repeat;
  background-size: 100%;
  width: 6.5rem;
  height: 8rem;
  position: relative;

  .gotoShop{
    width: 2.5rem;
    height: 0.6rem;
    position: absolute;
    top: 6rem;
    left: 2.2rem;
  }
  .close-btn{
    width: 0.6rem;
    height: 0.6rem;
    position: absolute;
    top: 7rem;
    left: 3.1rem;
  }
}
.info-view{
  background: url("./assets/E-Info.png") no-repeat;
  background-size: 100%;
  width: 5.87rem;
  height: 8.12rem;
  position: relative;

  .info-text-up{
    position: absolute;
    top: 3.3rem;
    left: 2.38rem;
  }
  .info-text-invalid{
    position: absolute;
    top: 4.2rem;
    left: 2.38rem;
  }
  .info-text-down{
    position: absolute;
    top: 4.2rem;
    left: 1rem;
    width: 4.5rem;
    text-align: center;
    white-space: nowrap;
    word-break: keep-all;
    line-height: 0.6rem;
    border: none;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .copy-btn{
    position: absolute;
    top: 5.1rem;
    left: 2.7rem;
    width: 1.15rem;
    height: 0.6rem;
    border: none;
  }
  .gotoShop{
    width: 2.5rem;
    height: 0.6rem;
    position: absolute;
    top: 6.2rem;
    left: 2rem;
  }
  .close-btn{
    width: 0.6rem;
    height: 0.6rem;
    position: absolute;
    top: 7.2rem;
    left: 2.95rem;
  }
}
.success-view{
  background: url("./assets/success.png") no-repeat;
  background-size: 100%;
  width: 5.74rem;
  height: 7rem;
  position: relative;

  .gotoInfo{
    width: 3rem;
    height: 0.6rem;
    position: absolute;
    top: 4.8rem;
    left: 1.6rem;
  }
  .close-btn{
    width: 0.6rem;
    height: 0.6rem;
    position: absolute;
    top: 5.8rem;
    left: 2.8rem;
  }
}
.prize-btn{
  width: 3.5rem;
  height: .71rem;
  position: absolute;
  top: 14.5rem;
  left: 2rem;
}
.rule-area{
  width: 6.8rem;
  height: 7.6rem;
  font-size: 0.2rem;
  color: white;
  position: absolute;
  top: 15.7rem;
  left: 0.3rem;
  overflow: auto;
  padding-right: .2rem;
}
</style>
