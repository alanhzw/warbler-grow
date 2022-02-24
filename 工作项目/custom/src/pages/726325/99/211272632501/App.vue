<template>
  <img class='kv_img' src='./assets/kv.png'>
  <div class='log_dialog' @click='getApplyRecordInfo'>我的申领记录 &gt;</div>
  <div class='log_dialog' @click='showPopUp.ruleDialog = true;' style='top: .73rem'>本期活动规则 &gt;</div>
  <!--  申领-->
  <div class='apply'>
    <img class='apply_img' :src='actInfo.giftPicture'>
    <div class='apply_condition'>
      会员首购满{{actInfo.limitPrice}}元享
    </div>
    <div class='apply_name'>{{actInfo.giftName}}</div>
    <div class='apply_num'>限量{{actInfo.giftNum}}份</div>
    <div class='apply_btn' :style='{filter:actInfo.giftLeft?"grayscale(0)":"grayscale(1)"}' v-click-track="'点击参与人数'" @click='applyClick'>{{actInfo.giftLeft?'点击报名申领':'已领完'}}</div>
  </div>
  <div class='title'>爆款推荐</div>
  <div class='sku'>
    <div class='sku_list' v-for='(item) in skuList' @click='gotoSkuPage(item.skuId)' :key='item.skuId'>
      <div class='sku_img'>
        <img :src='formatUrl(item.logo)'>
      </div>
      <div class='sku_name line_clamp2'>{{ item.skuName }}</div>
