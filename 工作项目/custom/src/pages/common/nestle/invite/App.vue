<template>
  <div class="kv-area">
    <!--    kv图-->
    <img class="main-kv" :src="actList.activityKv"/>
    <!--    规则按钮-->
    <div class="rule-btn" :style="{backgroundColor: btnColor}" @click="openDialog('ruleState')">活动规则</div>
    <!--    奖品按钮-->
    <div class="prize-btn" :style="{backgroundColor: btnColor}" @click="openDialog('prizeState')">我的奖品</div>
    <!--    立即参与-->
    <div class="share-top" :style="{backgroundColor: btnColor}" @click="share">立即参与</div>
  </div>
  <!--    开卡按钮-->
  <div class="open-area">
    <img :src="actList.titleImg1" style="width: 100%"/>
    <img :src="actList.titleImg2" class="open-bg" @click="gotoCard"/>
    <!--    <div class="goMem-btn" @click="gotoCard"></div>-->
  </div>
  <!--    领取京豆-->
  <div class="bean-area" v-if="beanList">
    <img :src="actList.titleImg3" style="width: 100%"/>
    <div style="position: relative;height: 100%;display: flex;flex-direction: column;">
      <img class="share-prize" :src="actList.titleImg4"/>
      <div class="getBean-area">
        <div v-for="item in beanList" :key="item.drawInfoId" class="bean-btn" :class="{'gray-cover': helpNum < item.shareTimes}">
          <div v-if="helpNum >= item.shareTimes" @click="getBean(item.drawInfoId, item.type, 1)"></div>
          <div v-else>
            <span>未达到领取条件</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--    立即邀请-->
  <div class="share-area">
    <img :src="actList.titleImg5" style="width: 100%;"/>
    <img :src="actList.titleImg9" style="width: 96%;" @click="share"/>
    <!--    <div class="share-num">{{maxSort}}</div>-->
  </div>
  <!--    奖励榜单-->
  <div class="prize-area" v-if="prizeList">
    <img :src="actList.titleImg6" style="width: 100%"/>
    <div class="prizeBtn-area" :style="{borderColor: kvColor}">
      <div v-for="item in prizeList" :key="item.giftName" :style="{backgroundImage: `linear-gradient(180deg, white, ${kvColor} 500%)`}">
        <img :src="item.showImage" style="width: 40%;margin: .4rem 0 0 .4rem;"/>
        <div style="display: flex;flex-direction: column;position: absolute;height: 72%;width: 55%;right: 0;top: 0;align-items: center;justify-content: flex-end;">
          <div class="getPrize-text" :style="{backgroundImage: `linear-gradient(180deg, ${btnColor}, black)`}">{{item.giftName}}</div>
          <div class="getPrize-btn" :style="{backgroundColor: btnColor}">
            <div v-if="item.startSort === item.endSort">
              排行榜第{{item.startSort}}名领取奖励 >>
            </div>
            <div v-else>排行榜第{{item.startSort}}~{{item.endSort}}名领取奖励 >></div>
            <!--            <div v-if="mySort >= item.startSort && mySort <= item.endSort" @click="getPrize">-->
            <!--            排行榜{{item.startSort}}~{{item.endSort}}名领取奖励 >></div>-->
            <!--            <div v-else @click="noPrizeAlert">排行榜{{item.startSort}}~{{item.endSort}}名领取奖励 >></div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--    助力人数-->
  <div class="friend-list-area">
    <img :src="actList.titleImg7"/>
    <div class="friend-list-view">
      <div class="friend-num" :style="{backgroundImage: `linear-gradient(180deg, ${btnColor}, black)`}">助力我的好友人数: {{helpNum}}人</div>
      <div class="friend-title" :style="{color: btnColor}">
        <div>TOP</div>
        <div>用户名</div>
        <div>人数</div>
      </div>
      <div class="friend-list">
        <div class="friend-item" v-for="item in helpList" :key="item.sort" :style="{color: btnColor}">
          <div>{{item.sort}}</div>
          <div style="margin-left: .4rem">{{item.nick}}</div>
          <div style="width: 1.5rem">{{item.inviteNum}}人</div>
        </div>
      </div>
      <div class="getHelpPrize-btn" :style="{backgroundColor: btnColor}" @click="getPrize(2)">领取奖品>></div>
    </div>
  </div>
  <!--    好货推荐-->
  <div class="sku-area" v-if="skusList.length > 0">
    <img :src="actList.titleImg8"/>
    <div class="sku-list">
      <div class="sku-item" :style="{color: btnColor}" v-for="item in skusList" :key="item.id">
        <img :src="item.logo"/>
        <div>{{item.skuName}}</div>
        <div class="sku-btn" :style="{backgroundColor: btnColor}" @click="gotoSkuPage(item.skuId);goskuPoint">立即购买 >></div>
      </div>
    </div>
  </div>
  <!--    进店逛逛-->
  <div class="goshop-area">
    <div class="go-shop" :style="{backgroundColor: btnColor}" @click="gotoShopPage(shopId);goshopPoint">进店逛逛> </div>
  </div>

  <!--  规则弹窗-->
  <Popup class="overlay" v-model:show="rulesShow" :close-on-click-overlay="false">
    <div class="wrapper">
      <div class="rules-view" :style="{background:`url(${actList.popupImg2}) no-repeat`, backgroundSize: '100%'}">
        <div class="ruleView-area">
          <div style="padding-right: .11rem" v-html="rule"></div>
        </div>
        <div class="close-btn" @click="closeDialog('ruleState')"></div>
      </div>
    </div>
  </Popup>
  <!--  奖品弹窗-->
  <Overlay class="overlay" v-model:show="myPrizeShow" :close-on-click-overlay="false">
    <div class="wrapper">
      <div class="myPrize-view" :style="{background:`url(${actList.popupImg3}) no-repeat`, backgroundSize: '100%'}">
        <div class="myPrizeView-area">
          <div v-if="myPrizeList.length > 0">
            <div v-for="item in myPrizeList" :key="item.giftName">
              <div class="myprize-item">
                <div style="width: 1.6rem;">{{item.drawTime}}</div>
                <div style="width: 2.2rem;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;text-align: center;}">{{item.giftName}}</div>
                <div>已领取</div>
              </div>
            </div>
          </div>
          <div v-else class="noprize-item">暂无获奖记录</div>
        </div>
        <div class="close-btn" @click="closeDialog('prizeState')"></div>
      </div>
    </div>
  </Overlay>
  <!--非会员弹窗-->
  <Overlay class="overlay" v-model:show="noMemberShow" :close-on-click-overlay="false">
    <div class="wrapper">
      <div class="noMem-view" :style="{background:`url(${actList.popupImg}) no-repeat`, backgroundSize: '100%'}">
        <div class="text-area">
          <div :style="{backgroundImage: `linear-gradient(45deg, black, ${kvColor})`}">
            <div>您还不是{{shopName}}会员,</div>
            <div>开通会员参与邀请挑战,</div>
            <div>赢多重好礼</div>
          </div>
        </div>
        <div class="gotoOpen" @click="gotoCard">立即开卡></div>
        <div class="close-btn" @click="closeDialog('noMem')"></div>
      </div>
    </div>
  </Overlay>
  <!--    领取京豆弹窗-->
  <Overlay class="overlay" v-model:show="getBeanShow" :close-on-click-overlay="false">
    <div class="wrapper">
      <div class="getBean-view" :style="{background:`url(${actList.popupImg}) no-repeat`, backgroundSize: '100%'}">
        <div class="text-area">
          <div :style="{backgroundImage: `linear-gradient(45deg, black, ${kvColor})`}">
            <div>领取成功,继续参与挑战</div>
            <div>赢Top好礼</div>
          </div>
        </div>
        <div class="gotoShop" @click="gotoShopPage(shopId);goshopPoint">进店逛逛></div>
        <div class="close-btn" @click="closeDialog('getBean')"></div>
      </div>
    </div>
  </Overlay>
  <!--  助力成功弹窗-->
  <Overlay class="overlay" v-model:show="helpSuccessShow" :close-on-click-overlay="false">
    <div class="wrapper">
      <div class="helpSuccess-view" :style="{background:`url(${actList.popupImg}) no-repeat`, backgroundSize: '100%'}">
        <div class="text-area">
          <div :style="{backgroundImage: `linear-gradient(45deg, black, ${kvColor})`}">
            <div>恭喜您, 助力成功！</div>
            <div>参与人气比拼, 赢TOP好礼</div>
          </div>
        </div>
        <div class="goHome" @click="goHomePage">我也要挑战></div>
        <div class="close-btn" @click="closeDialog('helpSuccess')"></div>
      </div>
    </div>
  </Overlay>
  <!--  助力失败弹窗-->
  <Overlay class="overlay" v-model:show="helpfailedShow" :close-on-click-overlay="false">
    <div class="wrapper">
      <div class="helpfailed-view" :style="{background:`url(${actList.popupImg}) no-repeat`, backgroundSize: '100%'}">
        <div class="text-area">
          <div :style="{backgroundImage: `linear-gradient(45deg, black, ${kvColor})`}">
            <div>您已是{{shopName}}会员</div>
            <div>无法助力好友哦~</div>
            <div>参与拉人挑战赢多重好礼</div>
          </div>
        </div>
        <div class="goHome" @click="goHomePage">我也要挑战></div>
        <div class="close-btn" @click="closeDialog('helpfailed')"></div>
      </div>
    </div>
  </Overlay>
  <!--  未到开奖时间-->
  <Overlay class="overlay" v-model:show="noStartShow" :close-on-click-overlay="false">
    <div class="wrapper">
      <div class="noStart-view" :style="{background:`url(${actList.popupImg}) no-repeat`, backgroundSize: '100%'}">
        <div class="text-area">
          <div :style="{backgroundImage: `linear-gradient(45deg, black, ${kvColor})`}">
            <div>未到领取时间,继续参与挑战</div>
            <div>赢Top好礼</div>
          </div>
        </div>
        <div class="gotoShop" @click="gotoShopPage(shopId);goshopPoint">进店逛逛></div>
        <div class="close-btn" @click="closeDialog('noStart')"></div>
      </div>
    </div>
  </Overlay>
  <!--  未中奖弹窗-->
  <Overlay class="overlay" v-model:show="noLotteryShow" :close-on-click-overlay="false">
    <div class="wrapper">
      <div class="noLottery-view" :style="{background:`url(${actList.popupImg}) no-repeat`, backgroundSize: '100%'}">
        <div class="text-area">
          <div :style="{backgroundImage: `linear-gradient(45deg, black, ${kvColor})`}">
            <div>很抱歉, 您不符合</div>
            <div>领奖条件, 请您关注店铺其他活动</div>
          </div>
        </div>
        <div class="gotoShop" @click="gotoShopPage(shopId);goshopPoint">进店逛逛</div>
        <div class="close-btn" @click="closeDialog('noLottery')"></div>
      </div>
    </div>
  </Overlay>
  <!--  已开奖不能助力-->
  <Overlay class="overlay" v-model:show="startedShow" :close-on-click-overlay="false">
    <div class="wrapper">
      <div class="started-view" :style="{background:`url(${actList.popupImg}) no-repeat`, backgroundSize: '100%'}">
        <div class="text-area">
          <div :style="{backgroundImage: `linear-gradient(45deg, black, ${kvColor})`}">
            <div>邀请结束，活动已开奖</div>
            <div>点击领取奖品去查看中奖结果吧</div>
          </div>
        </div>
        <div class="gotoShop" @click="gotoShopPage(shopId);goshopPoint">进店逛逛</div>
        <div class="close-btn" @click="closeDialog('started')"></div>
      </div>
    </div>
  </Overlay>
  <!--  中消费榜实物弹窗-->
  <Overlay class="overlay" v-model:show="getLotteryShow" :close-on-click-overlay="false">
    <div class="wrapper">
      <div class="getLottery-view" :style="{background:`url(${actList.popupImg}) no-repeat`, backgroundSize: '100%'}">
        <div class="text-area">
          <div :style="{backgroundImage: `linear-gradient(45deg, black, ${kvColor})`}">
            <div>恭喜您, 成功获得实物奖励</div>
            <div>请点击登记信息</div>
          </div>
        </div>
        <div class="fix-info" @click="closeDialog('getLottery');openDialog('userFix')">登记信息</div>
        <div class="close-btn" @click="closeDialog('getLottery')"></div>
      </div>
    </div>
  </Overlay>
  <!--  中消费榜非实物弹窗-->
  <Overlay class="overlay" v-model:show="lotteryBeanShow" :close-on-click-overlay="false">
    <div class="wrapper">
      <div class="lotteryBean-view" :style="{background:`url(${actList.popupImg}) no-repeat`, backgroundSize: '100%'}">
        <div class="text-area">
          <div :style="{backgroundImage: `linear-gradient(45deg, black, ${kvColor})`}">
            <div>恭喜您, 成功领取{{prizeName}}奖励</div>
            <div>注意查收{{prizeName}}到账情况, </div>
            <div>未到账请联系客服</div>
          </div>
        </div>
        <div class="gotoShop" @click="gotoShopPage(shopId);goshopPoint">进店逛逛</div>
        <div class="close-btn" @click="closeDialog('lotteryBean')"></div>
      </div>
    </div>
  </Overlay>
  <!--  完善信息弹窗-->
  <Popup class="overlay" v-model:show="fixInfoShow" :close-on-click-overlay="false">
    <div class="wrapper">
      <div class="fixInfo-view" :style="{background:`url(${actList.popupImg1}) no-repeat`, backgroundSize: '100%'}">
        <div class="address-formData">
          <input
            type="text"
            v-model="formData.receiver"
            placeholder="收货人姓名"
            maxlength="10"
          />
          <input
            type="text"
            v-model="formData.phone"
            placeholder="收货人手机号"
            oninput="value=value.replace(/[^\d]/g,'')"
            maxlength="11"
          />
          <input
            type="text"
            v-model="addressCode"
            readonly="readonly"
            placeholder="选择省/市/区"
            @click="addressSelects = true"
          />
          <input
            type="text"
            v-model="formData.address"
            placeholder="街道门牌号"
            maxlength="30"
          />
          <input
            type="text"
            v-model="formData.postalCode"
            placeholder="邮政编码"
            oninput="value=value.replace(/[^\d]/g,'')"
            maxlength="6"
          />
          <!--          <input-->
          <!--            type="text"-->
          <!--            v-model="formData.personalID"-->
          <!--            placeholder="身份证18位"-->
          <!--            style="width: 82%;"-->
          <!--            onkeyup="value=value.replace(/[^0-9xX]/g,'');value=value.toUpperCase()"-->
          <!--            maxlength="18"-->
          <!--          />-->
        </div>
        <div class="submit-btn" @click="submitCheckOut"></div>
        <div class="close-btn" @click="closeDialog('userFix')"></div>
      </div>
    </div>
  </Popup>
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
  Popup, Toast, Overlay, Dialog, Checkbox, Area,
} from 'vant';
import { areaList } from '@vant/area-data';
import { reportAssistEvent, reportJoinEvent, reportShareEvent } from '@/utils/trackEvent/jdReport';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
import { setHeaderShare, callShare, gotoShopPage, gotoSkuPage } from '@/utils';

