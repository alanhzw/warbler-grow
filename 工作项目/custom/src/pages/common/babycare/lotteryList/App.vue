<template>
  <div class="main" v-if="pageNum === 0">
    <div class="main-title"></div>
    <div class="lottery-status">
      <div v-if="lotteryStatus" class="lottery">
        <img src="./assets/lottery-title.png"/>
      </div>
      <div v-else class="no-lottery">
        <span>很遗憾未检索到您有获奖记录</span>
      </div>
      <button class="get-prize" @click="getPrizeBtn">中奖记录 ></button>
<!--      活动名单-->
      <div class="list-area" v-for="(item, i) in prizeList" :key="i">
        <div class="list-title">— {{item.name}} —</div>
        <div class="list-item-title">
          <div>奖品名称</div>
          <div>用户ID</div>
          <div>阶段时间</div>
        </div>
        <div style="overflow: scroll;height: 6rem" v-if="item.data.length > 0">
          <div class="prize-item" v-for="(it, index) in item.data" :key="index">
            <div style="margin-left: 0.5rem;width: 2.1rem;">{{it.prizeName}}</div>
            <div style="width: 1.5rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;word-break: break-all;text-align: center;">{{it.pin}}</div>
            <div style="margin-left: 0.8rem;overflow: hidden;width: 1.58rem;white-space: nowrap;word-break: break-all;">{{it.prizeTime}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="record" v-if="pageNum === 1">
<!--    <NavBar-->
<!--      title="获奖记录"-->
<!--      left-arrow-->
<!--      @click-left="pageNum = 0"-->
<!--    />-->
    <div class="record-title">
      <div>时间</div>
      <div>奖品</div>
      <div>状态</div>
    </div>
    <div class="record-list" v-if="recordList.length > 0">
      <div class="record-list-item" v-for="(item, index) in recordList" :key="index">
        <div style="width: 1.7rem;white-space: nowrap;word-break: break-all;overflow: hidden;margin-left: 0.3rem;margin-right: .5rem;">{{item.prizeTime}}</div>
        <div style="width: 3rem;">{{item.prizeName}}</div>
        <div v-if="item.actualPrizeAddress === '是'" style="width: 2.5rem;color: #3e6dda;" @click="tofix(item.prizeName, item.prizeTime, item.activityName)">
          <div v-if="item.flag === '1'">
            <span>已填写</span>
          </div>
          <div v-else>
            <span>填写地址</span>
            <Icon name="edit" color="#3e6dda"/>
          </div>
        </div>
        <div v-else style="width: 2.5rem;">{{item.virtualPrizeStatus}}</div>
      </div>
    </div>
    <div v-else style="width: 100%;height: 3rem;display: flex;justify-content: center;align-items: center;">暂无中奖信息</div>
    <div class="check-btn" @click="pageNum = 0">返回</div>
<!--    <Icon name="edit" color="#3e6dda"/>-->
  </div>
  <div class="fixInfo" v-if="pageNum === 2">
<!--    <NavBar-->
<!--      title="恭喜您中奖啦"-->
<!--      left-arrow-->
<!--      @click-left="getPrizeBtn"-->
<!--    />-->
    <div class="input-area">
      <div class="input-format">
        <div class="input-text">收货人</div>
        <input
          class="input-content"
          type="text"
          v-model="formData.receiver"
          placeholder="请输入收货人姓名"
          maxlength="10"
        />
      </div>
      <div class="input-format">
        <div class="input-text">联系电话</div>
        <input
          class="input-content"
          type="text"
          v-model="formData.phone"
          placeholder="请输入收货人手机号"
          oninput="value=value.replace(/[^\d]/g,'')"
          maxlength="11"
        />
      </div>
      <div class="input-format">
        <div class="input-text">所在地区</div>
        <input
          class="input-content"
          type="text"
          v-model="addressCode"
          readonly="readonly"
          placeholder="省市区县、乡镇等"
          @click="addressSelects = true"
        />
      </div>
      <div class="input-format">
        <div class="input-text">详细地址</div>
        <input
          class="input-content"
          type="text"
          v-model="formData.address"
          placeholder="街道、楼牌号等"
          maxlength="30"
        />
      </div>
    </div>
    <div class="text-alert">*实物会在30个工作日内发出，请耐心等待哦~</div>
    <div class="check-btn" @click="submitCheckOut">确认提交</div>
  </div>
  <div class="success" v-if="pageNum === 3">
    <div class="success-area">
      <img src="./assets/icon.png" style="width: 1rem;margin-top: 1rem;"/>
      <div>{{formData.receiver}}</div>
      <div>{{formData.phone}}</div>
      <div>{{formData.province}}-{{formData.city}}-{{formData.district}}-{{formData.address}}</div>
    </div>
    <div class="check-btn" @click="getPrizeBtn">提交成功</div>
  </div>
  <!--地址选择-->
  <Popup v-model:show="addressSelects" position="bottom">
    <Area
      title="请输入详细地址"
      :area-list="areaList"
      @confirm="confirmAddress"
      @cancel="onCancel"
    />
  </Popup>

</template>

<script lang='ts' setup>
import { ref, inject, computed } from 'vue';
import {
  Popup, Toast, Overlay, Dialog, Checkbox, Area, NavBar, Icon,
} from 'vant';
import { areaList } from '@vant/area-data';
import dayjs from 'dayjs';
import { reportAssistEvent, reportJoinEvent, reportShareEvent } from '@/utils/trackEvent/jdReport';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
import { setHeaderShare, callShare, gotoShopPage, gotoSkuPage } from '@/utils';
import './assets/style.scss';

const shareChannel = ['Wxfriends', 'Wxmoments', 'Sinaweibo', 'QQfriends', 'QQzone'];
// 获取基本信息
const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
const {
  activityId, actName, pin, venderId, shopId,
} = baseInfo;
// 完善信息弹窗
const fixInfoShow = ref(false);
// 完善信息内容
const formData = ref({
  giftRecordId: '',
  receiver: '',
  phone: '',
  address: '',
  postalCode: '',
  personalID: '',
  province: '',
  city: '',
  district: '',
});
// 省市区地址
const addressCode = ref('');
// 地址上拉弹窗
const addressSelects = ref(false);
// 中奖状态
const lotteryStatus = ref(false);
// 名单名称列表
const prizeNameList = ref([]);
// 名单列表
const prizeList = ref([]);
// 页面切换
const pageNum = ref(0);
// 名单索引
// let listNum = 0;
// 获奖记录
const recordList = ref([]);
// 暂存奖品名称
const nowPrizeName = ref('');
// 暂存获奖时间
const nowPrizeTime = ref('');
// 暂存活动名称
const nowActivityName = ref('');
/*--------------------------------------------------------------------------------------------*/
// 开启弹窗
const openDialog = (status: string) => {
  if (status === 'userFix') {
    fixInfoShow.value = true;
  }
};
// 关闭弹窗
const closeDialog = (status: string) => {
  if (status === 'userFix') {
    fixInfoShow.value = false;
  }
};
// 去完善页
const tofix = (prizeName, prizeTime, activityName) => {
  nowPrizeName.value = prizeName;
  nowPrizeTime.value = prizeTime;
  nowActivityName.value = activityName;
  pageNum.value = 2;
  // eslint-disable-next-line no-use-before-define
  backInfo();
};
// 判断用户是否在本期获奖
const isDrawSuccess = (activityName) => {
  cjwxRequest.post('/babycare/prizelist/isDrawSuccess', {
    activityName,
  }).then((res) => {
    if (res.result) {
      lotteryStatus.value = res.result;
    }
  });
};
// 活动主接口
const activityContent = (activityName, index) => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/babycare/prizelist/main', {
    activityName,
  }).then((res) => {
    if (res.result) {
      res.data.forEach((i, n) => {
        // i.prizeTime = dataChange(i.prizeTime);
        i.prizeTime = dayjs(i.prizeTime).format('YYYY-MM-DD HH:mm:ss');
      });
      // prizeNameList.value[listNum] = activityName;
      // prizeList.value[listNum] = res.data;
      prizeList.value.push({
        id: index,
        name: activityName,
        data: res.data,
      });
      console.log(index);
      prizeList.value.sort((a, b) => a.id - b.id);
      // listNum += 1;
      // `const prizeList${listNum}` = res.data;
      // console.log(activityName);
    } else {
      Toast(res.errorMessage);
    }
  });
};
// 获取活动名称入参
const getActiveName = () => {
  cjwxRequest.post('/babycare/prizelist/activityName', {
    activityId: 2201100001656101,
  }).then((res) => {
    // res = {
    //   result: true,
    //   data: [
    //     '12.9-12.14双12Airpro加量装返卡名单',
    //     '1',
    //     '2',
    //     'dw',
    //     '3',
    //     'ed',
    //     '4',
    //     '5',
    //     'dwdaded',
    //   ],
    //   count: 0,
    //   errorMessage: '成功获取活动名称',
    // };
    if (res.result) {
      res.data.forEach((id, index) => {
        activityContent(id, index);
        isDrawSuccess(id);
      });
    } else {
      Toast(res.errorMessage);
    }
  });
};
// 获取个人界面奖品名单
const getPerprize = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/babycare/prizelist/personal', {
    pin,
  }).then((res) => {
    if (res.result) {
      res.data.forEach((i, n) => {
        // i.prizeTime = dataChange(i.prizeTime);
        i.prizeTime = dayjs(i.prizeTime).format('YYYY-MM-DD HH:mm:ss');
      });
      recordList.value = res.data;
    } else {
      Toast(res.errorMessage);
    }
  });
};
// 点击获取中奖记录
const getPrizeBtn = () => {
  getPerprize();
  pageNum.value = 1;
};
// 关闭三联地址框
const onCancel = () => {
  addressSelects.value = false;
};
// 确认三联地址信息
const confirmAddress = (addressItemList: any[]) => {
  console.log(addressItemList);
  formData.value.province = addressItemList[0].name;
  formData.value.city = addressItemList[1].name;
  formData.value.district = addressItemList[2].name;
  addressCode.value = addressItemList.map((item) => item.name).join('/');
  addressSelects.value = false;
};
// 置空信息内容
const formDataEmpty = () => {
  formData.value = {
    giftRecordId: '',
    receiver: '',
    phone: '',
    address: '',
    postalCode: '',
    personalID: '',
    province: '',
    city: '',
    district: '',
  };
  addressCode.value = '';
};
// 提交用户信息
const recordInfo = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/babycare/prizelist/insert', {
    receiver: formData.value.receiver,
    phone: formData.value.phone,
    address: `${formData.value.province}-${formData.value.city}-${formData.value.district}-${formData.value.address}`,
    activityName: nowActivityName.value,
    prizeName: nowPrizeName.value,
    pin,
    prizeTime: nowPrizeTime.value,
  }).then((res) => {
    if (res.result) {
      pageNum.value = 3;
      // Toast('提交成功');
    } else {
      Toast(res.errorMessage);
    }
  });
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
    Toast('姓名不能为空');
  } else if (spcWord.test(formData.value.receiver)) {
    Toast('姓名不能包含特殊符号');
  } else if (faceWord.test(formData.value.receiver)) {
    Toast('姓名不能包含表情符号');
  } else if (whitespace.test(formData.value.receiver)) {
    Toast('姓名不能包含空格');
  } else if (!(/^1(3|4|5|7|8|9)\d{9}$/.test(formData.value.phone))) {
    Toast('请输入正确的手机号');
  } else if (!addressCode.value) {
    Toast('请选择地区');
  } else if (!formData.value.address) {
    Toast('详细地址不能为空');
  } else if (faceWord.test(formData.value.address)) {
    Toast('详细地址不能包含表情符号');
  } else if (whitespace.test(formData.value.address)) {
    Toast('详细地址不能包含空格');
  } else {
    recordInfo();
  }/* else if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(formData.value.personalID))) {
    Toast('请输入有效身份证号');
  } */
