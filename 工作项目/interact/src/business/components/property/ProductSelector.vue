<!--
 * @Description:
 * @Autor: hanzhiwei
 * @Date: 2020-10-28 10:50:24
 * @LastEditTime: 2021-08-18 11:31:01
 * @FilePath: \interact\src\business\components\property\ProductSelector.vue
-->
<template>
  <div class="component-product-selector">
    <lz-form inline>
      <lz-form-item label="商品名称："
                    label-width="70px">
        <lz-input v-model="params.skuName"
                  placeholder="请输入商品名称"></lz-input>
      </lz-form-item>
      <lz-form-item label="商品编号/商家编号："
                    label-width="200px">
        <lz-input v-model="params.skuOrWmsCode"
                  placeholder="请输入商品编号/商家编号"
                  @input='format'></lz-input>
      </lz-form-item>
      <lz-form-item label="库存状态："
                    label-width="80px"
                    style="margin-right:-27px">
        <lz-select v-model="params.stockTpye"
                   placeholder="请选择">
          <lz-option label="有货"
                     :value="1" />
          <lz-option label="无货"
                     :value="2" />
        </lz-select>
      </lz-form-item>
      <lz-form-item label="">
        <a class="new-coupon"
           @click="newProduct()">新建商品 >></a>
      </lz-form-item>
      <lz-form-item label=""
                    style="justify-content: flex-end">
        <lz-button type="primary"
                   @click="getProduct(1)">查询</lz-button>
        <lz-button @click="resetParams">重置</lz-button>
      </lz-form-item>
    </lz-form>
    <lz-table border
              :data="productsPage"
              ref="multipleTable"
              highlight-current-row>
      <lz-table-column type="selection"
                       width="55">
      </lz-table-column>
      <lz-table-column align="left"
                       label="商品名称"
                       prop="skuName"
                       :resizable="false" />
      <lz-table-column align="center"
                       label="商品编号"
                       prop="skuCode"
                       :resizable="false" />
      <lz-table-column align="center"
                       label="商家编号"
                       prop="wmsCode"
                       :resizable="false" />
      <lz-table-column width="160"
                       align="center"
                       label="创建时间"
                       prop="createTime"
                       :resizable="false" />
      <lz-table-column align="center"
                       width="120"
                       label="可用数量"
                       prop="quantityAvailable"
                       :resizable="false" />
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
    <div style="text-align: right">
      <lz-pagination layout="total, prev, pager, next"
                     @current-change="getProductPage"
                     :current-page="page.pageNo"
                     :page-sizes="[10, 20, 30, 40]"
                     :page-size="5"
                     :total="page.total" />
    </div>
  </div>
</template>

<script>
import Service from '@/business/service';
import LzLoading from '@/business/utils/LzLoading';
import { appHistory } from '@ice/stark-app';

const initParams = {
  skuName: '', // SKU名称
  skuOrWmsCode: '', // 商品SkuCode或wmsCode
  stockTpye: 1, // 库存状态 1-有库存 2-无库存
};
export default {
  name: 'ProductSelector',
  props: {
    prizeForm: {
      default: () => ({}),
    },
  },
  data() {
    return {
      productsPage: [],
      products: [],
      params: {
        ...initParams,
      },
      page: {
        pageNo: 1,
        pageSize: 999999,
        total: 0,
      },
    };
  },
  async created() {
    await this.getProduct();
    this.isSelect();
  },
  methods: {
    // 分页切换的时候
    getProductPage(pageNo) {
      this.productsPage = this.products.slice((pageNo - 1) * 5, (pageNo - 1) * 5 + 5);
      this.isSelect();
    },
    // 输入框格式化
    format() {
      this.params.skuOrWmsCode = this.params.skuOrWmsCode.replace(/[\W]/g, '');
    },
    // 勾选单选框
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
      if (this.prizeForm.productSelected) {
        this.productsPage.forEach((item, index) => {
          if (item.skuCode == this.prizeForm.productSelected.skuCode) {
            this.toggleSelection([this.productsPage[index]]);
            this.$nextTick(() => {
              this.toggleSelection([this.productsPage[index]]);
            });
          }
        });
      }
    },
    // 跳转至资产中心
    newProduct() {
      appHistory.push('/property/product');
    },
    resetParams() {
      this.params = {
        ...initParams,
      };
      this.page = {
        pageNo: 1,
        pageSize: 10,
        total: 0,
      };
      this.getProduct(1);
    },
    async getProduct(pageNo = this.page.pageNo) {
      const loading = LzLoading.start();

      const { data, page } = await Service.getProduct({
        ...this.params,
        ...this.page,
        pageNo,
      });
      this.products = data;
      this.getProductPage(1);

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
.component-product-selector {
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
