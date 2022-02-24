<template>
  <div id="instance">
    <div class="pages">
      <div v-for="page in pages"
           :key="`${$route.params.id}-${page.infoId}`"
           style='pointer-events: none;'>
        <div class="page"
             v-if="page.pageId === info.pageId">
          <component v-for="(floor, index) in page.floors"
                     :key="`${$route.params.id}-${page.infoId}-${floor.floorId}`"
                     elemName="楼层"
                     :primaryKey="0"
                     elemId="001"
                     :floorIndex="index + 1"
                     :storeyId="floor.storeyId"
                     :floorId="floor.floorId"
                     :componentId="floor.componentInfo.componentId"
                     :componentName="floor.componentInfo.componentName"
                     :mouldId="floor.infoId"
                     :is="floor.components.preview"
                     :user="user"
                     :memberInfo="memberInfo"
                     :gradeInfo="gradeInfo"
                     :pageTask="pageTask"
                     @changePageTask="pageTask=true"
                     :storeyName="floor.data.floorName"
                     :data="floor.data" />
        </div>
      </div>
    </div>
    <div v-if="pages.length > 1"
         class="navs"></div>
  </div>
</template>

<script>
import {
  mapState,
  mapMutations,
} from 'vuex';
import PageService from '@mobile/service';
import Ctrls from '@/ctrls';
import LzMsg from '@/mobile/utils/LzMsg';

export default {
  name: 'PreviewPage',
  data() {
    return {
      user: {},
      info: {},
      pages: [],
      pageTask: false,
      memberInfo: {},
      gradeInfo: [],
    };
  },
  created() {
    this.init();
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
    init() {
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
      this.getShopInfo();
      this.getUserInfo();
    },
    async getShopInfo() {
      const { data } = await PageService.getShopInfo({
        shopId: this.$route.params.shopId,
      });
      console.log('🚀 ~ getShopInfo ~ data', data);
    },
    async getUserInfo() {
      const { data } = await PageService.getUserInfo({
        shopId: this.$route.params.shopId,
      });
      console.log('🚀 ~ getUserInfo ~ data', data);
      this.user = {
        ...data,
        isDefault: false,
      };
    },

    render({ data }) {
      const pageInfo = data;
      if (pageInfo.pType === 0) {
        document.title = '会员中心';
      } else if (pageInfo.pType === 1) {
        document.title = pageInfo.instanceName;
      }

      // PageService.quertMemberGradeStatus(shopInfo).then(({
      //   data = {}
      // }) => {
      //   const {
      //     memberInfo,
      //     gradeInfo
      //   } = data;
      //   this.memberInfo = memberInfo;
      //   this.memberInfo.openCardLink = this.memberInfo.openCardLink.split('channel=')[0] + 'channel=' + pageInfo.channelId;
      //   if (!userInfo.grade > 0) {
      //     window.location.href = this.memberInfo.openCardLink;
      //   }
      //   // 按照等级给等级活动进行一次排序
      //   if (gradeInfo.length > 1) {
      //     gradeInfo.sort((g1, g2) => g1.memberRating - g2.memberRating);
      //   }
      //   this.gradeInfo = gradeInfo.map(grade => ({
      //     ...grade,
      //     giftGot: false,
      //   }));
      // })
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
        LzMsg.fail(e.message);
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

  .navs {
  }
}
</style>
