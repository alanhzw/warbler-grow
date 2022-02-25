<template>
  <div v-if="showPage">
    <div
      class="bg"
      :style="{
      backgroundColor: pageSetting1.backgroundColor,
      color: pageSetting1.textColor,
    }"
    >
      <div
        class="index pos-re"
        :style="{ backgroundImage: 'url(' + pageSetting1.backgroundImage + ')' }"
      >
        <div>
          <div class="user-infor">
            <img :src="userInfor.img" class="user-img"/>
            <div>
              <p class="user-name">{{ userInfor.name }}</p>
              <div v-if="userInfor.levelName" class="user-level">
                <div :style="{color: pageSetting1.textButtonColor}">{{ userInfor.levelName }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="tab" :style="{backgroundColor: pageSetting1.panelBackgroundColor}">
          <div
            class="tab-button"
            v-for="item in tabList"
            :key="item.id"
            :class="{ 'tab-active': item.id === tabId }"
            :style="{backgroundColor: item.id === tabId?pageSetting1.SelectedTabBackgroundColor:pageSetting1.unselectedTabBackgroundColor}"
            @click="cutover(item.id)"
          >
            <div :style="{color: item.id === tabId?pageSetting1.selectedTabColor:pageSetting1.unSelectedTabColor}">{{ item.name }}</div>
            <b :style="{backgroundColor: item.id === tabId?pageSetting1.selectedTabColor:''}"></b>
          </div>
        </div>
        <div class="coupon-list" v-if="couponList.length > 0">
          <div
            class="coupon-bk pos-re"
            v-for="(item, index) in couponList"
            :key="index"
            :style="{backgroundImage: 'url(' + pageSetting1.cardBackgroundImage + ')'}"
          >
            <div class="coupon">
              <div :class="{ op45: tabId !== 0 }">
                <div class="coupon-name" :style="{color: pageSetting1.cardTitleColor}">{{ item.couponName }}</div>
                <div class="coupon-time" :style="{color: pageSetting1.cardDescriptionColor}">
                  {{ addTime(item.startTime) }}至{{ addTime(item.endTime) }}可用
                </div>
                <div class="coupon-inline">
                  <div class="coupon-button" @click="getCouponQRCode(index)"
                       :style="{border: '0.02rem solid '+ pageSetting1.carButtonColor, color: pageSetting1.carButtonColor,backgroundColor:pageSetting1.cardButtonBackgroundColor}">
                    立即使用
                  </div>
                  <div class="coupon-times">剩余{{ item.remainTimes }}次</div>
                </div>
              </div>
            </div>
            <div v-if="tabId !== 0">
              <img
                src="//img10.360buyimg.com/imgzone/jfs/t1/206549/30/15457/11066/61dbfdc5Ef8311222/42ad54c4ab8b50e7.png"
                v-if="tabId === 3"
                class="coupon-watermark"
              />
              <img
                src="//img10.360buyimg.com/imgzone/jfs/t1/203251/29/19530/11075/61dbfdc5E37b72b1f/fa526f35cbb7a6ed.png"
                v-else-if="tabId === 4"
                class="coupon-watermark"
              />
            </div>
          </div>
        </div>
        <div v-else class="coupon-no">
          <img
            src="//img10.360buyimg.com/imgzone/jfs/t1/141082/19/26384/43551/61dc0d9eEd4de9eee/e209f8c246e3368c.png"
          />
        </div>
      </div>
      <van-popup v-model="codeShow" class="full">
        <i-coupon-q-rcode
          :codeInfor="codeInfor"
          :couponDesc="couponDesc"
          :pageSetting2="pageSetting2"
          @codeBack="codeBack"
        ></i-coupon-q-rcode>
      </van-popup>
    </div>
  </div>
</template>
<script>
import vue from 'vue';
import {
  Toast,
  Popup,
} from 'vant';
import CONST from '@/utils/constant';
import { PointsService } from '@/http';
import setHeaderShare from '@/utils/jdShare';
import ICouponQRcode from '@/components/ICouponQRcode.vue';

let customizationId = '';
let venderId = '';
vue.use(Popup);
export default {
  components: { ICouponQRcode },
  name: 'couponCenter',
  data() {
    return {
      showPage: false,
      pageSetting1: {},
      pageSetting2: {},
      shopId: '',
      codeShow: false,
      tabId: 0,
      tabList: [
        {
          id: 0,
          name: '可使用',
        },
        {
          id: 3,
          name: '已使用',
        },
        {
          id: 4,
          name: '已过期',
        },
      ],
      userInfor: {
        name: '',
        img: '//img10.360buyimg.com/imgzone/jfs/t1/218938/6/10162/3879/61d56cd9E0e54edd1/88aa717be1a3a959.jpg',
        levelName: '',
      },
      couponList: [],
      codeInfor: '',
      couponDesc: '',
    };
  },
  mounted() {
    this.shopId = this.$route.query.shopId ? this.$route.query.shopId : sessionStorage.getItem('LZ_CRM_CUSTOMER_ShopId');
    customizationId = this.$route.query.customizationId;
    venderId = this.$route.query.venderId;
    sessionStorage.setItem('LZ_CRM_CUSTOMER_ShopId', this.shopId);
    this.getSetting();
    this.getUserInfor();
    this.getCouponList(0);
    // 设置头部分享
    setHeaderShare({
      // 分享方式，如果不守则，默认值："H5"
      type: CONST.SHARE_TYPE,
      // 分享标题，如果不设置，默认值："请您参与活动"
      title: document.title,
      // 分享图片, 如果不设置，默认值："defaultShareImg"
      // imageUrl: `${CONST.IMAGE_PREFIX}${this.details.showPicsParse}`,
    });
  },
  methods: {
    // 获取页面配置
    async getSetting() {
      const res = await PointsService.getCouponCenterSetting({
        customizationId,
        venderId,
      });
      const pageSetting = JSON.parse(res.data);
      this.pageSetting1 = pageSetting.page1;
      this.pageSetting2 = pageSetting.page2;
      this.showPage = true;
    },
    // 获取用户信息
    async getUserInfor() {
      const res = await PointsService.getLevelNameCouponCenter({
        venderId,
      });
      if (res.success) {
        this.userInfor.levelName = res.data;
      }
      const customerUser = JSON.parse(sessionStorage.getItem(CONST.LZ_CRM_CUSTOMER_USER));
      this.userInfor.name = customerUser.nickname;
      this.userInfor.img = customerUser.imageUrl ?? '//img10.360buyimg.com/imgzone/jfs/t1/218938/6/10162/3879/61d56cd9E0e54edd1/88aa717be1a3a959.jpg';
    },
    // 获取券列表
    async getCouponList(state) {
      const res = await PointsService.getCouponListCouponCenter({
        venderId,
        state,
      });
      this.couponList = res.data;
      return res.data;
    },
    // 获取券二维码
    async getCouponQRCode(index) {
      const res = await PointsService.getCouponQRCodeCouponCenter({
        venderId,
        couponId: this.couponList[index].couponId,
        consumberId: this.couponList[index].consumberId,
        couponTypeId: this.couponList[index].couponTypeId,
      });
      this.codeInfor = res.data;
      this.couponDesc = this.couponList[index].couponDesc;
      this.codeShow = true;
    },
    addTime(time) {
      return time.slice(0, 10);
    },
    async cutover(id) {
      await this.getCouponList(id);
      this.tabId = id;
    },
    codeBack() {
      this.codeShow = false;
      this.getCouponList(this.tabId);
    },
  },
};
</script>
<style scoped lang="scss">
html {
  /*background: #f5e3ec;*/
  /* max-width: 750px; */
  margin: 0 auto;
}

* {
  box-sizing: border-box;
}

.van-popup {
  background: none;
  overflow: hidden;
}

.van-toast {
  background-color: rgba(0, 0, 0, 0.7);
}

.show {
  background-color: rgba(0, 0, 0, 0.7);
}

input {
  box-sizing: border-box;
}

img {
  width: 100%;
  display: block;
}

.fliter-gray {
  filter: grayscale(1);
}

.pos-re {
  position: relative;
}

.index {
  background-repeat: no-repeat;
  background-size: 100%;
  // background-position-x: center;
  // background-position-y: -1.26rem;
  min-height: 100vh;

  .user-infor {
    display: flex;
    padding: 0.32rem;

    .user-img {
      width: 1.2rem;
      height: 1.2rem;
      object-fit: cover;
      border-radius: 0.08rem;
      margin-right: 0.16rem;
    }

    .user-name {
      font-size: 0.32rem;
      font-weight: 500;
      margin-top: 0.16rem;
    }

    .user-level {
      background: linear-gradient(90deg, #ffeddc 0%, #fec79c 100%);
      border-radius: 0.18rem;
      border: 0.02rem solid rgba(254, 201, 160, 1);
      text-align: center;
      padding: 0 0.1rem;
      width: fit-content;
      margin-top: 0.2rem;

      div {
        font-size: 0.2rem;
        line-height: 0.28rem;
        // background: linear-gradient(303deg, #5c3733 0%, #8a5834 100%);
        // -webkit-background-clip: text;
        // -webkit-text-fill-color: transparent;
      }
    }
  }

  .tab {
    display: flex;
    justify-content: space-between;
    padding: 0 1.75rem;
    margin-bottom: 0.48rem;

    .tab-button {
      text-align: center;
      font-size: 0.36rem;
      line-height: 0.36rem;

      b {
        width: 0.32rem;
        height: 0.06rem;
        display: block;
        margin: 0.08rem auto 0;
        border-radius: 0.03rem;
      }
    }

    .tab-active {
      font-weight: bold;
    }
  }

  .coupon-list {
    padding: 0 0.32rem;
    text-align: left;

    .coupon-bk {
      background-repeat: no-repeat;
      background-size: cover;
      border-radius: 0.24rem;
      overflow: hidden;
      margin-bottom: 0.24rem;

      .coupon {
        background-color: rgba(0, 0, 0, 0.75);
        height: 2.48rem;
        padding: 0.32rem;

        .coupon-name {
          font-size: 0.32rem;
          line-height: 0.32rem;
          font-weight: bold;
          margin-bottom: 0.24rem;
        }

        .coupon-time {
          font-size: 0.24rem;
          line-height: 0.24rem;
          opacity: 0.85;
          margin-bottom: 0.32rem;
          opacity: 0.85;
        }

        .coupon-inline {
          display: flex;
          align-items: center;

          .coupon-button {
            width: 1.6rem;
            line-height: 0.56rem;
            border: 0.02rem solid #fff;
            font-size: 0.28rem;
            text-align: center;
            border-radius: 0.28rem;
            margin-right: 0.24rem;
          }

          .coupon-times {
            font-size: 0.24rem;
            opacity: 0.85;
          }
        }
      }

      .coupon-watermark {
        position: absolute;
        top: 0;
        right: 0;
        width: 1.64rem;
      }

      .op45 {
        opacity: 0.45;
      }
    }
  }

  .coupon-no {
    padding-top: 1.4rem;

    img {
      width: 3.2rem;
      margin: 0 auto;
    }
  }
}

.full {
  width: 100%;
  height: 100%;
}

.end {
  background-color: #fff;
  padding: 1.3rem 0.32rem 0;
  color: #000;
  height: 100%;
  overflow-y: scroll;

  .mar-bo-144 {
    margin-bottom: 1.44rem;
  }

  .end-icon {
    width: 1.28rem;
    margin: 0 auto 0.64rem;
  }

  .end-titel {
    font-size: 0.32rem;
    font-weight: bold;
    text-align: center;
  }

  .button {
    line-height: 0.88rem;
    border-radius: 0.44rem;
    border: 0.02rem solid #000;
    font-size: 0.28rem;
    text-align: center;
    margin-bottom: 0.24rem;
  }

  .go-shop {
    background-color: #000;
    color: #fff;
  }
}
</style>
