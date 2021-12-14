<!--
 * @Descripttion: 人才测评首页
 * @Author: yang chenglin
 * @Date: 2021-09-26 18:40:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-22 17:48:13
-->
<template>
  <div class="assessment-home">
    <div class="back-img">
      <div class="white-back">
        <div class="title">测评前须知</div>
        <div class="content">迈尔斯布里格斯类型指标(MBTI)表征人的性格，是由美国的凯恩琳·布里格斯和她的女儿伊莎贝尔·布里格斯·迈尔斯制定的，该指标以瑞士心理学家荣格划分的8种类型为基础，这种理论可以帮助解释为什么不同的人对不同的事物感兴趣、擅长不同的工作、并且有时不能互相理解。MBTI职业性格测试从纷繁复杂的个性特征中，归纳提炼出4个关键要素——外倾内倾、感觉直觉、思维情感、判断理解，进行分析判断，从而把不同个性的人区别开来。</div>
        <div class="content">本测试分为四部分，共48题；需时约18分钟。所有题目没有对错之分，请根据自己的实际情况选择。本测验展示的是你的性格倾向，而不是你的知识、技能、经验。只要你是认真、真实地填写了测试问卷，那么通常情况下你都能得到一个确实和你的性格相匹配的类型。希望你能从中或多或少地获得一些有益的信息。</div>
        <div class="bottom-btn">
          <div class="start-btn"
               @click="router.push('/evaluation/answer')">开始测评</div>
          <div class="last-result-btn"
               @click="seeLast">查看上次测评结果 ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { useRouter } from 'vue-router';
import useGetViewLast from './apis/getViewLast';

const { viewLast, getViewLast } = useGetViewLast();

const router = useRouter();

// 查看上次测评结果
const seeLast = async () => {
  await getViewLast();
  router.push({
    name: 'SelfResult',
    params: {
      result: JSON.stringify(viewLast.value),
    },
  });
};

</script>

<style lang='scss'>
.assessment-home {
  height: 100%;
  background: #ed263d;
  overflow: auto;

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
          background-color: #D7DDE4;
          border-radius: 10px;
      }

      &::-webkit-scrollbar-track {
          /*滚动条里面轨道*/
          /* 阴影 */
          -webkit-box-shadow: inset 0 0 5px #fff;
          background: #fff;
      }
  .back-img {
    height: 100%;
    position: relative;
    background-image: url("./assets/talent-assessment-background.png");
    background-repeat: no-repeat;
    background-position: center 0;
    .white-back {
      width: 880px;
      height: 379px;
      box-sizing: border-box;
      padding: 40px;
      position: absolute;
      left: 0;
      right: 0;
      top: 316px;
      margin: auto;
      background: #fdfdfd;
      border-radius: 20px 20px 20px 20px;
      font-family: PingFang SC-Regular, PingFang SC;
      .title {
        font-size: 18px;
        font-family: PingFang SC-Heavy, PingFang SC;
        font-weight: 800;
        color: #ed263d;
        margin-bottom: 10px;
      }
      .content {
        margin-bottom: 20px;
        font-size: 14px;
        font-weight: 400;
        color: #656565;
        line-height: 21px;
      }
      .bottom-btn {
        padding: 30px 0 40px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .start-btn {
          width: 160px;
          height: 46px;
          color: #ffffff;
          text-align: center;
          line-height: 46px;
          background: #ed263d;
          border-radius: 10px;
          cursor: pointer;
        }
        .last-result-btn {
          font-size: 14px;
          font-weight: 400;
          color: #222222;
          cursor: pointer;
          &:hover {
            color: #ed263d;
          }
        }
      }
    }
  }
}
</style>
