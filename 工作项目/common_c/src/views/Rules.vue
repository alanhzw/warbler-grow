<template>
  <div class="rules allpage">
    <van-tabs>
      <van-tab v-if="mgrMemberGrade === 2" title="等级规则">
        <div class='line'></div>
        <van-cell-group title="会员评定">
          <van-cell :value="gradeRule.gradeComputeCycle === 0 ? '不限' : '12个自然月'" title="评定周期"/>
          <van-cell title="订单追溯" value="不追溯入会前创建的订单"/>
          <van-cell :value="'每月'+ gradeRule.gradeExecPeriod + '日'" title="评定时间"/>
        </van-cell-group>
        <div class='line'></div>
        <div class="IRules">
          <p class="title">会员等级</p>
          <div class="table">
            <div class="table_header layout">
              <div class="left">会员名称</div>
              <div class="right">等级达成条件</div>
            </div>
            <div v-for="v in gradeTable" :key='v.level' class="layout">
              <div class="left">{{ v.levelName }}</div>
              <div class="right">{{ v.text }}</div>
            </div>
          </div>
        </div>
        <div class='line'></div>
        <div class="IRules">
          <p class="title">等级规则说明</p>
          <p v-for="x in gradeRulesArray" :key='x' class="item">
            {{ x }}
          </p>
        </div>
      </van-tab>
      <van-tab v-if="mgrMemberGrade === 1" title="等级规则">
        <div class='line'></div>
        <div class="IRules">
          <p class="title">会员等级</p>
          <div class="table">
            <div class="table_header layout">
              <div class="left">会员等级</div>
              <div class="center">会员折扣</div>
              <div class="right">订单积分（倍）</div>
            </div>
            <div v-for="v in gradeTable" :key='v.level' class="layout">
              <div class="left">{{ v.levelName }}</div>
              <div class="center">{{ v.discount }}</div>
              <div class="right">{{ v.multiple }}</div>
            </div>
          </div>
        </div>

      </van-tab>
      <van-tab v-if="mgrMemberPoint === 2" title="积分规则">
        <div class='line'></div>
        <van-cell-group title="店铺积分基本信息">
          <van-cell :value="pointRule.pointAlias" title="积分别名"/>
        </van-cell-group>
        <div class='line'></div>
        <van-cell-group title="积分设置">
          <van-cell :value="pointRule.tradeRatio + '元=1积分'" title="获取逻辑"/>
          <div class="layout">
            <div class="left1">过期逻辑</div>
            <div class="right">
              <div>
                交易积分{{ pointRule.expiredTradeType === 1 ? `自获取之日起至下一年度${$moment(pointRule.expiredTradeDate).format('MM月DD日')}有效` : '永久有效' }}
              </div>
              <div>
                互动积分{{ pointRule.expiredOtherType === 1 ? `自获取之日起至下一年度${$moment(pointRule.expiredOtherDate).format('MM月DD日')}有效` : '永久有效' }}
              </div>
            </div>
          </div>
          <div class="layout">
            <div class="left1">消耗逻辑</div>
            <div class="right">
              <div>先互动积分后交易积分</div>
              <div>先获取先消耗</div>
              <div>允许积分负值</div>
            </div>
          </div>
        </van-cell-group>
        <div class='line'></div>
        <div class="IRules">
          <p class="title">积分交易倍数</p>
          <div class="table">
            <div class="table_header layout">
              <div class="left">会员名称</div>
              <div class="right">积分倍数</div>
            </div>
            <div v-for="v in this.pointRule.levelPointData" :key='v.levelName' class="layout">
              <div class="left">{{ v.levelName }}</div>
              <div class="right">x{{ v.pointMultiple }}</div>
            </div>
          </div>
        </div>
        <div class='line'></div>
        <div class="IRules">
          <p class="title">积分规则说明</p>
          <p v-for="x in pointsRulesArray" :key='x' class="item">
            {{ x }}
          </p>
        </div>
      </van-tab>
      <van-tab v-if="mgrMemberPoint === 1" title="积分规则">
        <div class='line'></div>
        <van-cell-group title="店铺积分基本信息">
          <van-cell :value="pointRule.pointAlias" title="积分别名"/>
        </van-cell-group>
        <div class='line'></div>
        <van-cell-group title="积分设置">
          <van-cell :value="pointRule.tradeRatio + '元=1积分'" title="获取逻辑"/>
        </van-cell-group>
        <div class='line'></div>
        <div class="IRules">
          <p class="title">积分交易倍数</p>
          <div class="table">
            <div class="table_header layout">
              <div class="left">会员名称</div>
              <div class="right">积分倍数</div>
            </div>
            <div v-for="v in this.pointRule.levelPointData" :key='v.levelName' class="layout">
              <div class="left">{{ v.levelName }}</div>
              <div class="right">x{{ v.pointMultiple }}</div>
            </div>
          </div>
        </div>
        <div class='line'></div>
        <div class="IRules">
          <p class="title">积分规则说明</p>
          <p v-for="x in pointsRulesArray" :key='x' class="item">
            {{ x }}
          </p>
        </div>
      </van-tab>
    </van-tabs>
    <div class='line'></div>
  </div>
