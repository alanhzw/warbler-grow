<template>
  <div v-if="isActShow">
    <div class="all" @click="handleSideBar(false)" v-cloak>
      <!-- 首页 -->
      <div class="home" :style="getStyle('page1')" v-show="isShowType===1 || isShowType ===3">
        <div class="info">
          <div class="message">{{ ruleInfo.simpleRule }}</div>
        </div>
        <div class="btn">
          <div class="apply-btn" @click="apply()"
               :style="[{background:pageStyle.page1.applyButtonBackgroundColor,color:pageStyle.page1.applyButtonColor}]">
            立即申领
            <van-icon name="arrow"/>
            <!--            <van-icon class-prefix="my-icon" name="jiantou"/>-->
          </div>
        </div>
      </div>

      <!-- 不满足领取条件 -->
      <div class="fail-condition" :style="getStyle('page2')" v-show="isShowType===0">
        <div class="info">
          <div class="message">
            <div style="text-align: center">您不满足活动条件的原因可能如下所示：</div>
            {{ ruleInfo.noSatisfyRUle }}
          </div>
        </div>
        <div class="btn">
          <a :href="pageStyle.page2.moreButtonLink">
            <div class="btn-bg"
                 :style="[{background:pageStyle.page2.moreButtonBackgroundColor,color:pageStyle.page2.moreButtonColor}]">
              参加更多会员活动
              <van-icon name="arrow"/>
              <!--                <van-icon class-prefix="my-icon" name="jiantou"/>-->
            </div>
          </a>
        </div>
      </div>

      <!-- 申领成功 -->
      <div class="apply-success" :style="getStyle('page3')" v-show="isShowType===2">
        <div class="btn" style="top: .2rem" @click.stop="handleSideBar(true)">查看活动规则</div>
        <div class="btn" style="top: .9rem" @click="openDialog('stragegy')">查看领取攻略</div>
        <img :src="pageStyle.page3.kv" style="width: 7rem"/>
        <div class="sku">
          <div class="view" v-for="(item) in skusList" :key="item.id" @click="gotoSkuPage(item.skuId)">
            <img :src="getSkuImg(item.logo)" style="width: 3rem"/>
            <div class="sku-name">{{ item.skuName }}</div>
            <div class="price-btn"
                 :style="[{background:pageStyle.page3.joinButtonBackgroundColor,color:pageStyle.page3.joinButtonColor}]">
              <div class="price-num" style="">
                ￥{{ item.jdPrice }}
              </div>
              <div class="" style="width: 1.5rem">立即抢购</div>
            </div>
          </div>
        </div>
        <!--      <img src="./assets/apply/go-shop.png" @click="gotoShopPage()" style="width: 2.66rem;padding-bottom: .5rem"/>-->
      </div>

      <div v-if="isShowType!==2" class="rule-btn" @click.stop="handleSideBar(true)"
           :style="[{background:pageStyle.page1.ruleButtonBackgroundColor,color:pageStyle.page1.ruleButtonColor}]">
        活动规则
      </div>
    </div>

    <RuleSideBar :showSideBar="isShowSideBar" :ruleInfo="ruleInfo.complexRule"></RuleSideBar>

    <van-popup class="popup" v-model="dialogShow" :close-on-click-overlay="dialogName === 'stragegy'?true:false">
      <NotStartDialog @closeDialog="closeDialog" v-if="dialogName === 'noStart'"></NotStartDialog>
      <FinishDialog @closeDialog="closeDialog" v-if="dialogName === 'finish'" :pageStyle="pageStyle.page4"></FinishDialog>
      <StragegyDialog @closeDialog="closeDialog" v-if="dialogName === 'stragegy'" :pageStyle="pageStyle.page5"></StragegyDialog>
    </van-popup>
  </div>
</template>

<script>
import './assets/css/iconfont.css';
import { openCard } from '@/assets/js/openCard';
import RuleSideBar from './components/RuleSideBar.vue';
import FinishDialog from './components/FinishDialog.vue';
import StragegyDialog from './components/StragegyDialog.vue';
import NotStartDialog from './components/NotStartDialog.vue';
// 网络请求
import { PointsService } from '@/http';
import { qs, gotoSkuPage } from './utils/index';
import Qs from 'qs';
import setHeaderShare from '@/utils/jdShare';
import constant from '@/utils/constant';

