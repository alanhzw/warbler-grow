/**
 * @Description:caoshijie
 * @Date: 2022/1/19
 * @Description: 【倩碧自营】邀请有礼 2022年2月
 * @FilePath:src\pages\1000376431\99\2201100037643102\App.vue
*/
<template>
  <div class="qianbiInvite">
    <!-- banner -->
    <img src="./assets/banner.png" class="background" />
    <!-- 活动规则按钮 -->
    <div class="rule-btn" @click="actRule = true"></div>
    <!-- 我的好友按钮 -->
    <div class="friend-btn" @click="actMyFriend = true"></div>
    <!-- 我的奖品按钮 -->
    <div class="prize-btn" @click="getGiftRecord"></div>
    <!-- 会员礼遇部分-->
    <div class="member-rights" @click="getMemberRight"></div>
    <!-- 一键入会按钮 -->
    <div class="join-member" @click="joinMember"></div>
    <!-- 入会礼京豆30 -->
    <div class="join-gift30">
      <p
        v-if="inviteStatus.thirtyBeans == 0"
        @click="drawInfoId != null ? Toast('邀请活动已结束') :callShare()"
      >
        立即邀请 >
      </p>
      <p v-else-if="inviteStatus.thirtyBeans == 1" @click="getBeans('1')">
        立即领取 >
      </p>
      <p v-else @click="Toast('已成功领取')">领取成功 ></p>
    </div>
    <!-- 入会礼京豆50 -->
    <div class="join-gift50">
      <p
        v-if="inviteStatus.fiftyBeans == 0"
        @click="drawInfoId != null ? Toast('邀请活动已结束') :callShare()"
      >
        立即邀请 >
      </p>
      <p v-else-if="inviteStatus.fiftyBeans == 1" @click="getBeans('2')">
        立即领取 &gt;
      </p>
      <p v-else @click="Toast('已成功领取')">领取成功 ></p>
    </div>
    <!-- 入会礼黄油15ml -->
    <div class="join-shiwu">
      <p
        v-if="inviteStatus.fifteen == 0"
       @click="drawInfoId != null ? Toast('邀请活动已结束') :callShare()"
      >
        立即邀请 >
      </p>
      <p
        v-else-if="inviteStatus.fifteen == 1"
        @click="prizeType4 = true"
      >
        立即领取 >
      </p>
      <p
        v-else-if="inviteStatus.fifteen == 3"
        @click="Toast('对不起，奖品已领完')"
      >
        立即领取 >
      </p>
    </div>
    <!-- 邀请排行榜 -->
    <div class="invite-rank">
      <div class="rank-head"></div>
      <div class="rank-list" v-if="rankList.length != 0">
        <div
          v-for="(item, index) in rankList"
          :key="index"
          class="rank-list-item"
        >
          <p
            :style="{
              'background-image': 'url(' + item.image + ')',
              'background-size': '100%',
            }"
          >
            {{ item.sort }}
          </p>
          <p>{{ item.nick }}</p>
          <p>{{ item.inviteNum }}</p>
        </div>
      </div>
      <div class="rank-null" v-else>暂无排行数据</div>
    </div>
