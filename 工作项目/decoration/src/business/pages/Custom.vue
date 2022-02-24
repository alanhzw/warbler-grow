<!--
 * @Author: YC
 * @Date: 2021-08-11 10:23:00
 * @LastEditors: YC
 * @LastEditTime: 2021-08-26 12:14:54
 * @Description:
-->
<template>
  <div class="page-memberCenter">
    <div class="bar">
      <!-- <lz-button size="small" class="table-button" type="text" @click="showData(nowLineIsReleased)">数据</lz-button> -->
      <div class="offset" />
      <!-- 现阶段最多允许创建20个页面 -->
      <lz-button class="btn-new"
                 v-if="customPages.length < 20"
                 type="primary"
                 size="small"
                 @click="openCreateDialog">创建新页面 ( {{customPages.length}} / 20 ) </lz-button>
      <lz-button class="btn-new"
                 v-else
                 type="primary"
                 disabled
                 size="small">创建新页面 ( {{userCenterPages.length}} / 20 ) </lz-button>
    </div>
    <lz-table border
              :data="customPages">
      <lz-table-column prop="instanceName"
                       label="名称">
        <template slot-scope="scope">
          <div class="cell-name">
            <span>{{scope.row.instanceName}}</span>
            <lz-rename-pop class="edit-box"
                           :defaultValue="scope.row.instanceName"
                           :maxLength="20"
                           @confirm="(name) => rename(scope.row, name)" />
          </div>
        </template>
      </lz-table-column>
      <lz-table-column prop="updateTime"
                       width="200"
                       label="更新时间" />
      <lz-table-column width="200"
                       label="访问限制">
        <template slot-scope="scope">
          <lz-switch class="switch-member-limit"
                     :value="scope.row.memberLimit === 1"
                     @change="setMemberLimit(scope.row)"></lz-switch>
          <span v-if="scope.row.memberLimit === 1">仅限会员访问</span>
          <span v-else>无访问限制</span>
        </template>
      </lz-table-column>
      <lz-table-column width="120"
                       label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.onlineIsReleased === 0"
                class="tag-disabled">未发布</span>
          <span v-if="scope.row.onlineIsReleased === 1"
                class="tag-valid">已发布</span>
        </template>
      </lz-table-column>
      <lz-table-column label="操作"
                       width="300">
        <template slot-scope="scope">
          <lz-addr-pop :page="{
          releaseUrl: scope.row.onlineReleaseUrl,
          shortUrl: scope.row.onlineShortUrl,
          qrcodeUrl: scope.row.onlineQrcodeUrl,
        }"
                       :disabled="scope.row.onlineIsReleased !== 1" />
          <!-- 有定时任务的不能够再次发布 -->
          <lz-button class="table-button"
                     size="small"
                     type="text"
                     :disabled="scope.row.hasTask === 1"
                     @click="publish(scope.row)">立即发布</lz-button>
          <lz-popover placement="bottom"
                      trigger="click">
            <img :src="`${CONST.IMAGE_PREFIX}${scope.row.qrcodeUrl}`">
            <lz-button class="table-button"
                       size="small"
                       type="text"
                       :disabled="!scope.row.pageId"
                       slot="reference">预览</lz-button>
          </lz-popover>
          <!-- 有定时任务的不能够再装修 -->
          <lz-button class="table-button"
                     size="small"
                     type="text"
                     :disabled="scope.row.hasTask === 1"
                     @click="modify(scope.row)">装修</lz-button>
          <lz-button class="table-button"
                     size="small"
                     type="text"
                     @click="openCopyDialog(scope.row)">复制</lz-button>
          <!-- 有定时任务的不能够删除 -->
          <lz-button class="table-button"
                     size="small"
                     type="text"
                     :disabled="scope.row.hasTask === 1"
                     @click="remove(scope.row)">删除</lz-button>
          <!-- <lz-button class="table-button" size="small" type="text" @click="showData(scope.row[0])">数据</lz-button> -->
        </template>
      </lz-table-column>
    </lz-table>

    <common-confirm class="create-dialog"
                    title='创建页面'
                    :dialogVisible='isShowCreateDialog'
                    @confirm='create'
                    @cancle='isShowCreateDialog=false'>
      <label>页面名称:</label>
      <br>
      <br>
      <lz-input v-model="newPageName"
                placeholder="请输入页面名称"
                maxlength="20"></lz-input>
    </common-confirm>

    <common-message class="sending-success"
                    title='操作提示'
                    :dialogVisible="showDialogSuccess"
                    :showFooter="true"
                    @confirm='showDialogSuccess=false'
                    @cancle='showDialogSuccess=false'>
      <div class="sending-title-top">恭喜,页面发布成功!</div>
      <!-- <div class="sending-title-bottom">扫码立刻访问</div> -->
    </common-message>

    <common-confirm class="copy-dialog"
                    title='复制页面'
                    :dialogVisible='isShowCopyDialog'
                    @confirm='copy'
                    @cancle='isShowCopyDialog=false'>
      <label>页面名称:</label>
      <br>
      <br>
      <lz-input v-model="copyPageName"
                placeholder="请输入页面名称"
                maxlength="20"></lz-input>
    </common-confirm>

  </div>
