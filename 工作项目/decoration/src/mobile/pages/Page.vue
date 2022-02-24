<template>
  <div id="instance">
    <div v-if="isSuccess">
      <div class="pages">
        <div v-for="page in pages"
             :key="`${$route.params.id}-${page.infoId}`">
          <div class="page"
               v-if="page.pageId === info.pageId">
            <div v-for="(floor, index) in page.floors"
                 :key="`${$route.params.id}-${page.infoId}-${floor.floorId}`">
              <component v-if="floor.extra.isShowFloor != 0"
                         :floorInfo="{
                id: floor.extra.floorKey,
                type: floor.extra.componentId,
                order: index + 1,
              }"
                         :pageTask="pageTask"
                         @changePageTask="pageTask=true"
                         :is="floor.components.result"
                         :user="user"
                         :memberInfo="memberInfo"
                         :gradeInfo="gradeInfo"
                         :data="floor.data" />
            </div>
          </div>
        </div>
      </div>
      <div v-if="pages.length > 1"
           class="navs"></div>
    </div>
    <div v-else
         class="not-success">
      <img src="../../assets/not-success.png">
    </div>
  </div>
</template>

<script>
import {
  mapState,
  mapMutations,
} from 'vuex';
import LzEvent from 'lz-event-tracking/lib/vue';
import PageService from '@mobile/service';
import Ctrls from '@/ctrls';
import LzMsg from '@/mobile/utils/LzMsg';


