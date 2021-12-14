<!--
 * @Descripttion: 人才测评答题结果
 * @Author: yang chenglin
 * @Date: 2021-09-28 18:34:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-22 17:47:08
-->
<template>
  <div class="answer-result">
    <div class="titile">你的MBTI性格类型测试问卷得分</div>
    <div class="line"></div>
    <div class="table">
      <div class="header">
        <div class="item">类型</div>
        <div class="item">得分</div>
        <div class="item">类型</div>
        <div class="item no-border-right">得分</div>
      </div>
      <div class="body">
        <table-item title="E"
                    :score="result.E"></table-item>
        <table-item title="I"
                    :score="result.I"></table-item>
        <table-item title="S"
                    :score="result.S"></table-item>
        <table-item title="N"
                    :score="result.N"></table-item>
        <table-item title="T"
                    :score="result.T"></table-item>
        <table-item title="F"
                    :score="result.F"></table-item>
        <table-item title="J"
                    :score="result.J"></table-item>
        <table-item title="P"
                    :score="result.P"></table-item>
      </div>
    </div>
    <div class="explain">
      <div class="explain-title">说明:</div>
      <div class="explain-content">以上八个偏好两两成对，也就是说，E 和 I、S 和 N、T 和 F、J 和 P 各自是一对组合。在每一对组合中，比较该组合中的偏好的得分孰高孰低，高的那个就是您的优势类型。如果同分的话，选择后面的那一组，即 I、N、F、P。对四对组合都作一比较后，您会得到一个由 4 个字母组成的优势类型，如 ENFP、ISTJ</div>
    </div>
    <div class="result">
      <div class="left">你的得分情况揭示你的优势类型是：</div>
      <div class="right">{{result.answerResult}}</div>
    </div>
    <div class="btn"
         @click="router.push('/evaluation/self')">保存，并自我评价</div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import TableItem from '../../components/TableItem.vue';

const router = useRouter();
const route = useRoute();
const result = computed(() => route.params);
onMounted(() => {
  console.log('🚀🚀~ result:', result.value);
});
</script>

<style lang='scss'>
.answer-result {
  width: 1200px;
      max-height: calc(100vh - 180px);
    overflow: auto;
  margin: 0 auto;
  margin-top: 40px;
  margin-bottom: 40px;
  padding: 40px 60px 30px 60px;
  box-sizing: border-box;
  background: #ffffff;
  font-family: PingFang SC-Regular, PingFang SC;
  display: flex;
  flex-direction: column;
  align-items: center;

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

  * {
    margin: 0;
    padding: 0;
    line-height: 1;
    box-sizing: border-box;
  }
  .titile {
    width: 100%;
    text-align: center;
    color: #ed263d;
    font-family: PingFang SC-Heavy, PingFang SC;
    font-weight: 800;
    font-size: 24px;
    padding: 10px 0px;
  }
  .line {
    width: 100%;
    height: 1px;
    margin-top: 30px;
    border-bottom: 1px dashed #ed263d;
  }
  .table {
    width: 820px;
    height: 320px;
    margin-top: 30px;
    border: 1px solid #e8e8e8;
    .header {
      display: flex;
      justify-content: space-between;
      background: #ed263d;
      .item {
        width: 204px;
        height: 64px;
        border-right: 1px solid #fff;
        text-align: center;
        line-height: 64px;
        color: #fff;
        font-size: 18px;
        font-family: PingFang SC-Regular, PingFang SC;
      }
      .no-border-right {
        border-right: none;
      }
    }
    .body {
      display: flex;
      flex-wrap: wrap;
    }
  }
  .explain {
    width: 820px;
    .explain-title {
      color: #656565;
      font-size: 18px;
      font-family: PingFang SC-Regular, PingFang SC;
      margin-top: 30px;
    }
    .explain-content {
      margin-top: 15px;
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 21px;
    }
  }
  .result {
    width: 820px;
    height: 48px;
    background-color: #f8f8f8;
    margin-top: 30px;
    display: flex;
    justify-content: flex-start;
    display: flex;
    justify-content: center;
    align-items: center;
    .left {
      font-size: 18px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #222222;
    }
    .right {
      font-size: 20px;
      font-family: PingFang SC-Heavy, PingFang SC;
      font-weight: 800;
      color: #ed263d;
    }
  }
  .btn {
    width: 160px;
    height: 46px;
    text-align: center;
    line-height: 46px;
    border: 1px solid #ed263d;
    background: #ed263d;
    color: #ffffff;
    margin-top: 30px;
    cursor: pointer;
  }
}
</style>
