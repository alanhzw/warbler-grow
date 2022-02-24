<template>
  <div class="component-coupon-selector">
    <lz-form inline>
      <lz-form-item label="优惠券名称：">
        <lz-input v-model="params.planName"
                  placeholder="请输入优惠券名称"></lz-input>
      </lz-form-item>
      <lz-form-item label="优惠券ID/putKey：">
        <lz-input v-model="params.couponIdOrPutKey"
                  placeholder="请输入优惠券ID/putKey"></lz-input>
      </lz-form-item>
      <lz-form-item label="优惠方式："
                    style="margin-right:-37px">
        <lz-select v-model="params.discountType"
                   placeholder="请选择">
          <lz-option label="满减"
                     :value="1" />
          <lz-option label="满折"
                     :value="2" />
        </lz-select>
      </lz-form-item>
      <lz-form-item label="优惠范围：">
        <lz-select v-model="params.rangeType"
                   placeholder="请选择">
          <lz-option label="店铺"
                     :value="1" />
          <lz-option label="商品"
                     :value="2" />
        </lz-select>
      </lz-form-item>
      <lz-form-item label="">
        <a class="new-coupon"
           style="margin-left:20px"
           @click='newCoupon'>新建或查看全部优惠券 >></a>
      </lz-form-item>
      <lz-form-item label=""
                    style="justify-content: flex-end">
        <lz-button type="primary"
                   @click="getCoupons(1)">查询</lz-button>
        <lz-button @click="resetParams">重置</lz-button>
      </lz-form-item>
    </lz-form>
    <lz-table border
              :data="couponsPage"
              ref="multipleTable"
              highlight-current-row>
      <lz-table-column type="selection"
                       width="55">
      </lz-table-column>
      <lz-table-column align="left"
                       label="优惠券名称"
                       prop="planName"
                       :resizable="false" />
      <lz-table-column align="center"
                       label="优惠券信息"
                       width="180"
                       :resizable="false">
        <template slot-scope="scope">
          <Couponthumb :info="scope.row" />
        </template>
      </lz-table-column>

      <lz-table-column width="160"
                       align="center"
                       label="创建时间"
                       prop="createTime"
                       :resizable="false" />
      <lz-table-column width="165"
                       align="center"
                       label="领取时间"
                       :resizable="false">
        <template slot-scope="scope"> {{ scope.row.couponBeginTime }}-{{ scope.row.couponEndTime }} </template>
      </lz-table-column>
      <lz-table-column align="center"
                       width="120"
                       label="可用数量（张）"
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
                     @current-change="getCouponsPage"
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
import Couponthumb from './CouponThumb';

const initParams = {
  planName: '',
  couponIdOrPutKey: '',
  // createStartTime: '', //创建开始时间
  // createEndTime: '', //创建结束时间
  discountType: 1, // 优惠方式 1-满减 2-满折
  rangeType: 1, // 优惠范围 1-店铺 2-商品
  activeType: 1, // 生效状态 1-当前优惠券  2-历史优惠券
};
export default {
  name: 'CouponSelector',
  props: {
    prizeForm: {
      default: () => ({}),
    },
  },
  components: {
    Couponthumb,
  },
  data() {
    return {
      couponsPage: [],
      coupons: [],
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
    this.getCoupons();
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
      console.log('this.prizeForm:', this.prizeForm);

      if (this.prizeForm.couponSelected) {
        this.couponsPage.forEach((item, index) => {
          if (item.planId == this.prizeForm.couponSelected.planId) {
            this.toggleSelection([this.couponsPage[index]]);
            this.$nextTick(() => {
              this.toggleSelection([this.couponsPage[index]]);
            });
          }
        });
      }
    },
    // 切换分页的时候
    getCouponsPage(pageNo) {
      this.couponsPage = this.coupons.slice((pageNo - 1) * 5, (pageNo - 1) * 5 + 5);
      this.isSelect();
    },
    // 跳转至资产中心
    newCoupon() {
      appHistory.push('/property/coupon');
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
      this.getCoupons(1);
    },
    async getCoupons(pageNo = this.page.pageNo) {
      const loading = LzLoading.start();

      const { data, page } = await Service.getCoupons({
        ...this.params,
        ...this.page,
        pageNo,
      });
      this.coupons = data;
      this.getCouponsPage(1);
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
.component-coupon-selector {
  .new-coupon {
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