<!--      <div class='sku_tips line_clamp2'>{{ item.skuNameShort }}</div>-->
      <div class='sku_btn'>立即购买</div>
    </div>
  </div>
  <div class='title' style='margin-top: .2rem;'>往期活动展示</div>
  <div class='previous_box'>
    <div class='previous_act'>
      <div class='til'>活动时间</div>
      <div class='til'>活动奖品</div>
    </div>
      <div class='swiper-container'>
        <div class='swiper-wrapper' v-if='previousList.length>0'>
          <div class='swiper-slide ' v-for='item in previousList' :key='item.id'>
              <div class='con'>{{ dayjs(item.startTime).format('YYYY-M-D') }}-{{ dayjs(item.updateTime).format('YYYY-M-D') }}</div>
              <div class='con'>{{item.giftName}}</div>
          </div>
        </div>
        <div class='no_data' v-else>暂无数据...</div>
      </div>
  </div>

  <div class='title' style='margin-top: .2rem;'>活动规则</div>
  <div class='rule' v-html='formatRule(actInfo.activityRule)'></div>
  <!--  领取记录-->
  <popup v-model:show='showPopUp.receivingRecord'>
    <div class='dialog'>
      <div class='log_con'>
        <div class='log_list'>
          <div class='log_til'>申请时间</div>
          <div class='log_til'>申领奖品</div>
          <div class='log_til'>收货地址</div>
          <div class='log_til'>是否获奖</div>
        </div>
        <div v-if='applyRecord.length>0' >
          <div class='log_list' v-for='(item) in applyRecord' :key='item.createTime'>
            <div class='log_til log_text'>{{dayjs(item.createTime).format('YYYY-M-D')}}</div>
            <div class='log_til log_text'>{{item.giftRecordId}}</div>
            <div class='log_til log_text' @click='changeLocation(item)'>{{item.personalEmail ==="2"?'修改地址':'已填写'}}</div>
            <div class='log_til log_text'>{{status2name(item.personalEmail)}}</div>
          </div>
        </div>
        <div v-else style='font-size: .22rem;text-align: center;'>
          暂无申请记录...
        </div>
      </div>
      <div class='tips'>*注:仅显示3个月内申领记录</div>
    </div>
  </popup>
  <!--  本期规则-->
  <popup v-model:show='showPopUp.ruleDialog'>
    <div class='ruleDialog'>
      <div class='ruleDialog_name'>本期活动规则</div>
      <div class='dialog_rule' v-html='formatRule(actInfo.rule)'></div>
      <div class='rule_dialog_hide' @click='showPopUp.ruleDialog = false;'>返回</div>
    </div>
  </popup>
  <!---->
  <popup v-model:show='showPopUp.tipsModal'>
    <div class='ruleDialog'>
      <div class='ruleDialog_name'>温馨提示</div>
      <div class='dialog_rule' >本活动申请仅用于活动资格申请，不代表已经获得礼品，最终结果以完成订单完成后系统审核结果为准；<br/>根据京东订单状态同步流程，审核结果可在订单确认收货后48小时进行查询。</div>
      <div class='rule_dialog_hide' @click='showPopUp.tipsModal = false;'>我知道了</div>
    </div>
  </popup>
  <!--用户须知条款-->
  <popup v-model:show='showPopUp.instructionsModal '>
    <div class='ruleDialog'>
      <div class='ruleDialog_name'>用户须知条款</div>
      <div class='dialog_rule' v-html='privacyClause'></div>
      <div class='rule_dialog_hide' @click='showPopUp.instructionsModal = false;'>返回</div>
    </div>
  </popup>
  <!--未满足条件-->
  <popup v-model:show='showPopUp.showNoCondition '>
    <div class='modal'>
      <div class='modal_text'>很遗憾，您的首购金额 <br /> 未满足获奖条件，请继续加油。</div>
      <div class='modal_hide' @click='showPopUp.showNoCondition = false;'>我知道了</div>
    </div>
  </popup>
  <!--下次参与-->
  <popup v-model:show='showPopUp.nextModal '>
    <div class='modal'>
        <div class='modal_text'>很遗憾，奖品库存已发放完毕，<br />欢迎下次继续参与。</div>
      <div class='modal_hide' @click='goMore'>其他活动&gt;</div>
    </div>
  </popup>
  <!--限制首购-->
  <popup v-model:show='showPopUp.isFirstModal '>
    <div class='modal'>
      <div class='modal_text'>很遗憾，本活动仅限首购会员参与，<br />请关注其他会员活动。</div>
      <div class='modal_hide' @click='goMore'>其他活动&gt;</div>
    </div>
  </popup>
  <!--获得礼物-->
  <popup v-model:show='showPopUp.giftModal '>
    <div class='modal'>
      <div class='modal_text'>恭喜您获得首购礼申请资格,<br />请确认收货地址。</div>
      <div class='modal_hide' @click='showLocation'>查看地址&gt;</div>
    </div>
  </popup>
  <!--地址-->
  <popup v-model:show='showPopUp.locationModal ' @closed='form = {},addressCode =""'>
    <div class='location_modal'>
      <div class='form_box'>
        <div class='form_til'>申领奖品收货地址</div>
        <div class='form_list'>
          <div class='form_label'>姓名</div>
          <input class='form_input' maxlength='15' v-model.trim='form.receiver' placeholder='请输入姓名' type='text'>
        </div>
        <div class='form_list'>
          <div class='form_label'>手机号</div>
          <input class='form_input' v-model.trim='form.phone' maxlength='11' placeholder='请输入手机号' type='text'>
        </div>
        <div class='form_list'>
          <div class='form_label'>省/市/区</div>
          <input class='form_input' placeholder='请选择地区' readonly v-model='addressCode' @click='addressSelects =true' type='text'>
        </div>
        <div class='form_list'>
          <div class='form_label'>详细地址</div>
          <input class='form_input' maxlength='20' v-model.trim='form.address' placeholder='请输入详细地址' type='text'>
        </div>
      </div>
      <div class='location_info'>
        <input type='checkbox' v-model='isAgreeInfo' />我已阅读并同意 <span style='text-decoration: underline' @click='showPopUp.ruleDialog = true'>活动规则</span>和 <span style='text-decoration: underline' @click='showPopUp.instructionsModal = true'>隐私条款</span>
      </div>
      <div class='modal_hide location_modal_hide' @click='saveForm'>提交信息</div>
    </div>
  </popup>
  <!--地址选择-->
  <Popup v-model:show='addressSelects' position='bottom'>
    <Area
      title='请输入详细地址'
      :area-list='areaList'
      @confirm='confirmAddress'
      @cancel='addressSelects = false'
    />
  </Popup>
</template>

<script setup lang='ts'>
import { inject, nextTick, onMounted, reactive, ref } from 'vue';
import { Popup, Area, Toast } from 'vant';
import { areaList } from '@vant/area-data';
import Swiper, { Autoplay } from 'swiper';
import dayjs from 'dayjs';
import { gotoSkuPage } from '@/utils';
import { BaseInfo } from '@/types/BaseInfo';
import {
  subForm, findSkus, addressForm, privacyClause, goMore,
  findPreviousActInfo, getRules, previousType, getActInfo, actInfoType, getApplyRecord, applyRecordType, getIsShwoDialog,
} from './hook/tool';

