<template>
  <div class="dab-interaction-means-section">
    <div class="card card-1">
      <!-- Swiper -->
      <div id="productBSwiper1" class="swiper-container swiper-container-inner">
        <div class="swiper-wrapper">
          <dab-interaction-means-section-item
            v-for="(item,index) in dataList1"
            :key="index"
            :item="item"
            class="swiper-slide"
          />
        </div>
        <!-- Add Pagination -->
        <div
          id="dabSwiperPagination1"
          class="dab-swiper-pagination-inner swiper-pagination"
        ></div>
      </div>
    </div>
    <div class="card card-2">
      <!-- Swiper -->
      <div id="productBSwiper2" class="swiper-container swiper-container-inner">
        <div class="swiper-wrapper">
          <dab-interaction-means-section-item
            v-for="(item,index) in dataList2"
            :key="index"
            :item="item"
            class="swiper-slide"
          />
        </div>
        <!-- Add Pagination -->
        <div
          id="dabSwiperPagination2"
          class="dab-swiper-pagination-inner swiper-pagination"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import DabInteractionMeansSectionItem from '@/components/DabInteractionMeansSectionItem'

export default {
  name: 'DabInteractionMeansSection',
  components: { DabInteractionMeansSectionItem },
  data () {
    return {
      dataList1: [
        {
          targetTitle: '营销目的',
          targetContent: '拉新增粉',
          pointTitle: '营销重点',
          pointContent: '对店铺新用户做触达，为店铺提高粉丝量及关注度',
          methodTitle: '经典玩法',
          methodContent: ['分享有礼', '日历签到']
        },
        {
          targetTitle: '营销目的',
          targetContent: '用户互动',
          pointTitle: '营销重点',
          pointContent: '高效互动给用户带来极致体验感，增加店铺好感度',
          methodTitle: '经典玩法',
          methodContent: ['盖楼有礼', '大转盘抽奖']
        },
        {
          targetTitle: '营销目的',
          targetContent: '高效裂变',
          pointTitle: '营销重点',
          pointContent: '分享活动为店铺带来高流量高关注高口碑',
          methodTitle: '经典玩法',
          methodContent: ['裂变神券', '组队瓜分奖品']
        },
        {
          targetTitle: '营销目的',
          targetContent: '增加权重',
          pointTitle: '营销重点',
          pointContent: '引导用户加购、购买、关注店铺等第一次来增加权重',
          methodTitle: '经典玩法',
          methodContent: ['购物车锦鲤', '关注店铺有礼']
        },
        {
          targetTitle: '营销目的',
          targetContent: '转化提升',
          pointTitle: '营销重点',
          pointContent: '召回店铺沉睡客户，最大程度将客户转变付费用户',
          methodTitle: '经典玩法',
          methodContent: ['评价有礼', '知识超人']
        }
      ],
      dataList2: [
        {
          targetTitle: '品类',
          targetContent: '家电3C',
          pointTitle: '营销重点',
          pointContent: '精准锁定兴趣人群，培养种草。新品上市后快速传播品牌调性，提升会员粘性，提高转化率',
          methodTitle: '经典玩法',
          methodContent: ['知识超人', '日历签到', '组队瓜分奖品', '店铺抽奖', '会员礼包等']
        },
        {
          targetTitle: '品类',
          targetContent: '消费品品类',
          pointTitle: '营销重点',
          pointContent: '注重引流+转化，主推爆款产品，提高升单品销量',
          methodTitle: '经典玩法',
          methodContent: ['优惠券营销', '大转盘抽奖', '加购有礼', '组队瓜分奖品', '会员礼包等']
        },
        {
          targetTitle: '品类',
          targetContent: '母婴品类',
          pointTitle: '营销重点',
          pointContent: '受众面较为固定，通过产品试用提升品牌知名度，持续拉新引，扩大私域会员流量池，提升复购率，强化会员黏性，打造消费者全生命周期精细化管理',
          methodTitle: '经典玩法',
          methodContent: ['N元试用', '优惠券营销', '评价有礼', '店铺抽奖', '会员礼包等']
        },
        {
          targetTitle: '品类',
          targetContent: '食品饮料',
          pointTitle: '营销重点',
          pointContent: '抓住高价值客户，打造多渠道互动，推行差异化营销方案，实现品牌流量引入。',
          methodTitle: '经典玩法',
          methodContent: ['组队瓜分奖品', '加购有礼', '关注商品有礼', '会员礼包等']
        },
        {
          targetTitle: '品类',
          targetContent: '美妆个护',
          pointTitle: '营销重点',
          pointContent: '打造亮点趣味互动，营销模式多样化，高效引流，智能导购，实现种草-拔草-带货的互动营销业务闭环',
          methodTitle: '经典玩法',
          methodContent: ['关注店铺有礼', '分享有礼', '组队瓜分奖品', '会员礼包等']
        }
      ]
    }
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(this.init, 1000)
    })
  },
  methods: {
    init () {
      this.swiper1 = new window.Swiper('#productBSwiper1', {
        pagination: {
          el: '#dabSwiperPagination1',
          clickable: true,
          renderBullet (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>'
          }
        }
      })
      this.swiper2 = new window.Swiper('#productBSwiper2', {
        pagination: {
          el: '#dabSwiperPagination2',
          clickable: true,
          renderBullet (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>'
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dab-interaction-means-section {
  //width: 17rem;
  //position: relative;
  //overflow: hidden;
  //box-sizing: border-box;
  //height: 16.4rem;

  .card {
    width: 17rem;
    height: 7.2rem;
    margin-bottom: 1rem;
    background-color: #ffffff;
    box-shadow: 0rem 0.01rem 1.33rem 0rem rgba(38, 71, 200, 0.15);
    border-radius: 0.2rem;
  }

  .swiper-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

</style>
<style lang="scss">
.dab-swiper-pagination-inner {
  font-size: 0.32rem;
  position: absolute;
  bottom: 1.29rem !important;
  left: 1.96rem !important;
  width: auto !important;

  .swiper-pagination-bullet {
    width: 0.5rem;
    height: 0.5rem;
    color: $--color-primary;
    border: solid 0.03rem $--color-primary;
    font-size: 0.32rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    opacity: 1;
  }

  .swiper-pagination-bullet-active {
    background-color: $--color-primary;
    color: $--color-white;
    opacity: 1;
  }
}
</style>
