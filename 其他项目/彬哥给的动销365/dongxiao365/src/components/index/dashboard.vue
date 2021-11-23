<template>
    <div class="content">
        <div class="content_left">
            <!-- 客户拜访统计 -->
            <ul class="content_one">
                <div class="header_time">
                    <h5>客户拜访统计</h5>
                    <div class="select1">
                        <el-date-picker style="margin-top: 12px;"
                        clearable="false"
                        v-model="dateRange1"
                        type="daterange"
                        align="right"
                        size="mini"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions1"
                        value-format="yyyy-MM-dd"
                        @change="dateQueryOne">
                        </el-date-picker>
                    </div>
                </div>

                <li class="first">
                    <p>计划拜访次数</p>
                    <p>{{planCount}}</p>
                </li>
                <li class="li">
                    <p>计划完成次数</p>
                    <p>{{totalCount}}</p>
                </li>
                <li class="li">
                    <p>计划完成率</p>
                    <p>{{finshed}}</p>
                </li>
                <li class="li">
                    <p>失访次数</p>
                    <p>{{missCount}}</p>
                </li>
            </ul>
            <!-- 数据上报统计 -->
            <ul class="content_two">
                <h5>数据上报统计</h5>
                <li class="first">
                    <p>拍照上传次数</p>
                    <p>{{picCount}}</p>
                </li>
                <li class="li">
                    <p>销量上报次数</p>
                    <p>{{salesCount}}</p>
                </li>
                <li class="li">
                    <p>库存上报次数</p>
                    <p>{{storeCount}}</p>
                </li>
                <li class="li">
                    <p>铺货上报次数</p>
                    <p>{{distribCount}}</p>
                </li>
            </ul>
            <!-- 我的拜访任务 -->
            <ul class="content_three">
                <div class="table_time">
                    <div style="width:92.5%;display:flex;justify-content: space-between;">
                        <h5>我的拜访任务</h5>
                        <div class="select2">
                            <el-date-picker style="margin-top: 12px;"
                                    clearable="false"
                                    v-model="dateRange2"
                                    type="daterange"
                                    align="right"
                                    size="mini"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    @change="dateQueryTwo"
                                    :picker-options="pickerOptions2"
                                    value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </div>
                    </div>

                </div>
                <!-- 表格 -->
                <el-table
                    border
                    stripe
                    v-loading="loading"
                    @sort-change="handleSort"
                    @selection-change="handleSelectionChange"
                    :data="tableData"
                    ref="multipleTable"
                    style="width:92.5%;">
                    <el-table-column prop="customerName" label="客户名称">
                    <template slot-scope="scope">
                        <el-button style="color:#606266;" type="text" sizie="mini" @click="info(scope.row)">{{scope.row.customerName}}</el-button>
                    </template>
                    </el-table-column>
                    <el-table-column prop="customerAddress" label="客户地址"></el-table-column>
                    <el-table-column prop="userName" label="下达人"></el-table-column>
                    <el-table-column prop="planTime" label="拜访时间">
                        <template slot-scope="scope">
                            {{scope.row.planTime|datetime('yyyy-MM-dd')}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="拜访状态">
                        <template slot-scope="scope">
                        <el-tag :type="scope.row.status === 0 ? 'danger' : 'success'" size="small">{{scope.row.status | visitStatus}}
                        </el-tag>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 表格 -->
               <el-pagination
                    background
                    @current-change="handlePaginationChange"
                    @size-change="handleSizeChange"
                    :page-sizes="[10,50,100, 200, 300, 400]"
                    :current-page="page.pageNum"
                    :page-size="page.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="page.total">
                </el-pagination>
            </ul>
        </div>
        <div class="content_right">
            <div class="rh_one">
                <div class="right_title">
                    <h5>版本信息</h5>
                    <el-tag style="margin-top:15px;margin-left:13%;" type="success">
                        {{status | userStatus}}
                    </el-tag>
                </div>
                <div>
                    <div style="margin-bottom:10px;margin-left:22%">
                        <span style="text-align:center;color:#67c23a;padding-right: 9px;">剩余</span>
                        <span style="font-size:30px;color:#67c23a;">
                            {{(expireTime-createTime)|minute}}
                        </span>
                        <span style="text-align:center;color:#67c23a;">天</span>
                    </div>
                </div>
                <div class="time">
                    <p>
                        <span style="color:#999;font-size:14px;">开通时间：</span>
                        <span style="font-size:14px;">
                            {{createTime|datetime('yyyy-MM-dd')}}
                        </span>
                    </p>
                    <p>
                        <span style="color:#999;font-size:14px;">到期时间：</span>
                        <span style="font-size:14px;">
                            {{expireTime|datetime('yyyy-MM-dd')}}
                        </span>
                    </p>
                </div>
                <div class="open">
                    <span style="font-size:14px;margin-left:45px;">开通人数</span>
                    <span style="color:#409eff;font-size:14px;">
                        {{open_count}}
                    </span>
                </div>
            </div>
            <!-- 二 -->
            <div class="rh_two">
                 <div class="right_title">
                    <h5>存储信息</h5>
                </div>
                <div class="storage">
                    <el-progress :text-inside="true" :stroke-width="16" :percentage="percentage"></el-progress>
                    <span>{{storage_space}}</span>/10G
                </div>
                <div class="storage" style="padding:20px 0;">
                    <span style="padding:10px 0;">存储空间</span>
                    <span>10G</span>
                </div>
            </div>
            <!-- 三 -->
            <div class="rh_three">
                 <div class="right_title">
                    <h5>客服专线</h5>
                </div>
                <div class="tel">
                    <img style="width:24px;height:24px;" src="../../assets/img/tel.jpg" alt="">
                    <span style="margin-left:20px;font-size:15px;">029-68875860</span>
                </div>
                <div class="tel" style="border-bottom:0;">
                    <img src="../../assets/img/help.jpg" alt="">
                    <span @click="help" style="margin-left:20px;color:#67c23a;font-size:14px;cursor:pointer;">常见问题点这里</span>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

export default {
    data() {
      const now = new Date
      const startDay = this.formatDate(now - 30 * 86400000, 'yyyy-MM-dd')
      const endDay = this.formatDate(now, 'yyyy-MM-dd')
      const dateRangeLimit = {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }],
          disabledDate(time) {
            return  time.getTime() > new Date()
          }
        }
        return {
            // 一
            totalList: '',
            planCount: '', // 计划拜访次数
            totalCount: '', // 计划完成次数
            missCount: '', // 失访次数
            finshed: '', // 计划完成率
            // 一
            // 二
            picCount: '',
            salesCount: '',
            storeCount: '',
            distribCount: '',
            // 二
            // 加载
            loading: true,
            tableData: [], // 列表数据源
            // 分页
            page: {
                pageNum: 1,
                pageSize: 10,
                sortName: '',
                sortOrder: '',
                total: 0,
                searchFlg: 1 // 我的客户
            },
            // 日期查询
            dateRange1: [startDay, endDay],
            dateRange2: [startDay, endDay],
            pickerOptions1: dateRangeLimit,
            pickerOptions2: dateRangeLimit,
            // 右側
            user: {},
            status: '',
            createTime: '',
            expireTime: '',
            open_count: '',
            storage_space: '',
            percentage: ''
        }
    },
    created() {
      const now = new Date
      const startDay = this.formatDate(now - 30 * 86400000, 'yyyy-MM-dd')
      const endDay = this.formatDate(now, 'yyyy-MM-dd')
      this.loadData(startDay, endDay);// 表格
      this.listData(startDay, endDay);// 客户拜访
    //   this.listData1();// 数据上报
      // 右侧信息
      this.user = JSON.parse(decodeURIComponent(localStorage.user));
      const corp = JSON.parse(decodeURIComponent(localStorage.corp));
      this.status = corp.status
      this.createTime = corp.createTime
      this.expireTime = corp.expireTime
      this.open_count = corp.open_count
      this.storage_space = Number(corp.storage_space / 1024 * 100).toFixed(2) + 'G'
      this.percentage = Number(corp.storage_space / 1024 * 100).toFixed(2)
    },
    mounted() {

    },
    methods: {
    //   左
      // 客户拜访统计和数据上报统计
      listData(startDate, endDate, changed) {
        this.$http.get('/report/visit/currentUser', {startDate: startDate, endDate: endDate}, r => {
            
            // 数据上报统计
            this.picCount = r.data.picCount;
            this.salesCount = r.data.salesCount;
            this.storeCount = r.data.storeCount;
            this.distribCount = r.data.distribCount;

            // 客户拜访统计
            this.totalList = r.data.visitcount
            this.planCount = this.totalList.planCount
            this.totalCount = this.totalList.totalCount
            this.missCount = this.totalList.missCount
            if (this.planCount || this.totalCount) {
                this.finshed = Number(this.totalCount / this.planCount * 100).toFixed(2) + '%'
            } else {
                this.finshed = 0.00 + '%'
                return  0
            }
        }, e => {
          this.$message.error(e.msg);
          console.error(e)
        })
      },

      // 加载我的拜访任务列表
      loadData(startDate, endDate, changed) {
        this.loading = true
        this.$http.get('/crm/visit/plan/getPage/main', Object.assign(this.page, {startDate: startDate, endDate: endDate}), r => {
          this.page.total = r.data.total;
          this.tableData = r.data.list;
          this.loading = false;
        }, e => {
          this.$message.error(e.msg);
          console.error(e)
        })
      },
      // 列表排序
      handleSort(sort) {
        this.$util.build_sort(this.page, sort);
        this.loadData();
      },
      // 分页
      handlePaginationChange(pageNum) {
        this.page.pageNum = pageNum;
        this.loadData();
      },
      // 分页改变事件
      handleSizeChange(val) {
        this.page.pageSize = val;
        this.loadData(val);
      },

      // 时间

      //   时间查询人数
      dateQueryOne(val) {
        this.listData(val[0], val[1], true)
      },
      dateQueryTwo(val) {
        this.loadData(val[0], val[1], true)
      },
      //   时间查询表格

      // 时间

    // 常见问题
      help() {
        this.$router.replace('/help/guide')
      }
    },
    filters: {
      time(val) {
        return dateFormat(val, 'HH:mm') || '未知 '
      },
      minute(val) {
        if (val && !isNaN(val) && val > 0) {
          const second_time = val / 1000;
          let time = parseInt(second_time) + "秒";
          if (parseInt(second_time) > 60) {
            const second = parseInt(second_time) % 60;
            let min = parseInt(second_time / 60);
            time = min + "分" + second + "秒";
            if (min > 60) {
              min = parseInt(second_time / 60) % 60;
              let hour = parseInt(parseInt(second_time / 60) / 60);
              time = hour + "小时" + min + "分" + second + "秒";
              if (hour > 24) {
                hour = parseInt(parseInt(second_time / 60) / 60) % 24;
                const day = parseInt(parseInt(parseInt(second_time / 60) / 60) / 24);
                time = day;
              }
            }
          }
          return time;
        } else {
          return '--'
        }
      }
    }
}
</script>

<style>

</style>
