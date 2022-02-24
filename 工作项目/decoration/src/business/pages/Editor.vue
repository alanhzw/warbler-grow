<!--
 * @Author: YC
 * @Date: 2020-12-23 14:29:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-14 14:03:06
 * @Description: 装修编辑器
-->
<template>
  <div class="editor-page">
    <!-- hzw -->
    <framework class="page-editor"
               @changeIsChangedFloorName='changeIsChangedFloorName'
               :info="info"
               :isChangedFloorName='isChangedFloorName'
               :themes="themes"
               :pages="pages"
               :pageOnEdit="pageOnEdit"
               :floorOnEdit="floorOnEdit"
               :formData="formData"
               :loaded="loaded"
               @changeTheme="getCtrls"
               @saveFloor="saveFloor"
               @changePage="getCtrls">
      <editor-header slot="header"
                     :info="info"
                     :loaded="loaded"
                     @copy="openCreateDialog"
                     @sync="openSyncDialog"
                     @rename='rename'
                     @preview="preview"
                     @publish="publish" />
      <ctrl-menu slot="ctrls"
                 :pageOnEdit="pageOnEdit"
                 :ctrls="ctrls"
                 @addFloor="addFloor"
                 :canMove='canMove' />
      <div slot="floors"
           v-if="pageOnEdit.pageId >= 0"
           @mouseover="mouseOverFn"
           @mouseleave='mouseLeaveFn'
           class="draggable-area">

        <draggable class="draggable-editor"
                   v-bind="dragOptions">
          <div v-for="(floor, fIndex) in pageOnEdit.floors"
               :key="`page-${info.pageId}-floor-preview-${fIndex}`">

            <floor-preview v-if="floor.components.result !== 'ctrl_bottom_bar_result'"
                           class='forbid'
                           :style="floor.info.wrapperStyle || {}"
                           :class="{'on-edit': pageOnEdit.fIndex === fIndex}"
                           :info="floor.info"
                           :isFirst="fIndex === countOfStaticFloor"
                           :isLast="Array.isArray(pageOnEdit.floors) && pageOnEdit.floors.length > 0 && fIndex === pageOnEdit.floors.length - 1"
                           @moveUp="moveFloor(fIndex, -1)"
                           @moveDown="moveFloor(fIndex, 1)"
                           @remove="removeFloor(fIndex)"
                           @click="setFloorOnEdit(fIndex)">
              <compnent :is="floor.components.preview"
                        :data="floor.data" />
            </floor-preview>
          </div>
        </draggable>
        <div style="flex: 1"></div>
        <floor-preview class='forbid'
                       v-for="(floor, fIndex) in pageOnEdit.floors.filter(f => f.components.result == 'ctrl_bottom_bar_result')"
                       :key="`page-${info.pageId}-bottom-floor-preview-${fIndex}`"
                       :style="floor.info.wrapperStyle || {}"
                       :class="{'on-edit': pageOnEdit.fIndex === pageOnEdit.floors.indexOf(pageOnEdit.floors.find(f => floor.floorId == f.floorId))}"
                       :info="floor.info"
                       :isFirst="true"
                       :isLast="true"
                       @moveUp="moveFloor(pageOnEdit.floors.indexOf(pageOnEdit.floors.find(f => floor.floorId == f.floorId)), -1)"
                       @moveDown="moveFloor(pageOnEdit.floors.indexOf(pageOnEdit.floors.find(f => floor.floorId == f.floorId)), 1)"
                       @remove="removeFloor(pageOnEdit.floors.indexOf(pageOnEdit.floors.find(f => floor.floorId == f.floorId)))"
                       @click="setFloorOnEdit(pageOnEdit.floors.indexOf(pageOnEdit.floors.find(f => floor.floorId == f.floorId)))">
          <compnent :is="floor.components.preview"
                    :data="floor.data" />
        </floor-preview>
      </div>
      <editor-thumbnail slot="thumbnail"
                        :pageInfo="pageOnEdit"
                        @removeFloor="removeFloor"
                        @editFloor="setFloorOnEdit"
                        @save='save' />
      <div slot="editor">
        <div v-if="floorOnEdit && floorOnEdit.components"
             class="edit-panel-body-content">
          <component ref="currentEditor"
                     :is="floorOnEdit.components.editor"
                     :data="formData"
                     :floorOnEdit='floorOnEdit'
                     :validators="floorOnEdit.validators"
                     :funs="floorOnEdit.funs" />
          <crowd-selector v-if="floorOnEdit.info.enableBI && platform !== 'tmall'"
                          :enable="floorOnEdit.extra.upCrowd == 1"
                          :crowds="floorOnEdit.extra.crowdData"
                          @changeTargetedType='changeTargetedType'
                          @changeCrowds='changeCrowds'
                          :strategies="floorOnEdit.extra.strategyData"
                          @changeBIData="changeBIData"
                          :targetedType='floorOnEdit.extra.targetedType'
                          @enableChange="changeBIEnable" />
        </div>
      </div>
    </framework>

    <common-confirm class="create-dialog"
                    title='另存为页面'
                    :dialogVisible='isShowCreateDialog'
                    @confirm='copy'
                    @cancle='isShowCreateDialog=false'>
      <label for="">填写另存名称:</label>
      <br>
      <br>
      <lz-input v-model="newPageName"
                placeholder="请输入页面名称"
                maxlength="20"></lz-input>
    </common-confirm>

    <common-message class="sending-dialog"
                    title='操作提示'
                    :dialogVisible="showMessageDialog"
                    :showFooter="false"
                    @cancle='showMessageDialog=false'>
      <div class="sending-title">发布中,请稍候</div>
      <lz-progress :percentage="90"
                   :stroke-width="12"></lz-progress>
    </common-message>

    <common-message class="sending-success"
                    title='操作提示'
                    :dialogVisible="showDialogSuccess"
                    :showFooter="true"
                    @confirm='showDialogSuccess=false'
                    @cancle='showDialogSuccess=false'>
      <div class="sending-title-top">恭喜,页面发布成功!</div>
      <!-- <div class="sending-title-bottom">扫码立刻访问</div> -->
    </common-message>

    <common-confirm class="sync-dialog-box"
                    title='同步'
                    top='35vh'
                    :dialogVisible="showSyncDialog"
                    :showFooter="true"
                    @confirm='sync'
                    @cancle='showSyncDialog=false'>
      <div class="sync-dialog-content">
        <span>同步为:</span>
        <lz-select v-model="syncValue"
                   placeholder="请选择">
          <lz-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </lz-option>
        </lz-select>
      </div>
    </common-confirm>

  </div>
