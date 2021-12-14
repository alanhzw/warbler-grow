<!--
 * @Description:积分流水页面
 * @Autor: hanzhiwei
 * @Date: 2021-01-05 14:14:41
 * @LastEditTime: 2021-01-07 11:44:55
 * @FilePath: \SNActivity\src\views\personalCenter\PointsHistory.vue
-->
<template>
  <div class="points-history-box">
    <div class="header">
      <p class="p1">
        <span>{{form.curPoint}}</span>
      </p>
      <p class="p2" v-if="form.preExpiredPoint > 0">{{form.preExpiredPoint}} 将于 {{form.pointExpiredTime}}日过期</p>
      <p class="p2" v-else>无即将到期的历史积分</p>
    </div>
    <div class="bottom-list">
      <van-cell class="first-child" title="收支明细" is-link value="积分规则" @click="goRule" />
      <van-list v-model="loading" :finished="finished" :immediate-check='immediateCheck' finished-text="没有更多了" @load="getPointRecord">
        <van-cell center v-for="item in pointRecordList" :title="item.content" :key="item.businessId">
          <div class="custom-title">
            <p :class="[item.points < 0 ? 'gray' : 'red']">{{item.points > 0 ? '+' + item.points : item.points }}</p>
            <p class="cell-bottom">{{item.createTime}}</p>
          </div>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
// 引入封装api
import { personalCenterService } from '@/axios/apis';

export default {
  name: '',
  data () {
    return {
      finished: false, // 是否已加载完成，加载完成后不再触发load事件
      immediateCheck: false, // 是否在初始化时立即执行滚动位置检查
      loading: false, // 是否处于加载状态,加载过程中不触发load事件
      unionld: this.$route.query.unionld || '', // 用户pin
      shopId: this.$route.query.shopId || '', // 店铺id
      form: {
        curPoint: '', // 积分数量
        preExpiredPoint: '', // 即将过期积分数量
        pointExpiredTime: '', // 积分过期时间
      },
      pointRecordList: '', // 积分流水
    };
  },
  methods: {
    // 获取积分流水
    async getPointRecord () {
      this.loading = true;
      await personalCenterService['getPointRecord']({
        pin: this.unionld,
        pageNo: 1,
        pageSize: 10,
        shopId: this.shopId,
      }).then(({ data }) => {
        this.loading = false;
        // 如果请求成功
        if (data.success) {
          if (data.data.pointRecordData.length < 10) {
            // console.log(this.pageNo, '加载完成')
            this.finished = true;
          } else {
            // console.log(this.pageNo, '加载更多')
            this.finished = false;
            this.pageNo++;
          }
          this.form = data.data;
          this.pointRecordList = [...this.pointRecordList, ...data.data.pointRecordData];
          this.pointRecordList.forEach(e => {
            if (!e.content) {
              e.content = ' ';
            }
          });
        } else {
          this.$toast(data.resp_msg);
        }
      });
    },
    // 跳转积分规则页
    goRule () {
      this.$router.push({
        name: 'PointsRules',
        query: {
          shopId: this.shopId,
          unionld: this.unionld
        }
      });
    }
  },
  mounted () {
    // 初始化获取积分流水
    this.getPointRecord();
  }
};
</script>

<style lang="scss">
.points-history-box {
  position: relative;
  height: 100vh;

  .header {
    width: 100%;
    height: 1.5rem;
    background: url('//img10.360buyimg.com/imgzone/jfs/t1/104685/7/18010/40929/5e8ed4ffEd3a6aa85/fb638cc1d2a5a9ae.png')
      no-repeat;
    background-size: 100% 100%;
    color: #ffffff;
    padding: 0.24rem;
    box-sizing: border-box;

    p {
      text-align: left;
      margin-top: 0.06rem;
    }

    .p1 {
      font-size: 0.4rem;
      display: flex;

      -ms-grid-column-span: {
        font-size: 0.25rem;
        margin-left: 0.1rem;
        margin-top: 0.07rem;
      }
    }

    .p2 {
      font-size: 0.24rem;
      color: #bad0fa;
    }
  }

  .bottom-list {
    position: absolute;
    top: 1.7rem;
    right: 0;
    left: 0;
    bottom: 0;
    overflow: scroll;

    .first-child {
      .van-cell__title {
        color: #000000;
        font-weight: bold;
        font-size: 0.3rem;
      }
    }

    .custom-title {
      .red {
        height: 0.4rem;
        font-size: 0.3rem;
        color: #f23c3c;
      }
      .gray {
        height: 0.4rem;
        font-size: 0.33rem;
        color: #666666;
      }
      .cell-bottom {
        height: 0.36rem;
        font-size: 0.24rem;
      }
    }
  }

  .van-cell__title {
    text-align: left;
  }
}
</style>