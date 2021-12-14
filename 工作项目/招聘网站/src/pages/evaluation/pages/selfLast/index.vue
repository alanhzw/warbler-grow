<!--
 * @Author: 一尾流莺
 * @Description:最后
 * @Date: 2021-10-15 11:06:22
 * @LastEditTime: 2021-11-27 17:23:21
 * @FilePath: \ired_resource\src\pages\evaluation\pages\selfLast\index.vue
-->
<template>
  <div class="self-last-box">
    <div class="title">最后，选择一个最符合你的结果</div>
    <div class="explain">在 MBTI 性格类型测试问卷结果分析中有对四个纬度八种偏好的详细描述，认真地自我评估一下，选择更接近你的选项做进一步评测。</div>
    <div class="table">
      <finally-item :result='result[0]'
                    title='测试结果'></finally-item>
      <finally-item :result='result[1]'
                    title='自我评价结果'></finally-item>
    </div>
    <div class="choose">
      <div class="choose-item">
        <el-radio v-model="radio"
                  label="1"></el-radio>
      </div>
      <div class="choose-item">
        <el-radio v-model="radio"
                  label="2"></el-radio>
      </div>
    </div>
    <div class="btn-div">
      <div class="left-btn"
           @click="router.push('/evaluation')">退出测评</div>
      <div class="right-btn"
           @click="submit()">查看结果</div>
    </div>
  </div>
</template>

<script lang='ts' setup>

import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import FinallyItem from '../../components/FinallyItem.vue';
import useGetSelectResult from '../../apis/getSelectResult';

const { getSelectResult, selectResult } = useGetSelectResult();

const router = useRouter();

const route = useRoute();

// @ts-ignore
const result = computed(() => JSON.parse(route.params.result));

const radio = ref('1');

// 提交
const submit = async () => {
  await getSelectResult(result.value[Number(radio.value) - 1].talentsSubjectTraineeId);
  router.push({
    name: 'SelfResult',
    params: {
      result: JSON.stringify(selectResult.value),
    },
  });
};

onMounted(async () => {
});
</script>

<style lang='scss'>
.self-last-box {
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
  .title {
    font-size: 24px;
    font-family: PingFang SC-Heavy, PingFang SC;
    font-weight: 800;
    color: #ed263d;
    line-height: 28px;
    text-align: left;
    width: 820px;
  }
  .explain {
    margin-top: 10px;
    width: 820px;
    font-size: 18px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #222222;
    line-height: 27px;
  }
  .table {
    display: flex;
    width: 820px;
    justify-content: space-between;
    margin-top: 30px;
  }
  .choose {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .choose-item {
      width: 410px;
      display: flex;
      justify-content: center;
    }
    .el-radio__label {
      visibility: hidden;
    }
    .el-radio__inner {
      width: 20px;
      height: 20px;
    }
    .el-radio__input.is-checked {
      background-color: #fff;
      .el-radio__inner {
        background-color: #fff;
        border-color: #ed263d;
      }
    }
    .el-radio__inner::after {
      width: 14px;
      height: 14px;
      background-color: #ed263d;
    }
    .el-radio__inner {
      background-color: #fff;
      border-color: #999999;
    }
  }
  .btn-div {
    display: flex;
    justify-content: center;
    margin-top: 70px;
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
