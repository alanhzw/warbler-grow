<template>
  <el-dialog title="客户详情" :visible.sync="show" width="800px" @close="handelClose">
    <div class="customer-info" style="height:400px;overflow:auto;" v-if="show">
      <!--客户详情头部-->
      <table>
        <tr>
          <td style="width: 200px;">
            <div class="image-thumbnail" v-if="customerInfo.logo">
              <a :href="customerInfo.logo" target="_blank"><img :src="customerInfo.logo" :alt="customerInfo.name"></a>
            </div>
            <div class="image-thumbnail" v-else>
              <img src="../../../assets/img/default.png" alt="未上传头像">
            </div>
          </td>
          <td>
            <table>
              <tr>
                <th style="width: 100px;">客户名称：</th>
                <td>{{customerInfo.name}}</td>
              </tr>
              <tr>
                <th>客户编码：</th>
                <td>{{customerInfo.code}}</td>
              </tr>
              <tr>
                <th>客户地址：</th>
                <td>{{customerInfo.address}}&nbsp;{{customerInfo.addressDetail}}</td>
              </tr>
              <tr>
                <th>客户电话：</th>
                <td>{{customerInfo.telephone}}</td>
              </tr>
              <tr>
                <th>创建时间：</th>
                <td>{{customerInfo.createTime|datetime}}</td>
              </tr>
              <tr>
                <th>客户标签：</th>
                <td>
                  <com-tag-view v-model="customerInfo.tagList"></com-tag-view>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <!--客户详情底部-->
      <el-row>
        <!--标签页-->
        <el-tabs v-model="activeName">
          <!--客户详情页面-->
          <el-tab-pane label="客户详情" name="first">
            <div class="detail">
              <el-row>
                <el-col :span="12">
                  <dd>客户名称：</dd>
                  <dt>{{customerInfo.name}}</dt>
                </el-col>
                <el-col :span="12">
                  <dd>客户编码：</dd>
                  <dt>{{customerInfo.code}}</dt>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <dd>客户经理：</dd>
                  <dt>{{customerInfo.managerName}}</dt>
                </el-col>
                <el-col :span="12">
                  <dd>传真号码：</dd>
                  <dt>{{customerInfo.fax}}</dt>
                </el-col>
              </el-row>
              <el-row>
                <dd>销售区域：</dd>
                <dt>{{customerInfo.saleAreaName}}</dt>
                <!--<el-col :span="12">
                  <dd>公司主页：</dd>
                  <dt>{{customerInfo.url}}</dt>
                </el-col>-->
              </el-row>
              <el-row>
                <el-col :span="24">
                  <dd>备注：</dd>
                  <dt class="desc">
                    {{customerInfo.description | transfer}}
                  </dt>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
          <!--<el-tab-pane label="客户图片" name="second">客户图片展示，等拜访有结果了才有图片</el-tab-pane>-->
          <el-tab-pane label="业务动态" name="three">
            <div class=" text-right" v-if="tableData.length>0">
              <el-button type="text" @click="goToRecordList">更多记录</el-button>
            </div>
            <el-table
              ref="dynamicsTable"
              :data="tableData"
              class="table-compact"
              width="100%">
              <el-table-column
                type="index"
                align="center">
              </el-table-column>
              <el-table-column sortable prop="visitTime" label="拜访时间">
                <template slot-scope="scope">
                  {{scope.row.startTime|datetime}}
                </template>
              </el-table-column>
              <el-table-column sortable prop="visitorName" label="拜访人"></el-table-column>
              <el-table-column label="状态" prop="visitStatus">
                <template slot-scope="scope">
                  <el-tag  type="info" v-if="scope.row.visitStatus===0">未开始</el-tag>
                  <el-tag  type="primary" v-if="scope.row.visitStatus===1">进行中</el-tag>
                  <el-tag  type="success" v-if="scope.row.visitStatus===2">已结束</el-tag>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              background
              @current-change="handlePaginationChange"
              :current-page="page.pageNum"
              :page-size="page.pageSize"
              layout="total, prev, pager, next"
              :total="page.total">
            </el-pagination>
          </el-tab-pane>
          <!--客户联系人-->
          <el-tab-pane label="客户联系人" name="four">
            <el-table
              ref="contactTable"
              :data="customerInfo.contactList"
              class="table-compact"
              width="100%">
              <el-table-column
                type="index"
                align="center"
                width="42">
              </el-table-column>
              <el-table-column sortable prop="name" label="姓名"></el-table-column>
              <el-table-column sortable prop="telephone" label="电话"></el-table-column>
            </el-table>
            <el-pagination
              background
              @current-change="handlePaginationChange"
              :current-page="page.pageNum"
              :page-size="page.pageSize"
              layout="total, prev, pager, next"
              :total="page.total">
            </el-pagination>
          </el-tab-pane>
          <!--收货地址-->
          <el-tab-pane label="收货地址" name="five">
            <el-table
              ref="addressTable"
              :data="customerInfo.addressList"
              class="table-compact"
              width="100%">
              <el-table-column
                type="index"
                align="center"
                width="42">
              </el-table-column>
              <el-table-column sortable prop="name" label="收货人"></el-table-column>
              <el-table-column sortable prop="tel" label="电话"></el-table-column>
              <el-table-column sortable prop="address" label="收货地址"></el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
  import ComTagView from '../tag-view/index'
  export default {
    name: "info",
    components: {ComTagView},
    props: {
      visible: Boolean,
      customerId: {
        type: [String, Number],
        default: null
      }
    },
    data() {
      return {
        customerInfo: {},
        activeName: 'first', // 客户详情导航页
        tableData: [],
        show: this.visible,
        page: {
          pageNum: 1,
          pageSize: 5,
          sortName: '',
          sortOrder: '',
          total: 0
        }
      }
    },
    methods: {
      init() {
        this.customerInfo = this.customer;
      },
      loadData() {
        this.$http.get('/crm/customer/info', {id: this.customerId}, r => {
          this.customerInfo = r.data || {};
          if (r.data.addressList) {
            this.customerInfo.addressList = JSON.parse(r.data.addressList)
          } else {
            this.customerInfo.addressList = [];
          }
        }, e => {
          this.$message.error('客户加载失败,请尝试刷新页面后重新打开');
          this.customerInfo = {};
        });
        this.loadRecord();
      },
      loadRecord() {
        this.page.customerId = this.customerId;
        this.$http.get('crm/visit/record/list', this.page, r => {
          this.tableData = r.data.list;
          this.page.total = r.data.total;
        });
      },
      handlePaginationChange(pageNum) {
        this.page.pageNum = pageNum;
        this.loadRecord();
      },
      // 跳页
      goToRecordList() {
        this.$router.push({path: '/visit/record/customerRecord', query: {keyword: this.customerInfo.name}})
      },
      handelClose() {
        this.customerInfo = {};
        this.$emit('update:visible', false);
      }
    },
    watch: {
      visible: function (val) {
        this.show = val;
        if (val) {
          this.loadData();
        } else {
          this.customerInfo = {};
          this.activeName = 'first';// 客户详情导航页
        }
      },
      activeName: function (val) {
        setTimeout(() => {
          if (this.$refs.dynamicsTabl) { this.$refs.dynamicsTable.doLayout(); }
          if (this.$refs.contactTable) { this.$refs.contactTable.doLayout(); }
          if (this.$refs.addressTable) { this.$refs.addressTable.doLayout(); }
        }, 100);
      }
    }
  }
</script>

<style scoped lang="scss">

  .customer-info {
    margin: 0 25px 25px 25px;
    .image-thumbnail {
      height: 185px;
      width: 170px;
      display: block;
      padding: 4px;
      margin-bottom: 20px;
      line-height: 1.42857143;
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 4px;
      -webkit-transition: border .2s ease-in-out;
      -o-transition: border .2s ease-in-out;
      transition: border .2s ease-in-out;
      img {
        height: 100%;
        max-width: 100%;
      }
    }
    table tr, table td {
      vertical-align: top;
    }
    .detail {
      .el-row {
        background: none;
        border-bottom: solid 1px #EBEEF5;
        padding-bottom: 5px;
        margin-bottom: 10px;
        dd {
          float: left;
          margin-left: 10px;
          font-weight: bold;
        }
        dt {
          margin-left: 80px;
          &.desc {
            margin-left: 55px;
          }
        }
      }
    }
  }
</style>
