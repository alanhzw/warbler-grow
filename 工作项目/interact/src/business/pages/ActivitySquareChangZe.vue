<!--
 * @Description:
 * @Autor: hanzhiwei
 * @Date: 2020-10-28 10:50:23
 * @LastEditTime: 2021-09-02 17:59:20
 * @FilePath: \interact\src\business\pages\ActivitySquareChangZe.vue
-->
<template>
  <!-- 互动广场 -->
  <div class="page-activity-square">
    <!-- 会员互动 -->
    <!-- <div class="member-interact">
      <div class="header position-relative">
        <div>
          <div class="tip-blue inline-block"></div>
          <div class="inline-block left">会员互动</div>
        </div>
        <div class="right inline-block">
          <a @click="getRouterType(-1,0)"
             class="pointer-curser">活动管理</a>
        </div>
      </div>
      <div class="content flex">
        <lz-row class="activity-list">
          <lz-col :span="8"
                  v-for="(item,index) in memberInteractList"
                  :key=index>
            <div class="activity-item">
              <div class="title">{{ item.title }}</div>
              <div class="desc">{{ item.info }}</div>
              <div class="buttons">
                <lz-button type="primary"
                           plain
                           @click="gotoFrame(item.url)">创建活动
                </lz-button>
              </div>
            </div>
          </lz-col>
        </lz-row>
      </div>
    </div> -->
    <!-- 会员赚积分 -->
    <!-- <div class="member-points margin-top10">
      <div class="header position-relative">
        <div>
          <div class="tip-blue inline-block"></div>
          <div class="inline-block left">会员赚积分</div>
        </div>
        <div class="right inline-block">
          <a @click="getRouterType(-2,0)"
             class="pointer-curser">活动管理</a>
        </div>
      </div>
      <div class="content member-points-box flex">
        <div class="content flex">
          <lz-row class="activity-list">
            <lz-col :span="8"
                    v-for="(item,index) in memberPointsList"
                    :key=index>
              <div class="activity-item">
                <div class="title">{{ item.title }}</div>
                <div class="desc">{{ item.info }}</div>
                <div class="buttons">
                  <lz-button type="primary"
                             plain
                             @click="createActivity(item.url,2)">创建活动
                  </lz-button>
                </div>
              </div>
            </lz-col>
          </lz-row>
        </div>
      </div>
    </div> -->
    <!-- 云鹿专享 -->
    <!-- <div class="yunlu-vip margin-top10">
      <div class="header position-relative">
        <div>
          <div class="tip-blue inline-block"></div>
          <div class="inline-block left">云鹿专享</div>
        </div>
        <div class="right inline-block">
          <a @click="toActivities()"
             class="pointer-curser">活动管理</a>
        </div>
      </div>
      <div class="content flex">
        <lz-row class="activity-list">
          <lz-col :span="8"
                  v-for="(item,index) in yunluVipList"
                  :key=index>
            <div class="activity-item">
              <div class="title">{{ item.title }}</div>
              <div class="desc-90">{{ item.info }}</div>
              <div class="buttons">
                <lz-button type="primary"
                           plain
                           @click="$router.push('/'+item.type+'/new')">创建活动
                </lz-button>
              </div>
            </div>
          </lz-col>
        </lz-row>
      </div>
    </div> -->
    <!-- 互动活动 -->
    <div class="home-marketing margin-top10">
      <div class="header position-relative">
        <div>
          <div class="tip-blue inline-block"></div>
          <div class="inline-block left">互动活动</div>
        </div>
        <div class="right inline-block">
          <a @click="toActivityManage('/interact/activityManage')"
             class="pointer-curser">活动管理 </a>
        </div>
      </div>
      <div class="content flex">
        <lz-row class="activity-list">
          <lz-col :span="8"
                  v-for="(item,index) in newActivityList"
                  :key=index>
            <div class="activity-item">
              <div class="title">{{ item.title }}</div>
              <div class="desc">{{ item.info }}</div>
              <div class="buttons">
                <lz-button type="primary"
                           plain
                           @click="createNewActivity(item.type)">创建活动
                </lz-button>
              </div>
            </div>
          </lz-col>
        </lz-row>
      </div>
    </div>
    <!-- 店铺首页营销 -->
    <!-- <div class="home-marketing margin-top10">
      <div class="header position-relative">
        <div>
          <div class="tip-blue inline-block"></div>
          <div class="inline-block left">店铺首页营销</div>
        </div>
        <div class="right inline-block">
          <a> </a>
        </div>
      </div>
      <div class="content flex">
        <lz-row class="activity-list">
          <lz-col :span="8"
                  v-for="(item,index) in shopMarketingList"
                  :key=index>
            <div class="activity-item">
              <div class="title">{{ item.title }}</div>
              <div class="desc">{{ item.info }}</div>
              <div class="buttons">
                <lz-button type="primary"
                           plain
                           @click="openNewWindow(item.url)">创建活动
                </lz-button>
              </div>
            </div>
          </lz-col>
        </lz-row>
      </div>
    </div> -->
  </div>
