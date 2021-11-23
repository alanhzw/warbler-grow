<template>
  <div v-show="chartOne">
      <div class="layout-v" style="padding-left: 8%;">
        <div class="layout-h" >
          <div class="chart1" v-if="chartOne" v-loading="chartOneLoading">
              <div class="select1">
                <el-date-picker
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
              </div><br>
              <echarts :options="chartOne" class="echarts" @lengendChange="lengendChange" ref="child1"/>
          </div>
          <div v-else class="no-data"><br><br><br><br><br><br><p>暂无数据</p></div>
          <div class="chart2" v-if="chartTwo" v-loading="chartTwoLoading">
             <div class="select1">
               <el-date-picker
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
             </div><br>
             <echarts ref="child2" :options="chartTwo" class="echarts"/>
          </div>
          <div v-else class="no-data">暂无数据</div>
        </div>
         <div class="layout-h" >
          <div v-if="chartThree" v-loading="chartThreeLoading" class="chart3">
            <div class="select2">
              <el-select size="mini" @change="kindQueryThree" v-model="value3" clearable placeholder="请选择">
                <el-option
                  v-for="item in options3"
                  :key="item.value"
                  size="mini"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
             </div><br>
             <echarts  ref="child3" :options="chartThree" class="echarts"/>
          </div>
          <div v-else class="no-data"><br><br><br><br><br><br><p>暂无数据</p></div>
          <div class="chart4" v-if="chartFour" v-loading="chartFourLoading">
            <div class="select1">
               <el-date-picker
                    clearable="false"
                    v-model="dateRange4"
                    type="daterange"
                    align="right"
                    size="mini"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="dateQueryFour"
                    :picker-options="pickerOptions4"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
             </div><br>
             <echarts  ref="child4" :options="chartFour" class="echarts"/>
          </div>
          <div v-else class="no-data"><br><br><br><br><br><br><p>暂无数据</p></div>
        </div>
      </div>
  </div>
</template>

