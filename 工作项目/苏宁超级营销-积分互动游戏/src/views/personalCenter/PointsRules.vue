<!--
 * @Description:等级规则页
 * @Autor: hanzhiwei
 * @Date: 2021-01-05 15:25:48
 * @LastEditTime: 2021-01-07 19:15:54
 * @FilePath: \SNActivity\src\views\personalCenter\PointsRules.vue
-->
<template>
  <div class="points-rules-box">
    <div class="grade-rules">
      <p class="title">会员等级</p>
      <div class="table">
        <div class="header">
          <div class="left">会员名称</div>
          <div class="right">等级达成条件</div>
        </div>
        <div class="content" v-for="item in gradeTableList" :key="item.level">
          <div class="left">{{ item.levName }}</div>
          <div class="right">{{ item.text }}</div>
        </div>
      </div>
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
      unionld: this.$route.query.unionld || '', // 用户pin
      shopId: this.$route.query.shopId || '', // 店铺id
      gradeTable: [], // 会员等级列表
    };
  },
  computed: {
    gradeTableList () {
      return this.gradeTable.map(item => {
        if (item.levCode === '1000000010') {
          return {
            ...item,
            text: '无门槛(绑卡即可成为)普通会员'
          };
        } else {
          return {
            ...item,
            text: `消费金额达到${item.payAmnt}元且消费次数达到${item.orderNum}次`
          };
        }

      });
    }
  },
  mounted () {
    this.getGradeAndPointRule();
  },
  methods: {
    // 获取等级积分规则
    async getGradeAndPointRule () {
      await personalCenterService['getGradeAndPointRule']({
        pin: this.unionld,
        shopId: this.shopId
      }).then(({ data }) => {
        // 如果请求成功
        if (data.result) {
          this.gradeTable = data.data.rules;
        } else {
          this.$toast(data.resp_msg);
        }
      });
    }
  }
};
</script>

<style lang="scss">
.points-rules-box {
  .grade-rules {
    width: 100%;
    background: #ffffff;
    box-sizing: border-box;
    padding: 0.3rem;

    .title {
      font-size: 0.3rem;
      color: #303030;
      text-align: left;
      margin-bottom: 0.24rem;
    }

    .table {
      box-sizing: border-box;
      width: 100%;

      .header {
        background: #f2f2f2;
        color: #333333;
      }

      .content {
      }

      .header,
      .content {
        box-sizing: border-box;
        width: 100%;
        min-height: 0.8rem;
        border-bottom: 1px solid #f2f2f2;
        display: flex;
        align-items: center;
        font-size: 0.24rem;
        color: #858585;
        padding: 0.2rem 0.3rem;
        text-align: left;

        .left {
          flex: 0.6;
        }
        .right {
          flex: 1;
        }
      }
    }
  }
}
</style>