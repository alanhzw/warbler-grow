/*
 * @Author: 一尾流莺
 * @Description:人才测评-答题测试列表
 * @Date: 2021-11-01 10:25:46
 * @LastEditTime: 2021-11-05 11:01:55
 * @FilePath: \ired_resource\src\pages\assessment\apis\getAnswerList.ts
 */
import { ref } from 'vue';
// @ts-ignore 因为引入的是js  所以找不到类型声明文件
import { UserService } from '@/service';

const useGetAnswerList = () => {
  const answerList = ref([{
    id: 1,
    number: 1,
    subjectText: '当你遇到新朋友时，你',
    talentsSubjectDetails: [
      {
        id: 1,
        optionNum: 'A',
        optionText: '说话的时间与聆听的时间相当。',
        score: 0,
        subjectId: 1,
        type: 'E',
      },
      {
        id: 2,
        optionNum: 'B',
        optionText: '聆听的时间会比说话的时间多。',
        score: 0,
        subjectId: 1,
        type: 'I',
      },
    ],

  }]);
  const getAnswerList = async () => {
    const res = await UserService.getAnswerList({});
    answerList.value = res;
    return res;
  };
  const changeAnswerList = (questionNo: number, option: number, score: number) => {
    if (option === 0) {
      answerList.value[questionNo].talentsSubjectDetails[0].score = score;
      answerList.value[questionNo].talentsSubjectDetails[1].score = 5 - score;
    }
    if (option === 1) {
      answerList.value[questionNo].talentsSubjectDetails[1].score = score;
      answerList.value[questionNo].talentsSubjectDetails[0].score = 5 - score;
    }
  };
  return {
    answerList,
    getAnswerList,
    changeAnswerList,
  };
};

export default useGetAnswerList;
