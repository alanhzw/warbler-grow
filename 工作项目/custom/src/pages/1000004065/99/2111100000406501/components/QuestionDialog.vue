<template>
  <!-- 答题弹窗 -->
  <div class="box">
    <img src="../assets/img/dialog/dialog_question.png"
         class="popup">

    <div class="remain-code-tip">
      今天还剩{{ questionInfo.oppoBgmDayCountDto.todayBgmCount }}/{{ questionInfo.oppoBgmDayCountDto.totalCount }}个必购码
    </div>
    <div class="view">

      <div class="answer-tip">正确回答{{ countQs }}个问题即赢取必购码 {{ indexQs + 1 }}/{{ countQs }}</div>
      <div class="quetion-tip">第{{ indexQs + 1 }}题:</div>
      <div class="question">{{ currentQs.content }}</div>
      <div class="answer" :class="{'active':item.id === currentId}"
           v-for="(item,index) in currentQs.oppoBgmUserQaAnswers" :key="item.id" @click="changeAs(item)">
        {{ String.fromCharCode(65 + parseInt(index)) }} {{ item.content }}
      </div>
    </div>

    <div class="btn" @click="changeQs()">{{ indexQs + 1 === countQs ? '完成' : '下一题' }}</div>

    <div class="lottery-tip">今日剩余{{ questionInfo.qaChance }}次答题机会</div>
  </div>
</template>

<script lang='ts' setup>
import { computed, defineEmits, defineProps, ref } from 'vue';
import { Toast } from 'vant';

const emit = defineEmits(['close', 'getQaResult', 'getHasBuyCode']);
const props = defineProps({ questionInfo: Object });

const closeDialog = () => {
  emit('close', 'ruleDialog');
};

// 当前题目所选答案索引;
const currentId = ref(null);
// 当前题目所选答案信息
const currentAs = ref(null);
// 答题总数
const countQs = computed(() => props.questionInfo.oppoBgmUserQaQuestionDtos.length);
// 当前题目索引
const indexQs = ref(0); // 题目索引
// 当前题目信息
const currentQs = computed(() => props.questionInfo?.oppoBgmUserQaQuestionDtos[indexQs.value]);
// 记录用户所选信息列表
const questionLogArr = [];

// 切换答案
const changeAs = (item: any) => {
  currentId.value = item.id;
  currentAs.value = item;
};

// 清空答案
const clearAs = () => {
  currentId.value = null;
  currentAs.value = null;
};

// 记录用户答题信息
const saveQsLog = () => {
  const obj = {};
  obj.questionId = currentAs.value.questionId;
  obj.answerId = currentAs.value.id;
  obj.isRightKey = currentAs.value.isRightKey;
  questionLogArr.push(obj);
};

// 切换题目
const changeQs = () => {
  if (currentAs.value) {
    saveQsLog();
    emit('getHasBuyCode', '点击了下一题，从后台获取此时是否还有必购码');
    // 最后一道题 -- 提交功能
    if (indexQs.value + 1 === countQs.value) {
      emit('getQaResult', questionLogArr);
    } else if (currentAs.value.isRightKey) {
      // 答对
      clearAs(); // 清空答题信息
      indexQs.value += 1;
    } else {
      // 没答对
      emit('getQaResult', questionLogArr);
    }
  } else {
    Toast('请先选择选项!');
  }
};
</script>

<style lang='scss' scoped>
.box {
  position: relative;

  img {
    margin: 0 auto;
  }

  .popup {
    width: 5.5rem;
  }

  .remain-code-tip {
    text-align: center;
    font-size: .16rem;
    position: absolute;
    top: .4rem;
    width: 100%;
  }

  .view {
    width: 100%;
    color: #FFFFFF;
    padding: 0 .3rem;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    justify-content: space-around;

    position: absolute;
    top: 1.3rem;

    .answer-tip {
      color: #fff4df;
      font-size: .2rem;
      font-weight: 800;
      padding-left: .5rem;
    }

    .quetion-tip {
      font-size: 0.24rem;
      margin-top: .3rem;
      color: #fff4df;
      font-weight: 800;
      padding-left: .4rem;
    }

    .question {
      max-height: .68rem;
      font-size: 0.24rem;
      font-weight: 800;
      margin: .1rem 0 .25rem 0;
      padding: 0 .3rem 0 .4rem;
    }

    .answer {
      font-size: 0.26rem;
      color: #FFFFFF;
      font-weight: 800;
      margin: .1rem .45rem .1rem .4rem;
      padding: 0 .2rem;
      background-color: #212341;
      border: 2px solid #212341;
      opacity: .9;
    }

    .active {
      border: 2px solid #f1c14a;
    }

  }

  .btn {
    width: 1.7rem;
    height: .47rem;
    line-height: .47rem;
    margin: 0 auto;
    text-align: center;
    position: absolute;
    font-size: .28rem;
    font-weight: 800;
    bottom: 1.4rem;
    left: 1.9rem;
    color: #0b0442;
    background: {
      image: url("../assets/img/dialog/last-btn.png");
      repeat: no-repeat;
      size: cover;
    };
  }

  .lottery-tip {
    width: 100%;
    font-size: .16rem;
    text-align: center;
    position: absolute;
    bottom: .95rem;
  }

}
</style>
