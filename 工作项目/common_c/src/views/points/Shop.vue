<template>
  <!-- 积分商城 -->
  <div class="Points allpage">
    <i-personalTitle :msg='form'></i-personalTitle>
    <div class="point_shop">
      <!-- list -->
      <div v-for="v in list" :key="v.activityId" class="list">
        <div class="all_bg" @click="seckillDetail(v)">
          <img :src="images[v.activityType]">
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import { PointsService } from '@/http';
import IPersonalTitle from '@/components/IPersonalTitle.vue';

export default {
  name: 'Shop',
  components: {
    IPersonalTitle,
  },
  data() {
    return {
      finished: false,
      tab: '秒杀',
      form: {
        nickname: '',
        curPoint: '',
        imageUrl: '',
        grade: '',
      },
      curentForm: {
        type: 1,
        kd: 500,
      },
      images: {
        301: '//img10.360buyimg.com/imgzone/jfs/t1/116906/7/6565/45793/5ebca6a1Ee3b6ed02/520a455d5956ce4a.png',
        302: '//img10.360buyimg.com/imgzone/jfs/t1/108663/31/17846/54581/5ebca6a1Eff74801f/cc7ece371030b438.png',
        303: '//img10.360buyimg.com/imgzone/jfs/t1/119672/6/5277/50567/5ebca6a0Ef7010482/79c37eb08736677f.png',
        311: '//img10.360buyimg.com/imgzone/jfs/t1/112629/35/6660/44582/5ebca6a0Ead91130a/96b03951d5f40434.png',
        312: '//img10.360buyimg.com/imgzone/jfs/t1/107935/27/17743/57596/5ebca6a0Ea209babd/52d4d9ef6523672d.png',
        313: '//img10.360buyimg.com/imgzone/jfs/t1/118548/9/6713/40456/5ebca7bfE1ebb6ba9/03d39d8d66faa308.png',
      },
      list: [],
      swicthTypeRouter: [
        { activityType: 301, name: 'ProductDetail' },
        { activityType: 302, name: 'DiscountCouponDetail' },
        { activityType: 303, name: 'JingBeanDetail' },
        { activityType: 311, name: 'ProductSeckill' },
        { activityType: 312, name: 'DiscountCouponSeckill' },
        { activityType: 313, name: 'JingBeanSeckill' },
      ],
      type: 1,
      page: 1, // 测试
    };
  },

  created() {
    // 获取个人信息
    this.getPersonal();
    this.getList(this.type);
  },
  mounted() {
  },
  methods: {
    // 获取个人信息
    async getPersonal() {
      const res = await PointsService.getShop();
      this.form = res.data;
      this.list = res.data.activityData;
    },
    // 获取商城列表
    getList(type) {

    },
    // 根据商品类型去抢购页
    seckillDetail(value) {
      this.$router.push({
        name: this.swicthTypeRouter.find((v) => value.activityType == v.activityType).name,
        query: {
          activityId: value.activityId,
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
  padding-top: 0.3rem;
  margin-top: 0.2rem;
  background-color: #ffffff;
}

.all_bg {
  padding: 0 0.3rem 0 0.3rem;
  position: relative;
}

.all_bg img {
  width: 100%;
}

.all_bg span {
  font-size: 0.2rem;
  position: absolute;
  left: 0.8rem;
  top: 0.5rem;
}

</style>
