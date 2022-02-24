/**
* @Description:caoshijie
* @Date: 2022/1/7
* @Description: 水井坊复购送小酒
* @FilePath:src\pages\1000086084\99\2201100008608401\App.vue
*/
<template>
  <img class='width100' src='./assets/kv.png'>
  <div class='act_date width100'>活动时间：{{ dayjs(baseInfo.startTime).format('YYYY')}}年{{ dayjs(baseInfo.startTime).format('MM')}}月{{ dayjs(baseInfo.startTime).format('DD')}}日-{{ dayjs(baseInfo.endTime).format('MM')}}月{{ dayjs(baseInfo.endTime).format('DD')}}日</div>
  <div class='act_date act_tip width100'>理性饮酒 杜绝酗酒 禁止向未满18岁消费者出售</div>
  <div class='act_btn' @click='showPopUp.ruleDialog=true'>活动规则</div>
  <div class='act_btn act_btn_gift' @click='getMyGift'>我的奖品</div>
  <div class='act_btn act_btn_local' @click='getAddress'>填写地址</div>
  <!--  入会-->
  <img class='join_img' src='./assets/join.png' @click='openCard(isOpenCard)'>
  <!--闯关-->
  <div class='exchange_box'>
    <img class='width100' src='./assets/exchange.png'>
    <div class='btn_box'>
      <div class='btn_list' @click='openCard(isOpenCard)'>{{isOpenCard?'已开启':'尚未解锁'}}</div>
      <div class='btn_list' v-for='item in actInfo' :key='item.giftId' :style='{filter:item.buttonStatus=="4"?"grayscale(1)":"grayscale(0)"}' @click='receivePrize(item)'>{{formatStatus(item.buttonStatus)}}</div>
    </div>
  </div>
  <!--  优惠券-->
  <div class='coupon_img flex_box'>
    <div class='coupon_btn' @click='drawGrantTypeCoupon(baseInfo)'></div>
    <div class='coupon_btn' @click='drawGrantTypeCoupon(baseInfo)'></div>
  </div>
<!--  曝光商品-->
  <div class='sku_box flex_box' v-once>
    <img class='sku_list' v-for='(item,index) in 8' @click='gotoSkuPage(skuIds[index])' :key='item' :src='require(`./assets/${index}.png`)'>
    <div class='sku_list go_shop_btn' @click='gotoShopPage("1000086084")'></div>
    <div class='sku_list go_shop_btn' @click='gotoShopPage("644125")'></div>
  </div>
  <!--  开卡-->
  <popup v-model:show='showPopUp.openCard'>
    <div class='ruleDialog'>
      <img class='width100' src='./assets/openCard.png'>
<!--      开卡-->
      <div class='open_card' @click='openCard(isOpenCard)'></div>
      <!--      关闭按钮-->
      <div class='rule_dialog_hide' @click='showPopUp.openCard = false;'></div>
    </div>
  </popup>
  <!--  规则-->
  <popup v-model:show='showPopUp.ruleDialog'>
    <div class='ruleDialog'>
      <img class='width100' src='./assets/rule.png'>
      <div class='dialog_rule' v-html='rule'></div>
      <!--      关闭按钮-->
      <div class='rule_dialog_hide' @click='showPopUp.ruleDialog = false;'></div>
    </div>
  </popup>
  <!--  我的奖品-->
  <popup v-model:show='showPopUp.myGiftModal'>
    <div class='ruleDialog'>
      <img class='width100' src='./assets/gift.png'>
      <div class='dialog_gift'>
        <div class='gift_list' v-if='myGiftList?.giftName'>
          <div class='gift_item'>{{myGiftList?.giftName}}</div>
          <div class='gift_item'>{{myGiftList?.createTime}}</div>
        </div>
        <div v-else>
          暂无数据...
        </div>
      </div>
      <!--      关闭按钮-->
      <div class='rule_dialog_hide' @click='showPopUp.myGiftModal = false;'></div>
    </div>
  </popup>
  <!--  填写地址-->
  <popup v-model:show='showPopUp.locationDialog'>
    <div class='ruleDialog'>
      <img class='width100' src='./assets/location.png'>
      <div class='local_box'>
        <div class='local_list'>
          <div class='local_label'>收货人</div>
          <input type='text' class='local_input' v-model.trim='form.receiver' placeholder='请输入收货人姓名' maxlength='20'>
        </div>
        <div class='local_list'>
          <div class='local_label'>联系人</div>
          <input type='text' class='local_input' v-model.trim='form.phone' placeholder='请输入联系人手机号' maxlength='11'>
        </div>
        <div class='local_list'>
          <div class='local_label'>省/市/区</div>
          <input type='text' class='local_input' @click='addressSelects=true;' v-model='addressCode' placeholder='请选择所在省/市/区'>
        </div>
        <div class='local_list'>
          <div class='local_label'>详细地址</div>
          <input type='text' class='local_input' v-model='form.address' placeholder='请输入详细地址'>
        </div>
      </div>
