<template>
  <!-- 互动广场 -->
  <div class="page-activity-square">
    <div class="grid-content" v-for="item in activityList" :key="item.type">
      <img class="cover" :src="item.cover" :alt="item.title"/>
      <div class="info" :style="{maxHeight:`${item.maxHeight}px`}">
        <div class="title">{{ item.title }}</div>
        <div class="tags">
          <div class="tag" v-for="tag in item.tags" :key="tag">{{ tag }}</div>
        </div>
        <div class="desc">{{ item.info }}</div>
        <div class="button">
          <lz-button type="primary" @click="$router.push('/'+item.type+'/new')">创建活动 <i
            class="el-icon-arrow-right el-icon--right"></i></lz-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ActivityTypeEnum } from '@/utils/ActivityType';

export default {
  name: 'ActivitySquare',
  data() {
    return {
      // 云鹿专享列表  icon 图标  title标题  info 活动介绍  type活动类型
      activityList: [
        {
          icon: '06',
          title: ActivityTypeEnum['501'],
          info: '品牌会员专属，消费满足规定金额可领奖，提升客单价利器（本活动使用自营店会员订单，实付金额，支持会员通商家）',
          cover: '//img10.360buyimg.com/imgzone/jfs/t1/85928/6/16384/102122/6142fd81E1d05b4c3/607a0f45d5c82cfa.jpg',
          tags: ['下单'],
          type: '501',
          maxHeight: 187,
        },
        {
          icon: '18',
          title: ActivityTypeEnum['503'],
          info: '品牌会员专属，消费满足规定金额可获得抽奖机会，提升客单价利器（本活动使用自营店会员订单，实付金额，支持会员通商家）',
          cover: '//img10.360buyimg.com/imgzone/jfs/t1/85928/6/16384/102122/6142fd81E1d05b4c3/607a0f45d5c82cfa.jpg',
          tags: ['下单'],
          type: '503',
          maxHeight: 187,
        },
        {
          icon: '07',
          title: ActivityTypeEnum['502'],
          info: '消费满足规定金额可获得抽奖机会，提升客单价利器（本活动使用自营店会员订单，实付金额，支持会员通商家）',
          cover: '//img10.360buyimg.com/imgzone/jfs/t1/198530/14/8523/108228/6142fd81Ea551123d/d67e6c03f9b95b52.jpg',
          tags: ['下单'],
          type: '502',
          maxHeight: 187,
        },
        {
          icon: '19',
          title: ActivityTypeEnum['505'],
          info: '消费金额满足指定额度，可获抽奖机会，促使买家增加购买。（本活动使用自营店全量订单，标价金额，支持全类型商家）',
          cover: '//img10.360buyimg.com/imgzone/jfs/t1/198530/14/8523/108228/6142fd81Ea551123d/d67e6c03f9b95b52.jpg',
          tags: ['下单'],
          type: '505',
          maxHeight: 187,
        },
        {
          icon: '20',
          title: ActivityTypeEnum['506'],
          info: '消费金额前N名赠送礼品，促使买家增加购买。（本活动使用自营店会员订单，实付金额，支持会员通商家）',
          cover: '//img10.360buyimg.com/imgzone/jfs/t1/209947/30/761/99113/6142fd81E83187761/201b03ad55342250.jpg',
          tags: ['下单'],
          type: '506',
          maxHeight: 187,
        },
        {
          icon: '21',
          title: ActivityTypeEnum['507'],
          info: '快速破零利器！吸引买家抢先购买，前N名优惠增加买家购买紧迫感，促使快速下单。（本活动使用自营店全量订单，标价金额，支持全类型商家）',
          cover: '//img10.360buyimg.com/imgzone/jfs/t1/209947/30/761/99113/6142fd81E83187761/201b03ad55342250.jpg',
          tags: ['下单'],
          type: '507',
          maxHeight: 208,
        },
        {
          icon: '22',
          title: ActivityTypeEnum['504'],
          info: '人气火爆的互动玩法，会员集齐全部卡片后可获得奖励',
          cover: '//img10.360buyimg.com/imgzone/jfs/t1/205028/8/6858/199261/6142fd81E90d874ea/2ab877ef3a48cdf9.jpg',
          tags: ['集卡'],
          type: '504',
          maxHeight: 166,
        },
        {
          icon: '23',
          title: ActivityTypeEnum['508'],
          info: '会员可试用小样，提升产品曝光和用户体验',
          cover: '//img10.360buyimg.com/imgzone/jfs/t1/202221/5/6955/140189/6142fd81E45180791/0d4ca80801031a5c.jpg',
          tags: ['试用'],
          type: '508',
          maxHeight: 145,
        },
      ],
    };
  },
  methods: {},
  mounted() {
  },
};
</script>

<style lang="scss">
.page-activity-square {
  display: flex;
  flex-wrap: wrap;
  column-gap: 20px;

  .grid-content {
    margin-bottom: 20px;
    overflow: hidden;
    border-right: 5px;
    box-shadow: 0 0 15px 2px rgba(169, 182, 199, 0.2);
    width: 260px;
    height: 300px;
    background-color: white;
    border-radius: 5px;
    position: relative;

    .cover {
      width: 100%;
    }

    .info {
      padding: 12px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1;
      background-color: white;
      height: 130px;
      transition: all 200ms linear;

      .title {
        color: #000000;
        font-size: 14px;
        height: 30px;
        line-height: 20px;
      }

      .tags {
        height: 30px;

        .tag {
          display: inline-block;
          padding: 4px 12px;
          background: #E6F7FF;
          border-radius: 8px;
          font-size: 10px;
          font-weight: 400;
          color: #3399FF;
        }

        .tag + .tag {
          margin-left: 5px;
        }
      }

      .desc {
        font-size: 12px;
        line-height: 20px;
        color: #657180;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .button {
        display: none;
        text-align: center;
        height: 40px;
        padding: 10px 0;
        justify-self: flex-end;

        .lz-button {
          display: block;
          width: 100%;
        }
      }
    }

    &:hover, &.active {
      box-shadow: 0 0 15px 2px rgba(169, 182, 199, 0.5);

      .info {
        min-height: min-content;
        height: 208px;

        .desc {
          display: unset;
          overflow: unset;
          text-overflow: unset;
          -webkit-line-clamp: unset;
          -webkit-box-orient: unset;
        }

        .button {
          display: block;
        }
      }
    }
  }
}
</style>