const shareChannel = ['Wxfriends', 'Wxmoments', 'Sinaweibo', 'QQfriends', 'QQzone'];

// 数据
const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
// 规则
const rule = ref('');
// 是否开卡表示是否注册
// const isOpenCarded: boolean = inject('isOpenCard') as boolean;
const isOpenCarded = ref(false);
// 开卡弹窗
const noMemberShow = ref(false);
// 规则弹窗
const rulesShow = ref(false);
// 奖品弹窗
const myPrizeShow = ref(false);
// 领取京豆弹窗
const getBeanShow = ref(false);
// 助力成功弹窗
const helpSuccessShow = ref(false);
// 助力失败弹窗
const helpfailedShow = ref(false);
// 未到开奖时间
const noStartShow = ref(false);
// 未中奖弹窗
const noLotteryShow = ref(false);
// 已中奖弹窗
const getLotteryShow = ref(false);
// 中排行榜非实物弹窗
const lotteryBeanShow = ref(false);
// 已开奖弹窗
const startedShow = ref(false);
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
// 获取活动id
const activityId = ref<string>(baseInfo.activityId);
// 获取店铺id
const shopId = ref<string>(baseInfo.shopId);
const venderId = ref<string>(baseInfo.venderId);
// 用户Pin
const userPin = ref<string>(baseInfo.pin);
// 曝光商品列表
const skusList = ref([]);
// id
const myUuid = ref('');
// url截取的助力人id
let helpUuid: string = inject('helpUuid') as string;
console.log(`助力人${helpUuid}`);
// 京豆列表
const beanList = ref([]);
// 实物状态
const prizeStatus = ref('');
// 实物列表
const prizeList = ref([]);
// 助力人数
const helpNum = ref('');
// 主数据信息
const actList = ref<any>([]);
// 最高排名
const maxSort = ref('');
// 我的排名
const mySort = ref('');
// 助力人列表
const helpList = ref([]);
// 助力状态
const helpStatus = ref('');
// 我的奖品列表
const myPrizeList = ref([]);
// 求助人是否为本人
const needInvite = ref(false);
// 中奖礼品名
const prizeName = ref('');
// 活动底色
const kvColor = ref('');
// 按钮配色
const btnColor = ref('');
// sid
const sid = ref('');
// userShopId
const userShopId = ref<number>();
// 店铺类型(0:pop; 1:自营)
const venderType = ref('');
// 店铺名
const shopName = ref('');
// 获取领奖类型
const getType = ref();
// 渠道号
const channelNum = ref();
// 已邀请
const isinviteDone = ref(false);
/*--------------------------------------------------------------------------------------------*/
// 开启弹窗
const openDialog = (status: string) => {
  if (status === 'noMem') {
    noMemberShow.value = true;
  } else if (status === 'ruleState') {
    rulesShow.value = true;
  } else if (status === 'prizeState') {
    myPrizeShow.value = true;
  } else if (status === 'getBean') {
    getBeanShow.value = true;
  } else if (status === 'helpSuccess') {
    helpSuccessShow.value = true;
  } else if (status === 'helpfailed') {
    helpfailedShow.value = true;
  } else if (status === 'noStart') {
    noStartShow.value = true;
  } else if (status === 'noLottery') {
    noLotteryShow.value = true;
  } else if (status === 'getLottery') {
    getLotteryShow.value = true;
  } else if (status === 'lotteryBean') {
    lotteryBeanShow.value = true;
  } else if (status === 'userFix') {
    fixInfoShow.value = true;
  } else if (status === 'started') {
    startedShow.value = true;
  }
};
// 关闭弹窗
const closeDialog = (status: string) => {
  if (status === 'noMem') {
    noMemberShow.value = false;
  } else if (status === 'ruleState') {
    rulesShow.value = false;
  } else if (status === 'prizeState') {
    myPrizeShow.value = false;
  } else if (status === 'getBean') {
    getBeanShow.value = false;
  } else if (status === 'helpSuccess') {
    helpSuccessShow.value = false;
  } else if (status === 'helpfailed') {
    helpfailedShow.value = false;
  } else if (status === 'noStart') {
    noStartShow.value = false;
  } else if (status === 'noLottery') {
    noLotteryShow.value = false;
  } else if (status === 'getLottery') {
    getLotteryShow.value = false;
  } else if (status === 'lotteryBean') {
    lotteryBeanShow.value = false;
  } else if (status === 'userFix') {
    fixInfoShow.value = false;
  } else if (status === 'started') {
    startedShow.value = false;
  }
};
// 开卡状态查询
const checkOpenStatus = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/crmCard/common/coupon/getOpenCardStatusWithOutSelf', {
    venderId: venderId.value,
    activityId: activityId.value,
  }).then((res) => {
    isOpenCarded.value = res.openCard;
    console.log(`真的开卡状态${isOpenCarded.value}`);
  });
};
// 时间戳转换
const appendZero = (obj: number) => {
  if (obj < 10) {
    return `0${obj}`;
  }
  return obj;
};
const dataChange = (date: any) => {
  if (date === null) {
    return '';
  }
  const time = date;
  const now = new Date(time);
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const dateStr = `${year}/${appendZero(month)}/${appendZero(day)}`;
  return dateStr;
};
// 获取活动信息;
const getActivityInfo = () => {
  cjwxRequest
    .get(`/common/brand/getFullActInfoVo?activityId=${baseInfo.activityId}`)
    .then((res: { data: { rule: string; }; }) => {
      if (res.data) {
        const rules = res.data.rule.split('\r');
        rule.value = rules.join('<br/>');
      }
    });
};
// 获取开卡链接
const getOpen = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/wxActionCommon/getShopInfoVO', {
    userId: venderId.value,
  }).then((res) => {
    if (res.result) {
      // sid.value = res.data.sid;
      userShopId.value = res.data.userId;
      shopName.value = res.data.shopName;
      if (helpUuid === undefined) {
        helpUuid = null;
      }
      // eslint-disable-next-line no-use-before-define
      checkChannel();
    } else {
      Toast(res.errorMessage);
    }
  });
};
const checkChannel = () => {
  if (userShopId.value === 1000088787) {
    channelNum.value = 'https://shopmember.m.jd.com/shopcard/?venderId=1000088787&shopId=1000088787&venderType=1&channel=7880&sceneval=2&jxsid=16346939349370206900';
  } else if (userShopId.value === 1000225742) {
    channelNum.value = 'https://shopmember.m.jd.com/shopcard/?venderId=1000225742&shopId=1000225742&venderType=1&channel=7890&sceneval=2&jxsid=16346939349370206900';
  } else if (userShopId.value === 1000017162) {
    channelNum.value = 'https://shopmember.m.jd.com/shopcard/?venderId=1000017162&shopId=1000017162&venderType=1&channel=7891&sceneval=2&jxsid=16346939349370206900';
  } else if (userShopId.value === 1000381925) {
    channelNum.value = 'https://shopmember.m.jd.com/shopcard/?venderId=1000381925&shopId=1000381925&venderType=1&channel=7892&sceneval=2&jxsid=16346939349370206900';
  } else if (userShopId.value === 1000278417) {
    channelNum.value = 'https://shopmember.m.jd.com/shopcard/?venderId=1000278417&shopId=1000278417&venderType=1&channel=7893&sceneval=2&jxsid=16346939349370206900';
  } else if (userShopId.value === 744279 || userShopId.value === 748988) {
    channelNum.value = 'https://shopmember.m.jd.com/shopcard/?venderId=748988&shopId=744279&venderType=0&channel=7894&sceneval=2&jxsid=16346939349370206900';
  }
};