</template>

<script>
import Service, { CrmbService } from '@/business/service';
import LzMsg from '@/business/utils/LzMsg';
import { appHistory } from '@ice/stark-app';
import Constants from '@/utils/constant';
import { ActivityTypeEnum } from '@/utils/ActivityType';

export default {
  name: 'ActivitySquare',
  data() {
    return {
      routerType: '',
      createActivitybtn: '', // 控制鼠标经过显示创建活动
      // 超级会员
      memberInteractList: [ // 会员互动列表  icon图标  title标题  info活动介绍   type活动类型
        {
          icon: '01',
          title: '日历签到',
          info: '支持每日签到、连续签到、累计签到多种赠送方式，增强会员粘性',
          type: '15',
          url: '/frame/cjhy/template/list?type=15',
        },
        {
          icon: '02',
          title: '每日抢好礼',
          info: '限时限量发放好礼，制造紧迫感，吸引会员定时参与店铺活动',
          type: '16',
          url: '/frame/cjhy/template/list?type=16',
        },
        {
          icon: '03',
          title: '大转盘抽奖',
          info: '经典抽奖玩法，自由设置多种奖品，中奖概率，丰富活动模板可选',
          type: '13',
          url: '/frame/cjhy/template/list?type=13',
        },
        {
          icon: '04',
          title: '加购有礼',
          info: '加购指定商品获得奖品，快速增加商品加购数，提升权重，打造爆款',
          type: '6',
          url: '/frame/cjhy/template/list?type=6',
        },
        {
          icon: '05',
          title: '关注店铺有礼',
          info: '关注店铺即可领奖，砸金蛋、抢红包等多种趣味玩法可选，光速涨粉',
          type: '17',
          url: '/frame/cjhy/template/list?type=17',
        },
        // {
        //   icon: '10',
        //   title: '邀请好友开卡',
        //   info: '引导用户邀请好友开卡，迅速增加活动曝光率，提升店铺流量，增加转化率',
        //   type: '65',
        //   url: '/frame/cjhy/template/list?type=65',
        // },
      ],
      // 云鹿专享列表  icon 图标  title标题  info 活动介绍  type活动类型
      yunluVipList: [
        {
          icon: '06',
          title: '消费满额有礼(自动发放)',
          info: '品牌会员专属，消费满足规定金额可领奖，提升客单价利器（本活动使用自营店会员订单，实付金额，支持会员通商家）',
          type: '501',
        },
        {
          icon: '18',
          title: '消费满额有礼(手动领取)',
          info: '品牌会员专属，消费满足规定金额可获得抽奖机会，提升客单价利器（本活动使用自营店会员订单，实付金额，支持会员通商家）',
          type: '503',
        },
        {
          icon: '07',
          title: '消费满额抽奖（实付金额，交易完成）',
          info: '消费满足规定金额可获得抽奖机会，提升客单价利器（本活动使用自营店会员订单，实付金额，支持会员通商家）',
          type: '502',
        },

        {
          icon: '19',
          title: '消费满额抽奖（订单金额，付款完成）',
          info: '消费金额满足指定额度，可获抽奖机会，促使买家增加购买。（本活动使用自营店全量订单，标价金额，支持全类型商家）',
          type: '505',
        },
        {
          icon: '20',
          title: '消费金额排名有礼',
          info: '消费金额前N名赠送礼品，促使买家增加购买。（本活动使用自营店会员订单，实付金额，支持会员通商家）',
          type: '506',
        },
        {
          icon: '21',
          title: '消费时间排名有礼',
          info: '快速破零利器！吸引买家抢先购买，前N名优惠增加买家购买紧迫感，促使快速下单。（本活动使用自营店全量订单，标价金额，支持全类型商家）',
          type: '507',
        },
        {
          icon: '22',
          title: ActivityTypeEnum['504'],
          info: '人气火爆的互动玩法，会员集齐全部卡片后可获得奖励',
          type: '504',
        },
        {
          icon: '23',
          title: ActivityTypeEnum['508'],
          info: '会员可试用小样，提升产品曝光和用户体验',
          type: '508',
        },
      ],
      // 超级无线
      shopMarketingList: [ // 会员首页营销列表  icon 图标  title标题  info 活动介绍  type活动类型
        {
          icon: '08',
          title: '店铺礼包',
          info: '可设置进店礼包，买家进入店铺首页直接弹出，可针对不同人群投放',
          type: 'shopGift',
          url: 'http://jdcjwx.dianpusoft.cn/shopgift/indexPage',
        },
        {
          icon: '09',
          title: '浮层图标管理',
          info: '在手机京东APP悬浮图标里的图标，买家点击图标参与店铺活动',
          type: 'iconManage',
          url: 'http://jdcjwx.dianpusoft.cn/icon/indexPage',
        },
      ],
      // 会员赚积分
      memberPointsList: [
        {
          icon: '09',
          title: '积分抽奖',
          info: '经典抽奖玩法，自由设置多种奖品，中奖概率，丰富活动模板可选',
          type: 'iconManage',
          url: '/template/list?type=26',
        },
        {
          icon: '09',
          title: '积分猜大小',
          info: '积分猜大小，小积分博手气，猜中者可获得积分奖励',
          type: 'iconManage',
          url: '/template/list?type=41',
        },
        {
          icon: '09',
          title: '积分PK',
          info: '积分PK让用户邀请伙伴进行PK，PK获胜可以瓜分积分',
          type: 'iconManage',
          url: '/template/list?type=48',
        },

      ],
      // 超级营销
      newActivityList: [// 签到,邀请活动列表
        {
          icon: '11',
          title: '累计签到抽奖',
          info: '累计签到满N天可得抽奖机会，刺激买家进店签到，提高会员粘性。',
          type: '10001',
        },
        {
          icon: '13',
          title: '累计签到有礼',
          info: '累计签到满N天可获得奖品，刺激买家进店签到，提高会员粘性。',
          type: '10003',
        },
        {
          icon: '12',
          title: '连续签到抽奖',
          info: '每天签到，连续签到天数达到符合条件即可获得抽奖机会，提高玩家粘性。',
          type: '10004',
        },
        {
          icon: '14',
          title: '连续签到有礼',
          info: '每天签到，连续签到天数达到符合条件即可获得对应奖励，提高玩家粘性。',
          type: '10002',
        },
        {
          icon: '15',
          title: '邀请入会抽奖',
          info: '引导用户邀请好友开卡入会，迅速增加店铺曝光，提升流量及高质量会员。',
          type: '10005',
        },
        {
          icon: '16',
          title: '邀请入会有礼',
          info: '引导用户邀请好友开卡入会，按邀请数量获得不同奖品，迅速增加店铺曝光，提升流量及高质量会员。',
          type: '10006',
        },
        {
          icon: '17',
          title: '会员砍价',
          info: '人气火爆的社交引流玩法，让朋友帮忙砍价，达到一定人数即可以专享价购买商品。增加商品曝光。',
          type: '10007',
        },
        {
          icon: '18',
          title: '全店许愿',
          info: '引导用户下单、许愿，可设置许愿灯的点亮方式，以及开奖的方式。',
          type: '10008',
        },
        {
          icon: '19',
          title: '会员许愿',
          info: '引导用户通过登录分享获取抽奖资格，通过做任务的形式产生裂变。',
          type: '10009',
        },
        {
          icon: '20',
          title: '裂变抽奖',
          info: '通过关注、浏览、加购、组队的方式引导用户做任务，以换取抽奖资格。',
          type: '10010',
        },
        {
          icon: '21',
          title: '完善信息有礼',
          info: '完善个人信息，可以获得神秘礼物。',
          type: '10049',
        },
        {
          icon: '22',
          title: '会员试用',
          info: '会员有机会获得商家免费试用的商品。',
          type: '10050',
        },
        {
          icon: '11',
          title: '九宫格抽奖',
          info: '经典九宫格抽奖，完成任务获得抽奖机会，增强互动，提升转化率。',
          type: '10020',
        },
        {
          icon: '13',
          title: '大转盘抽奖',
          info: '经典大转盘抽奖，完成任务获得抽奖机会，增强互动，提升转化率。',
          type: '10021',
        },
        // {
        //   icon: '12',
        //   title: '积分抽奖',
        //   info: '。',
        //   type: '10026',
        // },
        {
          icon: '14',
          title: '评价有礼',
          info: '礼品激励买家进行评价，评价后参与抽奖，快速提升店铺DSR。',
          type: '10015',
        },
        {
          icon: '15',
          title: '每日抢好礼',
          info: '每天指定时间发放奖品，先到先得，提升店铺流量，增强粘性。',
          type: '10022',
        },
        {
          icon: '16',
          title: '加购有礼',
          info: '用户加购指定数量的商品后可领取奖；提升商品权重。',
          type: '10024',
        },
        {
          icon: '17',
          title: '关注店铺有礼',
          info: '买家关注参加活动的商品后领取奖品，提升商品的关注、增加商品权重。',
          type: '10025',
        },
        {
          icon: '18',
          title: '日历签到',
          info: '每天签到获奖，连续签到或累计签到获奖，增加用户粘性。',
          type: '10023',
        },
        {
          icon: '19',
          title: '积分PK',
          info: '话题选项二选一PK,用户消耗积分参加，积分汇入积分池，胜方瓜分积分池。',
          type: '10027',
        },
        // {
        //   icon: '20',
        //   title: '积分猜大小',
        //   info: '。',
        //   type: '10028',
        // },
      ],
    };
  },
  methods: {
    /**
     * @description:
     * @param type 活动类型
     * @param entrance 入口(从哪个位置点击的) 0活动管理  1会员互动  2会员赚积分
     */
    getRouterType(type, entrance) {
      this.routerType = window.location.href.indexOf('aaa');
      if (this.routerType > -1) {
        if (type === -1) {
          appHistory.push(' /frame/cjhy/point/manage/pointsTask?type=activity/activityCreate');
        } else if (type === -2) {
          appHistory.push(' /frame/cjhy/point/manage/pointInteraction?type=activity/activityCreate');
        }
      } else {
        this.createActivity(type, entrance);
      }
    },
    // 互动活动的活动管理
    toActivityManage(url) {
      appHistory.push(url);
    },

    /**
     * @description: 鼠标hover事件  显示创建活动
     * @param type 当前活动的类型
     * @return {*}
     */
    showCreateActivity(type) {
      this.createActivitybtn = type;
    },
    /**
     * @description: 鼠标hover事件  移除创建活动
     */
    hideCreateActivity() {
      this.createActivitybtn = '';
    },
    /**
     * @description: 点击事件  跳转活动创建页面
     * @param type 活动类型
     * @param entrance 入口(从哪个位置点击的) 0活动管理  1会员互动  2会员赚积分
     */
    createActivity(type, entrance) {
      let url = '/frame/cjhy';
      if (entrance === 0) { // 0活动管理
        if (type === -1) { // -1 会员互动的活动管理
          url += '/point/manage/pointsTask?type=activity/activityCreate';
        } else if (type === -2) { // -2 会员赚积分的活动管理
          url += '/point/manage/pointInteraction?type=activity/activityCreate';
        }
      } else if (entrance === 1) { // 1会员互动
        url += `/template/list?type=${type}`;
      } else if (entrance === 2) { // 2会员赚积分
        url += type;
      }
      appHistory.push(url);
    },
    // 新的互动子系统的创建活动
    createNewActivity(type) {
      appHistory.push(`/interact/setActivityTemplate?a=1&activityType=${type}`);
    },
    /**
     * @description: 点击事件  跳转活动列表页面
     */
    toActivities() {
      this.$router.push('/list');
    },
    /**
     *@description: 获取会员赚积分列表
     */
    async getMemberGetPointsList() {
      try {
        const { data } = await Service.getMemberPointsList({});
        this.memberPointsList = data;
      } catch (e) {
        LzMsg.error(e.message);
      }
    },
    gotoFrame(url) {
      appHistory.push(url);
    },
    async openNewWindow(url) {
      const { currentShop } = JSON.parse(localStorage.getItem(Constants.LZ_CRM_BIZ_USER) || '{}');
      const shopId = currentShop.shopId;
      const project = 'cjwx';
      // 检查是否登录
      const isSigned = sessionStorage.getItem(`CRMB_SIGNED_${project}`) === 'true';
      // // 如果已经登录,直接访问地址
      if (isSigned) {
        window.open(url);
      } else {
        // 获取mock登录地址,
        const { data } = await CrmbService.cjwxMockLogin({ shopId });
        console.log('mockUrl', data);
        window.open(`${data}&redirect=${url}`); // 先打开页面
        sessionStorage.setItem(`CRMB_SIGNED_${project}`, 'true');
      }
    },
  },
  mounted() {
    // this.getMemberGetPointsList();
  },
};
</script>

