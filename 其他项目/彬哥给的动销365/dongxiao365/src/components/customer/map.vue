<template>
  <div class="page-content">
    <breadcrumb/>
    <div class="fh-container clearfix">
      <div class="fh-side-left">
        <div class="fh-side-header">
          &nbsp;筛选条件
        </div>
        <div class="padding">
          <el-form :inline="true" :model="condition" ref="ruleForm" >
            <el-form-item style="margin-left:10px;" label="客户名称：" prop="customerName">
              <el-input v-model="condition.customerName" suffix-icon="el" placeholder="" :clearable=true></el-input>
            </el-form-item>
            <el-form-item style="margin-left:10px;" label="客户经理：" prop="managerName">
              <el-input v-model="condition.managerName" suffix-icon="el" placeholder="" :clearable=true></el-input>
            </el-form-item>
            <!-- <el-form-item label="客户地址：" prop="customerAddress">
              <el-input v-model="condition.customerAddress" suffix-icon="el" placeholder="" :clearable=true></el-input>
            </el-form-item>
            <el-form-item label="客户电话：" prop="customerTel">
              <el-input v-model="condition.customerTel" suffix-icon="el" placeholder="" :clearable=true>
              </el-input>
            </el-form-item> -->
            <!--<el-form-item label="销售区域" prop="salesRegionData">-->
            <!--<el-cascader-->
            <!--:options="salesRegionData"-->
            <!--:props="defaultProps"-->
            <!--v-model="condition.saleAreaList" change-on-select>-->
            <!--</el-cascader>-->
            <!--</el-form-item>-->
            <el-form-item style="margin-left:12px;">
              <el-button type="primary" @click="handleFilter">查询</el-button>
              <el-button @click="handleClearFilter()">清空</el-button>
            </el-form-item>
          </el-form>
          <el-button style="margin-left:24px;" type="warning" icon="fa fa-filter" @click="searchBoxTagsVisible = !searchBoxTagsVisible " >按标签筛选</el-button>
          <br/>
          <br/>
          <com-tag-view v-model="condition.tagList"></com-tag-view>
        </div>
      </div>
      <div class="fh-content">
        <!--地图插槽-->
        <div id="container"></div>
        <div id="loadingTip" v-show="loading">加载数据，请稍候...</div>
      </div>
    </div>
    <!--按标签筛选弹窗-->
      <ComTag :multiple="true" :visible.sync="searchBoxTagsVisible" v-model="searchTagDeafultValue" @onOk="handleSearchTagOK"/>
  </div>
</template>
<script>
  import ComSearch from './inc/search'
  import ComTag from '../lib/tag-selector'
  import ComTagView from '../lib/tag-view'

  export default {
    components: {
      ComSearch, ComTag, ComTagView
    },
    data() {
      return {
        form: {},
        defaultProps: {
          children: 'children',
          value: 'id',
          label: 'name'
        },
        salesRegionData: [],
        loading: false,
        searchBoxVisible: true,
        searchBoxTagsVisible: false,
        searchTagDeafultValue: [],
        condition: {
          tagList: [],
          managerName: '',
          customerName: ''
        }
      }
    },
    created() {
    },
    mounted() {
      this.mapShow();
    },
    methods: {
      mapShow() {
        const that = this;
        // 创建地图
        const map = new AMap.Map('container', {
          zoom: 4
        });
        function initPage(DistrictCluster, PointSimplifier) {
          const pointSimplifierIns = new PointSimplifier({
            map: map, // 所属的地图实例
            autoSetFitView: false, // 禁止自动更新地图视野
            zIndex: 110,
            getPosition: function (item) {
              const parts = JSON.parse(item.location);
              // 返回经纬度
              return [parseFloat(parts[0]), parseFloat(parts[1])];
            },
            getHoverTitle: function (dataItem, idx) {
              return dataItem.name;
            },
            renderOptions: {
              // 点的样式
              pointStyle: {
                width: 6,
                height: 6,
                fillStyle: 'rgba(153, 0, 153, 0.38)'
              },
              // 鼠标hover时的title信息
              hoverTitleStyle: {
                position: 'top'
              }
            }
          });

          const distCluster = new DistrictCluster({
            zIndex: 100,
            map: map, // 所属的地图实例

            getPosition: function (item) {
              const parts = JSON.parse(item.location);
              // 返回经纬度
              return [parseFloat(parts[0]), parseFloat(parts[1])];
            }
          });

          window.distCluster = distCluster;

          function refresh() {

            const zoom = map.getZoom();

            // 获取 pointStyle
            const pointStyle = pointSimplifierIns.getRenderOptions().pointStyle;

            // 根据当前zoom调整点的尺寸
            pointStyle.width = pointStyle.height = 2 * Math.pow(1.2, zoom - 3);
          }

          map.on('zoomend', function () {
            refresh();
          });

          refresh();

          that.loading = true;

          const params = {
            labelIds: [],
            managerName: that.condition.managerName,
            customerName: that.condition.customerName
          }
          that.condition.tagList.map(item => {
            params.labelIds.push(item.id)
          })
          that.$http.get('/crm/customer/distribution', {params}, r => {
            const mp = [];
            that.loading = false;
            if (!r.data || r.data.length === 0) {
              that.$message({
                type: 'warning',
                message: '没有符合条件的数据'
              });
            }
            r.data.forEach(item => {
              if (item && item.location && item.location.indexOf(',') > 0) {
                const parts = item.location.split(',');
                if (parts && parts.length === 2) {
                  mp.push({
                    name: item.name,
                    location: parts
                  });
                }
              }
            });
            distCluster.setData(mp);
            pointSimplifierIns.setData(mp);
          });
        }

        // 加载相关组件
        AMapUI.load(['ui/geo/DistrictCluster', 'ui/misc/PointSimplifier'], function (DistrictCluster, PointSimplifier, $) {
          // 启动页面
          initPage(DistrictCluster, PointSimplifier);
        });
      },
      // 按标签筛选取消事件
      handleSerchTagCancel() {
        this.searchTagDeafultValue = [];
        this.condition.labelIds = null;
        this.condition.tagList = [],
        this.mapShow();
        this.searchBoxTagsVisible = false;
      },
      // 按标签筛选组件接受返回值
      handleSearchTagOK(val) {
        this.condition.tagList = []
        this.condition.tagList = val
        this.mapShow();
      },
      // 筛选
      handleFilter(val) {
        this.mapShow();
      },
      handleClearFilter() {
        this.condition = {};
        this.searchTagDeafultValue = [];
        this.mapShow();
      },
      // 加载销售区域
      loadSalesRegion() {
        this.$http.get('/crm/sale/area/tree', {}, r => {
          this.salesRegionData = r.data;
        });
      }
    }
  }
</script>
<style scoped>
  #container {
    width: 100%;
    height: 800px;
    margin: 0px;
  }

  .fh-side-left {
    padding: 0;
  }

  #loadingTip {
    position: absolute;
    z-index: 9999;
    top: 0;
    left: 0;
    padding: 3px 10px;
    background: red;
    color: #fff;
    font-size: 14px;
  }
</style>
