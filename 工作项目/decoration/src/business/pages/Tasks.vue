<!--
 * @Author: YC
 * @Date: 2020-12-22 10:21:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-07 17:41:42
 * @Description: 页面发布定时任务列表
-->

<template>
  <div class="page-tasks">
    <lz-tabs v-model="type"
             class="page-tab"
             @tab-click="getTasks">
      <lz-tab-pane label="会员中心"
                   name="0">
        <lz-table border
                  :data="userCenterTasks"
                  empty-text='您还没有待发布的页面'>
          <lz-table-column prop="instanceId"
                           label="任务ID" />
          <lz-table-column prop="instanceName"
                           label="页面名称" />
          <lz-table-column prop="publishTime"
                           width="150"
                           label="定时发布时间" />
          <lz-table-column label="操作"
                           width="180">
            <template slot-scope="scope">
              <lz-button class="table-button"
                         size="small"
                         type="text"
                         style="margin-right: 10px;"
                         @click="cancel(scope.row)">取消
              </lz-button>
              <!-- <lz-button class="table-button" size="small" type="text">预览</lz-button> -->
              <lz-popover placement="bottom"
                          trigger="click">
                <img :src="`${CONST.IMAGE_PREFIX}${scope.row.timingQrcodeUrl}`">
                <lz-button class="table-button"
                           size="small"
                           type="text"
                           slot="reference">预览</lz-button>
              </lz-popover>
            </template>
          </lz-table-column>
        </lz-table>
      </lz-tab-pane>
      <lz-tab-pane v-if="platform === 'tmall'"
                   label="自定义页面"
                   name="1">
        <lz-table border
                  :data="customTasks"
                  empty-text='您还没有待发布的页面'>
          <lz-table-column prop="instanceId"
                           label="任务ID" />
          <lz-table-column prop="instanceName"
                           label="页面名称" />
          <lz-table-column prop="publishTime"
                           width="150"
                           label="定时发布时间" />
          <lz-table-column label="操作"
                           width="180">
            <template slot-scope="scope">
              <lz-button class="table-button"
                         size="small"
                         type="text"
                         style="margin-right: 10px;"
                         @click="cancel(scope.row)">取消
              </lz-button>
              <lz-popover placement="bottom"
                          trigger="click">
                <img :src="`${CONST.IMAGE_PREFIX}${scope.row.timingQrcodeUrl}`">
                <lz-button class="table-button"
                           size="small"
                           type="text"
                           slot="reference">预览</lz-button>
              </lz-popover>
            </template>
          </lz-table-column>
        </lz-table>
      </lz-tab-pane>
      <lz-tab-pane label="积分商城"
                   v-if='!manlunList.includes(shopId) && shopId != "703279" && !handlerIsOLY()'
                   name="2">
        <lz-table border
                  :data="pointMallTasks"
                  empty-text='您还没有待发布的页面'>
          <lz-table-column prop="instanceId"
                           label="任务ID" />
          <lz-table-column prop="instanceName"
                           label="页面名称" />
          <lz-table-column prop="publishTime"
                           width="150"
                           label="定时发布时间" />
          <lz-table-column label="操作"
                           width="180">
            <template slot-scope="scope">
              <lz-button class="table-button"
                         size="small"
                         type="text"
                         style="margin-right: 10px;"
                         @click="cancel(scope.row)">取消
              </lz-button>
              <!-- <lz-button class="table-button" size="small" type="text">预览</lz-button> -->
              <lz-popover placement="bottom"
                          trigger="click">
                <img :src="`${CONST.IMAGE_PREFIX}${scope.row.timingQrcodeUrl}`">
                <lz-button class="table-button"
                           size="small"
                           type="text"
                           slot="reference">预览</lz-button>
              </lz-popover>
            </template>
          </lz-table-column>
        </lz-table>
      </lz-tab-pane>
    </lz-tabs>
  </div>
</template>

<script>
import Service from '@business/service';
import CONST from '@/utils/constant';
import { LzMsg, LzConfirm } from '@/utils/UI';
import Utils from '@/utils';
import isOLY from '@/utils/oly';

export default {
  name: 'Tasks',
  data() {
    return {

      CONST,
      type: 0,
      manlunList: [1000002791, 197341, 1000001462, 74655, 124989, 631248, 996883, 1000102783, 649920],
      shopId: Number(Utils.getShopId()),

      platform: process.env.VUE_APP_PLATEFORM,
      userCenterTasks: [],
      customTasks: [],
      pointMallTasks: [],
      page: {
        pageNo: 1,
        pageSize: 999,
        total: 0,
      },
    };
  },
  created() {
    this.getTasks();
  },
  mounted() {

  },
  methods: {
    /**
     * 获取定时任务
     */
    async getTasks() {
      Service.getTasks({
        pType: this.type,
        ...this.page,
      }).then(({ data, page }) => {
        this.page = page;
        if (this.type === '0') {
          // 会员中心页面
          this.userCenterTasks = data;
        } else if (this.type === '1') {
          // 自定义页面
          this.customTasks = data;
        } else if (this.type === '2') {
          // 自定义页面
          this.pointMallTasks = data;
        }
      });
    },

    handlerIsOLY() {
      return isOLY();
    },

    /**
     * 取消定时任务
     */
    async cancel(task) {
      LzConfirm('定时任务不可恢复，是否确认取消？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        cancelButtonClass: 'btn-custom-cancel',
        type: 'warning',
      }).then(async () => {
        try {
          await Service.cancelPublishTask({
            instanceId: task.instanceId,
          });
          await this.getTasks();
          LzMsg.success('任务已取消');
        } catch (e) {
          LzMsg.error(e.message);
        }
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.page-tasks {
  margin: 20px;
}

.table-button {
  &:focus {
    color: #2199ff;
  }
}
</style>
