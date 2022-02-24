<template>
  <div class="page-pages">
    <lz-tabs v-model="type"
             @tab-click="getInitList(type)">
      <lz-tab-pane label="当前活动"
                   name="0">
        <div class="page-list">
          <div class="select-rules">
            <div class="select-rules-first">
              <div class="rule-item">
                <span class="rule-item-title">活动名称: &nbsp;</span>
                <lz-input v-model="activityName"
                          placeholder="活动名称"></lz-input>
              </div>
              <div class="rule-item">
                <span class="rule-item-title">活动类型: &nbsp;</span>
                <lz-select v-model="activityType"
                          placeholder="请选择">
                  <lz-option v-for="item in optionsType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"></lz-option>
                </lz-select>
              </div>
              <div class="rule-item create-time-picker">
                <span class="rule-item-title">创建时间: &nbsp;</span>
                <lz-date-picker popper-class='time-picker111'
                                format="yyyy-MM-dd HH:mm:ss"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                v-model="activityTime"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"></lz-date-picker>
              </div>
            </div>
            <div class="select-rules-second">
              <div class="rule-item">
                <span class="rule-item-title">活动状态: &nbsp;</span>
                <lz-select v-model="activityStatus"
                          placeholder="请选择">
                  <lz-option v-for="item in optionsStatus"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"></lz-option>
                </lz-select>
              </div>
              <div class="rule-item">
                <lz-button class="btn-new"
                          type="primary"
                          @click="buttonGetActivityPageList(0)">查询
                </lz-button>
                <lz-button class="btn-new"
                          @click="resetSelectRules(0)">重置</lz-button>
              </div>
            </div>
            <!-- <div class="select-rules-third">
              <lz-button
                class="btn-new"
                plain

                @click="handleSelectionChange()"
                >批量终止</lz-button
              >
            </div> -->
          </div>
          <lz-table border
                    style="width: 100%"
                    :data="activityList">
            <lz-table-column prop="activityName"
                            align="left"
                            label="活动名称" />
            <lz-table-column align="left"
                            label="活动类型">
              <template slot-scope="scope">
                {{ scope.row.activityType|activityType }}
              </template>
            </lz-table-column>
            <lz-table-column prop="createTime"
                            align="left"
                            width="180"
                            label="创建时间" />
            <lz-table-column align="left"
                            width="300"
                            label="活动有效期">
              <template slot-scope="scope">
                {{ scope.row.startTime }} 至 {{ scope.row.endTime }} <br />
                {{ timeDifference(scope.row.startTime, scope.row.endTime) }}
              </template>
            </lz-table-column>
            <lz-table-column align="left"
                            width="100"
                            label="活动状态">
              <template slot-scope="scope">
                <span v-if="scope.row.activityStatus === 0"
                      class="text-gray">未开始</span>
                <span v-if="scope.row.activityStatus === 1">进行中</span>
                <span v-if="scope.row.activityStatus === 2"
                      class="text-red">已结束</span>
              </template>
            </lz-table-column>
            <lz-table-column label="操作"
                            width="200"
                            align="left">
              <template slot-scope="scope">
                <lz-operate-group-layout :max="4" size="small">
                  <addr-box :page="scope.row"
                            title="活动链接" />
                  <lz-button @click="editActivity(scope.row)"
                            type="primary"
                            text>编辑</lz-button>
                  <!-- <lz-button v-if="scope.row.activityStatus === 2"  @click="removeTip(scope.row)" :disabled="scope.row.isReleased === 1" text removeP>删除</lz-button>
                <lz-button v-if="scope.row.activityStatus !== 2"  @click="removeTip(scope.row)" :disabled="scope.row.isReleased === 1" text removeP>终止</lz-button> -->
                  <!-- <lz-button  @click="toData(scope.row)" text>详情</lz-button> -->
                  <lz-button class="marginRight-10"
                            type="primary"
                            @click="toData(scope.row)"
                            text>数据</lz-button>
                  <lz-button type="primary"
                            @click='stopActivity(scope.row)'
                            text>终止活动</lz-button>
                  <lz-button class="marginRight-10"
                            type="primary"
                            @click="toVisitData(scope.row)"
                            text>访问数据
                  </lz-button>
                </lz-operate-group-layout>
              </template>
            </lz-table-column>
          </lz-table>
          <div class="pagination">
            <lz-pagination @size-change="handleSizeChange"
                          @current-change="handleCurrentChange"
                          :current-page="page.pageNo"
                          :page-sizes="[10, 20, 30, 40]"
                          :page-size="10"
                          background
                          layout="total, sizes, prev, pager, next, jumper"
                          :total="page.total"></lz-pagination>
          </div>
        </div>
      </lz-tab-pane>
      <!-- 历史活动 -->
      <lz-tab-pane label="历史活动"
                   name="1">
        <div class="page-list">
          <div class="select-rules">
            <div class="select-rules-first">
              <div class="rule-item">
                <span class="rule-item-title">活动名称: &nbsp;</span>
                <lz-input v-model="activityName"
                          placeholder="活动名称"></lz-input>
              </div>
              <div class="rule-item">
                <span class="rule-item-title">活动类型: &nbsp;</span>
                <lz-select v-model="activityType"
                          placeholder="请选择">
                  <lz-option v-for="item in optionsType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"></lz-option>
                </lz-select>
              </div>
              <div class="rule-item">
                <span class="rule-item-title">创建时间: &nbsp;</span>
                <lz-date-picker format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                v-model="activityTime"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"></lz-date-picker>
              </div>
            </div>
            <div class="select-rules-second">
              <div class="rule-item">
                <span class="rule-item-title">&nbsp;</span>
              </div>
              <div class="rule-item">
                <lz-button class="btn-new"
                          type="primary"
                          @click="buttonGetActivityPageList(1)">查询
                </lz-button>
                <lz-button class="btn-new"
                          @click="resetSelectRules(1)">重置</lz-button>
              </div>
            </div>
            <!-- <div class="select-rules-third">
              <lz-button
                class="btn-new"
                plain

                @click="handleSelectionChange()"
                >批量终止</lz-button
              >
            </div> -->
          </div>
          <lz-table border
                    style="width: 100%"
                    :data="activityList">
            <!-- <lz-table-column type="selection" width="55"> </lz-table-column> -->
            <lz-table-column prop="activityName"
                            align="left"
                            label="活动名称" />
            <lz-table-column align="left"
                            label="活动类型">
              <template slot-scope="scope">
                {{ scope.row.activityType|activityType }}
              </template>
            </lz-table-column>
            <lz-table-column prop="createTime"
                            width="180"
                            align="left"
                            label="创建时间" />
            <lz-table-column align="left"
                            width="280"
                            label="活动有效期">
              <template slot-scope="scope">
                {{ scope.row.startTime }} 至 {{ scope.row.endTime }} <br />
                {{ timeDifference(scope.row.startTime, scope.row.endTime) }}
              </template>
            </lz-table-column>
            <lz-table-column align="left"
                            width="100"
                            label="活动状态">
              <template slot-scope="scope">
                <span v-if="scope.row.activityStatus === 0"
                      class="text-yellow">未开始</span>
                <span v-if="scope.row.activityStatus === 1"
                      class="text-green">进行中</span>
                <span v-if="scope.row.activityStatus === 2"
                      class="text-red">已结束</span>
              </template>
            </lz-table-column>
            <lz-table-column label="操作"
                            width="120"
                            align="left">
              <template slot-scope="scope">
                <!-- <addr-box :page="scope.row" title="活动链接" /> -->
                <!-- <lz-button  @click="editActivity(scope.row)" text>查看</lz-button> -->
                <lz-button @click="deleteActivity(scope.row)"
                          type="primary" size="small"
                          text>删除</lz-button>
                <!-- <lz-button v-if="scope.row.activityStatus === 2"  @click="removeTip(scope.row)" :disabled="scope.row.isReleased === 1" text removeP>删除</lz-button>
                <lz-button v-if="scope.row.activityStatus !== 2"  @click="removeTip(scope.row)" :disabled="scope.row.isReleased === 1" text removeP>终止</lz-button>
                <lz-button  @click="toData(scope.row)" text>详情</lz-button> -->
                <lz-button type="primary" size="small"
                          @click="toData(scope.row)"
                          text>数据</lz-button>
              </template>
            </lz-table-column>
          </lz-table>
          <div class="pagination">
            <lz-pagination @size-change="handleSizeChange"
                          @current-change="handleCurrentChange"
                          :current-page="page.pageNo"
                          :page-sizes="[10, 20, 30, 40]"
                          background
                          :page-size="10"
                          layout="total, sizes, prev, pager, next, jumper"
                          :total="page.total"></lz-pagination>
          </div>
        </div>
      </lz-tab-pane>
    </lz-tabs>

    <!-- <lz-dialog title="提示" :visible.sync="deleteVisibleShowed" width="30%" :before-close="handleClose">
      <span>是否确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <lz-button type="primary"  @click="remove()">确 定</lz-button>
        <lz-button type="info"  @click="handleClose()">取 消</lz-button>
      </span>
    </lz-dialog> -->
  </div>
