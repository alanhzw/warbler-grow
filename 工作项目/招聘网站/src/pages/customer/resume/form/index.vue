<!--
 * @Descripttion: 在线填写简历
 * @Author: yang chenglin
 * @Date: 2021-09-22 18:50:28
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-27 14:35:01
-->
<template>
  <div class='resume-form-div'>
    <el-row>
      <el-col :span='15'>
        <div class='page-title display-flex'>
          <div>我的在线简历</div>
          <div class='go-detail-link'
               @click="router.push('/customer/resume/prewiew')">
            <img src="@/assets/resume-preview.png"
                 alt=""><span>预览简历</span>
          </div>
        </div>

        <div class='content-div user-info'>
          <use-info />
        </div>

        <div class='content-div'>
          <myTags />
        </div>

        <div class='content-div'>
          <Advantage />
        </div>

        <div class='content-div'>
          <job-expectations />
        </div>

        <div class='content-div'>
          <work-experiences />
        </div>

        <div class='content-div'>
          <project-experience />
        </div>

        <div class='content-div'>
          <edu-experience />
        </div>
      </el-col>
      <el-col :span='1'></el-col>
      <el-col :span='8'>
        <div class='attachment-resume-div'>
          <div style="margin-bottom: 20px">附件简历</div>
          <div v-for='item in resumeList'
               :key='item.enclosureId'
               class='display-flex'>
            <div><img src="@/assets/file-icon.png"
                   alt=""><span>{{item.enclosureName}}</span></div>
            <div style="cursor: pointer;"
                 @click="() => delResumeListFun(item.enclosureId)">x</div>
          </div>
          <div class='upload-btn'
               @click="showAddDialog = true">上传简历/作品集</div>
        </div>
      </el-col>
    </el-row>
    <el-dialog v-model="showAddDialog"
               custom-class='add-dialog'
               title=" "
               :before-close="handleClose">
      <Add @close-dialog='closeDialog'></Add>
    </el-dialog>
  </div>
</template>

<script lang='ts' setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import useInfo from './components/UserInfo.vue';
import myTags from './components/MyTags.vue';
import Advantage from './components/Advantage.vue';
import jobExpectations from './components/JobExpectations.vue';
import workExperiences from './components/WorkExperiences.vue';
import projectExperience from './components/ProjectExperience.vue';
import EduExperience from './components/EduExperience.vue';
import Add from '@/components/dialog/add.vue';
import useResumeList from '../hooks/useMyResumeList';

const router = useRouter();
// 上传附件简历弹窗
const showAddDialog = ref(false);
const handleClose = (done: any) => {
  done();
};
// 附件简历
const { resumeList, getResumeList, delResumeList } = useResumeList();
getResumeList();

const delResumeListFun = async (enclosureId:any) => {
  await delResumeList({ enclosureId });
  await getResumeList();
};

watch(showAddDialog, () => {
  if (!showAddDialog.value) {
    getResumeList();
  }
});

const closeDialog = (type: any) => {
  if (type === 'add') {
    showAddDialog.value = false;
  }
};

</script>

<style lang='scss'>
$BLACK: #222222;
$WHITE: #FFFFFF;
$GRAY: #656565;
$RED: #ED263D;
$BACK: #f8f8f8;

