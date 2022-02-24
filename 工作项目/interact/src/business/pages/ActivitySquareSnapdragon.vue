<template>
  <!-- 互动广场 -->
  <div class="page-activity-square">
    <!-- 骁龙定制 -->
    <div class="card margin-top10">
      <div class="header position-relative">
        <div>
          <div class="tip-blue inline-block"></div>
          <div class="inline-block left">骁龙定制</div>
        </div>
        <div class="right inline-block">
          <a @click="toActivityManage('/interact/activityManage')">活动管理</a>
        </div>
      </div>
      <div class="content flex">
        <lz-row class="activity-list">
          <lz-col :span="8" v-for="(item,index) in customized" :key="index">
            <div class="activity-item">
              <div class="title">{{ item.title }}</div>
              <div class="desc">{{ item.info }}</div>
              <div class="buttons">
                <lz-button type="primary" plain @click="createNewActivity(item.type)">创建活动</lz-button>
                <lz-button
                  v-if="item.manage"
                  type="warning"
                  plain
                  @click="toActivityManage(item.manage.url)"
                >{{ item.manage.title }}</lz-button>
              </div>
            </div>
          </lz-col>
        </lz-row>
      </div>
    </div>

    <!-- 骁龙互动 -->
    <div class="card margin-top10">
      <div class="header position-relative">
        <div>
          <div class="tip-blue inline-block"></div>
          <div class="inline-block left">骁龙互动</div>
        </div>
        <div class="right inline-block">
          <a @click="toActivityManage('/interact/activityManage')">活动管理</a>
        </div>
      </div>
      <div class="content flex">
        <lz-row class="activity-list">
          <lz-col :span="8" v-for="(item,index) in interaction" :key="index">
            <div class="activity-item">
              <div class="title">{{ item.title }}</div>
              <div class="desc">{{ item.info }}</div>
              <div class="buttons">
                <lz-button type="primary" plain @click="createNewActivity(item.type)">创建活动</lz-button>
                <lz-button
                  v-if="item.manage"
                  type="warning"
                  plain
                  @click="toActivityManage(item.manage.url)"
                >{{ item.manage.title }}</lz-button>
              </div>
            </div>
          </lz-col>
        </lz-row>
      </div>
    </div>

    <!-- 骁龙专享 -->
    <div class="card margin-top10">
      <div class="header position-relative">
        <div>
          <div class="tip-blue inline-block"></div>
          <div class="inline-block left">骁龙专享</div>
        </div>
        <div class="right inline-block">
          <a @click="toActivities">活动管理</a>
        </div>
      </div>
      <div class="content flex">
        <lz-row class="activity-list">
          <lz-col :span="8" v-for="(item,index) in vip" :key="index">
            <div class="activity-item">
              <div class="title">{{ item.title }}</div>
              <div class="desc">{{ item.info }}</div>
              <div class="buttons">
                <lz-button type="primary" plain @click="$router.push('/' + item.type + '/new')">创建活动</lz-button>
              </div>
            </div>
          </lz-col>
        </lz-row>
      </div>
    </div>

    <!-- 会员互动 -->
    <div class="card margin-top10">
      <div class="header position-relative">
        <div>
          <div class="tip-blue inline-block"></div>
          <div class="inline-block left">会员互动</div>
        </div>
        <div class="right inline-block">
          <a @click="getRouterType" class="pointer-curser">活动管理</a>
        </div>
      </div>
      <div class="content flex">
        <lz-row class="activity-list">
          <lz-col :span="8" v-for="(item,index) in member" :key="index">
            <div class="activity-item">
              <div class="title">{{ item.title }}</div>
              <div class="desc">{{ item.info }}</div>
              <div class="buttons">
                <lz-button type="primary" plain @click="gotoFrame(item.url)">创建活动</lz-button>
              </div>
            </div>
          </lz-col>
        </lz-row>
      </div>
    </div>
  </div>
</template>

<script>
import { appHistory } from '@ice/stark-app';

