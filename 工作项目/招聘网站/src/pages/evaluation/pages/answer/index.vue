<!--
 * @Descripttion: 人才测评答题过程
 * @Author: yang chenglin
 * @Date: 2021-09-28 18:34:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-27 17:21:03
-->
<template>
  <div class="answer-div">
    <div class="answer-num">
      <span class="current-num">{{ questionInfo.number }}</span>/
      <span>{{ answerList.length }}</span>
    </div>
    <div>
      <div class="question-content">
        <span>{{ questionInfo.number }}.</span>
        <span>{{ questionInfo.subjectText }}</span>
      </div>
      <div class="answer-item"
           v-for="(item,index) in questionInfo.talentsSubjectDetails"
           :key="item.id">
        <div class="answer-content">{{ item.optionText }}</div>
        <div class="slider-div">
          <progress-bar :total-block="6"
                        :option-no="index"
                        @change-answer-list="changeAnswer"
                        :active-block="item.score"></progress-bar>
        </div>
      </div>
    </div>
    <div class="display-flex btn-div">
      <div class="left-btn"
           @click="router.push('/evaluation')"
           v-if="questionInfo.number === 1">退出测评</div>
      <div class="left-btn"
           @click="number -= 1"
           v-else>上一题</div>
      <div class="right-btn"
           v-if="questionInfo.number === answerList.length"
           @click="gotoScore">查看得分</div>
      <div class="right-btn"
           @click="nextQuestion"
           v-else>下一题</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  onMounted, ref, computed,
} from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import ProgressBar from '../../components/ProgressBar.vue';
import useGetAnswerList from '../../apis/getAnswerList';
import useSaveAnswer from '../../apis/saveAnswer';

const { answerList, getAnswerList, changeAnswerList } = useGetAnswerList();
const { saveAnswerResult, saveAnswer } = useSaveAnswer();

const router = useRouter();
// 当前题号
const number = ref(0);
// 当前题目详情
const questionInfo = computed(() => answerList.value[number.value]);
// 修改分数
const changeAnswer = (index: number, optionNo: number) => {
  changeAnswerList(number.value, optionNo, index);
};
// 查看得分
const gotoScore = async () => {
  await saveAnswer(answerList.value);
  router.push({
    name: 'AnswerResult',
    params: {
      answerResult: saveAnswerResult.value.result,
      E: saveAnswerResult.value.scortDetail.E,
      F: saveAnswerResult.value.scortDetail.F,
      I: saveAnswerResult.value.scortDetail.I,
      J: saveAnswerResult.value.scortDetail.J,
      N: saveAnswerResult.value.scortDetail.N,
      P: saveAnswerResult.value.scortDetail.P,
      S: saveAnswerResult.value.scortDetail.S,
      T: saveAnswerResult.value.scortDetail.T,
    },
  });
};

// 下一题
const nextQuestion = () => {
  if (questionInfo.value.talentsSubjectDetails[0].score === 0 && questionInfo.value.talentsSubjectDetails[1].score === 0) {
    ElMessage({
      message: '请选择答案',
      type: 'error',
    });
    return;
  }

  number.value += 1;
};

onMounted(async () => {
  await getAnswerList();
});
</script>

<style lang='scss'>
.answer-div {
  width: 1200px;
  max-height: calc(100vh - 180px);
  overflow: auto;
  height: 746px;
  margin: 0 auto;
  margin-top: 40px;
  margin-bottom: 40px;
  padding: 40px 190px 130px 190px;
  box-sizing: border-box;
  background: #ffffff;
  font-family: PingFang SC-Regular, PingFang SC;

  &::-webkit-scrollbar {
    position: absolute;
    right: 30px;
    /*滚动条整体样式*/
    width: 3px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 3px;
  }

  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    background-color: #d7dde4;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    /* 阴影 */
    -webkit-box-shadow: inset 0 0 5px #fff;
    background: #fff;
  }

  .display-flex {
    display: flex;
  }
  .answer-num {
    margin-bottom: 60px;
    font-size: 24px;
    font-family: PingFang SC-Heavy, PingFang SC;
    font-weight: 800;
    color: #ee8b97;
    .current-num {
      color: #ed263d;
    }
  }
  .question-content {
    font-size: 20px;
    font-family: PingFang SC-Heavy, PingFang SC;
    font-weight: 800;
    color: #222222;
  }
  .answer-item {
    .answer-content {
      margin: 30px 0;
      font-size: 18px;
      color: #656565;
    }
    .slider-div {
      margin-bottom: 70px;
    }
  }
  .btn-div {
    justify-content: center;
    margin-top: 130px;
    div {
      width: 120px;
      height: 46px;
      line-height: 46px;
      text-align: center;
      cursor: pointer;
    }
    .left-btn {
      font-size: 14px;
      color: #999999;
      border: 1px solid #e8e8e8;
      margin-right: 30px;
      &:hover {
        border: 1px solid #ed263d;
      }
    }
    .right-btn {
      border: 1px solid #ed263d;
      background: #ed263d;
      color: #ffffff;
    }
  }
}
</style>
