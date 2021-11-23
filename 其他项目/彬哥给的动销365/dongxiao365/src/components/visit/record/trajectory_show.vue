<template>
  <div>
    <div class="fh-container clearfix">
      <div class="fh-side-left">
        <div class="fh-side-header">
          选择部门
        </div>
        <div style="padding: 0 10px 10px 10px;">
          <el-input placeholder="请输入员工或部门" v-model="filterText" clearable></el-input>
        </div>
        <el-tree
          ref="tree"
          :data="departTree"
          v-loading="loading1"
          :props="{children: 'children',label: 'name',value: 'id'}"
          :highlight-current="true"
          :expand-on-click-node="false"
          node-key="userid"
          default-expand-all
          :filter-node-method="filterNode"
          @node-click="handleDepartClick"></el-tree>
      </div>
      <div class="fh-content">
        <div class="tool-box">
          <el-row>
            <el-col :span="12">
              拜访总里程：<span>{{totalDistance}}公里</span>
            </el-col>
            <el-col :span="12" class="text-right">
              拜访日期：
              <el-date-picker v-model="queryParam.date" :clearable="false" :editable="false" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" @change="loadData"></el-date-picker>
            </el-col>
          </el-row>
        </div>
        <div style="width:100%;height: 1000px;background-color: red">
          <div id="container" style="width:100%;height: 100%;"></div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "trackDetail",
    data() {
      return {
        departTree: [],
        filterText: '',
        loading1: false,
        currentTime: new Date().getTime(),
        map: null,
        totalDistance: 0,
        queryParam: {
          date: ''
        }
      }
    },
    created() {
      this.queryParam.date = this.$util.format_date(new Date());
      this.queryParam.userId = this.$route.query.visitorId;
      this.userName = this.$route.query.visitorName;
    },
    mounted() {
      this.map = new AMap.Map('container', {resizeEnable: true, zoom: 4});
      this.loadData();
      this.loadDepartTree();
    },
    methods: {
      loadDepartTree() {
        this.loading1 = true;
        this.$http.get("/sys/user/list/tree", {}, r => {
          this.departTree = r.data;
          this.loading1 = false;
          setTimeout(() => {
            this.$refs.tree.setCurrentKey('' + this.queryParam.userId);
          }, 1000);
        })
      },
      loadData() {
        this.$http.get('/crm/visit/execute/track', this.queryParam, r => {
          this.dataList = r.data;
          this.loadPoint();
        });
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
      },
      handleDepartClick(data) {
        if (data.userid) {
          this.queryParam.userId = data.userid;
          this.loadData();
        }
      },
      filterNode(value, data) {
        if (!value) { return true; }
        return data.name.indexOf(value) !== -1;
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    }
  }
</script>

<style lang="scss">
  .amap-maps .start-point {
    font-size: 10px;
    white-space: nowrap;
    background-color: black;
    border-radius: 3px;
    padding: 1px 3px;
    color: white;
  }

  .fh-content {
    height: 100%;
    background-color: 'red'
  }

  .amap-maps .end-point {
    font-size: 10px;
    white-space: nowrap;
    background-color: red;
    border-radius: 3px;
    padding: 1px 3px;
    color: white;
  }
</style>