</template>

<script>
import Service from '@/business/service';
// import NameEditBox from '@/business/components/common/NameEditBox';
import AddrBox from '@/business/components/common/AddrBox';
import LzMsg from '@/business/utils/LzMsg';
import LzLoading from '@/business/utils/LzLoading';
import { appHistory } from '@ice/stark-app';
import { ActivityTypeEnum, ActivityOptions } from '@/utils/ActivityType';

export default {
  name: 'Home',
  components: {
    // NameEditBox,
    AddrBox,
  },
  data() {
    return {
      type: '0',
      isNow: '0', // 0当前活动 1历史活动
      multipleSelection: [], // 多选结果
      activityList: [], // 活动列表
      createActivityList: [
        // {
        //   img: require('@/assets/activities-01.png'),
        //   title: '消费满额有礼(自营店专用)',
        //   info: '品牌会员专属，消费满足规定金额可领奖，提升客单价利器',
        //   path: '/activity/501/new',
        // },
      ], // 创建活动的列表
      activityName: '', // 活动名称
      activityType: '-9', // 活动类型
      activityTime: '', // 活动创建时间
      activityStatus: '-9', // 活动状态 -9 全部，0未开始，1进行中，2已结束
      optionsType: [{ value: '-9', label: '全部类型' }, ...ActivityOptions],
      optionsStatus: [
        // 活动状态下拉菜单
        {
          value: '-9',
          label: '全部',
        },
        {
          value: '0',
          label: '未开始',
        },
        {
          value: '1',
          label: '进行中',
        },
      ],
      page: {
        // 分页信息
        pageNo: 1, // 当前页
        pageSize: 10, // 每页条数
        total: 0, // 总条数
      },
    };
  },
  created() {
    this.getInitList(0);
  },
  methods: {
    // 时间格式化  计算两个时间的差值  并转换成XX日XX时XX分XX秒格式  返回活动信息
    timeDifference(startTime, endTime) {
      //  声明变量 把当前时间 开始时间  结束时间转为时间戳
      // 当前时间
      const nowTime = new Date().getTime() / 1000;
      // 开始时间
      startTime = new Date(startTime) / 1000;
      // 结束时间
      endTime = new Date(endTime) / 1000;
      // 计算当前时间与开始时间的差值 转成时间戳 取绝对值
      const difference = Math.abs(nowTime - startTime);
      // 计算活动持续时间 转成时间戳 取绝对值
      const activityTime = Math.abs(endTime - startTime);
      // 声明变量 存储时间信息
      // 天数
      const day = Math.floor(difference / 86400);
      // 小时数
      const hour = Math.floor((difference % 86400) / 3600);
      // 分钟数
      const minute = Math.floor(((difference % 86400) % 3600) / 60);
      // 秒数
      // let second  = Math.floor(difference%86400%3600%60);
      // 如果是手动终止的活动
      if (startTime > endTime) {
        return '活动持续了' + '0' + '天' + '0' + '小时' + '0' + '分钟';
      }
      // 如果活动已经结束
      if (nowTime > endTime) {
        const activityDay = Math.floor(activityTime / 86400);
        const activityHour = Math.floor((activityTime % 86400) / 3600);
        const activityMinute = Math.floor(((activityTime % 86400) % 3600) / 60);
        return `活动持续了${activityDay}天${activityHour}小时${activityMinute}分钟`;
      }
      // 活动已开始并未结束
      if (nowTime > startTime && nowTime < endTime) {
        return `已开始${day}天${hour}小时${minute}分钟`;
      }
      // 活动还未开始
      if (nowTime < startTime) {
        return `${day}天${hour}小时${minute}分钟后开始`;
      }
    },
    /**
     * @description: 分页改变每页条数
     */
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getActivityPageList(this.isNow);
    },

    /**
     * @description: 分页改变当前页
     */
    handleCurrentChange(val) {
      this.page.pageNo = val;
      this.getActivityPageList(this.isNow);
    },
    /**
     * @description: 重置查询条件
     */
    resetSelectRules(type) {
      this.activityName = '';
      this.activityType = '-1';
      this.activityTime = '';
      this.activityStatus = '-9';
      this.getInitList(type);
    },
    /**
     * @description: 多选框改变事件
     */
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    /**
     * @description: 点击事件  跳转数据中心
     */
    toData(row) {
      if (row.activityType === 501) {
        window.location.href = `/common/data/13/null/${row.activityId}/${row.id}/null?start=${row.createTime}&end=${row.endTime}`;
      } else if (row.activityType === 502) {
        window.location.href = `/common/data/14/null/${row.activityId}/${row.id}/null?start=${row.createTime}&end=${row.endTime}`;
      } else {
        window.location.href = `/common/data/${row.activityType}/null/${row.activityId}/${row.id}/null?start=${row.createTime}&end=${row.endTime}`;
      }
    },
    /**
     * @description: 初始化查询
     */
    getInitList(type) {
      this.activityType = '-9';
      this.activityStatus = '-9';
      this.isNow = type;
      this.page.pageNo = 1;
      this.getActivityPageList(type);
    },
    // 跳转访问数据
    toVisitData(row) {
      console.log('🚀🚀~ rpw:', row);
      appHistory.push(`/common/dataCJHY/${row.activityId}/${row.activityName}/${row.activityType}?start=${row.createTime}&end=${row.endTime}`);
    },
    /**
     *@description: 点击去到编辑页面
     */
    editActivity(row) {
      const url = `/${row.activityType}/${row.activityId}`;
      this.$router.push(url);
    },
    // 终止活动
    stopActivity(row) {
      this.$confirm('活动终止后无法重新启动，确认终止？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          const loading = LzLoading.start();
          await Service.stopActivity({
            activityIds: [row.activityId],
          });
          await this.getActivityPageList(this.isNow);
          loading.close();
          LzMsg.success('活动已终止');
        });
    },
    // 删除活动
    deleteActivity(row) {
      this.$confirm('活动删除后无法恢复，确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          const loading = LzLoading.start();
          await Service.deleteActivity({
            activityIds: [row.activityId],
          });
          await this.getActivityPageList(this.isNow);
          loading.close();
          LzMsg.success('活动已删除');
        });
    },
    // 通过查询按钮进行查询
    buttonGetActivityPageList(isNow) {
      this.page.pageNo = 1;
      this.getActivityPageList(isNow);
    },
    /**
     * 获取活动列表地址
     */
    async getActivityPageList(isNow) {
      if (this.activityTime === null) {
        this.activityTime = '';
      }
      try {
        const {
          data,
          page,
        } = await Service.getActivityPageList({
          isNow,
          ...this.page,
          activityName: this.activityName,
          activityType: this.activityType,
          startTime: this.activityTime[0],
          endTime: this.activityTime[1],
          activityStatus: this.activityStatus,
          //   isNow: 0,
          //   pageNo:1,
          //   pageSize:10,
          //   activityName: "123",
          //   activityType:501,
          //   startTime: "2020-11-18 00:00:00",
          //   endTime: "2020-10-30 00:00:00",
          //   activityStatus: 1,
        });
        this.activityList = data.map(a => ({
          ...a,
          releaseUrl: a.activityUrl,
        }));
        this.page = page;
      } catch (e) {
        LzMsg.error(e.message);
      }
    },
  },
  filters: {
    activityType(val) {
      return ActivityTypeEnum[val];
    },
  },
};
</script>

