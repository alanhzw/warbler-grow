<template>

  <div class="ctrl-member-right-editor">

    <!-- tabs部分 -->
    <div class="tabs">
      <lz-tabs v-model="activeName"
               type="border-card"
               @tab-click="handleClick">
        <!-- 固定权益部分 -->
        <form-block title="固定权益"></form-block>
        <lz-tab-pane :label="item.levelName"
                     v-for='(item,levelIndex) in data.levelState.levels'
                     :key="item.levelName"
                     :name=" 'lz' + levelIndex">
          <div class="right-item"
               v-for='(right,rightIndex) in item.rightsList'
               :key='right.rightsName'>
            <move-bar :total='item.rightsList.length'
                      class="move-bar-guding"
                      :count='rightIndex'
                      :show-bottom='false'
                      :show-top='false'
                      :show-delete='false'
                      @move-up="move(-1,levelIndex,rightIndex,item.rightsList.length,'rightsList')"
                      @move-down="move(1,levelIndex,rightIndex,item.rightsList.length,'rightsList')" />
            <lz-form label-position="right"
                     label-width="90px">
              <lz-form-item label="权益名称：">
                {{ right.rightsName }}
              </lz-form-item>
              <lz-form-item label="关联活动："
                            v-if='!right.showAutoReceiveButton'>
                <div>
                  <span v-if='right.rightsRelation'>{{right.rightsRelation}}</span>
                  <span v-else>-</span>
                </div>
              </lz-form-item>
              <lz-form-item label="权益图标：">

                <img v-if='right.rightsIcon'
                     :src="`${CONST.IMAGE_PREFIX}${right.rightsIcon}`"
                     class="right-right-icon">
                <img v-if='right.activityType===334'
                     src="./assets/birth_gift.png"
                     class="right-right-icon">
                <img src="./assets/level_gift.png"
                     v-if='right.activityType===333'
                     class="right-right-icon">
                <img src="./assets/open_card.png"
                     v-if='right.activityType===335'
                     class="right-right-icon">
                <img src="./assets/shoudan_gift.png"
                     v-if='right.activityType===336'
                     class="right-right-icon">
                <img src="./assets/gouwu_points.png"
                     v-if='right.activityType==="购物积分"'
                     class="right-right-icon">
              </lz-form-item>
              <lz-form-item label="显示权益：">
                <lz-switch v-model="right.showRights">
                </lz-switch>
              </lz-form-item>
              <lz-form-item label="自动领取："
                            v-if='!right.showAutoReceiveButton'>
                <lz-switch v-model="right.autoReceive">
                </lz-switch>
              </lz-form-item>
            </lz-form>
          </div>

          <!-- 自定义权益部分 -->
          <form-block title="自定义权益"></form-block>
          <lz-table :data="item.customRightsList"
                    border
                    style="width: 100%">
            <lz-table-column prop="rightsName"
                             label="权益名称"
                             width="150">
            </lz-table-column>
            <lz-table-column label="权益图标"
                             width="80">
              <template slot-scope="scope">
                <img v-if="scope.row.rightsIcon"
                     class="right-icon"
                     :src="`${CONST.IMAGE_PREFIX}${scope.row.rightsIcon}`">
                <img v-else
                     class="right-icon"
                     src="./assets/cus_gift.png">
              </template>

            </lz-table-column>
            <lz-table-column label="操作">
              <template slot-scope="scope">
                <move-bar :show-bottom='false'
                          :min='0'
                          :show-edit='true'
                          :show-top='false'
                          :show-delete='true'
                          :total='item.customRightsList.length'
                          :count='scope.$index'
                          @edit-item="editItem(levelIndex,scope.$index,'customRightsList',scope.row)"
                          @delete-item="deleteItem(levelIndex,scope.$index,'customRightsList',scope.row)"
                          @move-up="move(-1,levelIndex,scope.$index,item.customRightsList.length,'customRightsList')"
                          @move-down="move(1,levelIndex,scope.$index,item.customRightsList.length,'customRightsList')" />
              </template>
            </lz-table-column>

          </lz-table>
          <br>
          <lz-button type="primary"
                     :disabled="item.customRightsList.length >= 8"
                     @click='addItem(levelIndex)'>添加权益({{item.customRightsList.length}}/8)</lz-button>
        </lz-tab-pane>
      </lz-tabs>
      <MarginBottomSetting :data="data" />

    </div>

    <!-- 图片空间弹窗 -->
    <lz-dialog title="图片空间"
               class="jd-image-dialog"
               :visible.sync="uploadBoxShowed"
               v-if='uploadBoxShowed'
               :append-to-body="true"
               :modal-append-to-body='true'
               width="1150px">
      <image-selector @selected="selectImage"
                      :validator="imgValidator" />
    </lz-dialog>

    <!-- 编辑奖品弹窗 -->
    <lz-dialog title="添加权益/编辑权益"
               class="member-right-dialog"
               :visible.sync="showAddRights"
               v-if="showAddRights"
               top='15vh'
               width="50%"
               :close-on-click-modal='false'
               :append-to-body="true"
               :modal-append-to-body='true'>
      <lz-form :model="formData"
               label-position="top"
               :rules="rules"
               ref="ruleForm"
               label-width='100px'>
        <lz-form-item label="权益名称："
                      prop="rightsName">
          <lz-input v-model="formData.rightsName"
                    placeholder="请输入权益名称"
                    maxlength="6"></lz-input>
        </lz-form-item>
        <lz-form-item label="权益图标："
                      prop="rightsIcon">
          <div class="upload-box"
               @click="uploadBoxShowed = true">
            <img v-if="formData.rightsIcon"
                 class="bg"
                 :src="`${CONST.IMAGE_PREFIX}${formData.rightsIcon}`">
            <img v-else
                 class="bg"
                 src="./assets/cus_gift.png">
          </div>

          <div class="description">
            <span>图片尺寸：64*64px</span>
            <span>图片大小：不超过100KB</span>
            <span>图片格式：JPG、PNG、GIF</span>
          </div>
        </lz-form-item>
        <lz-form-item label="权益链接："
                      prop="rightsLink">
          <lz-input v-model="formData.rightsLink"
                    placeholder="请输入权益链接"
                    maxlength="999"></lz-input>
          <link-tips></link-tips>
        </lz-form-item>
      </lz-form>
      <span slot="footer"
            class="dialog-footer">
        <lz-button type="primary"
                   @click="addRights">确 定</lz-button>
        <lz-button @click="cancleAddRights">取 消</lz-button>
      </span>
    </lz-dialog>

  </div>