// else if (!formData.value.postalCode) {
//     Toast('请输入邮政编码');
//   } else if (!(/^\d{6}$/.test(formData.value.postalCode))) {
//     Toast('请输入正确邮编');
//   }
};
// 回显信息
const backInfo = () => {
  cjwxRequest.post('/babycare/prizelist/getListVO', {
    activityName: nowActivityName.value,
    prizeName: nowPrizeName.value,
    pin,
    prizeTime: nowPrizeTime.value,
  }).then((res) => {
    if (res.result) {
      let infoArray = [];
      infoArray = res.data.address.split('-');
      // eslint-disable-next-line prefer-destructuring
      formData.value.province = infoArray[0];
      // eslint-disable-next-line prefer-destructuring
      formData.value.city = infoArray[1];
      // eslint-disable-next-line prefer-destructuring
      formData.value.district = infoArray[2];
      // eslint-disable-next-line prefer-destructuring
      formData.value.address = infoArray[3];
      addressCode.value = `${formData.value.province}/${formData.value.city}/${formData.value.district}`;
      formData.value.receiver = res.data.receiver;
      formData.value.phone = res.data.phone;
      if (infoArray.length > 0) {
        pageNum.value = 3;
      }
    } else {
      Toast(res.errorMessage);
    }
  });
};
// activityContent();
getActiveName();
</script>

<style lang='scss'>
</style>