<style lang="scss">
.page-activity-square {
  a {
    color: #3399ff;
    cursor: pointer;
  }

  .activity-list {
    width: 100%;

    .activity-item {
      padding: 30px;

      .title {
        font-size: 14px;
        height: 30px;
      }

      .desc {
        color: #657180;
        font-size: 12px;
        width: 200px;
        height: 60px;

      }
      .desc-90 {
        color: #657180;
        font-size: 12px;
        width: 200px;
        height: 90px;

      }

      .buttons {
        white-space: nowrap;
      }
    }
  }

  .pointer-curser {
    cursor: pointer;
  }

  .margin-top10 {
    margin-top: 10px;
  }

  .flex {
    display: flex;
    flex-wrap: wrap;
  }

  .position-relative {
    position: relative;
  }

  .position-absolute {
    position: absolute;
  }

  .content {
    width: 100%;

    .content-title {
      font-size: 14px;
      // top: 35px;
      // left: 130px;
      top: 10px;
      left: 37px;
    }

    .content-info {
      color: #657180;
      font-size: 12px;
      width: 200px;
      top: 40px;
      left: 37px;
    }

    .content-btn {
      font-size: 14px;
      // top: 35px;
      // left: 130px;
      top: 100px;
      left: 37px;
    }
  }

  .header {
    .right {
      position: absolute;
      font-size: 12px;
      right: 0;
      top: 0;
    }

    .left {
      line-height: 16px;
      font-size: 14px;
      position: absolute;
      left: 8px;
      top: 0;
    }
  }

  .inline-block {
    display: inline-block;
  }

  .tip-blue {
    width: 3px;
    height: 14px;
    background-color: #3399ff;
  }

  .member-points-box {
    margin: 20px 0 0 0;
    gap: 20px;

    .create-activity {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 999;
      top: 0;
      left: 0;
      border: 1px red solid;

      .member-points-Mantle {
        width: 100%;
        height: 100%;
        background: black;
        opacity: 0.5;
      }

      .preview {
        font-size: 12px;
        color: white;
        position: absolute;
        left: 65px;
        bottom: 110px;
      }

      .qrCode {
        position: absolute;
        left: 44px;
        bottom: 160px;
      }

      .qrCodeImg {
        width: 80%;
      }
    }

    .memberPointsItem {
      box-sizing: border-box;
      width: 228px;
      height: 348px;
      padding: 10px;
      border: 1px solid #d7dde4;

      .preview-img {
        width: 208px;
        height: 328px;
      }
    }
  }

  .member-interact,
  .home-marketing,
  .member-points,
  .yunlu-vip {
    background-color: white;
    padding: 30px 20px 30px 20px;
    border-radius: 5px;
  }
}
</style>
