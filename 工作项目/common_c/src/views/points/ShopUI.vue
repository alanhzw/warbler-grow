<template>
  <!-- 积分商城ui 页面作废 -->
  <div class="Points">
    <i-personalTitle :msg='form'></i-personalTitle>
    <div class="point_shop">
      <!-- banner -->
      <div class="bean_bg">
        <img src='//img10.360buyimg.com/imgzone/jfs/t1/85061/36/18150/49496/5e8f0961E023eb732/a95043a6cd345eb3.png'/>
        <div class="bean_bg_body">
          <p class="p1">积分换京豆</p>
          <p class="p2">今日可换{{ curentForm.kd }}京豆，<span @click="goDetail">立即兑换 >></span></p>
        </div>
      </div>
      <!-- tab-list -->
      <van-tabs sticky @click="onClick">
        <van-tab ref="container" name="秒杀" title="秒杀">
          <i-shopList :dealList='dealList' :finished='finished' :list='list' :tab='tab' @loadMore="getList"
                      @seckill="seckillDetail"></i-shopList>
        </van-tab>
        <van-tab name="限时抢" title="限时抢">
          <i-shopList :dealList='dealList' :finished='finished' :list='list' :tab='tab' @loadMore="getList"
                      @seckill="seckillDetail"></i-shopList>
        </van-tab>
        <van-tab name="兑好物" title="兑好物">
          <i-shopList :dealList='dealList' :finished='finished' :list='list' :tab='tab' @loadMore="getList"
                      @seckill="seckillDetail"></i-shopList>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import { PointsService } from '@/http';
import IPersonalTitle from '@/components/IPersonalTitle.vue';
import IShopList from '@/components/IShopList.vue';