Swiper.use([Autoplay]);
const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
const form = ref<addressForm>({});
const skuList = ref([]);// 曝光商品
const actInfo = ref<actInfoType>({
  activityRule: '',
});// 活动信息
const isAddApply = ref(false); // 新增申请
const applyRecord = ref<applyRecordType[]>([]);// 申请记录
const previousList = ref<previousType[]>([]); // 往期活动数据.
const formatUrl = (url: string) => (url.indexOf('http') > -1 ? url : `https://img10.360buyimg.com/n1${url}`);
const formatRule = (data:string) => data?.replace(/\r\n/g, '<br/>');
// 格式化中奖状态
const statusList = ['未中奖', '中奖', '未公布'];
const status2name = (status:number) => statusList[status];
// 选择地区
const addressSelects = ref(false);
const addressCode = ref('');
// 地址确认三级联动地址
const confirmAddress = (addressItemList: any) => {
  form.value.province = addressItemList[0].name;
  form.value.city = addressItemList[1].name;
  form.value.district = addressItemList[2].name;
  addressCode.value = addressItemList.map((item: any) => item.name)
    .join('/');
  addressSelects.value = false;
};
const showPopUp = reactive({
  receivingRecord: false, // 领取记录
  ruleDialog: false, // 本期活动规则
  instructionsModal: false, // 用户须知条款
  showNoCondition: false, // 不满足条件
  nextModal: false, // 下次参与
  giftModal: false, // 获得礼物
  locationModal: false, // 地址保存
  isFirstModal: false, // 限制首购
  tipsModal: false, // 温馨提示
});
const ruleText = ref('');// 活动规则
// 点击报名按钮
const applyClick = () => {
  if (!actInfo.value.giftLeft) {
    showPopUp.nextModal = true;
    return;
  }
  if (actInfo.value.fillAddressFlag === '1') {
    Toast('您已经申请过礼物了，不能重复申请。');
    return;
  }
  if (actInfo.value.firstOrderDate === false) {
    showPopUp.isFirstModal = true;
    return;
  }
  isAddApply.value = true;
  showPopUp.locationModal = true;
};
// 是否勾选协议
const isAgreeInfo = ref(false);
const saveForm = async () => {
  if (!isAgreeInfo.value) {
    Toast('请您阅读并同意活动规则和隐私条款。');
    return;
  }
  const res = await subForm(form.value, baseInfo);
  if (res?.result) {
    if (isAddApply.value) {
      showPopUp.tipsModal = true;
    } else {
      Toast('操作成功。');
    }
    showPopUp.locationModal = false;
    actInfo.value = await getActInfo(baseInfo);
  }
};
// 初始化swiper
const initSwiper = () => {
  if (previousList.value.length <= 3) return;
  const mySwiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    loop: true,
    slidesPerView: 3,
  });
};
// 处理活动信息数据 判断弹窗
const showDialog = async () => {
  // 查询是否弹窗过
  const isShowModaled = await getIsShwoDialog(baseInfo, actInfo.value.giftId);
  if (actInfo.value.activityFlag === '1' && actInfo.value.avardStatus === '1' && !isShowModaled) {
    showPopUp.giftModal = true;
    return;
  }
  if (actInfo.value.activityFlag === '1' && actInfo.value.avardStatus === '0' && !isShowModaled) {
    showPopUp.nextModal = true;
  }
};
// 查询我的申请记录
const getApplyRecordInfo = async () => {
  const data = await getApplyRecord(baseInfo);
  applyRecord.value = data;
  showPopUp.receivingRecord = true;
};
// 申请记录弹窗点击修改地址
const changeLocation = (item:applyRecordType, isNeedChangeLocation?:boolean) => {
  // 只有状态是未公布才能修改地址 当从中奖弹窗跳转过来时 可以修改
  if (item.personalEmail !== '2' && !isNeedChangeLocation) return;
  isAgreeInfo.value = true;// 修改时默认勾选协议
  form.value = { ...item };
  addressCode.value = `${item.province}/${item.city}/${item.district}`;
  showPopUp.locationModal = true;
  showPopUp.giftModal = false;
  showPopUp.receivingRecord = false;
  isAddApply.value = false;
};
// 中奖弹窗点击查看地址按钮
const showLocation = async () => {
  const data = await getApplyRecord(baseInfo);
  changeLocation(data[0], true);
};
onMounted(async () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  [skuList.value, previousList.value, ruleText.value, actInfo.value] = await Promise.all(
    [findSkus(baseInfo), findPreviousActInfo(baseInfo), getRules(baseInfo), getActInfo(baseInfo)],
  );
  Toast.clear();
  showDialog();
  await nextTick(() => {
    initSwiper();
  });
});
</script>