export default {
  name: 'Page',
  data() {
    return {
      user: {},
      info: {},
      pages: [],
      pageTask: false,
      memberInfo: {},
      gradeInfo: [],
      isSuccess: true,
    };
  },
  async created() {
    await this.init();
    console.log('🚀🚀~ c端测试123:', 1);
  },
  mounted() {
    this.setEnterLoading(false);
  },
  watch: {
    $route() {
      this.init();
    },
  },
  methods: {
    async init() {
      await this.getShopInfo();
      await this.getUserInfo();
      if (this.$route.name === 'ShopPage') {
        // 会员中心页面
        this.getShopCenterInfo();
      } else if (this.$route.name === 'PreviewPage') {
        // 预览
        this.getPreviewPageInfo();
      } else if (this.$route.name === 'TimerPage') {
        // 预览定时
        this.getPageTimerInfo();
      } else {
        // 自定义页面
        this.getPageInfo();
      }
    },
    async getShopInfo() {
      const { data } = await PageService.getShopInfo({
        shopId: this.$route.params.shopId,
      });
    },
    async getUserInfo() {
      const { data } = await PageService.getUserInfo({
        shopId: this.$route.params.shopId,
      });
      this.user = {
        ...data,
        isDefault: false,
      };
    },

    render({ data }) {
      const pageInfo = data;
      LzEvent.setBaseInfo({
        shopId: this.$route.params.shopId, // 店铺标识，不可以为空
        customerId: this.user.customerId, // C端用户唯一身份标识customerId，不可以为空
        nickName: this.user.nickname, // 用户昵称，不可以为空
        nodeId: pageInfo.pType == 0 ? '100001001' : '100002001',
        version: pageInfo.manageInstanceId, // 版本号，可以为空
        versionName: pageInfo.instanceName, // 版本名称，可以为空
        // 以下信息京东数据回流的时候需要使用
        // jdActivityId: 'jdActivityId001', // 调用JOS创建活动接口返回的活动id
        // siteId: 'JA2019_2132395', // 京东侧注册的网站id
        // userPin: '', // 京东用户pin
        // shareUserPin: '', // 如果是分享进入的本页面需要分享人的标识
      });
      if (pageInfo.pType === 0) {
        document.title = '会员中心';
      } else if (pageInfo.pType === 1) {
        document.title = pageInfo.instanceName;
      }
      PageService.getGiftList({
        shopId: this.$route.params.shopId,
      }).then(({
        data = {},
      }) => {
        const {
          memberInfo,
          gradeInfo,
        } = data;
        this.memberInfo = memberInfo;
        if (pageInfo.memberLimit == 1 && this.memberInfo.openCardLink && this.memberInfo.openCardLink != '') {
          const link = this.memberInfo.openCardLink;
          const channelId = [7101, 7108][pageInfo.pType]; // 7101-会员中心首页， 7108-定义活动页面
          if (link.indexOf('rn_channelId') > -1) {
            window.location.href = `${link.split('rn_channelId=')[0]}rn_channelId=${channelId}&rn_returnUrl=${window.location.href}`;
          } else {
            window.location.href = `${link.split('channel=')[0]}channel=${channelId}&returnUrl=${window.location.href}`;
          }
        }
        // 按照等级给等级活动进行一次排序
        if (gradeInfo.length > 1) {
          gradeInfo.sort((g1, g2) => g1.memberRating - g2.memberRating);
        }
        this.gradeInfo = gradeInfo.map(grade => ({
          ...grade,
          giftGot: false,
        }));
      });
      const ctrls = pageInfo.components.map(c => ({
        ...Object.values(Ctrls).filter(ctrl => c.componentCode === ctrl.info.name)[0],
        componentId: c.componentId,
        info: c,
      }));

      pageInfo.pages.forEach(({
        floors,
        ...pageInfo
      }) => {
        const page = {
          ...pageInfo,
          fIndex: -1,
          floors: [],
        };
        this.pages.push(page);
        floors.forEach(async (floor) => {
          const ctrl = ctrls.filter(c => c.componentId === floor.componentId)[0];
          if (ctrl && ctrl.createFloor) {
            page.floors.push(await ctrl.createFloor({
              componentInfo: JSON.parse(JSON.stringify(ctrl.info)),
              floorId: floor.floorId,
              data: JSON.parse(floor.contentValueJson),
              extra: {
                isShowFloor: floor.isShowFloor,
                floorKey: floor.floorKey,
                componentId: floor.componentId,
              },
            }));
          }
        });
      });
      // this.pages = pageInfo.pages.map(({floors, ...info}) => {
      //   return {
      //     ...info,
      //     fIndex: -1,
      //     floors: floors.map(floor => {
      //       const ctrl = ctrls.filter(c => c.componentId === floor.componentId)[0];
      //       return ctrl.createFloor({
      //         floorId: floor.floorId,
      //         data: JSON.parse(floor.contentValueJson)
      //       });
      //     })
      //   }
      // })
      this.info = pageInfo;
      this.setLoading(false);
    },
    getShopCenterInfo() {
      PageService.getShopCenterInfo({
        shopId: this.$route.params.shopId,
      }).then(this.render).catch(e => LzMsg.fail(e.message));
    },
    getPageInfo() {
      PageService.getPageInstanceInfo({
        instanceId: this.$route.params.instanceId,
      }).then(this.render).catch((e) => {
        console.log(e.message);
        this.isSuccess = false;
        this.setLoading(false);
      });
    },

    getPreviewPageInfo() {
      PageService.getPreviewPageInfo({
        instanceId: this.$route.params.instanceId,
      }).then(this.render).catch((e) => {
        console.log(e.message);
        LzMsg.fail(e.message);
      });
    },
    getPageTimerInfo() {
      PageService.getPageTimerInfo({
        instanceId: this.$route.params.instanceId,
      }).then(this.render).catch((e) => {
        console.log(e.message);
        LzMsg.fail(e.message);
      });
    },
    // getCtrls() {
    //   PageService.getPageInstanceInfo()
    // },
    ...mapMutations(['setEnterLoading', 'setLoading']),
  },
};
</script>

<style lang="scss">
#instance {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  .pages {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .not-success {
    display: flex;
    justify-content: center;

    img {
      width: 2rem;
      height: 2.55rem;
      position: relative;
      top: 3rem;
    }
  }
  .navs {
  }
}
</style>