</template>


<script>
import draggable from 'vuedraggable';
import Service, { CommonService } from '@business/service';
import CommonMessage from '../components/CommonMessage.vue';
import Framework from '@/business/components/EditorFramework';
import EditorHeader from '@/business/components/EditorHeader';
import CtrlMenu from '@/business/components/EditorCtrlMenu';
import FloorPreview from '@/business/components/FloorPreview';
import EditorThumbnail from '@/business/components/EditorThumbnail';
import CrowdSelector from '@/ctrls/components/CrowdSelector';
import Ctrls from '@/ctrls';
import Utils from '@/utils';
import { LzMsg, LzPrompt, LzConfirm, LzLoading } from '@/utils/UI';
import CommonConfirm from '@/business/components/CommonConfirm.vue';
import isOLY from '@/utils/oly';


export default {
  name: 'Editor',
  components: {
    CommonConfirm,
    Framework,
    EditorHeader,
    CtrlMenu,
    FloorPreview,
    EditorThumbnail,
    CrowdSelector,
    draggable,
    CommonMessage,
  },
  data() {
    return {
      shopId: Number(Utils.getShopId()),
      platform: process.env.VUE_APP_PLATEFORM,
      options: [{
        value: '0',
        label: '当前发布版本',
      }],
      syncValue: '0',
      showSyncDialog: false,
      showDialogSuccess: false,
      showMessageDialog: false,
      isShowCreateDialog: false,
      isChangedFloorName: true,
      newPageName: '',
      canMove: false,
      loaded: false,
      themes: [],
      pages: [],
      ctrls: [],
      info: {
        pType: 0,
        themeId: 0,
        pageId: 0,
        ctrlName: '',
      },
      formData: {
        floorName: '',
      },
      isCopying: false,
      manlunList: [1000002791, 197341, 1000001462, 74655, 124989, 631248, 996883, 1000102783, 649920],
    };
  },
  computed: {
    /**
     * 拖拽组件配置项
     */
    dragOptions() {
      return {
        animation: 0,
        group: 'componentsGroup',
        // disabled: false,
        name: 'preview',
        forceFallback: true,
        fallbackClass: true,
        ghostClass: 'ghost',
        chosenClass: 'chosen',
        dragClass: 'chosen',
        disabled: false,
        filter: '.forbid',
      };
    },
    /**
     * 正在编辑中的页面
     */
    pageOnEdit() {
      return this.pages.filter(p => p.pageId === this.info.pageId)[0] || {};
    },
    /**
     * 正在编辑中的楼层
     */
    floorOnEdit() {
      return this.pageOnEdit.pageId > 0 && this.pageOnEdit.fIndex > -1 ? this.pageOnEdit.floors[this.pageOnEdit.fIndex] : {};
    },
    /**
     * 页面中固定的楼层数量
     */
    countOfStaticFloor() {
      return this.pageOnEdit.floors.filter(f => f && f.info && f.info.isRequired === 1).length;
    },
  },
  async created() {
    await this.init();
    this.loaded = true;
  },
  watch: {
    '$route.params.instanceId': function () {
      this.init();
    },
    'pageOnEdit.fIndex': function () {
      this.formData = JSON.parse(JSON.stringify((this.floorOnEdit && this.floorOnEdit.data) || {}));
    },
    'info.pageId': function (val) {
      const loading = LzLoading.start();
      setTimeout(() => {
        this.checkRequiredCtrls();
        loading.close();
      }, 2000);
      // this.checkRequiredCtrls();
    },
  },
  methods: {
    changeTargetedType(params) {
      this.floorOnEdit.extra.targetedType = params;
    },
    changeCrowds(crowds) {
      this.floorOnEdit.extra.crowdData = crowds;
    },
    handlerIsOLY() {
      return isOLY();
    },
    // 打开创建页面弹窗
    openCreateDialog(page = this.info) {
      this.isShowCreateDialog = true;
      this.newPageName = page.instanceName;
      if (this.newPageName.length < 20) {
        this.newPageName = `${page.instanceName} 副本`;
      }
    },
    // 修改页面名称
    async rename(page, instanceName) {
      const loading = LzLoading.start();
      if (instanceName === '') {
        LzMsg.error('页面名称不能为空');
        return;
      }
      try {
        await Service.renamePage({
          instanceId: page.instanceId,
          instanceName,
        });
        await this.init();
        LzMsg.success('修改成功');
        loading.close();
      } catch (e) {
        loading.close();
        LzMsg.error(e.message);
      } finally {
        loading.close();
      }
    },
    mouseOverFn() {
      this.canMove = true;
    },
    mouseLeaveFn() {
      this.canMove = false;
    },
    async init() {
      const { pages = [], ...info } = await this.getInstanceInfo();
      info.title = ['会员中心', '自定义页面'][info.pType];


      // 如果是新创建的页面pages是空数组需要查询可用的数据写入pages里面
      const pageList = pages.length > 0 ? pages : await this.getSubPages(info.pType);

      // 如果没有包含的子页面的id（大概率是因为在列表中直接创建的页面还没有其他的信息）
      if (!info.pageId) {
        info.pageId = pageList[0].pageId;
      }
      this.info = info;
      await this.getCtrls(info.pageId, info.themeId);

      const fIndexMap = {};
      this.pages.forEach(page => fIndexMap[page.pageId] = page.fIndex);

      // 清理一下pages里面的数据防止出现重复的页面
      this.pages = [];
      // 从pageList重建pages数据结构
      pageList.forEach(({
        floors = [],
        ...pageInfo
      }) => {
        // pages每个子页面初始的数据结构
        const page = {
          ...pageInfo,
          fIndex: fIndexMap[pageInfo.pageId] || floors.length - 1,
          floors: [],
        };
        // 遍历每个楼层，匹配楼层组件
        Promise.all(floors.map(async (floor) => {
          const ctrl = this.ctrls.filter(c => c.info.componentId === floor.componentId)[0];
          if (ctrl && ctrl.createFloor) {
            page.floors.push(await ctrl.createFloor({
              floorId: floor.floorId,
              data: JSON.parse(floor.contentValueJson),
              extra: {
                floorKey: floor.floorKey || '', // floor的唯一标识
                floorTitle: floor.floorTitle || '', // floor title
                isSaved: floor.isSaved || 0, // 是否已保存 0 - 未保存、 1 - 已保存
                upCrowd: floor.upCrowd || 0, // 是否启用BI 0 - 不启用、 1 - 启用
                crowdData: floor.crowdData || [], // BI 人群数据
                strategyData: floor.strategyData || [], // 京东BI数据
                targetedActivityId: floor.targetedActivityId || '', // 京东BI活动ID
                targetedType: floor.targetedType || 1,
              },
            }));
          }
        })).then(() => {
          this.pages.push(page);
        });
      });
    },
    /**
     * 查看必有组件
     */
    checkRequiredCtrls() {
      if (this.pageOnEdit.floors.length === 0) {
        this.ctrls.filter(ctrl => ctrl.info.isRequired === 1).forEach((floor, index) => this.addFloor(floor, index, true));
      }
    },

    /**
     * 获取页面的详情
     */
    async getInstanceInfo() {
      const { data } = await Service.getInstanceInfo({
        instanceId: this.$route.params.instanceId,
      });
      return data;
    },
    /**
     * 获取页面有多少个可设置的子页面
     */
    async getSubPages(pType = this.info.pType) {
      const { data } = await Service.getSubPages({
        pType,
      });
      return data;
    },
    /**
     * 获取页面可用的控件
     */
    async getCtrls(pageId = this.info.pageId, themeId = this.info.themeId) {
      const { data } = await Service.getCtrls({
        pageId,
        themeId,
      });
      const list = data.map(c => c.componentCode);
      const ctrls = [];
      Object.keys(Ctrls).forEach((key) => {
        const component = data.filter(item => item.componentCode === Ctrls[key].info.name)[0];

        if (component) {
          Ctrls[key].info.componentId = component.componentId;
          Ctrls[key].info.isRequired = component.isRequired;
          Ctrls[key].info.maxCount = component.maxCount;
          Ctrls[key].info.cType = component.cType;
          Ctrls[key].info.cTypeName = component.cTypeName;
          ctrls.push(Ctrls[key]);
        }
      });
      this.ctrls = ctrls;


      try {
      // 骁龙不展示积分加钱购,会员专享券,会员权益,会员专享折扣
        if (this.shopId == '703279') {
          this.ctrls = this.ctrls.filter(item => item.info.componentId != 16 && item.info.componentId != 18 && item.info.componentId != 17 && item.info.componentId != 19);
        } else if (JSON.parse(localStorage.getItem('LZ_CRM_BIZ_USER')).username == 'crmAdmin') {
          // 非crmAdmin不显示会员专享折扣
          this.ctrls = this.ctrls.filter(item.info.componentId != 19);
        } else if (this.manlunList.includes(this.shopId)) {
          // 曼昆不展示会员权益,会员专享折扣
          this.ctrls = this.ctrls.filter(item => item.info.componentId != 18 && item.info.componentId != 19);
        } else if (this.handlerIsOLY()) {
          // 欧莱雅不要开卡和等级
          this.ctrls = this.ctrls.filter(item => item.info.componentId != 4 && item.info.componentId != 5);
        }
      } catch (error) {
        console.log('🚀🚀~ error:', error.message);
      }
    },

    /**
     * 验证当前正在编辑的楼层的表单数据
     */
    verifyCurrentEditor() {
      if (this.$refs.currentEditor && this.$refs.currentEditor.$refs.formBlock && this.$refs.currentEditor.$refs.formBlock.$refs.elForm) {
        console.log('validate:', this.$refs.currentEditor.$refs.formBlock.$refs.elForm.validate());
        return this.$refs.currentEditor.$refs.formBlock.$refs.elForm.validate();
      }
      return Promise.resolve();

      // return Promise.resolve()
    },
    /**
     * 保存单个楼层，用于对于楼层的修改的快速生效
     * 只有已保存的页面的已保存的楼层可以单独的保存
     * 此保存会直接影响线上的展示效果
     */
    changeIsChangedFloorName(status) {
      this.isChangedFloorName = status;
    },
    saveFloor() {
      if (this.formData.floorName === '' || this.formData.floorName === '未命名楼层') {
        this.changeIsChangedFloorName(false);
        LzMsg.error('请填写楼层名称');
        return;
      }
      if (this.floorOnEdit.extra.upCrowd == 1) {
        if (this.floorOnEdit.extra.targetedType == 1 && this.floorOnEdit.extra.strategyData.length == 0) {
          LzMsg.error('请选择定投人群');
          return;
        }
        if (this.floorOnEdit.extra.targetedType == 2 && this.floorOnEdit.extra.crowdData.length == 0) {
          LzMsg.error('请选择自定义人群');
          return;
        }
      }
      this.verifyCurrentEditor().then(async () => {
        const loading = LzLoading.start();

        try {
          await Service.saveFloor({
            floorId: this.floorOnEdit.floorId,
            componentId: this.floorOnEdit.info.componentId,
            // contentValueJson: JSON.stringify(this.floorOnEdit.data),
            contentValueJson: JSON.stringify(this.formData),
            infoId: this.pageOnEdit.infoId,
            ...this.floorOnEdit.extra,
            floorTitle: this.formData.floorName,
          });
          await this.init();
          loading.close();
          LzMsg.success('保存楼层成功');
        } catch (e) {
          LzMsg.error(e.message);
        } finally {
          loading.close();
        }
      }).catch((e) => {
        LzMsg.error('楼层设置有误');
      });
    },
    preview() { },
    /**
     * 保存页面
     */
    async save() {
      const loading = LzLoading.start();
      try {
        const params = {
          ...this.info,
          pages: this.pages.map(page => ({
            infoId: page.infoId,
            pageId: page.pageId,
            floors: page.floors.map(({
              Editor,
              Preview,
              ...floor
            }, orderValue) => ({
              componentId: floor.info.componentId,
              contentValueJson: JSON.stringify(floor.data),
              orderValue,
              ...floor.extra,
            })),
          })),
        };
        await Service.updatePage(params);
        await this.init();
        loading.close();
        // LzMsg.success('保存成功');
      } catch (e) {
        loading.close();
        LzMsg.error(e.message);
        if (e) {
          return false;
        }
      }
      return true;
    },
    /**
     * 复制页面
     */
    async copy(page = this.info) {
      if (!this.newPageName) {
        throw new Error('请输入页面名称');
      }
      const loading = LzLoading.start();
      try {
        this.pages.forEach((page) => {
          page.floors.forEach((floor) => {
            if (!floor.extra.isSaved) {
              throw new Error('该页面有未保存的楼层，请保存后再进行另存为操作');
            }
          });
        });
        this.isShowCreateDialog = false;
        const { data } = await Service.copyPage({
          action: 2, // 复制
          instanceId: page.instanceId,
          themeId: page.themeId,
          instanceName: this.newPageName,
          pType: this.type,
        });
        loading.close();
        LzMsg.success('保存成功');
        this.newPageName = '';
        if (data.instanceId) {
          this.$router.replace(data.instanceId);
        }
      } catch (e) {
        loading.close();
        if (e && e.message) {
          LzMsg.error(e.message);
        }
      } finally {
        loading.close();
      }
    },
    openSyncDialog() {
      this.showSyncDialog = true;
    },
    /**
     * 同步线上
     */
    async sync() {
      this.showSyncDialog = false;
      await LzConfirm('同步操作会使用线上发布的页面内容替换正在编辑的页面内容，操作不可恢复，是否确认同步', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        cancelButtonClass: 'btn-custom-cancel',
        type: 'warning',
      });
      const loading = LzLoading.start();
      const { pages = [], ...info } = await this.getOnlineInstanceInfo();
      info.pType = this.info.pType;
      info.title = ['会员中心', '自定义页面'][info.pType];
      info.instanceId = this.$route.params.instanceId;
      this.info = info;
      const pageList = pages;

      await this.getCtrls(info.pageId, info.themeId);

      // 清理一下pages里面的数据防止出现重复的页面
      this.pages = [];
      // 从pageList重建pages数据结构
      Promise.all(pages.map(({
        floors = [],
        ...pageInfo
      }) => {
        // pages每个子页面初始的数据结构
        const page = {
          ...pageInfo,
          fIndex: floors.length - 1,
          floors: [],
        };
        // 遍历每个楼层，匹配楼层组件
        return Promise.all(floors.map(async (floor) => {
          const ctrl = this.ctrls.filter(c => c.info.componentId === floor.componentId)[0];
          if (ctrl && ctrl.createFloor) {
            page.floors.push(await ctrl.createFloor({
              floorId: floor.floorId,
              data: JSON.parse(floor.contentValueJson),
              extra: {
                floorKey: floor.floorKey || '', // floor的唯一标识
                floorTitle: floor.floorTitle || '', // floor title
                isSaved: 1, // 是否已保存 0 - 未保存、 1 - 已保存 同步线上的时候组件设置为已保存的
                upCrowd: floor.upCrowd || 0, // 是否启用BI 0 - 不启用、 1 - 启用
                crowdData: floor.crowdData || [], // BI 人群数据
                strategyData: floor.strategyData || [], // 京东BI数据
                targetedActivityId: floor.targetedActivityId || '', // 京东BI活动ID
                targetedType: floor.targetedType || 1,
              },
            }));
          }
        })).then(() => {
          this.pages.push(page);
        });
      })).then(this.save).then(() => loading.close()).catch((e) => {
        loading.close();
        LzMsg.error(e.message);
      });
    },

    /**
     * 获取线上页面的详情
     */
    async getOnlineInstanceInfo() {
      const { data } = await Service.getOnlineInstanceInfo({
        instanceId: this.info.publishInstanceId,
      });
      return data;
    },
    /**
     * 发布不是发布状态的页面，发布成功之后此页面成为用户的会员中心页面
     * c端使用venderId获取的页面信息和变成此页面的信息
     */
    async publish(time) {
      // if (time) {
      //   await LzConfirm(`确认在${time}发布页面${this.info.instanceName}么`);
      // } else {
      //   await LzConfirm(`确认要发布页面${this.info.instanceName}么`);
      // }
      let unSavedFloorIdx = -1;
      for (let i = 0; i < this.pageOnEdit.floors.length; i++) {
        if (this.pageOnEdit.floors[i].extra.isSaved == 0) {
          unSavedFloorIdx = i;
          break;
        }
      }
      if (unSavedFloorIdx != -1) {
        this.pageOnEdit.fIndex = unSavedFloorIdx;
        LzMsg.error('请保存楼层');
        return;
      }
      this.showMessageDialog = true;
      try {
        await Service.publishPage({
          instanceId: this.info.instanceId,
          publishTime: time,
        });
        await this.init();
        this.showMessageDialog = false;
        // if (time) {
        //   LzMsg.success('设置定时发布任务成功');
        // } else {
        //   LzMsg.success('发布成功');
        // }
        this.showDialogSuccess = true;
        // this.$router.push('/pages')
      } catch (e) {
        this.showMessageDialog = false;
        LzMsg.error(e.message);
      } finally {
        this.showMessageDialog = false;
      }
    },
    /**
     * 添加楼层
     */
    async addFloor(ctrl, addIndex = -1, defaultSave) {
      // 原始做法是在页面的尾部添加新楼层，不再使用这用添加方式
      const floor = await ctrl.createFloor();

      if (defaultSave) {
        floor.extra.isSaved = 1;
      }
      // const page = this.pages.splice(0, 1)[0];
      const page = this.pageOnEdit;
      if (Array.isArray(page.floors)) {
        // 在当前编辑的位置插入要添加的新楼层
        if (addIndex < 0) {
          page.floors.splice(page.fIndex + 1, 0, floor);
        } else if (addIndex > 0) {
          page.floors.splice(addIndex, 0, floor);
        } else {
          page.floors.splice(1, 0, floor);
        }
        // 将新添加的楼层设置为正在编辑的楼诚
        page.fIndex += 1;
      } else {
        page.floors = [floor];
        page.fIndex = 0;
      }
      await this.save();
    },

    /**
     * 移动楼层（上下移动）
     * offset -1 上移， 1 下移
     */
    async moveFloor(fIndex, offset) {
      // 上移不可以超过顶部固定的楼层
      if (fIndex + offset < this.countOfStaticFloor) {
        return;
      }
      // 从原先的列表中分离要移动的楼层
      const floor = this.pageOnEdit.floors.splice(fIndex, 1)[0];
      // 将楼层添加到移动的目标位置
      this.pageOnEdit.floors.splice(fIndex + offset, 0, floor);
      // 保持楼层为正在编辑的状态
      this.pageOnEdit.fIndex = fIndex + offset;

      await this.save();
    },
    /**
     * 移除楼层
     */
    async removeFloor(fIndex) {
      // 删除目标楼层
      this.pageOnEdit.floors.splice(fIndex, 1);

      // 如果删除的最后一层，则将删除之后剩下的最后一层作为正在编辑的楼层
      if (this.pageOnEdit.floors.length <= this.pageOnEdit.fIndex) {
        this.pageOnEdit.fIndex = this.pageOnEdit.floors.length - 1;
      }
      await this.save();
    },
    /**
     * 点击中间预览位置的楼层时右侧打开对应的编辑组件
     */
    setFloorOnEdit(fIndex) {
      // 记录对应楼层的index
      this.pageOnEdit.fIndex = fIndex;
      this.info.ctrlName = this.pageOnEdit.floors[fIndex].info.label;
    },
    changeBIEnable(enable) {
      this.floorOnEdit.extra.upCrowd = enable ? 1 : 0;
    },
    changeBIData(data) {
      this.floorOnEdit.extra.targetedType = data.biType;
      this.floorOnEdit.extra.upCrowd = data.enable ? 1 : 0;
      this.floorOnEdit.extra.crowdData = data.crowds || [];
      this.floorOnEdit.extra.strategyData = data.strategies || [];
    },
  },
};
</script>

