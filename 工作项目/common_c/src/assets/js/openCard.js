import { PointsService } from '@/http';

const channelIdArr = [
  {
    channelIds: [206265, 1000002791], // 滴露
    product_channelId: 7209,
    coupon_channelId: 7220,
  }, {
    channelIds: [654211, 1000102783], // finish
    product_channelId: 7205,
    coupon_channelId: 7206,
  }, {
    channelIds: [34184, 78098, 635573, 1000001462, 128712], // 杜蕾斯
    product_channelId: 7209,
    coupon_channelId: 7220,
  },
];
const openCard = {
  data() {
    return {
      openCardLink: '',
      isShowOpenCard: false,
      openedCard: false,
      openCardName: '',
      openCardArr1: ['JingBeanDetail', 'JingBeanSeckill', 'ProductDetail', 'ProductSeckill'],
      openCardArr2: ['DiscountCouponDetail', 'DiscountCouponSeckill'],
      mlList: [78098, 128712, 206265, 635573, 654211, 10146517, 1000001462, 1000002791, 1000102783],
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.openCardName = to.name;
    });
  },
  methods: {
    async getOpenCard(groupId, shopId, channelId) {
      // 如果是曼伦
      if (this.mlList.indexOf(shopId) > -1) {
        try {
          const cardRes = await PointsService.getOpenCard({
            groupId,
            shopId,
          });
          this.openedCard = cardRes.data.openedCard;
          if (!cardRes.data.openedCard) {
            this.openCardLink = cardRes.data.openCardLink;
            channelIdArr.forEach((v) => {
              if (v.channelIds.indexOf(+shopId) > -1) {
                // 积分兑礼
                if (this.openCardArr1.indexOf(this.openCardName) > -1) {
                  this.openCardLink = `${cardRes.data.openCardLink.split('channel=')[0]}channel=${v.product_channelId}`;
                } else if (this.openCardArr2.indexOf(this.openCardName) > -1) {
                  this.openCardLink = `${cardRes.data.openCardLink.split('channel=')[0]}channel=${v.coupon_channelId}`;
                } else {
                  this.openCardLink = `${cardRes.data.openCardLink.split('channel=')[0]}channel=${channelId}`;
                }
              }
            });
            this.isShowOpenCard = true;
          } else {
            this.isShowOpenCard = false;
          }
        } catch {

        } finally {

        }
      } else {
        return false;
      }
    },
    toOpenCardLink($event) {
      // this.beforeLeave(this.openCardLink, $event)
      this.isShowOpenCard = false;
      return false;
    },
    closeCardDialog() {
      this.isShowOpenCard = false;
    },
  },
};

export {
  openCard,
};
