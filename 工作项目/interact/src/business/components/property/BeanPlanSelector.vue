<template>
  <div class="component-bean-plan-selector">
    <lz-form inline>
      <lz-form-item label="京豆计划名称：">
        <lz-input v-model="params.planName"
                  placeholder="请输入京豆计划名称"></lz-input>
      </lz-form-item>
      <lz-form-item label="京豆计划ID：">
        <lz-input v-model="params.planId"
                  placeholder="请输入京豆计划ID"></lz-input>
      </lz-form-item>
      <lz-form-item label="库存状态："
                    style="margin-right:-37px">
        <lz-select v-model="params.stockTpye"
                   placeholder="请选择">
          <lz-option label="有库存"
                     :value="1" />
          <lz-option label="无库存"
                     :value="2" />
        </lz-select>
      </lz-form-item>
      <lz-form-item label="">
        <a class="new-bean"
           @click='newBeanPlan'>新建或查看全部京豆计划 >></a>
      </lz-form-item>
      <!--
    <lz-form-item label="生效状态：">
      <lz-select v-model="params.activeType" placeholder="请选择">
        <lz-option label="当前计划" :value="1" />
        <lz-option label="历史计划" :value="2" />
      </lz-select>
    </lz-form-item> -->
      <lz-form-item label=""
                    style="justify-content: flex-end">
        <lz-button type="primary"
                   @click="getBeanPlans(1)">查询</lz-button>
        <lz-button @click="resetParams">重置</lz-button>
      </lz-form-item>
    </lz-form>
    <lz-table border
              :data="planPage"
              ref="multipleTable"
              highlight-current-row>
      <lz-table-column type="selection"
                       width="55">
      </lz-table-column>
      <lz-table-column align="left"
                       label="计划名称"
                       prop="planName"
                       :resizable="false" />
      <lz-table-column align="center"
                       label="计划编号"
                       prop="planId"
                       :resizable="false" />
      <lz-table-column width="160"
                       align="center"
                       label="创建时间"
                       prop="createTime"
                       :resizable="false" />
      <lz-table-column width="165"
                       align="center"
                       label="生效时间"
                       :resizable="false">
        <template slot-scope="scope"> {{ scope.row.startDate }}-{{ scope.row.endDate }} </template>
      </lz-table-column>
      <lz-table-column align="center"
                       width="120"
                       label="库存余量"
                       prop="quantityRemain"
                       :resizable="false" />
      <lz-table-column align="center"
                       width="80"
                       label="时效状态"
                       prop="planStatus"
                       :resizable="false">
        <template slot-scope="scope">{{ ["未生效", "已生效", "已结束"][scope.row.planStatus - 1] }}</template>
      </lz-table-column>
      <lz-table-column align="center"
                       width="60"
                       :resizable="false"
                       label='操作'>
        <template slot-scope="scope">
          <lz-button text
                     type="danger"
                     @click="$emit('select', scope.row)">选择</lz-button>
        </template>
      </lz-table-column>
    </lz-table>
    <p class="tip">注：不可选择过期、可用数量为0，或已关联其他活动的资产项</p>
    <div style="text-align: right">
      <lz-pagination layout="total, prev, pager, next"
                     @current-change="getBeanPlansPage"
                     :current-page="page.pageNo"
                     :page-sizes="[10, 20, 30, 40]"
                     :page-size="5"
                     background
                     :total="page.total" />
    </div>
  </div>
</template>

<script>
import Service from '@/business/service';
import LzLoading from '@/business/utils/LzLoading';
import { appHistory } from '@ice/stark-app';

const initParams = {
  stockTpye: 1, // 库存状态 1-有库存 2-无库存
  activeType: 1, // 生效状态 1-当前京豆计划  2-历史京豆计划
  planId: '', // 京东返回的计划id
  planName: '', // 计划名称
};
export default {
  name: 'BeanPlanSelector',
  props: {
    prizeForm: {
      default: () => ({}),
    },
  },
  data() {
    return {
      planPage: [],
      plans: [],
      params: {
        ...initParams,
      },
      page: {
        pageNo: 1,
        pageSize: 999,
        total: 0,
      },
    };
  },
  async created() {
    await this.getBeanPlans();
    this.isSelect();
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 是否被选中
    isSelect() {
      if (this.prizeForm.beanPlanSelected) {
        this.planPage.forEach((item, index) => {
          if (item.planId == this.prizeForm.beanPlanSelected.planId) {
            this.toggleSelection([this.planPage[index]]);
            this.$nextTick(() => {
              this.toggleSelection([this.planPage[index]]);
            });
          }
        });
      }
    },
    // 分页切换的时候
    getBeanPlansPage(pageNo) {
      this.planPage = this.plans.slice((pageNo - 1) * 5, (pageNo - 1) * 5 + 5);
      this.isSelect();
    },
    // 跳转至资产中心
    newBeanPlan() {
      appHistory.push('/property/bean');
    },
    resetParams() {
      this.params = {
        ...initParams,
      };
      this.page = {
        pageNo: 1,
        pageSize: 999,
        total: 0,
      };
      this.getBeanPlans(1);
    },
    async getBeanPlans(pageNo = this.page.pageNo) {
      const loading = LzLoading.start();

      const { data, page } = await Service.getBeanPlans({
        ...this.params,
        ...this.page,
        pageNo,
      });
      this.plans = data;
      this.getBeanPlansPage(1);
      this.page = {
        ...this.page,
        ...page,
      };
      loading.close();
    },
  },
};
</script>

<style lang="scss">
.component-bean-plan-selector {
  .new-bean {
    color: #3399ff;
    cursor: pointer;
  }
  .lz-table-column--selection {
    pointer-events: none;
    cursor: not-allowed;
    cursor: no-drop;
  }
  .lz-table__header {
    .lz-checkbox {
      display: none;
    }
  }
  .lz-table__body {
    .lz-checkbox__inner {
      background-color: #c3cbd6;
      border-color: #c3cbd6;
    }
  }
  .lz-form{
    display: flex;
    align-content: flex-start;
    justify-content: space-between;
    flex-flow: row wrap;
  }
  .lz-form-item{
    flex: 0 0 30%;
    display: flex;
    justify-content: flex-start;
    margin-right: 0;
  }
  .lz-form-item__label{
    padding: 0;
  }
}
</style>