</template>

<script>
import Service, { CommonService } from '@business/service';
import CommonConfirm from '../components/CommonConfirm.vue';
import CommonMessage from '../components/CommonMessage.vue';
import CONST from '@/utils/constant';
import Utils from '@/utils';
import { LzMsg, LzPrompt, LzConfirm, LzLoading } from '@/utils/UI';

export default {
  components: { CommonConfirm, CommonMessage },
  name: 'Pages',
  data() {
    return {
      showDialogSuccess: false,
      isShowCreateDialog: false,
      isShowCopyDialog: false,
      newPageName: '',
      copyPageName: '',
      copyPageInfo: '',
      nowLineIsReleased: '',
      CONST,
      themes: [],
      type: '1', // '0'-会员中心页面， ‘1’-自定义页面
      userCenter: {
        url: '',
        shortUrl: '',
        qrcode: '',
      },
      userCenterPages: [],
      customPages: [],
      // 现阶段最多允许创建20个页面，所以不需要分页了
      page: {
        pageNo: 1,
        pageSize: 999,
        total: 0,
      },
    };
  },
  computed: {
    /**
     * 默认的系统主题
     */
    defaultTheme() {
      return this.themes.filter(theme => theme.isDefault === 1)[0];
    },
  },
  created() {
    this.getShopUrl();
    this.getPages();
    this.getThemes();
  },
  methods: {
    /**
     * 拷贝字符串到剪切板
     */
    copyText(text) {
      Utils.copyText(text).then(() => LzMsg.success('复制成功'));
    },
    /**
     * 获取店铺的会员中心页面相关信息
     */
    async getShopUrl() {
      const { data } = await Service.getShopUrl();
      this.userCenter = {
        url: data.shopReleaseUrl, // 会员中心完整地址
        shortUrl: data.shopShortUrl, // 会员中心完整地址
        qrcode: data.shopQrcodeUrl, // 会员中心完整地址
      };
    },
    /**
     * 获取主题列表
     */
    async getThemes() {
      const { data } = await Service.getThemes();
      this.themes = data;
    },
    /**
     * 获取页面列表
     */
    async getPages() {
      try {
        const { data } = await Service.getPages({
          isNow: this.type,
          ...this.page,
        });
        if (this.type === '0') {
          // 会员中心页面
          this.userCenterPages = data;
        } else if (this.type === '1') {
          // 自定义页面
          this.customPages = data;
        }
        // const nowLineIsReleased = data.filter((item) => item.onlineIsReleased === 1)
        // this.nowLineIsReleased = nowLineIsReleased[0]
      } catch (e) {
        LzMsg.error(e.message);
      }
    },

    // 打开创建页面弹窗
    openCreateDialog() {
      this.isShowCreateDialog = true;
    },
    // 打开复制页面弹窗
    openCopyDialog(row) {
      this.isShowCopyDialog = true;
      this.copyPageInfo = row;

      this.copyPageName = row.instanceName;

      // if (this.copyPageName.length < 20) {
      this.copyPageName = `${row.instanceName} 副本`;
      // }
    },
    /**
     * 创建新页面
     */
    async create() {
      if (!this.newPageName) {
        LzMsg.error('请输入页面名称');
        return;
      }
      const loading = LzLoading.start();

      try {
        this.isShowCreateDialog = false;
        await Service.createPage({
          action: 1, // 创建
          instanceName: this.newPageName,
          themeId: this.defaultTheme.themeId,
          pType: this.type,
        });
        await this.getPages();
        LzMsg.success('创建成功');
      } catch (e) {
        if (e && e.message) {
          LzMsg.error(e.message);
        }
      } finally {
        this.newPageName = '';
        loading.close();
      }
    },
    /**
     * 复制页面
     */
    async copy() {
      if (!this.copyPageName) {
        LzMsg.error('请输入页面名称');
        return;
      }
      if (this.copyPageName.length > 20) {
        LzMsg.error('页面名称不可超过20个字符');
        return;
      }
      const loading = LzLoading.start();

      try {
        this.isShowCopyDialog = false;
        await Service.copyPage({
          action: 2, // 复制
          instanceId: this.copyPageInfo.instanceId,
          themeId: this.copyPageInfo.themeId,
          instanceName: this.copyPageName,
          pType: this.type,
        });
        await this.getPages();
        LzMsg.success('复制成功');
      } catch (e) {
        if (e && e.message) {
          LzMsg.error(e.message);
        }
      } finally {
        this.copyPageName = '';
        loading.close();
      }
    },
    /**
     * 页面重命名
     */
    async rename(page, instanceName) {
      if (instanceName === '') {
        LzMsg.error('页面名称不能为空');
        return;
      }
      try {
        await Service.renamePage({
          instanceId: page.instanceId,
          instanceName,
        });
        await this.getPages();
        LzMsg.success('修改成功');
      } catch (e) {
        LzMsg.error(e.message);
      }
    },
    /**
     * 装修已经保存的页面
     */
    modify(page) {
      // this.$router.push(`/page/${page.instanceId}`);

      const routeUrl = this.$router.resolve({
        path: `/page/${page.instanceId}`,
      });
      window.open(routeUrl.href, '_blank');
    },
    /**
     * 发布不是发布状态的页面，发布成功之后此页面成为用户的会员中心页面
     * c端使用venderId获取的页面信息和变成此页面的信息
     */
    async publish(page) {
      // await LzConfirm(`确认确认要发布页面${page.instanceName}么`);
      const loading = LzLoading.start();
      try {
        await Service.publishPage({
          instanceId: page.instanceId,
          // publishTime: '2020-12-24 22:04:00'
        });
        await this.getPages();
        // LzMsg.success('发布成功');
        this.showDialogSuccess = true;
      } catch (e) {
        LzMsg.error(e.message);
      } finally {
        loading.close();
      }
    },
    /**
     * 删除页面
     */
    async remove(page) {
      await LzConfirm(`删除后页面不可恢复，确认要删除页面${page.instanceName}么`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        cancelButtonClass: 'btn-custom-cancel',
        type: 'warning',
      });
      try {
        await Service.removePage({
          instanceId: page.instanceId,
        });
        await this.getPages();
        LzMsg.success('删除成功');
      } catch (e) {
        LzMsg.error(e.message);
      }
    },
    handleClose() {
      this.deleteVisibleShowed = false;
    },
    /**
     * 数据报表
     */
    showData(row) {
      window.location.href = `/common/dataReportDecoration/${row.instanceId}/${row.instanceName}/${this.type}`;
    },
    /**
     * 设置页面会员访问权限
     */
    async setMemberLimit(page) {
      page.memberLimit = page.memberLimit === 1 ? 0 : 1;
      try {
        await Service.setPageLimit({
          instanceId: page.instanceId,
          memberLimit: page.memberLimit,
        });
        await this.getPages();
        LzMsg.success('设置成功');
      } catch (e) {
        LzMsg.error(e.message);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~lz-crm/style/variables';

.page-memberCenter {
  padding: 20px;
  background-color: #ffffff;
  .create-dialog {
    .lz-input {
      width: 100% !important;
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

    .lz-input {
      width: 400px;
      margin-right: 15px;
    }
    .lz-button {
      margin: 0 5px;
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
      color: #3399FF;
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
  .switch-member-limit {
    margin-right: 5px;
  }

  .page-ctrl {
    margin-top: 20px;
    text-align: right;
  }
  .table-button {
    margin: 0 5px;
    &:focus {
      color: #2199ff;
    }
  }

  .sending-success {
    .lz-dialog__body {
      padding: 30px 20px;
      // border-top: 1px solid #9ca7b6;
      // border-bottom: 1px solid #9ca7b6;
    }
    .sending-title-top {
      width: 100%;
      text-align: center;
      font-size: 18px;
      // margin-bottom: 15px;
    }
    .sending-title-bottom {
      width: 100%;
      text-align: center;
      font-size: 18px;
    }
  }
}
</style>