<!--      提交-->
      <div class='sun_btn' @click='sunForm'></div>
      <!--      关闭按钮-->
      <div class='rule_dialog_hide loc_dialog_hide' @click='showPopUp.locationDialog = false;'></div>
    </div>
  </popup>
  <!--地址选择-->
  <popup v-model:show='addressSelects' position='bottom'>
    <Area
      title='请输入详细地址'
      :area-list='areaList'
      @confirm='confirmAddress'
      @cancel='addressSelects = false'
    />
  </popup>
</template>

<script setup lang='ts'>
import { Popup, Area, Toast } from 'vant';
import { areaList } from '@vant/area-data';
import { inject, onMounted, reactive, ref } from 'vue';
import dayjs from 'dayjs';
import { actInfoType, getActInfo, getRules, openCard, getMyPrize, addressForm, drawGrantTypeCoupon, insertAddress, convertPrize, geftType, getGiftAddress } from './hook/tool';
import { gotoSkuPage, gotoShopPage } from '@/utils';
import { BaseInfo } from '@/types/BaseInfo';

const baseInfo = inject('baseInfo') as BaseInfo;
const isOpenCard = inject('isOpenCard');
// 曝光商品的skuId 注意顺序
const skuIds = ref(['1030774', '10041567415106', '1096098', '10041573979477', '265468', '11394292132', '1019296', '47875034300']);
// 弹窗
const showPopUp = reactive({
  ruleDialog: false,
  myGiftModal: false,
  locationDialog: false,
  openCard: false,
});
const rule = ref('');
// 活动信息
const actInfo = ref<actInfoType[]>([]);
// 格式化状态码;
const formatStatus = (status:number) => ['可以领取', '尚未解锁', '已领取', '已领光', '已解锁'][status];
const form = ref<addressForm>({});// 表单
const addressCode = ref('');// 省市区
const addressSelects = ref(false);// 三级联动地址
const generateId = ref(''); // 地址存放ID
const myGiftList = ref<geftType>({});
// 地址确认三级联动地址
const confirmAddress = (addressItemList: any) => {
  form.value.province = addressItemList[0].name;
  form.value.city = addressItemList[1].name;
  form.value.county = addressItemList[2].name;
  addressCode.value = addressItemList.map((item: any) => item.name)
    .join('/');
  addressSelects.value = false;
};
// 领奖
const receivePrize = async (data:actInfoType) => {
  if (data.buttonStatus !== 0) return;
  generateId.value = await convertPrize(baseInfo, data.giftId);
  if (generateId.value) {
    showPopUp.locationDialog = true;
  }
};
// 查询的我奖品
const getMyGift = async () => {
  myGiftList.value = await getMyPrize(baseInfo);
  showPopUp.myGiftModal = true;
};
// 保存地址
const sunForm = async () => {
  const result = await insertAddress(form.value, generateId.value);
  if (result.result) {
    actInfo.value = await getActInfo(baseInfo);
    showPopUp.locationDialog = false;
    form.value = {};
  }
};
// 填写地址
const getAddress = async () => {
  const data = await getGiftAddress(baseInfo);
  if (data.result) {
    form.value = {
      ...data.data,
    };
    generateId.value = data.data.generateId;
    addressCode.value = `${data.data.province}/${data.data.city}/${data.data.county}`;
    showPopUp.locationDialog = true;
  }
};
onMounted(async () => {
  showPopUp.openCard = !isOpenCard ?? true;
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  [rule.value, actInfo.value] = await Promise.all([getRules(baseInfo), getActInfo(baseInfo)]);
  Toast.clear();
});
</script>
<style>
html {
  background: #7f1617;
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

::-webkit-input-placeholder {
  color: #fff;
}

/* 使用webkit内核的浏览器 */
:-moz-placeholder {
  color: #fff;

}

/* Firefox版本4-18 */
::-moz-placeholder {
  color: #fff;
}

/* Firefox版本19+ */
:-ms-input-placeholder {
  color: #fff;
}
</style>
<style lang='scss' scoped>
.width100 {
  width: 100%;
}

.act_date {
  font-size: 0.21rem;
  line-height: 0.5rem;
  color: #ffffff;
  text-align: center;
  position: absolute;
  top: 8.65rem;
}

.act_tip {
  font-size: 0.18rem;
  top: 8.95rem;
}

.act_btn {
  font-size: 0.22rem;
  color: #8c161a;
  padding: 0.07rem 0.2rem .07rem .28rem;
  box-sizing: border-box;
  background-image: linear-gradient(90deg, #ffcf8d 0%, #f4e2b1 36%, #e3ac6c 81%, #fcf7bf 100%), linear-gradient(#ddb886, #ddb886);
  background-blend-mode: normal, normal;
  box-shadow: 0rem 0.03rem 0.02rem 0rem rgba(88, 12, 1, 0.51);
  border-radius: .2rem 0 0 0.2rem;
  position: absolute;
  top: 4rem;
  right: 0;
}

.act_btn_gift {
  top: 4.7rem;
}
.act_btn_local{
  top: 5.4rem;
}
.join_img {
  width: 5.76rem;
  margin-top: .32rem;
  margin-left: .87rem;
}

.exchange_box {
  padding: 0 .1rem;
  box-sizing: border-box;
  margin-top: .58rem;
  position: relative;

  .btn_box {
    position: absolute;
    right: 0.45rem;
    top: 1rem;

    .btn_list {
      padding: 0.02rem 0;
      box-sizing: border-box;
      width: 1.29rem;
      text-align: center;
      border-radius: 0.18rem;
      border: solid 0.05rem #7f1617;
      font-size: 0.2rem;
      letter-spacing: -0.01rem;
      color: #8e1a1b;
      margin-bottom: .3rem;
    }
  }
}

.coupon_img {
  width: 7.38rem;
  margin-left: 0.06rem;
  background: url("./assets/coupon.png") no-repeat;
  background-size: 100%;
  .coupon_btn{
    width: 50%;
    height: 1.72rem;

  }
}

.sku_box {
  width: 7.5rem;
  height: 16.46rem;
  background: url("./assets/skuBg.png") no-repeat;
  background-size: 100%;
  margin-bottom: 1rem;
  margin-top: .3rem;
  padding: 0.8rem .2rem 1.5rem;
  box-sizing: border-box;

  .sku_list {
    width: 48%;
    margin-top: .08rem;
  }
  .go_shop_btn{
    height: 1rem;
  }
}

.ruleDialog {
  width: 6.5rem;

  .dialog_rule {
    position: absolute;
    top: 1.2rem;
    left: .6rem;
    width: 5.18rem;
    max-height: 5.6rem;
    overflow-y: auto;
    font-size: .24rem;
    color: #8c161a;
  }

  .rule_dialog_hide {
    position: absolute;
    bottom: .45rem;
    width: .6rem;
    height: .6rem;
    left: 50%;
    transform: translateX(-50%);
  }

  .dialog_gift {
    position: absolute;
    top: 2.1rem;
    left: .8rem;
    width: 4.9rem;
    max-height: 4.6rem;
    overflow-y: auto;

    .gift_list {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: nowrap;
      text-align: center;
      margin-bottom: .2rem;

      .gift_item {
        flex: 1;
        font-size: .24rem;
        color: #8c161a;

        &:nth-child(1) {
          margin-right: .2rem;
        }
      }
    }

  }

  .loc_dialog_hide {
    bottom: 0rem;
    width: 1rem;
    height: 1rem;
  }

  .sun_btn{
    position: absolute;
    bottom: 1.5rem;
    left: 1.6rem;
    width: 3.2rem;
    height: 1rem;
    max-height: 5.6rem;
    overflow-y: auto;
  }
  .local_box {
    position: absolute;
    top: 1.8rem;
    left: .6rem;
    width: 5.18rem;

    .local_list {
      width: 5.29rem;
      border-radius: 0.09rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: .33rem;
      padding: 0.1rem 0;
      box-sizing: border-box;
      color: #810000;
      background-image: linear-gradient(90deg, #f8e3cf 0%, #e0a99a 25%, #b23631 50%, #a41513 100%);
      margin-bottom: .3rem;
      .local_label {
        width: 2rem;
        text-align: center;
      }

      .local_input {
        flex: 1;
        width: 100%;
        background: transparent;
        border: 0;
        outline: none;
        color: #fff;
        text-align: center;

      }
    }
  }
  .open_card{
    position: absolute;
    bottom: 2.8rem;
    left: 1.6rem;
    width: 3.2rem;
    height: 1rem;
    max-height: 5.6rem;
    overflow-y: auto;

  }
}
.flex_box{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
</style>