</template>

<script>
import { PointsService } from '@/http';

export default {
  name: 'Rules',
  data() {
    return {
      mgrMemberGrade: '',
      mgrMemberPoint: '',
      gradeRule: {},
      pointRule: {},
    };
  },
  computed: {
    // 等级规则
    gradeRulesArray() {
      if (this.gradeRule.ruleDesc) {
        return this.gradeRule.ruleDesc.split('\n').map((v) => v.trim());
      }
      return ['无'];
    },
    gradeTable() {
      if (this.gradeRule.levelData && this.mgrMemberGrade === 2) {
        return this.gradeRule.levelData.map((level) => {
          if (level.level > 1) {
            if (this.gradeRule.ruleType === 1) {
              return {
                ...level,
                text: `消费金额不少于${level.minOrderAmount}元`,
              };
            }
            if (this.gradeRule.ruleType === 2) {
              return {
                ...level,
                text: `交易次数不少于${level.minOrderNum}次`,
              };
            }
            return {
              ...level,
              text: `交易次数不少于${level.minOrderNum}次或消费金额不少于${level.minOrderAmount}元`,
            };
          }
          return {
            ...level,
            text: level.desc,
          };
        });
      }
      if (this.mgrMemberGrade === 1) {
        return [...this.gradeRule.levelData];
      }
      return [];
    },
    // 积分规则
    pointsRulesArray() {
      if (this.pointRule.ruleDesc) {
        return this.pointRule.ruleDesc.split('\n').map((v) => v.trim());
      }
      return ['无'];
    },
  },
  created() {
    this.getPage();
  },
  methods: {
    async getPage() {
      const res = await PointsService.getRules();
      if (res.data) {
        this.mgrMemberGrade = res.data.mgrMemberGrade;
        this.mgrMemberPoint = res.data.mgrMemberPoint;
        this.gradeRule = res.data.gradeRule;
        this.pointRule = res.data.pointRule;
      }
    },
  },
};
</script>
<style scoped>
.rules {
  padding-top: 0.2rem;
}

.rules >>> .van-tabs__line {
  background-color: #0083ff;
}

.line {
  width: 100%;
  height: 0.2rem;
  background-color: transparent;
}

.IRules {
  width: 100%;
  background: #ffffff;
  box-sizing: border-box;
  padding: 0.3rem 0.3rem 0.3rem 0.3rem;
}

.title {
  font-size: 0.3rem;
  color: #303030;
  text-align: left;
  margin-bottom: 0.24rem;
}

.item {
  color: #666666;
  font-size: 0.24rem;
  text-align: left;
  margin-bottom: 0.1rem;
}

.rules >>> .van-cell-group__title {
  font-size: 0.3rem;
  background: #ffffff;
  color: #333333;
  text-align: left;
  padding: 0.3rem;
}

.rules >>> .van-cell__title {
  text-align: left;
  color: #858585;
  font-size: 0.24rem;
}

.rules >>> .van-cell__value {
  font-size: 0.24rem;
}

.rules >>> .van-cell:not(:last-child)::after {
  left: 0px;
}

.table {
  box-sizing: border-box;
  width: 100%;
}

.layout {
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
}

.table .table_header {
  background: #f2f2f2;
  color: #333333;
}

.layout .left {
  flex: 0.6;
}

.layout .right {
  flex: 1;
}

.layout .left1 {
  flex: 0.3;
}

.layout .center {
  flex: 0.6;
}

.right div {
  text-align: right;
}
</style>>