<style>
html {
  background: #f8f8f8;
  padding-bottom: 2rem;
  box-sizing: border-box;
}

/*修改滚动条样式*/
div::-webkit-scrollbar {
  display: none;
}

/*修改vant popup样式*/
.van-popup {
  background: transparent;
}

.van-toast {
  background-color: rgba(0, 0, 0, 0.7);
}

.swiper-slide {
  display: flex;
  flex-wrap: wrap;
  color: #FFF;
  text-align: center;
  font-size: .22rem;
  height: .38rem !important;
}
</style>
<style lang='scss' scoped>
.kv_img {
  display: block;
  width: 100%;
}

.log_dialog {
  width: 1.54rem;
  padding: .06rem 0;
  box-sizing: border-box;
  background-color: #b89a5e;
  border-radius: .17rem;
  text-align: center;
  position: absolute;
  right: .24rem;
  top: .2rem;
  font-size: .17rem;
  color: #fff;
}

.apply {
  width: 7rem;
  height: 2.6rem;
  background: url("./assets/apply.png") no-repeat;
  background-size: 100%;
  position: absolute;
  top: 7rem;
  left: .25rem;
  z-index: 1;
  padding: .25rem 0 4rem 2.57rem;
  box-sizing: border-box;
  color: #353535;

  .apply_img {
    position: absolute;
    left: 0.5rem;
    width: 1.7rem;
  }

  .apply_condition {
    font-size: .18rem;
    line-height: .4rem;
    color: #b89a5e;
  }

  .apply_name {
    font-size: .28rem;
    line-height: .4rem;
  }

  .apply_num {
    font-size: .22rem;
  }

  .apply_btn {
    margin-top: .15rem;
    display: inline-block;
    font-size: .22rem;
    color: #fff;
    background-color: #c8a867;
    box-shadow: 0px 9px 11px 0px rgba(200, 168, 103, 0.5);
    border-radius: .23rem;
    padding: .09rem .21rem;
    box-sizing: border-box;
  }
}

.title {
  font-size: .28rem;
  line-height: .42rem;
  color: #353535;
  padding-left: .73rem;
  margin-top: 2.2rem;
  font-weight: bold;
}

.sku {
  padding: 0 .25rem;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;

  .sku_list {
    width: 49.5%;
    margin-right: 1%;
    text-align: left;
    background: #fff;
    padding: .12rem .12rem .3rem;
    box-sizing: border-box;
    box-shadow: -0.02rem 0.17rem 0.2rem 0rem rgba(0, 0, 0, 0.06);
    border-radius: 0.24rem;
    margin-bottom: .2rem;

    &:nth-child(2n) {
      margin-right: 0;
    }

    .sku_img {
      width: 100%;
      height: 3.07rem;
      background-color: #f8f8f8;
      border-radius: 0.17rem 0.17rem 0rem 0rem;
      text-align: center;

      img {
        height: 88%;
        margin-top: 6%;
      }
    }

    .sku_name {
      font-size: 0.26rem;
      color: #353535;
    }

    .sku_tips {
      font-size: 0.22rem;
      color: #353535;
    }

    .sku_btn {
      width: 1.24rem;
      padding: .05rem 0;
      box-sizing: border-box;
      background-color: #c8a867;
      border-radius: 0.18rem;
      color: #ffffff;
      font-size: 0.18rem;
      margin-top: .2rem;
      margin-left: 50%;
      transform: translateX(-50%);
      text-align: center;
    }
  }
}

.previous_box {
  margin-top: .1rem;
  width: 7rem;
  height: 2.3rem;
  margin-left: .25rem;
  background: url("./assets/actBg.png") no-repeat;
  background-size: 100%;

  .swiper-container {
    width: 92%;
    margin-left: .25%;
    margin-top: .4rem;;
    height: 1.1rem;
    overflow: hidden;
  }

  .previous_act, .swiper-slide {
    display: flex;
    flex-wrap: wrap;
    color: #FFF;
    text-align: center;
    font-size: .22rem;

    .til {
      width: 50%;
      padding-top: .1rem;
      box-sizing: border-box;
    }

    .con {
      width: 50%;
      font-size: .15rem;
      color: #555;
      line-height: .3rem;
    }
  }
}

.rule {
  margin-top: .1rem;
  padding: 0 .72rem;
  box-sizing: border-box;
  font-size: .24rem;
}

