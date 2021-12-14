<!--
 * @Descripttion: 企业端首页-推荐人才模块
 * @Author: yang chenglin
 * @Date: 2021-10-10 14:19:39
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-23 21:25:30
-->
<template>
  <div class="talents-root"
       @click="() => {resumeId = info.talentsMpUserInfoId; resumeExpectId = info.expectPostId; resumeVisible = true}">
    <div class="talent-info">
      <div style="display: flex;">
        <img :src="info.headImageUrl"
             alt="暂无图片"
             style="width: 48px;height: 48px;border-radius: 50%;">
        <div>
          <div class="info-name">{{info.realName}}</div>
          <div class="info-cont"
               v-if="info.city">{{info.city}} |<span v-if="info.exprience"> {{info.exprience}} |</span>{{educationText}}
          </div>
        </div>
      </div>
      <div class="info-pay">{{info.expectMoneyFrom}}k-{{info.expectMoneyTo}}k</div>
    </div>
    <div class="talent-position">
      <div v-for="item in info.tags"
           :key="item">{{item.tagName}}</div>
    </div>

    <el-dialog v-model="resumeVisible"
               :close-on-click-modal='false'
               :before-close="() => {resumeVisible = false; resumeId = ''; resumeExpectId = ''}">
      <resume-dialog :personId='resumeId'
                     :expectPostId="resumeExpectId"
                     :showInviteBtn='true'></resume-dialog>
    </el-dialog>
  </div>
</template>

<script lang='ts' setup>
import { defineProps, computed, ref } from 'vue';
import useEducation from '../hooks/useEducation';
import resumeDialog from '@/components/company_get_resume/index.vue';
// 学历列表
const { education, getEducation } = useEducation();
getEducation();

const props = defineProps({
  info: {
    default: () => ({}),
  },
});

const educationText = computed(() => education.value.find((it:any) => it.value === props.info.education)?.text);

// 查看用户简历弹窗
const resumeVisible = ref(false);
const resumeId = ref('');
const resumeExpectId = ref('');
</script>

<style lang='scss'>
.talents-root {
  // width: 350px;
  height: 160px;
  background: #fff;
  padding: 30px 20px 20px 20px;
  box-sizing: border-box;
  position: relative;
  font-family: PingFang SC-Regular, PingFang SC;
  .talent-info {
    display: flex;
    justify-content: space-between;
    height: 60.6%;
    border-bottom: 1px dashed #E8E8E8;
    .info-name {
      font-size: 18px;
      font-weight: 400;
      color: #222222;
      margin-bottom: 10px;
      line-height: 28px;
    }
    .info-cont {
      font-size: 14px;
      font-weight: 400;
      color: #999999;
    }
    .info-pay {
      font-size: 18px;
      font-family: PingFang SC-Semibold, PingFang SC;
      font-weight: 600;
      color: #FF9100;
    }
  }

  .talent-position {
    height: 39.4%;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    div {
      width: 80px;
      height: 32px;
      background: #F8F8F8;
      border-radius: 8px 8px 8px 8px;
      line-height: 32px;
      text-align: center;
      font-size: 14px;
      font-weight: 400;
      color: #656565;
    }
  }
}
</style>