.resume-form-div {
  font-family: PingFang SC-Regular, PingFang SC;
  .display-flex {
    display: flex;
  }
  .attachment-resume-div {
    // height: 226px;
    margin-top: 40px;
    padding: 30px;
    box-sizing: border-box;
    background: $WHITE;
    font-size: 24px;
    color: $BLACK;
    .display-flex {
      justify-content: space-between;
      color: $GRAY;
      font-size: 14px;
      line-height: 36px;
      align-items: center;
      img {
        margin-right: 10px;
      }
    }
    .upload-btn {
      width: 100%;
      height: 46px;
      margin-top: 20px;
      background: $RED;
      text-align: center;
      line-height: 46px;
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: $WHITE;
      cursor: pointer;
    }
  }

  .page-title {
    height: 88px;
    margin-top: 40px;
    padding-left: 30px;
    background: $WHITE;
    border: 1px solid #E8E8E8;
    align-items: center;
    font-size: 24px;
    color: $BLACK;
    .go-detail-link {
      margin-left: 25px;
      font-size: 14px;
      color: $RED;
      cursor: pointer;
      display: flex;
      align-items: center;
      img {
        margin-right: 5px;
      }
    }
  }

  .content-div {
    margin-bottom: 30px;
    padding: 10px 0;
    background: $WHITE;
    box-shadow: 0px -4px 8px 1px rgba(0, 0, 0, 0.02);
    .el-textarea {
      width: -webkit-fill-available;
      margin: 20px 30px 0 30px;
      .el-textarea__inner {
        background: $BACK;
        border: none;
        &:hover, &:focus, &:visited {
          border: 1px solid $RED;
        }
      }
      .el-input__count {
        background: $BACK;
      }
    }
    .add-btn {
      margin: 20px 30px;
      font-size: 14px;
      color: #222222;
      line-height: 24px;
      text-decoration: underline;
      cursor: pointer;
      display: flex;
      align-items: center;
      img {
        margin-right: 5px;
      }
    }
    .delete-btn {
      position: absolute;
      right: 22px;
      display: flex;
      align-items: center;
      color: $RED;
      font-size: 12px;
      line-height: 40px;
      cursor: pointer;
      display: none;
      img {
        margin-right: 5px;
      }
    }
    .white-back-div {
      padding: 5px 10px 5px 15px;
      // background: $WHITE;
      // box-shadow: 0px 2px 20px 1px rgba(0, 0, 0, 0.06);
      &:hover {
        background: $WHITE;
        box-shadow: 0px 2px 20px 1px rgba(0, 0, 0, 0.06);
        .delete-btn {
          display: flex;
        }
      }
    }
    .content-title {
      margin: 20px 30px;
      color: $RED;
      font-size: 18px;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
    }
    .label-content {
      margin: 20px 30px;
      display: flex;
      .label-item {
        img {
          display: none;
        }
        &:hover {
          img {
            display: inline-block;
          }
        }
      }
    }
    .edit-label-content {
      margin: 0 30px;
      padding-top: 20px;
      display: flex;
      border-top: 1px solid #E8E8E8;
    }
    .label-item {
      width: 97px;
      height: 38px;
      margin-right: 30px;
      background: $BACK;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: $GRAY;
      line-height: 36px;
      cursor: pointer;
      &:hover, &.active {
        background: $RED;
        color: $WHITE;
      }
    }
    .content-btn {
      text-align: right;
      .el-button {
        width: 120px;
        height: 46px;
        &.el-button--danger {
          background: $RED;
        }
        &.is-plain:focus, &.is-plain:hover {
          color: $RED;
          border-color: $RED;
        }
      }
    }
    .base-info-sex {
      div {
        width: calc(50% - 5px);
        height: 46px;
        line-height: 46px;
        background: $BACK;
        border: 1px solid $WHITE;
        text-align: center;
        cursor: pointer;
        &:hover {
          border-color: $RED;
        }
        &.active {
          border: none;
          background: url('@/assets/radio-btn-selected.png');
          background-size: 100% 100%;
        }
      }
    }

    // 公共的组件库样式复写
    .el-form--inline.el-form--label-top {
      position: relative;
      margin: 0 20px 0 30px;
      &.white-back-div {
        margin: 0 15px;
      }
      .el-form-item {
        width: calc(50% - 10px);
        &:nth-child(even) {
          width: calc(50% - 30px);
          margin-right: 30px;
        }
        .el-form-item__label {
          padding-bottom: 0;
          color: $GRAY;
          font-size: 14px;
          font-weight: 600;
        }
        .el-textarea {
          margin: 0;
        }
      }
      .double-element-form-item {
        .the-element {
          width: calc(50% - 20px);
        }
        .display-flex {
          align-items: center;
        }
      }
      .single-item {
        width: 100% !important;
        &.el-form-item {
          margin-right: 10px !important;
        }
      }
    }
    .el-input {
      .el-input__inner {
        height: 46px;
        background: $BACK;
        border: none;
        &:hover, &:focus, &:visited {
          border: 1px solid $RED;
        }
      }
      .el-input__count .el-input__count-inner {
        background: $BACK;
      }
    }
    .el-select, .el-cascader {
      width: 100%;
      .el-input__inner {
        height: 46px;
        background: $WHITE;
        border: 1px solid #f8f8f8;
      }
    }
    .el-date-editor.el-input {
      width: 100%;
    }
  }

  .user-info {
    .el-range-editor {
      width: 100%;
      background: $BACK;
      .el-range-input {
        background: $BACK;
      }
    }
  }
  .avatar-uploader {
    height: 46px;
  }
}
.el-select-dropdown__item.selected {
  color: $RED;
}

.add-dialog {
  width: 818px;
  height: 456px;
  position: relative;
}
</style>