</template>


<script>
import { ref, reactive } from '@vue/composition-api';
import CommonConfirm from '@business/components/CommonConfirm.vue';
import FormBlock from '../components/FormBlock.vue';
import MoveBar from '../components/MoveBar.vue';
import MarginBottomSetting from '../components/MarginBottomSetting.vue';
import LinkTips from '../components/LinkTips.vue';
import { LzLoading, LzMsg } from '@/utils/UI';
import Service from '@/business/service';
import CONST from '@/utils/constant';

export default ({
  name: 'CtrlMemberRightEditor',
  components: {
    FormBlock,
    MoveBar,
    MarginBottomSetting,
    CommonConfirm,
    LinkTips,
  },
  props: {
    data: {
      default: () => ({}),
    },
    validators: {
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    // 当前点击的tab
    const activeName = ref('lz0');
    // 当前所在的等级
    const nowLevelIndex = ref(0);
    // 当前修改的索引
    const editIndex = ref(0);
    // 点击tab的事件回调
    const handleClick = (tab, event) => {

    };
    // 标记是新增还是修改
    const isAddItem = ref(true);

    // 添加权益的表单
    const formData = ref({
      rightsName: '',
      rightsIcon: '',
      rightsLink: '',
      showRights: true,
      status: 1, // 2 不可领取  1可领取 3已领取
    });
    /**
     * @description: 上下移动某一项
     * @param {*} offset -1 上移 1 下移
     * @param {*} levelIndex 当前是几级的会员
     * @param {*} rightIndex 当前是哪一个权益
     * @param {*} length  权益的长度
     * @param {*} list  哪一个列表
     * @return {*}
     */
    const move = (offset, levelIndex, rightIndex, length, list) => {
      // 上移不可以超过顶部 下一不超过底部
      if (rightIndex + offset < 0 || rightIndex + offset >= length) {
        return;
      }
      // 从原先的列表中分离要移动的数据
      const pic = props.data.levelState.levels[levelIndex][list].splice(rightIndex, 1)[0];
      // 将数据添加到移动的目标位置
      props.data.levelState.levels[levelIndex][list].splice(rightIndex + offset, 0, pic);
    };

    /**
     * @description: 删除某一项
     * @param {*} levelIndex 当前是几级的会员
     * @param {*} rightIndex 当前是哪一个权益
     * @param {*} list  哪一个列表
     * @return {*}
     */
    const deleteItem = (levelIndex, rightIndex, list) => {
      props.data.levelState.levels[levelIndex][list].splice(rightIndex, 1);
    };


    // 是否展示添加权益弹窗
    const showAddRights = ref(false);

    // 是否展示上传图片弹窗
    const uploadBoxShowed = ref(false);

    /**
     * @description:修改某一项
     * @param {*} levelIndex 当前是几级的会员
     * @param {*} rightIndex 当前是哪一个权益
     * @param {*} list  哪一个列表
     * @param {*} row  当前一行的数据
     * @return {*}
     */
    const editItem = (levelIndex, rightIndex, list, row) => {
      showAddRights.value = true;
      nowLevelIndex.value = levelIndex;
      editIndex.value = rightIndex;
      formData.value = { ...row };
      isAddItem.value = false;
    };

    /**
     * @description: 添加权益
     * @param {*} levelIndex 当前是哪一个等级
     * @return {*}
     */
    const addItem = (levelIndex) => {
      showAddRights.value = true;
      isAddItem.value = true;
      nowLevelIndex.value = levelIndex;
    };

    // 确认添加权益
    const addRights = () => {
      if (!formData.value.rightsName) {
        LzMsg.error('请输入权益名称');
        return;
      }
      if (isAddItem.value) {
        props.data.levelState.levels[nowLevelIndex.value].customRightsList.push(formData.value);
      } else {
        // 从原先的列表中分离要移动的数据
        props.data.levelState.levels[nowLevelIndex.value].customRightsList.splice(editIndex.value, 1);
        // 将数据添加到移动的目标位置
        props.data.levelState.levels[nowLevelIndex.value].customRightsList.splice(editIndex.value, 0, formData.value);
      }

      formData.value = {
        rightsName: '',
        rightsIcon: '',
        rightsLink: '',
        showRights: true,
        status: 1, // 2 不可领取  1可领取 3已领取
      };
      showAddRights.value = false;
    };

    // 取消添加权益
    const cancleAddRights = () => {
      showAddRights.value = false;
      formData.value = {
        rightsName: '',
        rightsIcon: '',
        rightsLink: '',
        status: 1, // 2 不可领取  1可领取 3已领取
        showRights: true,
      };
    };


    // 表单验证规则
    const rules = reactive({
      rightsName: [
        { required: true, message: '请输入权益名称', trigger: 'change' },
      ],
      rightsIcon: [
        { required: false, message: '请上传权益图标', trigger: 'change' },
      ],
      rightsLink: [
        { required: false, message: '请输入权益链接', trigger: 'change' },
      ],
    });

    // 选择图片的验证
    const imgValidator = (width, height, size, type = '') => new Promise((resolve, reject) => {
      if (height !== 64) {
        reject(new Error('请使用高度为64px的图片'));
      } else if (width !== 64) {
        reject(new Error('请使用宽度为64px的图片'));
      } else if (size > 1000 * 1024) {
        reject(new Error('图片文件大小不可超过1M'));
      } else if (['jpg', 'jpeg', 'png', 'gif', 'image/jpeg'].indexOf(type) === -1) {
        reject(new Error('请使用jpg、png或gif格式的文件'));
      } else {
        resolve();
      }
    });
    // 选择图片
    const selectImage = (url) => {
      if (formData.value.rightsIcon !== url) {
        formData.value.rightsIcon = url;
      }
      uploadBoxShowed.value = false;
    };

    // 获取等级礼包和生日礼包
    const getUpGradeOrBirthdayGiftList = (activityType) => {
      const loading = LzLoading.start();
      Service.getUpGradeOrBirthdayGiftList({ activityType }).then(({ data }) => {
        props.data.levelState.levels.forEach((item) => {
          item.rightsList.forEach((right) => {
            if (activityType === right.activityType) {
              right.rightsRelation = data.activityName;
            }
          });
        });
        loading.close();
      }).catch((e) => {
        loading.close();
        if (e && e.message) {
          LzMsg.error(e.message);
        }
      });
    };

    // 获取商家等级
    const getLevels = () => {
      const loading = LzLoading.start();
      Service.getLevels().then(({ data }) => {
        // 获取等级礼包和生日礼包 入会礼包 首购礼包
        if (!props.data.levelState.levels.length > 0) {
          props.data.levelState.levels = data.levels.map(item => ({
            ...item,
            rightsList: [
              {
                rightsName: '入会礼包',
                rightsRelation: '',
                rightsIcon: '',
                showRights: true,
                autoReceive: true,
                activityType: 335,
                status: 2,
              },
              {
                rightsName: '会员升级礼包',
                rightsRelation: '',
                rightsIcon: '',
                showRights: true,
                autoReceive: true,
                activityType: 333,
                status: 2,
              },
              {
                rightsName: '生日礼包',
                rightsRelation: '',
                rightsIcon: '',
                showRights: true,
                autoReceive: true,
                activityType: 334,
                status: 2,
              },
              {
                rightsName: '会员首购礼包',
                rightsRelation: '',
                rightsIcon: '',
                showRights: true,
                autoReceive: true,
                activityType: 336,
                status: 2,
              },
              {
                activityType: '购物积分',
                rightsName: '购物积分',
                rightsRelation: '',
                rightsIcon: '',
                showRights: true,
                autoReceive: true,
                status: 4,
                showAutoReceiveButton: 'no',
              },
            ],
            customRightsList: [
            // {
            //   rightsName: '',
            //   rightsIcon: cusGift,
            //   rightsLink: '',
            // },
            ],
          }));
          loading.close();
        }
        getUpGradeOrBirthdayGiftList(333);
        getUpGradeOrBirthdayGiftList(334);
        getUpGradeOrBirthdayGiftList(335);
        getUpGradeOrBirthdayGiftList(336);
      }).catch((e) => {
        loading.close();
        if (e && e.message) {
          LzMsg.error(e.message);
        }
      });
    };


    // 执行获取
    getLevels();


    return {
      CONST,
      imgValidator,
      selectImage,
      rules,
      formData,
      addRights,
      cancleAddRights,
      showAddRights,
      editItem,
      deleteItem,
      addItem,
      move,
      activeName,
      handleClick,
      uploadBoxShowed,
    };
  },
});


</script>

<style lang="scss">
@import '~lz-crm/style/variables';

.member-right-dialog{

  .description{
    position: absolute;
    top: 0;
    left: 90px;
    display: flex;
    flex-direction: column;

    span{
      line-height: 20px;
    }
  }

  .lz-dialog__body{
    padding: 0 20px;
  }
  .upload-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    font-size: 12px;
    color: $TAG_INFO_BLUE;
    text-align: center;
    border: 1px dashed $BORDER_GRAY;

    .bg {
      width: 100%;
      vertical-align: center;
    }
  }
  .tip {
    font-size: 12px;
    color: $FONT_MINOR_GRAY;
    margin-top: 15px !important;
    margin-bottom: 0 !important;
    a{
      color:#3399ff;
    }
  }
}