export default {
  mixins: [openCard],
  name: 'Purchase',
  components: {
    RuleSideBar,
    FinishDialog,
    NotStartDialog,
    StragegyDialog,
  },
  data() {
    return {
      tplId: '',
      type: '',
      activityId: '',

      isActShow: false,
      openCard: false, // 用户是否开卡
      isShowType: 1, // 显示页面类型  // 用户是否满足条件 0 不满足条件 1 满足条件 2 已申领 3 已抢光
      portType: 0, // 接口返回用户符合类型
      isShowSideBar: false, // 侧边栏显示状态
      dialogShow: false, // 弹窗是否显示
      dialogName: '', // 弹窗名称
      pageStyle: {},
      skusList: [], // 曝光商品列表
      ruleInfo: {
        complexRule: '',
        simpleRule: '',
        noSatisfyRUle: '',
      },
    };
  },
  async created() {
    await this.getParams();
    // await this.getOpenCard();
  },
  mounted() {
    this.activityContent();
  },
  methods: {
    // 获取活动链接参数
    async getParams() {
      // 解析url参数
      let params;
      if (window.location.href.indexOf('sid') > -1) {
        params = Qs.parse(window.location.hash.split('?')[1] || '');
      } else {
        params = Qs.parse(window.location.href.split('?')[1] || '');
      }
      const { activityId } = params;
      this.activityId = activityId;
    },
    // 打开弹窗
    openDialog(name) {
      this.dialogName = name;
      this.dialogShow = true;
    },
    // 关闭弹窗
    closeDialog() {
      this.dialogShow = false;
    },
    // 操作侧窗
    handleSideBar(isShow) {
      console.log(isShow);
      this.isShowSideBar = isShow;
    },
    // 跳转曝光商品详情页面
    gotoSkuPage(skuId) {
      gotoSkuPage(skuId);
    },
    // 获取SkuImg
    getSkuImg(url) {
      const isAllUrl = url.includes('360buyimg');

      return isAllUrl ? url : `https://img10.360buyimg.com/imgzone/${url}`;
    },

    // 获取背景图片
    getStyle(name) {
      return `background:${this.pageStyle[name]?.backgroundColor} url(${this.pageStyle[name]?.backgroundImage}) no-repeat;background-size:contain`;
    },

    async getOpenCard() {
      const { data } = await PointsService.getOpenCard({});
      if (!data.openedCard) {
        window.location.href = `${data.openCardLink}&returnUrl=${encodeURIComponent(window.location.href)}`;
      }
    },

    // 获取活动信息
    async activityContent() {
      const { data } = await PointsService.getPurchaseConfig({
        activityId: this.activityId,
      });
      this.pageStyle = JSON.parse(data.configJson);
      this.ruleInfo.simpleRule = data.demo;
      this.ruleInfo.complexRule = data.activityRule;
      this.ruleInfo.noSatisfyRUle = data.notQualified;
      this.skusList = data.purchaseShowSkuDTOS;
      this.portType = data.status;
      const startDateNum = new Date(data.startTime);
      // 当前时间 < 活动开始时间 （活动还未开始）
      if (new Date().getTime() < startDateNum.getTime()) {
        // 活动未开始
        this.openDialog('noStart');
      } else if (this.portType === 3 || this.portType === 5) {
        // 奖品已领光 || 活动已结束
        this.openDialog('finish');
      }
      this.isShowType = 1;
      this.isActShow = true;
      console.log(this.pageStyle);
      document.title = data.activityName;
      await this.getOpenCard();

      // 设置头部分享
      setHeaderShare({
        // 分享方式，如果不守则，默认值："H5"
        type: constant.SHARE_TYPE,
        // 分享标题，如果不设置，默认值："请您参与活动"
        title: data.shareTitle,
        // 分享图片, 如果不设置，默认值："defaultShareImg"
        imageUrl: data.shareImage,
      });
    },

    // 申领按钮
    async apply() {
      if (this.portType === 1) {
        const { data } = await PointsService.getPurchaseToken({
          activityId: this.activityId,
        });
        // 奖品已领光 || 活动已结束
        if (data.status === 3 || data.status === 5) {
          this.openDialog('finish');
        } else {
          // 申领成功
          this.isShowType = 2;
        }
      } else {
        if (this.portType === 3 || this.portType === 5) {
          this.openDialog('finish');
        } else {
          this.isShowType = this.portType;
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.van-popup {
  background-color: transparent;
}

.van-toast {
  background-color: var(--van-toast-background-color);
}

.all {
  height: 100vh;
  background-color: #f3e9e9;

  .home {
    width: 7.5rem;
    min-height: 100vh;
    margin: 0 auto;
    padding-top: 8.39rem;
    box-sizing: border-box;
    background-repeat: no-repeat;
    background-size: contain;

    .info {
      width: 6.54rem;
      height: 2.45rem;
      margin: 0 auto;
      padding-top: .15rem;
      position: relative;
      background: #FFFFFF;
      border: solid 1px #000000;
      box-shadow: 0 0.02rem 0.07rem 0 rgba(0, 0, 0, 0.79);

      .message {
        width: 100%;
        height: 2.2rem;
        font-size: .25rem;
        color: #000000;
        padding: .2rem;
        text-align: left;
        box-sizing: border-box;
        overflow-y: auto;
        white-space: pre-line;
      }
    }

    .btn {
      width: 100%;
      margin-top: .48rem;

      .apply-btn {
        width: 2.5rem;
        height: 0.68rem;
        border-radius: 0.34rem;
        line-height: .68rem;
        margin: 0 auto;
        padding: 0 .3rem 0 .4rem;
        font-size: .36rem;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #FFFFFF;
        white-space: nowrap;
        background: #027DB4;
      }
    }
  }

  .fail-condition {
    width: 7.5rem;
    min-height: 100vh;
    margin: 0 auto;
    padding-top: 8.39rem;
    box-sizing: border-box;
    background-color: #f3e9e9;

    .info {
      width: 6.54rem;
      height: 2.45rem;
      margin: 0 auto;
      padding-top: .15rem;
      position: relative;
      background: #FFFFFF;
      border: solid 1px #000000;
      box-shadow: 0 0.02rem 0.07rem 0 rgba(0, 0, 0, 0.79);

      .message {
        width: 100%;
        height: 2.2rem;
        font-size: .25rem;
        color: #000000;
        padding: .2rem;
        text-align: left;
        box-sizing: border-box;
        overflow-y: auto;
        white-space: pre-line;
      }
    }

    .btn {
      width: 100%;
      margin-top: .48rem;

      .btn-bg {
        width: 4.01rem;
        height: 0.68rem;
        line-height: .68rem;
        border-radius: 0.34rem;
        margin: 0 auto;
        padding: 0 .3rem 0 .4rem;
        font-size: .36rem;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #FFFFFF;
        background: #027DB4;
      }
    }
  }

  .apply-success {
    width: 7.5rem;
    min-height: 100vh;
    margin: 0 auto;
    padding-top: .71rem;
    box-sizing: border-box;
    background-color: #f3e9e9;
    position: relative;
    text-align: center;
    padding-bottom: .5rem;

    .sku {
      padding: .2rem;
      display: flex;
      flex-wrap: wrap;

      .view {
        width: 3rem;
        margin: .25rem;
        background: #FFFFFF;

        .sku-name {
          font-size: .25rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .price-btn {
          width: 2.47rem;
          height: .44rem;
          line-height: .44rem;
          border-radius: .5rem;
          padding-left: .05rem;
          font-size: .24rem;
          margin: 0.1rem auto;
          display: flex;
          align-items: center;

          .price-num {
            width: 1.6rem;
            height: .35rem;
            line-height: .35rem;
            font-size: .3rem;
            font-family: SourceHanSansCN-Medium;
            text-align: center;
            background: #fff;
            color: #000;
            border-radius: .3rem;
            padding: .01rem;
            box-sizing: border-box
          }
        }
      }
    }

    .btn {
      width: 2.45rem;
      height: .6rem;
      line-height: .6rem;
      letter-spacing: .02rem;
      font-weight: 600;
      font-size: .32rem;
      position: absolute;
      right: 0;
      top: 1.1rem;
      z-index: 9;
      background: #000000;
      color: #FFFFFF;
      border-radius: .3rem 0 0 .3rem;
    }
  }

  .rule-btn {
    width: 0.62rem;
    height: 2.19rem;
    position: absolute;
    top: 3rem;
    right: 0;
    padding: .2rem .1rem .1rem;
    box-sizing: border-box;
    background: #000000;
    color: #FFFFFF;
    writing-mode: vertical-lr;
    letter-spacing: .05rem;
  }
}
</style>
