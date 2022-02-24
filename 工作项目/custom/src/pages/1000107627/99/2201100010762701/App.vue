<template>
  <div class="index">
    <div class="kv pos-re">
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/100777/28/20425/523023/61d3adb5E9c2c951e/b4fbc347b35541f5.jpg"
      />
      <div class="show-rule" @click="overlay.rule = true"></div>
      <div class="show-mygift" @click="getDrawRecord"></div>
    </div>
    <div class="index-titel">邀请好友入会得大奖</div>
    <div class="invite-button" @click="shareCMD">立即邀请</div>
    <ul class="gift-list">
      <li v-for="item, index in giftList" :key="index">
        <div class="gift-img">
          <img :src="giftListImg[index]" />
        </div>
        <div class="gift-infor">
          <p class="gift-name">{{ item.giftName }}</p>
          <p class="gift-condition">{{ item.inviteNum }}名好友受邀入会</p>
          <div v-if="item.status === 2" class="get-prize">已领取</div>
          <div v-else-if="item.status === 3" class="get-prize fliter-gray">已领光</div>
          <div v-else-if="item.status === 4" class="get-prize fliter-gray" @click="Toast('已领取其它奖品')">已兑换其它</div>
          <div
            class="get-prize"
            :class="{ 'fliter-gray': item.status !== 1 }"
            v-else
            @click="convertPrize(index)"
          >立即领取</div>
        </div>
      </li>
    </ul>
    <div class="index-titel">好友助力榜</div>
    <ul class="frind-list">
      <li v-for="item,index in frindList" :key="index">
        <img
          src="//img10.360buyimg.com/imgzone/jfs/t1/173249/31/25999/2178/61d3c051Ea933a006/c53ebe70c094422d.png"
          v-if="item.userImg === 'add'"
          @click="shareCMD"
        />
        <img v-else :src="item.userImg ?? '//img10.360buyimg.com/imgzone/jfs/t1/218938/6/10162/3879/61d56cd9E0e54edd1/88aa717be1a3a959.jpg'" />
      </li>
    </ul>
    <div class="invite-button go-shop" @click="gotoShopPage(venderId)">进店逛逛</div>
  </div>
  <!-- 规则弹窗 -->
  <van-popup v-model:show="overlay.rule">
    <div class="rule">
      <div class="rule-title">活动规则</div>
      <div v-html="rule" class="rule-text"></div>
      <div class="rule-button" @click="overlay.rule = false">返回</div>
    </div>
  </van-popup>
  <!-- 我的奖品弹窗 -->
  <van-popup v-model:show="overlay.myGift">
    <div class="mygift">
      <div class="mygift-titel">我的奖品</div>
      <div class="mygift-head">
        <div>奖品名称</div>
        <div>兑换时间</div>
        <div>备注</div>
      </div>
      <div v-if="myGifts.length === 0" class="mygift-tbody">
        <p class="no-gift">暂无奖品</p>
      </div>
      <ul v-else class="mygift-tbody">
        <li class v-for="item, index in myGifts" :key="index">
          <div>{{ item.giftName }}</div>
          <div>{{ dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
          <div v-if="!item.addressFlag" @click="showAddress(item.addressId)" class="addAddress">填写地址</div>
          <div v-else>已填地址</div>
          <!-- <div
            v-else-if="item.addressFlag && dayjs(new Date()).unix() * 1000 < item.createTime + 3600 * 1000"
            @click="changeAddress(item.addressId)"
          >修改地址</div>-->
        </li>
      </ul>
      <div class="mygift-button" @click="overlay.myGift = false">返回</div>
    </div>
  </van-popup>
  <!-- 入会弹窗 -->
  <van-popup v-model:show="overlay.openCard">
    <div>
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/130872/24/26863/66817/61d3ade3E763c7ced/5de264ade6e39a20.jpg"
        class="open-card-img"
        @click="gotoOpenCard"
      />
    </div>
  </van-popup>
  <!-- 邀请成功 -->
  <van-popup v-model:show="overlay.invitationSuccessful">
    <div>
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/15744/3/19414/137127/61d3ade3Ecb64f99d/5302a0ffa0cd5b7e.jpg"
        class="open-card-img"
        @click="gotoOpenCard"
      />
    </div>
  </van-popup>
  <!-- 邀请失败 -->
  <van-popup v-model:show="overlay.invitationFail">
    <div>
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/175092/23/22764/152867/61d3ade3Ec70b1859/7a8d52a5409fa9da.jpg"
        class="open-card-img"
        @click="overlay.invitationFail = false"
      />
    </div>
  </van-popup>
  <!-- 未中奖 -->
  <van-popup v-model:show="overlay.notWinning">
    <div>
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/117486/18/26303/92656/61d3ade3Eae3d15cc/351cb9eb37a4d516.jpg"
        class="open-card-img"
        @click="overlay.notWinning = false"
      />
    </div>
  </van-popup>
  <!-- 填写地址 -->
  <van-popup v-model:show="overlay.address">
    <div class="address">
      <div class="address-titel">填写信息</div>
      <div class="address-formData">
        <div>
          <p>收件人</p>
          <input type="text" v-model="formData.receiver" maxlength="10" />
        </div>
        <div>
          <p>手机号</p>
          <input
            type="text"
            v-model="formData.phone"
            oninput="value=value.replace(/[^\d]/g,'')"
            maxlength="11"
          />
        </div>
        <div>
          <p>省/市/区</p>
          <input
            type="text"
            v-model="addressCode"
            :readonly="true"
            @click="overlay.addressSelects = true"
          />
        </div>
        <div>
          <p>详细地址</p>
          <input type="text" v-model="formData.address" />
        </div>
        <div>
          <p>邮编</p>
          <input
            type="text"
            v-model="formData.postalCode"
            oninput="value=value.replace(/[^\d]/g,'')"
            maxlength="6"
          />
        </div>
      </div>
      <div class="address-button">
        <div @click="overlay.address = false">返回</div>
        <div @click="submitCheckOut">提交</div>
      </div>
    </div>
  </van-popup>
  <!-- 获奖弹窗 -->
  <van-popup v-model:show="overlay.gift">
    <div class="overlay-gift">
      <div class="overlay-gift-titel">恭喜中奖</div>
      <p class="overlay-gift-name">恭喜您获得{{ giftList[giftIndex].giftName }}</p>
      <img class="overlay-gift-img" :src="giftListImg[giftIndex]" />
      <div class="overlay-gift-button" @click="overlay.gift = false; overlay.address = true;">填写地址</div>
    </div>
  </van-popup>
  <!--地址选择-->
  <van-popup v-model:show="overlay.addressSelects" position="bottom">
    <van-area title="请输入详细地址" :area-list="areaList" @confirm="confirmAddress" @cancel="onCancel" />
  </van-popup>
</template>

<script lang='ts' setup>
import {
  ref, inject, reactive, computed,
} from 'vue';
import {
  Toast,
  Area as vanArea,
  Popup as vanPopup,
} from 'vant';
import { areaList } from '@vant/area-data';
import dayjs from 'dayjs';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
import JD, { gotoShopPage } from '@/utils/platforms';
import './css/index.scss';

const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
const openCard: boolean = inject('isOpenCard') as boolean;

// 获取基本信息
const {
  activityId, actName, pin, venderId,
} = baseInfo;

// 设置页面title
document.title = actName;

const overlay = ref({
  openCard: false,
  gift: false,
  rule: false,
  myGift: false,
  invitationSuccessful: false,
  invitationFail: false,
  notWinning: false,
  address: false,
  addressSelects: false,
});
const rule = ref('');
const giftList: any = ref([]);
const giftListImg = [
  '//img10.360buyimg.com/imgzone/jfs/t1/208673/9/15015/425609/61d3bafdE77aecaa3/5210deee1efa7cbb.png',
  '//img10.360buyimg.com/imgzone/jfs/t1/124492/3/20529/536557/61d3bafeE7470a0b7/5dd2560acb5c59f3.png',
  '//img10.360buyimg.com/imgzone/jfs/t1/218838/16/9818/153880/61d3bafdEb5d1d0f9/5f13724c30c83ccb.png',
  '//img10.360buyimg.com/imgzone/jfs/t1/93762/11/20159/176180/61d3e7a1E571408d7/aa5d223ce6da649a.png',
];
const frindList: any = ref([]);
const assistCount = ref(0);
const myGifts: any = ref([]);
const giftIndex = ref(-1);

const myUuid = ref('');
const inviterUuid: string = inject('helpUuid') as string ?? '';

const formData = ref({
  id: '',
  activityId,
  pin,
  receiver: '',
  phone: '',
  address: '',
  postalCode: '',
  province: '',
  city: '',
  district: '',
});
const addressCode = ref('');

const formDataEmpty = () => {
  formData.value = {
    id: '',
    activityId,
    pin,
    receiver: '',
    phone: '',
    address: '',
    postalCode: '',
    province: '',
    city: '',
    district: '',
  };
  addressCode.value = '';
};

// 主接口 获取规则;
const getActivityInfo = () => {
  cjwxRequest
    .get(`/common/brand/getFullActInfoVo?activityId=${baseInfo.activityId}`)
    .then((res) => {
      if (res.data) {
        const rules = res.data.rule.split('\n');
        rule.value = rules.join('<br/>');
      }
    });
};
// 获取邀请列表
const getFindInviteList = () => {
  cjwxRequest.post('/wx/kronenbourg/invite/findInviteList', {
    activityId,
    pin,
    customerId: myUuid.value,
    pageNo: 1,
    pageSize: 10000,
  }).then((data) => {
    Toast.clear();
    if (data.result) {
      frindList.value = data.data.list;
      if (frindList.value.length < 20) {
        for (let i = 1; i <= 20 - frindList.value.length; i + 1) {
          frindList.value.push({
            userImg: 'add',
          });
        }
      }
    }
  });
};

// 主接口 活动内容信息
const getActivityContent = (callBack: (() => void) | any) => {
  Toast.loading({
    message: '加载中...',
    duration: 0,
    forbidClick: true,
  });
  cjwxRequest.post('/wx/kronenbourg/invite/activityContent', {
    activityId: baseInfo.activityId,
    pin: baseInfo.pin,
    shareUuid: inviterUuid ?? '',
  }).then((data) => {
    if (data.result) {
      myUuid.value = data.data.customerId;
      giftList.value = data.data.giftVos.sort((a: { inviteNum: number; }, b: { inviteNum: number; }) => a.inviteNum - b.inviteNum);
      assistCount.value = data.data.assistCount;
      if (data.data.openStatus === 0) {
        overlay.value.openCard = true;
      }
      if (data.data.helpStatus === 1) {
        overlay.value.openCard = false;
        overlay.value.invitationSuccessful = true;
      } else if (data.data.helpStatus === 4) {
        Toast('已助力他人，无法助力');
      } else if (data.data.helpStatus === 5) {
        overlay.value.invitationFail = true;
      }
      callBack();
    } else {
      Toast.clear();
      Toast(data.errorMessage);
    }
  });
};

const gotoOpenCard = () => {
  const returnUrl = encodeURIComponent(`https://${window.location.host}/m/1000107627/99/2201100010762701/?helpUuid=${inviterUuid}`);
  window.location.href = `https://shopmember.m.jd.com/shopcard?venderId=1000107627&channel=401&returnUrl=${returnUrl}`;
};
// 领奖接口
const convertPrize = (index: number) => {
  if (assistCount.value < giftList.value[index].inviteNum) {
    Toast('不符合条件');
    return;
  }
  Toast.loading({
    message: '领取中...',
    duration: 0,
    forbidClick: true,
  });
  cjwxRequest.post('/wx/kronenbourg/invite/receivePrize', {
    activityId: baseInfo.activityId,
    giftId: giftList.value[index].giftId,
    pin: baseInfo.pin,
  }).then((data) => {
    Toast.clear();
    if (data.result) {
      formDataEmpty();
      giftIndex.value = index;
      formData.value.id = data.data;
      overlay.value.gift = true;
      getActivityContent(() => {
        Toast.clear();
      });
    } else if (data.errorMessage === '奖品已领完，无法领取！') {
      overlay.value.notWinning = true;
    } else {
      Toast(data.errorMessage);
    }
  });
};

const submitAddress = () => {
  Toast.loading({ message: '提交中', forbidClick: true });
  setTimeout(() => {
    cjwxRequest
      .post('/common/brand/saveAddress', formData.value)
      .then((res) => {
        Toast.clear();
        if (res.result) {
          overlay.value.address = false;
          Toast('提交成功');
        } else {
          Toast(res.errorMessage);
        }
      });
  }, 1000);
};

const submitCheckOut = () => {
  const regu = /[^\u4e00-\u9fa5a-zA-Z\d,.，。（）() - - ! ！? ？]+/;
  const reg = /^\d{11}$/;
  const re = new RegExp(regu);
  if (!formData.value.receiver) {
    Toast('请输入姓名');
  } else if (re.test(formData.value.receiver)) {
    Toast('姓名不可以存在特殊字符');
  } else if (!/^1[3456789]\d{9}$/.test(formData.value.phone)) {
    Toast('请填写正确的手机号码');
  } else if (addressCode.value === '') {
    Toast('请选择地区');
  } else if (!formData.value.address) {
    Toast('请填写详细地址');
  } else if (re.test(formData.value.address)) {
    Toast('地址不可以存在特殊字符');
  } else if (!/^\d{6}$/.test(formData.value.postalCode)) {
    Toast('请填写正确的邮编');
  } else {
    submitAddress();
  }
};

interface AddressItem {
  name: string;
}
// 地址确认三级联动地址
const confirmAddress = (addressItemList: AddressItem[]) => {
  formData.value.province = addressItemList[0].name;
  formData.value.city = addressItemList[1].name;
  formData.value.district = addressItemList[2].name;
  addressCode.value = addressItemList.map((item) => item.name).join('/');
  overlay.value.addressSelects = false;
};

const onCancel = () => {
  overlay.value.addressSelects = false;
};

const showAddress = (id: string) => {
  formDataEmpty();
  formData.value.id = id;
  overlay.value.myGift = false;
  overlay.value.address = true;
};

const changeAddress = async (addressId: string) => {
  formDataEmpty();
  Toast.loading({
    message: '加载中...',
    duration: 0,
    forbidClick: true,
  });
  const res = await cjwxRequest.post('common/brand/getAddress', {
    pin,
    activityId,
    addressId,
  });
  Toast.clear();
  const { data } = res;
  if (res.result) {
    formData.value = {
      id: addressId,
      activityId,
      pin,
      receiver: data.receiver,
      phone: data.phone,
      address: data.address,
      postalCode: data.postalCode,
      province: data.province,
      city: data.city,
      district: data.district,
    };
    addressCode.value = `${data.province}/${data.city}/${data.district}`;
    overlay.value.myGift = false;
    overlay.value.address = true;
  }
};

// 我的奖品
const getDrawRecord = async () => {
  Toast.loading({
    message: '加载中...',
    duration: 0,
    forbidClick: true,
  });
  const res = await cjwxRequest.post('/common/brand/getDrawRecord', {
    activityId,
    venderId,
    pin,
  });
  const { data } = res;
  overlay.value.myGift = true;
  Toast.clear();
  myGifts.value = data;
  console.log(myGifts);
};

const shareCMD = () => {
  if (!openCard) {
    overlay.value.openCard = true;
    return;
  }
  JD.callShare({
    title: '会员组队赢大奖',
    content: '入会组队赢大奖，多种好礼等着你，快来加入我们吧！',
    shareUrl: `https://${window.location.host}/m/1000107627/99/2201100010762701/?helpUuid=${myUuid.value}`,
  });
};

const init = async () => {
  getActivityInfo();
  getActivityContent(() => {
    getFindInviteList();
  });
};
init();
</script>

<style lang='scss'>
</style>