<style lang='scss'>
@import '~lz-crm/style/variables.scss';

.editor-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow-x: auto;
  overflow-y: hidden;

  .page-editor {
    position: relative;
    height: 100%;
    min-width: 1310px;
    background-color: $BG_PAGE_GRAY;
  }

  .create-dialog {
    .lz-input {
      width: 100% !important;
    }
  }
}
.sending-dialog {
  .sending-title {
    width: 100%;
    text-align: center;
    font-size: 18px;
    margin-bottom: 15px;
  }
  .lz-dialog__body {
    // border-top: 1px solid #9ca7b6;
    // border-bottom: 1px solid #9ca7b6;
  }
}

.sync-dialog-box {
  .sync-dialog-content {
    padding: 0 10px;
    display: flex;
    span {
      line-height: 40px;
      margin-right: 10px;
    }
  }
}

.sending-success {
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
  .lz-dialog__body {
    padding: 30px 20px;
    // border-top: 1px solid #9ca7b6;
    // border-bottom: 1px solid #9ca7b6;
  }
}
.draggable-area {
  min-height: 627px;
  display: flex;
  flex-direction: column;
}

.draggable-editor {
  position: relative;
  .chosen {
    background-color: transparent;
  }

  .ghost {
    width: 98%;
    height: 20px;
    padding: 10px 0 15px 0;
    background-color: #ceebff;
    position: relative;
    :before {
      position: absolute;
      top: -15px;
      content: '';
    }
  }
}
</style>
