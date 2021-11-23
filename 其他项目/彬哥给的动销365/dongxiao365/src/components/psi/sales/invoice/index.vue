<template>
  <div>
    <breadcrumb/>
    <!--头部-->
    <div class="tool-box text-right">
      <el-form :inline="true" class="form-compact" @submit.native.prevent>
          <el-form-item>
            <el-search v-model="page.keyword" @click="loadTableData" @keyup.enter.native="loadTableData" placeholder="请输入客户名称、业务员、订单号"></el-search>
          </el-form-item>
          <el-form-item>
            <el-button type="info" icon="fa fa-filter" @click="searchBoxVisible = !searchBoxVisible">筛选</el-button>
          </el-form-item>
      </el-form>
    </div>
    <!--检索条件-->
    <div class="tool-box" v-show="searchBoxVisible">
      <div class="search-panel border">
        <ComSearch @onSearch="handleFilter"/>
      </div>
    </div>
    <el-tabs v-model="activeName">
      <!--------------------代发货---------------------------->
      <el-tab-pane label="待发货" name="first">
        <!--<unshipped :visible="activeName==='first'"/>-->
      </el-tab-pane>
      <!--------------------发货完成---------------------------->
      <el-tab-pane label="发货完成" name="second">
        <!--<shipped :visible="activeName==='second'"/>-->
      </el-tab-pane>
      <!--表格-->
      <el-table
        v-loading="loading"
        :data="tableData"
        class="table-compact"
        ref="multipleTable"
        stripe
        border
        style="width: 100%">
        <el-table-column type="expand" label="" prop="commodityList">
          <template slot-scope="scope">
            <el-card>
              <el-table
                :data="scope.row.orderDetailList"
                class="table-compact"
                ref="multipleTable"
                border
                stripe
                style="width: 100%">
                <el-table-column sortable prop="itemCode" label="商品编码" width="130"></el-table-column>
                <el-table-column sortable prop="itemName" label="商品名称"></el-table-column>
                <el-table-column sortable prop="specification" label="规格属性"></el-table-column>
                <el-table-column sortable prop="itemAmount" label="金额" align="right">
                  <template slot-scope="scope">
                    {{scope.row.itemAmount | price }}元
                  </template>
                </el-table-column>
                <el-table-column sortable prop="itemCount" label="订货数量" align="right">
                  <template slot-scope="scope">
                    <el-tooltip effect="dark" :content="'1'+scope.row.auxiliaryUnitName+'='+scope.row.unitConvertRatio+''+scope.row.basicUnitName" placement="top-start" v-if="scope.row.enableAuxiliaryUnit">
                      <div>{{scope.row,scope.row.itemCount|unit}}</div>
                    </el-tooltip>
                    <div v-else>
                      {{scope.row,scope.row.itemCount|unit}}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column sortable prop="shippedCount" label="已发数量" align="right">
                  <template slot-scope="scope">
                    <el-tooltip effect="dark" :content="'1'+scope.row.auxiliaryUnitName+'='+scope.row.unitConvertRatio+''+scope.row.basicUnitName" placement="top-start" v-if="scope.row.enableAuxiliaryUnit">
                      <div>{{scope.row,scope.row.shippedCount|unit}}</div>
                    </el-tooltip>
                    <div v-else>
                      {{scope.row,scope.row.shippedCount|unit}}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column sortable prop="unshipCount" label="待发数量" align="right">
                  <template slot-scope="scope">
                    <el-tooltip effect="dark" :content="'1'+scope.row.auxiliaryUnitName+'='+scope.row.unitConvertRatio+''+scope.row.basicUnitName" placement="top-start" v-if="scope.row.enableAuxiliaryUnit">
                      <div>{{scope.row,scope.row.unshipCount|unit}}</div>
                    </el-tooltip>
                    <div v-else>
                      {{scope.row,scope.row.unshipCount|unit}}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column sortable prop="remark" label="备注"></el-table-column>
              </el-table>
            </el-card>
          </template>
        </el-table-column>
        <el-table-column sortable prop="code" label="订单号" width="130"></el-table-column>
        <el-table-column sortable prop="customerName" label="客户名称" width="120"></el-table-column>
        <el-table-column sortable prop="salesmanName" label="业务员" width="100"></el-table-column>
        <el-table-column sortable prop="orderTime" label="下单时间" width="110">
          <template slot-scope="scope">
            {{scope.row.orderTime | date}}
          </template>
        </el-table-column>
        <el-table-column sortable prop="deliverDate" label="交货日期" width="110">
          <template slot-scope="scope">
            {{scope.row.deliverDate |date}}
          </template>
        </el-table-column>
         <el-table-column sortable prop="actualAmount" label="订单金额" align="right" width="100">
          <template slot-scope="scope">
            {{scope.row.actualAmount | price }}元
          </template>
        </el-table-column>
        <el-table-column sortable prop="approvalStatus" label="审批状态">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.approvalStatus === 1? 'success' : scope.row.approvalStatus === 0? 'warning':'danger'"
              close-transition size="small">
              {{scope.row.approvalStatus | status}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column sortable prop="deliverStatus" label="发货状态">
          <template slot-scope="scope">
            <el-tag type="default" size="small" v-if="scope.row.deliverStatus === 0">未发货</el-tag>
            <div v-else>
              <el-tag type="success" v-if="scope.row.deliverCompletePercentage === 100">发货完成</el-tag>
              <el-tooltip effect="dark" v-else :content="'已发货'+scope.row.deliverCompletePercentage+'%'" placement="top-start">
                <el-tag type="warning">已发货</el-tag>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column sortable prop="remark" label="订单备注"></el-table-column>
        <el-table-column fixed="right" label="操作" v-if="activeName==='first'">
          <template slot-scope="scope">
            <el-button size="small" v-auth="'psi.sales.invoice.paper.delivery'" type="button" class="text-primary" @click="sendGoods(scope.row)">发货</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @current-change="handlePaginationChange"
        @size-change="handleSizeChange"
        :current-page="page.pageNum"
        :page-size="page.pageSize"
        layout="total, sizes,prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
      <delivery :visible.sync="invoiceVisible" :data="invoice" @delivered="handleDelivered"/>
    </el-tabs>
  </div>
</template>

<script>
  import ItemUtil from '../../../../util/itemUtil'
  import Delivery from './delivery'
  import ComSearch from '../../inc/search'

  export default {
    components: {
      ComSearch, Delivery
    },
    data() {
      return {
        tableData: [],
        page: {
          pageNum: 1,
          pageSize: 20,
          sortName: '',
          sortOrder: '',
          total: 0,
          keyword: ''
        },
        loading: false,
        invoice: {
          commodityList: []// 商品清单
        }, // 发货单
        activeName: "first",
        searchBoxVisible: true,
        invoiceVisible: false
      }
    },
    created() {
      this.activeName = sessionStorage.getItem('order_invoice_activeName') || 'first';
    },
    mounted() {
      this.loadTableData();
    },
    methods: {
      /* 加载表格数据*/
      loadTableData() {
        const url = this.activeName === 'first' ? 'psi/order/send/list' : 'psi/order/sendOver/list';
        this.loading = true;
        this.$http.get(url, this.page, r => {
          this.tableData = r.data.list;
          this.page.total = r.data.total;
          this.loading = false;
        });
      },
      /* 分页*/
      handlePaginationChange(pageNum) {
        this.page.pageNum = pageNum;
        this.loadTableData();
      },
      // 分页改变事件
      handleSizeChange(val) {
        this.page.pageSize = val;
        this.loadTableData();
      },
      // 筛选
      handleFilter(val) {
        this.page = this.$util.extend(this.page, val);
        this.loadTableData();
      },
      // 发货按钮
      sendGoods(data) {
        this.invoice = {
          customerId: data.customerId,
          customerName: data.customerName,
          limit: data.limit,
          salesmanName: data.salesmanName,
          warehouseName: data.warehouseName,
          deliverDate: data.deliverDate,
          deliverAddress: data.deliverAddress,
          warehouseId: data.warehouseId,
          id: data.id
        };
        this.invoice.commodityList = [];
        this.invoice.orderId = data.id;
        const list = data.orderDetailList;
        const len = list.length;
        for (let i = 0; i < len; i++) {
          this.$http.get('psi/stock/itemCountWarehouse', {
              warehouseId: this.invoice.warehouseId,
              itemId: list[i].itemId
            },
            r => {
              const item = this.$util.extend(list[i], {realityStock: r.data});
              item.orderDetailsId = item.id;
              item.deliverCount = 1;
              item.itemUnitId = item.basicUnitId;
              this.invoice.commodityList.push(item);
            })
        }
        this.invoiceVisible = true;
      },
      handleDelivered() {
        this.loadTableData();
      }
    },
    watch: {
      activeName(val) {
        sessionStorage.setItem('order_invoice_activeName', val);
        this.page.pageNum = 1;
        this.page.pageSize = 20;
        this.page.total = 0;
        this.tableData = [];
        this.loadTableData();
      }
    },
    filters: {
      status: function (val) {
        if (val === 1) {
          return "已审批"
        }
        if (val === 0) {
          return "未审批"
        }
        if (val === 2) {
          return "已驳回"
        }
      },
      unit(item, val) {
        return ItemUtil.format(item, val);
      }
    }
  }
</script>