export default {
  name: 'ActivitySquare',
  data() {
    return {
      routerType: '',
      createActivitybtn: '', // 控制鼠标经过显示创建活动
      // 骁龙定制
      customized: [
        {
          icon: '10011',
          title: '答题抽奖',
          info: '会员答题提交后可领取奖品',
          type: '10011',
          manage: {
            title: '题库管理',
            url: '/interact/questionsBank?bankType=1',
          },
        },
        {
          icon: '10012',
          title: '问卷抽奖',
          info: '会员填写调查问卷提交成功后可领取奖品',
          type: '10012',
          manage: {
            title: '题库管理',
            url: '/interact/questionsBank?bankType=2',
          },
        },
        {
          icon: '10013',
          title: '分享视频/文章有礼',
          info: '分享活动后，邀请一定数量用户成功参与活动，可以领取奖品',
          type: '10013',
        },
        {
          icon: '10014',
          title: '上传图片点赞排名有礼',
          info: '可以上传上照片，集赞，根据点赞数量排名获得相应礼品',
          type: '10014',
        },
      ],
      // 骁龙互动
      interaction: [
        {
          icon: '10001',
          title: '累计签到抽奖',
          info: '累计签到满N天可得抽奖机会，刺激买家进店签到，提高会员粘性',
          type: '10001',
        },
        {
          icon: '10003',
          title: '累计签到有礼',
          info: '累计签到满N天可获得奖品，刺激买家进店签到，提高会员粘性',
          type: '10003',
        },

        {
          icon: '10006',
          title: '邀请入会有礼',
          info: '引导用户邀请好友开卡入会，按邀请数量获得不同奖品，迅速增加店铺曝光，提升流量及高质量会员',
          type: '10006',
        },
      ],
      // 骁龙专享
      vip: [
        {
          icon: '22',
          title: '会员集卡',
          info: '人气火爆的互动玩法，会员集齐全部卡片后可获得奖励',
          type: '504',
        },
      ],
      // 会员互动
      member: [{
        icon: '01',
        title: '关注店铺有礼',
        info: '关注店铺即可领奖，砸金蛋、抢红包等多种趣味玩法可选，光速涨粉',
        type: '17',
        url: '/frame/cjhy/template/list?type=17',
      },
      {
        icon: '02',
        title: '组队瓜分京豆',
        info: '买家分享活动，邀请好友成为会员参与组队，组队成功后战队成员均可瓜分京豆',
        type: '100',
        url: '/frame/cjhy/template/list?type=100',
      },
      {
        icon: '03',
        title: '组队瓜分积分',
        info: '买家分享活动，邀请好友成为会员参与组队，组队成功后战队成员均可瓜分积分',
        type: '102',
        url: '/frame/cjhy/template/list?type=102',
      },
      {
        icon: '04',
        title: '每日抢好礼',
        info: '限时限量发放好礼，制造紧迫感，吸引会员定时参与店铺活动',
        type: '16',
        url: '/frame/cjhy/template/list?type=16',
      },
      {
        icon: '05',
        title: '完善信息有礼',
        info: '填写完整人信息，提交后赠送礼品，提高客户信息完整度，增强店铺活动拓展性',
        type: '',
        url: '/frame/cjhy/completeInfoActivity/view/create',
      },
      {
        icon: '06',
        title: '九宫格抽奖',
        info: '经典玩法，多种奖品提高吸引力，预设概率控制成本，提高发券量',
        type: '12',
        url: '/frame/cjhy/template/list?type=12',
      },
      {
        icon: '07',
        title: '大转盘抽奖',
        info: '经典抽奖玩法，自由设置多种奖品，中奖概率，丰富活动模板可选',
        type: '13',
        url: '/frame/cjhy/template/list?type=13',
      },
      ],
    };
  },
  methods: {
    gotoFrame(url) {
      appHistory.push(url);
    },

    getRouterType() {
      appHistory.push(' /frame/cjhy/point/manage/pointsTask');
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
     *  @param type 活动类型
     *  @param entrance 入口(从哪个位置点击的) 0活动管理  1会员互动  2会员赚积分
     */
    createActivity(type, entrance) {
      this.$router.push({
        name: 'ActivityCreate',
        params: {
          type,
          entrance,
        },
      });
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
  },
  mounted() {
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

      .buttons {
        white-space: nowrap;
      }
    }
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

  .card,
  .member-interact,
  .home-marketing,
  .member-points,
  .snapdragon-vip,
  .yunlu-vip {
    background-color: white;
    padding: 30px 20px 30px 20px;
    border-radius: 5px;
  }
}
</style>