<!--    后加按钮-->
    <img class='go_member_page_img' src='./assets/goPage.png'>
    <div class='go_member_page' @click='getMemberRight'>&gt; &gt; 查看更多会员权益</div>
  </div>
  <!-- 规则弹窗 -->
  <van-popup v-model:show="actRule">
    <div class="rule">
      <div v-html="rule" class="rule-text"></div>
      <div class="close-rule" @click="actRule = false">x</div>
    </div>
  </van-popup>
  <!-- 我的好友弹窗 -->
  <van-popup v-model:show="actMyFriend">
    <div class="myFriend">
      <div class="inviteNum">{{ inviteNum}}</div>
      <div class="invite-list" v-if="helpList.length != 0">
        <div class="invite-text">
          <div
            v-for="(item, index) in helpList"
            :key="index"
            class="invite-list-item"
          >
            <img src="https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg" alt=""  v-if="item.image == null"/>
            <img :src="item.image" alt="" v-else/>
            <p>{{ item.nick }}</p>
          </div>
        </div>
      </div>
      <div class="no-message" v-else>暂无数据快去邀请好友吧</div>
      <div class="close-myfriend" @click="actMyFriend = false">x</div>
    </div>
  </van-popup>
  <!-- 我的奖品弹窗 -->
  <van-popup v-model:show="actMyGift">
    <div class="mygift">
      <div class="mygift-list" v-if="myGifts.length != 0">
        <div v-for="(item, index) in myGifts" class="myGiftItem" :key="index">
          <p>{{ getDateFormat(item.createTime) }}</p>
          <p>{{ item.giftName }}</p>
          <p v-if="item.generateId != null">
            <a @click="saveGiftAddress(item.generateId)">修改地址</a>
          </p>
          <p v-else>已发放</p>
        </div>
      </div>
      <div v-else>
        <p class="gift-null">还没有奖品，快去邀请好友吧！</p>
      </div>
      <div class="close-mygift" @click="actMyGift = false">x</div>
    </div>
  </van-popup>
  <!-- 领取30京豆弹窗 -->
  <van-popup v-model:show="get30Beans" style="border-radius: 0.25rem">
    <div class="getBeans30">
      <div class="close-bean" @click="get30Beans = false">x</div>
    </div>
  </van-popup>
  <!-- 领取50京豆弹窗 -->
  <van-popup v-model:show="get50Beans" style="border-radius: 0.25rem">
    <div class="getBeans50">
      <div class="close-bean" @click="get50Beans = false">x</div>
    </div>
  </van-popup>
  <!-- 立即助力弹窗 -->
  <van-popup v-model:show="inviteNo" style="border-radius: 0.25rem">
    <div class="inviteNoVan">
      <div class="openCard" @click="toStorePage"></div>
      <div class="close-bean" @click="inviteNo = false">x</div>
    </div>
  </van-popup>
  <!-- 成功助力弹窗 -->
  <van-popup v-model:show="inviteYes" style="border-radius: 0.25rem">
    <div class="inviteYesVan">
      <div class="openCard" @click="joinMember()"></div>
      <div class="close-bean" @click="inviteYes = false">x</div>
    </div>
  </van-popup>
  <!-- 邀请所得奖品弹窗1 -->
  <van-popup v-model:show="prizeType1" style="border-radius: 0.25rem">
    <div class="invite-prize1">
      <div class="getPrize" @click="saveGiftAddress(addressId)"></div>
      <div class="close-bean" @click="prizeType1 = false">x</div>
    </div>
  </van-popup>
  <!-- 邀请所得奖品弹窗2 -->
  <van-popup v-model:show="prizeType2" style="border-radius: 0.25rem">
    <div class="invite-prize2">
      <div class="getPrize" @click="saveGiftAddress(addressId)"></div>
      <div class="close-bean" @click="prizeType2 = false">x</div>
    </div>
  </van-popup>
  <!-- 邀请所得奖品弹窗3 -->
  <van-popup v-model:show="prizeType3" style="border-radius: 0.25rem">
    <div class="invite-prize3">
      <div class="getPrize" @click="saveGiftAddress(addressId)"></div>
      <div class="close-bean" @click="prizeType3 = false">x</div>
    </div>
  </van-popup>
  <!-- 邀请所得奖品弹窗4 -->
  <van-popup v-model:show="prizeType4" style="border-radius: 0.25rem">
    <div class="invite-prize4">
      <div class="getPrize" @click="saveGiftAddress(generateId)"></div>
      <div class="close-bean" @click="prizeType4 = false">x</div>
    </div>
  </van-popup>
</template>

<script setup lang="ts">
import { Toast, Popup as VanPopup } from 'vant';
import {
  ref, inject, reactive, Ref,
} from 'vue';
import { BaseInfo } from '@/types/BaseInfo';
import { cjwxRequest } from '@/utils/service';
import JD from '@/utils/platforms';

// 数据
const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;

// 是否开卡表示是否注册
const openCard: boolean = inject('isOpenCard') as boolean;

const helpUuid: string = inject('helpUuid') as string;