.ctrl-member-right-editor {


  .editor-form-block .editor-form-block-body{
    background-color: #fff;
  }
  .lz-tabs--card>.lz-tabs__header {
    border-bottom: 1px solid #E3E8EE;
  }

  .editor-form-block-header, .lz-form-item{
    margin-bottom: 0;
  }
  .lz-tabs--border-card{
    border:none;
    box-shadow: none;
  }
  .lz-tabs--border-card>.lz-tabs__header .lz-tabs__item.is-active{
    position: relative
  }
  .lz-tabs__item.is-active::before{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #3399FF;
  }

  .right-item{
    width: 100%;
    border: 1px solid #D7DDE4;
    margin-bottom: 15px;
    padding: 5px 10px;
    position: relative;
  }
  .lz-form-item__label{
    color: #333333;
  }

   .move-bar-guding {
    position: absolute;
    right: 0;
    z-index: 1999;
   }

   .already-relation{
     display: inline-block;
     color:#00BB66;
     background-color: #E5F9F0;
     border-color:#00BB66;
     width: 64px;
     height: 22px;
     line-height: 22px;
     text-align: center;
   }
   .no-relation{
    display: inline-block;
     width: 64px;
     height: 22px;
     line-height: 22px;
     text-align: center;
     color:#9CA7B6;
     background-color: #F5F7F9;
     border-color:#9CA7B6;
   }

   .link-style{
     color: #3399FF;
   }

   .right-icon{
     width: 50px;
     height: 50px;
   }

   .rights-icon{
     width: 64px;
     height: 64px;
   }
  //  .right-right-icon{
  //    border: 1px dashed #333333;
  //  }


}
</style>