export default {
  name: 'Shop',
  components: {
    IPersonalTitle,
    IShopList,
  },
  data() {
    return {
      finished: false,
      tab: '秒杀',
      form: {
        nickname: 'Adel',
        curPoint: 300,
        imageUrl: 'http://pic1.zhimg.com/50/v2-ede9473ddcbd84fe7c1e363953ed7410_hd.jpg',
        grade: 1,
      },
      curentForm: {
        type: 1,
        kd: 500,
      },
      list: [{
        id: 1,
        image: 'http://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20200105/c5162a9d6f484ce3b8ff464b27f8865f.jpeg',
        productName: '滴露Dettol 消毒液 1.8L*2 杀菌除螨 儿童宝宝内衣 家居室内 宠物猫狗环境吼吼吼吼',
        points: 10000,
        lineMoney: 141.00,
        residue: 1000,
        textType: 0, // 默认 1 为可以抢购状态
        productType: 4,
        time: 0,
        startTime: '2020-04-10 16:00:00',
        endTime: '2020-04-11 12:00:00',
      }, {
        id: 2,
        image: 'http://tupian.qqw21.com/article/UploadPic/2020-3/2020352216990408.jpg',
        productName: '滴露Dettol 消毒液 1.8L*2 杀菌除螨 儿童宝宝内衣 家居室内 宠物猫狗环境吼吼吼吼',
        points: 10000,
        lineMoney: 141.00,
        residue: 1000,
        textType: 1, // 默认0未开始 1 为可以抢购状态 2已结束
        productType: 4,
        time: 0,
        startTime: '2020-04-10 19:26:30',
        endTime: '2020-04-10 19:27:00',
      }, {
        id: 3,
        image: 'https://b-ssl.duitang.com/uploads/item/201707/27/20170727151706_vGLyN.thumb.700_0.jpeg',
        productName: '滴露Dettol 消毒液',
        points: 1000,
        lineMoney: 1441.00,
        residue: 1000,
        textType: 1, // 默认0未开始 1 为可以抢购状态 2已结束
        productType: 4,
        time: 0,
        startTime: '2020-04-10 19:26:30',
        endTime: '2020-04-10 20:27:00',
      }],
      list1: [{
        id: 4,
        image: 'http://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20200105/c5162a9d6f484ce3b8ff464b27f8865f.jpeg',
        productName: '滴露Dettol 消毒液 1.8L*2 杀菌除螨 儿童宝宝内衣 家居室内 宠物猫狗环境吼吼吼吼',
        points: 10000,
        lineMoney: 141.00,
        residue: 1000,
        textType: 0, // 默认 1 为可以抢购状态
        productType: 4,
        time: 0,
        startTime: '2020-04-10 16:00:00',
        endTime: '2020-04-11 12:00:00',
      }, {
        id: 5,
        image: 'http://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20200105/c5162a9d6f484ce3b8ff464b27f8865f.jpeg',
        productName: '滴露Dettol 消毒液 1.8L*2 杀菌除螨 儿童宝宝内衣 家居室内 宠物猫狗环境吼吼吼吼',
        points: 10000,
        lineMoney: 141.00,
        residue: 1000,
        textType: 1, // 默认0未开始 1 为可以抢购状态 2已结束
        productType: 4,
        time: 0,
        startTime: '2020-04-10 19:26:30',
        endTime: '2020-04-10 19:27:00',
      }, {
        id: 6,
        image: 'http://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20200105/c5162a9d6f484ce3b8ff464b27f8865f.jpeg',
        productName: '滴露Dettol 消毒液 1.8L*2 杀菌除螨 儿童宝宝内衣 家居室内 宠物猫狗环境吼吼吼吼',
        points: 1000,
        lineMoney: 1441.00,
        residue: 1000,
        textType: 1, // 默认0未开始 1 为可以抢购状态 2已结束
        productType: 4,
        time: 0,
        startTime: '2020-04-10 19:26:30',
        endTime: '2020-04-10 20:27:00',
      }],
      productTypes: ['', 'ProductDetail', 'DiscountCouponDetail', 'JingBeanDetail', 'DiscountCouponSeckill', 'JingBeanSeckill', 'ProductSeckill'],
      setIntervalNum: 0, // 定时器
      swicthTypeRouter: [
        { activeType: 301, name: 'ProductDetail' },
        { activeType: 302, name: 'DiscountCouponDetail' },
        { activeType: 303, name: 'JingBeanDetail' },
        { activeType: 311, name: 'ProductSeckill' },
        { activeType: 312, name: 'DiscountCouponSeckill' },
        { activeType: 313, name: 'JingBeanSeckill' },
      ],
      type: 1,
      page: 1, // 测试
    };
  },

  created() {
    // 获取个人信息
    clearInterval(this.setIntervalNum);
    this.getPersonal();
    this.getList(this.type);
  },
  mounted() {
  },
  methods: {
    // 获取个人信息
    async getPersonal() {
      const res = await PointsService.getShop();
      if (res.data.success) {
        this.form = res.data.data;
      } else {
        this.$toast(res.data.message);
      }
    },
    // 获取商城列表
    getList(type) {
      // tab类型   type
      // 分页      this.list[this.list.length - 1].id
      // 测试loading
      if (this.page === 1) {
        // this.list = this.list;
        this.finished = true;
      } else {
        setTimeout(() => {
          this.list = [...this.list, ...this.list1];
          this.finished = true;
        }, 1000);
      }
      this.setIntervalNum = setInterval(() => {
        this.dealList();
      }, 1000);
    },
    dealList() {
      const timeNow = new Date();
      const list = this.list.map((v) => {
        if (new Date(v.startTime).getTime() > timeNow.getTime()) {
          // 未开始
          v.textType = 0;
          v.time = new Date(v.startTime).getTime() - timeNow.getTime();
        } else if (new Date(v.endTime).getTime() > timeNow.getTime()) {
          // 已开始
          v.textType = 1;
          v.time = new Date(v.endTime).getTime() - timeNow.getTime();
        } else {
          // 已结束
          v.textType = 2;
          v.time = 0;
        }
        return {
          ...v,
          time: v.time,
        };
      });
      this.list = list;
    },
    // 前往京豆兑换页
    goDetail() {
      this.$router.push({
        name: 'goJingBeanDetail',
      });
    },
    // 点击tab获取不同的列表
    onClick(val) {
      clearInterval(this.setIntervalNum);
      this.tab = val;
      this.type = this.tab === '秒杀' ? 1 : this.tab === '限时抢' ? 2 : 3;
      this.getList();
    },
    // 根据商品类型去抢购页
    seckillDetail(value) {
      this.$router.push({
        name: this.swicthTypeRouter.find((v) => value.activeType == v.id).name,
        query: {
          id: value.id,
        },
      });
    },
  },
};
</script>
<style scoped>
.Points {
  /* width: 100%;
  position: relative;
  top: 0;
  bottom: 0;
  overflow: visible; */
}

.point_shop {
  margin-top: 0.2rem;
  background-color: #ffffff;
}

.bean_bg {
  padding: 0.24rem;
  position: relative;
}

.bean_bg img {
  width: 100%;
}

.bean_bg_body {
  font-size: 0.3rem;
  color: #ffffff;
  position: absolute;
  z-index: 1000;
  top: 0.6rem;
  left: 1rem;
}

.bean_bg_body .p1 {
  font-size: 0.4rem;
  text-align: left;
}

.bean_bg_body .p2 {
  font-size: 0.24rem;
  text-align: left;
  margin-top: 0.1rem;
}

.point_shop >>> .van-hairline--top-bottom::after, .point_shop >>> .van-hairline-unset--top-bottom::after {
  border-width: 0;
}

</style>
