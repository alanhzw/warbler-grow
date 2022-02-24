<template>
  <div class="crowd-selector"
       :class="{disable: !enableStatus}">
    <form-block title="定向投放">
      <div slot="header">
        <lz-switch v-model="enableStatus"
                   @change="changeEnable"></lz-switch>
      </div>
      <div v-show="enableStatus"
           title="">
        <div style="margin-bottom: 10px">
          <lz-radio v-model="biType"
                    :label="1">定投人群</lz-radio>
          <lz-radio v-model="biType"
                    :label="2">自定义人群</lz-radio>
        </div>
        <div v-if="biType==1">
          <ul>
            <li v-for="(item,index) in strategy.result"
                :title='`${item.name}`'
                :key="`strategy-${index}`"
                class="crowd-select-li">
              <div>
                <span class="overflow-text-single">{{item.name}}</span>
                <span class="iconfont icon-icon-07"
                      style="cursor: pointer;"
                      @click="removeStrategy(item)" />
              </div>
            </li>
          </ul>
          <div class="button-input">
            <lz-button size="small"
                       @click="editStrategy">编辑定投人群（{{strategy.result.length}}/3）</lz-button>
          </div>
        </div>
        <div v-if="biType==2">
          <ul>
            <li v-for="(item,index) in crowd.result"
                :title='`${item.crowdName}(${item.crowdNum}人)`'
                :key="index"
                class="crowd-select-li">
              <div v-if="item.crowdId">
                <span class="overflow-text-single">{{item.crowdName}}({{item.crowdNum}}人)</span>
                <span class="iconfont icon-icon-07"
                      style="cursor: pointer;"
                      @click="removeCrowd(item)" />
              </div>
              <div v-else>
                --(--人)
                <span class="iconfont icon-icon-07"
                      style="cursor: pointer;"
                      @click="removeCrowd(item)" />
              </div>
            </li>
          </ul>
          <div class="button-input">
            <lz-button size="small"
                       @click="editCrowd">编辑自定义人群（{{crowd.result.length}}/3）</lz-button>
          </div>
        </div>
      </div>
    </form-block>
    <lz-dialog title="选择定投人群"
               @open='cacheDateFn'
               :visible.sync="strategy.dialogShowed"
               append-to-body>
      <!-- <lz-radio-group v-model="strategy.currentType" @change="getStrategies">
        <lz-radio-button :label="1">系统推荐</lz-radio-button>
        <lz-radio-button :label="2">商家创建</lz-radio-button>
      </lz-radio-group> -->
      <div v-show="strategy.currentType==1"
           style="margin-top: 10px;">
        <lz-table ref="strategySystemPool"
                  border
                  :data="strategy.system.pool"
                  height="540"
                  @selection-change="changeStrategyResult"
                  row-key="strategyId">
          <!-- <lz-table-column :reserve-selection="true" type="selection" width="40" :selectable="strategySelectable"/> -->
          <lz-table-column :reserve-selection="true"
                           type="selection"
                           width="40"
                           :selectable="strategySelectable" />
          <lz-table-column prop="name"
                           width="200"
                           label="人群名称" />
          <lz-table-column prop="strategyTypeStr"
                           width="200"
                           label="人群分类" />
          <lz-table-column prop="description"
                           label="人群定义" />
          <lz-table-column prop="createTime"
                           width="170"
                           label="创建时间" />
        </lz-table>
      </div>
      <div v-show="strategy.currentType==2"
           style="margin-top: 10px;">
        <lz-table ref="strategyCustomPool"
                  border
                  :data="strategy.custom.pool"
                  height="540"
                  @selection-change="changeStrategyResult"
                  row-key="strategyId">
          <!-- <lz-table-column :reserve-selection="true" type="selection" width="40"  :selectable="strategySelectable"/> -->
          <lz-table-column :reserve-selection="true"
                           type="selection"
                           width="40"
                           :selectable="strategySelectable" />
          <lz-table-column prop="name"
                           width="200"
                           label="人群名称" />
          <!-- <lz-table-column prop="strategyTypeStr" width="200" label="人群分类" /> -->
          <lz-table-column prop="description"
                           label="人群定义" />
          <lz-table-column prop="createTime"
                           width="170"
                           label="创建时间" />
        </lz-table>
      </div>
      <div style="text-align: right; margin-top: 10px;">
        <lz-button class="btn-confirm"
                   type="primary"
                   size="small"
                   @click="submit()">提交</lz-button>
        <lz-button class="btn-cancel"
                   size="small"
                   @click="toggleSelection()">取消</lz-button>
      </div>

    </lz-dialog>
    <lz-dialog title="选择自定义人群"
               :visible.sync="crowd.dialogShowed"
               @open='cacheDateFn'
               append-to-body>
      <!-- <lz-radio-group v-model="crowd.currentType" @change="getCrowds">
        <lz-radio-button :label="1">人群包</lz-radio-button>
        <lz-radio-button :label="2">人群策略</lz-radio-button>
      </lz-radio-group> -->

      <div v-show="crowd.currentType==1"
           style="margin-top: 10px;">
        <lz-table ref="crowdPackagePool"
                  border
                  :data="crowd.package.pool"
                  height="540"
                  @selection-change="changeCrowdResult"
                  row-key="crowdId">
          <lz-table-column :reserve-selection="true"
                           type="selection"
                           width="40"
                           :selectable="crowdSelectable" />
          <lz-table-column prop="crowdName"
                           width="250"
                           label="人群名称">
            <template slot-scope="scope">
              <div class="cell-name">
                <span>{{scope.row.crowdName}}</span>
              </div>
            </template>
          </lz-table-column>
          <lz-table-column prop="crowdNum"
                           width="100"
                           label="人群数量">
            <template slot-scope="scope">
              <div class="cell-name">
                <span v-if="scope.row.state==0">创建中</span>
                <span v-else>{{scope.row.crowdNum}}</span>
              </div>
            </template>
          </lz-table-column>
          <lz-table-column prop="remark"
                           label="人群定义" />
          <lz-table-column prop="createTime"
                           width="150"
                           label="创建时间" />
        </lz-table>
      </div>

      <div v-show="crowd.currentType==2"
           style="margin-top: 10px;">
        <lz-table ref="crowdPlanPool"
                  border
                  :data="crowd.plan.pool"
                  height="540"
                  @selection-change="changeCrowdResult"
                  row-key="crowdId">
          <lz-table-column :reserve-selection="true"
                           type="selection"
                           width="40"
                           :selectable="crowdSelectable" />
          <lz-table-column prop="crowdName"
                           width="250"
                           label="人群名称">
            <template slot-scope="scope">
              <div class="cell-name">
                <span>{{scope.row.crowdName}}</span>
              </div>
            </template>
          </lz-table-column>
          <lz-table-column prop="crowdNum"
                           width="100"
                           label="人群数量">
            <template slot-scope="scope">
              <div class="cell-name">
                <span v-if="scope.row.state==0">创建中</span>
                <span v-else>{{scope.row.crowdNum}}</span>
              </div>
            </template>
          </lz-table-column>
          <lz-table-column prop="remark"
                           label="人群定义" />
          <lz-table-column prop="createTime"
                           width="150"
                           label="创建时间" />
        </lz-table>
      </div>
      <div style="text-align: right; margin-top: 10px;">
        <lz-button class="btn-confirm"
                   type="primary"
                   size="small"
                   @click="submit()">提交</lz-button>
        <lz-button class="btn-cancel"
                   size="small"
                   @click="toggleSelection()">取消</lz-button>
      </div>
    </lz-dialog>
  </div>