<style lang="scss">
@import '~lz-crm/style/variables';


.page-pages {
  // background-color: white;
  // padding: 20px;
  // border-radius: 5px;
  .page-list {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 15px 2px rgba(169, 182, 199, 0.2);
  }


  .marginRight-10 {
    margin-right: 10px;
  }

  .position-relative {
    position: relative;
  }

  .position-absolute {
    position: absolute;
  }

  .create-activity-box {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    // align-items: flex-start;
    flex-wrap: wrap;
    padding: 10px 20px;
    margin-bottom: 10px;
    background-color: #fff;
    position: relative;

    .create-activity-content {
      box-sizing: border-box;
      position: relative;
      width: 33%;
      height: 120px;
      padding: 30px;
      background-color: #f5f7f9;
      margin: 10px 0;
    }


    .text-all {
      position: absolute;
      width: 40%;
      top: 30px;
      left: 110px;
    }

    .btn {
      position: absolute;
      top: 45px;
      right: 10%;
    }

    .title {
      font-size: 14px;
      top: 5px;
      left: 80px;
    }

    .info {
      font-size: 12px;
      color: #9ca7b6;
      top: 25px;
      left: 80px;
    }
  }

  .pagination {
    margin: 20px 0 0 0;
    // float: right;
    text-align: right;
  }

  .text-yellow {
    color: #ff9900;
  }

  .text-red {
    color: #ff3333;
  }

  .text-green {
    color: #00bb66;
  }
  .text-gray{
    color: #C3CBD6;
  }

  th {
    background-color: $BG_BLOCK_GRAY;
  }

  th,
  td {
    padding: 8px 0;
    font-size: 12px;
  }

  .select-rules {
    .rule-item {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      .rule-item-title {
        display: block;
        min-width: 60px;
        font-size: 12px;
      }
    }

    .select-rules-second,
    .select-rules-third {
      display: flex;
      justify-content: space-between;
      margin: 0 0 20px 0;
    }

    .select-rules-first {
      margin: 0 0 20px 0;
      display: flex;
      justify-content: space-between;
    }
  }

  .bar {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    label {
      margin-right: 15px;
      font-size: 12px;
    }

    .offset {
      flex: 1;
    }
  }

  .cell-name {
    display: flex;
    align-items: center;
    font-size: 12px;

    .edit-box {
      margin-left: 8px;
    }

    .mark-released {
      background-color: $BG_MINOR_PINK;
      color: $FONT_HIGHT_LIGHT_RED;
      margin-right: 8px;
      padding: 2px 5px;
      border-radius: 4px;
    }
  }

  .tag {
    font-size: 12px;
  }

  .tag-disabled {
    @extend .tag;
    color: $FONT_DISABLE_GRAY;
  }

  .tag-valid {
    @extend .tag;
    color: $TAG_SUCCESS_GREEN;
  }

  .page-ctrl {
    margin-top: 20px;
    text-align: right;
  }

  .create-time-picker {

  }
}
.lz-tabs__content {
  overflow: visible;
}
</style>
