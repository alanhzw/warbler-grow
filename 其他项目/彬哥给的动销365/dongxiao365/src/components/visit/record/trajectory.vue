<template>
  <div>
      <breadcrumb/>
      <el-tabs v-model="activeName">
        <el-tab-pane label="拜访排名" name="rank">
          <el-container>
            <el-aside width="200px">
              <el-tree
                ref="tree"
                v-loading="departTreeLoading"
                auto-expand-parent
                default-expand-all
                :data="departTree"
                :check-strictly="false"
                :props="departTreeProp"
                node-key="id"
                :highlight-current="true"
                :expand-on-click-node="false"
                @node-click="handleDepartClick"
              ></el-tree>
            </el-aside>
            <el-main style="padding: 0;">
              <!--表格主体-->
              <div>
                <el-table
                  :data="tableData"
                  border
                  stripe
                  style="width: 100%">
                  <el-table-column type="index" width="50"></el-table-column>
                  <el-table-column prop="userName" label="名称"></el-table-column>
                  <el-table-column prop="visitCount" sortable label="拜访次数">
                    <template slot-scope="scope">
                      {{scope.row.visitCount}} (次)
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination
                  background
                  @current-change="handlePaginationChange"
                  @size-change="handleSizeChange"
                  :page-sizes="[20,50,100, 200, 300, 400]"
                  :current-page="page.pageNum"
                  :page-size="page.pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="page.total">
                </el-pagination>
              </div>
            </el-main>
          </el-container>
        </el-tab-pane>
        <!-- 拜访轨迹 -->
        <el-tab-pane label="拜访轨迹" name="track">
          <el-container>
            <el-aside width="200px">
              <depart-user-tree @node-click="handleUserClick"></depart-user-tree>
            </el-aside>
            <el-main style="width: 100%; height: 1000px; padding: 0">
              <div class="tool-box">
                <el-row>
                  <el-col :span="12">
                    拜访总里程：<span>{{totalDistance}}公里</span>
                  </el-col>
                  <el-col :span="10" class="text-right">
                    拜访日期：
                    <el-date-picker v-model="queryParam.date" :clearable="false" :editable="false" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" @change="loadData"></el-date-picker>
                  </el-col>
                  <el-col :span="2">
                    <el-button style="margin-left:25px;" @click="details()">拜访明细</el-button>
                  </el-col>
                </el-row>
              </div>
              <div>
                <div id="container" style="width:100%; height: 100%; padding: 0; margin: 0;"></div>
              </div><br>
            </el-main>
          </el-container>
        </el-tab-pane>
      </el-tabs>
      <!-- 明细弹窗 -->
      <el-dialog
        :visible.sync="dialogVisible"
        width="800"
        :before-close="handleClose">
        <div slot="title">
            {{queryParam.visitorName}} {{queryParam.date}} 的拜访明细
        </div>
        <div style="height:300px;overflow-y:auto;">       
            <el-table
              :data="tableData1"
              style="width: 100%">
              <el-table-column prop="" label="开始时间" width="150">
                <template slot-scope="scope">
                  {{scope.row.startTime|datetime('hh:mm')}}
                </template>
              </el-table-column>
               <el-table-column prop="" label="结束时间" width="150">
                <template slot-scope="scope">
                  {{scope.row.endTime|datetime('hh:mm')}}
                </template>
              </el-table-column>
              <el-table-column prop="" label="停留时间" width="150">
                <template slot-scope="scope">
                  {{(scope.row.endTime-scope.row.startTime)|minute}}
                </template>
              </el-table-column>
              <el-table-column prop="customerName" label="客户名称"></el-table-column>
            </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>