<script>
import Echarts from '../lib/echarts'
  export default {
    name: "dashboard",
    components: {Echarts},
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
        chartOne: null,
        chartTwo: null,
        chartThree: null,
        chartFour: null,
        chartOneLoading: true,
        chartTwoLoading: true,
        chartThreeLoading: true,
        chartFourLoading: true,
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        options3: [],
        dateRange1: [startDay, endDay],
        dateRange2: [startDay, endDay],
        dateRange4: [startDay, endDay],
        pickerOptions1: dateRangeLimit,
        pickerOptions2: dateRangeLimit,
        pickerOptions4: dateRangeLimit
      }
    },
    created() {
      const now = new Date
      const startDay = this.formatDate(now - 30 * 86400000, 'yyyy-MM-dd')
      const endDay = this.formatDate(now, 'yyyy-MM-dd')
      this.loadDataOne(startDay, endDay)
      this.loadDataTwo(startDay, endDay)
      this.getDataThreeLabs()
      this.loadDataFour(startDay, endDay)
    },
    mounted() {
      const now = new Date
      const startDay = this.formatDate(now - 30 * 86400000, 'yyyy-MM-dd')
      const endDay = this.formatDate(now, 'yyyy-MM-dd')
      this.loadDataOne(startDay, endDay)
      this.loadDataTwo(startDay, endDay)
      this.getDataThreeLabs()
      this.loadDataFour(startDay, endDay)
    },
    methods: {
      // 统计客户拜访分析
      // 一
      loadDataOne(startDate, endDate, changed) {
        this.$http.get('/report/visit/sales/columnar', {startDate: startDate, endDate: endDate}, r => {
          const salesY = []
          const visitY = []
          const salesX = []
          const visitX = []
          const salesAvatar = []
          const visitAvatar = []
          this.chartOneLoading = false
           // 拜访数
          r.data.visitTop.map((item, index) => {
            visitX.push(item.userName)
            visitY.push(item.totalCount)
            const picUrl = item.avatar ? item.avatar : './src/assets/img/default-avatar.png'
            visitAvatar.push(picUrl)
          })
          // 销售额
          // r.data.salesTop.map((item, index) => {
          //   salesX.push(item.userName)
          //   salesY.push(item.totalCount)
          //   const picUrl = item.avatar ? item.avatar : './src/assets/img/default-avatar.png'
          //   salesAvatar.push(picUrl)
          // })

          const visit = {
            name: '拜访数',
            data: visitY,
            avatar: visitAvatar,
            xData: visitX
          }

          const sales =  {
            name: '销售额',
            data: salesY,
            avatar: salesAvatar,
            xData: salesX
          }

          this.chartOneRes = [visit, sales]
          const dateChanged = changed ? true : false
          this.setChartsOne([visit, sales], 0, dateChanged);
        })
      },
      lengendChange(val) {
        const index = val.name === '销售额' ? 1 : 0
        this.setChartsOne(this.chartOneRes, index, true);
      },
      dateQueryOne(val) {
        // this.$refs.child1.chart.showLoading()
        this.loadDataOne(val[0], val[1], true)
      },
      // 客户拜访分析
      // 二
      loadDataTwo(startDate, endDate, changed) {
        this.$http.get('/report/customer/visit/analys', {startDate: startDate, endDate: endDate}, r => {
          const data = r.data;
          const totalCount = [];
          r.data.map((item, index) => {
            totalCount.push(
              {name: '已拜访', value: item.visitCount},
              {name: '未拜访', value: item.totalCount - item.visitCount},
            )
          })
          this.chartTwoLoading = false
          const dateChanged = changed ? true : false
          this.setChartsTwo(totalCount, dateChanged);
        })
      },
      dateQueryTwo(val) {
        // this.$refs.child2.chart.showLoading()
        this.loadDataTwo(val[0], val[1], true)
      },
      // 三
      getDataThreeLabs(startDate, endDate) {
        this.$http.get('/report/customers/search/labs', {}, r => {
          this.options3 = []
          this.value3 = r.data[0].id
           r.data.map((item, index) => {
             this.options3.push({label: item.labelName, value: item.id})
           })
           this.loadDataThree('')
        })
      },
      loadDataThree(tagId, changed) {
        this.$http.get('/report/customers/analys/labs', {startDate: '', endDate: '', tagSortID: tagId}, r => {
          const data = r.data;
          this.chartThreeLoading = false
          const chartData = []
          const colors = []
          if (data && data.length > 0) {
            data.map(item => {
              chartData.push({value: item.labelNumber ? item.labelNumber : 0, name: item.labelName})
              colors.push(item.colorStr)
            })
          } else {
            chartData.push({value: 0, name: '未  知'})
            colors.push('#cdcdcd')
          }
          const tagChange = tagId ? true : false
          this.setChartsThree(chartData, colors, tagChange)
        })
      },
      kindQueryThree(val) {
        // this.$refs.child3.chart.showLoading()
        this.loadDataThree(val)
      },
      // 四
      loadDataFour(startDate, endDate, changed) {
        this.$http.get('/report/customer/increase', {startDate: startDate, endDate: endDate}, r => {
            const data = r.data;
            this.chartFourLoading = false
            const departmentList = data.dateList;
            const totalCount = data.countList;
            const dateChanged = changed ? true : false
            this.setChartsFour(departmentList, totalCount, dateChanged);
          }
        )
      },
      dateQueryFour(val) {
        // this.$refs.child4.chart.showLoading()
        this.loadDataFour(val[0], val[1], true)
      },
      // 设置样式
      setChartsOne(data, index, toggle) {
        console.log('data', data[0])
        this.$nextTick(function () {
          const weatherIcons = data[index].avatar
          const weatherData =  data[index].data.map(
          (item, index) => {
            return [item, 0, weatherIcons[index]]
          })
          const dims = {
              weatherIcon: 2
          };
          this.chartOne = {
            title: {
              text: '员工画像',
              top: 0
            },
            // color: ['#6799d8', '#ef856b'],
            color: '#ef856b',
            grid: {
              top: 80,
              left: '10%'
            },
            legend: {
              data: [data[0].name, data[1].name],
              selectedMode: 'single',
              top: 33,
              left: '6%'
            },
            tooltip: {
              show: true,
              trigger: 'item'
            },
            xAxis: {
              type: 'category',
              data: data[index].xData
            },
            yAxis: {
                // type: 'value'
            },
            series: [{
              type: 'custom',
              data: weatherData,
              renderItem: function(param, api) {
                const point = api.coord([param.dataIndex, 0])[0] - param.coordSys.x / 4;
                return {
                  type: 'group',
                  children: [{
                    type: 'image',
                    style: {
                        image: api.value(dims.weatherIcon),
                        width: param.coordSys.x / 2,
                        height: param.coordSys.x / 2
                    },
                    position: [point, api.getHeight() - param.coordSys.x / 2]
                  }]

                }
              }
            },
            {
                name: data[0].name,
                type: 'bar',
                data: data[0].data
            }
            // , {
            //     name: data[1].name,
            //     type: 'bar',
            //     data: data[1].data
            // }
            ]
          }
          if (toggle) { this.$refs.child1.chart.setOption(this.chartOne) }
          if (toggle) { this.$refs.child1.chart.hideLoading() }
        })
      },
      setChartsTwo(totalCount, toggle) {
        this.$nextTick(function () {
          this.chartTwo = {
            title: {
              text: '客户拜访分析',
              top: 0
            },
            color: ['#6799d8', '#ef856b'],
            grid: {
              top: 200,
              left: '10%'
            },
            tooltip: {
              show: true,
              trigger: 'item',
              formatter: '{b}: {d}% <br> 客户数：{c}'
            },
            series: [{
              name: '拜访次数',
              type: 'pie',
              radius: ['35%', '55%'],
              center: ['40%', '55%'],
              avoidLabelOverlap: false,
              data: totalCount
            }]
          }
          if (toggle) { this.$refs.child2.chart.setOption(this.chartTwo) }
          if (toggle) { this.$refs.child2.chart.hideLoading() }
        })
      },
      setChartsThree(chartData, colors, toggle) {
        this.$nextTick(function () {
          this.chartThree = {
            title: {
              text: '客户类型分析',
              top: 0
            },
            grid: {
              top: 180,
              left: '10%'
            },
            stillShowZeroSum: false,
            legend: {
                orient: 'vertical',
                x: 'right',
                top: 80,
                left: '62.3%'
            },
            color: colors,
            tooltip: {
              show: true,
              trigger: 'item',
              formatter: '{b}: {d}% <br> 客户数：{c}'
            },
            series: [{
              name: '拜访次数',
              type: 'pie',
              radius: ['0', '55%'],
              center: ['40%', '60%'],
              data: chartData,
              label: {
                normal: {
                  show: true,
                  position: 'bottom'
                }
              }
            }]
          }
          if (toggle) { this.$refs.child3.chart.setOption(this.chartThree) }
          if (toggle) { this.$refs.child3.chart.hideLoading() }
        })
      },
      setChartsFour(departmentList, totalCount, toggle) {
        this.$nextTick(function () {
          this.chartFour = {
            title: {
              text: '新增客户数',
              top: 0
            },
            color: ['#6799d8', '#ef856b'],
            grid: {
              top: 80,
              left: '5%'
            },
            legend: {
              data: ['客户数'],
               top: 33,
               left: '2%'
            },
            tooltip: {
              show: true,
              trigger: 'axis'
            },
            yAxis: [
              {
                type: 'value'
              }
            ],
            xAxis: {
              data: departmentList
            },
            series: [{
              name: '客户数',
              type: 'line',
              data: totalCount,
              smooth: true
            }]
          }
          if (toggle) { this.$refs.child4.chart.setOption(this.chartFour) }
          if (toggle) { this.$refs.child4.chart.hideLoading() }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .layout-v {
    width: 80vw;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .el-range-editor--mini.el-input__inner {
    width: 230px;
  }

  .layout-h {
    flex: 1;
    display: flex;

    &:first-child {
      border-bottom: solid 1px #EBEEF5;
    }

    .echarts {
      height: 40vh;
      width: 40vw;
    }

    .no-data {
      padding: 15px 0;
      text-align: center;
      font-size: 14px;
      color: #ccc;
    }

    & > div {
      background: white;
      width: 40vw;
      padding: 15px 0;

      &:first-child {
        border-right: solid 1px #EBEEF5;
      }
    }
  }
  .chart1{
    position: relative;
  }
  .chart2{
    position: relative;
  }
  .chart3{
    position: relative;
  }
  .chart4{
    position: relative;
  }
  .select1{
    position: absolute;
    right: 12%;
    top: 70px;
    z-index: 999;
  }
  .select2{
    position: absolute;
    right: 12%;
    top: 80px;
    z-index: 999;
  }
  .select3{
    position: absolute;
    left: 61%;
    top: 3%;
  }
  .select4{
    position: absolute;
    left: 61%;
    top: 3%;
  }
</style>