//获奖记录
.dialog {
  width: 6.5rem;
  height: 8.5rem;
  background: url("./assets/log.png") no-repeat;
  background-size: 100%;

  .log_con {
    position: absolute;
    top: 3.2rem;
    left: 1rem;
    width: 5rem;
    max-height: 4rem;
    overflow-y: auto;

    .log_list {
      display: flex;
      margin-bottom: .1rem;
      align-items: center;
      .log_til {
        width: 24%;
        margin-right: 1%;
        background: #ecc38b;
        color: #523916;
        text-align: center;
        font-size: .18rem;
        border-radius: .3rem;
        padding: .07rem 0;
        box-sizing: border-box;

        &:nth-child(4) {
          margin-right: 0;
        }
      }

      .log_text {
        background: #fff4e6;
        border-radius: .05rem;
        color: #523916;

        &:nth-child(3) {
          text-decoration: underline;
        }
      }
    }
  }

  .tips {
    position: absolute;
    bottom: .7rem;
    width: 100%;
    font-size: .18rem;
    text-align: center;
    color: #dcaf71;
  }
}

//本期规则
.ruleDialog {
  width: 6.5rem;
  height: 8.5rem;
  background: url("./assets/ruleBg.png") no-repeat;
  background-size: 100%;

  .ruleDialog_name {
    text-align: center;
    font-size: 0.24rem;
    color: #d3a76c;
    position: absolute;
    top: 3.1rem;
    left: 1.1rem;
    width: 4.8rem;
  }

  .dialog_rule {
    position: absolute;
    top: 3.8rem;
    left: 1.1rem;
    width: 4.7rem;
    max-height: 3rem;
    color: #ffffff;
    overflow-y: auto;
    font-size: .24rem;
  }

  .rule_dialog_hide {
    background-color: #efd3ab;
    border-radius: 0.4rem;
    font-size: 0.27rem;
    color: #734f1e;
    text-align: center;
    position: absolute;
    bottom: .7rem;
    padding: .05rem .3rem;
    box-sizing: border-box;
    left: 50%;
    transform: translateX(-50%);
    margin-left: .3rem;
  }
}

.modal {
  width: 6.5rem;
  height: 8.5rem;
  background: url("./assets/modal.png") no-repeat;
  background-size: 100%;

  .modal_text {
    position: absolute;
    top: 4.5rem;
    left: 1.1rem;
    width: 4.7rem;
    font-size: 0.24rem;
    line-height: 0.4rem;
    text-align: center;
    color: #fff;
  }
}

.location_modal {
  width: 6.5rem;
  height: 8.5rem;
  background: url("./assets/location.png") no-repeat;
  background-size: 100%;

  .form_box {
    position: absolute;
    left: .8rem;
    top: 2.7rem;
    width: 5.3rem;
    padding: 0 .2rem;
    box-sizing: border-box;

    .form_til {
      //width: 100%;
      text-align: center;
      color: #d3a76c;
      font-size: 0.24rem;
      margin: .2rem 0;
    }

    .form_list {
      background: #f8e4c9;
      display: flex;
      border-radius: 0.3rem;
      overflow: hidden;
      font-size: 0.24rem;
      margin-bottom: .14rem;
      .form_label {
        width: 1.2rem;
        padding: .2rem 0;
        box-sizing: border-box;
        text-align: center;
        background-color: #d4a96d;
        color: #fff;
        margin-right: .1rem;
      }

      .form_input {
        flex: 1;
        background: transparent;
        border: 0;
      }
    }
  }

  .location_info {
    position: absolute;
    bottom: 1.1rem;
    left: 1.8rem;
    color: #b18b57;
    font-size: 0.19rem;

    input {
      vertical-align: sub;
      background-color: #f8e4c9;
      border-radius: 0.07rem;
      border: solid 0.02rem rgba(228, 201, 163, 0.67);
    }
  }

  .location_modal_hide {
    position: absolute;
    bottom: .6rem;

  }
}

.modal_hide {
  position: absolute;
  bottom: 1.1rem;
  width: 1.71rem;
  background-color: #efd3ab;
  border-radius: 0.2rem;
  font-size: 0.24rem;
  color: #734f1e;
  padding: 0.05rem 0;
  box-sizing: border-box;
  text-align: center;
  left: 50%;
  margin-left: .3rem;
  transform: translateX(-50%);
}

.line_clamp2 {
  width: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
//往期数据没有数据
.no_data{
  font-size: .22rem;
  display: inline-block;
  position: absolute;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
  padding-left: .3rem;
  box-sizing: border-box;
}
</style>