</template>
<script>

import FormBlock from '../components/FormBlock.vue';
import InputBlock from '../components/InputBlock.vue';
import { LzMsg } from '@/utils/UI';
import Service from '@/business/service';

export default {
  name: 'CrowdSelector',
  components: {
    FormBlock,
    InputBlock,
  },
  props: {
    enable: {
      type: Boolean,
      default: false,
    },
    targetedType: {
      default: 1,
    },
    crowds: {
      type: Array,
      default: () => ([]),
    },
    strategies: {
      type: Array,
      default: () => ([]),
    },
  },
  mounted() {
    this.biType = this.targetedType;
  },
  data() {
    return {
      cacheDataCrowd: [],
      cacheDataStrategy: [],
      enableStatus: this.enable,
      biType: this.targetedType, // 1-定向人群；2-自定义人群
      strategy: {
        dialogShowed: false,
        currentType: 2, // 人群类型：1-人群包/系统推荐；2-人群策略/商家创建
        result: [...this.strategies],
        system: {
          pool: [],
          // selected: [],
          selected: this.strategies.filter(s => s.strategyType == 1).map(strategy => ({
            ...strategy,
            strategyTypeStr: ['系统推荐', '商家创建'][strategy.strategyType - 1],
          })),
          page: {
            pageSize: 200,
            pageNo: 1,
            total: 0,
          },
        },
        custom: {
          pool: [],
          // selected: [],
          selected: this.strategies.filter(s => s.strategyType == 2).map(strategy => ({
            ...strategy,
            strategyTypeStr: ['系统推荐', '商家创建'][strategy.strategyType - 1],
          })),
          page: {
            pageSize: 200,
            pageNo: 1,
            total: 0,
          },
        },
      },
      crowd: {
        dialogShowed: false,
        currentType: 2, // 1-人群包 2-人群策略
        result: [...this.crowds],
        package: {
          pool: [],
          selected: [],
          // selected: this.crowds.filter(c => c.crowdType == 1).map(crowd => ({
          //   ...crowd,
          //   crowdTypeStr: ['系统推荐', '商家创建'][crowd.crowdType - 1],
          // })),
          page: {
            pageSize: 200,
            pageNo: 1,
            total: 0,
          },
        },
        plan: {
          pool: [],
          // selected: [],
          selected: this.crowds.filter(c => c.crowdType == 2).map(crowd => ({
            ...crowd,
            crowdTypeStr: ['系统推荐', '商家创建'][crowd.crowdType - 1],
          })),
          page: {
            pageSize: 200,
            pageNo: 1,
            total: 0,
          },
        },
      },
    };
  },
  computed: {
    currentStrategy () {
      return [this.strategy.system, this.strategy.custom][this.strategy.currentType - 1];
    },
    currentStrategyTable () {
      return [this.$refs.strategySystemPool, this.$refs.strategyCustomPool][this.strategy.currentType - 1];
    },
    currentCrowd () {
      return [this.crowd.package, this.crowd.plan][this.crowd.currentType - 1];
    },
    currentCrowdTable () {
      return [this.$refs.crowdPackagePool, this.$refs.crowdPlanPool][this.crowd.currentType - 1];
    },
  },
  watch: {
    enable() {
      this.enableStatus = this.enable;
    },
    strategies () {
      this.strategy.result = [...this.strategies];
    },
    crowds () {
      this.crowd.result = [...this.crowds];
    },
    biType () {
      this.$emit('changeTargetedType', this.biType);
    },
  },
  methods: {
    // 是否使用BI
    changeEnable(value) {
      this.$emit('enableChange', value);
    },

    // 获取京东BI的系统人群/商家定制人群
    async getStrategies() {
      if (this.currentStrategy.pool.length === 0) {
        // this.currentStrategy.selected = [];
        const { data } = await Service.getStrategies({
          crowdType: this.strategy.currentType,
          ...this.currentStrategy.page,
        });
        this.currentStrategy.pool = data.map(strategy => ({
          ...strategy,
          strategyTypeStr: ['系统推荐', '商家创建'][strategy.strategyType - 1],
        }));
        this.currentStrategyTable.clearSelection();
        this.$nextTick(() => {
          this.currentStrategy.pool
            .filter(strategy => this.strategy.result.some(item => item.strategyId === strategy.strategyId))
            .forEach((strategy) => {
              console.log('this.currentStrategyTable:', this.currentStrategyTable);
              this.currentStrategyTable.toggleRowSelection(strategy);
            });
        });
      }
    },
    editStrategy () {
      this.strategy.dialogShowed = true;
      this.getStrategies();
    },

    removeStrategy(item) {
      this.strategy.result = this.strategy.result.filter(strategy => strategy.strategyId !== item.strategyId);
      this.$emit('changeBIData', {
        enable: true,
        biType: 1,
        strategies: [...this.strategy.result],
      });
      if (!this.$refs.strategySystemPool && !this.$refs.strategyCustomPool) {
        this.currentStrategy.selected = this.currentStrategy.selected.filter(s => s.crowdId !== item.crowdId);
      }
      if (item.strategyType === 1 && this.$refs.strategySystemPool) {
        const itemInTable = this.strategy.system.pool.find(s => s.strategyId === item.strategyId);
        this.$refs.strategySystemPool.toggleRowSelection(itemInTable, false);
      } else if (item.strategyType === 2 && this.$refs.strategyCustomPool) {
        const itemInTable = this.strategy.custom.pool.find(s => s.strategyId === item.strategyId);
        this.$refs.strategyCustomPool.toggleRowSelection(itemInTable, false);
      }
    },
    changeStrategyResult (strategies) {
      this.currentStrategy.selected = strategies;
      // debugger;
      // this.strategy.result = [
      //   ...this.strategy.system.selected,
      //   ...this.strategy.custom.selected,
      // ];
    },
    strategySelectable(item) {
      // return this.strategy.result.length < 3 || this.currentStrategy.selected.some(strategy => strategy.strategyId === item.strategyId);
      return this.strategy.system.selected.length + this.strategy.custom.selected.length < 3 || this.currentStrategy.selected.some(strategy => strategy.strategyId === item.strategyId);
    },

    // 获取表格数据
    async getCrowds() {
      if (this.currentCrowd.pool.length === 0) {
        const { data } = await Service.getCrowds({
          crowdType: this.crowd.currentType,
          ...this.currentStrategy.page,
        });
        this.currentCrowd.pool = data;
        this.currentCrowdTable.clearSelection();
        this.$nextTick(() => {
          this.currentCrowd.pool
            .filter(crowd => this.crowd.result.some(item => item.crowdId === crowd.crowdId))
            .forEach(crowd => this.currentCrowdTable.toggleRowSelection(crowd));
        });
      }
    },
    // 打开人群列表弹窗 并且获取人群列表
    async editCrowd() {
      this.crowd.dialogShowed = true;
      this.getCrowds();
    },

    changeCrowdResult(crowds) {
      this.currentCrowd.selected = crowds;

      // this.crowd.result = [
      //   ...this.crowd.package.selected,
      //   ...this.crowd.plan.selected,
      // ];
    },
    // 删除某一项选中的人群
    removeCrowd(item) {
      this.crowd.result = this.crowd.result.filter(crowd => crowd.crowdId !== item.crowdId);
      this.$emit('changeBIData', {
        enable: true,
        biType: 2,
        crowds: [...this.crowd.result],
      });
      if (!this.$refs.crowdPackagePool && !this.$refs.crowdPlanPool) {
        this.currentCrowd.selected = this.currentCrowd.selected.filter(s => s.crowdId !== item.crowdId);
      }
      if (item.crowdType === 1 && this.$refs.crowdPackagePool) {
        const itemInTable = this.crowd.package.pool.find(s => s.crowdId === item.crowdId);
        this.$refs.crowdPackagePool.toggleRowSelection(itemInTable, false);
      } else if (item.crowdType === 2 && this.$refs.crowdPlanPool) {
        const itemInTable = this.crowd.plan.pool.find(s => s.crowdId === item.crowdId);
        this.$refs.crowdPlanPool.toggleRowSelection(itemInTable, false);
      }
    },

    crowdSelectable(item) {
      return this.crowd.package.selected.length + this.crowd.plan.selected.length < 3 || this.currentCrowd.selected.some(crowd => crowd.crowdId == item.crowdId);
    },

    cacheDateFn() {
      console.log('🚀🚀~ 123:', 123);
      console.log('🚀🚀~ this.cacheDataCrowd:', this.cacheDataCrowd);
      this.cacheDataCrowd = this.currentCrowd.selected;
      this.cacheDataStrategy = this.currentStrategy.selected;
    },
    toggleSelection() {
      this.currentCrowd.selected = this.cacheDataCrowd;
      this.currentStrategy.selected = this.cacheDataStrategy;
      this.crowd.dialogShowed = false;
      this.strategy.dialogShowed = false;
    },
    // 提交选中的人群
    submit() {
      if (this.biType === 1) {
        this.strategy.result = [
          ...this.strategy.system.selected,
          ...this.strategy.custom.selected,
        ];
        this.$emit('changeBIData', {
          enable: true,
          biType: 1,
          strategies: [...this.strategy.result],
        });
        this.strategy.dialogShowed = false;
      } else if (this.biType === 2) {
        this.crowd.result = [
          ...this.crowd.package.selected,
          ...this.crowd.plan.selected,
        ];
        this.$emit('changeBIData', {
          enable: true,
          biType: 2,
          crowds: [...this.crowd.result],
        });
        this.crowd.dialogShowed = false;
      }
    },
  },
};
</script>
<style lang="scss">
.crowd-selector {
  margin-top: 20px;

  &.disable .editor-form-block-body {
    display: none;
  }
  .button-input {
    margin-top: 10px;
    padding: 0;
    background-color: transparent;

    .lz-button {
      width: 100%;
    }
  }
  .crowd-select-li {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    background: #fff;
    height: 30px;
    align-items: center;
    padding: 0 10px;
    margin-bottom: 10px;
    color: #333333;
  }
  .crowd-select-li:last-child {
    margin-bottom: 0;
  }

}
th:first-child .lz-checkbox__inner{
  display: none;
}
.overflow-text-single {
  width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
}
</style>