<script>
  import DepartUserTree from '../../lib/depart-tree'

  export default {
    components: {
      DepartUserTree
    },
    data() {
      const dateNow = this.formatDate(new Date(), 'yyyy-MM-dd')
      return {
        dialogVisible: false,
        activeName: 'rank',
        departTreeLoading: false,
        departTree: [],
        tableData: [],
        tableData1: [],
        departTreeProp: {
          children: 'children',
          label: 'name',
          value: 'id'
        },
        page: {// 检索条件参数
          pageNum: 1,
          pageSize: 20,
          sortName: '',
          sortOrder: '',
          total: 0
        },
        currentTime: new Date().getTime(),
        map: null,
        totalDistance: 0,
        queryParam: {
          visitorName: '',
          date: dateNow,
          userId: '',
          orderBy: 'startTime'
        }

      };
    },
    created() {
      
    },
    mounted() {
      this.loadDepartTree();
      this.loadTableData();
      document.getElementById('container').style.height = window.outerHeight - 260 + 'px';
      window.onresize = function () {
        document.getElementById('container').style.height = window.outerHeight - 260 + 'px';
      }
    },
    methods: {
      loadDepartTree() {
        this.departTreeLoading = true;
        this.$http.get('/sys/department/tree', null, r => {
          this.departTree = r.data;
          this.departTreeLoading = false;
          this.loadData()
        });
      },
      loadTableData() {
        this.$http.get('/crm/visit/execute/track/summary', this.page, r => {
          this.tableData = r.data.list;
          this.page.total = r.data.total;
        })
      },
      // 分页
      handlePaginationChange(pageNum) {
        this.page.pageNum = pageNum;
        this.loadTableData();
      },
      // 分页改变事件
      handleSizeChange(val) {
        this.page.pageSize = val;
        this.loadTableData();
      },
      handleDepartClick(data) {
        if (data.id) {
          this.page.departmentId = data.id;
          this.loadTableData();
        }
      },
      handleUserClick(data) {
        this.queryParam.visitorName = data.name;
        if (data.userid) {
          this.queryParam.userId = data.userid;
          this.loadData();
        }
      },
      loadData() {
        this.$http.get('/crm/visit/execute/track', this.queryParam, r => {
          this.dataList = r.data;
          this.loadPoint();
        });
      },
      
      details() {
        if (this.queryParam.userId && this.queryParam.date) {
            this.$http.get('/crm/visit/execute/list', this.queryParam, r => {
            this.tableData1 = r.data;
            // this.visitorName = r.data[0].visitorName
            this.dialogVisible = true
          })
        } else {
          this.$confirm('请选择要查看的拜访人和拜访时间？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
        }
      },
      loadPoint() {
        this.map = new AMap.Map('container', {resizeEnable: true, zoom: 4});
        const len = this.dataList.length;
        const lineArr = [];
        this.totalDistance = 0;

        for (let i = 0; i < len; i += 1) {
          let marker;
          const data = this.dataList[i];
          const location = data.location;
          if (location === '' || location === null || location === undefined) {
            continue;
          }
          const position = JSON.parse(location);

          if (i === 0) {
            marker = new AMap.Marker({
              content: "<div class = 'start-point'>开始</div>",
              position: position,
              offset: new AMap.Pixel(0, 0),
              zIndex: 102,
              title: data.customerName,
              map: this.map
            });
          } else if (i === len - 1) {
            marker = new AMap.Marker({
              content: "<div class = 'end-point'>结束</div>",
              position: position,
              offset: new AMap.Pixel(0, 0),
              zIndex: 102,
              title: data.customerName,
              map: this.map
            });
          }

          marker = new AMap.Marker({
            position: position,
            offset: new AMap.Pixel(-12, -24),
            zIndex: 101,
            title: data.customerName,
            map: this.map
          });

          lineArr.push(position);
        }

        const polyline = new AMap.Polyline({
          path: lineArr,          // 设置线覆盖物路径
          strokeColor: "#38ADFF", // 线颜色
          strokeOpacity: 1,       // 线透明度
          strokeWeight: 2,        // 线宽
          strokeStyle: "solid",   // 线样式
          strokeDasharray: [10, 5] // 补充线样式
        });

        this.totalDistance = (AMap.GeometryUtil.distanceOfLine(lineArr) / 1000).toFixed(1);

        polyline.setMap(this.map);
        this.map.setFitView();
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
                time = day + "天" + hour + "小时" + min + "分" + second + "秒";
              }
            }
          }
          return time;
        } else {
          return '--'
        }
      }
    },
  watch: {}

  }
</script>

<style lang="scss">
</style>