// 获取基本信息
const {
  activityId, actName, pin, venderId,
} = baseInfo;
const isInvite = ref(true);
const get30Beans = ref(false); // 30京豆弹窗
const get50Beans = ref(false); // 50京豆弹窗
const actRule = ref(false);
const actMyFriend = ref(false);
const actMyGift = ref(false);
const inviteNo = ref(false); // 店铺会员
const inviteYes = ref(false);// 立刻助力
const drawInfoId = ref('');
const prizeType1 = ref(false); // top1
const prizeType2 = ref(false); // top2
const prizeType3 = ref(false);// top3
const prizeType4 = ref(false); // 15位好友
const inviteStatus = ref({
  thirtyBeans: '',
  fiftyBeans: '',
  fifteen: '',
});
const rankList: Ref<{
  sort: string;
  nick: string;
  inviteNum: string;
  image: string;
}[]> = ref([]);
const helpList :Ref<{
  image: string;
  nick: string;
}[]> = ref([]); // 我的好友列表
const myGifts :Ref<{
  createTime: string;
  giftName: string;
  generateId: string;
}[]> = ref([]);// 我的奖品列表
const rule = ref('');
const shareUrl = ref();
const generateId = ref('');
const addressId = ref('');
const inviteNum = ref('');
const helpStatus = ref(0);
if (helpUuid) {
  if (!openCard) {
    inviteYes.value = true;
  } else {
    inviteNo.value = true;
  }
}
// 设置头部分享
const setHeaederShare = () => {
  JD.setHeaderShare({
    title: '邀新助力赢好礼',
    shareUrl: shareUrl.value,
  });
};
// 手动调用分享
const callShare = () => {
  if (!openCard) {
    Toast('你还不是会员，请入会');
    return;
  }
  JD.callShare({
    title: '邀新助力赢好礼',
    shareUrl: shareUrl.value,
  });
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
// 格式化时间戳
const getDateFormat = (dateNumber: number) => {
  const date = new Date(dateNumber); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  const Y = `${date.getFullYear()}-`;
  const M = `${
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  }-`;
  const D = `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()} `;
  return Y + M + D;
};
// 获取邀请状态
const getInviteSend = () => {
  cjwxRequest
    .post('/clinique/invite/wx/getInviteSend', {
      activityId,
      pin,
    })
    .then((res) => {
      if (res.data) {
        inviteStatus.value = res.data;
        generateId.value = res.data.fifteenAddress;
        drawInfoId.value = res.data.drawInfoId;
        addressId.value = res.data.addressId;
        if (drawInfoId.value === '16fe213b-cec1-4a12-9d74-2cf882e9342d') {
          prizeType1.value = true;
        } else if (
          drawInfoId.value === '3f8bce1e-35e2-4780-866a-fc88ca313467'
        ) {
          prizeType2.value = true;
        } else if (
          drawInfoId.value === '2d20f029-5351-4849-8bba-60dd7d040cea'
        ) {
          prizeType3.value = true;
        }
      } else {
        Toast(res.errorMessage);
      }
    });
};
// 获取页面主信息
const getActivityContent = () => {
  cjwxRequest
    .post('/clinique/invite/wx/activityContent', {
      activityId,
      pin,
      helpUuid,
    })
    .then((res) => {
      if (res.data) {
        helpList.value = res.data.helpList;
        inviteNum.value = res.data.inviteNum;
        helpStatus.value = res.data.helpStatus;
        shareUrl.value = `${window.location.href.split('?')[0]}?helpUuid=${res.data.customerId}`;
        if (res.data.helpStatus === 1) {
          Toast('你已助力成功');
        }
        setTimeout(() => getInviteSend(), 300);
        setHeaederShare();
      }
    });
};
// 获取我的奖品
const getGiftRecord = () => {
  actMyGift.value = true;
  cjwxRequest
    .post('/clinique/invite/wx/getGiftRecord', {
      activityId,
      pin,
    })
    .then((res) => {
      if (res.data) {
        myGifts.value = res.data;
      } else {
        Toast(res.errorMessage);
      }
    });
};
// 领取京豆
const getBeans = (prizFlag: string) => {
  cjwxRequest
    .post('/clinique/invite/wx/sendGift', {
      activityId,
      pin,
      prizFlag,
    })
    .then((res) => {
      if (res.data) {
        if (prizFlag === '1') {
          get30Beans.value = true;
        } else {
          get50Beans.value = true;
        }
      } else {
        Toast(res.errorMessage);
      }
    });
};
// 跳转填写地址页面
const saveGiftAddress = (generId: string) => {
  window.location.href = `https://lzkjdz-isv.isvjcloud.com/wxAddress/indexPage?pin=${encodeURIComponent(
    pin,
  )}&generateId=${generId}&fromWhere=dingzhi`;
};

// 获取排行榜信息
const getRankContent = () => {
  cjwxRequest
    .get(`/clinique/invite/wx/getRankList?activityId=${baseInfo.activityId}`)
    .then((res) => {
      Toast.clear();
      if (res.data) {
        rankList.value = res.data;
      } else {
        Toast(res.errorMessage);
      }
    });
};
const joinMember = () => {
  window.location.href = `https://shopmember.m.jd.com/shopcard/?venderId=1000376431&channel=7030&returnUrl=${encodeURIComponent(
    window.location.href,
  )}`;
};
const getMemberRight = () => {
  window.location.href = 'https://prodev.m.jd.com/mall/active/4LT3YrXdiU47dbhsG1xwKEbUaFtN/index.html';
};
const toStorePage = () => {
  window.location.href = 'https://mall.jd.com/index-1000376431.html?';
};
getActivityInfo();
getActivityContent();
getRankContent();
</script>

<style lang="scss">
html {
  max-width: 750px;
  margin: 0 auto;
  background: #f0f0f0;
}
.qianbiInvite {
  text-align: center;
  position: relative;
  .background {
    width: 100%;
  }
  .rule-btn,
  .prize-btn,
  .friend-btn {
    position: absolute;
    right: 0.18rem;
    top: 3.2rem;
    width: 1.6rem;
    height: 0.4rem;
  }
  .friend-btn {
    top: 3.8rem;
  }
  .prize-btn {
    top: 4.3rem;
  }
  .member-rights {
    position: absolute;
    left: 0.2rem;
    top: 13.5rem;
    width: 7rem;
    height: 2.4rem;
  }
  .join-member {
    position: absolute;
    left: 0.2rem;
    top: 15.9rem;
    width: 7rem;
    height: 0.5rem;
  }
  .join-gift30,
  .join-gift50,
  .join-shiwu {
    position: absolute;
    left: 0.2rem;
    top: 17.85rem;
    width: 6.9rem;
    height: 1.95rem;
    p {
      width: 100%;
      height: 100%;
      text-align: center;
      line-height: 0.45rem;
      font-size: 0.22rem;
      font-family: FZLTXHK--GBK1-0;
      letter-spacing: 0rem;
      color: #000000;
      padding-top: 1.15rem;
      padding-left: 4.5rem;
      box-sizing: border-box;
    }
  }
  .join-gift50 {
    top: 20.21rem;
  }
  .join-shiwu {
    top: 22.5rem;
  }
  .invite-rank {
    position: absolute;
    top: 35rem;
    left: 0.67rem;
    width: 6.17rem;
    height: 4.42rem;
    .rank-list {
      height: 3.68rem;
      overflow-y: scroll;
      .rank-list-item {
        position: relative;
        display: flex;
        height: 0.84rem;
        p {
          height: 100%;
          line-height: 0.97rem;
        }
        :first-child {
          position: absolute;
          top: 0.03rem;
          left: 0.25rem;
          width: 0.8rem;
          height: 0.8rem;
        }
        :nth-child(2) {
          width: 2.5rem;
          margin-left: 1.3rem;
        }
        :nth-child(3) {
          width: 2.7rem;
        }
      }
    }
    img {
      position: absolute;
      top: 0.65rem;
      left: 0.4rem;
      width: 0.44rem;
      height: 2.1rem;
    }
    .rank-head {
      background: url(./assets/invite_rank.jpg) no-repeat;
      background-size: 100%;
      width: 100%;
      height: 0.75rem;
      margin-top: -0.35rem;
      margin-left: 0.05rem;
    }
    .rank-null {
      background-color: #e8e8e8;
      box-sizing: border-box;
      border: 1px solid #e8e8e8;
      border-radius: 0.5rem;
      margin-top: 0.2rem;
      opacity: 0.9;
      width: 6rem;
      height: 4rem;
      padding-top: 1.8rem;
    }
  }
}
.rule {
  background: url(./assets/rule.jpg) no-repeat;
  background-size: 100%;
  position: relative;
  width: 6.5rem;
  height: 9.5rem;
  overflow: hidden;
  .close-rule {
    color: #d1cece;
    line-height: 0.4rem;
    text-align: center;
    height: 0.4rem;
    width: 0.4rem;
    font-size: 18px;
    top: 0.2rem;
    right: 0.2rem;
    position: absolute;
    border-radius: 50%;
    border: 1px solid #d1cece;
  }
  .rule-text {
    position: absolute;
    left: 0.55rem;
    top: 2.5rem;
    width: 5.5rem;
    height: 6rem;
    color: #000000;
    padding-right: 0.1rem;
    overflow-y: scroll;
    font-size: 0.26rem;
  }
}
.myFriend {
  background: url(./assets/my-friend.png) no-repeat;
  background-size: 100%;
  position: relative;
  width: 6.5rem;
  height: 9.5rem;
  .close-myfriend {
    color: #d1cece;
    line-height: 0.4rem;
    text-align: center;
    height: 0.4rem;
    width: 0.4rem;
    font-size: 18px;
    top: 0.2rem;
    right: 0.2rem;
    position: absolute;
    border-radius: 50%;
    border: 1px solid #d1cece;
  }
  .inviteNum {
    position: absolute;
    left: 4.15rem;
    top: 2.62rem;
  }
  .invite-list {
    position: absolute;
    top: 2.6rem;
    left: 0.75rem;
    margin-top: 0.5rem;
    .invite-text {
      width: 5rem;
      height: 4rem;
      overflow-y: scroll;
      text-align: left;
      display: flex;
      flex-wrap: wrap;
      .invite-list-item {
        width: 24%;
        height: 1.5rem;
        text-align: center;
        img {
          width: 1rem;
          height: 1rem;
          border: 1px solid #f0f0f0;
          border-radius: 50%;
          overflow: hidden;
        }
      }
    }
  }
  .no-message {
    position: absolute;
    top: 5rem;
    left: 2.18rem;
    font-family: FZLTXHK--GBK1-0;
    font-size: 0.17rem;
  }
}
.mygift {
  background: url(./assets/my-prize.png) no-repeat;
  background-size: 100%;
  position: relative;
  width: 6.5rem;
  height: 9.5rem;
  .mygift-list {
    position: absolute;
    top: 3.5rem;
    left: 0.8rem;
    width: 5rem;
    height: 6rem;
    font-size: 0.26rem;
    .myGiftItem {
      position: relative;
      display: flex;
      height: 0.5rem;
      p {
        position: absolute;
        top: 0rem;
        left: 0.12rem;
      }
      :nth-child(2) {
        text-align: center;
        width: 2rem;
        height: 0.37rem;
        top: -0.05rem;
        left: 1.68rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
      }
      :nth-child(3) {
        width: 1.5rem;
        top: -0.05rem;
        left: 4.1rem;
      }
    }
  }
  .close-mygift {
    color: #d1cece;
    line-height: 0.2rem;
    text-align: center;
    height: 0.2rem;
    width: 0.2rem;
    font-size: 18px;
    top: 0.2rem;
    right: 0.2rem;
    position: absolute;
    border-radius: 50%;
    border: 1px solid #d1cece;
    padding: 0.1rem;
  }
  .gift-null {
    position: absolute;
    top: 5rem;
    left: 2.2rem;
    font-family: FZLTXHK--GBK1-0;
    font-size: 0.17rem;
  }
}
.getBeans30,
.getBeans50 {
  background: url(./assets/bean30.jpg) no-repeat;
  background-size: 100%;
  width: 5.8rem;
  height: 2.3rem;
  .close-bean {
    color: #d1cece;
    line-height: 0.2rem;
    text-align: center;
    height: 0.2rem;
    width: 0.2rem;
    font-size: 0.18rem;
    top: 0.2rem;
    right: 0.2rem;
    position: absolute;
    border-radius: 50%;
    border: 0.01rem solid #d1cece;
    padding: 0.1rem;
  }
}
.getBeans50 {
  background: url(./assets/bean50.jpg) no-repeat;
  background-size: 100%;
}
.inviteNoVan,
.inviteYesVan {
  background: url(./assets/invite2.jpg) no-repeat;
  background-size: 100%;
  width: 5.8rem;
  height: 2.3rem;
  .openCard {
    width: 2.8rem;
    height: 0.5rem;
    position: absolute;
    bottom: 0.2rem;
    left: 1.5rem;
  }
  .close-bean {
    color: #d1cece;
    line-height: 0.2rem;
    text-align: center;
    height: 0.2rem;
    width: 0.2rem;
    font-size: 0.18rem;
    top: 0.1rem;
    right: 0.1rem;
    position: absolute;
    border-radius: 50%;
    border: 0.01rem solid #d1cece;
    padding: 0.1rem;
  }
}
.inviteYesVan {
  background: url(./assets/invite1.jpg) no-repeat;
  background-size: 100%;
}
.invite-prize1,
.invite-prize2,
.invite-prize3,
.invite-prize4{
  width: 5.8rem;
  height: 2.4rem;
  border-radius: 0.3rem;
  background: url(./assets/prize1.jpg);
  background-size: 100%;
  .close-bean {
    color: #d1cece;
    line-height: 0.2rem;
    text-align: center;
    height: 0.2rem;
    width: 0.2rem;
    font-size: 0.18rem;
    top: 0.1rem;
    right: 0.1rem;
    position: absolute;
    border-radius: 50%;
    border: 0.01rem solid #d1cece;
    padding: 0.1rem;
  }
  .getPrize {
    width: 2.8rem;
    height: 0.5rem;
    position: absolute;
    bottom: 0.2rem;
    left: 1.5rem;
  }
}
.invite-prize2 {
  background: url(./assets/prize2.jpg);
  background-size: 100%;
}
.invite-prize3 {
  background: url(./assets/prize3.jpg);
  background-size: 100%;
}
.invite-prize4 {
  background: url(./assets/prize4.png);
  background-size: 100%;
}
.go_member_page_img{
  width: 100%;
}
.go_member_page{
  text-align: center;
  color: #000;
  font-size: .32rem;
  line-height: .7rem;
}
</style>