// 分享埋点
// function sharePoint() {
//   cjwxRequest.post('/nestle/invite/shareWritePersonInfo', {
//     activityId: activityId.value,
//     pin: userPin.value,
//   });
// }
const sharePoint = () => {
  cjwxRequest.post('/nestle/invite/shareWritePersonInfo', {
    activityId: activityId.value,
    pin: userPin.value,
  });
  // reportClick('share', { shopId: baseInfo.shopId, pin: baseInfo.pin, jdActivityId: baseInfo.jdActivityId, shareUserId: myUuid.value, activityType: baseInfo.activityType });
};

/*--------------------------------------------------------------------------------------------*/
// 浏览店铺埋点
const goshopPoint = () => {
  cjwxRequest.post('/nestle/invite/scanShopWritePersonInfo', {
    activityId: activityId.value,
    pin: userPin.value,
  });
};
// 浏览商品埋点
const goskuPoint = () => {
  cjwxRequest.post('/nestle/invite/scanGoodsWritePersonInfo', {
    activityId: activityId.value,
    pin: userPin.value,
  });
};
// 活动主接口
const activityContent = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/nestle/invite/activityContent', {
    activityId: activityId.value,
    pin: userPin.value,
    helpUuid,
  }).then((res) => {
    if (res.result) {
      // beanStatus.value = res.data.sharePrizeRecord;
      maxSort.value = res.data.maxSort;
      helpNum.value = res.data.inviteNum;
      mySort.value = res.data.rangSort;
      helpStatus.value = res.data.helpStatus;
      needInvite.value = res.data.isInvite;
      myUuid.value = res.data.customerId;
      venderType.value = res.data.venderType;
      btnColor.value = res.data.nestleInviteActivity.buttonColor;
      kvColor.value = res.data.nestleInviteActivity.activityColor;
      actList.value = res.data.nestleInviteActivity;
      beanList.value = res.data.nestleInviteSharePrizeVOs;
      prizeList.value = res.data.nestleInviteRankingPrizeVOs;
      isinviteDone.value = res.data.inviteDone;
      document.querySelector('#app').setAttribute('style', `background:${res.data.nestleInviteActivity.activityColor}`);
      document.title = res.data.nestleInviteActivity.actName;
      if (res.data.inviteDone) {
        // eslint-disable-next-line no-use-before-define
        // goHomePage();
        openDialog('started');
      } else if (res.data.isInvite) {
        if (res.data.helpStatus === 1) {
          // 助力成功弹窗
          openDialog('helpSuccess');
          reportAssistEvent(myUuid.value);
          reportJoinEvent();
        } else if (res.data.helpStatus !== 1) {
          if (isOpenCarded.value) {
            // 已是会员无法助力弹窗
            openDialog('helpfailed');
            reportJoinEvent();
          } else {
            openDialog('noMem');
          }
        }
      }

      if (isOpenCarded.value && res.data.inviteDone === false) {
        setHeaderShare({
          type: baseInfo.shareType,
          title: actList.value.shareTitle as string,
          imageUrl: actList.value.shareImg as string,
          shareUrl: `https://${window.location.host}/m/common/nestle/invite/?venderId=${venderId.value}&activityId=${activityId.value}&helpUuid=${myUuid.value}` as string,
          afterShare: () => {
            reportShareEvent();
            sharePoint();
          },
          channel: shareChannel.join(','),
        });
      }
    } else {
      Toast(res.errorMessage);
    }
  });
};
// 无实物领取资格提醒
const noPrizeAlert = () => {
  Toast('抱歉，您不满足领取资格');
};
// 获取京豆奖励
const getBean = (beanId: any, prizetype: number, gettype: number) => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/nestle/invite/getSharePrize', {
    activityId: activityId.value,
    pin: userPin.value,
    drawInfoId: beanId,
  }).then((res) => {
    if (res.result) {
      if (prizetype === 7) {
        openDialog('getLottery');
        getType.value = gettype;
      } else {
        // 领取成功弹窗
        openDialog('getBean');
      }
      // eslint-disable-next-line no-use-before-define
      getMyprizeList();
    } else {
      Toast(res.errorMessage);
    }
  });
};
// 获取实物奖励
const getPrize = (prizetype: number) => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/nestle/invite/getRankingPrize', {
    activityId: activityId.value,
    pin: userPin.value,
  }).then((res) => {
    if (res.result) {
      prizeStatus.value = res.data;
      // eslint-disable-next-line no-use-before-define
      getMyprizeList();
      if (res.data === -1) {
        // 未到开奖时间
        openDialog('noStart');
      } else if (res.data === -2) {
        // 未中奖
        openDialog('noLottery');
      } else if (res.data === 1) {
        prizeName.value = '优惠券';
        openDialog('lotteryBean');
      } else if (res.data === 2) {
        prizeName.value = '京豆';
        openDialog('lotteryBean');
      } else if (res.data === 3) {
        prizeName.value = '话费';
        openDialog('lotteryBean');
      } else if (res.data === 7) {
        // 实物
        openDialog('getLottery');
        getType.value = prizetype;
      } else if (res.data === 6) {
        prizeName.value = '京豆';
        openDialog('lotteryBean');
      } else if (res.data === 9) {
        prizeName.value = '积分';
        openDialog('lotteryBean');
      } else if (res.data === 13) {
        prizeName.value = 'E卡';
        openDialog('lotteryBean');
      }
    } else {
      Toast(res.errorMessage);
    }
  });
};
// 分享好友
const share = () => {
  if (!isOpenCarded.value) {
    openDialog('noMem');
    return;
  }
  if (isinviteDone.value) {
    openDialog('started');
    return;
  }
  callShare({
    type: baseInfo.shareType,
    title: actList.value.shareTitle as string,
    imageUrl: actList.value.shareImg as string,
    shareUrl: `https://${window.location.host}/m/common/nestle/invite/?venderId=${venderId.value}&activityId=${activityId.value}&helpUuid=${myUuid.value}` as string,
    afterShare: sharePoint,
    channel: shareChannel.join(','),
  });
};
// 获取sku商品
const getSkuList = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/act/common/findSkus', {
    actId: activityId.value,
    userId: venderId.value,
    type: 40,
  }).then((res) => {
    if (res.isOk) {
      res.skus.forEach((item: { logo: string | string[]; }) => {
        if (item.logo.indexOf('360buyimg') === -1) {
          item.logo = `https://img10.360buyimg.com/imgzone${item.logo}`;
        }
      });
      skusList.value = res.skus;
    } else {
      Toast(res.msg);
    }
  });
};
// 获取助力榜单
const getHelpList = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.get('/nestle/invite/getRankList', {
    params: {
      activityId: activityId.value,
    },
  }).then((res) => {
    if (res.result) {
      helpList.value = res.data;
    } else {
      Toast(res.errorMessage);
    }
  });
};
// 获取个人获奖记录
const getMyprizeList = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.get('/nestle/invite/getReceivedPrize', {
    params: {
      activityId: activityId.value,
      pin: userPin.value,
    },
  }).then((res) => {
    if (res.result) {
      myPrizeList.value = res.data;
    } else {
      Toast(res.errorMessage);
    }
  });
};
// 关闭三联地址框
const onCancel = () => {
  addressSelects.value = false;
};
// 确认三联地址信息
const confirmAddress = (addressItemList: any[]) => {
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
// 开卡回调埋点
const openCardPoint = () => {
  cjwxRequest.get('/commonTools/memberWritePerson', {
    params: {
      activityId: activityId.value,
      pin: userPin.value,
      venderId: venderId.value,
      activityType: 40,
    },
  });
};
// 去开卡
const gotoCard = () => {
  // if (!isOpenCarded) {
  //   openDialog('noMem');
  //   return;
  // }
  openCardPoint();
  const returnUrl = encodeURIComponent(`https://${window.location.host}/m/common/nestle/invite/?venderId=${venderId.value}&activityId=${activityId.value}&helpUuid=${helpUuid}`);
  // window.location.href = `https://shopmember.m.jd.com/shopcard/?venderId=${userShopId.value}&shopId=${sid.value}&venderType=${venderType.value}&channel=${channelNum.value}&returnUrl=${returnUrl}`;
  window.location.href = `${channelNum.value}&returnUrl=${returnUrl}`;
};
// 去活动页
const goHomePage = () => {
  closeDialog('helpSuccess');
  closeDialog('helpfailed');
  helpUuid = null;
  // activityContent();
  // window.location.href = `https://${window.location.host}/m/1000088787/99/yaoxin/?activityId=${activityId.value}`;
};
// 提交用户信息
const recordInfo = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/nestle/invite/saveAddress', {
    activityId: activityId.value,
    pin: userPin.value,
    customerId: myUuid.value,
    venderId: venderId.value,
    province: formData.value.province,
    city: formData.value.city,
    district: formData.value.district,
    receiver: formData.value.receiver,
    phone: formData.value.phone,
    address: formData.value.address,
    postalCode: formData.value.postalCode,
    prizeType: getType.value,
  }).then((res) => {
    if (res.result) {
      closeDialog('userFix');
      // formDataEmpty();
      // getPrizeStatus();
      Toast('提交成功');
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
  } else if (!formData.value.postalCode) {
    Toast('请输入邮政编码');
  } else if (!(/^\d{6}$/.test(formData.value.postalCode))) {
    Toast('请输入正确邮编');
  } else {
    recordInfo();
  }/* else if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(formData.value.personalID))) {
    Toast('请输入有效身份证号');
  } */
};
checkOpenStatus();
getOpen();
getActivityInfo();
activityContent();
getHelpList();
getMyprizeList();
// getPrizeStatus();
getSkuList();
// openCardStatus();
</script>

<style lang='scss'>
html {
  max-width: 750px;
  margin: 0 auto;
  color: #FFFFFF;
}
.gray {
  filter: grayscale(1);
}
.gray-cover{
  background-color: rgba(0,0,0,.4);
}
img{
  width: 100%;
  margin: .1rem auto;
}
.van-popup {
  background: none;
  overflow: hidden;
}
.van-toast {
  background-color: rgba(0,0,0,.7);
  min-width: max-content;
}
.kv-area{
  position: relative;

  .main-kv{
    width: 100%;
    height: 9rem;
    margin: 0;
  }
  .rule-btn{
    position: absolute;
    width: .95rem;
    height: 0.35rem;
    top: 0.3rem;
    right: 0;
    border-radius: .5rem 0 0 .5rem;
    font-size: .2rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .prize-btn{
    position: absolute;
    width: 0.95rem;
    height: 0.35rem;
    top: 0.8rem;
    right: 0;
    border-radius: .5rem 0 0 .5rem;
    font-size: .2rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .share-top{
    position: absolute;
    width: 2.3rem;
    height: 0.55rem;
    top: 8.1rem;
    left: 2.6rem;
    border-radius: .45rem 0 .45rem 0;
    font-size: .3rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.open-area{
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  .open-bg{
    width: 96%;
  }
  .goMem-btn{
    position: absolute;
    width: 2.26rem;
    height: 0.45rem;
    top: 11.88rem;
    left: 0.9rem;
  }
}
.bean-area{
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  .share-prize{
    width: 96%;
  }
  .getBean-area{
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    top: 0;
    align-items: center;

    .bean-btn{
      width: 95%;
      height: 33%;

      >div{
        width: 100%;
        height: 100%;
        color: #FFFFFF;
        opacity: .7;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
.share-area{
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  .share-num{
    position: absolute;
    width: 0.25rem;
    height: 0.23rem;
    top: 4.8rem;
    left: 4.95rem;
    font-size: .23rem;
    opacity: .6;
    font-weight: bold;
  }
}
.prize-area{
  position: relative;
  margin-bottom: .5rem;

  .prizeBtn-area{
    position: relative;
    width: 93%;
    display: flex;
    flex-direction: column;
    border: 0.1rem solid;
    margin: 0 auto;

    >div{
      width: 100%;
      height: 3.68rem;
      position: relative;
      margin: 0 auto;

      .getPrize-text{
        width: 2.5rem;
        text-align: center;
        margin-bottom: .2rem;
        -webkit-background-clip: text;
        color: transparent;
        font-weight: bolder;
        font-size: .42rem;
      }
      .getPrize-btn{
        border-radius: 1rem;
        width: 3.5rem;
        height: 0.5rem;
        color: #fdf9f2;
        font-size: .23rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
.friend-list-area{
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  .friend-list-view{
    position: relative;
    width: 95%;
    height: 4.73rem;
    background-color: #FFFFFF;
    margin-top: .5rem;

    .friend-num {
      position: absolute;
      width: 100%;
      height: 0.5rem;
      text-align: center;
      -webkit-background-clip: text;
      color: transparent;
      font-size: 0.3rem;
      font-weight: bold;
      top: -.4rem;
    }
    .friend-title{
      width: 100%;
      display: flex;
      font-weight: 600;
      align-items: center;
      justify-content: space-evenly;
      margin-top: .3rem;
    }
    .friend-list{
      position: absolute;
      top: 1rem;
      left: 0.25rem;
      width: 93%;
      height: 3rem;
      display: flex;
      flex-direction: column;
      overflow-y: scroll;

      .friend-item{
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        margin-bottom: .1rem;

        >div{
          text-align: center;
          width: 1rem;
        }
      }
    }
    .getHelpPrize-btn{
      position: absolute;
      width: 2.4rem;
      height: 0.48rem;
      top: 4.4rem;
      left: 2.45rem;
      border-radius: 0.5rem;
      font-size: .25rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
.sku-area{
  position: relative;

  .sku-list{
    position: relative;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    justify-content: space-evenly;

    .sku-item{
      width: 44%;
      font-size: 0.25rem;
      font-family: Source Han Sans CN, sans-serif;
      font-weight: 500;
      color: #8c4008;
      background-color: #FFFFFF;
      margin-bottom: 0.2rem;
      display: flex;
      flex-direction: column;
      position: relative;
      justify-content: space-between;

      >img{
        width: 100%;
        margin: .2rem auto;
      }
      >div{
        margin: 0 auto;
      }
      .sku-btn{
        width: 2rem;
        height: .5rem;
        border-radius: .5rem;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: .1rem;
      }
    }
  }
}
.goshop-area{
  position: relative;
  height: 1.8rem;

  .go-shop{
    position: relative;
    width: 2.95rem;
    height: .73rem;
    margin: .3rem auto 0;
    border-radius: 0.45rem 0 0.45rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 7.5rem;
}
.rules-view{
  width: 6.13rem;
  height: 8.17rem;
  position: relative;

  .ruleView-area{
    position: absolute;
    top: 1.15rem;
    left: 0.5rem;
    height: 5.5rem;
    width: 87%;
    overflow: scroll;
    color: #535353;
    font-size: 0.23rem;
  }
  .close-btn{
    width: 0.42rem;
    height: 0.42rem;
    position: absolute;
    bottom: 0;
    left: 2.85rem;
    background: url("./assets/close.png") no-repeat;
    background-size: 100%;
  }
}
.myPrize-view{
  width: 6.13rem;
  height: 8.17rem;
  position: relative;

  .myPrizeView-area{
    position: absolute;
    top: 2.9rem;
    left: 0.4rem;
    height: 1.3rem;
    width: 5.3rem;
    overflow: scroll;

    .myprize-item{
      display: flex;
      font-size: 0.28rem;
      color: #5c5c5c;
      align-items: center;
      text-align: start;
      margin-bottom: .1rem;
    }
    .noprize-item{
      width: 100%;
      text-align: center;
      margin: .3rem auto 0;
      color: gray;
    }
  }
  .close-btn{
    width: 0.65rem;
    height: 0.65rem;
    position: absolute;
    bottom: 0;
    left: 2.75rem;
    background: url("./assets/close.png") no-repeat;
    background-size: 100%;
  }
}
.noMem-view{
  width: 6.5rem;
  height: 8rem;
  position: relative;

  .text-area{
    display: flex;
    flex-direction: column;
    position: absolute;
    align-items: center;
    top: 2rem;
    left: 1rem;
    height: 2.3rem;
    width: 65%;
    justify-content: space-evenly;
    font-weight: 600;

    >div{
      -webkit-background-clip: text;
      color: transparent;
      text-align: center;
    }
  }
  .gotoOpen{
    width: 2.38rem;
    height: 0.58rem;
    position: absolute;
    top: 4.6rem;
    left: 2.05rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .close-btn{
    width: 0.55rem;
    height: 0.55rem;
    position: absolute;
    bottom: 0;
    left: 2.95rem;
    background: url("./assets/close.png") no-repeat;
    background-size: 100%;
  }
}
.getBean-view{
  width: 6.5rem;
  height: 8rem;
  position: relative;

  .text-area{
    display: flex;
    flex-direction: column;
    position: absolute;
    align-items: center;
    top: 2rem;
    left: 1rem;
    height: 2.3rem;
    width: 4.5rem;
    justify-content: space-evenly;
    font-weight: 600;

    >div{
      -webkit-background-clip: text;
      color: transparent;
      text-align: center;
    }
  }
  .gotoShop{
    position: absolute;
    width: 2.35rem;
    height: .6rem;
    top: 4.58rem;
    left: 2.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .close-btn{
    position: absolute;
    width: .55rem;
    height: .55rem;
    bottom: 0;
    left: 2.95rem;
    background: url("./assets/close.png") no-repeat;
    background-size: 100%;
  }
}
.helpSuccess-view{
  width: 6.5rem;
  height: 8rem;
  position: relative;

  .text-area {
    display: flex;
    flex-direction: column;
    position: absolute;
    align-items: center;
    top: 2rem;
    left: 1rem;
    height: 2.3rem;
    width: 4.5rem;
    justify-content: space-evenly;
    font-weight: 600;

    > div {
      -webkit-background-clip: text;
      color: transparent;
      text-align: center;
    }
  }
  .goHome{
    position: absolute;
    width: 2.35rem;
    height: .6rem;
    top: 4.58rem;
    left: 2.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .close-btn{
    position: absolute;
    width: .55rem;
    height: .55rem;
    bottom: 0;
    left: 2.95rem;
    background: url("./assets/close.png") no-repeat;
    background-size: 100%;
  }
}
.helpfailed-view{
  width: 6.5rem;
  height: 8rem;
  position: relative;

  .text-area {
    display: flex;
    flex-direction: column;
    position: absolute;
    align-items: center;
    top: 2rem;
    left: 1rem;
    height: 2.3rem;
    width: 65%;
    justify-content: space-evenly;
    font-weight: 600;

    > div {
      -webkit-background-clip: text;
      color: transparent;
      text-align: center;
    }
  }
  .goHome{
    position: absolute;
    width: 2.35rem;
    height: .6rem;
    top: 4.58rem;
    left: 2.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .close-btn{
    position: absolute;
    width: .55rem;
    height: .55rem;
    bottom: 0;
    left: 2.95rem;
    background: url("./assets/close.png") no-repeat;
    background-size: 100%;
  }
}
.noStart-view{
  width: 6.5rem;
  height: 8rem;
  position: relative;

  .text-area {
    display: flex;
    flex-direction: column;
    position: absolute;
    align-items: center;
    top: 2rem;
    left: 1rem;
    height: 2.3rem;
    width: 4.5rem;
    justify-content: space-evenly;
    font-weight: 600;

    > div {
      -webkit-background-clip: text;
      color: transparent;
      text-align: center;
    }
  }
  .gotoShop{
    position: absolute;
    width: 2.35rem;
    height: .6rem;
    top: 4.58rem;
    left: 2.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .close-btn{
    position: absolute;
    width: .55rem;
    height: .55rem;
    bottom: 0;
    left: 2.95rem;
    background: url("./assets/close.png") no-repeat;
    background-size: 100%;
  }
}
.noLottery-view{
  width: 6.5rem;
  height: 8rem;
  position: relative;

  .text-area {
    display: flex;
    flex-direction: column;
    position: absolute;
    align-items: center;
    top: 2rem;
    left: 1rem;
    height: 2.3rem;
    width: 65%;
    justify-content: space-evenly;
    font-weight: 600;

    > div {
      -webkit-background-clip: text;
      color: transparent;
      text-align: center;
    }
  }
  .gotoShop{
    position: absolute;
    width: 2.35rem;
    height: .6rem;
    top: 4.58rem;
    left: 2.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .close-btn{
    position: absolute;
    width: .55rem;
    height: .55rem;
    bottom: 0;
    left: 2.95rem;
    background: url("./assets/close.png") no-repeat;
    background-size: 100%;
  }
}
.started-view{
  width: 6.5rem;
  height: 8rem;
  position: relative;

  .text-area {
    display: flex;
    flex-direction: column;
    position: absolute;
    align-items: center;
    top: 2rem;
    left: 1rem;
    height: 2.3rem;
    width: 65%;
    justify-content: space-evenly;
    font-weight: 600;

    > div {
      -webkit-background-clip: text;
      color: transparent;
      text-align: center;
    }
  }
  .gotoShop{
    position: absolute;
    width: 2.35rem;
    height: .6rem;
    top: 4.58rem;
    left: 2.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .close-btn{
    position: absolute;
    width: .55rem;
    height: .55rem;
    bottom: 0;
    left: 2.95rem;
    background: url("./assets/close.png") no-repeat;
    background-size: 100%;
  }
}
.getLottery-view{
  width: 6.5rem;
  height: 8rem;
  position: relative;

  .text-area {
    display: flex;
    flex-direction: column;
    position: absolute;
    align-items: center;
    top: 2rem;
    left: 1rem;
    height: 2.3rem;
    width: 4.5rem;
    justify-content: space-evenly;
    font-weight: 600;

    > div {
      -webkit-background-clip: text;
      color: transparent;
      text-align: center;
    }
  }
  .fix-info{
    position: absolute;
    width: 2.35rem;
    height: .6rem;
    top: 4.58rem;
    left: 2.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .close-btn{
    position: absolute;
    width: .55rem;
    height: .55rem;
    bottom: 0;
    left: 2.95rem;
    background: url("./assets/close.png") no-repeat;
    background-size: 100%;
  }
}
.lotteryBean-view{
  width: 6.5rem;
  height: 8rem;
  position: relative;

  .text-area {
    display: flex;
    flex-direction: column;
    position: absolute;
    align-items: center;
    top: 2rem;
    left: 1rem;
    height: 2.3rem;
    width: 4.5rem;
    justify-content: space-evenly;
    font-weight: 600;

    > div {
      -webkit-background-clip: text;
      color: transparent;
      text-align: center;
    }
  }
  .gotoShop{
    position: absolute;
    width: 2.35rem;
    height: .6rem;
    top: 4.58rem;
    left: 2.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .close-btn{
    position: absolute;
    width: .55rem;
    height: .55rem;
    bottom: 0;
    left: 2.95rem;
    background: url("./assets/close.png") no-repeat;
    background-size: 100%;
  }
}
.fixInfo-view{
  width: 6.8rem;
  height: 8rem;
  position: relative;

  .submit-btn{
    width: 2.4rem;
    height: 0.6rem;
    position: absolute;
    top: 6.18rem;
    left: 2.2rem;
  }
  .close-btn{
    width: 0.5rem;
    height: 0.5rem;
    position: absolute;
    bottom: 0;
    left: 3.15rem;
    background: url("./assets/close.png") no-repeat;
    background-size: 100%;
  }
  .address-formData {
    position: absolute;
    top: 2.45rem;
    left: 2.85rem;
    width: 1.8rem;
    text-align: center;
  }
  .address-formData input {
    width: 95%;
    height: 0.59rem;
    border: none;
    background: none;
    color: #a0a0a0;
    font-size: 0.2rem;
    padding: 0 0 0.11rem 0;
  }
  input::-webkit-input-placeholder {
    color: #a0a0a0;
  }
}
</style>
